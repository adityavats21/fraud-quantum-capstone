import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FraudArena({ model, progress }) {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (progress === 100) {
      // generate random data points
      const newPoints = Array.from({ length: 40 }, () => ({
        x: Math.random() * 450,
        y: Math.random() * 250,
        fraud: Math.random() < 0.15, // 15% are frauds
      }));
      setPoints(newPoints);
    }
  }, [progress]);

  if (progress < 100) return null;

  return (
    <motion.div
      className="mt-10 bg-black/60 rounded-xl border border-white/10 p-6 shadow-inner"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-4">
        Fraud Detection Arena — {model}
      </h3>

      <div className="relative w-[480px] h-[270px] bg-gray-900/60 mx-auto rounded-lg overflow-hidden border border-gray-700">
        {points.map((p, i) => (
          <motion.div
            key={i}
            className={`absolute w-3 h-3 rounded-full ${
              p.fraud ? "bg-red-500" : "bg-emerald-400"
            }`}
            style={{
              left: p.x,
              top: p.y,
            }}
            animate={{
              scale: p.fraud ? [1, 1.6, 1] : [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              repeat: Infinity,
              duration: p.fraud ? 1.2 : 2.5,
              delay: i * 0.01,
            }}
          />
        ))}
      </div>

      <p className="text-gray-400 text-sm mt-4">
        <span className="text-emerald-400 font-semibold">Green</span> = Legitimate  
        | <span className="text-red-400 font-semibold">Red</span> = Fraudulent  
        transactions detected by <span className="text-cyan-400">{model}</span>.
      </p>
    </motion.div>
  );
}
