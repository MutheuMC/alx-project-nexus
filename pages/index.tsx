import React from 'react';
import Button from '@/components/common/Button';
import Filter from '@/components/Filter';
import Search1 from '@/components/Search1';
import { Plus } from 'lucide-react';
import JobList from '@/components/JobList';

const index = () => {
  const handleClick = () => {
    console.log('You have been clicked');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="text-center py-20 bg-white shadow-sm">
        <p className="text-3xl md:text-5xl font-extrabold text-gray-900">The #1 job board for all jobs</p>
        <span className="text-sm md:text-lg text-gray-600 mt-2 block">
          Job Market is the heart of all jobs. One stop shop to finding anything you want and require even when you don't know
        </span>
        <div className="flex justify-center p-5">
          <Button name="Post a Job" icon={<Plus />} onClick={handleClick} variant="danger"  />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className=" ml-12 flex  gap-6 py-5">
        <Button name="Job Board" onClick={handleClick} variant="primary" />
        <Button name="Post a Job" onClick={handleClick} variant="primary"  />
      </div>

      {/* Search Bar */}
      <div className="ml-12 max-w-3xl ">
        <Search1  />
      </div>

      {/* Job List and Filters Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
        <div className="col-span-2">
          <JobList />
        </div>
        <div className="col-span-1">
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default index;
