import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function ModelGraph({ model, progress }) {
  const generateData = () => {
    return Array.from({ length: 20 }, (_, i) => ({
      step: i,
      loss: Math.exp(-i / 5) + Math.random() * 0.1,
      accuracy: i / 20 + Math.random() * 0.1,
    }));
  };

  const data = generateData();

  return (
    <div className="bg-black/60 p-6 rounded-xl border border-white/10 mt-10">
      <h3 className="text-xl font-semibold text-cyan-400 mb-4 text-center">
        Training Metrics — {model}
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="step" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "none",
              borderRadius: "10px",
            }}
            labelStyle={{ color: "#22d3ee" }}
          />
          <Line
            type="monotone"
            dataKey="loss"
            stroke="#f87171"
            strokeWidth={2}
            name="Loss"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#10b981"
            strokeWidth={2}
            name="Accuracy"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
