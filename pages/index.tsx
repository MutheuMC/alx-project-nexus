import React from 'react'
import Filter from "@/components/filter"
import JobCard from '@/components/JobCard'


const index = () => {
  return (
    <div className='flex m-4'>
     <JobCard company={'ddd'} title={'ddd'} location={'ddd'} postedTime={'ddd'} isRemote={false} isFeatured={false} />
    </div>
  )
}

export default index