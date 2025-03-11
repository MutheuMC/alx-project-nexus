import React, { useState, useEffect } from "react";
import Button from "@/components/common/Button";
import Filter from "@/components/Filter";
import Search1 from "@/components/Search1";
import { Plus } from "lucide-react";
import JobList from "@/components/JobList";
import Link from "next/link";

interface User {
  user_id: string;
  name?: string;
}
const Index = () => {
  const [filters, setFilters] = useState<Record<string, string | string[]>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("jobBoard");
  const [user, setUser] = useState<User | null>(null);


  const handleClick = ()=>{
    console.log(`clicked`)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  type TabType = "jobBoard" | "postedJobs" | "applications"; // Adjust based on your tabs

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto pt-12 pb-20 px-4">
        <div className="text-center py-20 bg-white">
          <p className="text-3xl md:text-5xl font-extrabold text-gray-900">The #1 job board for all jobs</p>
          <span className="text-sm md:text-lg text-gray-600 mt-2 block">
            Job Market is the heart of all jobs. One stop shop to finding anything you want and require even when you don't know
          </span>
          <div className="flex justify-center p-5">
          <Link href={`/jobs/post`}>
                <Button name="Post a Job" icon={<Plus />} onClick={handleClick} variant="danger" />
              </Link>
          </div>
        </div>

        <div className="ml-12 flex rounded-lg gap-6 py-5">
         <div className="text-black">
          <Button
              name="Job Board"
              onClick={() => handleTabChange("jobBoard")}
              variant={activeTab === "jobBoard" ? "gray" : "danger"}

          />
         </div>
          {isLoggedIn && (
            <>
              <Button name="Posted Jobs" onClick={() => handleTabChange("postedJobs")} variant={activeTab === "postedJobs" ? "gray" : "danger"} />
              <Button name="Applications" onClick={() => handleTabChange("applications")} variant={activeTab === "applications" ? "gray" : "danger"} />
            </>
          )}
        </div>

                {/* Search Bar - Show on all tabs */}
                           {/* <div className="ml-12 max-w-3xl pb-4">
              <Search1 placeholder="Search jobs..." />
            </div> */}
   

          <div className="flex flex-col md:flex-row gap-10 px-4 md:px-10">
          <div className="flex-1 space-y-10"> 
            <Search1 placeholder="Search jobs..." /> 
            <h2 className="text-3xl text-gray-900 font-extrabold ">Recent Posts</h2>
            <JobList filter={filters} />
          </div>
          <div className="hidden md:block w-full md:w-[300px] md:shrink-0">
            <Filter userId={user?.user_id} activeTab={activeTab} onFilterChange={setFilters} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Index;