"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, GitPullRequest, Activity, GitBranch, Terminal } from "lucide-react";

interface Repo {
  id: string;
  owner: string;
  name: string;
  defaultBranch: string;
  status: string;
}

export default function RepoDashboard() {
  const { repoId } = useParams();
  const [repo, setRepo] = useState<Repo | null>(null);

  useEffect(() => {
    // In a real app, fetch from backend using repoId
    // For MVP demo, mocking the data or simpler fetch
    console.log("Fetching details for", repoId);
    // Mock data for immediate "Wow" factor
    setRepo({
        id: repoId as string,
        owner: "karan0207",
        name: "repomonitoring-agi",
        defaultBranch: "main",
        status: "active"
    });
  }, [repoId]);

  if (!repo) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="flex items-center justify-between mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {repo.owner} / {repo.name}
          </h1>
          <div className="flex items-center gap-4 mt-2 text-zinc-400 text-sm">
            <span className="flex items-center gap-1"><GitBranch className="w-4 h-4" /> {repo.defaultBranch}</span>
            <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-green-400" /> Protected</span>
          </div>
        </div>
        <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-sm">
                Refresh Analysis
            </button>
            <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors text-sm font-medium">
                Trigger Run
            </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Health Score Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-green-900/10 to-transparent border border-green-500/20"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-zinc-400 font-medium">Health Score</h3>
                <Activity className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-5xl font-bold text-white mb-2">98<span className="text-lg text-zinc-500 font-normal">/100</span></div>
            <p className="text-sm text-green-400">+2% from last run</p>
        </motion.div>

        {/* Active PRs Card */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-zinc-400 font-medium">Active PRs</h3>
                <GitPullRequest className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-5xl font-bold text-white mb-2">0</div>
            <p className="text-sm text-zinc-500">All caught up</p>
        </motion.div>

        {/* Pending Issues */}
        <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="p-6 rounded-2xl bg-white/5 border border-white/10"
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-zinc-400 font-medium">Issues Detected</h3>
                <Terminal className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-5xl font-bold text-white mb-2">0</div>
            <p className="text-sm text-zinc-500">Scanning...</p>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                                <Activity className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-white">Manual Health Scan</h4>
                                <p className="text-sm text-zinc-500">Triggered by user • 2 hours ago</p>
                            </div>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-medium">
                            Completed
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div>
            <h2 className="text-xl font-semibold mb-4">System Status</h2>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-400">Kestra Orchestrator</span>
                        <span className="text-green-400">Online</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-green-500" />
                    </div>
                </div>
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-400">AI Agent (Cline)</span>
                        <span className="text-blue-400">Idle</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-full h-full bg-blue-500/50" />
                    </div>
                </div>
                 <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-400">Oumi (RL Model)</span>
                        <span className="text-purple-400">v1.0.0 Loaded</span>
                    </div>
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-purple-500" />
                    </div>
                </div>
            </div>
        </div>
      </div>

    </div>
  );
}
