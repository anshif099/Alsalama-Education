import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";
import logo from "@/assets/abate_as_alsalama_institutions_logo.jpg";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "alsalamaeducation@gmail.com" && password === "Alsalamaeducation") {
      sessionStorage.setItem("isAdmin", "true");
      toast.success("Login successful!");
      navigate("/admin");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/5" />
        <div className="animate-float-reverse absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-accent/5" />
        <div className="animate-float absolute bottom-10 left-1/4 h-52 w-52 rounded-full bg-primary/5" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="mb-8 flex flex-col items-center">
          <img src={logo} alt="Alsalama Education Admin" className="h-16 w-auto object-contain mb-4 rounded-md" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Admin Portal
          </h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-xl shadow-primary/5 backdrop-blur-lg md:p-8"
        >
          <div className="mb-6 flex items-center gap-2 text-lg font-bold text-foreground">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Secure Login
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="mt-6 w-full rounded-full bg-gradient-to-r from-primary to-accent py-6 text-base font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
          >
            Login to Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
