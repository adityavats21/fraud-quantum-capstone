import { motion } from "framer-motion";

export default function ModelCard({ model }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
    >
      <h3 className="text-2xl font-bold text-emerald-400 mb-2">{model.name}</h3>
      <p className="text-gray-300 mb-4">{model.type}</p>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <p>Accuracy:</p> <p className="text-emerald-300">{model.metrics.accuracy}</p>
        <p>Precision:</p> <p className="text-emerald-300">{model.metrics.precision}</p>
        <p>Recall:</p> <p className="text-emerald-300">{model.metrics.recall}</p>
        <p>F1-Score:</p> <p className="text-emerald-300">{model.metrics.f1}</p>
        <p>ROC-AUC:</p> <p className="text-emerald-300">{model.metrics.roc_auc}</p>
        <p>PR-AUC:</p> <p className="text-emerald-300">{model.metrics.pr_auc}</p>
      </div>
    </motion.div>
  );
}