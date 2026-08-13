import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

export default function Navbar({ onMenuClick }) {

  return (
    <nav 
      className="px-6 py-4 flex justify-between items-center transition-colors border-b tf-body"
      style={{ 
        background: "var(--surface)", 
        borderColor: "var(--border)",
        color: "var(--ink)"
      }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded transition-colors hover:opacity-80"
          style={{ color: "var(--ink)" }}
        >
          ☰
        </button>
        <h1 className="tf-display font-bold text-xl" style={{ color: "var(--teal)" }}>
          My Tasks
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm hidden sm:block" style={{ color: "var(--ink-muted)" }}>
          Welcome back 👋
        </span>
      
      </div>
    </nav>
  );
}