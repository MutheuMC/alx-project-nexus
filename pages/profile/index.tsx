import React from "react";
import { MoreHorizontal } from "lucide-react";
import Button from '@/components/common/Button';
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



const ProfileCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const handleClickJobs = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user || !user.user_id) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("created_by", user.user_id);
    console.log("You have been clicked");

    router.push(`/?${params.toString()}`);
  };
      const handleClick = () => {
        console.log('You have been clicked');
      };
    
  return (
    <div>
    <div className="flex flex-col items-center p-6 bg-white  rounded-2xl ">
        <div className="flex gap-10  justify-center">
        <div className="w-20 h-20 flex items-center justify-center bg-purple-500 text-white text-2xl font-bold rounded-full">
        M
      </div>
      <div>
      <h2 className="mt-3 text-3xl font-semibold">Musingila Mutheu</h2>
      <p className="text-gray-500">Kenya</p>
      </div>
        </div>
        
      <div className="flex mt-4 gap-2">
        <button className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100">Edit Profile</button>
        <button className="flex items-center justify-center p-4 border border-gray-300 rounded-full hover:bg-gray-200">
          <MoreHorizontal size={20} />
        </button>
      </div>
   
    </div>
       {/* Navigation Buttons */}
       <div className=" ml-12 flex rounded-lg gap-6 py-5">
        <Button name="Posted Jobs " onClick={handleClickJobs} variant="gray" />
        <Button name="Applications" onClick={handleClick} variant="gray" />
    
      </div>

    </div>
  );
};

export default ProfileCard;