import React from 'react'
import Button from '@/components/common/Button';
import { Plus, Trash } from "lucide-react";

const index = () => {
  const handleClick = (msg: string) => {
    console.log(msg);
  };
  return (
    <div>
    <div className='text-center'>
    <p className="text-3xl md:text-5xl lg:text-7xl ">The #1 job board for all jobs </p> 
    <span className='text-sm md:text-md lg:text-base font-thin'>Job Market is the heart of all jobs. One stop shop to finding anything you want and require even when you dont know</span>
    </div>
    <Button name="Post a Job " icon={<Plus />} onClick={() => handleClick("")} variant="danger"></Button>

    </div>
  )
}

export default index