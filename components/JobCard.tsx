import React from 'react';
import { Job } from '@/interfaces';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import Router from 'next/router';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'outline' | 'default';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'default', onClick }) => {
  const baseStyles = 'px-4 py-2 rounded-full font-medium  text-black text-sm focus:outline-none focus:ring';
  const variants = {
    outline: 'border border-gray-500 text-black hover:cursor-pointer',
    default: 'bg-blue-500 text-white hover:bg-blue-600',
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick}>
      {children}
    </button>
  );
};

const timeAgo = (date: string) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [key, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count > 0) {
      return `${count} ${key}${count !== 1 ? 's' : ''} ago`;
    }
  }
  return 'Just now';
};


const JobCard: React.FC<Job> = ({ company_name, id, title, location, posted_at, experience_level }) => {
  return (
      <div className="w-full md:w-[650px] lg:w-[750px] xl:w-[900px] rounded-lg shadow-md p-6 mb-4 border border-gray-200 group hover:bg-gray-50 transition duration-300 flex flex-col space-y-4">
        <div className="flex items-start space-x-4 w-full">
          {/* Company Logo */}
          <img
              src={`https://robohash.org/${company_name}`}
              alt={`${company_name} Logo`}
              className="w-16 h-16 rounded-lg object-cover"
          />

          {/* Job Title and Company */}
          <div className="flex-1">
            <p className="text-sm text-gray-500">{company_name}</p>
            <h3 className="text-lg font-semibold text-black">{title}</h3>
          </div>

          {/* Right-aligned section (Show Posted time & Location OR Buttons on hover) */}
          <div className="flex flex-col items-end text-right">
            {/* Show before hover */}
            <div className="group-hover:hidden flex flex-col items-end">
              <div className="text-base font-light text-gray-400">Posted about {timeAgo(posted_at)}</div>
              <div className="flex items-center font-bold text-sm text-black space-x-2 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{location}</span>
              </div>
            </div>

            {/* Show on hover */}
            <div className="hidden group-hover:flex space-x-2">
              <Link href={`/jobs/${id}`}>
                <Button variant="outline">View job</Button>
              </Link>
              <Link href={`/jobs/${id}/apply`}>
                <Button variant="outline">Apply now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default JobCard;
