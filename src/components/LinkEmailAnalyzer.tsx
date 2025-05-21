import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import {
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  X,
  ExternalLink,
  Shield,
  Mail,
} from "lucide-react";
import { Progress } from "./ui/progress";

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

const LinkEmailAnalyzer = () => {
  const [analysisType, setAnalysisType] = useState<"url" | "email">("url");
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const clearInput = () => {
    setInput("");
    setResult(null);
  };

  const handleSubmit = () => {
    if (!input.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    // Simulate API call with timeout
    setTimeout(() => {
      // Mock results for demonstration
      const mockResults: Record<string, AnalysisResult> = {
        safe: {
          status: "safe",
          title: "No threats detected",
          description: "This content appears to be safe based on our analysis.",
          details: {
            confidence: 95,
            detectedBy: ["URL Reputation Database", "Content Scanner"],
            timestamp: new Date().toISOString(),
          },
        },
        suspicious: {
          status: "suspicious",
          title: "Potential risk detected",
          description:
            "This content contains some suspicious elements that warrant caution.",
          details: {
            threatType: "Potential Phishing",
            confidence: 65,
            detectedBy: ["Pattern Analysis", "Domain Age Check"],
            timestamp: new Date().toISOString(),
          },
          mitigationSteps: [
            "Do not enter personal information",
            "Verify the sender through alternative channels",
            "Check for spelling errors and inconsistencies",
          ],
        },
        dangerous: {
          status: "dangerous",
          title: "High risk detected",
          description:
            "This content has been identified as potentially harmful.",
          details: {
            threatType: "Confirmed Phishing/Malware",
            confidence: 92,
            detectedBy: [
              "Threat Intelligence",
              "Malware Scanner",
              "Community Reports",
            ],
            timestamp: new Date().toISOString(),
          },
          mitigationSteps: [
            "Do not click any links or download attachments",
            "Report to your IT department if received at work",
            "Block the sender and delete the content immediately",
            "Run a security scan on your device if you've already interacted with it",
          ],
        },
      };

      // Randomly select a result for demonstration purposes
      const resultTypes = ["safe", "suspicious", "dangerous"];
      const randomResult =
        resultTypes[Math.floor(Math.random() * resultTypes.length)];

      setResult(mockResults[randomResult]);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStatusColor = (
    status: "safe" | "suspicious" | "dangerous" | null
  ) => {
    switch (status) {
      case "safe":
        return "bg-green-500";
      case "suspicious":
        return "bg-yellow-500";
      case "dangerous":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusIcon = (
    status: "safe" | "suspicious" | "dangerous" | null
  ) => {
    switch (status) {
      case "safe":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "suspicious":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      case "dangerous":
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (
    status: "safe" | "suspicious" | "dangerous" | null
  ) => {
    switch (status) {
      case "safe":
        return (
          <Badge variant="default" className="bg-green-500">
            Safe
          </Badge>
        );
      case "suspicious":
        return (
          <Badge variant="default" className="bg-yellow-500 text-black">
            Suspicious
          </Badge>
        );
      case "dangerous":
        return <Badge variant="destructive">Dangerous</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen md:px-40 bg-[#030712] text-white p-4">
      <Card className="border-2 border-border shadow-lg bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center text-white gap-2">
            <Shield className="h-6 w-6 text-white" /> Link & Email Analyzer
          </CardTitle>
          <CardDescription className="text-muted text-gray-400">
            Analyze suspicious URLs or emails to check for potential threats and
            scams.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="url"
            value={analysisType}
            onValueChange={(value) => setAnalysisType(value as "url" | "email")}
          >
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 bg-gray-800 text-white">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" /> URL Analysis
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email Analysis
              </TabsTrigger>
            </TabsList>

            {/* Inputs */}
            {[
              {
                value: "url",
                placeholder:
                  "Paste a suspicious URL (e.g. https://example.com/phish)",
              },
              {
                value: "email",
                placeholder: "Paste a suspicious email or email content",
              },
            ].map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="space-y-4"
              >
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Input
                      type="text"
                      placeholder={tab.placeholder}
                      value={input}
                      onChange={handleInputChange}
                      className="pr-10 bg-gray-900 border-gray-700 text-white"
                    />
                    {input && (
                      <button
                        onClick={clearInput}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <Button
                    onClick={handleSubmit}
                    disabled={isAnalyzing || !input.trim()}
                    className="bg-gradient-to-r from-secureSphere-purple to-secureSphere-blue-light hover:opacity-90 text-white"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze"}
                  </Button>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Loading */}
          {isAnalyzing && (
            <div className="mt-8 space-y-4">
              <p className="text-center text-gray-400">
                Analyzing your {analysisType}...
              </p>
              <Progress value={45} className="w-full" />
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-8 space-y-6">
              <Alert
                variant={
                  result.status === "dangerous" ? "destructive" : "default"
                }
                className="border-l-4 bg-gray-800 text-white"
                style={{
                  borderLeftColor:
                    result.status === "safe"
                      ? "rgb(34, 197, 94)"
                      : result.status === "suspicious"
                      ? "rgb(234, 179, 8)"
                      : "rgb(239, 68, 68)",
                }}
              >
                <div className="flex items-center gap-2">
                  {getStatusIcon(result.status)}
                  <AlertTitle className="text-lg font-semibold">
                    {result.title}
                  </AlertTitle>
                  {getStatusBadge(result.status)}
                </div>
                <AlertDescription className="mt-2 text-gray-300">
                  {result.description}
                </AlertDescription>
              </Alert>

              {result.details && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h3 className="font-medium text-lg">Analysis Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.details.threatType && (
                      <div>
                        <p className="text-sm text-black font-medium">
                          Threat Type
                        </p>
                        <p className="font-medium">
                          {result.details.threatType}
                        </p>
                      </div>
                    )}
                    {result.details.confidence !== undefined && (
                      <div>
                        <p className="text-sm text-black font-medium">
                          Confidence
                        </p>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={result.details.confidence}
                            className="w-24"
                          />
                          <span className="font-medium">
                            {result.details.confidence}%
                          </span>
                        </div>
                      </div>
                    )}
                    {result.details.detectedBy && (
                      <div className="col-span-1 md:col-span-2">
                        <p className="text-sm text-black font-medium">
                          Detection Sources
                        </p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {result.details.detectedBy.map((source, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-background"
                            >
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {result.mitigationSteps && result.mitigationSteps.length > 0 && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-3">
                    Recommended Actions
                  </h3>
                  <ul className="space-y-2">
                    {result.mitigationSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkEmailAnalyzer;
