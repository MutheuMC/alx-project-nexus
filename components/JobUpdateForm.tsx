import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

import { Job } from '@/interfaces';
import { useAuth } from "@/context/AuthContext";

interface JobUpdateFormProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


const JobUpdateForm: React.FC<JobUpdateFormProps> = ({ 
  job, 
  isOpen, 
  onClose,
  onSuccess
}) => {
  const [formData, setFormData] = useState<Partial<Job>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const { fetchWithAuth } = useAuth();

  useEffect(() => {
    // Add blur to body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (job) {
      // Set initial form data from job
      setFormData({
        title: job.title || '',
        company_name: job.company_name || '',
        description: job.description || '',
        location: job.location || '',
        experience_level: job.experience_level || '',
      });
    }
  }, [job]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    console.log(job.id)

    try {
        const response = await fetchWithAuth(`https://michaelmwanza.site/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update job: ${response.status}`);
      }

      // Call success callback
      onSuccess();
      // Close the modal
      onClose();
    } catch (err) {
      setError('Failed to update job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred backdrop */}
      <div 
        className="absolute inset-0 backdrop-blur-sm bg-white/30"
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="bg-purple-50 rounded-lg w-full max-w-2xl mx-4 relative overflow-y-auto max-h-[90vh] shadow-xl z-10">
        {/* Header */}
        <div className="p-4  flex justify-between items-center sticky top-0 bg-white ">
        <h2 className="text-xl font-bold text-center w-full">Update Job</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
           <X size={24} className="text-red-500" />

          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="company_name">
              Experience Level
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.experience_level || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="company_name">
              Company Name
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={6}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="experience_level">
              Experience Level
            </label>
            <select
              id="experience_level"
              name="experience_level"
              value={formData.experience_level || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select experience level</option>
              <option value="Entry">Entry</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobUpdateForm;