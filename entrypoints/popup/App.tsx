import { useState } from 'react';

function App() {
  return (
    <div style={{ padding: '16px', minWidth: '300px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>FB Reels Speed</h1>
      <p style={{ fontSize: '14px', color: '#555' }}>
        Controls are injected directly into Facebook Reels videos.
      </p>
      <div style={{ marginTop: '16px', padding: '12px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
        <p style={{ fontSize: '12px', color: '#0369a1' }}>
          <strong>Status:</strong> Active
        </p>
      </div>
    </div>
  );
}

export default App;
