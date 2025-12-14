"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    // Extract owner/name from URL or string
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || repoUrl.split('/');
    let owner, name;
    
    if (match && match.length >= 3 && repoUrl.includes('github.com')) {
        owner = match[1];
        name = match[2];
    } else if (repoUrl.split('/').length === 2) {
        [owner, name] = repoUrl.split('/');
    }

    if (!owner || !name) {
        alert("Invalid repository format. Use owner/name or full URL.");
        setIsLoading(false);
        return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/repo/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ owner, name }),
      });

      if (!res.ok) throw new Error("Failed to connect");
      
      const data = await res.json();
      setStatus("success");
      setRepoUrl("");
      
      // Navigate to dashboard
      window.location.href = `/dashboard/${data.id}`;
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full pointing-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full pointing-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-6">
            <Github className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-3">
            DevOps AGI
          </h1>
          <p className="text-zinc-400 text-lg">
            Autonomous repository maintenance
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">
                Repository URL
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="github.com/owner/repo"
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-mono text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Connect Repository
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-400"
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">Repository connected successfully!</p>
            </motion.div>
          )}

          {status === 'error' && (
             <motion.div 
             initial={{ opacity: 0, height: 0 }}
             animate={{ opacity: 1, height: 'auto' }}
             className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400"
           >
             <p className="text-sm">Failed to connect. Check URL/Token.</p>
           </motion.div>
          )}
        </div>

        <div className="mt-8 text-center">
            <p className="text-xs text-zinc-600 uppercase tracking-widest font-semibold">
                Powered by Octokit & DeepSeek
            </p>
        </div>
      </motion.div>
    </main>
  );
}
