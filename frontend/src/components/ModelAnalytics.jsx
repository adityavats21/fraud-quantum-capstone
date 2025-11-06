import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { motion } from "framer-motion";

export default function ModelAnalytics({ model, progress }) {
  if (progress < 10) return null;

  // Fake realistic data (you can load actual from backend later)
  const lossCurve = Array.from({ length: 20 }, (_, i) => ({
    epoch: i + 1,
    loss: 1.5 * Math.exp(-i / 5) + Math.random() * 0.05,
  }));

  const featureImportances = [
    { name: "Amount", importance: 0.35 },
    { name: "OldBalanceOrg", importance: 0.25 },
    { name: "NewBalanceDest", importance: 0.18 },
    { name: "Type_Transfer", importance: 0.15 },
    { name: "IsFlaggedFraud", importance: 0.07 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
    >
      {/* Loss Curve */}
      <div className="bg-black/60 rounded-xl border border-white/10 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-emerald-400 mb-3">Loss Convergence — {model}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lossCurve}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="epoch" stroke="#aaa" label={{ value: "Epochs", position: "insideBottomRight", offset: -5 }} />
            <YAxis stroke="#aaa" />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "10px" }} />
            <Line type="monotone" dataKey="loss" stroke="#10b981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Feature Importance */}
      <div className="bg-black/60 rounded-xl border border-white/10 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-cyan-400 mb-3">Feature Importance — {model}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={featureImportances}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip contentStyle={{ backgroundColor: "#1e293b", border: "none", borderRadius: "10px" }} />
            <Bar dataKey="importance" fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
