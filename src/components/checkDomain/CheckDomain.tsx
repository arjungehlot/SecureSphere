import React, { useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";
import { FiChevronDown, FiChevronUp, FiShield, FiAlertTriangle, FiCheckCircle, FiClock, FiGlobe, FiCalendar, FiServer, FiUser } from "react-icons/fi";

const trustedRegistrars = [
  "GoDaddy",
  "Namecheap",
  "Google",
  "PublicDomainRegistry",
  "Hostinger",
];
const suspiciousWords = ["login", "secure", "verify", "update"];

const DomainChecker = () => {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [scoreResult, setScoreResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);

  const apiKey = "5df301da4a1846f2bba67b5fecab38d6"; // 🔑 Replace with your actual API key

  const calculateScore = (data: any) => {
    let score = 0;

    if (data.domain_registered === "yes") score += 40;

    const created = new Date(data.create_date);
    const today = new Date();
    const ageInDays = Math.floor(
      (today.getTime() - created.getTime()) / (1000 * 3600 * 24)
    );

    if (ageInDays > 180) score += 25;
    else if (ageInDays > 30) score += 15;
    else score += 5;

    const registrar = data.domain_registrar?.registrar_name || "";
    if (
      trustedRegistrars.some((trusted) =>
        registrar.toLowerCase().includes(trusted.toLowerCase())
      )
    ) {
      score += 10;
    } else {
      score -= 5;
    }

    if (
      data.domain_status?.some(
        (status: string) =>
          status.includes("clienttransferprohibited") || status === "ok"
      )
    ) {
      score += 5;
    }

    if (data.name_servers && data.name_servers.length >= 2) {
      score += 5;
    }

    if (data.registrant_contact?.name !== "REDACTED FOR PRIVACY") {
      score += 5;
    }

    if (
      !suspiciousWords.some((word) =>
        data.domain_name?.toLowerCase().includes(word)
      )
    ) {
      score += 5;
    }

    if (ageInDays < 7) score -= 10;

    score = Math.max(0, Math.min(score, 100));

    let risk = "High Risk";
    let color = "bg-red-500/10 text-red-500 border-red-500/30";
    let icon = <FiAlertTriangle className="text-red-500" />;
    if (score >= 90) {
      risk = "Very Safe";
      color = "bg-emerald-500/10 text-emerald-500 border-emerald-500/30";
      icon = <FiCheckCircle className="text-emerald-500" />;
    } else if (score >= 70) {
      risk = "Safe";
      color = "bg-green-500/10 text-green-500 border-green-500/30";
      icon = <FiCheckCircle className="text-green-500" />;
    } else if (score >= 50) {
      risk = "Moderate";
      color = "bg-yellow-500/10 text-yellow-500 border-yellow-500/30";
      icon = <FiShield className="text-yellow-500" />;
    } else if (score >= 30) {
      risk = "High Risk";
      color = "bg-orange-500/10 text-orange-500 border-orange-500/30";
      icon = <FiAlertTriangle className="text-orange-500" />;
    }

    return { score, risk, color, icon };
  };

  const handleCheck = async () => {
    if (!domain) return;

    setLoading(true);
    setResult(null);
    setError(null);
    setScoreResult(null);

    try {
      const response = await axios.get(
        `https://api.whoisfreaks.com/v1.0/whois?whois=live&domainName=${domain}&apiKey=${apiKey}`
      );
      const data = response.data;
      if (
        !data ||
        !data.domain_registered ||
        data.domain_registered !== "yes"
      ) {
        setError("Domain is not registered or unavailable.");
      } else {
        setResult(data);
        const score = calculateScore(data);
        setScoreResult(score);
      }
    } catch (err) {
      setError(
        "Failed to fetch domain info. Please check the domain name or API key."
      );
    } finally {
      setLoading(false);
    }
  };

  const getDomainAge = (createDate: string) => {
    const created = new Date(createDate);
    const today = new Date();
    const ageInDays = Math.floor(
      (today.getTime() - created.getTime()) / (1000 * 3600 * 24)
    );
    
    if (ageInDays < 30) return `${ageInDays} days (New)`;
    if (ageInDays < 365) return `${Math.floor(ageInDays/30)} months`;
    return `${Math.floor(ageInDays/365)} years`;
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 min-h-screen px-4 py-12 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Domain Authenticity Checker
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Verify domain registration details and safety score to identify potential scams or phishing attempts
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-gray-700/50">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="example.com"
                  className="w-full p-4 pr-12 rounded-lg bg-gray-900/70 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCheck();
                    }
                  }}
                />
                {domain && (
                  <button
                    onClick={() => setDomain("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>
              <button
                onClick={handleCheck}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking...
                  </>
                ) : (
                  <>
                    <FiShield className="h-5 w-5" />
                    Check Domain
                  </>
                )}
              </button>
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400">Analyzing domain registration details...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4 mb-6 flex items-start gap-3">
                <FiAlertTriangle className="text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-red-300">Error</h3>
                  <p className="text-red-400/90">{error}</p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <FiGlobe className="text-blue-400" />
                      <h3 className="font-semibold">Domain Information</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-1.5 border-b border-gray-800/50">
                        <span className="text-gray-400">Domain</span>
                        <span className="font-medium">{result.domain_name}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-800/50">
                        <span className="text-gray-400">Registrar</span>
                        <span className="font-medium">{result.domain_registrar?.registrar_name || "Unknown"}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-800/50">
                        <span className="text-gray-400">Status</span>
                        <span className="font-medium">{result.domain_status?.join(", ") || "Unknown"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <FiCalendar className="text-blue-400" />
                      <h3 className="font-semibold">Registration Dates</h3>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-1.5 border-b border-gray-800/50">
                        <span className="text-gray-400">Created</span>
                        <span className="font-medium">{result.create_date}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-800/50">
                        <span className="text-gray-400">Updated</span>
                        <span className="font-medium">{result.update_date || "Never"}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-800/50">
                        <span className="text-gray-400">Expires</span>
                        <span className="font-medium">{result.expiry_date || "Unknown"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {scoreResult && (
                  <div className={`p-5 rounded-xl border ${scoreResult.color} flex items-start gap-4`}>
                    <div className="bg-white/10 p-3 rounded-lg">
                      {scoreResult.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">Authenticity Score</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{
                                width: `${scoreResult.score}%`,
                                background: scoreResult.score >= 70 
                                  ? 'linear-gradient(90deg, #10b981, #3b82f6)' 
                                  : scoreResult.score >= 50 
                                    ? 'linear-gradient(90deg, #f59e0b, #f97316)'
                                    : 'linear-gradient(90deg, #ef4444, #f97316)'
                              }}
                            ></div>
                          </div>
                        </div>
                        <span className="font-bold text-xl">{scoreResult.score}/100</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="font-medium">Risk Level:</span>
                        <span className="font-bold">{scoreResult.risk}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-700/50">
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <FiServer className="text-blue-400" />
                      <span className="font-semibold">Advanced Details</span>
                    </div>
                    {showMore ? <FiChevronUp /> : <FiChevronDown />}
                  </button>

                  {showMore && (
                    <div className="p-4 pt-0 border-t border-gray-800/50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-400 flex items-center gap-2">
                            <FiServer className="opacity-70" />
                            Name Servers
                          </h4>
                          <ul className="space-y-1.5">
                            {result.name_servers?.map((server: string, i: number) => (
                              <li key={i} className="text-sm bg-gray-800/30 px-3 py-1.5 rounded">
                                {server}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium text-gray-400 flex items-center gap-2">
                            <FiUser className="opacity-70" />
                            Registrant Contact
                          </h4>
                          <div className="text-sm space-y-1.5">
                            <div className="bg-gray-800/30 px-3 py-1.5 rounded">
                              <div className="text-gray-400">Name</div>
                              <div>{result.registrant_contact?.name || "REDACTED"}</div>
                            </div>
                            <div className="bg-gray-800/30 px-3 py-1.5 rounded">
                              <div className="text-gray-400">Organization</div>
                              <div>{result.registrant_contact?.organization || "REDACTED"}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700/50">
                  <div className="flex items-center gap-3 mb-3">
                    <FiClock className="text-blue-400" />
                    <h3 className="font-semibold">Domain Age Analysis</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Domain Age</span>
                      <span className="font-medium">{getDomainAge(result.create_date)}</span>
                    </div>
                    <div className="bg-gray-800/30 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">
                        {getDomainAge(result.create_date).includes("New") ? (
                          "⚠️ This domain was registered recently. New domains are more likely to be used for phishing or scams."
                        ) : (
                          "✅ This domain has been registered for a significant time, which increases its credibility."
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!result && !loading && (
              <div className="text-center py-12 border-2 border-dashed border-gray-700/50 rounded-xl">
                <div className="mx-auto w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                  <FiGlobe className="text-blue-400 text-2xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-300 mb-2">Check a Domain</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Enter a domain name above to analyze its registration details, age, and authenticity score.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DomainChecker;