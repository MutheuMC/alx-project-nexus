export type ButtonVariant = "primary" | "outline" | "danger" | "gray";

export interface ButtonProps {
  name: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant; // Optional variant prop
}

export interface Job {
  id: number;
  company_name?: string;
  title: string;
  location: string;
  posted_at: string;
  experience_level: string;
  description: string;
  created_by?: string
}

  export interface CardProps {
    children: React.ReactNode;
    className?: string;
  }


export interface ApiResponse {
  results: Job[];
}
export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export interface category{
  id: number;
  name:string;
}
export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}