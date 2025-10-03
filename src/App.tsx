import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cibil-predictor" element={<CibilPredictor />} />
          <Route path="/loans" element={<LoanManagement />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/insurance" element={<InsuranceCalculator />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reminders" element={<ReminderSystem />} />
          <Route path="/documents" element={<DocumentArchive />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
