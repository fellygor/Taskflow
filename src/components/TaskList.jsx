import { useState } from "react";
import TaskForm from "./TaskForm";
import { Edit2, Trash2, Calendar, Tag, CheckCircle2, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { doc, collection, deleteDoc, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function TaskList({tasks, onAddTask, onDelete, onToggle, setTasks}) {
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate(); 

  const handleNewTask = (task) => {
    onAddTask(task); // Updates the parent state
    setShowModal(false);
  };

  const handleUpdateTask = async (updatedTask) => {
      try {
          const taskRef = doc(db, "tasks", updatedTask.id);
          await updateDoc(taskRef, updatedTask);

          setTasks((prev) =>
          prev.map((t) =>
              t.id === updatedTask.id ? updatedTask : t
          )
          );

          setEditingTask(null); // close modal
      } 
      catch (error) {
          console.error(error);
      }
  };

  return (
    <div className="bg-surface dark:bg-dark-surface p-5 rounded-xl shadow-lg border border-border-light dark:border-gray-700">
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">Tasks</h2>
        <button 
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setShowModal(true)}
        >
          + Add Task
        </button>
      </div>

      {/* Empty State */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          No tasks yet. Start by adding one 🚀
        </p>
      ) 
      : 
      (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-4 hover:border-blue-200 dark:hover:border-blue-900 transition-all shadow-sm hover:shadow-md"
            >
          {/* Custom Checkbox Action */}
            <button 
                onClick={() => {
                    console.log("Toggle clicked for task:", task);
                    onToggle(task);
                }}
                className={`transition-colors ${task.status === "completed" ? "text-green-500" : "text-gray-300 hover:text-blue-500"}`}
            >
                {task.status === "completed" ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-bold truncate ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-800 dark:text-gray-100"}`}>
                  {task.title}
                </h3>
                {/* Priority Badge */}
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md ${
                  task.priority === "high" ? "bg-red-100 text-red-600" : 
                  task.priority === "medium" ? "bg-amber-100 text-amber-600" : "bg-emerald-100 text-emerald-600"
                }`}>
                  {task.priority}
                </span>
              </div>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mb-2">
                {task.description}
              </p>

              <div className="flex gap-4 items-center text-xs text-gray-400">
                {task.dueDate && (
                  <span className="flex items-center gap-1"><Calendar size={14} /> {task.dueDate}</span>
                )}
                {task.category && (
                  <span className="flex items-center gap-1"><Tag size={14} /> {task.category}</span>
                )}
              </div>
            </div>

            {/* Hover Actions */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => setEditingTask(task)} 
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 transition-colors">
                <Edit2 size={16} />
              </button>

              <button 
                onClick={() => onDelete(task.id)} 
                className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>

            </div>
          </div>
          ))}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-2xl w-full max-w-md shadow-xl animate-scaleIn">

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-lg font-bold mb-4">Add Task</h2>

            <TaskForm onAdd={handleNewTask} />
          </div>
        </div>
      )}
    {editingTask && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
        <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-2xl w-full max-w-md shadow-xl animate-scaleIn relative">

          {/* Close Button */}
          <button
            onClick={() => setEditingTask(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

          <h2 className="text-lg font-bold mb-4">Edit Task</h2>

          <TaskForm
            initialData={editingTask}
            onSubmit={handleUpdateTask}
            onAdd={undefined} // Explicitly set to undefined to avoid confusion
          />
        </div>
      </div>
    )}
    </div>
    
  );
}