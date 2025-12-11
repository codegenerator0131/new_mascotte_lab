"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Rocket,
  Target,
  Zap,
  BrainCircuit,
} from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Workshop() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    company: "",
  });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const workshopImages = [
    "/images/workshop-1.jpeg",
    "/images/workshop-2.jpeg",
    "/images/workshop-3.jpeg",
    "/images/workshop-4.jpeg",
    "/images/workshop-5.jpeg",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/sendRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Workshop Booking Request",
          email: formData.email,
          company: formData.company,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Request Sent!", {
          description: "We'll get back to you within 24 hours.",
          position: "top-center",
        });
        setFormData({
          email: "",
          company: "",
        });
      } else {
        toast.error("Failed to send request", {
          description: data.error || "Please try again later.",
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong", {
        description: "Please try again later.",
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-20 pb-20 bg-background min-h-screen">
      <section className="relative pt-32 pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-background"></div>
        <div className="container grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="space-y-8"
          >
            <motion.div variants={fadeIn}>
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium rounded-full bg-slate-100 text-slate-700 border-slate-200"
              >
                <Users className="w-4 h-4 mr-2 inline" />
                Digital Human Workshop
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] tracking-tight text-foreground"
            >
              Master the Art of <br />
              <span className="text-slate-600">Digital Humans</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Join our hands-on training sessions to learn how to design,
              implement, and scale digital human technology for your
              organization.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 h-14 text-lg shadow-lg shadow-slate-200 hover:shadow-slate-300 transition-all bg-slate-900 hover:bg-slate-800 text-white"
              >
                Book a Workshop
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-14 text-lg border-2"
              >
                View Curriculum
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                  <video
                    src="/videos/workshop_call.mp4"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                  <img
                    src={workshopImages[1]}
                    alt="Team Collaboration"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                  <img
                    src={workshopImages[2]}
                    alt="Digital Human Demo"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                  <img
                    src={workshopImages[3]}
                    alt="Group Photo"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workshop Gallery */}
      <section className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Training in Action
          </h2>
          <p className="text-muted-foreground text-lg">
            See how teams are transforming their capabilities through our
            immersive workshops.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {workshopImages.slice(0, 3).map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 aspect-[4/3]"
            >
              <img
                src={img}
                alt={`Workshop Moment ${i + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Curriculum Grid */}
      <section className="bg-slate-50 py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              What You'll Learn
            </h2>
            <p className="text-muted-foreground text-lg">
              A comprehensive curriculum designed for innovation leaders,
              developers, and HR professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: BrainCircuit,
                title: "AI Fundamentals",
                desc: "Understand the core technologies behind digital humans, LLMs, and voice synthesis.",
              },
              {
                icon: Target,
                title: "Use Case Strategy",
                desc: "Identify high-impact applications for your specific industry and organizational goals.",
              },
              {
                icon: Zap,
                title: "Implementation",
                desc: "Hands-on technical guidance for integrating avatars into your existing tech stack.",
              },
              {
                icon: Rocket,
                title: "Future Roadmap",
                desc: "Explore upcoming trends in spatial computing and autonomous agents.",
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="border-none shadow-md hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="p-6 pt-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-700 mx-auto flex items-center justify-center">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="container max-w-4xl">
        <Card className="overflow-hidden border-none shadow-2xl bg-slate-900 text-white rounded-3xl relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-slate-800 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-700 rounded-full blur-3xl -ml-32 -mb-32 opacity-50"></div>

          <CardContent className="p-12 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-heading font-bold">
                  Ready to Transform Your Team?
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  Book a private workshop for your organization. Limited slots
                  available for Q1 2025.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />{" "}
                    Customized curriculum
                  </li>
                  <li className="flex items-center gap-3 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-green-400" /> Hands-on
                    demos
                  </li>
                  <li className="flex items-center gap-3 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />{" "}
                    Post-workshop support
                  </li>
                </ul>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Work Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@company.com"
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">
                    Company Name *
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Acme Inc."
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold"
                >
                  {isSubmitting ? "Sending..." : "Request Booking Info"}
                </Button>
                <p className="text-xs text-center text-slate-400">
                  We'll get back to you within 24 hours.
                </p>
              </form>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
