
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import AddLoan from "./pages/AddLoan";
import LoanDetails from "./pages/LoanDetails";
import EditLoan from "./pages/EditLoan";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Calculator from "./pages/Calculator";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useEffect } from "react";

// Remove App.css import as it conflicts with our styling

const queryClient = new QueryClient();

const App = () => {
  // Add meta viewport tag for better mobile experience
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
    
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected routes - require authentication */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/add-loan" element={<AddLoan />} />
                  <Route path="/loans/:id" element={<LoanDetails />} />
                  <Route path="/loans/:id/edit" element={<EditLoan />} />
                  <Route path="/calculator" element={<Calculator />} />
                </Route>
                
                {/* Redirect to signup for initial load */}
                <Route path="*" element={<Navigate to="/signup" replace />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
