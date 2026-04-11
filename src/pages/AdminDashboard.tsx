import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { database } from "@/lib/firebase";
import { ref, onValue, remove } from "firebase/database";
import { LogOut, Trash2, Calendar, User, Phone, Mail, MapPin, BookOpen, MessageSquare } from "lucide-react";
import logo from "@/assets/abate_as_alsalama_institutions_logo.jpg";

interface Submission {
  id: string;
  name: string;
  phone: string;
  email: string;
  location?: string;
  course: string;
  message?: string;
  createdAt?: any;
}

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    if (sessionStorage.getItem("isAdmin") !== "true") {
      navigate("/admin/login");
      return;
    }

    const submissionsRef = ref(database, 'submissions');
    const unsubscribe = onValue(submissionsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const submissionsList: Submission[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        
        // Sort by newest first based on createdAt or fallback
        submissionsList.sort((a, b) => {
          const timeA = a.createdAt ? a.createdAt : 0;
          const timeB = b.createdAt ? b.createdAt : 0;
          return timeB - timeA;
        });
        
        setSubmissions(submissionsList);
      } else {
        setSubmissions([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this submission?")) {
      try {
        await remove(ref(database, `submissions/${id}`));
        toast.success("Submission deleted successfully");
      } catch (error) {
        console.error("Error deleting submission:", error);
        toast.error("Failed to delete submission");
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "Unknown Date";
    try {
      return new Date(timestamp).toLocaleString();
    } catch (e) {
      return "Invalid Date";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background shapes */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="animate-float absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/5" />
        <div className="animate-float-reverse absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-accent/5" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Alsalama Education" className="h-10 w-auto rounded-sm object-contain" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hidden sm:block">
              Admin Dashboard
            </h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Submitted Forms ({submissions.length})</h2>
        </div>

        {submissions.length === 0 ? (
          <div className="rounded-2xl border border-border/60 bg-card/80 p-12 text-center shadow-xl shadow-primary/5 backdrop-blur-lg">
            <p className="text-muted-foreground text-lg">No forms submitted yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {submissions.map((sub) => (
              <div 
                key={sub.id} 
                className="group relative rounded-2xl border border-border/60 bg-card/80 p-6 shadow-xl shadow-primary/5 backdrop-blur-lg transition-all hover:-translate-y-1 hover:shadow-primary/10"
              >
                <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="h-8 w-8 rounded-full" 
                    onClick={() => handleDelete(sub.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 font-bold text-lg mb-1">
                    <User className="h-4 w-4 text-primary" />
                    {sub.name}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {formatDate(sub.createdAt)}
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <a href={`tel:${sub.phone}`} className="hover:text-primary hover:underline">{sub.phone}</a>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <a href={`mailto:${sub.email}`} className="hover:text-primary hover:underline truncate">{sub.email}</a>
                  </div>
                  {sub.location && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                      <span>{sub.location}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-2 pt-2 border-t border-border/50">
                    <BookOpen className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="font-medium text-primary">{sub.course}</span>
                  </div>
                  {sub.message && (
                    <div className="flex items-start gap-2 pt-2 border-t border-border/50 text-muted-foreground">
                      <MessageSquare className="h-4 w-4 shrink-0 mt-0.5" />
                      <p className="line-clamp-3">{sub.message}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
