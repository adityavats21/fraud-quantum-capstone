import { motion } from "framer-motion";
import { Cpu, Brain, Atom, Server, Monitor, Code2 } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-20 px-6 flex flex-col items-center justify-center">
      {/* --- Title Section --- */}
      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 mb-8 text-center"
      >
        About the Project
      </motion.h1>

      {/* --- Main Description --- */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="max-w-4xl text-center text-gray-300 text-lg leading-relaxed mb-14"
      >
        The Capstone Project{" "}
        <span className="text-emerald-400 font-semibold">
          “Fraud Detection using Quantum Computing”
        </span>{" "}
        combines the strengths of{" "}
        <span className="text-cyan-400 font-semibold">Machine Learning</span>,{" "}
        <span className="text-fuchsia-400 font-semibold">Deep Learning</span>, and{" "}
        <span className="text-indigo-400 font-semibold">Quantum Computing</span>{" "}
        to predict and visualize fraudulent financial transactions in real time.
        <br />
        <br />
        It provides a unified system that performs classical model benchmarking,
        neural-based anomaly learning, and quantum-optimized fraud classification — 
        all wrapped in a modern, interactive analytics dashboard.
      </motion.p>

      {/* --- Architecture Section --- */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Backend Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl bg-gradient-to-b from-gray-900/70 to-black/70 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-emerald-500/20 transition-all"
        >
          <div className="flex justify-center mb-4">
            <Server className="w-10 h-10 text-emerald-400" />
          </div>
          <h3 className="text-2xl font-semibold text-emerald-400 mb-3 text-center">
            Backend Architecture
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed text-center">
            The backend is built using{" "}
            <span className="font-semibold text-white">FastAPI</span> for
            asynchronous inference with integrated{" "}
            <span className="text-cyan-400">Scikit-Learn</span>,{" "}
            <span className="text-pink-400">PyTorch</span>, and{" "}
            <span className="text-indigo-400">Qiskit</span> models.
            It hosts hybrid classical–quantum pipelines, model comparison APIs,
            and secure endpoints for fraud detection simulations.
          </p>
        </motion.div>

        {/* Frontend Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="p-8 rounded-2xl bg-gradient-to-b from-gray-900/70 to-black/70 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-cyan-500/20 transition-all"
        >
          <div className="flex justify-center mb-4">
            <Monitor className="w-10 h-10 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-semibold text-cyan-400 mb-3 text-center">
            Frontend Interface
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed text-center">
            The frontend is built with{" "}
            <span className="font-semibold text-white">React.js</span> and{" "}
            <span className="text-emerald-400">Vite</span> for optimized rendering,
            styled with{" "}
            <span className="text-sky-400">TailwindCSS v4</span> and{" "}
            <span className="text-fuchsia-400">Framer Motion</span> for animations.
            It delivers an immersive, data-driven experience with real-time model
            visualization and dynamic fraud detection dashboards.
          </p>
        </motion.div>
      </div>

      {/* --- Tech Stack Section --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-gray-900/60 to-black/60 border border-white/10 rounded-2xl p-10 backdrop-blur-md shadow-inner max-w-5xl w-full"
      >
        <h3 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-6">
          Core Technologies & Libraries
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center text-gray-300">
          {[
            { icon: <Cpu className="mx-auto w-6 h-6 text-emerald-400" />, name: "Scikit-Learn" },
            { icon: <Brain className="mx-auto w-6 h-6 text-pink-400" />, name: "PyTorch" },
            { icon: <Atom className="mx-auto w-6 h-6 text-indigo-400" />, name: "Qiskit" },
            { icon: <Server className="mx-auto w-6 h-6 text-cyan-400" />, name: "FastAPI" },
            { icon: <Monitor className="mx-auto w-6 h-6 text-sky-400" />, name: "React.js" },
            { icon: <Code2 className="mx-auto w-6 h-6 text-emerald-400" />, name: "TailwindCSS" },
          ].map((tech, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
            >
              {tech.icon}
              <p className="mt-2 text-sm font-medium">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* --- Developer Info --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="mt-12 text-sm text-gray-400 text-center"
      >
        Developed by{" "}
        <span className="font-semibold text-emerald-400">
          Aditya Vats |Akul Kumar |Jaysh Todi
        </span>{" "}
        — B.Tech CSE, VIT  
        <br />
        <span className="text-xs text-gray-500">
          Capstone Submission | Fraud Detection with ML × DL × Quantum Intelligence
        </span>
      </motion.div>

      {/* --- Footer Glow --- */}
      <footer className="mt-12 pt-6 text-center text-gray-500 text-sm border-t border-white/10 max-w-5xl w-full">
        <p>
          “Harnessing the synergy of Classical AI and Quantum Computing for the next generation of FinTech Security.”
        </p>
      </footer>
    </div>
  );
}