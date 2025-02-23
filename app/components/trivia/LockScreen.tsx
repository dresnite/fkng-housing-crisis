'use client';

import { motion } from 'framer-motion';

interface LockScreenProps {
    onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
    return (
        <motion.div
            key="lock"
            className="text-center py-8 cursor-pointer"
            onClick={onUnlock}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                className="text-6xl mb-4"
                animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            >
                🔒
            </motion.div>
            <motion.p
                className="text-xl font-semibold text-gray-700"
                animate={{
                    opacity: [1, 0.7, 1]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            >
                Click to start
            </motion.p>
        </motion.div>
    );
} 