import { Cpu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-gray-900/90 border-b border-gray-800 text-white flex justify-between items-center px-8 py-3 z-50 shadow-md">
      <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-wide">
        <Cpu className="text-emerald-400" /> Fraud Detection Dashboard
      </h1>

      <div className="flex gap-6 text-lg">
        <Link to="/" className="hover:text-emerald-400 transition">Predict</Link>
        <Link to="/compare" className="hover:text-emerald-400 transition">Compare</Link>
        <Link to="/dashboard" className="hover:text-emerald-400 transition">Dashboard</Link>
        <Link to="/about" className="hover:text-emerald-400 transition">About</Link>
      </div>
    </nav>
  );
}
