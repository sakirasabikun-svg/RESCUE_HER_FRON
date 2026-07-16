
// src/pages/ReportIncidentPage.jsx
import React, { useState } from 'react';

function ReportIncidentPage({ theme }) {
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    location: '',
    severity: 'Harassment/Eve teasing Spot', 
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    // 🔒 লোকাল স্টোরেজ থেকে আইডি ও সিকিউরিটি টোকেন রিড করা
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      alert("Authentication failed. Active workspace session data missing.");
      return;
    }

    if (!formData.location || !formData.severity || !formData.description) {
      alert("Please fill out all mandatory tracking parameters before transmission.");
      return;
    }

    setSubmitting(true);
    setStatusMessage('');

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

      const response = await fetch(`${backendUrl}/api/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userId,
          location: formData.location,
          severity: formData.severity,
          description: formData.description
        })
      });

      if (!response.ok) throw new Error("Server communication architecture violation");
      const resData = await response.json();

      if (resData.success) {
        setStatusMessage("Incident intelligence node logged and secured successfully.");
        setFormData({ location: '', severity: 'Harassment/Eve teasing Spot', description: '' });
      } else {
        setStatusMessage(`Transmission failure: ${resData.message}`);
      }
    } catch (err) {
      console.error("❌ Network Error (Report Incident Page):", err);
      setStatusMessage("Network timeout. Unable to establish central security hub connection.");
    } finally {
      setSubmitting(false);
    }
  };

  // 🎨 প্রিমিয়াম কালার প্যালেট
  const colors = {
    bg: isDark ? '#0a120f' : '#f8fafc',
    text: isDark ? '#f8fafc' : '#0f172a',
    subText: isDark ? '#94a3b8' : '#64748b',
    cardBg: isDark ? 'rgba(17, 26, 22, 0.7)' : 'rgba(255, 255, 255, 0.8)',
    inputBg: isDark ? '#16231f' : '#ffffff',
    border: isDark ? 'rgba(16, 185, 129, 0.2)' : '#e2e8f0',
    inputBorder: isDark ? 'rgba(16, 185, 129, 0.3)' : '#cbd5e1',
    primary: '#10b981'
  };

  return (
    <div style={{ 
      padding: '40px 20px', 
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", 
      color: colors.text, 
      backgroundColor: colors.bg, 
      minHeight: '100vh', 
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.4s ease'
    }}>
      
      {/* 🔮 গ্লোবাল CSS অ্যানিমেশন */}
      <style>{`
        @keyframes radarScan { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes pulseGlow { 0%, 100% { opacity: 0.2; filter: blur(60px); } 50% { opacity: 0.5; filter: blur(80px); } }
        @keyframes liveGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .glass-panel {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid ${colors.border};
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.4);
        }
      `}</style>

      {/* 🌌 ব্যাকগ্রাউন্ড লাইভ রাডার ও পার্টিকেলস */}
      <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ccfbf1', top: '10%', left: '-10%', animation: 'pulseGlow 8s infinite', pointerEvents: 'none', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: isDark ? 'rgba(16, 185, 129, 0.1)' : '#e0f2fe', bottom: '10%', right: '-5%', animation: 'pulseGlow 10s infinite reverse', pointerEvents: 'none', zIndex: 0 }}></div>

      {/* 🛡️ BRANDED HERO BANNER (Live Gradient & SVG Logo) */}
      <div style={{ 
        background: isDark 
          ? 'linear-gradient(270deg, #022c22, #0f172a, #1e1b4b, #064e3b)' 
          : 'linear-gradient(270deg, #d1fae5, #e0f2fe, #f3e8ff, #ccfbf1)', 
        backgroundSize: '400% 400%',
        animation: 'liveGradient 12s ease infinite',
        padding: '50px 40px', 
        borderRadius: '32px', 
        marginBottom: '40px',
        boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.5)' : '0 15px 40px rgba(16, 185, 129, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
        maxWidth: '850px',
        margin: '0 auto 40px auto'
      }}>
        
        {/* লাইভ অ্যানিমেটেড রাডার লোগো */}
        <div style={{ position: 'relative', width: '70px', height: '70px', margin: '0 auto 20px auto', display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'float 6s ease-in-out infinite' }}>
          <div style={{ position: 'absolute', width: '100%', height: '100%', border: `2px dashed ${colors.primary}`, borderRadius: '50%', animation: 'radarScan 3s infinite linear', opacity: 0.6 }}></div>
          <div style={{ position: 'absolute', width: '65%', height: '65%', background: colors.primary, borderRadius: '50%', filter: 'blur(12px)', opacity: 0.5 }}></div>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 2, filter: `drop-shadow(0 0 6px ${colors.primary})` }}>
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
        </div>

        <div style={{ display: 'inline-block', padding: '6px 14px', borderRadius: '50px', background: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.6)', border: `1px solid ${colors.border}`, color: colors.primary, fontWeight: '800', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px' }}>
          Threat Intelligence Grid
        </div>

        <h1 style={{ fontSize: '38px', fontWeight: '900', margin: '0 0 12px 0', color: colors.text, letterSpacing: '-1px' }}>
          Decentralized Incident Logging
        </h1>
        <p style={{ fontSize: '14px', color: colors.text, opacity: 0.8, maxWidth: '600px', margin: '0 auto', lineHeight: '1.65', fontWeight: '500' }}>
          Tactical spatial parameters beat reactive metrics. Document localized environmental anomalies anonymously to strengthen community vulnerability matrix tracking.
        </p>
      </div>

      {/* 📝 MAIN FORM CONTAINER (Glassmorphism) */}
      <div className="glass-panel" style={{ 
        backgroundColor: colors.cardBg, 
        padding: '50px 40px', 
        borderRadius: '32px', 
        maxWidth: '650px',
        margin: '0 auto',
        boxShadow: isDark ? '0 25px 50px rgba(0,0,0,0.5)' : '0 20px 40px rgba(15, 23, 42, 0.05)',
        position: 'relative',
        zIndex: 1,
        textAlign: 'left'
      }}>
        <form onSubmit={handleReportSubmit}>
          
          {/* 📍 1. LOCATION INPUT */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '800', color: colors.text, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span style={{ color: colors.primary }}>📍</span> Incident Coordinates / Area
            </label>
            <input 
              type="text" 
              placeholder="E.g., Uttara Sector 10, Road 5, Dhaka" 
              value={formData.location}
              onFocus={() => setFocusedField('location')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              style={{ 
                width: '100%', padding: '16px 20px', borderRadius: '14px', 
                border: focusedField === 'location' ? `2px solid ${colors.primary}` : `1px solid ${colors.inputBorder}`, 
                backgroundColor: colors.inputBg, color: colors.text, fontSize: '14.5px', outline: 'none', 
                boxSizing: 'border-box', transition: 'all 0.3s ease',
                boxShadow: focusedField === 'location' ? `0 0 15px rgba(16, 185, 129, 0.1)` : 'none'
              }} 
            />
          </div>

          {/* ⚠️ 2. SEVERITY DROPDOWN */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '800', color: colors.text, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span style={{ color: '#ef4444' }}>⚠️</span> Threat Severity Tier
            </label>
            <div style={{ position: 'relative' }}>
              <select 
                value={formData.severity}
                onFocus={() => setFocusedField('severity')}
                onBlur={() => setFocusedField(null)}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                style={{ 
                  width: '100%', padding: '16px 20px', borderRadius: '14px', 
                  border: focusedField === 'severity' ? `2px solid ${colors.primary}` : `1px solid ${colors.inputBorder}`, 
                  backgroundColor: colors.inputBg, color: colors.text, fontSize: '14.5px', outline: 'none', 
                  boxSizing: 'border-box', cursor: 'pointer', transition: 'all 0.3s ease',
                  appearance: 'none', WebkitAppearance: 'none',
                  boxShadow: focusedField === 'severity' ? `0 0 15px rgba(16, 185, 129, 0.1)` : 'none'
                }}
              >
                <option value="Harassment/Eve teasing Spot">Medium — Active Deterrence / Verbal Distress</option>
                <option value="Poor/Broken Street Lighting">Low — Deficient Infrastructure / Broken Lighting</option>
                <option value="No Police Patrol Area">Moderate — Unmonitored Perimeter / Minimal Patrol</option>
                <option value="Suspicious Activity Zone">High — Suspicious Sub-Perimeter Activity Zone</option>
              </select>
              <span style={{ position: 'absolute', right: '20px', top: '18px', color: colors.subText, pointerEvents: 'none', fontSize: '12px' }}>▼</span>
            </div>
          </div>

          {/* 📄 3. DESCRIPTION TEXTAREA */}
          <div style={{ marginBottom: '35px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '800', color: colors.text, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <span style={{ color: '#3b82f6' }}>📄</span> Telemetry Meta-Description
            </label>
            <textarea 
              rows="4" 
              placeholder="Provide context regarding the environmental variables (optional but recommended)..." 
              value={formData.description}
              onFocus={() => setFocusedField('description')}
              onBlur={() => setFocusedField(null)}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ 
                width: '100%', padding: '16px 20px', borderRadius: '14px', 
                border: focusedField === 'description' ? `2px solid ${colors.primary}` : `1px solid ${colors.inputBorder}`, 
                backgroundColor: colors.inputBg, color: colors.text, fontSize: '14.5px', outline: 'none', 
                boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit', transition: 'all 0.3s ease',
                boxShadow: focusedField === 'description' ? `0 0 15px rgba(16, 185, 129, 0.1)` : 'none'
              }}
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit" 
            disabled={submitting}
            className={submitting ? "" : "submit-btn"}
            style={{ 
              backgroundColor: submitting ? (isDark ? '#334155' : '#94a3b8') : colors.primary, 
              color: '#ffffff', border: 'none', padding: '18px 20px', borderRadius: '14px', 
              fontWeight: '800', fontSize: '14.5px', textTransform: 'uppercase', letterSpacing: '1px', 
              cursor: submitting ? 'not-allowed' : 'pointer', width: '100%',
              boxShadow: submitting ? 'none' : (isDark ? '0 8px 20px rgba(16, 185, 129, 0.2)' : '0 8px 20px rgba(16, 185, 129, 0.3)'),
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {submitting ? "📡 Transmitting Telemetry..." : "Broadcast Secure Threat Log"}
          </button>
        </form>

        {/* STATUS MESSAGE */}
        {statusMessage && (
          <div style={{ 
            marginTop: '24px', padding: '14px', borderRadius: '12px', 
            background: statusMessage.includes('successfully') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: statusMessage.includes('successfully') ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}>
            <span style={{ fontSize: '16px' }}>{statusMessage.includes('successfully') ? '✅' : '❌'}</span>
            <span style={{ fontSize: '13.5px', fontWeight: '700', color: statusMessage.includes('successfully') ? colors.primary : '#ef4444' }}>
              {statusMessage}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportIncidentPage;