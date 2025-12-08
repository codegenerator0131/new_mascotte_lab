"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, GraduationCap, Presentation, MessageCircle, User, Star, Clock, Lock, CheckCircle2, Mic, Video, PhoneOff, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

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
  { id: "interview", title: "Job Interview", icon: Briefcase, description: "Ace your next interview" },
  { id: "exam", title: "Oral Exam", icon: GraduationCap, description: "Prepare for academic vivas" },
  { id: "presentation", title: "Presentation", icon: Presentation, description: "Rehearse your pitch" },
  { id: "conversation", title: "General Conversation", icon: MessageCircle, description: "Improve social fluency" },
];

const AVATARS: Avatar[] = [
  { id: "mentor", name: "Coach Aura", role: "Friendly Mentor", image: "/images/avatar-coach.png", style: "Friendly" },
  { id: "examiner", name: "Dr. Reed", role: "Strict Examiner", image: "/images/avatar-teacher.png", style: "Strict" },
  { id: "hr", name: "Sarah Chen", role: "HR Interviewer", image: "/images/avatar-job-interview.png", style: "Professional" },
  { id: "hospitality", name: "Marcus", role: "Hospitality Recruiter", image: "/images/avatar-presentation.png", style: "Professional" },
  { id: "tutor", name: "Elena", role: "Language Tutor", image: "/images/avatar-conversation.png", style: "Casual" },
];

export default function Onboarding() {
  const [step, setStep] = useState<Step>("name");
  const [name, setName] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const router = useRouter();

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
    languageLevel: ""
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
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  // --- Step Components ---

  const NameStep = () => (
    <div className="space-y-6 text-center max-w-md mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl font-heading font-bold text-primary">Welcome to Mascotte.AI</h1>
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
        <h2 className="text-2xl font-heading font-bold">Hi {name}, what's your goal?</h2>
        <p className="text-muted-foreground">Choose a practice mode to get started.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {GOALS.map((goal) => (
          <Card 
            key={goal.id}
            className={`cursor-pointer transition-all hover:shadow-md border-2 ${selectedGoal === goal.id ? "border-primary bg-primary/5" : "border-transparent hover:border-primary/20"}`}
            onClick={() => setSelectedGoal(goal.id)}
          >
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <div className={`p-3 rounded-full ${selectedGoal === goal.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                <goal.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">{goal.title}</h3>
                <p className="text-sm text-muted-foreground">{goal.description}</p>
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
                <Select onValueChange={(v) => setDetails({...details, industry: v})} value={details.industry}>
                  <SelectTrigger><SelectValue placeholder="Select industry" /></SelectTrigger>
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
                    onChange={(e) => setDetails({...details, customIndustry: e.target.value})}
                    className="mt-2"
                    autoFocus
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label>Role Level</Label>
                <Select onValueChange={(v) => setDetails({...details, roleLevel: v})} value={details.roleLevel}>
                  <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
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
                <Select onValueChange={(v) => setDetails({...details, subject: v})} value={details.subject}>
                  <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
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
                    onChange={(e) => setDetails({...details, customSubject: e.target.value})}
                    className="mt-2"
                    autoFocus
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label>Exam Type</Label>
                <Select onValueChange={(v) => setDetails({...details, examType: v})} value={details.examType}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viva">Viva Voce</SelectItem>
                    <SelectItem value="defense">Thesis Defense</SelectItem>
                    <SelectItem value="presentation">Class Presentation</SelectItem>
                    <SelectItem value="debate">Debate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          );
        case "presentation":
          return (
            <>
              <div className="space-y-2">
                <Label>Topic</Label>
                <Input 
                  placeholder="e.g., Q3 Sales Report" 
                  value={details.topic}
                  onChange={(e) => setDetails({...details, topic: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>Audience</Label>
                <Select onValueChange={(v) => setDetails({...details, audience: v})} value={details.audience}>
                  <SelectTrigger><SelectValue placeholder="Select audience" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investors">Investors</SelectItem>
                    <SelectItem value="team">Internal Team</SelectItem>
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
                <Select onValueChange={(v) => setDetails({...details, scenario: v})} value={details.scenario}>
                  <SelectTrigger><SelectValue placeholder="Select scenario" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coffee">Coffee Shop Chat</SelectItem>
                    <SelectItem value="networking">Networking Event</SelectItem>
                    <SelectItem value="travel">Travel / Directions</SelectItem>
                    <SelectItem value="dating">First Date</SelectItem>
                    <SelectItem value="custom">Other (Type below)</SelectItem>
                  </SelectContent>
                </Select>
                {details.scenario === "custom" && (
                  <Input 
                    placeholder="Enter scenario" 
                    value={details.customScenario}
                    onChange={(e) => setDetails({...details, customScenario: e.target.value})}
                    className="mt-2"
                    autoFocus
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label>Language Level</Label>
                <Select onValueChange={(v) => setDetails({...details, languageLevel: v})} value={details.languageLevel}>
                  <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (A1-A2)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (B1-B2)</SelectItem>
                    <SelectItem value="advanced">Advanced (C1-C2)</SelectItem>
                    <SelectItem value="native">Native-like</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          );
        default:
          return null;
      }
    };

    return (
      <div className="space-y-6 max-w-md mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-heading font-bold">Tell us more</h2>
          <p className="text-muted-foreground">Customize your practice session.</p>
        </div>
        <div className="space-y-4">
          {renderForm()}
        </div>
        <Button 
          size="lg" 
          className="w-full rounded-full h-12 text-lg" 
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    );
  };

  const AvatarStep = () => (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-heading font-bold">Choose your partner</h2>
        <p className="text-muted-foreground">Select an AI avatar to practice with.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {AVATARS.map((avatar) => (
          <Card 
            key={avatar.id}
            className={`cursor-pointer transition-all hover:shadow-md border-2 overflow-hidden ${selectedAvatar === avatar.id ? "border-primary ring-2 ring-primary/20" : "border-transparent hover:border-primary/20"}`}
            onClick={() => setSelectedAvatar(avatar.id)}
          >
            <div className="aspect-square bg-muted relative">
              <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8 text-white">
                <div className="font-bold text-sm">{avatar.name}</div>
                <div className="text-xs opacity-80">{avatar.role}</div>
              </div>
            </div>
            <CardContent className="p-3 text-center">
              <Badge variant="secondary" className="text-xs">{avatar.style}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="max-w-md mx-auto">
        <Button 
          size="lg" 
          className="w-full rounded-full h-12 text-lg" 
          onClick={handleNext}
          disabled={!selectedAvatar}
        >
          Start Session
        </Button>
      </div>
    </div>
  );

  const PracticeStep = () => {
    const avatar = AVATARS.find(a => a.id === selectedAvatar);
    
    return (
      <div className="h-[80vh] flex flex-col relative rounded-3xl overflow-hidden bg-black shadow-2xl border-4 border-background">
        {/* Video Feed */}
        <div className="flex-1 relative">
          <img src={avatar?.image} alt="Avatar" className="w-full h-full object-cover opacity-80" />
          
          {/* Overlay UI */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
            </div>
            <Badge variant="outline" className="bg-black/40 backdrop-blur-md text-white border-white/20">
              {avatar?.name} • {avatar?.role}
            </Badge>
          </div>

          {/* User Camera Preview (PiP) */}
          <div className="absolute bottom-4 right-4 w-32 h-48 bg-gray-900 rounded-xl border-2 border-white/20 overflow-hidden shadow-lg">
            <div className="w-full h-full flex items-center justify-center text-white/50">
              <User className="w-12 h-12" />
            </div>
          </div>

          {/* Captions Placeholder */}
          <div className="absolute bottom-24 left-8 right-48 text-center">
             <p className="text-white/90 text-lg font-medium drop-shadow-md bg-black/20 backdrop-blur-sm inline-block px-4 py-2 rounded-xl">
               "Hello {name}! I see you're interested in {selectedGoal === 'interview' ? 'a job interview' : 'practicing'}. Let's begin."
             </p>
          </div>
        </div>

        {/* Controls */}
        <div className="h-20 bg-background border-t flex items-center justify-center gap-6 px-8">
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-2">
            <Video className="w-5 h-5" />
          </Button>
          <Button variant="destructive" size="icon" className="rounded-full w-14 h-14 shadow-lg" onClick={() => { setIsTimerRunning(false); setStep("paywall"); }}>
            <PhoneOff className="w-6 h-6" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-2">
            <Mic className="w-5 h-5" />
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
        <h2 className="text-3xl font-heading font-bold">Unlock Unlimited Practice</h2>
        <p className="text-muted-foreground">Your free trial has ended. Upgrade to continue mastering your communication skills.</p>
      </div>

      {/* One-off Payment Option */}
      <Card className="border-muted bg-background hover:border-primary/50 transition-colors cursor-pointer">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="text-left space-y-1">
            <div className="font-bold">One-off Session Report</div>
            <div className="text-sm text-muted-foreground">Get AI summary, analytics & recording</div>
          </div>
          <div className="text-right">
            <div className="font-bold text-lg">€2.99</div>
            <Button variant="outline" size="sm" className="mt-1 h-8 rounded-full">
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
          <span className="bg-background px-2 text-muted-foreground">Or upgrade for unlimited access</span>
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

      <Button size="lg" className="w-full rounded-full h-12 text-lg shadow-lg shadow-primary/20">
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
