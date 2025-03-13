// pages/post-job.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaBold, FaItalic, FaListUl, FaListOl } from 'react-icons/fa';
import { useCategories } from '@/hooks/useCategories';
import { authMiddleware } from '@/middleware/authMiddleware';
import { getApiUrl, CSRF_TOKEN } from "@/config";
import { useAuth } from "@/context/AuthContext";

type ExperienceOption = {
  value: string;
  label: string;
};

const PostJob: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);


  // Parse user from localStorage
  let user = null;
  if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
          user = JSON.parse(storedUser);
      }
  }
  useEffect(() => {
    authMiddleware(); 
  }, []);
  // Form state
  const [formData, setFormData] = useState({
    company_name:'',
    title: '',
    description: '',
    location: '',
    category:'',
    experience_level: '',
    created_by :user?.user_id || ''
  });
 


  

  // Load categories
  const { categories, loading, error } = useCategories();

  const experienceOptions: ExperienceOption[] = [
    { value: 'Entry', label: 'Entry-level' },
    { value: 'Mid', label: 'Mid-level' },
    { value: 'Senior', label: 'Senior' }
  ];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Text formatting handlers
  const formatText = (format: string) => {
    console.log(`Formatting text as ${format}`);
    // Implement text formatting logic here
  };
  const { fetchWithAuth } = useAuth();

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 
    // console.log('Form submitted:', formData);



    try {
      const response = await fetchWithAuth("https://michaelmwanza.site/api/jobs/", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

        const data = await response.json();

        if (!response.ok) {
            console.error("Submission failed:", data); 
            alert(`Failed to submit job post. Errors: ${JSON.stringify(data, null, 2)}`);
            return;
        }

        setFormData({
          company_name:'',
          title: '',
          description: '',
          location: '',
          category:'',
          experience_level: '',
          created_by :''

        })

        console.log("Job Post submitted successfully:", );
        alert("Job Post submitted successfully!");
    } catch (error) {
        console.error("Error submitting Job Post:", error);
        alert("Failed to submit Job Post. Please try again.");
    }finally{
      setIsLoading(false);
    }
};


  // Handle cancel button
  const handleCancel = () => {
    console.log('Cancelled');
    // Add cancel logic here
  };

  return (
    <>
      <Head>
        <title>Post a Job on Job Markets</title>
        <meta name="description" content="Post a job on Job Markets, the #1 job board for hiring designers and creative professionals" />
      </Head>

      <div className="min-h-screen bg-purple-50">
        <div className="max-w-4xl mx-auto pt-12 pb-20 px-4">
          {/* Header Section */}
          <div className="text-center mb-8 p-8 ">
            <h1 className="text-3xl font-bold text-purple-900 mb-2">Post a job on Job Markets</h1>
            <p className="text-gray-700">The #1 job board for hiring designers and creative professionals.</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Tell us about your role</h2>
            
            </div>

            <form onSubmit={handleSubmit}>
              {/* Job Title Field */}
              <div className="mb-6">
                <label htmlFor="title" className="block text-gray-700 mb-2">
                  Job title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="e.g. Senior Product Designer"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>


              {/* Job Categories Field */}
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Job Categories <span className="text-red-500">*</span>
                </label>
                {loading ? (
                  <p>Loading categories...</p>
                ) : error ? (
                  <p className="text-red-500">Failed to load categories</p>
                ) : (
                  <select
                  id="category"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Job Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                )}
              </div>


              {/* Job Description Field */}
              <div className="mb-6">
                <label htmlFor="description" className="block text-gray-700 mb-2">
                  Add your job description <span className="text-red-500">*</span>
                </label>
                <div className="border border-gray-300 rounded-md overflow-hidden">
                  {/* Text Formatting Toolbar */}
                  <div className="flex items-center p-2 border-b bg-gray-50">
                    <select className="mr-2 p-1 border-r text-sm text-gray-700 bg-transparent outline-none">
                      <option>Body</option>
                      <option>Heading 1</option>
                      <option>Heading 2</option>
                    </select>
                    <button 
                      type="button" 
                      className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                      onClick={() => formatText('bold')}
                      aria-label="Bold"
                    >
                      <FaBold />
                    </button>
                    <button 
                      type="button" 
                      className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                      onClick={() => formatText('italic')}
                      aria-label="Italic"
                    >
                      <FaItalic />
                    </button>
                    <button 
                      type="button" 
                      className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                      onClick={() => formatText('bulletList')}
                      aria-label="Bullet List"
                    >
                      <FaListUl />
                    </button>
                    <button 
                      type="button" 
                      className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                      onClick={() => formatText('numberedList')}
                      aria-label="Numbered List"
                    >
                      <FaListOl />
                    </button>
                  </div>
                  <textarea
                    id="description"
                    className="w-full p-4 min-h-[250px] focus:outline-none"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Job Location Field */}
              <div className="mb-6">
                <label htmlFor="location" className="block text-gray-700 mb-2">
                  Job location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder='e.g. "New York City" or "San Francisco"'
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              
              </div>
              {/* {Company name} */}
              <div className="mb-6">
                <label htmlFor="company_name" className="block text-gray-700 mb-2">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company_name"
                  placeholder="e.g. Senior Product Designer"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.company_name}
                  onChange={handleInputChange}
                  required
                />
              </div>


              {/* Workplace Type Field */}
              <div className="mb-6">
                <label htmlFor="experience_level" className="block text-gray-700 mb-2">
                  Experience Level <span className="text-red-500">*</span>
                </label>
                <select
                  id="experience_level"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white"
                  value={formData.experience_level}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select Experience level</option>
                  {experienceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Form Buttons */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Posting..." : "Post"}
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostJob;