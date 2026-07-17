const stages = [
  ["01", "Intent received", "Telegram", "done"],
  ["02", "Implementation plan", "Codex · GPT-5.6", "done"],
  ["03", "Build & validation", "GitHub Actions · Playwright", "active"],
  ["04", "Preview deployment", "Vercel", "waiting"]
];

export default function Home() {
  return (
    <main>
      <nav><span className="mark">F</span><span>FORGEOS</span><span className="nav-right">SYSTEM ONLINE <i /></span></nav>
      <section className="hero">
        <p className="eyebrow">AUTONOMOUS SOFTWARE DELIVERY</p>
        <h1>Ship software<br /><em>from a chat.</em></h1>
        <p className="lede">ForgeOS turns product intent into tested, deployed software — and shows every decision along the way.</p>
        <div className="telegram">✈ <span>Telegram connected</span><strong>@Hermesfullsetting_bot</strong></div>
      </section>
      <section className="command"><span>›</span><div><small>TELEGRAM COMMAND</small><code>/forge Create a booking landing page for padel courts</code></div><b>RUNNING</b></section>
      <section className="grid">
        <div className="panel timeline"><p className="label">LIVE DELIVERY PIPELINE</p>
          {stages.map(([number, title, tool, state]) => <div className={`stage ${state}`} key={number}><span>{number}</span><div><strong>{title}</strong><small>{tool}</small></div><i>{state === "done" ? "✓" : state === "active" ? "···" : "○"}</i></div>)}
        </div>
        <div className="panel activity"><p className="label">AGENT ACTIVITY</p><div className="terminal"><p><span>14:26:09</span> Request accepted from Telegram</p><p><span>14:26:11</span> Codex generated implementation plan</p><p><span>14:26:18</span> Branch <b>forge/padel-booking</b> created</p><p className="live"><span>14:26:22</span> Playwright is testing mobile checkout…</p></div><button>Open job details <span>→</span></button></div>
      </section>
      <footer>FORGEOS / BUILD WEEK 2026 <span>IDEA → CODE → TEST → DEPLOY → EVIDENCE</span></footer>
    </main>
  );
}
