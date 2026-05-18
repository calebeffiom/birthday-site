'use client';
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ConfettiParticle {
  id: number;
  startX: number;
  startY: number;
  color: string;
  size: number;
  angle: number;
  distance: number;
  delay: number;
  shape: 'circle' | 'square' | 'triangle' | 'star';
}

function ConfettiFireworks() {
  const [particles, setParticles] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    const colors = [
      '#FFC0CB', '#FF69B4', '#FF1493', '#FFD700', 
      '#FF8C00', '#FF4500', '#ADFF2F', '#00FF00', 
      '#00FFFF', '#1E90FF', '#9370DB', '#8A2BE2',
      '#F4A261', '#E76F51', '#2A9D8F', '#E9C46A'
    ];
    const shapes: ('circle' | 'square' | 'triangle' | 'star')[] = ['circle', 'square', 'triangle', 'star'];
    const bursts = [
      { startX: 50, startY: 45, baseDelay: 0.1 },  // Middle burst (first)
      { startX: 25, startY: 55, baseDelay: 0.75 }, // Left burst (second)
      { startX: 75, startY: 55, baseDelay: 1.4 }   // Right burst (third)
    ];
    
    const count = 180; // Dense and rich explosion of particles
    const list: ConfettiParticle[] = [];
    let idCounter = 0;
    
    bursts.forEach((burst) => {
      for (let i = 0; i < count / bursts.length; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 240; // Explosive distance range
        const size = 6 + Math.random() * 11;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const delay = burst.baseDelay + Math.random() * 0.2;
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        list.push({
          id: idCounter++,
          startX: burst.startX,
          startY: burst.startY,
          color,
          size,
          angle,
          distance,
          delay,
          shape
        });
      }
    });
    
    setParticles(list);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-45 overflow-hidden w-[100vw] h-[100vh]">
      {particles.map((p) => {
        const targetX = Math.cos(p.angle) * p.distance;
        const targetY = Math.sin(p.angle) * p.distance + 160; // Drift down over time (simulated gravity)
        
        const getClipPath = () => {
          if (p.shape === 'triangle') return 'polygon(50% 0%, 0% 100%, 100% 100%)';
          if (p.shape === 'star') return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
          return undefined;
        };

        return (
          <motion.div
            key={p.id}
            initial={{ 
              x: `${p.startX}vw`, 
              y: `${p.startY}vh`, 
              scale: 0, 
              opacity: 1,
              rotate: 0 
            }}
            animate={{
              x: `calc(${p.startX}vw + ${targetX}px)`,
              y: `calc(${p.startY}vh + ${targetY}px)`,
              scale: [0, 1.4, 1.1, 0.5, 0],
              opacity: [1, 1, 0.8, 0],
              rotate: Math.random() * 1080,
            }}
            transition={{
              duration: 2.2,
              ease: [0.1, 0.8, 0.3, 1], // Explosive cubic-bezier easing
              delay: p.delay,
            }}
            className="absolute"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'square' ? '2px' : undefined,
              clipPath: getClipPath(),
            }}
          />
        );
      })}
    </div>
  );
}

export default function Home() {
  // false = card1 (cover) on top; true = card2 (message) on top
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);

  // Trigger initial loading screen, then show confetti
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const flip = (toFlipped: boolean) => {
    if (animating || toFlipped === flipped) return;
    setAnimating(true);
    setFlipped(toFlipped);
    // Allow zIndex swap only after transition finishes
    setTimeout(() => setAnimating(false), 500);
  };

  const card1IsFront = !flipped;

  return (
    <section className='flex flex-col items-center justify-between bg-[#FCD5CE] h-[100vh] w-[100vw] gap-5 overflow-hidden px-[20px] md:px-[0px]'>

      {/* Confetti Fireworks Burst */}
      {showConfetti && <ConfettiFireworks />}

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 bg-[#f3d4ce] flex flex-col items-center w-[100vw] h-[100vh] justify-center">
          <div className="flex flex-col items-center gap-6 max-w-[90%] text-center">
            <div className="w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-2xl overflow-hidden shadow-2xl bg-white/40 backdrop-blur-sm p-4 flex items-center justify-center">
              <img 
                src="/images/loader.gif" 
                alt="Loading celebration..."
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-[#5E7E96] text-3xl md:text-4xl font-kranky animate-pulse">Making a wish... 🎂</h2>
              <p className="text-[#767287] text-lg font-patrick">Preparing your special surprise ❤️</p>
            </div>
          </div>
        </div>
      )}





      <div className='px-5 py-1 bg-[#767287] w-fit rounded-b-[5px] shadow-[0px_6px_0px_-1px_rgba(177,158,173,1)]'>
        <h2 className='font-patrick text-[16px]'>Card From Beverly ❤️ 😊</h2>
      </div>
      {/* Stacked card container */}
      <div className='relative flex items-center justify-center flex-1 w-full'>

        {/* Card 1 — Cover (teal) */}
        <div
          style={{
            // Keep it on top during its outgoing animation, drop z after
            zIndex: card1IsFront || animating ? 10 : 0,
            transform: card1IsFront
              ? 'translateX(0px) rotate(0deg) scale(1)'
              : 'translateX(-60px) rotate(-4deg) scale(0.92)',
            transition: 'transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1)',
          }}
          className='absolute lg:w-[750px] md:w-[60%] w-full lg:h-[750px] md:h-[70%] h-full flex flex-col justify-center lg:p-15 md:p-10 p-5 bg-[#BFEFE1] shadow-2xl'
        >
          <div className='w-full h-full flex flex-col gap-4 md:gap-6 lg:gap-10 items-center text-center justify-center overflow-y-hidden'>
            <div>
              <h2 className='text-[#5E7E96] lg:text-[60px] md:text-[40px] text-[35px] font-kranky'>To my favourite</h2>
              <h2 className='text-[#5E7E96] lg:text-[60px] md:text-[40px] text-[35px] font-kranky'>person in the</h2>
              <h2 className='text-[#5E7E96] lg:text-[60px] md:text-[40px] text-[35px] font-kranky'>whole world 💕</h2>
            </div>
            <div>
              <div className='w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] aspect-square flex flex-col items-center justify-center mx-auto'>
                <img src="/images/globe.png" className="w-full h-full object-contain" alt="Globe" />
              </div>
            </div>
          </div>
        </div>



        {/* Card 2 — Message (translucent white): front = center, back = peeks LEFT */}
        <div
          style={{
            zIndex: !card1IsFront ? 10 : 0,
            transform: card1IsFront
              ? 'translateX(60px) rotate(4deg) scale(0.92)'
              : 'translateX(0px) rotate(0deg) scale(1)',
            transition: 'transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1)',
          }}
          className='absolute lg:w-[750px]  md:w-[60%] w-full lg:h-[750px] md:h-[70%] h-full flex flex-col justify-center bg-[#ffff]/85 lg:p-15 md:p-10 p-5 shadow-2xl'
        >
          <div className='w-full h-full overflow-y-scroll flex flex-col gap-[50px] items-center'>
            <div>
              <div className='w-full max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] aspect-square flex flex-col items-center justify-center mx-auto overflow-hidden rounded-lg'>
                <img 
                  src="/images/celebration.gif" 
                  className="w-full h-full object-contain" 
                  alt="Cute birthday celebration animation" 
                />
              </div>
            </div>
            <div>
              <p className='text-[#767287] font-patrick text-xl mb-5'>My sweetest🥹 my everything ❤️</p>
              <p className='text-[#767287] font-patrick text-xl leading-8 mb-5'>Happy birthday baby. You&apos;re another year older…close to 40😅 damn, you&apos;re aging very fast oo😂. You know I keep thinking about how lucky I am that distance is the only thing between us, the phone calls, your not so funny jokes😭😂, your bad mouth and even how you make boring days feel special…it all makes me fall for you over and over again. I hate that i can&apos;t give you a hug and a kiss, celebrate you in person, take you out on a cute date…but I&apos;m celebrating from here, counting down the days until long distance is just a story we tell.</p>
              <p className='text-[#767287] font-patrick text-xl leading-8 mb-5'>I hope this year comes with ease, gives you everything you&apos;ve been working for and more. You really deserve it, you deserve to feel loved and spoiled today. I really can&apos;t wait to celebrate your next birthday with you, but for now blow out your candles and know I&apos;m making a wish for you.</p>
              <p className='text-[#767287] font-patrick text-xl leading-8 mb-5'>I love you so much my everything 😊</p>
              <p className='text-[#767287] font-patrick text-xl leading-8'>Happy birthday ❤️</p>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation */}
      <div className="flex flex-col items-center pb-6">
        <p className="text-[#767287] font-patrick text-xl mb-5">Page {flipped ? "2" : "1"} of 2</p>
        <div className='flex gap-8 justify-center'>
          <button
            onClick={() => flip(false)}
            disabled={!flipped || animating}
            className={`w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-lg active:scale-90 transition-all duration-200 cursor-pointer border border-[#f0deda] ${!flipped ? 'opacity-40 cursor-not-allowed scale-95' : 'text-[#767287] hover:bg-gray-50 hover:shadow-xl'}`}
            aria-label="Previous Page"
          >
            <ChevronLeft className='w-6 h-6 stroke-[2.5]' />
          </button>
          <button
            onClick={() => flip(true)}
            disabled={flipped || animating}
            className={`w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-lg active:scale-90 transition-all duration-200 cursor-pointer border border-[#f0deda] ${flipped ? 'opacity-40 cursor-not-allowed scale-95' : 'text-[#767287] hover:bg-gray-50 hover:shadow-xl'}`}
            aria-label="Next Page"
          >
            <ChevronRight className='w-6 h-6 stroke-[2.5]' />
          </button>
        </div>
      </div>
    </section>
  );
}
