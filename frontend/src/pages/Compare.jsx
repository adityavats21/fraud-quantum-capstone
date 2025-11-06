import { motion } from "framer-motion";
import { Cpu, Brain, Atom, ArrowRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ComparePage() {
  const models = [
    {
      icon: <Cpu className="w-10 h-10 text-emerald-400" />,
      name: "Classical ML (XGBoost)",
      desc: "Trained on tabular financial data for real-time detection with low latency and high interpretability.",
      metrics: { Accuracy: "98.5%", F1: "91.0%", Latency: "30ms", AUC: "0.98" },
      gradient: "from-emerald-500/80 to-green-600/60",
    },
    {
      icon: <Brain className="w-10 h-10 text-cyan-400" />,
      name: "Deep Learning (MLP)",
      desc: "Learns deeper relationships and sequential fraud patterns through dense multi-layer neural networks.",
      metrics: { Accuracy: "99.2%", F1: "94.0%", Latency: "80ms", AUC: "0.99" },
      gradient: "from-cyan-400/80 to-blue-600/60",
    },
    {
      icon: <Atom className="w-10 h-10 text-fuchsia-400" />,
      name: "Quantum Hybrid",
      desc: "Combines quantum circuits with deep learning embeddings for faster convergence on imbalanced fraud data.",
      metrics: { Accuracy: "97.6%", F1: "88.0%", Latency: "120ms", AUC: "0.94" },
      gradient: "from-fuchsia-400/80 to-purple-600/60",
    },
  ];

  const simulationData = [
    { step: 1, ml: 0.12, dl: 0.10, quantum: 0.08 },
    { step: 2, ml: 0.20, dl: 0.25, quantum: 0.18 },
    { step: 3, ml: 0.55, dl: 0.70, quantum: 0.60 },
    { step: 4, ml: 0.65, dl: 0.80, quantum: 0.78 },
    { step: 5, ml: 0.40, dl: 0.55, quantum: 0.70 },
    { step: 6, ml: 0.30, dl: 0.45, quantum: 0.55 },
    { step: 7, ml: 0.10, dl: 0.20, quantum: 0.25 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* --- Title --- */}
      <section className="text-center py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Model Intelligence Benchmark
        </motion.h1>
        <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
          A deep-dive into how each model in the hybrid ML–DL–Quantum system
          contributes to robust, high-speed fraud detection.
        </p>
      </section>

      {/* --- Model Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 mb-20">
        {models.map((m, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`p-8 rounded-2xl shadow-2xl bg-gradient-to-b ${m.gradient} border border-white/10 backdrop-blur-md`}
          >
            <div className="flex justify-center mb-4">{m.icon}</div>
            <h2 className="text-2xl font-semibold text-center mb-2">{m.name}</h2>
            <p className="text-gray-100 text-sm text-center mb-6">{m.desc}</p>

            <div className="space-y-2">
              {Object.entries(m.metrics).map(([metric, value]) => (
                <div
                  key={metric}
                  className="flex justify-between text-sm text-gray-200"
                >
                  <span>{metric}</span>
                  <span className="font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Comparison Table --- */}
      <section className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-8 mb-20">
        <h3 className="text-2xl font-semibold text-emerald-400 mb-4 text-center">
          Comparative Metrics Snapshot
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-gray-300 text-sm">
            <thead className="text-gray-400 uppercase text-xs">
              <tr>
                <th className="py-3">Model</th>
                <th>AUC</th>
                <th>Accuracy</th>
                <th>Precision</th>
                <th>Recall</th>
                <th>Latency</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-white/5">
                <td>Classical (XGBoost)</td>
                <td>0.982</td>
                <td>98.5%</td>
                <td>92%</td>
                <td>90%</td>
                <td>30ms</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td>Deep Learning (MLP)</td>
                <td>0.992</td>
                <td>99.2%</td>
                <td>95%</td>
                <td>93%</td>
                <td>80ms</td>
              </tr>
              <tr className="hover:bg-white/5">
                <td>Quantum Hybrid</td>
                <td>0.945</td>
                <td>97.6%</td>
                <td>88%</td>
                <td>86%</td>
                <td>120ms</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* --- Simulation Section --- */}
      <section className="max-w-5xl mx-auto text-center mb-20">
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-4">
          Model Simulation Lab
        </h3>
        <p className="text-gray-400 mb-6">
          Simulated fraud probability trends across transaction steps — observe
          how each model adapts to changing patterns.
        </p>

        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-6">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={simulationData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.1)"
              />
              <XAxis dataKey="step" stroke="#aaa" />
              <YAxis domain={[0, 1]} stroke="#aaa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "10px",
                }}
                labelStyle={{ color: "#22d3ee" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="ml"
                stroke="#10b981"
                strokeWidth={3}
                dot={false}
                name="Classical ML"
              />
              <Line
                type="monotone"
                dataKey="dl"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={false}
                name="Deep Learning"
              />
              <Line
                type="monotone"
                dataKey="quantum"
                stroke="#d946ef"
                strokeWidth={3}
                dot={false}
                name="Quantum Hybrid"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* --- Hybrid Workflow Pipeline --- */}
      <section className="py-16 bg-gradient-to-t from-gray-950 via-gray-900 to-black">
        <h3 className="text-3xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-10">
          Hybrid Workflow Pipeline
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 text-gray-300 max-w-6xl mx-auto px-4">
          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <Cpu className="w-12 h-12 mx-auto text-emerald-400" />
            <p className="font-semibold mt-2">Classical Filtering</p>
            <p className="text-sm text-gray-400">
              Quick heuristic check for anomalies.
            </p>
          </motion.div>

          <ArrowRight className="w-10 h-10 text-gray-500 hidden md:block" />

          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <Brain className="w-12 h-12 mx-auto text-cyan-400" />
            <p className="font-semibold mt-2">Deep Pattern Learning</p>
            <p className="text-sm text-gray-400">
              Detects subtle non-linear fraud patterns.
            </p>
          </motion.div>

          <ArrowRight className="w-10 h-10 text-gray-500 hidden md:block" />

          <motion.div whileHover={{ scale: 1.05 }} className="text-center">
            <Atom className="w-12 h-12 mx-auto text-fuchsia-400" />
            <p className="font-semibold mt-2">Quantum Optimization</p>
            <p className="text-sm text-gray-400">
              Final stage: Quantum model minimizes false negatives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Autoencoder Section --- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-black/70 to-gray-950 opacity-70 -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center px-6"
        >
          {/* 🔹 Unsupervised Header */}
          <div className="mb-12">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-3">
              Unsupervised Learning Layer
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The Autoencoder learns normal transaction behavior without labels,
              reconstructing inputs to detect outliers based on reconstruction
              error — ideal for discovering unseen fraud patterns.
            </p>
          </div>

          {/* 🔸 Autoencoder Info Card */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl p-10 mb-20 max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="rounded-full p-4 bg-gradient-to-r from-pink-500 to-violet-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v8m0 0l3-3m-3 3l-3-3m9-5.25V6a2.25 2.25 0 00-2.25-2.25H8.25A2.25 2.25 0 006 6v1.75M3 10.5h18"
                  />
                </svg>
              </motion.div>

              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-500">
                Autoencoder Anomaly Detection
              </h3>
            </div>

            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Learns compressed representations of normal transactions and flags
              deviations as potential frauds. It operates entirely unsupervised,
              adapting to new transaction patterns without retraining.
            </p>

            <div className="flex justify-center gap-8 mt-6">
              <div>
                <p className="text-3xl font-bold text-violet-400">0.983</p>
                <p className="text-sm text-gray-400">AUC Score</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-pink-400">0.901</p>
                <p className="text-sm text-gray-400">F1-Score</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-emerald-400">✔</p>
                <p className="text-sm text-gray-400">Unsupervised Detection</p>
              </div>
            </div>
          </motion.div>

          {/* 🧠 Comparison Graph */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 mb-4">
              Autoencoder vs Supervised Model Comparison
            </h3>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Comparing how an Autoencoder (unsupervised) identifies anomalies
              via reconstruction error versus how XGBoost (supervised)
              classifies based on learned labels.
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/10 p-6">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={[
                    { step: 1, ae: 0.05, xgb: 0.08 },
                    { step: 2, ae: 0.15, xgb: 0.10 },
                    { step: 3, ae: 0.35, xgb: 0.32 },
                    { step: 4, ae: 0.70, xgb: 0.65 },
                    { step: 5, ae: 0.90, xgb: 0.85 },
                    { step: 6, ae: 0.45, xgb: 0.55 },
                    { step: 7, ae: 0.20, xgb: 0.30 },
                  ]}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis dataKey="step" stroke="#aaa" />
                  <YAxis domain={[0, 1]} stroke="#aaa" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "10px",
                    }}
                    labelStyle={{ color: "#c084fc" }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ae"
                    stroke="#c084fc"
                    strokeWidth={3}
                    dot={false}
                    name="Autoencoder (Reconstruction Error)"
                  />
                  <Line
                    type="monotone"
                    dataKey="xgb"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={false}
                    name="XGBoost (Fraud Probability)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- Footer --- */}
      <footer className="text-center py-10 text-gray-500 text-sm border-t border-white/10">
        <p>
          Comparative insights driven by hybrid intelligence — ML × DL × Quantum
          × AE
        </p>
      </footer>
    </div>
  );
}