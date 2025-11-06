import { useEffect, useRef } from "react";

export default function AnimatedCanvas({ model, progress }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let animationFrameId;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 0.9;

      if (model === "Logistic Regression") drawLogistic(ctx, w, h, frame);
      if (model === "Random Forest") drawForest(ctx, w, h, frame);
      if (model === "XGBoost") drawBoosting(ctx, w, h, frame);
      if (model === "Deep Learning (MLP)") drawNeural(ctx, w, h, frame);
      if (model === "Autoencoder") drawAutoencoder(ctx, w, h, frame);
      if (model === "Quantum SVM") drawQuantum(ctx, w, h, frame);

      frame += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, [model, progress]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={300}
      className="rounded-lg bg-black/80 border border-white/10 shadow-lg"
    />
  );
}

/* === Model-Specific Drawings === */

// Logistic Regression — animated decision boundary
function drawLogistic(ctx, w, h, frame) {
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const cls = x + Math.sin(frame / 20) * 50 > y ? "#22d3ee" : "#f87171";
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = cls;
    ctx.fill();
  }
  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, h / 2 + Math.sin(frame / 30) * 20);
  ctx.lineTo(w, h / 2 - Math.sin(frame / 30) * 20);
  ctx.stroke();
}

// Random Forest — growing tree visualization
function drawForest(ctx, w, h, frame) {
  ctx.strokeStyle = "#06b6d4";
  ctx.lineWidth = 2;
  const treeCount = 5;
  for (let t = 0; t < treeCount; t++) {
    const baseX = (t + 1) * (w / (treeCount + 1));
    ctx.beginPath();
    ctx.moveTo(baseX, h);
    for (let depth = 0; depth < 5; depth++) {
      const branchY = h - depth * 40 - (frame % 40);
      const branchX = baseX + (Math.sin(frame / 10 + depth) * 20);
      ctx.lineTo(branchX, branchY);
    }
    ctx.stroke();
  }
}

// XGBoost — animated loss curve
function drawBoosting(ctx, w, h, frame) {
  ctx.strokeStyle = "#facc15";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    const y =
      h / 2 +
      Math.sin((x + frame * 5) / 40) * 30 -
      (Math.log(x + 1) / 4) * 10;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
}

// Deep Learning — neuron network pulse
function drawNeural(ctx, w, h, frame) {
  const layers = [4, 6, 4];
  const gapX = w / (layers.length + 1);
  const pulse = Math.sin(frame / 10) * 0.5 + 0.5;

  layers.forEach((nodes, i) => {
    for (let j = 0; j < nodes; j++) {
      const x = (i + 1) * gapX;
      const y = (j + 1) * (h / (nodes + 1));
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(236,72,153,${pulse})`;
      ctx.fill();

      if (i < layers.length - 1) {
        for (let k = 0; k < layers[i + 1]; k++) {
          const nx = (i + 2) * gapX;
          const ny = (k + 1) * (h / (layers[i + 1] + 1));
          ctx.strokeStyle = `rgba(147,51,234,${pulse})`;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nx, ny);
          ctx.stroke();
        }
      }
    }
  });
}

// Autoencoder — encoder/decoder compression wave
function drawAutoencoder(ctx, w, h, frame) {
  ctx.strokeStyle = "#ec4899";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x < w; x++) {
    const wave =
      Math.sin((x + frame) / 20) * 40 +
      Math.sin((x + frame) / 40) * 20;
    const compress =
      Math.abs(x - w / 2) < 60 ? (x - w / 2) / 4 : 0;
    ctx.lineTo(x, h / 2 + wave / 2 + compress);
  }
  ctx.stroke();
}

// Quantum SVM — rotating qubit circuit
function drawQuantum(ctx, w, h, frame) {
  ctx.strokeStyle = "#818cf8";
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    const y = 50 + i * 50;
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(w - 50, y);
    ctx.stroke();

    const qx = (frame * 4 + i * 40) % (w - 100) + 50;
    ctx.beginPath();
    ctx.arc(qx, y, 8, 0, Math.PI * 2);
    ctx.fillStyle = "#60a5fa";
    ctx.fill();
  }
}
