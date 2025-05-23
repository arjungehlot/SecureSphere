import React from 'react';
import Layout from '../layout/Layout';

const CheckDomain = () => {
  return (
    <Layout>
      <div className="bg-[#030712] min-h-screen px-4 py-10 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl text-center font-bold mb-4 text-white">
            Check Domain Authenticity
          </h1>
          <p className="text-gray-400 text-center  mb-8 text-lg">
            Verify if a domain is real, safe, or recently registered to avoid scams.
          </p>

          {/* Placeholder for domain checker tool */}
          <div className="bg-[#0d1420] p-6 rounded-lg shadow-md border border-[#102239]">
            <p className="text-gray-400 text-center italic">
              Domain checker functionality coming soon...
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckDomain;
