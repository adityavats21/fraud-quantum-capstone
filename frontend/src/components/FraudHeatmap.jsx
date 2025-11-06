import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function FraudHeatmap({ model, progress }) {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (progress === 100) {
      const newPoints = Array.from({ length: 80 }, () => ({
        x: Math.random() * 460,
        y: Math.random() * 260,
        score: Math.random(),
        id: Math.random().toString(36).substring(7),
      }));
      setPoints(newPoints);
    }
  }, [progress]);

  if (progress < 100) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 bg-black/70 rounded-2xl border border-white/10 p-8 shadow-lg"
    >
      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-6 text-center">
        Fraud Detection Arena — {model}
      </h3>

      <div className="relative w-[480px] h-[280px] bg-gradient-to-br from-gray-900 via-gray-950 to-black mx-auto rounded-xl border border-gray-700 overflow-hidden shadow-inner shadow-emerald-900/40">
        {/* Cluster glow for realism */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.08),transparent_60%)]" />

        {points.map((p) => {
          const color =
            p.score > 0.85
              ? "bg-red-500"
              : p.score > 0.65
              ? "bg-yellow-400"
              : "bg-emerald-400";

          const pulse =
            p.score > 0.85
              ? "animate-ping-slow"
              : p.score > 0.65
              ? "animate-pulse"
              : "";

          return (
            <motion.div
              key={p.id}
              className={`absolute w-3 h-3 rounded-full ${color} ${pulse}`}
              style={{
                left: p.x,
                top: p.y,
                boxShadow:
                  p.score > 0.8
                    ? "0 0 10px rgba(239,68,68,0.7)"
                    : p.score > 0.6
                    ? "0 0 8px rgba(250,204,21,0.5)"
                    : "0 0 6px rgba(16,185,129,0.4)",
              }}
              whileHover={{
                scale: 1.8,
                boxShadow: "0 0 18px rgba(59,130,246,0.8)",
              }}
            >
              <span
                className="absolute left-4 top-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 bg-gray-800 px-2 py-1 rounded-md border border-gray-700 transition-all"
              >
                Risk: {(p.score * 100).toFixed(1)}%
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-5 text-center text-sm text-gray-400">
        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            <span>Legitimate</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span>Borderline</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span>Fraudulent</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* Tailwind custom animation if you haven’t added it yet */
<style jsx>{`
  @keyframes ping-slow {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.6);
      opacity: 0.4;
    }
  }
  .animate-ping-slow {
    animation: ping-slow 2s infinite;
  }
`}</style>