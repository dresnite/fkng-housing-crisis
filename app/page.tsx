import Image from "next/image";
import TriviaGame from './components/TriviaGame';
import AnimatedCursor from './components/AnimatedCursor';

export default function Home() {
  return (
    <main>
      <TriviaGame />
      <AnimatedCursor />
    </main>
  );
}
