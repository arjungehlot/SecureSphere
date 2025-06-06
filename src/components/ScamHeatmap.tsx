import React, { useState, useEffect, useRef } from "react";
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
  Filter,
  RefreshCw,
  MapPin,
  BarChart2,
  Users,
  Clock,
  ShieldAlert,
} from "lucide-react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import worldMap from "../assets/custom.geo.json";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Layout from "./layout/Layout";

interface ScamHeatmapProps {
  className?: string;
}

interface ScamStatistic {
  id: string;
  region: string;
  totalScams: number;
  topScamType: string;
  percentageIncrease: number;
  affectedUsers: number;
  coordinates: [number, number];
  scamTypes: Record<string, number>;
  days: Record<string, number>;
}

const scamTypesList = [
  "phishing",
  "techSupport",
  "otpFraud",
  "fakeJobs",
  "ecommerce",
  "investment",
  "romance",
  "crypto",
];

const generateRandomStats = (
  region: string,
  coordinates: [number, number]
): ScamStatistic => {
  const scamTypes = scamTypesList.reduce((acc, type) => {
    acc[type] = Math.floor(Math.random() * 5000);
    return acc;
  }, {} as Record<string, number>);

  const days = {
    "7": Math.floor(Math.random() * 1000),
    "30": Math.floor(Math.random() * 4000),
    "90": Math.floor(Math.random() * 8000),
    "365": Math.floor(Math.random() * 15000),
    all: Math.floor(Math.random() * 25000),
  };

  const totalScams = Object.values(scamTypes).reduce((a, b) => a + b, 0);
  const topScamType = Object.entries(scamTypes).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  return {
    id: region.toLowerCase().replace(/\s+/g, "-"),
    region,
    totalScams,
    topScamType: topScamType
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase()),
    percentageIncrease: Math.floor(Math.random() * 30) + 1,
    affectedUsers: Math.floor(totalScams * 0.7),
    coordinates,
    scamTypes,
    days,
  };
};

const ScamHeatmap = ({ className = "" }: ScamHeatmapProps) => {
  const [selectedScamType, setSelectedScamType] = useState<string>("all");
  const [timeframe, setTimeframe] = useState<string>("30");
  const [zoom, setZoom] = useState<number>(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);
  const [selectedRegion, setSelectedRegion] = useState<ScamStatistic | null>(
    null
  );
  const [hoveredRegion, setHoveredRegion] = useState<ScamStatistic | null>(
    null
  );
  const [regionStats, setRegionStats] = useState<ScamStatistic[]>([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [mapStyle, setMapStyle] = useState<"satellite" | "default">(
    "satellite"
  );
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with random data for major regions
    const stats = [
      generateRandomStats("North America", [-100, 40]),
      generateRandomStats("South America", [-60, -15]),
      generateRandomStats("Europe", [15, 50]),
      generateRandomStats("Africa", [20, 0]),
      generateRandomStats("Asia", [100, 35]),
      generateRandomStats("Australia", [135, -25]),
      generateRandomStats("Middle East", [50, 30]),
      generateRandomStats("India", [78, 21]), // India's approximate coordinates [longitude, latitude]
      generateRandomStats("China", [104, 35]),
      generateRandomStats("Japan", [138, 36]),
      generateRandomStats("Russia", [100, 60]),
      generateRandomStats("Southeast Asia", [110, 15]),
      generateRandomStats("Central America", [-90, 15]),
      generateRandomStats("Caribbean", [-75, 20]),
      generateRandomStats("Scandinavia", [15, 62]),
      generateRandomStats("Mediterranean", [20, 38]),
      generateRandomStats("Himalayas", [85, 30]),
      generateRandomStats("Sahara", [0, 23]),
      generateRandomStats("Amazon", [-60, -5]),
      generateRandomStats("Great Lakes", [-85, 45]),
      generateRandomStats("Andes", [-70, -20]),
      generateRandomStats("Rocky Mountains", [-110, 40]),
      generateRandomStats("Gulf Coast", [-90, 30]),
    ];
    setRegionStats(stats);
  }, []);

  const scamTypeOptions = [
    { value: "all", label: "All Scam Types" },
    ...scamTypesList.map((type) => ({
      value: type,
      label: type
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase()),
    })),
  ];

  const timeframeOptions = [
    { value: "7", label: "Last 7 Days" },
    { value: "30", label: "Last 30 Days" },
    { value: "90", label: "Last 90 Days" },
    { value: "365", label: "Last Year" },
    { value: "all", label: "All Time" },
  ];

  const getScamCount = (region: ScamStatistic) => {
    if (selectedScamType === "all") {
      return timeframe === "all" ? region.totalScams : region.days[timeframe];
    }
    return timeframe === "all"
      ? region.scamTypes[selectedScamType]
      : Math.floor(
          region.scamTypes[selectedScamType] *
            (region.days[timeframe] / region.totalScams)
        );
  };

  const getColorForScams = (count: number) => {
    // Create gradient from yellow to red
    const maxCount = 10000;
    const ratio = Math.min(count / maxCount, 1);

    // Calculate RGB values for gradient
    const red = Math.floor(255 * ratio);
    const green = Math.floor(255 * (1 - ratio * 0.7));
    const blue = 0;

    return `rgba(${red}, ${green}, ${blue}, 0.8)`;
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5));

  const handleRegionClick = (region: ScamStatistic) => {
    setSelectedRegion(region);
    setCenter(region.coordinates);
    setZoom(8); // Zoom in when a region is selected
  };

  const handleResetView = () => {
    setSelectedRegion(null);
    setCenter([0, 20]); // Reset to global view
    setZoom(1);
  };

  // const handleWheel = (e: React.WheelEvent) => {
  //   if (mapRef.current && mapRef.current.contains(e.target as Node)) {
  //     e.preventDefault();
  //     setZoom(prev => Math.max(0.5, Math.min(3, prev - e.deltaY * 0.001)));
  //   }
  // };

  //  onWheel={handleWheel}   // use this in the ComposableMap component

  const toggleMapStyle = () => {
    setMapStyle((prev) => (prev === "satellite" ? "default" : "satellite"));
  };

  const filteredStats = isFiltered
    ? regionStats.filter((region) => getScamCount(region) > 0)
    : regionStats;

  // Top 5 regions by scam count
  const topRegions = [...regionStats]
    .sort((a, b) => getScamCount(b) - getScamCount(a))
    .slice(0, 5);

  // Scam type distribution
  const scamTypeDistribution = scamTypesList.map((type) => ({
    name: type
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase()),
    value: regionStats.reduce(
      (sum, region) =>
        sum +
        (timeframe === "all"
          ? region.scamTypes[type]
          : Math.floor(
              region.scamTypes[type] *
                (region.days[timeframe] / region.totalScams)
            )),
      0
    ),
  }));

  return (
    <Layout>
      <div
        className={`w-full bg-gradient-to-br from-[#030712] to-[#0f172a] text-white ${className}`}
        ref={mapRef}
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Global Scam Intelligence Platform
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Real-time visualization of global scam activity. Identify
              hotspots, track trends, and protect yourself from emerging
              threats.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <ShieldAlert className="h-5 w-5 mr-2" />
                Report a Scam
              </Button>
              <Button
                variant="outline"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Info className="h-5 w-5 mr-2" />
                Learn About Scams
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-0"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/20">
                  <ShieldAlert className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Scams</p>
                  <p className="text-2xl font-bold">
                    {regionStats
                      .reduce((sum, region) => sum + getScamCount(region), 0)
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/20">
                  <Users className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Affected Users</p>
                  <p className="text-2xl font-bold">
                    {regionStats
                      .reduce(
                        (sum, region) =>
                          sum + Math.floor(getScamCount(region) * 0.7),
                        0
                      )
                      .toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <BarChart2 className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Top Scam Type</p>
                  <p className="text-2xl font-bold truncate">
                    {
                      scamTypeDistribution.sort((a, b) => b.value - a.value)[0]
                        .name
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Clock className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Avg. Increase</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    +
                    {Math.floor(
                      regionStats.reduce(
                        (sum, region) => sum + region.percentageIncrease,
                        0
                      ) / regionStats.length
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="mb-16">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-blue-400" />
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Interactive Scam Heatmap
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <Select
                    value={selectedScamType}
                    onValueChange={(value) => {
                      setSelectedScamType(value);
                      setIsFiltered(false);
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700 text-white">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Scam Type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                      {scamTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={timeframe}
                    onValueChange={(value) => {
                      setTimeframe(value);
                      setIsFiltered(false);
                    }}
                  >
                    <SelectTrigger className="w-full sm:w-[180px] bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Timeframe" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 text-white border-gray-700">
                      {timeframeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant={isFiltered ? "default" : "outline"}
                    className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                    onClick={() => setIsFiltered(!isFiltered)}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {isFiltered ? "Show All" : "Apply Filter"}
                  </Button>

                  <Button
                    variant="outline"
                    className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                    onClick={toggleMapStyle}
                  >
                    {mapStyle === "satellite"
                      ? "Default Map"
                      : "Satellite View"}
                  </Button>
                </div>
              </div>

              <div className="relative h-[600px] bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{
                    scale: 150 * zoom,
                    center: center,
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    background:
                      mapStyle === "satellite"
                        ? "radial-gradient(circle at center, #0a1128 0%, #000000 100%)"
                        : "#1a202c",
                  }}
                >
                  <ZoomableGroup center={center} zoom={zoom}>
                    <Geographies geography={worldMap}>
                      {({ geographies }) =>
                        geographies.map((geo) => (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={
                              mapStyle === "satellite" ? "#1e293b" : "#2d3748"
                            }
                            stroke={
                              mapStyle === "satellite" ? "#334155" : "#4a5568"
                            }
                            strokeWidth={0.5}
                            style={{
                              default: { outline: "none" },
                              hover: {
                                fill:
                                  selectedRegion?.region === geo.properties.name
                                    ? mapStyle === "satellite"
                                      ? "#334155"
                                      : "#4a5568"
                                    : mapStyle === "satellite"
                                    ? "#2d3a4d"
                                    : "#3c4a63",
                                outline: "none",
                              },
                              pressed: { outline: "none" },
                            }}
                            onClick={() => {
                              const region = regionStats.find(
                                (r) => r.region === geo.properties.name
                              );
                              if (region) handleRegionClick(region);
                            }}
                          />
                        ))
                      }
                    </Geographies>

                    {filteredStats.map((region) => {
                      const count = getScamCount(region);
                      const color = getColorForScams(count);
                      const size = Math.min(8 + count / 500, 25);

                      return (
                        <Marker
                          key={region.id}
                          coordinates={region.coordinates}
                        >
                          <motion.g
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                            }}
                            onMouseEnter={() => setHoveredRegion(region)}
                            onMouseLeave={() => setHoveredRegion(null)}
                            onClick={() => handleRegionClick(region)}
                            style={{ cursor: "pointer" }}
                          >
                            <circle
                              r={size}
                              fill={color}
                              fillOpacity={0.8}
                              stroke="#fff"
                              strokeWidth={0.5}
                              className="hover:shadow-lg hover:shadow-red-500/30 transition-all"
                            >
                              {selectedRegion?.id === region.id && (
                                <animate
                                  attributeName="r"
                                  values={`${size};${size * 1.1};${size}`}
                                  dur="2s"
                                  repeatCount="indefinite"
                                />
                              )}
                            </circle>
                            <text
                              x={0}
                              y={size + 12}
                              textAnchor="middle"
                              fill="white"
                              fontSize={10}
                              fontWeight="bold"
                              style={{ pointerEvents: "none" }}
                            >
                              {zoom > 1.5 ? region.region : ""}
                            </text>
                          </motion.g>
                        </Marker>
                      );
                    })}
                  </ZoomableGroup>
                </ComposableMap>

                {/* Map controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                  <Button
                    className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                    size="icon"
                    onClick={handleZoomIn}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button
                    className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                    size="icon"
                    onClick={handleZoomOut}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700"
                    size="icon"
                    onClick={handleResetView}
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-gray-800/80 backdrop-blur-sm p-3 rounded-md border border-gray-700 shadow-lg">
                  <div className="text-xs font-medium mb-2 text-white">
                    Scam Intensity
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ background: getColorForScams(0) }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ background: getColorForScams(2500) }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ background: getColorForScams(5000) }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ background: getColorForScams(7500) }}
                    ></div>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ background: getColorForScams(10000) }}
                    ></div>
                    <div className="text-xs ml-1 text-white">Low to High</div>
                  </div>
                </div>

                {/* Hover tooltip */}
                <AnimatePresence>
                  {hoveredRegion && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-4 left-4 bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs border border-blue-700"
                    >
                      <h3 className="text-lg font-bold text-white">
                        {hoveredRegion.region}
                      </h3>
                      <div className="text-sm text-white mt-2">
                        <p>
                          Total Scams:{" "}
                          {getScamCount(hoveredRegion).toLocaleString()}
                        </p>
                        <p>Top Scam: {hoveredRegion.topScamType}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Detailed region info panel */}
                <AnimatePresence>
                  {selectedRegion && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="absolute top-4 left-4 bg-gradient-to-br from-blue-900/90 to-purple-900/90 backdrop-blur-sm p-4 rounded-xl shadow-lg max-w-xs border border-blue-700"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Shield className="h-4 w-4 text-blue-300" />
                          {selectedRegion.region}
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-white hover:bg-blue-800/50"
                          onClick={() => setSelectedRegion(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-300">Total Scams:</span>
                          <span className="font-medium text-white">
                            {getScamCount(selectedRegion).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Top Scam Type:</span>
                          <span className="font-medium text-white">
                            {selectedRegion.topScamType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Increase:</span>
                          <span className="font-medium text-yellow-400">
                            +{selectedRegion.percentageIncrease}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-300">Affected Users:</span>
                          <span className="font-medium text-white">
                            {selectedRegion.affectedUsers.toLocaleString()}
                          </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-blue-700">
                          <h4 className="font-medium mb-2">
                            Scam Type Breakdown:
                          </h4>
                          <div className="space-y-1">
                            {Object.entries(selectedRegion.scamTypes)
                              .sort((a, b) => b[1] - a[1])
                              .map(([type, count]) => (
                                <div
                                  key={type}
                                  className="flex justify-between"
                                >
                                  <span className="text-gray-300">
                                    {type
                                      .replace(/([A-Z])/g, " $1")
                                      .replace(/^./, (str) =>
                                        str.toUpperCase()
                                      )}
                                    :
                                  </span>
                                  <span
                                    className={cn(
                                      "font-medium",
                                      type === selectedScamType
                                        ? "text-yellow-400"
                                        : "text-white"
                                    )}
                                  >
                                    {timeframe === "all"
                                      ? count.toLocaleString()
                                      : Math.floor(
                                          count *
                                            (selectedRegion.days[timeframe] /
                                              selectedRegion.totalScams)
                                        ).toLocaleString()}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-400">
                    {selectedScamType === "all"
                      ? "Showing all scam types"
                      : `Showing ${
                          scamTypeOptions.find(
                            (o) => o.value === selectedScamType
                          )?.label
                        }`}
                    {timeframe === "all"
                      ? ""
                      : ` in the last ${timeframeOptions
                          .find((o) => o.value === timeframe)
                          ?.label.toLowerCase()}`}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-sm whitespace-nowrap text-white">
                    Zoom Level: {zoom.toFixed(1)}x
                  </span>
                  <Slider
                    className="w-full sm:w-[200px]"
                    value={[zoom]}
                    onValueChange={(val) => setZoom(val[0])}
                    min={0.5}
                    max={3}
                    step={0.1}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Top Regions Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-blue-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Top Scam Hotspots
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {topRegions.map((region, index) => (
                <div
                  key={region.id}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-all cursor-pointer"
                  onClick={() => handleRegionClick(region)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white">{region.region}</h3>
                    <div className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {getScamCount(region).toLocaleString()}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">
                      Top: {region.topScamType}
                    </span>
                    <span className="text-xs text-yellow-400">
                      +{region.percentageIncrease}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scam Type Distribution Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BarChart2 className="h-6 w-6 text-blue-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Scam Type Distribution
              </span>
            </h2>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {scamTypeDistribution
                  .sort((a, b) => b.value - a.value)
                  .map((type) => (
                    <div key={type.name} className="flex items-center gap-4">
                      <div
                        className="h-12 w-12 rounded-lg flex items-center justify-center"
                        style={{
                          background: `linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)`,
                          border:
                            selectedScamType ===
                            type.name.toLowerCase().replace(/\s+/g, "")
                              ? "1px solid rgba(99, 102, 241, 0.8)"
                              : "1px solid rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <div
                          className="h-8 w-8 rounded-md flex items-center justify-center text-white"
                          style={{
                            background: `linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)`,
                          }}
                        >
                          {type.name.split(" ")[0].charAt(0)}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{type.name}</p>
                        <p className="text-lg font-bold text-white">
                          {type.value.toLocaleString()}
                          <span className="text-xs ml-1 text-gray-400">
                            (
                            {Math.round(
                              (type.value /
                                scamTypeDistribution.reduce(
                                  (sum, t) => sum + t.value,
                                  0
                                )) *
                                100
                            )}
                            %)
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Time Analysis Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-400" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Time Analysis
              </span>
            </h2>
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {timeframeOptions.map((time) => (
                  <div
                    key={time.value}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      timeframe === time.value
                        ? "bg-blue-900/20 border-blue-500"
                        : "bg-gray-800/30 border-gray-700 hover:border-gray-600"
                    }`}
                    onClick={() => setTimeframe(time.value)}
                  >
                    <p className="text-sm text-gray-400 mb-1">{time.label}</p>
                    <p className="text-2xl font-bold text-white">
                      {regionStats
                        .reduce(
                          (sum, region) =>
                            sum +
                            (time.value === "all"
                              ? region.totalScams
                              : region.days[time.value]),
                          0
                        )
                        .toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {time.value === "all"
                        ? ""
                        : `+${
                            Math.floor(Math.random() * 20) + 5
                          }% from previous period`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Report Scam Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-blue-700/50">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-white">
                    Seen a Scam? Report It Now
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Help us protect others by reporting suspicious activities.
                    Your report could prevent someone from becoming a victim.
                  </p>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                    <ShieldAlert className="h-5 w-5 mr-2" />
                    Report a Scam
                  </Button>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                    <h3 className="text-lg font-medium mb-4 text-white">
                      What to Include:
                    </h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>Date and time of the incident</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>Contact method used (email, phone, website)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>
                          Any identifying information about the scammer
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 w-2 h-2 rounded-full bg-blue-400"></div>
                        <span>Screenshots or documentation if available</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ScamHeatmap;
