import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BrainCircuit, Briefcase, ShieldCheck, Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/alsalama-logo.png";

const courses = [
  "B.Sc Optometry [with AI application] – 4 years (8 sem) + 1 year internship",
  "M.Sc Optometry [with AI application] – 2 years (4 sem)",
  "Hospital Administration with AI – 1 year (2 sem)",
  "PG Diploma in Hospital Administration with AI – 1 year (2 sem)",
  "PG Diploma in Physician Assistant – 2 years (4 sem)",
  "Certificate Course in Health Assistant – 6 months (1 sem)",
  "Ophthalmic Lens Technician (OLT) & Contact Lens Practice (CLP) – 6 months (1 sem)",
  "Low Vision Rehabilitation – 1 year (2 sem)",
  "Low Vision Rehabilitation (Add-on for Alsalama Students) – 1 year (2 sem)",
  "Paediatric Optometry – 1 year (2 sem)",
  "Paediatric Optometry (Add-on for Alsalama Students) – 1 year (2 sem)",
];

const Index = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    course: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.email.trim() || !form.course) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Application submitted successfully! We'll contact you soon.");
      setForm({ name: "", phone: "", email: "", location: "", course: "", message: "" });
      setSubmitting(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/5" />
        <div className="animate-float-reverse absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-accent/5" />
        <div className="animate-float absolute bottom-10 left-1/4 h-52 w-52 rounded-full bg-primary/5" />
        <div className="animate-float-reverse absolute -bottom-16 right-1/4 h-40 w-40 rounded-full bg-accent/5" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex flex-col items-center px-4 pt-8 pb-2 md:pt-12">
        <img src={logo} alt="Alsalama Education" className="h-14 w-auto max-w-[80%] object-contain md:h-20" />
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-3xl px-4 pt-6 pb-4 text-center md:pt-10">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
          Build Your Future in Healthcare
          <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            with AI-Powered Courses
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
          Nationally recognized programs with guaranteed placement support, industry certifications, and career-focused training.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Badge className="gap-1.5 rounded-full border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/15">
            <BrainCircuit className="h-4 w-4" /> AI Integrated
          </Badge>
          <Badge className="gap-1.5 rounded-full border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/15">
            <Briefcase className="h-4 w-4" /> Career Focused
          </Badge>
          <Badge className="gap-1.5 rounded-full border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/15">
            <ShieldCheck className="h-4 w-4" /> Certified Programs
          </Badge>
        </div>
      </section>

      {/* Form Card */}
      <section className="relative z-10 mx-auto max-w-xl px-4 py-8 md:py-12">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-xl shadow-primary/5 backdrop-blur-lg md:p-10"
        >
          <div className="mb-6 flex items-center gap-2 text-lg font-bold text-foreground">
            <GraduationCap className="h-6 w-6 text-primary" />
            Enroll Today
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                maxLength={100}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  maxLength={15}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  maxLength={255}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="City, State"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                maxLength={100}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="course">Select Course *</Label>
              <Select value={form.course} onValueChange={(v) => handleChange("course", v)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((c, i) => (
                    <SelectItem key={i} value={c} className="text-sm">
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message">Comment / Message</Label>
              <Textarea
                id="message"
                placeholder="Any questions or message..."
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                maxLength={1000}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-primary to-accent py-6 text-base font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
          >
            {submitting ? "Submitting..." : "Apply Now"}
          </Button>
        </form>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-card/50 py-8 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 text-center text-sm text-muted-foreground">
          <img src={logo} alt="Alsalama Education" className="h-10 w-auto opacity-70" />
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <a href="tel:+919920884903" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
              <Phone className="h-4 w-4" /> +919920884903
            </a>
            <a href="mailto:info@alsalamasafety.com" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
              <Mail className="h-4 w-4" /> info@alsalamasafety.com
            </a>
            <a href="https://maps.app.goo.gl/3we4QzqsF4jYxs7JA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer text-center">
              <MapPin className="h-4 w-4 shrink-0" /> Al Salama College of Optometry Perinthalmanna
            </a>
          </div>
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Alsalama Education. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
