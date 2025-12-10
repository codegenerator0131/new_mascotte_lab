"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Briefcase,
  GraduationCap,
  Presentation,
  MessageCircle,
  User,
  Star,
  Clock,
  Lock,
  CheckCircle2,
  Mic,
  Video,
  PhoneOff,
  ArrowRight,
} from "lucide-react";

// Types
type Step = "name" | "goal" | "details" | "avatar" | "practice" | "paywall";

type Goal = {
  id: string;
  title: string;
  icon: any;
  description: string;
};

type Avatar = {
  id: string;
  name: string;
  role: string;
  image: string;
  style: "Friendly" | "Strict" | "Professional" | "Casual";
};

const GOALS: Goal[] = [
  {
    id: "interview",
    title: "Job Interview",
    icon: Briefcase,
    description: "Ace your next interview",
  },
  {
    id: "exam",
    title: "Oral Exam",
    icon: GraduationCap,
    description: "Prepare for academic vivas",
  },
  {
    id: "presentation",
    title: "Presentation",
    icon: Presentation,
    description: "Rehearse your pitch",
  },
  {
    id: "conversation",
    title: "General Conversation",
    icon: MessageCircle,
    description: "Improve social fluency",
  },
];

const AVATARS: Avatar[] = [
  {
    id: "mentor",
    name: "Coach Aura",
    role: "Friendly Mentor",
    image: "/images/avatar-coach.png",
    style: "Friendly",
  },
  {
    id: "examiner",
    name: "Dr. Reed",
    role: "Strict Examiner",
    image: "/images/avatar-teacher.png",
    style: "Strict",
  },
  {
    id: "hr",
    name: "Sarah Chen",
    role: "HR Interviewer",
    image: "/images/avatar-job-interview.png",
    style: "Professional",
  },
  {
    id: "hospitality",
    name: "Marcus",
    role: "Hospitality Recruiter",
    image: "/images/avatar-presentation.png",
    style: "Professional",
  },
  {
    id: "tutor",
    name: "Elena",
    role: "Language Tutor",
    image: "/images/avatar-conversation.png",
    style: "Casual",
  },
];

export default function Onboarding() {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Dynamic Form State
  const [details, setDetails] = useState({
    // Job Interview
    industry: "",
    customIndustry: "",
    roleLevel: "",
    // Oral Exam
    subject: "",
    customSubject: "",
    examType: "",
    // Presentation
    topic: "",
    customTopic: "",
    audience: "",
    // Conversation
    scenario: "",
    customScenario: "",
    languageLevel: "",
  });

  // Timer logic for practice mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setStep("paywall");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (step === "name" && name) setStep("goal");
    else if (step === "goal" && selectedGoal) setStep("details");
    else if (step === "details") setStep("avatar");
    else if (step === "avatar" && selectedAvatar) {
      setStep("practice");
      setIsTimerRunning(true);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  // --- Step Components ---

  const NameStep = () => (
    <div className="space-y-6 text-center max-w-md mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold text-primary">
          Welcome to Mascotte.AI
        </h1>
        <p className="text-muted-foreground">Let's start with your name.</p>
      </div>
      <Input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="text-lg h-14 text-center"
        autoFocus
      />
      <Button
        size="lg"
        className="w-full rounded-full h-12 text-lg"
        onClick={handleNext}
        disabled={!name.trim()}
      >
        Continue
      </Button>
    </div>
  );

  const GoalStep = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-bold">
          Hi {name}, what's your goal?
        </h2>
        <p className="text-muted-foreground">
          Choose a practice mode to get started.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GOALS.map((goal) => (
          <Card
            key={goal.id}
            className={`cursor-pointer transition-all hover:shadow-md border-2 ${
              selectedGoal === goal.id
                ? "border-primary bg-primary/5"
                : "border-transparent hover:border-primary/20"
            }`}
            onClick={() => setSelectedGoal(goal.id)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <div
                className={`p-3 rounded-full ${
                  selectedGoal === goal.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <goal.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">{goal.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {goal.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        size="lg"
        className="w-full rounded-full h-12 text-lg"
        onClick={handleNext}
        disabled={!selectedGoal}
      >
        Continue
      </Button>
    </div>
  );

  const DetailsStep = () => {
    const renderForm = () => {
      switch (selectedGoal) {
        case "interview":
          return (
            <>
              <div className="space-y-2">
                <Label>Target Industry</Label>
                <Select
                  onValueChange={(v) => setDetails({ ...details, industry: v })}
                  value={details.industry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="custom">Other (Type below)</SelectItem>
                  </SelectContent>
                </Select>
                {details.industry === "custom" && (
                  <Input
                    placeholder="Enter your industry"
                    value={details.customIndustry}
                    onChange={(e) =>
                      setDetails({ ...details, customIndustry: e.target.value })
                    }
                    className="mt-2"
                    autoFocus
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label>Role Level</Label>
                <Select
                  onValueChange={(v) =>
                    setDetails({ ...details, roleLevel: v })
                  }
                  value={details.roleLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intern">Internship</SelectItem>
                    <SelectItem value="junior">Junior / Entry Level</SelectItem>
                    <SelectItem value="mid">Mid-Senior</SelectItem>
                    <SelectItem value="manager">Manager / Director</SelectItem>
                    <SelectItem value="exec">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          );
        case "exam":
          return (
            <>
              <div className="space-y-2">
                <Label>Subject / Field</Label>
                <Select
                  onValueChange={(v) => setDetails({ ...details, subject: v })}
                  value={details.subject}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="law">Law</SelectItem>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="psychology">Psychology</SelectItem>
                    <SelectItem value="literature">Literature</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="custom">Other (Type below)</SelectItem>
                  </SelectContent>
                </Select>
                {details.subject === "custom" && (
                  <Input
                    placeholder="Enter your subject"
                    value={details.customSubject}
                    onChange={(e) =>
                      setDetails({ ...details, customSubject: e.target.value })
                    }
                    className="mt-2"
                    autoFocus
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label>Exam Type</Label>
                <Select
                  onValueChange={(v) => setDetails({ ...details, examType: v })}
                  value={details.examType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thesis">Thesis Defense</SelectItem>
                    <SelectItem value="viva">Viva Voce</SelectItem>
                    <SelectItem value="language">
                      Language Proficiency
                    </SelectItem>
                    <SelectItem value="medical">Medical Clinical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          );
        case "presentation":
          return (
            <>
              <div className="space-y-2">
                <Label>Presentation Topic</Label>
                <Select
                  onValueChange={(v) => setDetails({ ...details, topic: v })}
                  value={details.topic}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select topic type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Pitch</SelectItem>
                    <SelectItem value="update">Project Update</SelectItem>
                    <SelectItem value="investor">Investor Deck</SelectItem>
                    <SelectItem value="keynote">Keynote Speech</SelectItem>
                    <SelectItem value="training">Training Session</SelectItem>
                    <SelectItem value="launch">Product Launch</SelectItem>
                    <SelectItem value="custom">Other (Type below)</SelectItem>
                  </SelectContent>
                </Select>
                {details.topic === "custom" && (
                  <Input
                    placeholder="Enter your topic"
                    value={details.customTopic}
                    onChange={(e) =>
                      setDetails({ ...details, customTopic: e.target.value })
                    }
                    className="mt-2"
                    autoFocus
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label>Target Audience</Label>
                <Select
                  onValueChange={(v) => setDetails({ ...details, audience: v })}
                  value={details.audience}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investors">Investors</SelectItem>
                    <SelectItem value="colleagues">
                      Colleagues / Team
                    </SelectItem>
                    <SelectItem value="clients">Clients</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="public">General Public</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          );
        case "conversation":
          return (
            <>
              <div className="space-y-2">
                <Label>Scenario</Label>
                <Select
                  onValueChange={(v) => setDetails({ ...details, scenario: v })}
                  value={details.scenario}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual Chat</SelectItem>
                    <SelectItem value="networking">Networking Event</SelectItem>
                    <SelectItem value="date">First Date</SelectItem>
                    <SelectItem value="conflict">
                      Conflict Resolution
                    </SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                    <SelectItem value="travel">Travel / Directions</SelectItem>
                    <SelectItem value="food">Ordering Food</SelectItem>
                    <SelectItem value="custom">Other (Type below)</SelectItem>
                  </SelectContent>
                </Select>
                {details.scenario === "custom" && (
                  <Input
                    placeholder="Enter your scenario"
                    value={details.customScenario}
                    onChange={(e) =>
                      setDetails({ ...details, customScenario: e.target.value })
                    }
                    className="mt-2"
                    autoFocus
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label>Difficulty Level</Label>
                <Select
                  onValueChange={(v) =>
                    setDetails({ ...details, languageLevel: v })
                  }
                  value={details.languageLevel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (A1-A2)</SelectItem>
                    <SelectItem value="intermediate">
                      Intermediate (B1-B2)
                    </SelectItem>
                    <SelectItem value="advanced">Advanced (C1-C2)</SelectItem>
                    <SelectItem value="native">Native / Fluent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          );
        default:
          return null;
      }
    };

    const isFormValid = () => {
      switch (selectedGoal) {
        case "interview":
          return (
            (details.industry === "custom"
              ? details.customIndustry
              : details.industry) && details.roleLevel
          );
        case "exam":
          return (
            (details.subject === "custom"
              ? details.customSubject
              : details.subject) && details.examType
          );
        case "presentation":
          return (
            (details.topic === "custom"
              ? details.customTopic
              : details.topic) && details.audience
          );
        case "conversation":
          return (
            (details.scenario === "custom"
              ? details.customScenario
              : details.scenario) && details.languageLevel
          );
        default:
          return false;
      }
    };

    return (
      <div className="space-y-6 max-w-md mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-heading font-bold">Tell us more</h2>
          <p className="text-muted-foreground">
            Customize your{" "}
            {GOALS.find((g) => g.id === selectedGoal)?.title.toLowerCase()}{" "}
            session.
          </p>
        </div>

        <Card>
          <CardContent className="p-6 space-y-4 text-left">
            {renderForm()}
          </CardContent>
        </Card>

        <Button
          size="lg"
          className="w-full rounded-full h-12 text-lg"
          onClick={handleNext}
          disabled={!isFormValid()}
        >
          Continue
        </Button>
      </div>
    );
  };

  const AvatarStep = () => (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-bold">
          Pick your Practice Partner
        </h2>
        <p className="text-muted-foreground">
          Select the personality that fits your needs.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {AVATARS.map((avatar) => (
          <div
            key={avatar.id}
            className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
              selectedAvatar === avatar.id
                ? "border-primary ring-2 ring-primary/20 scale-105"
                : "border-transparent hover:border-primary/30"
            }`}
            onClick={() => setSelectedAvatar(avatar.id)}
          >
            <div className="aspect-[3/4] relative">
              <img
                src={avatar.image}
                alt={avatar.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <p className="font-bold text-sm">{avatar.name}</p>
                <p className="text-xs opacity-80">{avatar.role}</p>
              </div>
              {selectedAvatar === avatar.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-1 rounded-full">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        size="lg"
        className="w-full rounded-full h-12 text-lg max-w-md mx-auto block"
        onClick={handleNext}
        disabled={!selectedAvatar}
      >
        Start Practicing
      </Button>
    </div>
  );

  const PracticeStep = () => {
    const avatar = AVATARS.find((a) => a.id === selectedAvatar);

    return (
      <div className="h-[calc(100vh-4rem)] flex flex-col max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-4">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="animate-pulse border-red-500 text-red-500 flex gap-1"
            >
              <div className="w-2 h-2 rounded-full bg-red-500" />
              REC
            </Badge>
            <span className="text-sm font-medium text-muted-foreground">
              {GOALS.find((g) => g.id === selectedGoal)?.title} Mode
            </span>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 text-primary" />
            <span
              className={`font-mono font-medium ${
                timeLeft < 60 ? "text-red-500" : ""
              }`}
            >
              {formatTime(timeLeft)}
            </span>
            <span className="text-xs text-muted-foreground">Free Trial</span>
          </div>
        </div>

        {/* Main Video Area */}
        <div className="flex-1 relative bg-black rounded-3xl overflow-hidden shadow-2xl mb-4 group">
          <img
            src={avatar?.image}
            alt="Avatar"
            className="w-full h-full object-cover opacity-90"
          />

          {/* AI Overlay UI */}
          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
            <div className="bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white max-w-lg">
              <p className="text-sm text-white/60 mb-1">{avatar?.role}</p>
              <p className="text-lg font-medium">
                "Tell me about a time you had to handle a difficult situation."
              </p>
            </div>

            {/* User Self View */}
            <div className="w-32 h-48 bg-zinc-800 rounded-xl border-2 border-white/10 overflow-hidden shadow-lg relative">
              <div className="absolute inset-0 flex items-center justify-center text-white/20">
                <User className="w-12 h-12" />
              </div>
              <div className="absolute bottom-2 left-2 text-[10px] text-white/80 bg-black/50 px-1.5 py-0.5 rounded">
                You
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm"
            >
              <Mic className="w-5 h-5" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              className="rounded-full w-14 h-14 shadow-lg"
              onClick={() => setStep("paywall")}
            >
              <PhoneOff className="w-6 h-6" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full w-12 h-12 bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm"
            >
              <Video className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => setStep("paywall")}
          >
            End Session
          </Button>
        </div>
      </div>
    );
  };

  const PaywallStep = () => (
    <div className="max-w-md mx-auto text-center space-y-8 py-8">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary mb-6">
        <Lock className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-heading font-bold">
          Unlock Unlimited Practice
        </h2>
        <p className="text-muted-foreground">
          Your free trial has ended. Upgrade to continue mastering your
          communication skills.
        </p>
      </div>

      {/* One-off Payment Option */}
      <Card className="border-muted bg-background hover:border-primary/50 transition-colors cursor-pointer">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="text-left space-y-1">
            <div className="font-bold">One-off Session Report</div>
            <div className="text-sm text-muted-foreground">
              Get AI summary, analytics & recording
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">€2.99</div>
            <Button
              variant="outline"
              size="sm"
              className="mt-1 h-8 rounded-full"
            >
              Get it Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or upgrade for unlimited access
          </span>
        </div>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold">€9.99</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <ul className="space-y-3 text-left text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>20 practice sessions per month</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Advanced AI feedback & analytics</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>All avatar personalities unlocked</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Save and review recordings</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Button
        size="lg"
        className="w-full rounded-full h-12 text-lg shadow-lg shadow-primary/20"
      >
        Upgrade Now
      </Button>

      <p className="text-xs text-muted-foreground">
        Cancel anytime. No hidden fees.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Simple Header */}
      <header className="h-16 border-b flex items-center justify-center px-4">
        <div className="font-heading font-bold text-xl tracking-tight">
          Mascotte<span className="text-primary">.AI</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center"
          >
            {step === "name" && <NameStep />}
            {step === "goal" && <GoalStep />}
            {step === "details" && <DetailsStep />}
            {step === "avatar" && <AvatarStep />}
            {step === "practice" && <PracticeStep />}
            {step === "paywall" && <PaywallStep />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
