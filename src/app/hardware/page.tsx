"use client";

import { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Hardware() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("86inch");
  const [selectedColor, setSelectedColor] = useState("white");
  
  const images = [
    "/images/brands-kiosk-1.png",
    "/images/brands-kiosk-2.png",
    "/images/omni-holobox.png",
    "/images/omni-kiosk.png"
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-20">
      {/* Header with Search */}
      <div className="container mb-8">
        <div className="flex items-center justify-between">
          <Link href="/brands">
            <Button variant="ghost" className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
              <ArrowLeft className="w-4 h-4" />
              Back to Brands
            </Button>
          </Link>
          <div className="relative w-64 hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 rounded-full border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden border">
              <img 
                src={images[selectedImage]} 
                alt="86inch AI Holobox" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white px-2 py-1 rounded border text-xs font-bold text-blue-600">
                Holo.One
              </div>
              <div className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white cursor-pointer transition-colors">
                <Search className="w-4 h-4 text-gray-600" />
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div 
                  key={i} 
                  className={`aspect-square rounded-lg overflow-hidden border cursor-pointer transition-all ${selectedImage === i ? 'ring-2 ring-primary border-primary' : 'hover:border-gray-400'}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <img 
                    src={img} 
                    alt={`View ${i + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-800 mb-4">
                {selectedSize} AI Holobox Transparent LCD 3D Holographic Display
              </h1>
              <p className="font-medium text-slate-700 mb-6">
                {selectedSize} AI Holobox Transparent LCD 3D Holographic Display with Camera and Microphone
              </p>
              
              <ul className="space-y-3 text-slate-600 text-sm leading-relaxed list-disc pl-5 marker:text-slate-400">
                <li>Active area 1897*1068</li>
                <li>{selectedSize} 3D Holographic monitor dimension 2130*1282*600mm</li>
                <li>Resolution: 3840*2160</li>
                <li>Brightness 420nits</li>
                <li>Weight 210kg</li>
                <li>Viewing angle: 89/89/89/89(U/D/L/R)</li>
                <li>Hot size: 21.5inch, 32inch 75inch, 86inch, 98inch</li>
                <li>10 points Touch screen</li>
                <li>The operating system options for this product include HDMI input, latest Android 9.0, and Windows 10 i3/i5/i7.</li>
                <li>USB plug and play</li>
                <li>It is available in black and white and orange color</li>
                <li>Holo.One transparent LCD screen can be installed on a wall or embedded in the shopping mall.</li>
                <li>Holo.One digital signage pricing terms include EXW, FOB, CIF, and DAP.</li>
                <li>Holo.One offers a customized solution to fit your specific needs and provide free branding logo services.</li>
              </ul>
            </div>

            {/* Configuration Options */}
            <div className="space-y-6 bg-slate-50 p-6 rounded-xl border">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Size</Label>
                <div className="flex flex-wrap gap-3">
                  {["21.5inch", "32inch", "75inch", "86inch", "98inch"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all border ${
                        selectedSize === size 
                          ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                          : "bg-white text-slate-700 border-slate-200 hover:border-primary/50 hover:bg-slate-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-semibold">Color</Label>
                <div className="flex gap-4">
                  {[
                    { id: "black", name: "Black", class: "bg-black" },
                    { id: "white", name: "White", class: "bg-white border-slate-200" },
                    { id: "orange", name: "Orange", class: "bg-orange-500" }
                  ].map((color) => (
                    <div 
                      key={color.id}
                      className={`relative cursor-pointer group`}
                      onClick={() => setSelectedColor(color.id)}
                    >
                      <div className={`w-10 h-10 rounded-full border shadow-sm ${color.class} ${selectedColor === color.id ? 'ring-2 ring-offset-2 ring-primary' : ''}`} />
                      <span className="text-xs text-center block mt-1 font-medium text-slate-600">{color.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-md px-8 py-6 text-lg font-medium w-full sm:w-auto shadow-sm">
                Request Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
