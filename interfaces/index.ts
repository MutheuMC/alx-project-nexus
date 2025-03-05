export type ButtonVariant = "primary" | "outline" | "danger";

export interface ButtonProps {
  name: string;
  icon?: React.ReactNode;
  onClick: () => void;
  variant?: ButtonVariant; // Optional variant prop
}

export interface JobCardProps {
    company: string;
    title: string;
    location: string;
    postedTime: string;
    isRemote: boolean;
    isFeatured: boolean;
  }

  export interface CardProps {
    children: React.ReactNode;
    className?: string;
  }