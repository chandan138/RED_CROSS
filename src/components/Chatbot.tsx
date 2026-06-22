import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, X, MessageSquare, ShieldAlert, Sparkles, User, ArrowRight } from 'lucide-react';
import { TeddyMascot } from './TeddyMascot';
import { DOCTORS, type Doctor } from '../data/doctors';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestedDoctors?: Doctor[];
  precautions?: string[];
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi! I'm Teddy, your AI Medical Assistant. 🧸\nHow are you feeling today? Tell me your symptoms, and I'll help suggest a diagnosis, precautions, and recommend the best doctor for you.",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [mascotState, setMascotState] = useState<'idle' | 'waving' | 'thinking' | 'typing' | 'helping'>('idle');
  const [conversationStep, setConversationStep] = useState(0);
  const [symptomsInfo, setSymptomsInfo] = useState({ symptom: '', duration: '', severity: '' });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // Scroll to bottom whenever messages list changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Trigger a friendly wave when opened
  useEffect(() => {
    if (isOpen) {
      setMascotState('waving');
      const timer = setTimeout(() => setMascotState('idle'), 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setInputValue('');
    setMascotState('typing');

    // Add user message
    const userMsgId = `user-${Date.now()}`;
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text: userText, timestamp: new Date() }]);

    // RAG chatbot n8n integration check
    try {
      setMascotState('thinking');
      
      // Attempt n8n RAG system webhook call
      const response = await fetch('https://chandu098.app.n8n.cloud/webhook/310bbe1f-7713-42b5-9373-7c64ac3dcc70', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: "sendMessage",
          message: userText,
          chatInput: userText
        })
      });

      if (response.ok) {
        const data = await response.json();
        const botResponseText = data.output || data.response || data.text || JSON.stringify(data);
        
        // Match suggestions based on keywords from n8n response
        const recommended = matchDoctors(botResponseText);
        const precautions = getPrecautions(botResponseText + " " + userText);

        setMessages(prev => [...prev, {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponseText,
          timestamp: new Date(),
          suggestedDoctors: recommended.length > 0 ? recommended : undefined,
          precautions: precautions.length > 0 ? precautions : undefined
        }]);
        setMascotState(recommended.length > 0 ? 'helping' : 'idle');
        return;
      }
    } catch (e) {
      console.log("n8n workflow is currently offline/CORS blocked, running local medical conversational engine", e);
    }

    // Fallback: Intelligent Medical Conversational Engine
    simulateConversationalEngine(userText);
  };

  const simulateConversationalEngine = (userText: string) => {
    const text = userText.toLowerCase();

    // 1. Personal Message (Hi, hello, thanks)
    if (text.match(/\b(hi|hello|hey|greetings|good morning|good afternoon|thanks|thank you)\b/)) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "Hello! I can help guide you through symptoms and suggest specialist doctors. Please tell me what health issues or symptoms you are experiencing.",
          timestamp: new Date()
        }]);
        setMascotState('idle');
      }, 1000);
      return;
    }

    // 2. Health & Symptom diagnosis flow
    let step = conversationStep;
    let currentSymptoms = { ...symptomsInfo };

    if (step === 0) {
      currentSymptoms.symptom = userText;
      setSymptomsInfo(currentSymptoms);
      setConversationStep(1);

      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "I understand. To help pin this down, how long have you been experiencing these symptoms? (e.g., today, a few days, over a week)",
          timestamp: new Date()
        }]);
        setMascotState('idle');
      }, 1200);
    } else if (step === 1) {
      currentSymptoms.duration = userText;
      setSymptomsInfo(currentSymptoms);
      setConversationStep(2);

      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "Got it. Are you experiencing any other symptoms like fever, dizziness, or sharp pain? Please describe the severity (mild, moderate, severe).",
          timestamp: new Date()
        }]);
        setMascotState('idle');
      }, 1200);
    } else if (step === 2) {
      currentSymptoms.severity = userText;
      setSymptomsInfo(currentSymptoms);
      setConversationStep(0); // Reset for next inquiry

      // Final Diagnosis & Recommendation
      setTimeout(() => {
        const fullSymptoms = `${currentSymptoms.symptom} for ${currentSymptoms.duration}. Additional info: ${userText}`;
        const recommended = matchDoctors(fullSymptoms);
        const precautions = getPrecautions(fullSymptoms);

        let diagnosisText = "Based on your symptoms, here is what I recommend:\n\n";
        
        if (precautions.length > 0) {
          diagnosisText += "⚠️ **Precautionary Measures to take:**\n" + precautions.map(p => `• ${p}`).join('\n') + "\n\n";
        }
        
        if (recommended.length > 0) {
          diagnosisText += `I highly recommend scheduling a consultation with a **${recommended[0].specialty}**. I've found matching profiles in our database below:`;
        } else {
          diagnosisText += "I recommend consulting a General Physician for a detailed analysis.";
        }

        setMessages(prev => [...prev, {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: diagnosisText,
          timestamp: new Date(),
          suggestedDoctors: recommended.length > 0 ? recommended : undefined,
          precautions: precautions.length > 0 ? precautions : undefined
        }]);
        setMascotState(recommended.length > 0 ? 'helping' : 'idle');
      }, 1500);
    }
  };

  const matchDoctors = (text: string): Doctor[] => {
    const t = text.toLowerCase();
    if (t.includes('heart') || t.includes('cardio') || t.includes('chest pain') || t.includes('breathless')) {
      return DOCTORS.filter(d => d.specialty === 'Cardiologist');
    }
    if (t.includes('brain') || t.includes('migraine') || t.includes('headache') || t.includes('nervous') || t.includes('nerve') || t.includes('sleep')) {
      return DOCTORS.filter(d => d.specialty === 'Neurologist');
    }
    if (t.includes('child') || t.includes('kid') || t.includes('pediatric') || t.includes('baby') || t.includes('vaccin')) {
      return DOCTORS.filter(d => d.specialty === 'Pediatrician');
    }
    if (t.includes('skin') || t.includes('rash') || t.includes('acne') || t.includes('dermatology') || t.includes('hair') || t.includes('allergy')) {
      return DOCTORS.filter(d => d.specialty === 'Dermatologist');
    }
    if (t.includes('bone') || t.includes('joint') || t.includes('fracture') || t.includes('knee') || t.includes('back pain') || t.includes('spine') || t.includes('ortho')) {
      return DOCTORS.filter(d => d.specialty === 'Orthopedist');
    }
    return [];
  };

  const getPrecautions = (text: string): string[] => {
    const t = text.toLowerCase();
    if (t.includes('heart') || t.includes('chest pain')) {
      return [
        "Avoid strenuous activity and rest immediately",
        "Keep breathing calm and sit upright",
        "If pain radiates to the arm/jaw, seek emergency ER services immediately",
        "Avoid heavy meals or caffeine"
      ];
    }
    if (t.includes('headache') || t.includes('migraine') || t.includes('brain')) {
      return [
        "Rest in a quiet, dark room",
        "Stay hydrated and avoid screen time",
        "Apply a cold compress to your forehead/temples",
        "Avoid strong light and loud noises"
      ];
    }
    if (t.includes('child') || t.includes('kid') || t.includes('pediatric')) {
      return [
        "Monitor temperature regularly if feverish",
        "Ensure fluid intake (water, ORS, breastmilk)",
        "Do not self-medicate without doctor consultation",
        "Keep the child in a comfortable, airy room"
      ];
    }
    if (t.includes('skin') || t.includes('rash') || t.includes('acne')) {
      return [
        "Do not scratch or pick at the affected skin",
        "Wash with mild, fragrance-free soap",
        "Avoid applying heavy makeup or harsh chemicals",
        "Keep the area cool and dry"
      ];
    }
    if (t.includes('bone') || t.includes('joint') || t.includes('knee')) {
      return [
        "Apply the RICE method: Rest, Ice, Compression, Elevation",
        "Avoid putting weight on the affected limb/joint",
        "Avoid hot baths or heat packs in the first 48 hours",
        "Use a brace or support if available"
      ];
    }
    return [
      "Stay hydrated and rest",
      "Monitor your temperature and symptoms closely",
      "Avoid self-prescribing antibiotics",
      "Reach out to a medical professional if symptoms worsen"
    ];
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[380px] sm:w-[420px] h-[550px] bg-slate-900/95 border border-slate-700/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 transition-all duration-300 transform scale-100 origin-bottom-right glass-panel">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between text-white border-b border-blue-500/20">
            <div className="flex items-center space-x-3">
              <div className="relative bg-white/20 p-1 rounded-full animate-pulse-ring">
                <TeddyMascot state={mascotState} size={42} />
              </div>
              <div>
                <h3 className="font-semibold text-sm flex items-center gap-1">
                  Teddy Bot <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </h3>
                <p className="text-[10px] text-blue-100">Medical RAG Advisor</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/60 scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white ${
                    msg.sender === 'user' ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4 text-sky-400" />}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className={`rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700/50 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>

                    {/* Suggested Doctors In-Chat Card */}
                    {msg.suggestedDoctors && (
                      <div className="mt-2 space-y-2">
                        <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Recommended Doctors:</p>
                        {msg.suggestedDoctors.map((doc) => (
                          <div
                            key={doc.id}
                            onClick={() => {
                              setIsOpen(false);
                              navigate(`/doctor/${doc.id}`);
                            }}
                            className="bg-slate-800/90 border border-slate-700/60 rounded-xl p-3 hover:border-blue-500/50 cursor-pointer transition-all hover:bg-slate-750 flex items-center space-x-3 group"
                          >
                            <img
                              src={doc.image}
                              alt={doc.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-xs text-white group-hover:text-blue-400 transition-colors truncate">{doc.name}</h4>
                              <p className="text-[10px] text-blue-400 font-medium">{doc.specialty}</p>
                              <p className="text-[10px] text-slate-400 truncate">{doc.hospital}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-transform group-hover:translate-x-1" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Warnings / Disclaimers */}
          <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 text-[10px] text-amber-500/80 flex items-center space-x-1.5 shrink-0">
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Medibot AI suggestions do not replace clinical advice.</span>
          </div>

          {/* Form */}
          <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2 shrink-0">
            <input
              type="text"
              placeholder="Describe your symptom..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-xl transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full p-4 shadow-xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 relative group flex items-center justify-center border border-white/10"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative flex items-center space-x-1">
            <MessageSquare className="w-6 h-6" />
            <span className="text-lg animate-emoji-wave select-none">👋</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          </div>
        )}
        <div className="absolute right-full mr-3 bg-slate-900 text-slate-200 border border-slate-800 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 shadow-md">
          Chat with Teddy 🧸
        </div>
      </button>
    </div>
  );
};
