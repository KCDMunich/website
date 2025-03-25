"use client"

import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Building2, ChevronRight, Code, Cpu, Database, 
  ExternalLink, Globe, LineChart, Linkedin, 
  Sparkles, Twitter, Github, Youtube 
} from "lucide-react";

// API URL for fetching speaker data
const scriptUrl = 'https://sessionize.com/api/v2/px1o0jp3/view/Speakers';

// Helper function to find company information
const findCompanyInfo = (speaker) => {
  const company = speaker.questionAnswers.find((q) => q.question === 'Company');
  return company?.answer || 'Speaker';
};

// Social icon component based on URL
const SocialIcon = ({ url, size = 16 }) => {
  const iconColor = "currentColor";

  if (url.includes('github.com')) return <Github size={size} className="h-4 w-4 mr-1" />;
  if (url.includes('twitter.com')) return <Twitter size={size} className="h-4 w-4 mr-1" />;
  if (url.includes('linkedin.com')) return <Linkedin size={size} className="h-4 w-4 mr-1" />;
  if (url.includes('youtube.com')) return <Youtube size={size} className="h-4 w-4 mr-1" />;
  return <Globe size={size} className="h-4 w-4 mr-1" />;
};

// Get category icon based on category name
const getCategoryIcon = (category) => {
  const categoryLower = category.toLowerCase();
  
  if (categoryLower === 'platform') return <Database className="h-5 w-5" />;
  if (categoryLower === 'ai') return <Sparkles className="h-5 w-5" />;
  if (categoryLower === 'code' || categoryLower === 'development') return <Code className="h-5 w-5" />;
  if (categoryLower === 'kubernetes' || categoryLower === 'infrastructure') return <Cpu className="h-5 w-5" />;
  if (categoryLower === 'analytics' || categoryLower === 'data') return <LineChart className="h-5 w-5" />;
  return <Globe className="h-5 w-5" />;
};

// Featured speakers IDs (can be updated as needed)
const featuredSpeakerIds = [
  'a2665c2b-13c9-4337-9c78-db85bca70e60',
  '695b89c8-6abb-4155-a297-a705ad8ae979',
  'fa03252b-abf7-490a-b243-40d994706c95',
  'b4047d7c-94cf-4f5e-bbdb-7619ab241f06',
  'be3da75f-4550-4f7f-9d44-863076ed4e91',
  '647c84a5-1a13-4641-8d8f-49109cadf78b',
];

const Speakers = () => {
  const [speakerData, setSpeakerData] = useState([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all');
  const speakersPerPage = 15;
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState(['all']);

  useEffect(() => {
    setIsLoading(true);
    fetch(scriptUrl)
      .then((response) => response.json())
      .then((data) => {
        // Extract categories from sessions
        const allCategories = new Set(['all']);
        data.forEach(speaker => {
          if (speaker.sessions && speaker.sessions.length > 0) {
            speaker.sessions.forEach(session => {
              if (session.categories && session.categories.length > 0) {
                session.categories.forEach(cat => allCategories.add(cat.toLowerCase()));
              }
            });
          }
        });
        
        setCategories(Array.from(allCategories));
        setSpeakerData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  }, []);

  // Featured speakers
  const featuredSpeakers = speakerData.filter(speaker => 
    featuredSpeakerIds.includes(speaker.id)
  );

  // Filter speakers by category
  const getSpeakerCategory = (speaker) => {
    if (!speaker.sessions || speaker.sessions.length === 0) return [];
    
    const categories = [];
    speaker.sessions.forEach(session => {
      if (session.categories) {
        categories.push(...session.categories);
      }
    });
    
    return categories.map(cat => cat.toLowerCase());
  };

  const filteredSpeakers = activeTab === 'all' 
    ? speakerData 
    : speakerData.filter(speaker => {
        const speakerCategories = getSpeakerCategory(speaker);
        return speakerCategories.includes(activeTab.toLowerCase());
      });

  // Pagination
  const indexOfLastSpeaker = currentPage * speakersPerPage;
  const indexOfFirstSpeaker = indexOfLastSpeaker - speakersPerPage;
  const currentSpeakers = filteredSpeakers.slice(indexOfFirstSpeaker, indexOfLastSpeaker);
  const totalPages = Math.ceil(filteredSpeakers.length / speakersPerPage);

  // Speaker card component
  const SpeakerCard = ({ speaker }) => {
    const company = findCompanyInfo(speaker);
    const speakerCategories = getSpeakerCategory(speaker);
    const sessionTitle = speaker.sessions && speaker.sessions.length > 0 
      ? speaker.sessions[0].name 
      : '';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
        className="h-full"
      >
        <Card className="h-full flex flex-col overflow-hidden border-none shadow-lg bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <CardHeader className="pb-0 pt-4">
            <div className="flex justify-center mb-3">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarImage src={speaker.profilePicture} alt={speaker.fullName} />
                <AvatarFallback>{speaker.fullName.substring(0, 2)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold">{speaker.fullName}</h3>
              <CardDescription className="flex items-center justify-center gap-1 mt-1">
                <Building2 className="h-3 w-3" />
                {company}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="text-center flex-grow px-3">
            <div className="flex flex-wrap gap-1 justify-center mt-2 mb-3">
              {speakerCategories.map((category, index) => (
                <Badge key={index} variant="secondary" className="font-normal text-xs">
                  {category}
                </Badge>
              ))}
            </div>
            <p className="text-xs line-clamp-2 text-muted-foreground mt-1">{sessionTitle}</p>
          </CardContent>
          <CardFooter className="flex justify-center gap-2 pb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Info
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>{speaker.fullName}</DialogTitle>
                  <DialogDescription>{company}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={speaker.profilePicture} alt={speaker.fullName} />
                      <AvatarFallback>{speaker.fullName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    {sessionTitle && (
                      <h3 className="text-lg font-semibold">{sessionTitle}</h3>
                    )}
                    <p className="text-sm text-center">{speaker.bio || 'No bio available.'}</p>
                    <div className="flex gap-2 mt-2">
                      {speaker.links && speaker.links.map((link, index) => (
                        <Button key={index} size="sm" variant="outline" asChild>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <SocialIcon url={link.url} />
                            {link.title || link.linkType}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                {speaker.sessions && speaker.sessions[0] && (
                  <Button asChild>
                    <a
                      href={`https://sessionize.com/app/organizer/session/17572/${speaker.sessions[0].id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Session Details
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </DialogContent>
            </Dialog>
            {speaker.sessions && speaker.sessions[0] && (
              <Button variant="default" size="sm" asChild>
                <a
                  href={`https://sessionize.com/app/organizer/session/17572/${speaker.sessions[0].id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Session
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  // Featured sessions component
  const FeaturedSessions = () => {
    if (featuredSpeakers.length === 0) return null;

    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Featured Sessions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSpeakers.map((speaker) => {
            if (!speaker.sessions || speaker.sessions.length === 0) return null;
            
            const session = speaker.sessions[0];
            const category = session.categories && session.categories.length > 0 
              ? session.categories[0] 
              : 'General';
            
            return (
              <Card key={speaker.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg border-t-4 border-t-primary">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">
                      <span className="mr-1">{getCategoryIcon(category)}</span>
                      {category}
                    </Badge>
                  </div>
                  <CardTitle className="line-clamp-2 text-xl">{session.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">{speaker.fullName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {session.description || speaker.bio || 'No description available.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <a 
                      href={`https://sessionize.com/app/organizer/session/17572/${session.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Session Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold text-primary">Conference Speakers</h1>

      {isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <p className="text-gray-600 text-lg">Loading speakers...</p>
        </div>
      ) : (
        <>
          {/* Featured Sessions */}
          <FeaturedSessions />

          {/* Tabs for categories */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 max-w-xl mx-auto mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {currentSpeakers.map((speaker) => (
                  <SpeakerCard key={speaker.id} speaker={speaker} />
                ))}
              </div>

              {/* Pagination */}
              {filteredSpeakers.length > speakersPerPage && (
                <div className="mt-8 flex flex-wrap justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`rounded-md px-3 py-1 text-sm transition-colors duration-200 
                        ${
                          currentPage === i + 1
                            ? 'bg-primary text-primary-foreground'
                            : 'border border-primary text-primary hover:bg-primary/10'
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Speakers;