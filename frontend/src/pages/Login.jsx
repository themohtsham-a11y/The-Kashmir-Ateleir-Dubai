import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { AUTH } from "@/constants/testIds";
import { toast } from "sonner";
import { ArrowUpRight } from "lucide-react";
import { USER_ASSETS } from "@/lib/data";

export default function Login() {
  const [mode, setMode] = useState("login");
  const nav = useNavigate();
  const [f, setF] = useState({ name: "", email: "", password: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const url = mode === "login" ? "/auth/login" : "/auth/register";
      const payload = mode === "login" ? { email: f.email, password: f.password } : f;
      const { data } = await api.post(url, payload);
      localStorage.setItem("ka_token", data.token);
      localStorage.setItem("ka_user", JSON.stringify(data.user));
      toast.success(mode === "login" ? "Welcome back." : "Welcome to the atelier.");
      nav("/client");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Authentication failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink pt-24 grid md:grid-cols-2">
      {/* Left visual */}
      <div className="hidden md:block relative overflow-hidden">
        <img
          src={USER_ASSETS.dubaiPenthouse}
          alt=""
          className="absolute inset-0 w-full h-full object-cover slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-ink/30" />
        <div className="grain absolute inset-0" />
        <div className="relative h-full flex flex-col justify-between p-14">
          <div className="chapter-num text-gold">Client Portal · Private</div>
          <div>
            <div className="font-display italic text-white text-5xl leading-tight max-w-md">
              A private view of your project — <span className="text-gold">live</span>.
            </div>
            <div className="mt-6 text-white/60 text-sm max-w-md">
              Weekly progress, photographs, and the next milestone — quietly and
              transparently.
            </div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 md:p-14">
        <form onSubmit={submit} className="w-full max-w-md">
          <div className="eyebrow mb-6">
            {mode === "login" ? "Sign in" : "Register"}
          </div>
          <h1 className="font-display text-white text-4xl md:text-5xl leading-tight font-light mb-10">
            {mode === "login" ? "Welcome back." : "Create your account."}
          </h1>

          {mode === "register" && (
            <label className="block mb-6">
              <span className="chapter-num block mb-2">Name</span>
              <input
                data-testid={AUTH.registerName}
                value={f.name}
                onChange={(e) => setF({ ...f, name: e.target.value })}
                className="ka-input"
                required
              />
            </label>
          )}
          <label className="block mb-6">
            <span className="chapter-num block mb-2">Email</span>
            <input
              data-testid={mode === "login" ? AUTH.loginEmail : AUTH.registerEmail}
              type="email"
              value={f.email}
              onChange={(e) => setF({ ...f, email: e.target.value })}
              className="ka-input"
              required
            />
          </label>
          <label className="block mb-8">
            <span className="chapter-num block mb-2">Password</span>
            <input
              data-testid={mode === "login" ? AUTH.loginPassword : AUTH.registerPassword}
              type="password"
              value={f.password}
              onChange={(e) => setF({ ...f, password: e.target.value })}
              className="ka-input"
              minLength={6}
              required
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            data-testid={mode === "login" ? AUTH.loginSubmit : AUTH.registerSubmit}
            className="btn-gold w-full justify-center"
          >
            <span>{busy ? "Working…" : mode === "login" ? "Sign in" : "Create account"}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            data-testid={AUTH.toggle}
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="mt-6 w-full text-[11px] tracking-[0.24em] uppercase text-white/60 hover:text-gold"
          >
            {mode === "login" ? "No account? Register" : "Already have an account? Sign in"}
          </button>
        </form>

        <style>{`
          .ka-input {
            width: 100%;
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255,255,255,0.16);
            padding: 12px 2px 10px;
            font-family: 'Inter', sans-serif;
            font-size: 15px;
            color: #fff;
            outline: none;
            transition: border-color .5s ease;
          }
          .ka-input:focus { border-bottom-color: #D4AF37; }
        `}</style>
      </div>
    </div>
  );
}
