import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email) return showToast("Email is required", "error");
    if (!password) return showToast("Password is required", "error");
    if (password.length < 6)
      return showToast("Password must be at least 6 characters", "error");

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      showToast("Account created successfully 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (err) {
      showToast(err.message, "error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">TaskFlow</h1>
          <p className="text-lg opacity-90">
            Organize your tasks. Boost productivity 🚀
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-lightbg dark:bg-gray-900">
        <form
          onSubmit={handleSignup}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md space-y-5"
        >
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

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
            text="Create Account"
            isLoading={loading}
            disabled={loading}
          />

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;