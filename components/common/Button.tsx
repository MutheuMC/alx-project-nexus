import React from "react";
import { ButtonProps, ButtonVariant } from "@/interfaces";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-gray-600 hover:bg-gray-700 text-white",
  outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
  danger: "bg-black hover:bg-gray-700 text-white ",
  gray : "bg-gray-100 rounded-lg"
  
};

const Button: React.FC<ButtonProps> = ({ name, icon, onClick, variant = "primary" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${variantStyles[variant]}`}
    >
      {icon && <span>{icon}</span>}
      {name}
    </button>
  );
};

export default Button;
