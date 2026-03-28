import { Moon, Sun } from 'lucide-react'
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext.jsx';

export default function Navbar() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <nav className="bg-surface dark:bg-gray-900 border-b border-border-light dark:border-gray-700 px-6 py-4 flex justify-between items-center transition-colors">
      <h1 className="font-bold text-xl text-primary">My Tasks</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm hidden sm:block">Welcome back 👋</span>
        
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md hover:opacity-90 transition-all"
          aria-label="Toggle Theme"
        >
          {dark ? <Moon size={18} fill="currentColor" /> : <Sun size={18} />}
        </button>
      </div>
    </nav>
  );
}