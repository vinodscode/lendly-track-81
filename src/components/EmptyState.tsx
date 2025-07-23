
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyState = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 space-y-6 animate-fade-in">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
        <span className="text-5xl font-semibold text-primary">₹</span>
      </div>
      
      <div className="text-center max-w-xs">
        <h2 className="text-xl font-medium mb-2">No lend entries</h2>
        <p className="text-muted-foreground mb-6">
          Add your first lend to start tracking!
        </p>
        
        <Button 
          size="lg" 
          className="rounded-full shadow-md hover:shadow-lg transition-all gap-2"
          onClick={() => navigate("/add-loan")}
        >
          <PlusCircle size={18} />
          <span>Add Your First Lend</span>
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
