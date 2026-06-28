'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3000/dashboard')
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  if (!data) {
    return (
      <div style={{ padding: 20 }}>
        🧠 Loading KVRAT AI Dashboard...
      </div>
    );
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      
      <h1>🧠 KVRAT AI Dashboard</h1>

      <h3>Service: {data.service}</h3>

      <hr />

      <h2>📊 Metrics</h2>

      <p>Total Ideas: {data.metrics.totalIdeas}</p>
      <p>Most Used Agent: {data.metrics.mostUsedAgent}</p>

      <h3>🧠 Intelligence Score</h3>
      <p>{data.metrics.intelligence.systemIntelligenceScore}/100</p>

      <hr />

      <h2>🤖 Agent Usage</h2>
      <pre>{JSON.stringify(data.metrics.agentUsage, null, 2)}</pre>

      <hr />

      <h2>🧾 Last Decision</h2>
      <pre>{JSON.stringify(data.metrics.lastDecision, null, 2)}</pre>
    </div>
  );
}
