import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CibilPredictor from "./pages/CibilPredictor";
import LoanManagement from "./pages/LoanManagement";
import ChatBot from "./pages/ChatBot";
import InsuranceCalculator from "./pages/InsuranceCalculator";
import Profile from "./pages/Profile";
import ReminderSystem from "./pages/ReminderSystem";
import DocumentArchive from "./pages/DocumentArchive";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/cibil-predictor" element={<ProtectedRoute><CibilPredictor /></ProtectedRoute>} />
          <Route path="/loans" element={<ProtectedRoute><LoanManagement /></ProtectedRoute>} />
          <Route path="/chatbot" element={<ProtectedRoute><ChatBot /></ProtectedRoute>} />
          <Route path="/insurance" element={<ProtectedRoute><InsuranceCalculator /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/reminders" element={<ProtectedRoute><ReminderSystem /></ProtectedRoute>} />
          <Route path="/documents" element={<ProtectedRoute><DocumentArchive /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
