'use client';

import { motion } from 'framer-motion';

interface ScoreScreenProps {
    score: number;
    totalQuestions: number;
    finalMessage: string;
}

export default function ScoreScreen({ score, totalQuestions, finalMessage }: ScoreScreenProps) {
    return (
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
                You scored {score} out of {totalQuestions}
            </h2>
            {score === totalQuestions ? (
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
    );
} 