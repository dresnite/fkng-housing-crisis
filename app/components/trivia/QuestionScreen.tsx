'use client';

import { motion } from 'framer-motion';

interface Option {
    text: string;
    isCorrect: boolean;
    errorMessage?: string;
}

interface Question {
    id: number;
    text: string;
    options: Option[];
}

interface QuestionScreenProps {
    question: Question;
    currentQuestionNumber: number;
    totalQuestions: number;
    wrongAnswer: number | null;
    isAnswerLocked: boolean;
    onAnswerClick: (isCorrect: boolean, index: number) => void;
}

export default function QuestionScreen({
    question,
    currentQuestionNumber,
    totalQuestions,
    wrongAnswer,
    isAnswerLocked,
    onAnswerClick
}: QuestionScreenProps) {
    const getButtonClasses = (index: number, isCorrect: boolean) => {
        let baseClasses = "w-full text-left p-4 rounded-lg border border-black transition-colors border-2 ";
        
        if (wrongAnswer === index) {
            return baseClasses + "bg-red-100 border-red-500 text-red-700";
        }
        
        return baseClasses + "border-gray-200 hover:bg-blue-50";
    };

    return (
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
                    Question {currentQuestionNumber} of {totalQuestions}
                </h2>
                <p className="text-lg text-gray-700">
                    {question.text}
                </p>
            </div>
            <div className="space-y-4">
                {question.options.map((option, index) => (
                    <motion.button
                        key={index}
                        onClick={() => onAnswerClick(option.isCorrect, index)}
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
    );
} 