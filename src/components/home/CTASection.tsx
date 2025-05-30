import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-secureSphere-gray-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
      <div className="absolute bottom-48 left-0 w-1/3 h-1/3 bg-secureSphere-blue/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-br from-secureSphere-gray-900 to-secureSphere-gray-800 rounded-2xl p-8 md:p-12 border border-secureSphere-gray-700 shadow-xl shadow-secureSphere-purple/5">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <div className="inline-flex items-center gap-2 bg-secureSphere-purple/20 px-4 py-2 rounded-full mb-6">
                <Shield className="h-4 w-4 text-secureSphere-purple-light" />
                <span className="text-secureSphere-purple-light text-sm font-medium">
                  Enhanced Protection
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Start Protecting Your Digital Identity Today
              </h2>

              <p className="text-secureSphere-gray-300 text-lg mb-8">
                Join thousands of users who trust SecureSphere to keep them safe
                from online scams and fraud attempts.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secureSphere-purple-light" />
                  <span className="text-white">
                    Advanced scam detection algorithms
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secureSphere-purple-light" />
                  <span className="text-white">
                    Real-time threat intelligence updates
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secureSphere-purple-light" />
                  <span className="text-white">
                    Community-powered scam reporting
                  </span>
                </div>
              </div>

              <div className="flex flex-row gap-2">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light w-36 md:w-48 hover:opacity-90 text-white px-8"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white hover:opacity-90 w-36 text-black px-8"
                >
                  View Demo
                </Button>
              </div>
            </div>

            <div className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light rounded-full opacity-30 blur-xl animate-pulse"></div>
                <div className="relative bg-secureSphere-gray-900 p-6 rounded-2xl border border-secureSphere-gray-700">
                  <div className="text-center mb-6">
                    <Shield className="h-16 w-16 mx-auto text-secureSphere-purple-light mb-4" />
                    <h3 className="text-xl font-bold text-white">
                      Premium Protection
                    </h3>
                    <p className="text-secureSphere-gray-400 mt-2">
                      Comprehensive security suite
                    </p>
                  </div>

                  <div className="flex justify-center mb-6">
                    <div className="text-center">
                      <span className="text-4xl font-bold text-white">$0</span>
                      <span className="text-secureSphere-gray-400 ml-1">
                        /month
                      </span>
                      <p className="text-secureSphere-purple-light text-sm mt-1">
                        Free during beta
                      </p>
                    </div>
                  </div>

                  <Button className="w-full bg-secureSphere-purple hover:bg-secureSphere-purple-light text-white">
                    Activate Free Trial
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
