"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Sparkles, ArrowRight, ChevronDown, Volume2, VolumeX, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRef, useState, useEffect } from "react";

export default function Gateway() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [workshopImageIndex, setWorkshopImageIndex] = useState(0);

  const workshopImages = [
    "/images/workshop-1.jpeg",
    "/images/workshop-5.jpeg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setWorkshopImageIndex((prev) => (prev + 1) % workshopImages.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const portals = [
    {
      id: "education",
      title: "For Education",
      icon: GraduationCap,
      description: "Empower students and teachers with AI-driven practice for oral exams and interviews.",
      href: "/education",
      color: "bg-blue-50 text-blue-600",
      buttonVariant: "default" as const,
      image: "/images/portal-education.png"
    },
    {
      id: "brands",
      title: "For Brands",
      icon: Sparkles,
      description: "Create custom brand ambassadors and interactive avatars for your digital presence.",
      href: "/brands",
      color: "bg-purple-50 text-purple-600",
      buttonVariant: "outline" as const,
      image: "/images/portal-brands.png"
    },
    {
      id: "workshop",
      title: "Digital Human Workshop Training",
      icon: Users,
      description: "Hands-on training sessions to master digital human technology and implementation strategies.",
      href: "/workshop",
      color: "bg-slate-50 text-slate-600",
      buttonVariant: "outline" as const,
      image: workshopImages[workshopImageIndex], // Dynamic image
      isRotating: true
    }
  ];

  return (
    <div className="bg-background">
      {/* Video Section */}
      <div ref={containerRef} className="h-screen w-full relative z-0 overflow-hidden bg-black">
        <motion.div className="relative w-full h-full">
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
          <iframe
            className="w-full h-full object-cover pointer-events-none scale-150"
            src={`https://www.youtube.com/embed/qj9Mu1uzkmE?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=qj9Mu1uzkmE&playsinline=1&rel=0`}
            title="Mascotte AI Intro"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-8 right-8 text-white hover:bg-white/20 rounded-full"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </Button>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tight"
            >
              Mascotte.AI
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl max-w-2xl font-light text-white/90"
            >
              Digital human platform.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
              className="absolute bottom-12"
            >
              <ChevronDown className="w-10 h-10 text-white/80" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Portal Selection Section */}
      <div className="relative z-10 bg-background min-h-screen flex flex-col items-center justify-center p-4 md:p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] mt-[-10vh] pt-[15vh] bg-gradient-to-b from-transparent via-background to-background">
        <div className="absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-transparent to-background -mt-[20vh] pointer-events-none" />
        <div className="w-full max-w-6xl mx-auto py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-6"
          >
            <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight">
              Choose Your <span className="text-primary">Mascotte</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Select the portal that best fits your needs to get started.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {portals.map((portal, index) => (
              <motion.div
                key={portal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={portal.href} className="block h-full group">
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col bg-card rounded-3xl">
                    {/* Image Section */}
                    <div className="w-full h-56 overflow-hidden relative bg-gray-100">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                        
                        {portal.isRotating ? (
                          <AnimatePresence>
                            <motion.img 
                              key={workshopImageIndex}
                              src={portal.image} 
                              alt={portal.title} 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 1.5 }}
                              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                          </AnimatePresence>
                        ) : (
                          <img 
                              src={portal.image} 
                              alt={portal.title} 
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          />
                        )}

                        <div className={`absolute bottom-4 left-4 z-20 w-12 h-12 rounded-2xl ${portal.color} flex items-center justify-center shadow-lg backdrop-blur-sm bg-white/90`}>
                            <portal.icon className="w-6 h-6" />
                        </div>
                    </div>

                    <CardContent className="p-8 flex flex-col flex-1 text-left">
                      <h2 className="text-2xl font-heading font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                        {portal.title}
                      </h2>
                      
                      <p className="text-muted-foreground mb-8 flex-1 leading-relaxed text-base">
                        {portal.description}
                      </p>

                      <Button 
                        variant={portal.buttonVariant} 
                        className={`w-full rounded-full h-12 text-base font-medium group-hover:bg-primary group-hover:text-black transition-all duration-300 ${portal.buttonVariant === 'outline' ? 'border-2' : ''}`}
                      >
                        Enter Portal
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <footer className="mt-24 text-center text-sm text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
              <p>© 2025 Mascotte.AI. All rights reserved.</p>
              <p>Mascotte.AI is a platform by Reblika Software B.V.</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
