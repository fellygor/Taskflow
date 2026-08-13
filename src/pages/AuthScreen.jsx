import { useState } from "react";
import { UserPlus, LogIn, Eye, EyeClosed } from 'lucide-react'
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

export default function AuthScreen(onEnter){
    const [mode, setMode] = useState('login');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleClick = async (e) =>{
        e.preventDefault();
        // Clear previous errors
        setError("");

        // Validate nput
        if(!email.trim() || !password.trim()){
            showToast('All fields are required', "error");
            return;
        }
        if (password.length < 6 && mode === "signup") {
            showToast("Password should be at least 6 characters.", "error");
            return;
        }

        setIsLoading(true);
        try{
            if(mode === 'signup'){
                await createUserWithEmailAndPassword(auth, email, password);
                showToast("Account created successfully", "success");

                setTimeout(() => {
                    setMode('login');
                    setPassword("")
                }, 1000);
                
            }
            else{
                await signInWithEmailAndPassword(auth, email, password);
                showToast("Welcome back! 👋", "success");
                setTimeout(() => {
                    navigate("/dashboard");
                }, 800);

            }
        }
        catch(error){
            console.error(error);
            switch (error.code) {
                case "auth/email-already-in-use":
                    setError("This email is already registered.");
                    break;
                case "auth/invalid-credential":
                case "auth/user-not-found":
                case "auth/wrong-password":
                    setError("Invalid email or password.");
                    break;
                case "auth/weak-password":
                    setError("Password should be at least 6 characters.");
                    break;
                default:
                    setError("Failed to authenticate. Please try again.");
            }
        }
        finally{
            setIsLoading(false);
        }

    }
    const STATUS = {
        pending: { label: "Backlog", color: "var(--ink-muted)", bg: "#EAEBE7" },
        progress: { label: "In progress", color: "var(--amber)", bg: "var(--amber-bg)" },
        review: { label: "Review", color: "var(--teal)", bg: "var(--teal-bg)" },
        done: { label: "Done", color: "#2E7D4F", bg: "#E3F1E7" },
    };
    
    return(
        <div className="min-h-screen w-full flex tf-body" style={{ background: "var(--canvas)" }}>
            {/* Left: brand panel */}
            <div className="hidden md:flex md:w-[42%] relative overflow-hidden flex-col justify-between p-10" style={{ background: "var(--ink-dark)" }}>
                <div>
                <div className="tf-display text-2xl font-semibold tracking-tight" style={{ color: "#F1F3EF" }}>TaskFlow</div>
                <div className="tf-mono text-xs mt-1" style={{ color: "#8B95A3" }}>WORK LOG &middot; v1.0</div>
                </div>
        
                <div className="space-y-3">
                <div className="tf-display text-3xl leading-snug font-medium" style={{ color: "#F1F3EF" }}>
                    Every task gets a strip.<br />Every strip has a status.
                </div>
                <p className="text-sm max-w-sm" style={{ color: "#9BA5B2" }}>
                    Track work the way a control room tracks flights — one line per task, status always visible, nothing lost in a list.
                </p>
                </div>
                {/* decorative flight strips */}
                <div className="space-y-2">
                {[
                    { id: "TF-014", s: "progress" },
                    { id: "TF-011", s: "review" },
                    { id: "TF-009", s: "done" },
                ].map((r) => (
                    <div key={r.id} className="flex items-center gap-3 rounded-sm px-3 py-2" style={{ background: "#212B39" }}>
                    <div className="w-1 self-stretch rounded-full" style={{ background: STATUS[r.s].color }} />
                    <span className="tf-mono text-xs" style={{ color: "#8B95A3" }}>{r.id}</span>
                    <span className="text-xs" style={{ color: "#C7CDD5" }}>{STATUS[r.s].label}</span>
                    </div>
                ))}
                </div>
                
            </div>
        
            {/* Right: form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                <div className="md:hidden tf-display text-xl font-semibold mb-8" style={{ color: "var(--ink)" }}>
                    TaskFlow
                </div>
        
                <div className="flex gap-1 mb-8 p-1 rounded-md" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <button
                        onClick={() => setMode("login")}
                        className="flex-1 text-sm font-medium py-2 rounded transition-colors"
                        style={mode === "login" ? { background: "var(--ink)", color: "#fff" } : { color: "var(--ink-muted)" }}
                    >
                    Log in
                    </button>
                    <button
                        onClick={() => setMode("signup")}
                        className="flex-1 text-sm font-medium py-2 rounded transition-colors"
                        style={mode === "signup" ? { background: "var(--ink)", color: "#fff" } : { color: "var(--ink-muted)" }}
                    >
                    Sign up
                    </button>
                </div>
        
                <h1 className="tf-display text-2xl font-semibold mb-1" style={{ color: "var(--ink)" }}>
                    {mode === "login" ? "Welcome back" : "Create your account"}
                </h1>
                <p className="text-sm mb-6" style={{ color: "var(--ink-muted)" }}>
                    {mode === "login" ? "Pick up where the last strip left off." : "Start your first work log in under a minute."}
                </p>
        
                <div className="space-y-3">
                    <label className="block">
                        <span className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>Email</span>
                        <input 
                            type="email"
                            className="mt-1 w-full rounded-md px-3 py-2 text-sm outline-none focus:ring-2" style={{ border: "1px solid var(--border)", background: "var(--surface)" }} 
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                         />
                    </label>
                    <label className="block ">
                        <span className="text-xs font-medium" style={{ color: "var(--ink-muted)" }}>Password</span>
                        <div className="relative mt-1 flex items-center">
                        <input 
                            type={showPassword ? "text" : "password"}
                            className="mt-1 w-full rounded-md px-3 py-2 text-sm outline-none focus:ring-2" style={{ border: "1px solid var(--border)", background: "var(--surface)" }} 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                            style={{ color: "var(--ink-muted)" }}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                            {showPassword ? <Eye size={15} /> : <EyeClosed size={15} />}
                        </button>
                        </div>
                    </label>
                    {error && <p className="text-xs font-medium" style={{color: "red"}}>{error}</p>}
                    <button
                        type="submit"
                        onClick={handleClick}
                        className="w-full flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium mt-2 transition-opacity hover:opacity-90"
                        style={{ background: "var(--teal)", color: "#fff" }}
                        disabled={isLoading}
                    >
                        {mode === "login" ? (<LogIn size={15} />) : (<UserPlus size={15} />)}
                        {isLoading ? 'Processing...' : mode === "login" ? "Log in" : "Create account"}
                    </button>
                </div>
                </div>
            </div>
        </div>
  );
}
 
 