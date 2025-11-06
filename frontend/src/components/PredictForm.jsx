import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Cpu, Brain, Zap } from "lucide-react";
import ModelPlayground from "./ModelPlayground";

export default function PredictForm() {
  return <ModelPlayground />;
}