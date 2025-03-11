import React from 'react';
import { Job } from '@/interfaces';
import Link from 'next/link';

export const JobInfo: React.FC<Job> = ({
  company_name, 
  id, 
  title, 
  location, 
  posted_at, 
  experience_level 
}) => {
  return (
    <div className="border rounded-lg p-6 shadow-lg w-full bg-white">
      <div className="flex flex-col items-center text-center">
        <img
          src={`https://robohash.org/${company_name}`}
          alt={`${company_name} Logo`}
          className="rounded-full mb-4 object-cover"
          width={60}
          height={60}
        />
     
        <h2 className="text-xl font-bold">{company_name}</h2>
        <a href="#" className="text-blue-600 hover:underline mb-4">
          Visit Website
        </a>
        <Link href={`/jobs/${id}/apply`}>
        <button className="bg-black text-white py-2 px-4 rounded-lg mb-4">
          Apply for this position
        </button>
        </Link>
      </div>
      <hr className="my-4" />
      <div className="text-left">
        <p className="font-bold">Job Type</p>
        <p>{experience_level || 'Not Specified'}</p>

        <p className="font-bold mt-4">Location</p>
        <p>{location}</p>
       

        <p className="font-bold mt-4">Date posted</p>
        <p>{new Date(posted_at).toLocaleDateString('en-US', {
          month: 'long', day: '2-digit', year: 'numeric'
        })}</p>
      </div>
    </div>
  );
}