import React from 'react'
import Button from '@/components/common/Button'
import Filter from "@/components/filter"
import JobCard from '@/components/JobCard'
import Search1 from '@/components/Search1'
import {Plus} from "lucide-react"


const index = () => {
  const handleClick = ()=>{
    console.log("You have been clicked")

  }
  return (
    <div>
      <div className='text-center p-30 '>
        <p className="text-3xl md:text-5xl lg:text-7xl ">The #1 job board for all jobs </p> 
        <span className='text-sm md:text-md lg:text-base font-thin'>Job Market is the heart of all jobs. One stop shop to finding anything you want and require even when you dont know</span>
        <div className='flex justify-center p-5'>
        <Button  name="Post a Job " icon={<Plus />} onClick={() => handleClick()} variant="danger"></Button>

        </div>
    </div>

    <div className='flex gap-10 p-5'>
    <Button  name="Job Board "  onClick={() => handleClick()} variant="primary"></Button>
    <Button  name="Post a Job "  onClick={() => handleClick()} variant="primary"></Button>


    </div>
    <div>
    <Search1 />
      {/* <JobCard company={'k'} title={'k'} location={'k'} postedTime={'k'} isRemote={false} isFeatured={false} /> */}
    </div>
    <div>
      <Filter />
    </div>

    </div>
  
  )
}

export default index