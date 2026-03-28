import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useToast } from "../context/ToastContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      showToast("All fields are required", "error");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password.trim());

      showToast("Login successful 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err) {
      if (err.code === "auth/user-not-found") {
        showToast("No account found with this email", "error");
      } else if (err.code === "auth/wrong-password") {
        showToast("Incorrect password", "error");
      } else {
        showToast("Login failed. Try again.", "error");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-blue-500 text-white items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome Back 👋</h1>
          <p className="text-lg opacity-90">
            Continue managing your tasks efficiently
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 dark:bg-gray-900">
        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

          <InputField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
          />

          <InputField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />

          <Button 
            type="submit" 
            text="Login" 
            isLoading={loading}
            disabled={loading}
          />

          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;