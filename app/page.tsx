"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Log = { time: string; label: string; message: string; tone?: "success" | "accent" | "muted" };

const initialLogs: Log[] = [
  { time: "20:44:11", label: "SYSTEM", message: "ForgeOS orchestration engine online", tone: "success" },
  { time: "20:44:18", label: "TELEGRAM", message: "@Hermesfullsetting_bot connected", tone: "accent" },
  { time: "20:44:31", label: "VERCEL", message: "Production preview is ready", tone: "success" },
  { time: "20:44:36", label: "CODEX", message: "Waiting for your next delivery request", tone: "muted" }
];

const agents = [
  { initials: "C", name: "Codex", role: "Implementation", status: "Ready", color: "violet" },
  { initials: "Q", name: "Quality", role: "Tests & browser", status: "Standby", color: "blue" },
  { initials: "D", name: "Deploy", role: "CI/CD & previews", status: "Ready", color: "green" }
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [logs, setLogs] = useState<Log[]>(initialLogs);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isRunning]);

  const formattedElapsed = useMemo(() => `00:${String(elapsed).padStart(2, "0")}`, [elapsed]);

  function addLog(label: string, message: string, tone?: Log["tone"]) {
    setLogs((items) => [...items, { time: new Date().toLocaleTimeString("en-GB", { hour12: false }), label, message, tone }]);
  }

  function runForge(event: FormEvent) {
    event.preventDefault();
    const request = prompt.trim();
    if (!request || isRunning) return;
    setIsRunning(true);
    setElapsed(0);
    addLog("INTENT", request, "accent");
    setPrompt("");
    window.setTimeout(() => addLog("CODEX", "Analysed request and created implementation plan", "success"), 700);
    window.setTimeout(() => addLog("GIT", "Created isolated delivery branch forge/live-job", "muted"), 1450);
    window.setTimeout(() => addLog("QUALITY", "Preparing Playwright validation suite", "muted"), 2300);
    window.setTimeout(() => { addLog("DEPLOY", "Job queued — connect your repository to execute", "accent"); setIsRunning(false); }, 3400);
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">F</span><span>forge<span>os</span></span></div>
        <button className="new-job" onClick={() => document.getElementById("composer")?.focus()}><b>+</b> New delivery</button>
        <div className="nav-group"><p>WORKSPACE</p>{["Overview", "Deliveries", "Deployments", "Agents"].map((item) => <button key={item} className={activeTab === item ? "nav-item selected" : "nav-item"} onClick={() => setActiveTab(item)}><span>{item === "Overview" ? "⌘" : item === "Deliveries" ? "◇" : item === "Deployments" ? "↗" : "◌"}</span>{item}</button>)}</div>
        <div className="nav-group"><p>MANAGE</p><button className="nav-item"><span>◫</span>Repository</button><button className="nav-item"><span>◇</span>Integrations</button><button className="nav-item"><span>⚙</span>Settings</button></div>
        <div className="sidebar-bottom"><div className="connection"><i /> Telegram connected<br /><strong>@Hermesfullsetting_bot</strong></div><div className="user"><span>DH</span><div><b>Durrell-229</b><small>Personal workspace</small></div><button>⌄</button></div></div>
      </aside>

      <section className="workspace">
        <header><div><p className="crumb">WORKSPACE / {activeTab.toUpperCase()}</p><h1>Control room</h1></div><div className="header-actions"><span className="live-dot"><i /> All systems operational</span><button className="icon-button">⌕</button><button className="icon-button">?</button></div></header>

        <div className="content-grid">
          <section className="primary">
            <div className="hero-card">
              <div className="hero-orb" /><div className="hero-copy"><p>YOUR AUTONOMOUS DELIVERY TEAM</p><h2>What are we<br /><em>shipping today?</em></h2><span>Describe a feature, a bug, or a goal. ForgeOS will plan, build, test and deploy it.</span></div>
              <div className="hero-status"><i /> {isRunning ? "DELIVERY RUNNING" : "READY FOR WORK"}</div>
            </div>
            <form className="composer" onSubmit={runForge}><div className="composer-top"><span className="spark">✦</span><input id="composer" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Ask ForgeOS to ship something…" autoComplete="off" /><button type="submit" disabled={!prompt.trim() || isRunning}>{isRunning ? "Working…" : "Send ↗"}</button></div><div className="composer-bottom"><span>⌘ Enter to send</span><span><i /> GPT-5.6 · Codex</span></div></form>
            <div className="section-heading"><div><p>ACTIVE DELIVERY</p><h3>{isRunning ? "Implementing your request" : "No delivery in progress"}</h3></div><span className={isRunning ? "pill running" : "pill"}>{isRunning ? `RUNNING ${formattedElapsed}` : "READY"}</span></div>
            <div className="delivery-card"><div className="delivery-icon">⌘</div><div className="delivery-copy"><b>{isRunning ? "Live implementation job" : "Start from a Telegram message"}</b><span>{isRunning ? "Codex is planning the change and Quality is preparing validation." : "Send /forge or write a request above to create your first delivery."}</span></div><button className="arrow">→</button></div>
          </section>

          <aside className="right-rail">
            <div className="panel terminal-panel"><div className="panel-title"><div><span className="terminal-icon">›_</span> Live terminal</div><button>···</button></div><div className="terminal"><div className="terminal-head"><span><i /><i /><i /></span><em>forgeos@orchestrator:~</em></div>{logs.map((log, index) => <p key={`${log.time}-${index}`} className={log.tone ?? ""}><time>{log.time}</time><b>[{log.label}]</b> {log.message}</p>)}<span className="cursor">▋</span></div><button className="terminal-link">Open full terminal <span>↗</span></button></div>
            <div className="panel agents-panel"><div className="panel-title"><div>Agents <span className="count">3</span></div><button>Manage</button></div>{agents.map((agent) => <div className="agent" key={agent.name}><span className={`avatar ${agent.color}`}>{agent.initials}</span><div><b>{agent.name}</b><small>{agent.role}</small></div><span className={agent.status === "Ready" ? "agent-status ready" : "agent-status"}><i />{agent.status}</span></div>)}</div>
            <div className="panel preview-panel"><p>LAST DEPLOYMENT</p><div><span className="deployment-mark">▲</span><section><b>Production preview</b><small>Vercel · main branch</small></section><i>✓</i></div><button>View deployment <span>↗</span></button></div>
          </aside>
        </div>
      </section>
    </main>
  );
}
