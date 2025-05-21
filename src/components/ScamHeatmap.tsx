import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Info,
  ZoomIn,
  ZoomOut,
  X,
  Globe,
  AlertTriangle,
  Shield,
} from "lucide-react";

interface ScamHeatmapProps {
  className?: string;
}

interface ScamStatistic {
  region: string;
  totalScams: number;
  topScamType: string;
  percentageIncrease: number;
  affectedUsers: number;
}

const ScamHeatmap = ({ className = "" }: ScamHeatmapProps) => {
  const [selectedScamType, setSelectedScamType] = useState<string>("all");
  const [timeframe, setTimeframe] = useState<string>("30");
  const [zoomLevel, setZoomLevel] = useState<number[]>([50]);
  const [selectedRegion, setSelectedRegion] = useState<ScamStatistic | null>(
    null,
  );

  // Mock data for the heatmap regions
  const mockRegionStats: ScamStatistic[] = [
    {
      region: "North America",
      totalScams: 12453,
      topScamType: "Phishing",
      percentageIncrease: 12,
      affectedUsers: 8700,
    },
    {
      region: "Europe",
      totalScams: 9872,
      topScamType: "Tech Support",
      percentageIncrease: 8,
      affectedUsers: 6500,
    },
    {
      region: "Asia",
      totalScams: 15632,
      topScamType: "OTP Fraud",
      percentageIncrease: 23,
      affectedUsers: 11200,
    },
    {
      region: "South America",
      totalScams: 5421,
      topScamType: "Fake Job Offers",
      percentageIncrease: 15,
      affectedUsers: 3800,
    },
    {
      region: "Africa",
      totalScams: 4215,
      topScamType: "E-commerce Fraud",
      percentageIncrease: 18,
      affectedUsers: 2900,
    },
    {
      region: "Australia",
      totalScams: 2876,
      topScamType: "Investment Scams",
      percentageIncrease: 9,
      affectedUsers: 1950,
    },
  ];

  const handleRegionClick = (region: ScamStatistic) => {
    setSelectedRegion(region);
  };

  const closeRegionInfo = () => {
    setSelectedRegion(null);
  };

  const scamTypeOptions = [
    { value: "all", label: "All Scam Types" },
    { value: "phishing", label: "Phishing" },
    { value: "tech-support", label: "Tech Support" },
    { value: "otp-fraud", label: "OTP Fraud" },
    { value: "fake-jobs", label: "Fake Job Offers" },
    { value: "ecommerce", label: "E-commerce Fraud" },
    { value: "investment", label: "Investment Scams" },
    { value: "romance", label: "Romance Scams" },
    { value: "crypto", label: "Cryptocurrency Scams" },
  ];

  const timeframeOptions = [
    { value: "7", label: "Last 7 Days" },
    { value: "30", label: "Last 30 Days" },
    { value: "90", label: "Last 90 Days" },
    { value: "365", label: "Last Year" },
    { value: "all", label: "All Time" },
  ];

  return (
    <div
      className={`w-full bg-secureSphere-purple-dark text-white ${className}`}
    >
      <div className="p-6 rounded-lg shadow-lg">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="h-6 w-6 text-secureSphere-blue-light" />
              <h2 className="text-2xl font-bold">Interactive Scam Heatmap</h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Select
                value={selectedScamType}
                onValueChange={setSelectedScamType}
              >
                <SelectTrigger className="w-full sm:w-[180px] bg-secureSphere-purple border-secureSphere-purple-light text-white">
                  <SelectValue placeholder="Scam Type" />
                </SelectTrigger>
                <SelectContent className="bg-secureSphere-purple-dark text-white border-secureSphere-purple-light">
                  {scamTypeOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="hover:bg-secureSphere-purple focus:bg-secureSphere-purple"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-full sm:w-[180px] bg-secureSphere-purple border-secureSphere-purple-light text-white">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent className="bg-secureSphere-purple-dark text-white border-secureSphere-purple-light">
                  {timeframeOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="hover:bg-secureSphere-purple focus:bg-secureSphere-purple"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="relative h-[500px] bg-secureSphere-purple/30 rounded-lg overflow-hidden border border-secureSphere-purple-light">
            {/* Map background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=1200&q=80')] bg-cover bg-center opacity-20"></div>

            {/* Mock heatmap overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* North America hotspot */}
                <div
                  className="absolute top-[25%] left-[20%] w-16 h-16 bg-red-500/40 rounded-full cursor-pointer hover:bg-red-500/60 transition-all flex items-center justify-center"
                  onClick={() => handleRegionClick(mockRegionStats[0])}
                >
                  <AlertTriangle className="h-6 w-6 text-white/80" />
                </div>

                {/* Europe hotspot */}
                <div
                  className="absolute top-[20%] left-[45%] w-12 h-12 bg-orange-500/40 rounded-full cursor-pointer hover:bg-orange-500/60 transition-all flex items-center justify-center"
                  onClick={() => handleRegionClick(mockRegionStats[1])}
                >
                  <AlertTriangle className="h-5 w-5 text-white/80" />
                </div>

                {/* Asia hotspot */}
                <div
                  className="absolute top-[30%] left-[65%] w-20 h-20 bg-red-600/40 rounded-full cursor-pointer hover:bg-red-600/60 transition-all flex items-center justify-center"
                  onClick={() => handleRegionClick(mockRegionStats[2])}
                >
                  <AlertTriangle className="h-8 w-8 text-white/80" />
                </div>

                {/* South America hotspot */}
                <div
                  className="absolute top-[55%] left-[30%] w-10 h-10 bg-yellow-500/40 rounded-full cursor-pointer hover:bg-yellow-500/60 transition-all flex items-center justify-center"
                  onClick={() => handleRegionClick(mockRegionStats[3])}
                >
                  <AlertTriangle className="h-4 w-4 text-white/80" />
                </div>

                {/* Africa hotspot */}
                <div
                  className="absolute top-[45%] left-[48%] w-10 h-10 bg-yellow-500/40 rounded-full cursor-pointer hover:bg-yellow-500/60 transition-all flex items-center justify-center"
                  onClick={() => handleRegionClick(mockRegionStats[4])}
                >
                  <AlertTriangle className="h-4 w-4 text-white/80" />
                </div>

                {/* Australia hotspot */}
                <div
                  className="absolute top-[65%] left-[75%] w-8 h-8 bg-blue-500/40 rounded-full cursor-pointer hover:bg-blue-500/60 transition-all flex items-center justify-center"
                  onClick={() => handleRegionClick(mockRegionStats[5])}
                >
                  <AlertTriangle className="h-3 w-3 text-white/80" />
                </div>
              </div>
            </div>

            {/* Map controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <Button
                className="bg-secureSphere-purple hover:bg-secureSphere-purple-light text-white"
                size="icon"
                onClick={() => setZoomLevel([Math.min(zoomLevel[0] + 10, 100)])}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                className="bg-secureSphere-purple hover:bg-secureSphere-purple-light text-white"
                size="icon"
                onClick={() => setZoomLevel([Math.max(zoomLevel[0] - 10, 10)])}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-secureSphere-purple/80 backdrop-blur-sm p-3 rounded-md border border-secureSphere-purple-light">
              <div className="text-xs font-medium mb-2 text-white">
                Scam Intensity
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-blue-500/60"></div>
                <div className="w-4 h-4 rounded-full bg-green-500/60"></div>
                <div className="w-4 h-4 rounded-full bg-yellow-500/60"></div>
                <div className="w-4 h-4 rounded-full bg-orange-500/60"></div>
                <div className="w-4 h-4 rounded-full bg-red-500/60"></div>
                <div className="text-xs ml-1 text-white">Low to High</div>
              </div>
            </div>

            {/* Region info panel */}
            {selectedRegion && (
              <div className="absolute top-4 left-4 bg-secureSphere-purple/90 backdrop-blur-sm p-4 rounded-md shadow-lg max-w-xs border border-secureSphere-purple-light">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Shield className="h-4 w-4 text-secureSphere-blue-light" />
                    {selectedRegion.region}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:bg-secureSphere-purple-light"
                    onClick={closeRegionInfo}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secureSphere-gray-300">
                      Total Scams:
                    </span>
                    <span className="font-medium text-white">
                      {selectedRegion.totalScams.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secureSphere-gray-300">
                      Top Scam Type:
                    </span>
                    <span className="font-medium text-white">
                      {selectedRegion.topScamType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secureSphere-gray-300">
                      Increase:
                    </span>
                    <span className="font-medium text-secureSphere-yellow">
                      +{selectedRegion.percentageIncrease}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secureSphere-gray-300">
                      Affected Users:
                    </span>
                    <span className="font-medium text-white">
                      {selectedRegion.affectedUsers.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-secureSphere-blue-light" />
              <span className="text-sm text-secureSphere-gray-300">
                Click on hotspots to view detailed statistics
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-sm whitespace-nowrap text-white">
                Zoom Level:
              </span>
              <Slider
                className="w-full sm:w-[200px]"
                value={zoomLevel}
                onValueChange={setZoomLevel}
                min={10}
                max={100}
                step={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScamHeatmap;
