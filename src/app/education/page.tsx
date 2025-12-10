"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Mic,
  Presentation,
  GraduationCap,
  Briefcase,
  Star,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Education() {
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
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary border-primary/20"
              >
                <Sparkles className="w-4 h-4 mr-2 inline" />
                AI-Powered Confidence
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] tracking-tight text-foreground"
            >
              Master Every <br />
              <span className="text-primary">Conversation</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Become more confident in job interviews, oral exams, and
              presentations with your personal AI practice partner.
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
              <Link href="/onboarding" className="inline-block">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-14 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all pointer-events-none"
                >
                  Start Practicing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-14 text-lg border-2"
              >
                View Demo
              </Button>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="flex items-center gap-4 pt-4 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden"
                  >
                    <img
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <p>Trusted by 10,000+ students & professionals</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-background/50 backdrop-blur-sm">
              <video
                src="/videos/workshop_call.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover aspect-[4/3]"
              />

              {/* Floating UI Elements */}
              <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mic className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-2/3 animate-[width_2s_ease-in-out_infinite]" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2 font-medium">
                      Listening...
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-sm font-medium text-primary flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Feedback
              </div>
            </div>

            {/* Decorative blobs */}
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Why Practice with Mascotte?
          </h2>
          <p className="text-muted-foreground text-lg">
            Traditional practice is awkward. We make it natural, effective, and
            available 24/7.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: MessageSquare,
              title: "Realistic Conversations",
              desc: "Chat with AI avatars that react, interrupt, and engage just like real humans.",
              color: "bg-blue-100 text-blue-600",
            },
            {
              icon: Star,
              title: "Instant Feedback",
              desc: "Get immediate analysis on your tone, pace, clarity, and answer quality.",
              color: "bg-yellow-100 text-yellow-600",
            },
            {
              icon: User,
              title: "Custom Personalities",
              desc: "Choose from a strict recruiter, a supportive teacher, or a casual peer.",
              color: "bg-green-100 text-green-600",
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className="border-none shadow-lg bg-card/50 hover:bg-card transition-colors duration-300"
            >
              <CardContent className="p-8 space-y-4">
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-4`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-heading font-bold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Practice Modes */}
      <section className="bg-muted/30 py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-4 max-w-2xl">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none mb-2">
                Practice Modes
              </Badge>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">
                Tailored for Every Scenario
              </h2>
              <p className="text-muted-foreground text-lg">
                Whether you're preparing for a high-stakes interview or just
                want to improve your small talk.
              </p>
            </div>
            <Button variant="outline" className="rounded-full">
              View All Modes
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Job Interview Mode */}
            <div className="group relative overflow-hidden rounded-3xl bg-background border shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="/images/avatar-job-interview.png"
                  alt="Job Interview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">
                    Job Interview Mode
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Master behavioral questions with the STAR method. Get a
                  detailed score breakdown on your confidence and content.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> HR
                    behavioural questions
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> STAR
                    method analysis
                  </li>
                </ul>
                <Button className="w-full rounded-xl">Start Interview</Button>
              </div>
            </div>

            {/* Oral Exam Mode */}
            <div className="group relative overflow-hidden rounded-3xl bg-background border shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src="/images/avatar-teacher.png"
                  alt="Oral Exam"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-secondary/20 rounded-lg text-secondary-foreground">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">
                    Oral Exam Mode
                  </h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Upload your theory materials and let the AI quiz you. Perfect
                  for students preparing for vivas and oral defenses.
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Custom
                    theory upload
                  </li>
                  <li className="flex items-center gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />{" "}
                    Knowledge gap detection
                  </li>
                </ul>
                <Button className="w-full rounded-xl">Start Exam Prep</Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Conversation Mode */}
            <div className="flex gap-6 p-6 rounded-3xl bg-background border shadow-sm hover:shadow-md transition-all">
              <div className="w-1/3 rounded-2xl overflow-hidden shrink-0">
                <img
                  src="/images/avatar-conversation.png"
                  alt="Conversation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2 text-primary font-medium">
                  <MessageSquare className="w-4 h-4" /> Conversation
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  Language Practice
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Informal or formal dialogue to improve fluency in a new
                  language.
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto justify-start text-primary"
                >
                  Try it out <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>

            {/* Presentation Mode */}
            <div className="flex gap-6 p-6 rounded-3xl bg-background border shadow-sm hover:shadow-md transition-all">
              <div className="w-1/3 rounded-2xl overflow-hidden shrink-0">
                <img
                  src="/images/avatar-presentation.png"
                  alt="Presentation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2 text-primary font-medium">
                  <Presentation className="w-4 h-4" /> Presentation
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">
                  Pitch Rehearsal
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Practice your pitch deck with an attentive AI audience.
                </p>
                <Button
                  variant="link"
                  className="p-0 h-auto justify-start text-primary"
                >
                  Try it out <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container">
        <div className="bg-primary rounded-3xl p-12 md:p-24 text-center text-primary-foreground relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-6xl font-heading font-bold">
              Ready to find your voice?
            </h2>
            <p className="text-xl text-primary-foreground/80">
              Join thousands of users who have transformed their communication
              skills with Mascotte.AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/onboarding" className="inline-block">
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full px-10 h-14 text-lg font-semibold pointer-events-none"
                >
                  Get Started for Free
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-10 h-14 text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
