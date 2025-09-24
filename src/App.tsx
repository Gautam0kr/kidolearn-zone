import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Quizzes from "./pages/Quizzes";
import Games from "./pages/Games";
import Resources from "./pages/Resources";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/quizzes" element={<Layout><Quizzes /></Layout>} />
          <Route path="/games" element={<Layout><Games /></Layout>} />
          <Route path="/resources" element={<Layout><Resources /></Layout>} />
          <Route path="/analysis" element={<Layout><Analysis /></Layout>} />
          {/* Placeholder routes for profile sections */}
          <Route path="/achievements" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold mb-4">🏆 Achievements</h1><p className="text-muted-foreground">Coming soon! Track your learning milestones and rewards.</p></div></Layout>} />
          <Route path="/profile" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold mb-4">👤 Profile</h1><p className="text-muted-foreground">Coming soon! Manage your account settings and preferences.</p></div></Layout>} />
          <Route path="/settings" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold mb-4">⚙️ Settings</h1><p className="text-muted-foreground">Coming soon! Customize your learning experience.</p></div></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
