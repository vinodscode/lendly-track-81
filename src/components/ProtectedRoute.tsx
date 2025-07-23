
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  console.log("ProtectedRoute - isLoading:", isLoading, "user:", !!user, "path:", location.pathname);

  // While checking auth status, show loading spinner
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If not authenticated, redirect to signup
  if (!user) {
    console.log("User not authenticated, redirecting to signup");
    return <Navigate to="/signup" replace />;
  }

  // If authenticated, render the child routes
  console.log("User authenticated, rendering protected content");
  return <Outlet />;
};
