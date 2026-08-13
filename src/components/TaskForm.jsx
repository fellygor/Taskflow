import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";

const EMPTY_TASK = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: "",
  category: "",
};

export default function TaskForm({ onAdd, onSubmit, initialData }) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const [task, setTask] = useState(initialData || EMPTY_TASK);

  useEffect(() => {
    if (initialData) {
      setTask(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      showToast("Title is required", "error");
      return;
    }

      if (task.dueDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);
        
        if (due < today) {
          showToast("Due date cannot be in the past", "error");
          return;
        }
    }

    setIsLoading(true);

    try {
      if (initialData && onSubmit) {
        await onSubmit({ ...task, id: initialData.id });
        showToast("Task updated successfully", "success");
      } else if (onAdd) {
        await onAdd(task);
        showToast("Task added successfully", "success");
      }

      if (!initialData) {
        setTask(EMPTY_TASK);
      }
    } 
    catch (error) {
      console.error(error);
      showToast("Something went wrong", "error");
    } 
    finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>Task Title</span>
        <input
          name="title"
          placeholder="Eg. Redesign a website"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="mt-1 w-full text-sm rounded-md px-3 py-2 outline-none bg-transparent"
          style={{ color: "var(--ink)", border: "1px solid var(--border)" }}
          required
        />
      </label>

      <label className="block">
        <span className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>Description</span>
        <textarea
          name="description"
          placeholder="What needs to be done?"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="mt-1 w-full text-sm outline-none resize-none rounded-md p-3"
          style={{ color: "var(--ink)", background: "var(--canvas)", minHeight: 90, border: "1px solid var(--border)"  }}
        />
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="block">
          <span className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>Priority</span>
          <select
            name="priority"
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            className="mt-1 w-full rounded-md px-2 py-2 text-sm outline-none"
            style={{ border: "1px solid var(--border)", background: "var(--surface)", color: "var(--ink)" }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>Due Date</span>
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
            className="mt-1 w-full text-sm rounded-md px-2 py-2 outline-none bg-transparent"
            style={{ color: "var(--ink)", border: "1px solid var(--border)" }}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>Category</span>
        <input
          type="text"
          placeholder="e.g. Backend, Design"
          value={task.category}
          onChange={(e) => setTask({ ...task, category: e.target.value })}
          className="mt-1 w-full text-sm rounded-md px-3 py-2 outline-none bg-transparent"
          style={{ color: "var(--ink)", border: "1px solid var(--border)" }}
        />
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md py-2.5 text-sm font-medium text-white hover:opacity-90 transition-opacity disabled:opacity-60"
        style={{ background: "var(--teal)" }}
      >
        {isLoading ? "Saving…" : initialData ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}