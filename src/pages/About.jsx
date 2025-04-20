import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="p-10 max-w-4xl mx-auto">
      <motion.h2
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Open Brain AI
      </motion.h2>
      <motion.p
        className="text-lg text-gray-700 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Open Brain AI is a research-oriented platform built to help clinicians and researchers understand language and cognition.
        It offers tools for analyzing speech and text, supporting multiple languages, and assisting in the diagnosis and treatment of language disorders.
      </motion.p>
    </div>
  );
}
