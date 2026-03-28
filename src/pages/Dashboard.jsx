import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Stats from "../components/StatsCard";
import TaskList from "../components/TaskList";
import { useState, useEffect } from "react";
import { doc, collection, deleteDoc, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useToast } from "../context/ToastContext";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const { showToast } = useToast();
    const addTask = async (newTask) => {
        try {
            const docRef = await addDoc(collection(db, "tasks"), {
            ...newTask,
            createdAt: new Date(),
            });

            setTasks((prev) => [
            ...prev,
            { id: docRef.id, ...newTask }
            ]);

        } catch (error) {
            console.error(error);
        }
        };

   const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
      setTasks(prev => prev.filter(task => task.id !== id));
      showToast("Task deleted 🗑️");
    } catch (error) {
      console.error(error);
      showToast("Failed to delete task ❌", "error");
    }
  ``};

   const toggleTask = async (task) => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      const newStatus = task.status === "completed" ? "pending" : "completed";
      await updateDoc(taskRef, { status: newStatus });
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: newStatus } : t));

      showToast(newStatus === "completed" ? "Task completed ✅" : "Marked as pending ⏳");
    } catch (error) {
      console.error(error);
      showToast("Failed to change status ❌", "error");
    }
  };

    //get all tasks
    useEffect(() => {
        const fetchTasks = async() => {
            try{
                const querySnapshot = await getDocs(collection(db, "tasks"));

                const tasksData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTasks(tasksData);
            }
            catch(error){
                console.error(error);
            }
        };
        fetchTasks();
    }, []);

   
    return (
        <div className="flex min-h-screen bg-lightbg dark:bg-darkbg transition-colors ">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
            
            {/* Navbar */}
            <Navbar />

            {/* Content */}
            <div className="p-6 space-y-6">
                <Stats tasks={tasks} />
                <TaskList 
                    tasks={tasks} 
                    setTasks={setTasks}
                    onAddTask={addTask}
                    onDelete={deleteTask}
                    onToggle={toggleTask}
                />
            </div>

        </div>
        </div>
    );
}