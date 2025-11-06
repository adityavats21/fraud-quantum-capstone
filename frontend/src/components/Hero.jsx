import { motion } from "framer-motion";

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white py-16 text-center shadow-lg"
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        Fraud Detection using Quantum Computing
      </h1>
      <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-90">
        A Hybrid ML–DL–Quantum approach to detect fraudulent financial transactions in real-time.
      </p>
    </motion.section>
  );
}
