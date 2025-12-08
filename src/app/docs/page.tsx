"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Terminal,
  Code,
  Smartphone,
  Globe,
  Copy,
  Check,
  Book,
  Layers,
  Cpu,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Documentation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  const codeSnippets = {
    react: `import { MascotteAvatar } from '@mascotte/react-sdk';

function App() {
  return (
    <div className="h-screen w-full">
      <MascotteAvatar 
        apiKey="YOUR_API_KEY"
        avatarId="avatar_12345"
        voiceId="voice_en_us_male_1"
        mode="assistant"
        onMessage={(msg) => console.log(msg)}
      />
    </div>
  );
}`,
    vue: `<template>
  <div class="h-screen w-full">
    <MascotteAvatar 
      apiKey="YOUR_API_KEY"
      avatarId="avatar_12345"
      mode="assistant"
      @message="handleMessage"
    />
  </div>
</template>

<script setup>
import { MascotteAvatar } from '@mascotte/vue-sdk';

const handleMessage = (msg) => {
  console.log(msg);
}
</script>`,
    ios: `import MascotteSDK

class ViewController: UIViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let avatarView = MascotteAvatarView(frame: self.view.bounds)
        avatarView.apiKey = "YOUR_API_KEY"
        avatarView.avatarId = "avatar_12345"
        avatarView.delegate = self
        
        self.view.addSubview(avatarView)
        avatarView.startSession()
    }
}`,
    android: `import com.mascotte.sdk.MascotteAvatarView

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        val avatarView = findViewById<MascotteAvatarView>(R.id.avatarView)
        avatarView.apiKey = "YOUR_API_KEY"
        avatarView.avatarId = "avatar_12345"
        avatarView.startSession()
    }
}`,
  };

  const sidebarContent = (
    <div className="space-y-6 py-4">
      <div>
        <h4 className="font-semibold mb-2 text-sm text-foreground/70 uppercase tracking-wider px-2">
          Getting Started
        </h4>
        <nav className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="justify-start h-8 px-2 text-sm font-medium bg-accent/50 text-accent-foreground w-full"
          >
            Introduction
          </Button>
          <Button
            variant="ghost"
            className="justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground w-full"
          >
            Authentication
          </Button>
          <Button
            variant="ghost"
            className="justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground w-full"
          >
            Quick Start
          </Button>
        </nav>
      </div>

      <div>
        <h4 className="font-semibold mb-2 text-sm text-foreground/70 uppercase tracking-wider px-2">
          Web SDKs
        </h4>
        <nav className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground w-full"
          >
            React
          </Button>
          <Button
            variant="ghost"
            className="justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground w-full"
          >
            Vue.js
          </Button>
          <Button
            variant="ghost"
            className="justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground w-full"
          >
            Vanilla JS
          </Button>
        </nav>
      </div>

      <div>
        <h4 className="font-semibold mb-2 text-sm text-foreground/70 uppercase tracking-wider px-2">
          Mobile SDKs
        </h4>
        <nav className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground w-full"
          >
            iOS (Swift)
          </Button>
          <Button
            variant="ghost"
            className="justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground w-full"
          >
            Android (Kotlin)
          </Button>
          <Button
            variant="ghost"
            className="justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground w-full"
          >
            React Native
          </Button>
        </nav>
      </div>

      <div>
        <h4 className="font-semibold mb-2 text-sm text-foreground/70 uppercase tracking-wider px-2">
          API Reference
        </h4>
        <nav className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground w-full"
          >
            Avatars
          </Button>
          <Button
            variant="ghost"
            className="justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground w-full"
          >
            Voices
          </Button>
          <Button
            variant="ghost"
            className="justify-start h-8 px-2 text-sm text-muted-foreground hover:text-foreground w-full"
          >
            Sessions
          </Button>
        </nav>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="container flex items-center justify-between py-4 gap-4">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <ScrollArea className="h-full">{sidebarContent}</ScrollArea>
              </SheetContent>
            </Sheet>
            <Book className="w-6 h-6 text-primary hidden md:block" />
            <h1 className="text-xl font-bold font-heading">
              Developer Documentation
            </h1>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              className="pl-9 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container grid md:grid-cols-[240px_1fr] gap-8 py-8">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden md:block sticky top-32 h-[calc(100vh-160px)]">
          <ScrollArea className="h-full pr-4">{sidebarContent}</ScrollArea>
        </aside>

        {/* Main Content */}
        <main className="space-y-12 min-w-0">
          {/* Introduction */}
          <motion.section
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
              <Layers className="w-4 h-4" />
              <span>Overview</span>
            </div>
            <h2 className="text-4xl font-heading font-bold">
              Mascotte SDK Documentation
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Integrate lifelike AI avatars into your applications with just a
              few lines of code. Our SDKs handle the complex real-time
              streaming, lip-sync, and interaction logic, letting you focus on
              building great experiences.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <Card className="bg-card/50 hover:bg-card transition-colors cursor-pointer">
                <CardHeader className="pb-2">
                  <Globe className="w-8 h-8 text-blue-500 mb-2" />
                  <CardTitle className="text-lg">Web SDK</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    React, Vue, and Vanilla JS integration for web apps.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-card/50 hover:bg-card transition-colors cursor-pointer">
                <CardHeader className="pb-2">
                  <Smartphone className="w-8 h-8 text-green-500 mb-2" />
                  <CardTitle className="text-lg">Mobile SDK</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Native iOS and Android libraries for mobile experiences.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-card/50 hover:bg-card transition-colors cursor-pointer">
                <CardHeader className="pb-2">
                  <Cpu className="w-8 h-8 text-purple-500 mb-2" />
                  <CardTitle className="text-lg">REST API</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Direct API access for custom backend integrations.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          <Separator />

          {/* Quick Integration */}
          <motion.section
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <h3 className="text-2xl font-heading font-bold">
              Quick Integration
            </h3>
            <p className="text-muted-foreground">
              Choose your platform to see how easy it is to get started with
              Mascotte.
            </p>

            <Tabs defaultValue="react" className="w-full">
              <TabsList className="w-full justify-start h-auto p-1 bg-muted/50 rounded-xl mb-4 overflow-x-auto flex-nowrap">
                <TabsTrigger
                  value="react"
                  className="gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <Code className="w-4 h-4" /> React
                </TabsTrigger>
                <TabsTrigger
                  value="vue"
                  className="gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <Code className="w-4 h-4" /> Vue
                </TabsTrigger>
                <TabsTrigger
                  value="ios"
                  className="gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <Smartphone className="w-4 h-4" /> iOS
                </TabsTrigger>
                <TabsTrigger
                  value="android"
                  className="gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
                >
                  <Smartphone className="w-4 h-4" /> Android
                </TabsTrigger>
              </TabsList>

              {Object.entries(codeSnippets).map(([key, code]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <div className="relative rounded-xl overflow-hidden border bg-[#1e1e1e] text-white shadow-xl">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d2d] border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/80" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                          <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-white/70 hover:text-white hover:bg-white/10 gap-1.5"
                        onClick={() => copyToClipboard(code, key)}
                      >
                        {copiedId === key ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        {copiedId === key ? "Copied!" : "Copy"}
                      </Button>
                    </div>
                    <div className="p-4 overflow-x-auto">
                      <pre className="font-mono text-sm leading-relaxed">
                        <code>{code}</code>
                      </pre>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.section>

          <Separator />

          {/* Authentication */}
          <motion.section
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            <h3 className="text-2xl font-heading font-bold">Authentication</h3>
            <p className="text-muted-foreground">
              All API requests must be authenticated using your API key. You can
              obtain your API key from the
              <a href="#" className="text-primary hover:underline mx-1">
                Dashboard
              </a>
              .
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg p-4 flex gap-3">
              <div className="mt-1">
                <Terminal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-1">
                  Security Note
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-400/80">
                  Never expose your secret API keys in client-side code. For
                  frontend applications, use publishable keys or proxy requests
                  through your own backend.
                </p>
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}
