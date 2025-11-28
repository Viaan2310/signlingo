import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Mic, Settings, Globe, RefreshCw, Volume2, Loader2, StopCircle, PlayCircle, ScanLine, Focus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Expanded mock translation data for a more realistic simulation
const MOCK_TRANSLATIONS = [
  "Hello, how are you doing today?",
  "It's really nice to meet you.",
  "Could you please help me find the nearest hospital?",
  "I am looking for the library, is it close by?",
  "I have been practicing sign language for a few months.",
  "Thank you so much for your assistance.",
  "What time does the train leave?",
  "I hope you have a wonderful day ahead.",
  "My name is Sarah, what is yours?",
  "Can we meet again tomorrow?",
  "I need to buy some water.",
  "This technology is fascinating.",
  "Please speak a bit slower.",
  "Do you understand what I am saying?",
  "I am happy to be here."
];

export default function TranslationInterface() {
  const [isScanning, setIsScanning] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("english");
  const [translatedText, setTranslatedText] = useState<string[]>([]);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: "smooth",
      });
    }
  }, [translatedText]);

  // Simulate translation stream
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isScanning) {
      // Immediate first result after a short delay
      const initialTimeout = setTimeout(() => {
        const randomPhrase = MOCK_TRANSLATIONS[Math.floor(Math.random() * MOCK_TRANSLATIONS.length)];
        setTranslatedText(prev => [...prev, randomPhrase]);
      }, 1000);

      interval = setInterval(() => {
        const randomPhrase = MOCK_TRANSLATIONS[Math.floor(Math.random() * MOCK_TRANSLATIONS.length)];
        setTranslatedText(prev => [...prev, randomPhrase]);
      }, 3000);
      
      return () => {
        clearTimeout(initialTimeout);
        clearInterval(interval);
      }
    }

    return () => clearInterval(interval);
  }, [isScanning]);

  // Handle Camera
  const toggleCamera = async () => {
    if (isScanning) {
      setIsScanning(false);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraPermission(true);
        setIsScanning(true);
      }
    } catch (err) {
      console.error("Camera access denied:", err);
      setCameraPermission(false);
      // Fallback simulation mode if camera fails/denied
      setIsScanning(true);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[600px]">
      
      {/* Left Panel: Input / Camera */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary border-primary/20">
              <Camera className="w-3 h-3 mr-2" />
              Input: ASL (Sign Language)
            </Badge>
          </div>
          {isScanning && (
             <div className="flex items-center gap-2 text-xs text-red-500 animate-pulse font-medium">
               <span className="w-2 h-2 rounded-full bg-red-500" />
               LIVE
             </div>
          )}
        </div>

        <Card className="relative aspect-[4/3] overflow-hidden rounded-2xl border-0 shadow-xl bg-black/90 group ring-1 ring-white/10">
          {/* Camera View / Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!isScanning && !cameraPermission && (
               <div className="text-center space-y-4 p-6">
                 <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                   <Camera className="w-8 h-8 text-white/50" />
                 </div>
                 <h3 className="text-white font-medium text-lg">Camera is waiting</h3>
                 <p className="text-white/40 text-sm max-w-xs mx-auto">
                   Enable camera access to start translating sign language in real-time.
                 </p>
               </div>
            )}

            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted 
              className={`w-full h-full object-cover transition-opacity duration-500 ${isScanning ? 'opacity-100' : 'opacity-0'}`} 
            />
            
            {/* Fallback if camera permission denied but scanning active (Simulation Mode) */}
            {isScanning && cameraPermission === false && (
               <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
                 <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                 <p className="text-white/60">Simulating Camera Feed...</p>
               </div>
            )}
          </div>

          {/* Overlay UI */}
          <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
            {/* Top HUD */}
            <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5 text-xs text-white/80 font-mono border border-white/10">
                1280x720 • 30FPS
              </div>
              <div className="bg-black/40 backdrop-blur-md rounded-full p-2 text-white/80 border border-white/10">
                <Settings className="w-4 h-4" />
              </div>
            </div>
            
            {/* Bounding Box Animation (Scanning Effect) */}
            {isScanning && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative"
                >
                   {/* Skeletal Tracking Simulation Overlay */}
                   <div className="absolute top-1/3 left-1/4 w-4 h-4 rounded-full bg-primary/60 blur-[2px] animate-pulse" />
                   <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-primary/40 blur-[2px] animate-pulse delay-100" />
                   <div className="absolute bottom-1/3 right-1/3 w-4 h-4 rounded-full bg-primary/60 blur-[2px] animate-pulse delay-200" />
                   <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-primary/40 blur-[2px] animate-pulse delay-300" />
                   
                   {/* Connecting Lines */}
                   <svg className="absolute inset-0 w-full h-full opacity-30">
                     <path d="M 200 200 L 300 150 L 400 250" stroke="currentColor" strokeWidth="2" className="text-primary" fill="none" />
                   </svg>

                  {/* Center Focus Box */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-2 border-primary/50 rounded-xl relative">
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -mt-1 -ml-1" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary -mt-1 -mr-1" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -mb-1 -ml-1" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary -mb-1 -mr-1" />
                      
                      {/* Scanning Line */}
                      <motion.div 
                        animate={{ top: ["5%", "95%", "5%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-2 right-2 h-0.5 bg-primary/50 shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                      />
                      
                      {/* Tech Data Overlay */}
                      <div className="absolute -top-6 left-0 text-[10px] font-mono text-primary/80 flex gap-2">
                        <span>TRK: {(Math.random() * 100).toFixed(2)}</span>
                        <span>CONF: 99.8%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
            
            {/* Bottom Controls */}
            <div className="flex justify-center pointer-events-auto">
              <Button 
                size="lg" 
                variant={isScanning ? "destructive" : "default"}
                onClick={toggleCamera}
                className="rounded-full h-14 px-8 shadow-2xl transition-all duration-300 hover:scale-105"
              >
                {isScanning ? (
                  <>
                    <StopCircle className="w-5 h-5 mr-2" />
                    Stop Translation
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Camera
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Panel: Output */}
      <div className="flex flex-col gap-4 h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Globe className="w-4 h-4 text-muted-foreground" />
             <span className="text-sm text-muted-foreground font-medium">Translate to:</span>
             <Select value={targetLanguage} onValueChange={setTargetLanguage}>
              <SelectTrigger className="w-[140px] h-8 bg-white border-border/60">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setTranslatedText([])}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <Card className="flex-1 border-border/50 shadow-sm bg-white/50 backdrop-blur-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border/40 bg-muted/30 flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live Transcript</span>
            {isScanning && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 scroll-smooth" ref={scrollContainerRef}>
            <div className="space-y-6">
              {translatedText.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-40 py-20">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Mic className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium">Waiting for sign input...</p>
                </div>
              ) : (
                translatedText.map((text, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-bold text-primary">{i + 1}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-lg font-medium text-foreground leading-relaxed">
                        {text}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Confidence: {(Math.random() * (0.999 - 0.95) + 0.95).toFixed(2).slice(2)}% • Model: ASL-v2.4
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
          
          {/* Active translation indicator */}
          {isScanning && (
            <div className="p-4 bg-primary/5 border-t border-primary/10">
              <div className="flex items-center gap-3">
                <div className="flex space-x-1">
                  <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-primary rounded-full" />
                  <motion.div animate={{ height: [8, 24, 8] }} transition={{ repeat: Infinity, duration: 1, delay: 0.1 }} className="w-1 bg-primary rounded-full" />
                  <motion.div animate={{ height: [8, 12, 8] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 bg-primary rounded-full" />
                </div>
                <span className="text-sm text-primary font-medium">Listening...</span>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
