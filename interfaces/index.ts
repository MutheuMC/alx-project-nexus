export type ButtonVariant = "primary" | "outline" | "danger";

export interface ButtonProps {
  name: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant; // Optional variant prop
}

export interface Job {
  id: number;
  company_name: string;
  title: string;
  location: string;
  posted_at: string;
  experience_level: string;
  description: string;
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

