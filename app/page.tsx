import Image from "next/image";
import TriviaGame from './components/TriviaGame';
import AnimatedCursor from './components/AnimatedCursor';
import LyricsPlayer from './components/LyricsPlayer';
import FloatingBike from './components/FloatingBike';

export default function Home() {
  return (
    <main>
      <FloatingBike />
      <LyricsPlayer />
      <TriviaGame />
      <AnimatedCursor />
    </main>
  );
}
