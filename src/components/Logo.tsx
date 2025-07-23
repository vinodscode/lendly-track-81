
export type LogoProps = {
  size?: "sm" | "md" | "lg";
  variant?: "horizontal" | "icon-only";
};

const Logo = ({ size = "md", variant = "horizontal" }: LogoProps) => {
  const sizes = {
    sm: {
      icon: "text-lg",
      text: "text-lg",
    },
    md: {
      icon: "text-xl",
      text: "text-xl",
    },
    lg: {
      icon: "text-2xl",
      text: "text-2xl",
    },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-sm rounded-full transform -translate-y-1 translate-x-1"></div>
        <div className="relative bg-gradient-to-br from-primary to-primary/70 p-2 rounded-full flex items-center justify-center">
          <span className={`${sizes[size].icon} text-white font-bold`}>ரு</span>
        </div>
      </div>
      
      {variant === "horizontal" && (
        <div className="font-semibold tracking-tight">
          <span className={`${sizes[size].text} bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent`}>
            Loan Tracker
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
