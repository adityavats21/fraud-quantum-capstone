import PredictForm from "../components/PredictForm";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Cpu className="text-emerald-400 w-10 h-10" />
          <h1 className="text-4xl font-extrabold text-emerald-400">
            Fraud Detection Dashboard
          </h1>
        </div>
        <p className="text-gray-400 text-lg">
          Predict fraudulent transactions using Classical, Deep Learning & Quantum models
        </p>
      </motion.div>

      {/* Predict Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-3xl bg-gray-900/70 p-10 rounded-2xl shadow-2xl border border-gray-800"
      >
        <PredictForm />
      </motion.div>
    </div>
  );
}
