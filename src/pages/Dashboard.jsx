import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import TaskList from "../components/TaskList";
import { useState, useEffect, useContext } from "react";

import { doc, collection, deleteDoc, getDocs, addDoc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useToast } from "../context/ToastContext";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [tasksLoading, setTasksLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Destructure the current user from your AuthContext
    const { user } = useContext(AuthContext);
    const { showToast } = useToast();

    const addTask = async (newTask) => {
        if (!user) return; // Guard clause if user is not authenticated

        try {
            //Attach the user's uid to the new task document so production rules permit it
            const docRef = await addDoc(collection(db, "tasks"), {
                ...newTask,
                userId: user.uid,
                createdAt: new Date(),
            });

            setTasks((prev) => [
                ...prev,
                { id: docRef.id, ...newTask, userId: user.uid }
            ]);
            showToast("Task added successfully! 🎉");

        } 
        catch (error) {
            console.error(error);
            showToast("Failed to add task ❌", "error");
        }
    };

    const deleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, "tasks", id));
            setTasks(prev => prev.filter(task => task.id !== id));
            showToast("Task deleted 🗑️");
        } 
        catch (error) {
            console.error(error);
            showToast("Failed to delete task ❌", "error");
        }
    };

    const toggleTask = async (task) => {
        try {
            const taskRef = doc(db, "tasks", task.id);
            const newStatus = task.status === "completed" ? "pending" : "completed";
            await updateDoc(taskRef, { status: newStatus });
            setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: newStatus } : t));

            showToast(newStatus === "completed" ? "Task completed ✅" : "Marked as pending ⏳");
        } 
        catch (error) {
            console.error(error);
            showToast("Failed to change status ❌", "error");
        }
    };

    //  useEffect to filter tasks by the logged-in user
    useEffect(() => {
        const fetchTasks = async () => {
            // Guard clause: If user object is null (still loading auth state), do nothing yet
            if (!user) return;

            setTasksLoading(true);
            try {
                // Create a filtered query targeting only documents where userId matches user.uid
                const q = query(
                    collection(db, "tasks"),
                    where("userId", "==", user.uid)
                );

                const querySnapshot = await getDocs(q);

                const tasksData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setTasks(tasksData);
            }
            catch (error) {
                console.error("Error fetching production tasks:", error);
                showToast("Error loading tasks ❌", "error");
            }
            finally {
                setTasksLoading(false);
            }
        };

        fetchTasks();
    }, [user]); // The effect runs every time the 'user' auth state loads or changes


    return (
        <div className="min-h-screen flex tf-body" style={{ background: "var(--canvas)" }}>

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

                <div className="flex-1 p-5 md:p-8 max-w-5xl w-full space-y-6">
                    {!user ? (
                        <div className="text-center py-10 tf-body text-sm" style={{ color: "var(--ink-muted)" }}>
                            Loading your workspace…
                        </div>
                    ) : (
                        <>
                            <StatsCard tasks={tasks} />
                            {tasksLoading ? (
                                <div
                                    className="text-center py-10 rounded-xl tf-mono text-xs tracking-wide"
                                    style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink-muted)" }}
                                >
                                    LOADING TASKS…
                                </div>
                            ) : (
                                <TaskList
                                    tasks={tasks}
                                    setTasks={setTasks}
                                    onAddTask={addTask}
                                    onDelete={deleteTask}
                                    onToggle={toggleTask}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}