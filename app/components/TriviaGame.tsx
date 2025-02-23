'use client';

import { useState } from 'react';
import VantaBackground from './VantaBackground';
import AnimatedTitle from './AnimatedTitle';
import { motion, AnimatePresence } from 'framer-motion';

interface Question {
    id: number;
    text: string;
    options: {
        text: string;
        isCorrect: boolean;
        errorMessage?: string;
    }[];
}

const questions: Question[] = [
    {
        id: 1,
        text: "Who am I?",
        options: [
            { text: "Andrés, a software developer", isCorrect: true },
            { 
                text: "Kevin, a marketing specialist", 
                isCorrect: false, 
                errorMessage: "No fucking way lol" 
            },
            { 
                text: "Jose, a product manager", 
                isCorrect: false,
                errorMessage: "Not even close! 😤" 
            },
        ],
    },
    {
        id: 2,
        text: "What do I want?",
        options: [
            { 
                text: "A girlfriend", 
                isCorrect: false,
                errorMessage: "Maybe later... 😏 but not now!" 
            },
            { 
                text: "To make new friends", 
                isCorrect: false,
                errorMessage: "A developer? making friends? lol" 
            },
            { text: "A room in amsterdam", isCorrect: true },
        ],
    },
    {
        id: 3,
        text: "What do I have to offer?",
        options: [
            { text: "I'm clean and nice :)", isCorrect: true },
            { 
                text: "Chaos", 
                isCorrect: false,
                errorMessage: "You might have a point there 🤨" 
            },
            { 
                text: "Dirty dishes", 
                isCorrect: false,
                errorMessage: "Hell no! I always clean my dishes! 🧼" 
            },
        ],
    },
];

const finalMessage = `
    Hi! I'm Andrés. 👋
    I'm a 23 yo software engineer living in Amsterdam. 👯‍♀️

    I'm looking for a room with registry to rent as soon as possible.

    Here's what I can offer:

    - I'm clean and organized
    - I'm a good cook
    - We can bitch about the housing crisis together
`;

export default function TriviaGame() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);
    const [isAnswerLocked, setIsAnswerLocked] = useState(false);

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
            }, 1500); // Allow retry after 1.5 seconds
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setWrongAnswer(null);
        setIsAnswerLocked(false);
    };

    const getButtonClasses = (index: number, isCorrect: boolean) => {
        let baseClasses = "w-full text-left p-4 rounded-lg border border-black transition-colors border-2 ";
        
        if (wrongAnswer === index) {
            return baseClasses + "bg-red-100 border-red-500 text-red-700";
        }
        
        /*if (isAnswerLocked && isCorrect) {
            return baseClasses + "bg-green-100 border-green-500 text-green-700";
        }*/
        
        return baseClasses + "border-gray-200 hover:bg-blue-50";
    };

    return (
        <>
            <div className="min-h-screen text-black flex flex-col gap-6 justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
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
                                {showScore ? (
                                    <motion.div 
                                        key="score"
                                        className="text-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{
                                            type: "spring",
                                            damping: 20,
                                            stiffness: 100
                                        }}
                                    >
                                        <h2 className="text-2xl font-bold mb-4">
                                            You scored {score} out of {questions.length}
                                        </h2>
                                        {score === questions.length ? (
                                            <motion.div 
                                                className="mt-6"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                <h3 className="text-xl font-semibold mb-4 text-green-600">
                                                    Congratulations! Here's my message:
                                                </h3>
                                                <p className="text-gray-700 whitespace-pre-line">
                                                    {finalMessage}
                                                </p>
                                                <motion.p 
                                                    className="mt-4 text-gray-600"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: 0.6 }}
                                                >
                                                    If you want to know more,{' '}
                                                    <motion.a
                                                        href="https://dresnite.com"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-pink-500 hover:text-pink-600 underline"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        go to my website
                                                    </motion.a>
                                                </motion.p>
                                            </motion.div>
                                        ) : (
                                            <p className="text-red-600 mb-4">
                                                Try again to unlock the special message!
                                            </p>
                                        )}
                                        <div className="flex gap-4 justify-center">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => window.open('https://www.instagram.com/andreskomet/', '_blank')}
                                                className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
                                            >
                                                Instagram
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => window.open('https://wa.me/34691576986', '_blank')}
                                                className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
                                            >
                                                Whatsapp
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="question"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{
                                            type: "spring",
                                            damping: 20,
                                            stiffness: 100
                                        }}
                                    >
                                        <div className="mb-8">
                                            <h2 className="text-xl font-bold mb-2">
                                                Question {currentQuestion + 1} of {questions.length}
                                            </h2>
                                            <p className="text-lg text-gray-700">
                                                {questions[currentQuestion].text}
                                            </p>
                                        </div>
                                        <div className="space-y-4">
                                            {questions[currentQuestion].options.map((option, index) => (
                                                <motion.button
                                                    key={index}
                                                    onClick={() => handleAnswerClick(option.isCorrect, index)}
                                                    className={getButtonClasses(index, option.isCorrect)}
                                                    disabled={isAnswerLocked && wrongAnswer !== index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{
                                                        type: "spring",
                                                        damping: 20,
                                                        stiffness: 100,
                                                        delay: index * 0.1
                                                    }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {option.text}
                                                    {wrongAnswer === index && (
                                                        <motion.span 
                                                            className="ml-2 text-red-600"
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                        >
                                                            {option.errorMessage || "✗ Wrong... 😡"}
                                                        </motion.span>
                                                    )}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
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