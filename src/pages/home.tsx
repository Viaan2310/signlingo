import { useEffect } from "react";
import { motion } from "framer-motion";
import TranslationInterface from "@/components/translation-interface";
import heroBg from "@assets/generated_images/soft_abstract_gradient_background_with_organic_shapes_implying_flow_and_connection.png";
import { HandMetal, Languages, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden selection:bg-primary/20">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-panel border-b-0">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <HandMetal className="w-5 h-5" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">SignLingo</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Features</a>
            <a href="#" className="hover:text-foreground transition-colors">About</a>
            <a href="#" className="hover:text-foreground transition-colors">Community</a>
          </nav>

          <Button size="sm" className="rounded-full px-6">
            Get App
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroBg} 
              alt="Background" 
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
          </div>

          <div className="container mx-auto relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Now with 98% Accuracy
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-foreground mb-6 leading-[1.1]">
                Bridging silence with <br />
                <span className="text-gradient italic">understanding.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Instant, AI-powered sign language translation directly in your browser. Break down communication barriers with a single click.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button 
                size="lg" 
                className="h-12 px-8 rounded-full text-base shadow-lg shadow-primary/25"
                onClick={() => document.getElementById('translator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Translating <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base bg-white/50 backdrop-blur-sm border-primary/10 hover:bg-white/80">
                View Demo
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Interface Section */}
        <section id="translator" className="relative z-20 pb-32 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-medium mb-4">Try it yourself</h2>
              <p className="text-muted-foreground">Allow camera access to begin translating ASL gestures.</p>
            </div>
            
            <TranslationInterface />
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
               <div className="p-6 rounded-2xl bg-white/50 border border-white/60 shadow-sm backdrop-blur-sm">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <HandMetal className="w-6 h-6" />
                 </div>
                 <h3 className="font-serif font-bold text-lg mb-2">Real-time Detection</h3>
                 <p className="text-sm text-muted-foreground">Advanced computer vision tracks hand movements with precision.</p>
               </div>
               <div className="p-6 rounded-2xl bg-white/50 border border-white/60 shadow-sm backdrop-blur-sm">
                 <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Languages className="w-6 h-6" />
                 </div>
                 <h3 className="font-serif font-bold text-lg mb-2">Multi-Language</h3>
                 <p className="text-sm text-muted-foreground">Instantly convert signs into English, Spanish, French, and more.</p>
               </div>
               <div className="p-6 rounded-2xl bg-white/50 border border-white/60 shadow-sm backdrop-blur-sm">
                 <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Globe className="w-6 h-6" />
                 </div>
                 <h3 className="font-serif font-bold text-lg mb-2">Universal Access</h3>
                 <p className="text-sm text-muted-foreground">Works on any device with a camera. No specialized hardware needed.</p>
               </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-border/40 bg-white/50">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2024 SignLingo Inc. Built for a more connected world.</p>
        </div>
      </footer>
    </div>
  );
}
