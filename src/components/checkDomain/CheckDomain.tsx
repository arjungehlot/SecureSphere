import React, { useState } from "react";
import axios from "axios";
import Layout from "../layout/Layout";

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
    let color = "text-red-500";
    if (score >= 90) {
      risk = "Completely Safe";
      color = "text-green-600";
    } else if (score >= 70) {
      risk = "Safe";
      color = "text-green-400";
    } else if (score >= 50) {
      risk = "Moderate";
      color = "text-yellow-500";
    } else if (score >= 30) {
      risk = "High Risk";
      color = "text-red-300";
    }

    return { score, risk, color };
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

  return (
    <Layout>
      <div className="bg-[#030712] min-h-screen px-4 py-10 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl text-center font-bold mb-4 text-white">
            Check Domain Authenticity
          </h1>
          <p className="text-gray-400 text-center mb-8 text-lg">
            Verify if a domain is real, safe, or recently registered to avoid
            scams.
          </p>

          <div className="bg-[#0d1420] p-6 rounded-lg shadow-md border border-[#102239]">
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
              <input
                type="text"
                placeholder="Enter domain (e.g. example.com)"
                className="flex-1 p-3 rounded bg-[#1a2332] text-white placeholder-gray-500 border border-[#223344]"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCheck();
                  }
                }}
              />
              <button
                onClick={handleCheck}
                className="bg-blue-600 px-5 py-3 rounded font-semibold hover:bg-blue-700 transition"
              >
                Check
              </button>
            </div>

            {loading && (
              <p className="text-gray-400 text-center">Checking domain...</p>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {result && (
              <div className="mt-6 space-y-4">
                <h2 className="text-xl font-bold">Domain Info</h2>
                <p>
                  <strong>Domain Name:</strong> {result.domain_name}
                </p>
                <p>
                  <strong>Created:</strong> {result.create_date}
                </p>
                <p>
                  <strong>Updated:</strong> {result.update_date}
                </p>
                <p>
                  <strong>Expires:</strong> {result.expiry_date}
                </p>

                {/* Toggle Button */}
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="mt-4 text-blue-500 hover:underline font-semibold"
                >
                  {showMore ? "Hide Details" : "View More Details"}
                </button>

                {/* Conditional Details */}
                {showMore && (
                  <div className="mt-4 space-y-2 text-gray-300">
                    <p>
                      <strong>Registrar:</strong>{" "}
                      {result.domain_registrar?.registrar_name || "N/A"}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {result.domain_status?.join(", ") || "N/A"}
                    </p>
                    <p>
                      <strong>Name Servers:</strong>{" "}
                      {result.name_servers?.join(", ") || "N/A"}
                    </p>
                    <p>
                      <strong>Registrant:</strong>{" "}
                      {result.registrant_contact?.name || "N/A"}
                    </p>
                  </div>
                )}
              </div>
            )}

            {scoreResult && (
              <div className={`mt-6 p-4 rounded border ${scoreResult.color}`}>
                <h2 className="text-lg font-bold">Authenticity Score</h2>
                <p>
                  <strong>Score:</strong> {scoreResult.score}/100
                </p>
                <p>
                  <strong>Risk Level:</strong> {scoreResult.risk}
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
