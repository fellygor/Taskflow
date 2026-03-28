import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Splash() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigate("/dashboard");
      } else {
        navigate("/signup"); 
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white dark:text-lightbg">
      
      <div className="text-center space-y-4 animate-fadeIn">
        <h1 className="text-4xl font-bold">TaskFlow</h1>
        <p className="text-lg opacity-90">
          Organize your tasks. Boost your productivity 🚀
        </p>

        {/* Loader */}
        <div className="mt-6">
          <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
}