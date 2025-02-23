'use client';

import { useState } from 'react';
import VantaBackground from './VantaBackground';

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
                <h1 className="text-2xl md:text-3xl font-bold text-center max-w-2xl text-white drop-shadow-lg">
                    Choose the correct answers to unlock my secret
                </h1>
                <div className="max-w-3xl w-full mx-auto backdrop-blur-sm bg-pink-400">
                    <div className="bg-white/80 rounded-lg shadow-xl p-8">
                        {showScore ? (
                            <div className="text-center">
                                <h2 className="text-2xl font-bold mb-4">
                                    You scored {score} out of {questions.length}
                                </h2>
                                {score === questions.length ? (
                                    <div className="mt-6">
                                        <h3 className="text-xl font-semibold mb-4 text-green-600">
                                            Congratulations! Here's my message:
                                        </h3>
                                        <p className="text-gray-700 whitespace-pre-line">
                                            {finalMessage}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-red-600 mb-4">
                                        Try again to unlock the special message!
                                    </p>
                                )}

                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => window.open('https://www.instagram.com/andreskomet/', '_blank')}
                                        className="mt-6 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
                                    >
                                        Instagram
                                    </button>
                                    
                                    <button
                                        onClick={() => window.open('https://wa.me/34691576986', '_blank')}
                                        className="mt-6 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
                                    >
                                        Whatsapp
                                    </button>

                                    {false && <button
                                        onClick={resetQuiz}
                                        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                                    >
                                        Play again
                                    </button>}
                                </div>
                            </div>
                        ) : (
                            <div>
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
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerClick(option.isCorrect, index)}
                                            className={getButtonClasses(index, option.isCorrect)}
                                            disabled={isAnswerLocked && wrongAnswer !== index}
                                        >
                                            {option.text}
                                            {wrongAnswer === index && (
                                                <span className="ml-2 text-red-600">
                                                    {option.errorMessage || "✗ Wrong... 😡"}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <VantaBackground />
        </>
    );
} 