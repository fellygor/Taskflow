import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"; // Optional: lucide-react for icons

const toastStyles = {
  success: "border-green-500 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  error: "border-red-500 bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300",
  info: "border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
};

const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

export default function Toast({ message, type = "info", onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      role="alert"
      className={`fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 mb-4 rounded-lg border shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-right-5 
      ${toastStyles[type]}`}
    >
      <div className="inline-flex items-center justify-center flex-shrink-0">
        {icons[type]}
      </div>
      
      <div className="ml-3 text-sm font-medium pr-4">
        {message}
      </div>

      <button
        onClick={onClose}
        className="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4 opacity-70 hover:opacity-100" />
      </button>

      {/* Optional: Progress bar indicator */}
      <div className="absolute bottom-0 left-0 h-1 bg-current opacity-20 animate-shrink" 
           style={{ animationDuration: `${duration}ms` }} />
    </div>
  );
}