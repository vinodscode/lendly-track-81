
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, getUserData } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useLoanStore } from "@/lib/store";

type AuthContextType = {
  user: any | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const fetchLoans = useLoanStore(state => state.fetchLoans);

  useEffect(() => {
    console.log("AuthProvider: Setting up auth listener");
    
    // Set up auth listener first
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        if (session?.user) {
          setUser(session.user);
          
          // Don't fetch loans synchronously in the auth listener to avoid deadlock
          // Use setTimeout to defer the operation
          setTimeout(async () => {
            try {
              await fetchLoans();
            } catch (error) {
              console.error("Error fetching loans after auth change:", error);
            }
          }, 0);
        } else {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    // Then check for existing session
    const checkUser = async () => {
      try {
        console.log("AuthProvider: Checking current session");
        setIsLoading(true);
        const { data } = await supabase.auth.getSession();
        const currentUser = data.session?.user || null;
        
        console.log("Current session user:", currentUser?.id);
        setUser(currentUser);
        
        if (currentUser) {
          try {
            console.log("AuthProvider: Fetching loans for existing session");
            await fetchLoans();
          } catch (error) {
            console.error("Error fetching loans for existing user:", error);
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    return () => {
      console.log("AuthProvider: Cleaning up auth listener");
      authListener?.subscription.unsubscribe();
    };
  }, [fetchLoans]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/signup");
      toast({
        title: "Signed out successfully",
        description: "You have been logged out",
      });
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
