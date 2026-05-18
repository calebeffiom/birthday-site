'use client';
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from 'react';

export default function Home() {
  // false = card1 (cover) on top; true = card2 (message) on top
  const [flipped, setFlipped] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [modal, setModal] = useState(false);

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

      {/* modal */}
     {
      modal && (
        <div className="absolute inset-0 z-50 bg-[black]/20 backdrop-blur-[10px] flex flex-col items-center justify-center">
        <div className="relative flex flex-col justify-between items-center bg-[#7e7ba2] w-[50%] h-[50%] rounded-lg p-15">
          
          <div className='absolute w-[50px] h-[50px] bg-red-400 top-[-1px] right-[-1px] rounded-lg cursor-pointer flex items-center justify-center' onClick={()=>setModal(false)}><X size={30} color="white" /></div>


          <div>
            <h2 className='text-[white] text-3xl font-patrick'>Blow Out The Candles..! 👀</h2>
          </div>
          <div className='w-[300px] h-[300px] bg-[#BFEFE1] flex flex-col items-center justify-center'>
            <p className='text-black'>Picture here</p>
          </div>
          <div className='flex justify-center w-full'>
            <button className="text-[white] font-patrick text-[20px] px-5 py-2 bg-[#75c2f4] w-fit rounded-[15px] shadow-[0px_4px_0px_-1px_rgba(177,158,173,0.8)] cursor-pointer">
              Allow Access to Mic
            </button>
          </div>
        </div>
      </div>
      )
     }



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
          className='absolute lg:w-[40%] md:w-[60%] w-full lg:h-[80%] md:h-[70%] h-full flex flex-col justify-center lg:p-15 md:p-10 p-5 bg-[#BFEFE1] shadow-2xl'
        >
          <div className='w-full h-full flex flex-col gap-[50px] items-center text-center overflow-y-hidden'>
            <div>
              <h2 className='text-[#5E7E96] lg:text-[60px] md:text-[40px] text-[35px] font-kranky'>To my favourite</h2>
              <h2 className='text-[#5E7E96] lg:text-[60px] md:text-[40px] text-[35px] font-kranky'>person in the</h2>
              <h2 className='text-[#5E7E96] lg:text-[60px] md:text-[40px] text-[35px] font-kranky'>whole world 💕</h2>
            </div>
            <div>
              <div className='lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] w-[300px] h-[300px] bg-[white] flex flex-col items-center justify-center'>
                <p className='text-black'>Picture here</p>
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
          className='absolute lg:w-[40%] md:w-[60%] w-full lg:h-[80%] md:h-[70%] h-full flex flex-col justify-center bg-[#ffff]/85 lg:p-15 md:p-10 p-5 shadow-2xl'
        >
          <div className='w-full h-full overflow-y-scroll flex flex-col gap-[50px] items-center'>
            <div>
              <div className='lg:w-[300px] lg:h-[300px] md:w-[250px] md:h-[250px] w-[200px] h-[200px] bg-[#BFEFE1] flex flex-col items-center justify-center'>
                <p className='text-black'>Picture here</p>
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
