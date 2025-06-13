import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { CheckCircle, AlertTriangle, AlertCircle, X, ExternalLink, History, BarChart2, Shield, Info } from "lucide-react";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

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

interface LinkHistoryItem {
  id: string;
  url: string;
  status: "safe" | "suspicious" | "dangerous";
  timestamp: string;
  threatType?: string;
}

interface UrlStats {
  totalScans: number;
  safeCount: number;
  suspiciousCount: number;
  dangerousCount: number;
  lastScanned: string;
}

const UrlChecker = () => {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [linkHistory, setLinkHistory] = useState<LinkHistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [stats, setStats] = useState<UrlStats | null>(null);
  const [activeTab, setActiveTab] = useState<"analyzer" | "history" | "stats" | "tips">("analyzer");

  // Get access token from localStorage
  const getAuthToken = (): string | null => {
    return localStorage.getItem("accessToken");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError(null);
  };

  const clearInput = () => {
    setInput("");
    setResult(null);
    setError(null);
  };

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const analyzeUrl = async (url: string): Promise<AnalysisResult> => {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication required. Please login.");
    }

    try {
      const response = await fetch("https://securesphere-backend-1.onrender.com/api/v1/links/check-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ url })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Correctly map the backend response
      const isUnsafe = data.result === "unsafe";
      return {
        status: isUnsafe ? "dangerous" : "safe",
        title: isUnsafe ? "Malicious URL Detected" : "Safe URL",
        description: isUnsafe 
          ? "This URL has been identified as potentially dangerous" 
          : "This URL appears to be safe",
        details: {
          threatType: isUnsafe ? "Malicious content" : undefined,
          confidence: isUnsafe ? 90 : 100,
          detectedBy: ["Our security systems"],
          timestamp: data.checkedAt || new Date().toISOString(),
        },
        mitigationSteps: isUnsafe ? [
          "Do not visit this website",
          "Do not enter any personal information",
          "Report this URL to your IT department"
        ] : undefined
      };
    } catch (err) {
      console.error("API Error:", err);
      throw err;
    }
  };

  const fetchLinkHistory = async () => {
    const token = getAuthToken();
    if (!token) return;

    setIsLoadingHistory(true);
    try {
      const response = await fetch("https://securesphere-backend-1.onrender.com/api/v1/links/link-history", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch link history");
      }

      const data = await response.json();
      // Map backend history to our frontend format
      const formattedHistory = data.map((item: any) => ({
        id: item._id || Math.random().toString(36).substring(2, 9),
        url: item.url,
        status: item.result === "unsafe" ? "dangerous" : "safe",
        timestamp: item.checkedAt,
        threatType: item.result === "unsafe" ? "Malicious content" : undefined
      }));
      setLinkHistory(formattedHistory);
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const fetchStats = async () => {
    const token = getAuthToken();
    if (!token) return;

    try {
      // Calculate stats from history
      const safeCount = linkHistory.filter(item => item.status === "safe").length;
      const dangerousCount = linkHistory.filter(item => item.status === "dangerous").length;
      
      const calculatedStats: UrlStats = {
        totalScans: linkHistory.length,
        safeCount,
        suspiciousCount: 0, // Your backend doesn't seem to have suspicious status
        dangerousCount,
        lastScanned: linkHistory[0]?.timestamp || new Date().toISOString()
      };
      setStats(calculatedStats);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    if (activeTab === "history") {
      fetchLinkHistory();
    } else if (activeTab === "stats") {
      fetchStats();
    }
  }, [activeTab]);

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError("Please enter a URL to analyze");
      return;
    }

    if (!validateUrl(input)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const analysisResult = await analyzeUrl(input);
      setResult(analysisResult);
      // Refresh history after new scan
      if (activeTab === "history") {
        fetchLinkHistory();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze URL. Please try again later.");
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
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
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            Safe
          </Badge>
        );
      case "suspicious":
        return (
          <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Suspicious
          </Badge>
        );
      case "dangerous":
        return <Badge variant="destructive" className="hover:bg-red-700">Dangerous</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6 text-white min-h-screen p-4 md:p-8">
      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab("analyzer")}
          className={`px-4 py-2 font-medium flex items-center gap-2 transition-colors ${activeTab === "analyzer" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
        >
          <ExternalLink className="h-4 w-4" /> URL Analyzer
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 font-medium flex items-center gap-2 transition-colors ${activeTab === "history" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
        >
          <History className="h-4 w-4" /> Scan History
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`px-4 py-2 font-medium flex items-center gap-2 transition-colors ${activeTab === "stats" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
        >
          <BarChart2 className="h-4 w-4" /> Statistics
        </button>
        <button
          onClick={() => setActiveTab("tips")}
          className={`px-4 py-2 font-medium flex items-center gap-2 transition-colors ${activeTab === "tips" ? "text-blue-400 border-b-2 border-blue-400" : "text-gray-400 hover:text-white"}`}
        >
          <Shield className="h-4 w-4" /> Safety Tips
        </button>
      </div>

      {/* URL Analyzer Tab */}
      {activeTab === "analyzer" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type="url"
                placeholder="Paste a suspicious URL (e.g. https://example.com)"
                value={input}
                onChange={handleInputChange}
                className="pr-10 bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
              />
              {input && (
                <button
                  onClick={clearInput}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              onClick={handleSubmit}
              disabled={isAnalyzing || !input.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white transition-colors shadow-lg"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : "Analyze"}
            </Button>
          </div>
          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {/* Loading */}
          {isAnalyzing && (
            <div className="mt-4 space-y-2">
              <p className="text-center text-gray-400">
                Scanning URL for potential threats...
              </p>
              <Progress value={45} className="w-full h-2 bg-gray-800" />
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-6 space-y-4 animate-fade-in">
              <Alert
                variant={result.status === "dangerous" ? "destructive" : "default"}
                className="border-l-4 bg-gray-900 text-white shadow-lg"
                style={{
                  borderLeftColor:
                    result.status === "safe"
                      ? "rgb(34, 197, 94)"
                      : result.status === "dangerous"
                      ? "rgb(239, 68, 68)"
                      : "rgb(234, 179, 8)",
                }}
              >
                <div className="flex items-center gap-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <AlertTitle className="text-lg font-semibold">
                      {result.title}
                    </AlertTitle>
                    <AlertDescription className="mt-1 text-gray-300">
                      {result.description}
                    </AlertDescription>
                  </div>
                  <div className="ml-auto">
                    {getStatusBadge(result.status)}
                  </div>
                </div>
              </Alert>

              {result.details && (
                <div className="bg-gray-900/80 rounded-lg p-5 space-y-4 border border-gray-800 shadow-lg">
                  <h3 className="font-medium text-lg text-white">Analysis Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.details.threatType && (
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <p className="text-sm text-gray-400 font-medium">
                          Threat Type
                        </p>
                        <p className="font-medium text-white">
                          {result.details.threatType}
                        </p>
                      </div>
                    )}
                    {result.details.confidence !== undefined && (
                      <div className="bg-gray-800/50 p-3 rounded-lg">
                        <p className="text-sm text-gray-400 font-medium">
                          Confidence
                        </p>
                        <div className="flex items-center gap-3">
                          <Progress
                            value={result.details.confidence}
                            className={`w-full h-2 bg-gray-700 ${
                              result.status === "dangerous"
                                ? "progress-indicator-dangerous"
                                : result.status === "safe"
                                ? "progress-indicator-safe"
                                : "progress-indicator-suspicious"
                            }`}
                          />
                          <span className="font-medium text-white">
                            {result.details.confidence}%
                          </span>
                        </div>
                      </div>
                    )}
                    {result.details.detectedBy && (
                      <div className="col-span-1 md:col-span-2 bg-gray-800/50 p-3 rounded-lg">
                        <p className="text-sm text-gray-400 font-medium">
                          Detection Sources
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {result.details.detectedBy.map((source, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-gray-700/80 text-gray-200 border-gray-600"
                            >
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {result.details.timestamp && (
                      <div className="col-span-1 md:col-span-2 text-sm text-gray-400">
                        Scanned at: {formatDate(result.details.timestamp)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {result.mitigationSteps && result.mitigationSteps.length > 0 && (
                <div className="bg-gray-900/80 rounded-lg p-5 border border-gray-800 shadow-lg">
                  <h3 className="font-medium text-lg text-white mb-4">
                    Recommended Actions
                  </h3>
                  <ul className="space-y-3">
                    {result.mitigationSteps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Scan History Tab */}
      {activeTab === "history" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Your Scan History</h2>
          {isLoadingHistory ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full bg-gray-800" />
              ))}
            </div>
          ) : linkHistory.length > 0 ? (
            <div className="border border-gray-800 rounded-lg overflow-hidden shadow-lg">
              <Table className="bg-gray-900/50">
                <TableHeader className="bg-gray-800">
                  <TableRow className="hover:bg-gray-800">
                    <TableHead className="text-gray-300">URL</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Threat</TableHead>
                    <TableHead className="text-gray-300">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {linkHistory.map((item) => (
                    <TableRow key={item.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell className="font-medium text-white max-w-[200px] truncate">
                        {item.url}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(item.status)}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {item.threatType || "None detected"}
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm">
                        {formatDate(item.timestamp)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-800 rounded-lg">
              <History className="mx-auto h-10 w-10 mb-3 text-gray-600" />
              <p className="text-lg">No scan history available</p>
              <p className="text-sm mt-1">Scan a URL to see it appear here</p>
              <Button 
                onClick={() => setActiveTab("analyzer")} 
                variant="outline" 
                className="mt-4 border-gray-700 text-white bg-gray-800"
              >
                Analyze a URL
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === "stats" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">URL Analysis Statistics</h2>
          {stats ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900/80 rounded-lg p-6 border border-gray-800 shadow-lg">
                <h3 className="text-lg font-medium text-white mb-4">Scan Summary</h3>
                <div className="space-y-6">
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Total Scans</p>
                    <p className="text-3xl font-bold text-white">{stats.totalScans}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Safe</p>
                      <p className="text-2xl font-bold text-green-500">{stats.safeCount}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round((stats.safeCount / stats.totalScans) * 100)}% of total
                      </p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Suspicious</p>
                      <p className="text-2xl font-bold text-yellow-500">{stats.suspiciousCount}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round((stats.suspiciousCount / stats.totalScans) * 100)}% of total
                      </p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p className="text-sm text-gray-400">Dangerous</p>
                      <p className="text-2xl font-bold text-red-500">{stats.dangerousCount}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round((stats.dangerousCount / stats.totalScans) * 100)}% of total
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/80 rounded-lg p-6 border border-gray-800 shadow-lg">
                <h3 className="text-lg font-medium text-white mb-4">Safety Overview</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Safety Rate</p>
                    <div className="flex items-center gap-4">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#1F2937"
                            strokeWidth="3"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="3"
                            strokeDasharray={`${(stats.safeCount / stats.totalScans) * 100}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {Math.round((stats.safeCount / stats.totalScans) * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm text-gray-300">Safe</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span className="text-sm text-gray-300">Suspicious</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span className="text-sm text-gray-300">Dangerous</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Last Scan</p>
                    <p className="text-white">{formatDate(stats.lastScanned)}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-60 w-full rounded-lg bg-gray-800" />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Safety Tips Tab */}
      {activeTab === "tips" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">URL Safety Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900/80 rounded-lg p-6 border border-gray-800 shadow-lg">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-400" /> Before Clicking Links
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span className="text-gray-300">Hover over links to see the actual URL before clicking</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span className="text-gray-300">Be wary of shortened URLs (bit.ly, goo.gl, etc.)</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span className="text-gray-300">Look for HTTPS and a padlock icon in the address bar</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/80 rounded-lg p-6 border border-gray-800 shadow-lg">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" /> Identifying Suspicious Links
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span className="text-gray-300">Watch for misspellings of popular websites (e.g., "gooogle.com")</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span className="text-gray-300">Be cautious of urgent or threatening language in messages</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span className="text-gray-300">Check for poor grammar or unusual formatting</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-900/80 rounded-lg p-6 border border-gray-800 shadow-lg md:col-span-2">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" /> Best Practices
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span className="text-gray-300">Keep your browser and security software up to date</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span className="text-gray-300">Use a password manager to avoid phishing sites</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span className="text-gray-300">Enable two-factor authentication on important accounts</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <span className="text-gray-300">Regularly check your account activity for suspicious logins</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UrlChecker;/* Add these styles to your global CSS or in a CSS module if Progress uses a child for the indicator */
