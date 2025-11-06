import { motion } from "framer-motion";
import { Brain, Atom, Cpu, Network, CircuitBoard, Radio } from "lucide-react";
import { useState, useEffect } from "react";
import AnimatedCanvas from "./AnimatedCanvas";
import ModelAnalytics from "./ModelAnalytics";
import FraudHeatmap from "./FraudHeatmap";

const models = [
  {
    name: "Logistic Regression",
    icon: <Cpu className="w-8 h-8 text-emerald-400" />,
    desc: "Interpretable model estimating fraud probability via logistic function mapping.",
    color: "from-emerald-400/80 to-green-600/60",
  },
  {
    name: "Random Forest",
    icon: <Network className="w-8 h-8 text-cyan-400" />,
    desc: "Ensemble of decision trees combining multiple weak learners for robust detection.",
    color: "from-cyan-400/80 to-blue-600/60",
  },
  {
    name: "XGBoost",
    icon: <CircuitBoard className="w-8 h-8 text-yellow-400" />,
    desc: "Boosted gradient trees refining predictions iteratively for superior performance.",
    color: "from-yellow-400/80 to-orange-500/60",
  },
  {
    name: "Deep Learning (MLP)",
    icon: <Brain className="w-8 h-8 text-fuchsia-400" />,
    desc: "Multi-layer network learning complex transaction embeddings in latent space.",
    color: "from-fuchsia-400/80 to-purple-600/60",
  },
  {
    name: "Autoencoder",
    icon: <Radio className="w-8 h-8 text-pink-400" />,
    desc: "Unsupervised reconstruction model detecting anomalies via reconstruction loss.",
    color: "from-pink-400/80 to-violet-500/60",
  },
  {
    name: "Quantum SVM",
    icon: <Atom className="w-8 h-8 text-indigo-400" />,
    desc: "Quantum-classical hybrid SVM leveraging kernel mapping in high-dimensional spaces.",
    color: "from-indigo-400/80 to-sky-500/60",
  },
];

export default function ModelPlayground() {
  const [activeModel, setActiveModel] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logLines, setLogLines] = useState([]);

  const startSimulation = (model) => {
    setActiveModel(model);
    setProgress(0);
    setIsRunning(true);
    setLogLines([]);
  };

  // Simulate progress + logs
  useEffect(() => {
    if (isRunning && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((p) => p + 2);
        setLogLines((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] Training step ${progress / 2} — model optimizing weights...`,
        ]);
      }, 100);
      return () => clearTimeout(timer);
    } else if (progress >= 100) {
      setIsRunning(false);
      setLogLines((prev) => [
        ...prev,
        "[✓] Training complete — Model stabilized.",
        "[✓] Fraud clusters identified — inference layer active.",
        "[✓] System ready for real-time scoring.",
      ]);
    }
  }, [isRunning, progress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* --- HERO SECTION --- */}
      <section className="text-center py-20 border-b border-white/10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent"
        >
          Model Simulation Dashboard
        </motion.h1>
        <p className="mt-6 text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Experience real-time model training and inference visualization across
          classical, deep, and quantum fraud detection systems.
        </p>
      </section>

      {/* --- MODEL CARDS --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6 py-16">
        {models.map((m, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`p-8 rounded-2xl shadow-2xl bg-gradient-to-b ${m.color} border border-white/10 backdrop-blur-md`}
          >
            <div className="flex flex-col items-center gap-4 mb-4">
              {m.icon}
              <h3 className="text-2xl font-semibold">{m.name}</h3>
              <p className="text-gray-100 text-sm text-center">{m.desc}</p>
            </div>

            <button
              onClick={() => startSimulation(m)}
              disabled={isRunning && activeModel?.name === m.name}
              className={`w-full py-2 mt-4 rounded-lg font-semibold transition-all ${
                activeModel?.name === m.name && isRunning
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-black/50 hover:bg-black/70 text-white border border-white/10"
              }`}
            >
              {activeModel?.name === m.name && isRunning
                ? "Running..."
                : "Run Simulation"}
            </button>
          </motion.div>
        ))}
      </section>

      {/* --- ACTIVE SIMULATION PANEL --- */}
      {activeModel && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto mt-10 mb-20 bg-gradient-to-b from-gray-950/90 via-gray-900/70 to-black/80 border border-white/10 rounded-2xl shadow-xl p-10"
        >
          <h3 className="text-3xl font-semibold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
            {activeModel.name} — Live Training Simulation
          </h3>

          {/* Visualization 1 */}
          <AnimatedCanvas model={activeModel.name} progress={progress} />

          {/* Visualization 2 */}
          <ModelAnalytics model={activeModel.name} progress={progress} />

          {/* Visualization 3 */}
          <FraudHeatmap model={activeModel.name} progress={progress} />

          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden mt-10 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2 }}
              className="h-3 bg-gradient-to-r from-emerald-400 to-cyan-400"
            />
          </div>

          {/* --- Log Stream --- */}
          <div className="bg-black/70 text-left text-sm font-mono text-gray-300 mt-6 p-5 rounded-lg border border-white/10 overflow-y-auto h-52">
            {logLines.map((line, i) => (
              <p key={i} className="text-gray-400">
                {line}
              </p>
            ))}
          </div>
        </motion.section>
      )}

      {/* --- FOOTER --- */}
      <footer className="text-center py-10 text-gray-500 text-sm border-t border-white/10">
        Built for the future of FinTech Security — Machine Learning × Quantum Intelligence
      </footer>
    </div>
  );
}
