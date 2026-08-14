import { useEffect } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

// Updated styles to map perfectly to your CSS variables
const toastStyles = {
  success: "border-[var(--teal)] bg-[var(--teal-bg)] text-[var(--teal)]",
  error: "border-[var(--coral)] bg-[var(--coral-bg)] text-[var(--coral)]",
  info: "border-[var(--amber)] bg-[var(--amber-bg)] text-[var(--amber)]",
};

const icons = {
  success: <CheckCircle className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
};

export default function Toast({ message, type = "info", onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      role="alert" 
      className={`fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 rounded-lg border shadow-xl tf-body tf-mono transition-all duration-300 animate-slideIn ${toastStyles[type]}`}
    >
      <div className="inline-flex items-center justify-center flex-shrink-0">
        {icons[type]}
      </div>
      
      {/* Uses ink-dark to ensure the message text is easy to read */}
      <div className="ml-3 text-sm font-medium pr-4 text-[var(--ink-dark)]">
        {message}
      </div>
      
      <button 
        onClick={onClose} 
        className="ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-black/5 transition-colors" 
        aria-label="Close"
      >
        <X className="w-4 h-4 opacity-70 hover:opacity-100" />
      </button>

      {/* Progress bar indicator matching the status color */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-current opacity-30 animate-shrink" 
        style={{ animationDuration: `${duration}ms` }} 
      />
    </div>
  );
}
