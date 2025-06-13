import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Shield, Mail, ExternalLink } from "lucide-react";
import EmailAnalyzer from "./EmailAnalyzer";
import UrlChecker from "./UrlChecker";

const LinkEmailAnalyzer = () => {
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
          <Tabs defaultValue="url">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 bg-gray-800 text-white">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" /> URL Analysis
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> Email Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url">
              <UrlChecker />
            </TabsContent>

            <TabsContent value="email">
              <EmailAnalyzer />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LinkEmailAnalyzer;