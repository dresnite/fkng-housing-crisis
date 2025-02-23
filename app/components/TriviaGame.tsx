'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VantaBackground from './VantaBackground';
import AnimatedTitle from './AnimatedTitle';
import LockScreen from './trivia/LockScreen';
import QuestionScreen from './trivia/QuestionScreen';
import ScoreScreen from './trivia/ScoreScreen';
import { questions, finalMessage } from './trivia/types';

export default function TriviaGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);
    const [isAnswerLocked, setIsAnswerLocked] = useState(false);
    const [isGameLocked, setIsGameLocked] = useState(true);

    const handleAnswerClick = (isCorrect: boolean, index: number) => {
        if (isAnswerLocked) return;

        if (isCorrect) {
            setScore(score + 1);
            setWrongAnswer(null);
            setIsAnswerLocked(false);
            
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                setShowScore(true);
            }
        } else {
            setWrongAnswer(index);
            setIsAnswerLocked(true);
            setTimeout(() => {
                setIsAnswerLocked(false);
            }, 1500);
        }
    };

    return (
        <>
            <div className="min-h-screen text-black flex flex-col gap-4 justify-center items-center pt-8 pb-16 px-4 sm:px-6 lg:px-8">
                <AnimatedTitle />
                <motion.div 
                    className="max-w-3xl w-full mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 100,
                        delay: 1.2
                    }}
                >
                    <div className="backdrop-blur-sm bg-pink-400 rounded-lg p-1">
                        <motion.div 
                            className="bg-white/80 rounded-lg shadow-xl p-8"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                type: "spring",
                                damping: 20,
                                stiffness: 100,
                                delay: 1.4
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {isGameLocked ? (
                                    <LockScreen onUnlock={() => setIsGameLocked(false)} />
                                ) : showScore ? (
                                    <ScoreScreen 
                                        score={score}
                                        totalQuestions={questions.length}
                                        finalMessage={finalMessage}
                                    />
                                ) : (
                                    <QuestionScreen
                                        question={questions[currentQuestion]}
                                        currentQuestionNumber={currentQuestion + 1}
                                        totalQuestions={questions.length}
                                        wrongAnswer={wrongAnswer}
                                        isAnswerLocked={isAnswerLocked}
                                        onAnswerClick={handleAnswerClick}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            <VantaBackground />
        </>
    );
} 