import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { model: "XGBoost", auc: 0.999 },
  { model: "Deep Learning", auc: 0.996 },
  { model: "Autoencoder", auc: 0.993 },
  { model: "Quantum Hybrid", auc: 0.735 },
];

export default function Comparison() {
  return (
    <div className="p-10">
      <h2 className="text-3xl font-semibold mb-6 text-center">Model ROC-AUC Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="model" />
          <YAxis domain={[0,1]} />
          <Tooltip />
          <Bar dataKey="auc" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
