import React, { useEffect, useState } from "react";
import { LayoutDashboard, ListTodo, LogOut, User, Loader2 } from "lucide-react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // 1. Sync & listen safely to active auth status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Auto-close mobile viewport drawer when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, setIsOpen]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error?.message);
      setIsLoggingOut(false);
    }
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/" },
    { name: "Tasks", icon: <ListTodo size={18} />, path: "/tasks" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed md:static top-0 left-0 h-screen w-64 z-50
          transform transition-transform duration-300 ease-in-out
          flex flex-col p-5 tf-body
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        style={{ background: "var(--ink-dark)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Logo — always on a dark surface, so text stays fixed-light regardless of app theme */}
        <div className="flex items-center gap-3 mb-8 px-1">
          <span className="tf-display font-semibold text-lg" style={{ color: "#F1F3EF" }}>
            TaskFlow
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                disabled={isLoggingOut}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 text-left disabled:opacity-50"
                style={isActive
                  ? { background: "var(--ink-dark-2)", color: "#F1F3EF" }
                  : { color: "#8B95A3" }}
              >
                <span style={{ color: isActive ? "var(--teal)" : "#8B95A3" }}>
                  {item.icon}
                </span>
                <span className="font-medium text-sm">{item.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer Area with Dynamic States */}
        <div className="pt-4 space-y-3 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>

          {isAuthLoading ? (
            /* Skeleton State while Firebase initialises */
            <div className="flex items-center gap-3 px-3 py-2.5 animate-pulse">
              <div className="w-9 h-9 rounded-full shrink-0" style={{ background: "var(--ink-dark-2)" }} />
              <div className="flex-1 space-y-2">
                <div className="h-3 rounded w-3/4" style={{ background: "var(--ink-dark-2)" }} />
                <div className="h-2 rounded w-1/2" style={{ background: "var(--ink-dark-2)" }} />
              </div>
            </div>
          ) : (
            /* Profile Panel */
            <div
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
              style={{ background: "var(--ink-dark-2)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden shrink-0"
                style={{ background: "rgba(30,127,114,0.18)", color: "var(--teal)" }}
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={16} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "#EDEFEE" }}>
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs truncate mt-0.5" style={{ color: "#8B95A3" }}>
                  {user?.email || "No email active"}
                </p>
              </div>
            </div>
          )}

          {/* Action Log-out Trigger */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut || isAuthLoading}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
            style={{ color: "var(--coral)" }}
          >
            {isLoggingOut ? (
              <Loader2 size={18} className="animate-spin" style={{ color: "var(--coral)" }} />
            ) : (
              <LogOut size={18} style={{ color: "var(--coral)" }} />
            )}
            <span className="font-medium text-sm">
              {isLoggingOut ? "Signing out..." : "Logout"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}