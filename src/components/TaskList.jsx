import { useState } from "react";
import TaskForm from "./TaskForm";
import { Edit2, Trash2, Calendar, Tag, CheckCircle2, Circle, Plus, X } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const PRIORITY_STYLES = {
  high: { color: "var(--coral)", bg: "var(--coral-bg)" },
  medium: { color: "var(--amber)", bg: "var(--amber-bg)" },
  low: { color: "var(--ink-muted)", bg: "var(--canvas)" },
};

export default function TaskList({ tasks, onAddTask, onDelete, onToggle, setTasks }) {
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleNewTask = (task) => {
    onAddTask(task); // Updates the parent state
    setShowModal(false);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const taskRef = doc(db, "tasks", updatedTask.id);
      await updateDoc(taskRef, updatedTask);

      setTasks((prev) =>
        prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );

      setEditingTask(null); // close modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="p-5 rounded-xl tf-body"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="tf-display text-base font-semibold" style={{ color: "var(--ink)" }}>Tasks</h2>
          <p className="tf-mono text-[10px] tracking-wide mt-0.5" style={{ color: "var(--ink-muted)" }}>
            {tasks.length} STRIP{tasks.length === 1 ? "" : "S"} OPEN
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium text-white hover:opacity-90 transition-opacity"
          style={{ background: "var(--teal)" }}
          onClick={() => setShowModal(true)}
        >
          <Plus size={15} /> Add Task
        </button>
      </div>

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div
          className="text-center py-12 rounded-md"
          style={{ border: "1px dashed var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--ink-muted)" }}>
            No tasks yet. Start by adding one 🚀
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {tasks.map((task) => {
            const done = task.status === "completed";
            const priority = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.low;

            return (
              <div
                key={task.id}
                className="group flex items-center gap-4 pl-0 pr-4 py-4 rounded-xl transition-all"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderLeft: `3px solid ${done ? "var(--teal)" : "var(--amber)"}`,
                }}
              >
                {/* Toggle */}
                <button
                  onClick={() => onToggle(task)}
                  className="shrink-0 pl-3 transition-colors"
                  style={{ color: done ? "var(--teal)" : "var(--ink-muted)" }}
                  aria-label="Toggle status"
                >
                  {done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3
                      className="font-semibold truncate"
                      style={{
                        color: done ? "var(--ink-muted)" : "var(--ink)",
                        textDecoration: done ? "line-through" : "none",
                      }}
                    >
                      {task.title}
                    </h3>
                    {task.priority && (
                      <span
                        className="tf-mono text-[10px] uppercase tracking-wide font-semibold px-2 py-0.5 rounded-sm shrink-0"
                        style={{ color: priority.color, background: priority.bg }}
                      >
                        {task.priority}
                      </span>
                    )}
                  </div>

                  {task.description && (
                    <p
                      className="text-sm line-clamp-1 mb-2"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {task.description}
                    </p>
                  )}

                  <div className="flex gap-4 items-center text-xs" style={{ color: "var(--ink-muted)" }}>
                    {task.dueDate && (
                      <span className="flex items-center gap-1"><Calendar size={13} /> {task.dueDate}</span>
                    )}
                    {task.category && (
                      <span className="flex items-center gap-1"><Tag size={13} /> {task.category}</span>
                    )}
                  </div>
                </div>

                {/* Hover Actions */}
                <div className="flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="p-2 rounded-lg transition-colors hover:bg-black/5"
                    style={{ color: "var(--ink-muted)" }}
                    aria-label="Edit task"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 rounded-lg transition-colors hover:opacity-80"
                    style={{ color: "var(--coral)", background: "transparent" }}
                    aria-label="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Task modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
          <div
            className="relative p-6 rounded-2xl w-full max-w-md shadow-xl tf-body"
            style={{ background: "var(--surface)", color: "var(--ink)" }}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded hover:bg-black/5"
              aria-label="Close"
            >
              <X size={16} style={{ color: "var(--ink-muted)" }} />
            </button>

            <h2 className="tf-display text-lg font-semibold mb-4" style={{ color: "var(--ink)" }}>Add Task</h2>

            <TaskForm onAdd={handleNewTask} />
          </div>
        </div>
      )}

      {/* Edit Task modal */}
      {editingTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
          <div
            className="relative p-6 rounded-2xl w-full max-w-md shadow-xl tf-body"
            style={{ background: "var(--surface)", color: "var(--ink)" }}
          >
            <button
              onClick={() => setEditingTask(null)}
              className="absolute top-4 right-4 p-1 rounded hover:bg-black/5"
              aria-label="Close"
            >
              <X size={16} style={{ color: "var(--ink-muted)" }} />
            </button>

            <span className="tf-mono text-[10px] tracking-wide" style={{ color: "var(--ink-muted)" }}>{editingTask.id}</span>
            <h2 className="tf-display text-lg font-semibold mb-4" style={{ color: "var(--ink)" }}>Edit Task</h2>

            <TaskForm
              initialData={editingTask}
              onSubmit={handleUpdateTask}
            />
          </div>
        </div>
      )}
    </div>
  );
}
