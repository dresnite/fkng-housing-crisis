import Image from "next/image";
import TriviaGame from './components/TriviaGame';
import AnimatedCursor from './components/AnimatedCursor';
import LyricsPlayer from './components/LyricsPlayer';

export default function Home() {
  return (
    <main>
      <LyricsPlayer />
      <TriviaGame />
      <AnimatedCursor />
    </main>
  );
}
