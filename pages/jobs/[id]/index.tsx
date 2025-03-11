import React, {useEffect , useState} from 'react'
import { useRouter } from 'next/router'
import { useJob } from '@/hooks/useJob';
import { useParams } from 'next/navigation';
import { JobInfo } from '@/components/JobInfo';
import Link from 'next/link';

const JobDetailsPage: React.FC = () => {
  const router = useRouter()
  const [jobId, setJobId] = useState<number | null>(null)

  // Use effect to safely get the ID after component mounts
  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id
      setJobId(Number(id))
    }
  }, [router.isReady, router.query])

  const { job, loading, error } = useJob(jobId as string | number);

  if (!router.isReady || loading) {
    return <div className="container mx-auto p-6">Loading...</div>
  }

  if (error) {
    return <div className="container mx-auto p-6">Error: {error}</div>
  }

  if (!job) {
    return <div className="container mx-auto p-6">No job found</div>
  }

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-8">
      {/* Main Job Details Section */}
      <div className="flex-grow w-full md:w-2/3">
        <div className="mb-4">
          <Link href={`/`}>
          <p className="text-gray-500 hover:text-black  p-6">← All Jobs</p>
          </Link>
          
        </div>
        
        <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Share</button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Tweet</button>
            <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Copy</button>
          </div>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">What Do We Offer?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>A competitive payment of 500 EUR per day</li>
            <li>Remote work: We focus on results, not your location</li>
            <li>Flexible work environment & hours</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">The Role:</h2>
          <p className="text-gray-700 mb-4">
            {job.description || 'We are looking for a highly skilled Freelance Senior Brand Designer to lead impactful brand projects from concept through execution. If you have a strategic mindset, creative vision, and a flair for impactful concept presentations, we\'d love to hear from you.'}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">About Us:</h2>
          <p className="text-gray-700">
            {job.company_name || 'Konpo'} is a full-stack design studio. We handle a company's entire design spectrum, from the foundational design work in marketing through delightful product design and scalable systems that sustain cohesive growth. We purposely maintain a small and nimble team to fully align with our partners, becoming the integrated design component of their teams.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Key Responsibilities:</h2>
          <ul className="list-disc list-inside space-y-4">
            <li>
              <strong>Strategic Brand Development:</strong> Lead the conceptualization and development of unique brand identities, ensuring alignment with client goals and market trends.
            </li>
            <li>
              <strong>In-depth Research and Insights:</strong> Perform comprehensive market research, competitor analysis, and user studies to inform branding decisions.
            </li>
            <li>
              <strong>Visual Identity Creation:</strong> Design logos, typography, color palettes, and supporting visual assets that resonate with target audiences and enhance brand recognition.
            </li>
          </ul>
        </section>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-1/3">
        <JobInfo 
          id={job.id}
          company_name={job.company_name}
          title={job.title}
          description={job.description}
          location={job.location}
          posted_at={job.posted_at}
          experience_level={job.experience_level}
        />

        <div className="mt-8 bg-white border border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">You might also like</h3>
          <div className="space-y-2">
            <a href="#" className="text-blue-600 hover:underline block">Brand / Graphic Design Jobs</a>
            <a href="#" className="text-blue-600 hover:underline block">Remote Brand / Graphic Design Jobs</a>
          </div>
        </div>

        <div className="mt-8 bg-white border border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Are you also hiring?</h3>
          <div className="space-y-2">
            <a href="#" className="text-blue-600 hover:underline block">Hire Brand & Graphic Designers</a>
            <a href="#" className="text-blue-600 hover:underline block">Hire Remote Brand & Graphic Designers</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDetailsPage