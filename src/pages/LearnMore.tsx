import Layout from '@/components/layout/Layout'
import React from 'react'

const LearnMore = () => {

  return (
    <Layout>
     <div className='flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white'>
       <h1 className='text-4xl font-bold mb-6'>Learn More</h1>
         We are currently working on the Learn More page. Stay tuned for updates!
       <p className='text-gray-400 text-lg mt-4'>In the meantime, feel free to explore our other features and sections.</p>
         <div className='mt-8'>
            <a href="/" className='text-secureSphere-purple-light hover:underline'>Go back to Home</a>
         </div>
     </div>
    </Layout>
  )
}

export default LearnMore
