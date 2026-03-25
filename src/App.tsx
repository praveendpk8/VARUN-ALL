/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Zap, 
  Code, 
  Plane, 
  Cpu, 
  Eye, 
  Activity, 
  Terminal, 
  Box, 
  Wind, 
  Cloud, 
  ChevronRight, 
  X, 
  Sparkles,
  Search,
  BookOpen,
  ArrowLeft,
  Volume2,
  VolumeX,
  Play,
  Puzzle,
  Hash,
  Grid,
  Send,
  Navigation,
  CloudRain,
  HelpCircle
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { STEM_CITY_DATA } from './constants';
import { District, Topic } from './types';
import { cn } from './lib/utils';
import { askGemini } from './services/geminiService';

const ICON_MAP: Record<string, any> = {
  Bot, Zap, Code, Plane, Cpu, Eye, Activity, Terminal, Box, Wind, Cloud, Puzzle, Hash, Grid, Send, Navigation, CloudRain
};

export default function App() {
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [question, setQuestion] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const handleAskAi = async () => {
    if (!question.trim()) return;
    setIsAiLoading(true);
    setAiResponse(null);
    const context = selectedTopic ? selectedTopic.title : (selectedDistrict ? selectedDistrict.name : "STEM City");
    const response = await askGemini(question, context);
    setAiResponse(response);
    setIsAiLoading(false);
  };

  const toggleSpeak = (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown for speech
    const cleanText = text.replace(/[#*`]/g, '').replace(/\[.*?\]\(.*?\)/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onend = () => setIsSpeaking(false);
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => { setSelectedDistrict(null); setSelectedTopic(null); window.speechSynthesis.cancel(); setIsSpeaking(false); }}
        >
          <div className="w-10 h-10 bg-stem-blue rounded-xl flex items-center justify-center text-white shadow-lg">
            <Sparkles size={24} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">STEM City</h1>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <button onClick={() => setSelectedDistrict(null)} className="hover:text-stem-blue transition-colors">Map</button>
          <button className="hover:text-stem-blue transition-colors">Tutorials</button>
          <button className="hover:text-stem-blue transition-colors">Challenges</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!selectedDistrict ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <h2 className="text-5xl font-extrabold text-slate-900 leading-tight">
                  The <span className="text-stem-blue">Future</span> is in your hands! 🚀
                </h2>
                <p className="text-lg text-slate-600">
                  Welcome to STEM City. Explore Robotics, Electronics, Coding, and Aerodynamics. 
                  Everything is fully updated for your adventure!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STEM_CITY_DATA.map((district) => {
                  const Icon = ICON_MAP[district.icon];
                  return (
                    <motion.button
                      key={district.id}
                      whileHover={{ y: -8 }}
                      onClick={() => setSelectedDistrict(district)}
                      className={cn(
                        "group relative h-80 rounded-3xl overflow-hidden text-left card-hover",
                        district.color
                      )}
                    >
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                      <div className="relative h-full p-8 flex flex-col justify-between text-white">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                          <Icon size={32} />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold">{district.name}</h3>
                          <p className="text-white/80 text-sm leading-relaxed">{district.description}</p>
                          <div className="pt-4 flex items-center gap-2 font-bold text-sm">
                            Explore District <ChevronRight size={16} />
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="district"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <button 
                onClick={() => setSelectedDistrict(null)}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold transition-colors"
              >
                <ArrowLeft size={20} /> Back to Map
              </button>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider", selectedDistrict.color)}>
                    District
                  </div>
                  <h2 className="text-4xl font-extrabold text-slate-900">{selectedDistrict.name}</h2>
                  <p className="text-slate-600 max-w-xl">{selectedDistrict.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedDistrict.topics.map((topic) => {
                  const Icon = ICON_MAP[topic.icon];
                  return (
                    <motion.div
                      key={topic.id}
                      whileHover={{ scale: 1.02 }}
                      className="glass p-8 rounded-3xl space-y-6 cursor-pointer group"
                      onClick={() => setSelectedTopic(topic)}
                    >
                      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", topic.color.replace('text-', 'bg-').replace('500', '100'))}>
                        <Icon size={32} className={topic.color} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-bold text-slate-900">{topic.title}</h4>
                        <p className="text-slate-600 text-sm line-clamp-2">{topic.description}</p>
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Learn More</span>
                        <button className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform group-hover:translate-x-1", selectedDistrict.color)}>
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Topic Modal */}
      <AnimatePresence>
        {selectedTopic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => { setSelectedTopic(null); window.speechSynthesis.cancel(); setIsSpeaking(false); }} />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 md:p-8 border-b flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", selectedTopic.color.replace('text-', 'bg-').replace('500', '100'))}>
                    {React.createElement(ICON_MAP[selectedTopic.icon], { size: 24, className: selectedTopic.color })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedTopic.title}</h3>
                    <p className="text-sm text-slate-500">{selectedDistrict?.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleSpeak(selectedTopic.content)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all",
                      isSpeaking ? "bg-stem-red text-white" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    )}
                  >
                    {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    {isSpeaking ? "Stop Speaking" : "Speak"}
                  </button>
                  <button 
                    onClick={() => { setSelectedTopic(null); window.speechSynthesis.cancel(); setIsSpeaking(false); }}
                    className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-12">
                <div className="prose prose-slate prose-lg max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold text-slate-900 mb-6" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-xl font-bold text-slate-800 mt-6 mb-3" {...props} />,
                      p: ({node, ...props}) => <p className="text-slate-600 leading-relaxed mb-4" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-4 text-slate-600" {...props} />,
                      li: ({node, ...props}) => <li className="ml-4" {...props} />,
                      code: ({node, ...props}) => <code className="bg-slate-100 text-stem-purple px-1.5 py-0.5 rounded font-mono text-sm" {...props} />,
                      pre: ({node, ...props}) => <pre className="bg-slate-900 text-slate-100 p-6 rounded-2xl overflow-x-auto my-6 font-mono text-sm leading-relaxed" {...props} />,
                      a: ({node, ...props}) => {
                        const isYoutube = props.href?.includes('youtube.com/embed');
                        if (isYoutube) {
                          return (
                            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg my-8">
                              <iframe 
                                src={props.href} 
                                className="w-full h-full" 
                                allowFullScreen 
                                title="STEM Video"
                              />
                            </div>
                          );
                        }
                        return <a className="text-stem-blue underline" {...props} />;
                      }
                    }}
                  >
                    {selectedTopic.content}
                  </ReactMarkdown>
                </div>

                {/* Block Coding Visualizer (Simulated) */}
                {selectedTopic.id === 'block-coding' && (
                  <div className="mt-8 p-6 bg-slate-100 rounded-3xl border-2 border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Puzzle size={20} className="text-stem-purple" /> Block Coding Playground
                    </h4>
                    <div className="space-y-2">
                      <div className="bg-stem-purple text-white px-4 py-2 rounded-r-full rounded-tl-full w-fit font-bold shadow-sm">When Started</div>
                      <div className="ml-4 space-y-2 border-l-4 border-stem-purple/20 pl-4">
                        <div className="bg-stem-orange text-white px-4 py-2 rounded-r-full w-fit font-bold shadow-sm">Repeat Forever</div>
                        <div className="ml-4 space-y-2 border-l-4 border-stem-orange/20 pl-4">
                          <div className="bg-stem-blue text-white px-4 py-2 rounded-r-full w-fit font-bold shadow-sm">Move 10 Steps</div>
                          <div className="bg-stem-green text-white px-4 py-2 rounded-r-full w-fit font-bold shadow-sm">If on Edge, Bounce</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Assistant Section */}
                <div className="mt-12 p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-stem-purple rounded-xl flex items-center justify-center text-white">
                      <HelpCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Have a doubt?</h4>
                      <p className="text-sm text-slate-500">Ask the STEM City Guide! Doubts are good for learning!</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="e.g. How does the ultrasonic sensor work?"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-stem-purple/20 transition-all"
                    />
                    <button 
                      onClick={handleAskAi}
                      disabled={isAiLoading}
                      className="px-6 py-3 bg-stem-purple text-white font-bold rounded-xl hover:bg-stem-purple/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                      {isAiLoading ? 'Thinking...' : <><Sparkles size={18} /> Ask AI</>}
                    </button>
                  </div>

                  {aiResponse && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-white rounded-2xl border border-stem-purple/20 shadow-sm"
                    >
                      <div className="flex items-center gap-2 mb-2 text-stem-purple font-bold text-sm">
                        <Sparkles size={14} /> Guide says:
                      </div>
                      <p className="text-slate-700 leading-relaxed italic">"{aiResponse}"</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-stem-blue rounded-lg flex items-center justify-center text-white">
                <Sparkles size={18} />
              </div>
              <h2 className="text-xl font-bold">STEM City</h2>
            </div>
            <p className="text-slate-400 text-sm">Empowering the next generation of engineers, coders, and scientists. Fully updated for 2026!</p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold">Explore</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>Robotics Ridge</li>
                <li>Electronics Enclave</li>
                <li>Coding Corner</li>
                <li>Aero Heights</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Company</h4>
              <ul className="text-slate-400 text-sm space-y-2">
                <li>About Us</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold">Newsletter</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className="bg-slate-800 border-none rounded-lg px-4 py-2 text-sm flex-1" />
              <button className="bg-stem-blue px-4 py-2 rounded-lg text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 text-center text-slate-500 text-xs">
          © 2026 STEM City. Built with ❤️ for future explorers.
        </div>
      </footer>
    </div>
  );
}

