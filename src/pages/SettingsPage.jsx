
// src/pages/SettingsPage.jsx
import React, { useState } from 'react';

function SettingsPage() {
  // ১. স্লাইডার এবং টাইমার স্টেট
  const [radius, setRadius] = useState(2); 
  const [countdown, setCountdown] = useState(3); 

  // ২. আইওএস স্টাইল সুইচের স্টেটসমূহ
  const [emailAlert, setEmailAlert] = useState(true);
  const [liveTracking, setLiveTracking] = useState(true);
  const [fakeBattery, setFakeBattery] = useState(false);

  // ৩. ডুপ্লিকেট পিন স্টেট
  const [duressPin, setDuressPin] = useState('1234');
  const [isPinSaved, setIsPinSaved] = useState(false);

  const handleSavePin = (e) => {
    e.preventDefault();
    if (duressPin.length !== 4) {
      alert("Duress PIN configuration error. Protocol requires exactly 4 digits.");
      return;
    }
    setIsPinSaved(true);
    setTimeout(() => setIsPinSaved(false), 2000); 
  };

  // টগল সুইচের কমন স্টাইল মেথড
  const toggleSwitchStyle = (isActive) => ({
    width: '46px',
    height: '24px',
    backgroundColor: isActive ? '#00bfa5' : '#cbd5e1', // RescueHer ব্র্যান্ড কালার সিঙ্ক
    borderRadius: '100px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    border: 'none',
    outline: 'none',
    flexShrink: 0
  });

  const toggleCircleStyle = (isActive) => ({
    width: '18px',
    height: '18px',
    backgroundColor: 'white',
    borderRadius: '50%',
    position: 'absolute',
    top: '3px',
    left: isActive ? '25px' : '3px',
    transition: 'left 0.2s ease',
    boxShadow: '0 1px 3px rgba(15, 23, 42, 0.2)'
  });

  return (
    <div style={{ padding: '40px 35px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#0f172a', backgroundColor: '#f8fafc', minHeight: '100vh', textAlign: 'left' }}>
      
      {/* CSS ANIMATIONS INJECTOR */}
      <style>{`
        @keyframes pulseRadar {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes waveSignal {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes scanStealth {
          0% { transform: translateY(-5px); opacity: 0.3; }
          50% { transform: translateY(15px); opacity: 0.8; }
          100% { transform: translateY(-5px); opacity: 0.3; }
        }
        .animate-radar { animation: pulseRadar 2s infinite ease-out; }
        .animate-wave-1 { animation: waveSignal 1.5s infinite ease-in-out; }
        .animate-wave-2 { animation: waveSignal 1.5s infinite ease-in-out 0.5s; }
        .animate-scan { animation: scanStealth 2.5s infinite ease-in-out; }
      `}</style>

      {/* HEADER TITLE */}
      <div style={{ marginBottom: '35px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', marginBottom: '6px', letterSpacing: '-0.5px' }}>Central System Configurations</h2>
        <p style={{ fontSize: '14px', color: '#64748b', margin: 0, fontWeight: '500' }}>Configure real-time safety thresholds, automated communication nodes, and duress parameters.</p>
      </div>

      {/* GRID CONTAINER */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
        
        {/* CARD 1: EMERGENCY RADIUS & TRIGGERS */}
        <div style={{ flex: '1 1 calc(50% - 25px)', minWidth: '320px', backgroundColor: 'white', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.01)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Perimeter Settings
              </h3>
              
              {/* 📡 ANIMATED IMAGE 1: RADAR PULSE VECTOR */}
              <div style={{ position: 'relative', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="animate-radar" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.2)' }}></div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M3 12h1m16 0h1M12 3v1m0 16v1"></path>
                </svg>
              </div>
            </div>
            
            {/* স্লাইডার উইজেট */}
            <div style={{ marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>Geo-fence Safety Radius</label>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#ef4444', backgroundColor: '#fee2e2', padding: '3px 10px', borderRadius: '6px' }}>{radius} KM</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={radius} 
                onChange={(e) => setRadius(e.target.value)}
                style={{ width: '100%', accentColor: '#ef4444', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginTop: '6px', fontWeight: '500', lineHeight: '1.4' }}>Defines the critical perimeter boundary for real-time guardian network node updates.</span>
            </div>

            {/* কাউন্টডাউন ড্রপডাউন */}
            <div style={{ marginBottom: '5px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>SOS Transmission Delay Buffer</label>
              <select 
                value={countdown} 
                onChange={(e) => setCountdown(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#fff', cursor: 'pointer', outline: 'none', color: '#0f172a', fontWeight: '500' }}
              >
                <option value="0">Instant Routing (Zero Latency Bypass)</option>
                <option value="3">3 Seconds Verification Buffer</option>
                <option value="5">5 Seconds Verification Buffer</option>
                <option value="10">10 Seconds Verification Buffer</option>
              </select>
              <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block', marginTop: '6px', fontWeight: '500', lineHeight: '1.4' }}>Grace period allocated to terminate accidental distress triggers prior to network broadcast.</span>
            </div>
          </div>
        </div>

        {/* CARD 2: RE-ENGINEERED IOS SWITCHES */}
        <div style={{ flex: '1 1 calc(50% - 25px)', minWidth: '320px', backgroundColor: 'white', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.01)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Telemetry Nodes
              </h3>
              
              {/* 📡 ANIMATED IMAGE 2: SIGNAL WAVE VECTOR */}
              <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '18px', width: '24px', justifyContent: 'center' }}>
                <div style={{ width: '3px', height: '8px', backgroundColor: '#00bfa5', borderRadius: '2px' }}></div>
                <div className="animate-wave-1" style={{ width: '3px', height: '14px', backgroundColor: '#00bfa5', borderRadius: '2px' }}></div>
                <div className="animate-wave-2" style={{ width: '3px', height: '20px', backgroundColor: '#00bfa5', borderRadius: '2px' }}></div>
              </div>
            </div>
            
            {/* সুইজার ১ */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9', marginBottom: '16px' }}>
              <div style={{ textAlign: 'left', paddingRight: '15px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '2px' }}>Automated Emergency Broadcasts</span>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500', display: 'block', lineHeight: '1.3' }}>Directly transmit location data mapping metrics to saved emergency channels via SMTP relays.</span>
              </div>
              <button style={toggleSwitchStyle(emailAlert)} onClick={() => setEmailAlert(!emailAlert)}>
                <span style={toggleCircleStyle(emailAlert)}></span>
              </button>
            </div>

            {/* সুইজার ২ */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9', marginBottom: '16px' }}>
              <div style={{ textAlign: 'left', paddingRight: '15px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '2px' }}>Background Coordinate Streaming</span>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500', display: 'block', lineHeight: '1.3' }}>Preserve continuous server synchronization protocols even when the device gateway is minimized.</span>
              </div>
              <button style={toggleSwitchStyle(liveTracking)} onClick={() => setLiveTracking(!liveTracking)}>
                <span style={toggleCircleStyle(liveTracking)}></span>
              </button>
            </div>

            {/* সুইজার ৩ */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ textAlign: 'left', paddingRight: '15px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '2px' }}>Cloaking Parameter Simulation</span>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500', display: 'block', lineHeight: '1.3' }}>Simulate alternative hardware profiles to disrupt analytics if the system encounters physical inspection.</span>
              </div>
              <button style={toggleSwitchStyle(fakeBattery)} onClick={() => setFakeBattery(!fakeBattery)}>
                <span style={toggleCircleStyle(fakeBattery)}></span>
              </button>
            </div>
          </div>
        </div>

        {/* CARD 3: HIGH-TECH DURESS PIN CONFIGURATOR */}
        <div style={{ flex: '1 1 100%', backgroundColor: 'white', padding: '28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.01)', marginTop: '5px', display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 400px', borderLeft: '4px solid #f59e0b', paddingLeft: '16px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Duress Stealth Protocol Matrix
            </h3>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, fontWeight: '500', lineHeight: '1.5' }}>
              In scenarios where threat actors compel system decryption, entering this specialized secondary PIN masks the core workspace. The terminal will initialize an uncompromised backup container dashboard while silently deploying background distress signals to all network nodes.
            </p>
          </div>

          {/* 📡 ANIMATED IMAGE 3: STEALTH MATRIX SCANNER */}
          <div style={{ width: '60px', height: '60px', backgroundColor: '#fffbeb', borderRadius: '16px', border: '1px solid #fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="animate-scan" style={{ position: 'absolute', width: '80%', height: '2px', backgroundColor: '#f59e0b', left: '10%' }}></div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>

          <div style={{ flex: '1 1 100%', marginTop: '5px' }}>
            <form onSubmit={handleSavePin} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 240px', textAlign: 'left' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Configure 4-Digit Duress PIN
                </label>
                <input 
                  type="password" 
                  maxLength="4"
                  placeholder="••••"
                  value={duressPin}
                  onChange={(e) => setDuressPin(e.target.value.replace(/\D/g, ''))} 
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '15px', letterSpacing: '6px', boxSizing: 'border-box', outline: 'none', color: '#0f172a', fontWeight: '700' }}
                />
              </div>
              <button 
                type="submit" 
                style={{ padding: '13px 28px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'background-color 0.2s', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1e293b'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#0f172a'}
              >
                Update Duress Matrix
              </button>
            </form>

            {isPinSaved && (
              <p style={{ color: '#059669', fontSize: '12.5px', fontWeight: '700', marginTop: '12px', textAlign: 'left', margin: '12px 0 0 0' }}>
                Duress sequence updated successfully. Operational node masking active.
              </p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default SettingsPage;



