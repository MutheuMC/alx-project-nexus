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
      <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
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
          <Button name="Job Board" onClick={() => handleTabChange("jobBoard")} variant={activeTab === "jobBoard" ? "gray" : "danger"} />
          {isLoggedIn && (
            <>
              <Button name="Posted Jobs" onClick={() => handleTabChange("postedJobs")} variant={activeTab === "postedJobs" ? "gray" : "danger"} />
              <Button name="Applications" onClick={() => handleTabChange("applications")} variant={activeTab === "applications" ? "gray" : "danger"} />
            </>
          )}
        </div>

                {/* Search Bar - Show on all tabs */}
      <div className="ml-12 max-w-3xl">
        <Search1 placeholder="Search jobs..." />
      </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10">
          <div className="col-span-2">
            <JobList filter={filters} />
          </div>
          <div className="col-span-1">
            <Filter userId={user?.user_id} activeTab={activeTab} onFilterChange={setFilters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
