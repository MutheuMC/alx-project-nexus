import React from 'react';
import { JobCardProps } from '@/interfaces';
import { Card, CardContent } from '@/components/Card';
import { MapPin } from 'lucide-react';

const JobCard: React.FC<JobCardProps> = ({ company, title, location, postedTime, isRemote, isFeatured }) => {
  return (
    <Card className={`p-4 ${isFeatured ? 'bg-purple-100' : 'bg-white'}`}>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{company}</h3>
          {isFeatured && <span className="text-purple-600 text-sm font-bold">FEATURED</span>}
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="text-sm text-gray-600">Posted {postedTime}</div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin size={16} />
          {isRemote ? 'Remote' : location}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;


const jobList: JobCardProps[] = [
  {
    company: 'Superduper',
    title: 'Lead Product Designer (Web3)',
    location: 'Remote',
    postedTime: 'about 8 hours ago',
    isRemote: true,
    isFeatured: true,
  },
  {
    company: 'Savvy Creative Agency',
    title: 'Packaging & Graphic Designer (Hybrid)',
    location: 'Los Angeles, CA',
    postedTime: 'about 8 hours ago',
    isRemote: false,
    isFeatured: false,
  },
];

export const JobList: React.FC = () => {
  return (
    <div className="grid gap-4">
      {jobList.map((job, index) => (
        <JobCard key={index} {...job} />
      ))}
    </div>
  );
};
