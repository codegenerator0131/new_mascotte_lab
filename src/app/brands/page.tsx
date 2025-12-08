"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Monitor, Store, Box, Sparkles, Globe, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Brands() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Image rotation logic
  const sdkImages = [
    "/images/brands-sdk-1.png",
    "/images/brands-sdk-2.png"
  ];

  const kioskImages = [
    "/images/brands-kiosk-1.png",
    "/images/brands-kiosk-2.png"
  ];

  const [sdkIndex, setSdkIndex] = useState(0);
  const [kioskIndex, setKioskIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSdkIndex((prev) => (prev + 1) % sdkImages.length);
      setKioskIndex((prev) => (prev + 1) % kioskImages.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-background"></div>
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="space-y-8"
          >
            <motion.div variants={fadeIn}>
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Mascotte for Brands
              </Badge>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] tracking-tight text-foreground">
              The Future of <br />
              <span className="text-primary">
                Customer Interaction
              </span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Deploy intelligent AI avatars across your digital and physical touchpoints. From websites to holographic kiosks.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-lg border-2">
                View Case Studies
              </Button>
            </motion.div>

            <motion.div variants={fadeIn} className="flex items-center gap-4 pt-4 text-sm text-muted-foreground">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Client" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p>Trusted by leading retail & hospitality brands</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-background/50 backdrop-blur-sm aspect-[4/3]">
              {/* Video Background for Hero */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/brands-sdk.mp4" type="video/mp4" />
              </video>
              
              {/* Floating UI Elements */}
              <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Cpu className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-2/3 animate-[width_2s_ease-in-out_infinite]" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">Processing customer query...</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Omnichannel AI Presence</h2>
          <p className="text-muted-foreground text-lg">
            One intelligent brain, multiple interfaces. Meet your customers wherever they are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Globe,
              title: "Online Integration",
              desc: "Embed lifelike AI assistants directly into your website for 24/7 customer support and sales.",
              color: "bg-blue-100 text-blue-600",
              image: "/images/omni-online.png"
            },
            {
              icon: Store,
              title: "Offline Kiosk",
              desc: "Transform physical spaces with interactive AI kiosks that guide, inform, and assist visitors.",
              color: "bg-purple-100 text-purple-600",
              image: "/images/omni-kiosk.png"
            },
            {
              icon: Box,
              title: "Holobox Experience",
              desc: "Create immersive, life-sized holographic interactions for premium retail and events.",
              color: "bg-indigo-100 text-indigo-600",
              image: "/images/omni-holobox.png"
            }
          ].map((feature, i) => (
            <Card key={i} className="border-none shadow-lg bg-card/50 hover:bg-card transition-colors duration-300 overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardContent className="p-8 space-y-4">
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-heading font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Deployment Modes */}
      <section className="bg-muted/30 py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4 max-w-2xl">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none mb-2">Deployment Options</Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Flexible Implementation</h2>
              <p className="text-muted-foreground text-lg">
                Choose the hardware and software configuration that fits your brand environment.
              </p>
            </div>
            <Button variant="outline" className="rounded-full">Contact Sales</Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Online Integration */}
            <div className="group relative overflow-hidden rounded-3xl bg-background border shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 relative">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={sdkIndex}
                    src={sdkImages[sdkIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Web & Mobile SDK Integration"
                  />
                </AnimatePresence>
                
                {/* Fallback icon */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                   <Monitor className="w-32 h-32 text-primary/20" />
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">Web & Mobile SDK</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Add a human face to your digital channels. Our lightweight SDK integrates seamlessly with React, Vue, and native mobile apps.
                </p>
                
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Low-latency streaming
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Custom brand voice & appearance
                  </li>
                </ul>
                <Link href="/docs" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-xl">View Documentation</Button>
                </Link>
              </div>
            </div>

            {/* Physical Kiosk & Holobox */}
            <div className="group relative overflow-hidden rounded-3xl bg-background border shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 relative">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={kioskIndex}
                    src={kioskImages[kioskIndex]}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Kiosk & Holobox Integration"
                  />
                </AnimatePresence>
                {/* Fallback icon */}
                <div className="absolute inset-0 flex items-center justify-center -z-10">
                  <Box className="w-32 h-32 text-purple-500/20" />
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Store className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">Kiosk & Holobox</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Turn heads with life-sized 3D avatars. Compatible with standard touch kiosks and premium Holobox displays for maximum impact.
                </p>

                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> 4K resolution support
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Gesture recognition & eye contact
                  </li>
                </ul>
                <Link href="/hardware" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-xl">Request Pricing</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
