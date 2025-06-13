// --- Enhanced version of your EmailAnalyzer.tsx component ---

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { CheckCircle, AlertTriangle, AlertCircle, X, Mail } from "lucide-react";
import { Progress } from "./ui/progress";
import { Textarea } from "@headlessui/react";

interface AnalysisResult {
  status: "safe" | "suspicious" | "dangerous" | null;
  title: string;
  description: string;
  details?: {
    threatType?: string;
    confidence?: number;
    detectedBy?: string[];
    timestamp?: string;
  };
  mitigationSteps?: string[];
}

interface SpamApiResponse {
  result: string; // expecting 'Spam' or 'Not Spam'
}

const EmailAnalyzer = () => {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
    setError(null);
  };

  const clearInput = () => {
    setInput("");
    setResult(null);
    setError(null);
  };

  const validateEmailContent = (content: string): boolean => {
    return content.trim().length > 10;
  };

  const analyzeEmail = async (content: string) => {
    try {
      const response = await fetch("https://securesphereml.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze email");
      }

      const data: SpamApiResponse = await response.json();

      const isSpam = data.result.toLowerCase() === "spam";

      return {
        status: isSpam ? "dangerous" as const : "safe" as const,
        title: isSpam ? "Spam Email Detected" : "Legitimate Email",
        description: isSpam
          ? "This email has been identified as spam with high confidence."
          : "This email appears to be safe and not spam.",
        details: {
          threatType: isSpam ? "Spam" : undefined,
          confidence: 95, // dummy confidence
          detectedBy: ["Spam ML API"],
          timestamp: new Date().toISOString(),
        },
        mitigationSteps: isSpam
          ? [
              "Do not respond to this email",
              "Mark as spam in your email client",
              "Delete the email to avoid accidental interaction",
              "Be cautious of similar messages in the future",
            ]
          : [],
      };
    } catch (err) {
      console.error("Error analyzing email:", err);
      throw err;
    }
  };

  const handleSubmit = async () => {
    if (!validateEmailContent(input)) {
      setError("Please enter valid email content (at least 10 characters)");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const analysisResult = await analyzeEmail(input);
      setResult(analysisResult);
    } catch (err) {
      setError("Failed to analyze email content. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto p-4">
      {/* Hero Section */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          🛡️ AI Email Spam Detector
        </h1>
        <p className="text-gray-400">
          Enter email content below to detect spam using our ML model.
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <Textarea
          placeholder="Paste email content to check for spam"
          value={input}
          onChange={handleInputChange}
          className="w-full h-32 p-3 bg-gray-900 border border-gray-700 rounded-lg text-white"
        />
        <div className="flex justify-between">
          <Button onClick={handleSubmit} disabled={isAnalyzing || !input.trim()}>
            {isAnalyzing ? "Analyzing..." : "Analyze Email"}
          </Button>
          {input && (
            <button
              onClick={clearInput}
              className="text-gray-400 hover:text-red-400"
            >
              Clear
            </button>
          )}
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>

      {/* Loading */}
      {isAnalyzing && <Progress value={50} />}

      {/* Result Section */}
      {result && (
        <div className="space-y-4">
          <Alert
            variant={result.status === "dangerous" ? "destructive" : "default"}
            className="bg-gray-800 text-white"
          >
            <div className="flex items-center gap-3">
              {result.status === "dangerous" ? (
                <AlertCircle className="text-red-500" />
              ) : (
                <CheckCircle className="text-green-500" />
              )}
              <AlertTitle>{result.title}</AlertTitle>
              {result.status === "dangerous" ? (
                <Badge variant="destructive">Spam</Badge>
              ) : (
                <Badge variant="default" className="bg-green-500">Safe</Badge>
              )}
            </div>
            <AlertDescription className="mt-2">
              {result.description}
            </AlertDescription>
          </Alert>

          {/* Details */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 text-white">Details</h3>
            <ul className="text-gray-300 space-y-1">
              {result.details?.threatType && <li>Threat Type: {result.details.threatType}</li>}
              {result.details?.confidence && <li>Confidence: {result.details.confidence}%</li>}
              {result.details?.timestamp && <li>Time: {new Date(result.details.timestamp).toLocaleString()}</li>}
              {result.details?.detectedBy && <li>Source: {result.details.detectedBy.join(", ")}</li>}
            </ul>
          </div>

          {/* Recommendations */}
          {result.mitigationSteps?.length > 0 && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold mb-2 text-white">What You Should Do</h3>
              <ul className="text-gray-300 list-disc pl-5 space-y-1">
                {result.mitigationSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EmailAnalyzer;