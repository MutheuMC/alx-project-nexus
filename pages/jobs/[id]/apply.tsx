// pages/post-job.tsx
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaBold, FaItalic, FaListUl, FaListOl } from 'react-icons/fa';
import { authMiddleware } from '@/middleware/authMiddleware';
import { useParams } from 'next/navigation';
 import { getApiUrl, CSRF_TOKEN } from "@/config";
 import { useAuth } from "@/context/AuthContext";

const ApplyJob: React.FC = () => {
    const params = useParams();
    const id = params?.id || '';
 

    // Parse user from localStorage
    let user = null;
    if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            user = JSON.parse(storedUser);
        }
    }

    // Form state
    const [formData, setFormData] = useState({
        user: user?.user_id || '',
        jobTitle: '',
        cover_letter: '',
        cv_path: './',
        job_post: id,
        job_post_id: id,
        cv: null as File | null,
    });

    // Call auth middleware to protect this page
    useEffect(() => {
        authMiddleware(); // Redirects to login if not authenticated
    }, []);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    // Handle file upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Optional chaining ensures safety
        if (file) {
            setFormData(prev => ({
                ...prev,
                cv: file
            }));
        }
    };
    
    // Text formatting handlers
    const formatText = (format: string) => {
        console.log(`Formatting text as ${format}`);
        // Implement text formatting logic here
    };
 const { fetchWithAuth } = useAuth();
    
const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        console.log(formData)



    // Create a FormData object to handle file uploads
    const formDataToSend = new FormData();
    formDataToSend.append("user", formData.user);
    formDataToSend.append("jobTitle", formData.jobTitle);
    formDataToSend.append("cover_letter", formData.cover_letter);
    formDataToSend.append("job_post", String(formData.job_post));
    formDataToSend.append("job_post_id",String(formData.job_post_id));
    formDataToSend.append("cv_path", formData.cv_path);
 

    if (formData.cv) {
        formDataToSend.append("cv", formData.cv);
    }
    for (const [key, value] of formDataToSend.entries()) {
        console.log(`${key}:`, value);
    }
    

    try {
        const response = await fetchWithAuth("https://michaelmwanza.site/api/apply/", {
          method: "POST",
          body: formDataToSend ,
        });
  
          const data = await response.json();
  
          if (!response.ok) {
              console.error("Submission failed:", data); 
              alert(`Failed to submit job post. Errors: ${JSON.stringify(data, null, 2)}`);
              return;
          }
  
          console.log("Job Application submitted successfully:", data.details);
          alert("Job Application submitted successfully!");
      } catch (error) {
          console.error("Error submitting Job Application:", error);
          alert("Failed to submit Job Application. Please try again.");
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
                    <div className="text-center mb-8 p-8">
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
                                <label htmlFor="cover_letter" className="block text-gray-700 mb-2">
                                    Add your Cover Letter <span className="text-red-500">*</span>
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
                                        id="cover_letter"
                                        className="w-full p-4 min-h-[250px] focus:outline-none"
                                        value={formData.cover_letter}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* CV Upload */}
                            <div className="mb-6">
                                <label htmlFor="cv" className="block text-gray-700 mb-2">
                                    Upload CV
                                </label>
                                <input
                                    type="file"
                                    id="cv"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    onChange={handleFileChange}
                                />
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
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ApplyJob;
