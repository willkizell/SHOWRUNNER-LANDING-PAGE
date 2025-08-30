'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Button from '@/components/Button';

type Phase = 'idle' | 'form' | 'building' | 'add-block' | 'run' | 'playing' | 'paused' | 'announce' | 'resume' | 'done';

export default function DemoSection() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [started, setStarted] = useState(false);
  const [demoKey, setDemoKey] = useState(0);
  const prefersReduced = useReducedMotion();

  // Simple audio refs
  const musicA = useRef<HTMLAudioElement | null>(null);
  const musicB = useRef<HTMLAudioElement | null>(null);
  const voice  = useRef<HTMLAudioElement | null>(null);
  const [playButtonPressed, setPlayButtonPressed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Staged block for add-block phase
  const [stagedBlock, setStagedBlock] = useState<{
    title: string;
    duration: string;
    announcement_notes: string;
  } | null>(null);

  // Volume ramping helper
  const rampVolume = (audio: HTMLAudioElement, from: number, to: number, ms: number) => {
    return new Promise<void>((resolve) => {
      const startTime = Date.now();
      const startVolume = from;
      const volumeDiff = to - from;
      
      const updateVolume = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / ms, 1);
        audio.volume = startVolume + (volumeDiff * progress);
        
        if (progress < 1) {
          requestAnimationFrame(updateVolume);
        } else {
          resolve();
        }
      };
      
      requestAnimationFrame(updateVolume);
    });
  };

  // Reset all state
  const resetState = () => {
    setPhase('idle');
    setStarted(false);
    setPlayButtonPressed(false);
    setIsPlaying(false);
    setIsPaused(false);
    setStagedBlock(null);
    setDemoKey(prev => prev + 1); // Force re-render of typing components
    // Reset audio volumes and positions
    if (musicA.current) {
      musicA.current.volume = 0.5;
      musicA.current.currentTime = 0;
    }
    if (musicB.current) {
      musicB.current.volume = 0.5;
      musicB.current.currentTime = 0;
    }
    if (voice.current) {
      voice.current.currentTime = 0;
    }
  };

  // Sequence driver
  const startDemo = async () => {
    resetState();
    setStarted(true);
    setPhase('form');

    // SAFARI FIX: Initialize all audio immediately on user interaction
    // This satisfies Safari's autoplay policy requirements
    try {
      if (musicA.current) {
        musicA.current.volume = 0;
        await musicA.current.play();
        musicA.current.pause();
        musicA.current.currentTime = 0;
      }
      if (musicB.current) {
        musicB.current.volume = 0;
        await musicB.current.play();
        musicB.current.pause();
        musicB.current.currentTime = 0;
      }
      if (voice.current) {
        voice.current.volume = 0;
        await voice.current.play();
        voice.current.pause();
        voice.current.currentTime = 0;
      }
    } catch (error) {
      // Ignore errors - some browsers might still block
      console.log('Audio initialization failed:', error);
    }

    // Wait for form typing to complete (slower timing with field stagger)
    await wait(6500);
    setPhase('building');

    await wait(900);
    setPhase('add-block');
    
    // Create staged block and animate it
    setStagedBlock({
      title: 'Arrival & Check-in',
      duration: '15 min',
      announcement_notes: 'Welcome the couple; invite guests to find seats for the first dance.'
    });
    
    // Wait for block animation to complete (card appear + field fills + gold accent)
    await wait(4200);
    setPhase('run');

    // Enter run mode and animate play button press
    await wait(600);
    setPlayButtonPressed(true);
    await wait(140); // Button press animation duration
    setPlayButtonPressed(false);
    
    setPhase('playing');
    setIsPlaying(true);
    
    // MUSIC START: set musicA.volume = 0.5 and play for 5000ms
    if (musicA.current) {
      musicA.current.volume = 0.5;
      await play(musicA.current, { fromStart: true });
    }
    await wait(5000);
    
    // FADE DOWN: ramp musicA.volume from 0.5 to 0.1 over ~600ms
    if (musicA.current) {
      await rampVolume(musicA.current, 0.5, 0.1, 600);
    }
    
    // ANNOUNCEMENT: set voice.volume = 1.0; play to completion while musicA continues
    setPhase('announce');
    if (voice.current) {
      voice.current.volume = 1.0;
      await play(voice.current, { fromStart: true });
      // Wait for announcement to complete
      await new Promise<void>((resolve) => {
        const handleEnded = () => {
          voice.current?.removeEventListener('ended', handleEnded);
          resolve();
        };
        voice.current?.addEventListener('ended', handleEnded);
      });
    }
    
    // RESUME: ramp musicA back up instead of starting new track
    setPhase('resume');
    if (musicA.current) {
      await rampVolume(musicA.current, 0.1, 0.5, 600);
    }
    await wait(5000);
    
    // STOP: pause both music tracks and reset volumes
    pause(musicA.current);
    pause(musicB.current);
    if (musicA.current) musicA.current.volume = 0.5;
    if (musicB.current) musicB.current.volume = 0.5;
    setIsPlaying(false);
    setIsPaused(false);
    
    setPhase('done');
    
    // Auto-reset after demo completes
    setTimeout(() => {
      resetState();
    }, 3000);
  };

  // Control handlers
  const handlePlay = () => {
    if (isPaused) {
      // Resume from pause
      if (musicA.current && !musicA.current.ended) {
        musicA.current.play();
      }
      if (musicB.current && !musicB.current.ended) {
        musicB.current.play();
      }
      setIsPaused(false);
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (isPlaying) {
      pause(musicA.current);
      pause(musicB.current);
      pause(voice.current);
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    pause(musicA.current);
    pause(musicB.current);
    pause(voice.current);
    if (musicA.current) {
      musicA.current.currentTime = 0;
      musicA.current.volume = 0.5;
    }
    if (musicB.current) {
      musicB.current.currentTime = 0;
      musicB.current.volume = 0.5;
    }
    if (voice.current) {
      voice.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setPhase('done');
  };

  // Stop on unmount
  useEffect(() => {
    return () => {
      [musicA.current, musicB.current, voice.current].forEach(a => a?.pause());
    };
  }, []);

  return (
    <section id="demo" className="py-20 sm:py-28 lg:py-32 relative">
      <div className="container max-w-5xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
            See <span className="text-brand-gold">ShowRunner▸</span> in action
          </h2>
          <p className="text-slate-soft mt-4 max-w-2xl mx-auto">
          Plan. Run. Party. See it happen in seconds.
          </p>
          <p className="text-slate-soft mt-3 max-w-2xl mx-auto">
          *Disclaimer: This will make noise...
          </p>
        </div>

        {/* Start button (required for audio gesture) */}
        {!started && (
          <div className="flex justify-center">
            <Button variant="primary" ariaLabel="Start demo"
              onClick={() => startDemo()}
            >
              Start Demo
            </Button>
          </div>
        )}
        
        {/* Restart button when done */}
        {phase === 'done' && (
          <div className="flex justify-center">
            <Button variant="primary" ariaLabel="Start demo again"
              onClick={() => startDemo()}
            >
              Start Demo Again
            </Button>
          </div>
        )}

        <motion.div 
          className="mt-10 rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ 
            scale: started ? 1 : 0.95, 
            opacity: started ? 1 : 0.8 
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div 
            className="grid gap-0"
            initial={{ gridTemplateColumns: "1fr" }}
            animate={{ 
              gridTemplateColumns: started ? "1fr 1fr" : "1fr" 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Left: UI simulation */}
            <motion.div 
              className="relative p-6"
              initial={{ minHeight: "200px" }}
              animate={{ 
                minHeight: started ? "360px" : "200px" 
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <AnimatePresence mode="wait">
                {phase === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center h-full text-center text-slate-soft"
                  >
                   
                    <br />
                    <br />
                    <span className="text-off-white font-medium">
                    Click <span className="text-off-white font-bold">Start Demo </span> to begin.
                    </span>
                  </motion.div>
                )}

                {phase === 'form' && (
                  <FormSim key={`form-${demoKey}`} prefersReduced={prefersReduced || false} demoKey={demoKey} />
                )}

                {phase === 'building' && (
                  <motion.div
                    key="building"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center h-full text-slate-soft"
                  >
                    Generating blocks…
                  </motion.div>
                )}
                
                {phase === 'add-block' && (
                  <motion.div
                    key="add-block"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-center h-full text-slate-soft"
                  >
                    Adding new block…
                  </motion.div>
                )}

                {['run', 'playing', 'paused', 'announce', 'resume', 'done'].includes(phase) && (
                  <RunModeSim key="run"
                    phase={phase as Exclude<Phase, 'idle'|'form'|'building'|'add-block'>}
                    playButtonPressed={playButtonPressed}
                  />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right: Timeline blocks preview - only show when started */}
            <AnimatePresence>
              {started && (
                <motion.div 
                  className="p-6 border-t md:border-l border-white/10 bg-black/20"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                  <BlocksPreview phase={phase} stagedBlock={stagedBlock} prefersReduced={prefersReduced || false} demoKey={demoKey} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Hidden audio tags */}
        <audio ref={musicA} src="/audio/track-intro.mp3" preload="auto" />
        <audio ref={musicB} src="/audio/track-resume.mp3" preload="auto" />
        <audio ref={voice}  src="/audio/announcement-voice.mp3" preload="auto" />
      </div>
    </section>
  );
}

/* ---------- Helpers & Subcomponents ---------- */

function wait(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

async function play(a?: HTMLAudioElement | null, opts?: { fromStart?: boolean }) {
  if (!a) return;
  try {
    if (opts?.fromStart) a.currentTime = 0;
    await a.play();
  } catch (error) {
    // Log the error for debugging but don't break the demo
    console.log('Audio play failed:', error);
  }
}
function pause(a?: HTMLAudioElement | null) { a?.pause(); }

function FormSim({ prefersReduced, demoKey }: { prefersReduced: boolean; demoKey: number }) {
  // Exact form fields as specified
  const fields = [
    { label: 'Event Name', value: 'Ava and Theo\'s Wedding Reception' },
    { label: 'Date', value: 'June 21, 8:00 PM' },
    { label: 'Vibe', value: 'Warm • Upbeat • Modern' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-sm text-slate-soft mb-3">Event setup</div>
      <div className="space-y-3 max-w-md">
        {fields.map((f, i) => (
          <motion.label
            key={f.label}
            className="block text-sm font-poppins"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.8 }}
          >
            <span className="text-off-white/80">{f.label}</span>
            <div className="mt-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2">
              <Typing key={`${f.label}-${demoKey}`} text={f.value} delay={i * 1550} disabled={prefersReduced} />
            </div>
          </motion.label>
        ))}
      </div>

      <div className="mt-6">
        <button
          className="rounded-xl bg-[#d1a442] text-black px-4 py-2 text-sm font-medium"
          aria-label="Generate blocks"
        >
          Generate Blocks
        </button>
      </div>
    </motion.div>
  );
}

function Typing({ text, delay = 0, disabled = false }: { text: string; delay?: number; disabled?: boolean }) {
  const [out, setOut] = useState(disabled ? text : '');
  const [showCaret, setShowCaret] = useState(!disabled);
  const [isComplete, setIsComplete] = useState(disabled);
  
  useEffect(() => {
    if (disabled) return;
    
    // Reset state when text changes
    setOut('');
    setIsComplete(false);
    setShowCaret(true);
    
    let i = 0;
    const timeout = setTimeout(() => {
      const typeNextChar = () => {
        if (i < text.length) {
          setOut(text.substring(0, i + 1));
          i++;
          
          // Random timing between 34-46ms per character
          const nextDelay = 34 + Math.random() * 12;
          setTimeout(typeNextChar, nextDelay);
        } else {
          setIsComplete(true);
          setShowCaret(false);
        }
      };
      typeNextChar();
    }, delay);
    
    // Caret blinking effect
    const caretInterval = setInterval(() => {
      if (!isComplete) {
        setShowCaret(prev => !prev);
      }
    }, 530);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(caretInterval);
    };
  }, [text, delay, disabled]);
  
  return (
    <span className="font-poppins text-off-white">
      <span aria-live="polite" aria-atomic="false">
        {out}
      </span>
      {!disabled && !isComplete && (
        <span className={`inline-block w-0.5 h-4 bg-off-white ml-0.5 ${showCaret ? 'opacity-100' : 'opacity-0'}`} />
      )}
    </span>
  );
}

function BlocksPreview({ phase, stagedBlock, prefersReduced, demoKey }: { phase: Phase; stagedBlock: any; prefersReduced: boolean; demoKey: number }) {
  const blocks = [
    { kind: 'announce', label: 'Welcome Announcement' },
    { kind: 'songs', label: 'Set 1 — Warm Up' },
  ];
  const visible =
    phase === 'building' ? 1 :
    phase === 'run'      ? 2 :
    ['playing','paused','announce','resume','done'].includes(phase) ? blocks.length : 0;

  return (
    <div>
      <div className="text-center mb-6">
        <div className="text-lg font-medium text-off-white mb-2">Timeline Preview</div>
        <div className="text-sm text-slate-soft">Generated blocks will appear here</div>
      </div>
      <div className="space-y-3">
        {/* Render staged block first during add-block phase and keep it for later phases */}
        {(phase === 'add-block' || ['run', 'playing', 'paused', 'announce', 'resume', 'done'].includes(phase)) && stagedBlock && (
          <StagedBlockCard 
            key={`staged-${demoKey}`}
            block={stagedBlock} 
            prefersReduced={prefersReduced}
            demoKey={demoKey}
            isFullWidth={true}
          />
        )}
        
        {/* Regular blocks */}
        {blocks.slice(0, visible).map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="w-full rounded-xl p-4 border border-white/10"
            style={{
              background:
                b.kind === 'announce'
                  ? 'linear-gradient(180deg, rgba(209,164,66,0.14), rgba(209,164,66,0.03))'
                  : 'linear-gradient(180deg, rgba(226,232,240,0.08), rgba(226,232,240,0.02))'
            }}
          >
            <div className="text-xs uppercase tracking-wide text-off-white/60">
              {b.kind === 'announce' ? 'Announcement' : 'Songs'}
            </div>
            <div className="mt-1 font-semibold">{b.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StagedBlockCard({ block, prefersReduced, demoKey, isFullWidth = false }: { block: any; prefersReduced: boolean; demoKey: number; isFullWidth?: boolean }) {
  const [showGoldAccent, setShowGoldAccent] = useState(false);
  
  useEffect(() => {
    // Start gold accent sweep after block content is filled
    const timer = setTimeout(() => {
      setShowGoldAccent(true);
      // Remove accent after animation
      setTimeout(() => setShowGoldAccent(false), 600);
    }, 2800);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.32 }}
      className={`${isFullWidth ? 'w-full' : 'min-w-[220px]'} rounded-xl p-4 border border-white/10 relative overflow-hidden ${
        showGoldAccent ? 'shadow-lg shadow-[#d1a442]/20' : ''
      }`}
      style={{
        background: 'linear-gradient(180deg, rgba(209,164,66,0.14), rgba(209,164,66,0.03))'
      }}
    >
      {/* Gold accent sweep */}
      {showGoldAccent && !prefersReduced && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d1a442]/30 to-transparent"
          style={{ transform: 'skewX(-15deg)' }}
        />
      )}
      
      <div className="text-xs uppercase tracking-wide text-off-white/60">
        Block
      </div>
      <div className="mt-1 font-semibold">
        <BlockFieldTyping key={`title-${demoKey}`} text={block.title} delay={320} disabled={prefersReduced} />
      </div>
      <div className="text-xs text-slate-soft mt-1">
        <BlockFieldTyping key={`duration-${demoKey}`} text={block.duration} delay={650} disabled={prefersReduced} />
      </div>
      <div className="text-xs text-slate-soft mt-2 leading-relaxed">
        <BlockFieldTyping key={`notes-${demoKey}`} text={block.announcement_notes} delay={980} disabled={prefersReduced} isNotes={true} />
      </div>
    </motion.div>
  );
}

function BlockFieldTyping({ text, delay, disabled, isNotes = false }: { text: string; delay: number; disabled: boolean; isNotes?: boolean }) {
  const [out, setOut] = useState(disabled ? text : '');
  
  useEffect(() => {
    if (disabled) return;
    
    // Reset state when text changes
    setOut('');
    
    const timeout = setTimeout(() => {
      if (isNotes) {
        // Type notes character by character like main form
        let i = 0;
        const typeChar = () => {
          if (i < text.length) {
            setOut(text.substring(0, i + 1));
            i++;
            const nextDelay = 34 + Math.random() * 12;
            setTimeout(typeChar, nextDelay);
          }
        };
        typeChar();
      } else {
        // Instant fill for title and duration
        setOut(text);
      }
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay, disabled, isNotes]);
  
  return <span>{out}</span>;
}

function RunModeSim({ phase, playButtonPressed }: { phase: Exclude<Phase, 'idle'|'form'|'building'|'add-block'>; playButtonPressed?: boolean }) {
  const status =
    phase === 'playing'  ? 'Playing: Floor Warmup' :
    phase === 'paused'   ? 'Paused' :
    phase === 'announce' ? 'Announcement: “Welcome to Ava & Theo’s reception…”' :
    phase === 'resume'   ? 'Resuming music' : 'Demo finished';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-soft">Run Mode</div>
          <div className="text-lg font-semibold">{status}</div>
        </div>
        <div className="rounded-full px-3 py-1 text-xs bg-white/10 border border-white/10">
          live
        </div>
      </div>

      {/* Minimal “now playing” bar */}
      <div className="mt-5 h-10 rounded-lg bg-black/30 border border-white/10 overflow-hidden relative">
        <motion.div
          key={phase}
          initial={{ width: '0%' }}
          animate={{ width: ['playing','resume'].includes(phase) ? '90%' : '10%' }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="absolute left-0 top-0 h-full"
          style={{ background: 'linear-gradient(90deg, rgba(209,164,66,0.25), rgba(209,164,66,0.05))' }}
        />
      </div>

      {/* Fake controls with animated play button */}
      <div className="mt-4 flex gap-2">
        <motion.button 
          className="rounded-md bg-[#d1a442] text-black px-4 py-2 text-sm font-medium"
          animate={{ scale: playButtonPressed === true ? 0.96 : 1 }}
          transition={{ duration: 0.14 }}
        >
          ▶ Run
        </motion.button>
        <button className="rounded-md bg-white/10 px-3 py-2 text-sm border border-white/10">Pause</button>
        <button className="rounded-md bg-white/10 px-3 py-2 text-sm border border-white/10">Stop</button>
      </div>
    </motion.div>
  );
}
