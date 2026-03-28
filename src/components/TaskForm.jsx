import { useState, useEffect } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useToast } from '../context/ToastContext'

export default function TaskForm({ onAdd, onSubmit, initialData }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
  }); 
  const { showToast } = useToast(); 

  const [task, setTask] = useState(
    initialData || {
      title: "",
      description: "",
      status: "pending",
      priority: "medium",
      dueDate: "",
      category: ""
    }
  );

  useEffect(() => {
    if (initialData) {
      setTask(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!task.title.trim()) {
      showToast("Title is required", "error");
      return;
    }
    if (task.dueDate && new Date(task.dueDate) < new Date()) {
      showToast("Due date cannot be in the past ", "error") ;
    }

    setLoading(true);

    try {
      if (initialData && onSubmit) {
        await onSubmit({ ...task, id: initialData.id });

        showToast("Task updated successfully","success");

      } else if (onAdd) {
        await onAdd(task);

        showToast("Task added successfully ","success");
      }

      if (!initialData) {
        setTask({
          title: "",
          description: "",
          status: "pending",
          priority: "medium",
          dueDate: "",
          category: ""
        });
      }

    } catch (error) {
      console.error(error);

      showToast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast.show && (
        <Toast
          message={toast.message}
          onClose={() => setToast({ show: false, message: "" })}
        />
      )}
      
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all">
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField 
            name="title"
            label="TASK TITLE"
            placeholder="e.g., Redesign Dashboard"
            value={task.title}
            onChange={handleChange}
            required
          />

          <div className="flex flex-col">
            <label className="font-poppins font-semibold text-xs pb-1 text-black dark:text-gray-300">
              DESCRIPTION
            </label>
            <textarea
              name="description"
              placeholder="What needs to be done?"
              value={task.description}
              onChange={handleChange}
              className="
                w-full min-h-[100px] p-3 rounded-xl 
                border border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-800 
                text-gray-800 dark:text-white 
                placeholder-gray-400 
                focus:ring-2 focus:ring-blue-500 
                focus:border-blue-500 
                outline-none transition-all
              "
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-poppins font-semibold text-xs pb-1 text-black dark:text-gray-300 uppercase">
                Priority
              </label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="w-full h-[42px] px-3 rounded-xl 
                  border border-gray-300 dark:border-gray-600 
                  bg-white dark:bg-gray-800 
                  text-gray-800 dark:text-white 
                  focus:ring-2 focus:ring-blue-500 
                  outline-none transition-all"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <InputField 
              name="dueDate"
              label="DUE DATE"
              type="date"
              value={task.dueDate}
              onChange={handleChange}
            />
          </div>

          <InputField 
            name="category"
            label="CATEGORY"
            placeholder="e.g., Work, Personal"
            value={task.category}
            onChange={handleChange}
          />

          <div className="pt-2">
            <Button
              text={initialData ? "Update Task" : "Create Task"}
              type="submit" 
              isLoading={loading}
              disabled={loading} 
            />
          </div>
        </form>
      </div>
    </>
  );
}