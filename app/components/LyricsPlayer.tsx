'use client';

import { useState, useEffect, useRef } from 'react';

interface Verse {
  text: string;
  startTime: number;
}

const verses: Verse[] = [
  { text: "Click to start an AI song!", startTime: 0 },
  { text: "Andres on a bike in the red-bricked glow", startTime: 8 },
  { text: "Looking for a room with the canals below", startTime: 12 },
  { text: "Smiling bright he's clean neat and fun", startTime: 16 },
  { text: "Software engineer just twenty-three young", startTime: 20 },
  { text: "Speaks Spanish English and Dutch on the way", startTime: 24 },
  { text: "Codes by night and dreams by day", startTime: 28 },
  { text: "Friendly faces greet him in Amstel's lights", startTime: 32 },
  { text: "He's got a spark that just ignites", startTime: 37 },
  { text: "Andres in Amsterdam finding his groove", startTime: 42 },
  { text: "A room with a view oh nothing to lose", startTime: 46 },
  { text: "Bridges and bikes and dreams in his sight", startTime: 50 },
  { text: "Andres in Amsterdam feeling so right", startTime: 54 },
  { text: "Andres in Amsterdam finding his groove", startTime: 58 },
  { text: "A room with a view oh nothing to lose", startTime: 62 },
  { text: "Bridges and bikes and dreams in his sight", startTime: 66 },
  { text: "Andres in Amsterdam feeling so right", startTime: 70 },
  { text: "Navigates life like he's writing code", startTime: 74 },
  { text: "Each step's precise every little road", startTime: 78 },
  { text: "From tech talks to coffee shops he's feeling grand", startTime: 82 },
  { text: "Amsterdam adventure hand in hand", startTime: 86 },
  { text: "Amsterdam nights with the stars above", startTime: 90 },
  { text: "He fits right in this city of love", startTime: 94 },
  { text: "Andres laughs as he learns to say", startTime: 98 },
  { text: "\"Doei\" \"Lekker\" in the Dutch way", startTime: 102 },
  { text: "Andres in Amsterdam finding his groove", startTime: 106 },
  { text: "A room with a view oh nothing to lose", startTime: 110 },
  { text: "Bridges and bikes and dreams in his sight", startTime: 114 },
  { text: "Andres in Amsterdam feeling so right", startTime: 118 },
  { text: "Andres in Amsterdam finding his groove", startTime: 122 },
  { text: "A room with a view oh nothing to lose", startTime: 126 },
  { text: "Bridges and bikes and dreams in his sight", startTime: 130 },
  { text: "Andres in Amsterdam feeling so right", startTime: 134 },
  { text: "Please rent me a room :)", startTime: 138 },
];

export default function LyricsPlayer() {
  const [currentVerse, setCurrentVerse] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        const currentTime = audioRef.current?.currentTime || 0;
        const newVerseIndex = verses.findIndex((verse, index) => {
          const nextVerseStart = verses[index + 1]?.startTime || Infinity;
          return currentTime >= verse.startTime && currentTime < nextVerseStart;
        });
        
        if (newVerseIndex !== -1 && newVerseIndex !== currentVerse) {
          setCurrentVerse(newVerseIndex);
        }
      });
    }
  }, [currentVerse]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white">
      <audio ref={audioRef} src="/sounds/song.mp3" />
      
      <button
        onClick={togglePlay}
        className="text-white hover:text-blue-400 transition-colors"
      >
        {isPlaying ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      <div className="min-w-[300px] text-center">
        <p className="animate-fade-in">
          {verses[currentVerse].text}
        </p>
      </div>
    </div>
  );
} 