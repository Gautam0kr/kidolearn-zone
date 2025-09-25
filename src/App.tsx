import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Quizzes from "./pages/Quizzes";
import Games from "./pages/Games";
import Resources from "./pages/Resources";
import Analysis from "./pages/Analysis";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/quizzes" element={
              <ProtectedRoute>
                <Layout><Quizzes /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/games" element={
              <ProtectedRoute>
                <Layout><Games /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/resources" element={
              <ProtectedRoute>
                <Layout><Resources /></Layout>
              </ProtectedRoute>
            } />
            <Route path="/analysis" element={
              <ProtectedRoute>
                <Layout><Analysis /></Layout>
              </ProtectedRoute>
            } />
            {/* Placeholder routes for profile sections */}
            <Route path="/achievements" element={
              <ProtectedRoute>
                <Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold mb-4">🏆 Achievements</h1><p className="text-muted-foreground">Coming soon! Track your learning milestones and rewards.</p></div></Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold mb-4">👤 Profile</h1><p className="text-muted-foreground">Coming soon! Manage your account settings and preferences.</p></div></Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold mb-4">⚙️ Settings</h1><p className="text-muted-foreground">Coming soon! Customize your learning experience.</p></div></Layout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
