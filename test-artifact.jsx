import { useState } from "react";

export default function TestArtifact() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: 40, textAlign: "center", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 32 }}>Test Artifact</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)} style={{ padding: "8px 16px", fontSize: 16 }}>
        Click me
      </button>
    </div>
  );
}
