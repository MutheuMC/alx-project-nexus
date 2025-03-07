// pages/post-job.tsx
import React, { useState } from 'react';
import Head from 'next/head';
import { FaBold, FaItalic, FaListUl, FaListOl } from 'react-icons/fa';
import { useCategories } from '@/hooks/useCategories';

type ExperienceOption = {
  value: string;
  label: string;
};

const PostJob: React.FC = () => {
  // Form state
  const [formData, setFormData] = useState({
    company_name:'',
    jobTitle: '',
    jobDescription: '',
    jobLocation: '',
    experience_level: '',
  });

  // Load categories
  const { categories, loading, error } = useCategories();

  const experienceOptions: ExperienceOption[] = [
    { value: 'Entry', label: 'Entry' },
    { value: 'Mid', label: 'Mid' },
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

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
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
                <label htmlFor="jobTitle" className="block text-gray-700 mb-2">
                  Job title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  placeholder="e.g. Senior Product Designer"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Job Description Field */}
              <div className="mb-6">
                <label htmlFor="jobDescription" className="block text-gray-700 mb-2">
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
                    id="jobDescription"
                    className="w-full p-4 min-h-[250px] focus:outline-none"
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Job Location Field */}
              <div className="mb-6">
                <label htmlFor="jobLocation" className="block text-gray-700 mb-2">
                  Job location
                </label>
                <input
                  type="text"
                  id="jobLocation"
                  placeholder='e.g. "New York City" or "San Francisco"'
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={formData.jobLocation}
                  onChange={handleInputChange}
                />
                <p className="text-sm text-gray-500 mt-1">
                  If left blank, location will be set to "Remote"
                </p>
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
                  <option value="" disabled>Select workplace type</option>
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
                  className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Post
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