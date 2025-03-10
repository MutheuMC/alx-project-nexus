import React ,{useState} from 'react';
import Button from '@/components/common/Button';
import Filter from '@/components/Filter';
import Search1 from '@/components/Search1';
import { Plus } from 'lucide-react';
import JobList from '@/components/JobList';
import Link from 'next/link';

const index = () => {

  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleClick = () => {
    console.log('You have been clicked');
  };



  return (
    <div className="bg-white min-h-screen">
      <div className='max-w-4xl mx-auto pt-12 pb-20 px-4'>

  
   
      {/* Header Section */}
      <div className="text-center py-20 bg-white ">
        <p className="text-3xl md:text-5xl font-extrabold text-gray-900">The #1 job board for all jobs</p>
        <span className="text-sm md:text-lg text-gray-600 mt-2 block">
          Job Market is the heart of all jobs. One stop shop to finding anything you want and require even when you don't know
        </span>
        <div className="flex justify-center p-5">
          <Link href={`/jobs/post`}>
          <Button name="Post a Job" icon={<Plus />} onClick={handleClick} variant="danger"  />
          </Link>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className=" ml-12 flex rounded-lg gap-6 py-5">
        <Button name="Job Board" onClick={handleClick} variant="gray" />
    
      </div>

      {/* Search Bar */}
      <div className="ml-12 max-w-3xl ">
      <Search1 placeholder="Search jobs..." />
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
    </div>
  );
};

export default index;
