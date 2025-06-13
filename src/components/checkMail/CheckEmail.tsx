import React from 'react'
import Layout from '../layout/Layout'
import LinkEmailAnalyzer from '../LinkEmailAnalyzer'
import EmailAnalyzer from '../EmailAnalyzer'

const CheckEmail = () => {
  return (
    <Layout>
       <div className="flex flex-col items-center justify-center h-screen bg-[#030712]">
        <EmailAnalyzer />
      </div>
    </Layout>
  )
}

export default CheckEmail
