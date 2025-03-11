import {BadgeProps} from '@/interfaces'

export const Badge: React.FC<BadgeProps> = ({ children, className }) => {
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border border-gray-300 text-gray-700 ${className}`}>
        {children}
      </span>
    );
  };