import { CardProps } from "@/interfaces";

export const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
      <div className={`bg-white rounded-2xl shadow-md p-4 ${className}`}>{children}</div>
    );
  };

  export const CardContent: React.FC<CardProps> = ({ children, className }) => {
    return <div className={className}>{children}</div>;
  };
  