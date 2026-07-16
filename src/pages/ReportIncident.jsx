

// // src/components/ReportIncident.jsx
// import React, { useState } from 'react';

// function ReportIncident() {
//   const [location, setLocation] = useState('');
//   const [severity, setSeverity] = useState('Medium');
//   const [description, setDescription] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [statusMessage, setStatusMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // 🔒 লোকাল স্টোরেজ থেকে আইডি ও সিকিউরিটি টোকেন রিড করা
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');

//     if (!userId || !token) {
//       setStatusMessage('Authentication failed. Active session data missing.');
//       return;
//     }

//     setLoading(true);
//     setStatusMessage('');

//     // 🛠️ [FIXED]: পেলোডে userId এবং টোকেন হেডার সঠিকভাবে যুক্ত করা হলো
//     const reportData = { userId, location, severity, description };
//     const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

//     fetch(`${backendUrl}/api/report`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(reportData),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Server communication architecture violation");
//         return res.json();
//       })
//       .then((data) => {
//         setLoading(false);
//         if (data.success) {
//           setStatusMessage('Incident log recorded and secured successfully.');
//           setLocation('');
//           setDescription('');
//           setSeverity('Medium');
//         } else {
//           setStatusMessage('Transmission failure: ' + data.message);
//         }
//       })
//       .catch((err) => {
//         console.error("Pipeline post action mismatch execution control:", err);
//         setLoading(false);
//         setStatusMessage('Network timeout. Unable to establish central security hub connection.');
//       });
//   };

//   return (
//     <div className="grid-card" style={{ padding: '24px', borderRadius: '16px', background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.01)' }}>
//       <div className="card-title-bar" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
//         <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//           Threat Intelligence Reporting
//         </span>
//       </div>
      
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//         <div style={{ textAlign: 'left' }}>
//           <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//             Incident Coordinates / Area
//           </label>
//           <input 
//             type="text" 
//             placeholder="e.g., Dhanmondi Sector 27" 
//             value={location} 
//             onChange={(e) => setLocation(e.target.value)}
//             required
//             style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', outline: 'none', color: '#0f172a' }}
//           />
//         </div>

//         <div style={{ textAlign: 'left' }}>
//           <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//             Threat Severity Tier
//           </label>
//           <select 
//             value={severity} 
//             onChange={(e) => setSeverity(e.target.value)}
//             style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', background: '#fff', outline: 'none', cursor: 'pointer', color: '#0f172a' }}
//           >
//             <option value="Low">Low - (Suspicious Perimeter Activity)</option>
//             <option value="Medium">Medium - (Active Deterrence / Verbal Distress)</option>
//             <option value="High">High - (Immediate Threat / High-Risk Parameter)</option>
//           </select>
//         </div>

//         <div style={{ textAlign: 'left' }}>
//           <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//             Telemetry Meta-Description
//           </label>
//           <textarea 
//             placeholder="Provide context regarding the environmental variables (optional)..." 
//             value={description} 
//             onChange={(e) => setDescription(e.target.value)}
//             rows="3"
//             style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px', boxSizing: 'border-box', resize: 'none', outline: 'none', color: '#0f172a', fontFamily: 'inherit' }}
//           />
//         </div>

//         <button 
//           type="submit" 
//           disabled={loading}
//           style={{ 
//             marginTop: '4px', 
//             background: loading ? '#94a3b8' : '#dc2626', 
//             color: '#fff', 
//             border: 'none', 
//             padding: '12px', 
//             borderRadius: '10px', 
//             fontWeight: '700', 
//             cursor: loading ? 'not-allowed' : 'pointer', 
//             fontSize: '13px',
//             boxShadow: loading ? 'none' : '0 4px 12px rgba(220, 38, 38, 0.15)',
//             textTransform: 'uppercase',
//             letterSpacing: '0.5px',
//             transition: 'background 0.2s'
//           }}
//         >
//           {loading ? 'Transmitting Data Nodes...' : 'Broadcast Secure Threat Log'}
//         </button>
//       </form>

//       {statusMessage && (
//         <p style={{ marginTop: '14px', fontSize: '12px', fontWeight: '600', color: statusMessage.includes('successfully') ? '#059669' : '#dc2626', textAlign: 'center', margin: '14px 0 0 0' }}>
//           {statusMessage}
//         </p>
//       )}
//     </div>
//   );
// }

// export default ReportIncident;








// src/components/ReportIncident.jsx
import React, { useState } from 'react';

function ReportIncident() {
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false); // GPS Loading State
  const [statusMessage, setStatusMessage] = useState('');

  // 🌐 LIVE API: Auto-detect Location via OpenStreetMap Nominatim
  const handleAutoLocate = (e) => {
    e.preventDefault();
    if (!navigator.geolocation) {
      setStatusMessage('⚠️ Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setStatusMessage('📡 Syncing with live GPS satellites...');

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Live Reverse Geocoding API Fetch
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
          const data = await res.json();
          
          // API থেকে এলাকার নাম বের করে বক্সে বসানো
          const areaName = data.display_name || `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
          setLocation(areaName);
          setStatusMessage('✅ Live location coordinates locked!');
          
          // ৩ সেকেন্ড পর সাকসেস মেসেজ মুছে ফেলা
          setTimeout(() => setStatusMessage(''), 3000);
        } catch (err) {
          setLocation(`Lat: ${latitude.toFixed(5)}, Lng: ${longitude.toFixed(5)}`);
          setStatusMessage('⚠️ GPS fetched, but area naming failed. Exact coordinates used.');
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        setStatusMessage('❌ Failed to get GPS signal. Please type manually.');
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 🔒 লোকাল স্টোরেজ থেকে আইডি ও সিকিউরিটি টোকেন রিড করা
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      setStatusMessage('Authentication failed. Active session data missing.');
      return;
    }

    setLoading(true);
    setStatusMessage('');

    // 🛠️ পেলোডে userId এবং টোকেন হেডার সঠিকভাবে যুক্ত করা হলো
    const reportData = { userId, location, severity, description };
    const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

    fetch(`${backendUrl}/api/report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reportData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server communication architecture violation");
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        if (data.success) {
          setStatusMessage('🛡️ Incident log recorded and secured successfully.');
          setLocation('');
          setDescription('');
          setSeverity('Medium');
        } else {
          setStatusMessage('Transmission failure: ' + data.message);
        }
      })
      .catch((err) => {
        console.error("Pipeline post action mismatch execution control:", err);
        setLoading(false);
        setStatusMessage('Network timeout. Unable to establish central security hub connection.');
      });
  };

  return (
    <div className="grid-card" style={{ padding: '24px', borderRadius: '16px', background: 'transparent', width: '100%', boxSizing: 'border-box' }}>
      <div className="card-title-bar" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '15px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          🚨 Threat Intelligence Reporting
        </span>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Location Input with Live API Button */}
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.8 }}>
              Incident Coordinates / Area
            </label>
            <button 
              type="button" 
              onClick={handleAutoLocate}
              disabled={isLocating}
              style={{ 
                background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', 
                padding: '4px 10px', borderRadius: '50px', fontSize: '10px', fontWeight: '800', cursor: isLocating ? 'not-allowed' : 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '4px'
              }}
            >
              {isLocating ? '📡 Syncing...' : '📍 Auto Detect'}
            </button>
          </div>
          <input 
            type="text" 
            placeholder="e.g., Dhanmondi Sector 27 or Auto Detect..." 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.3)', fontSize: '13px', boxSizing: 'border-box', outline: 'none', background: 'rgba(255,255,255,0.05)', color: 'inherit', fontFamily: 'inherit' }}
          />
        </div>

        {/* Severity Select */}
        <div style={{ textAlign: 'left' }}>
          <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px', opacity: 0.8 }}>
            Threat Severity Tier
          </label>
          <select 
            value={severity} 
            onChange={(e) => setSeverity(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.3)', fontSize: '13px', boxSizing: 'border-box', background: 'rgba(255,255,255,0.05)', outline: 'none', cursor: 'pointer', color: 'inherit', fontFamily: 'inherit' }}
          >
            <option value="Low" style={{ color: '#000' }}>Low - (Suspicious Perimeter Activity)</option>
            <option value="Medium" style={{ color: '#000' }}>Medium - (Active Deterrence / Verbal Distress)</option>
            <option value="High" style={{ color: '#000' }}>High - (Immediate Threat / High-Risk Parameter)</option>
            <option value="CRITICAL" style={{ color: '#000' }}>CRITICAL - (Physical Danger / Imminent Attack)</option>
          </select>
        </div>

        {/* Description Textarea */}
        <div style={{ textAlign: 'left' }}>
          <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '6px', opacity: 0.8 }}>
            Telemetry Meta-Description
          </label>
          <textarea 
            placeholder="Describe the threat, environment, or suspects (optional)..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
            style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.3)', fontSize: '13px', boxSizing: 'border-box', resize: 'none', outline: 'none', background: 'rgba(255,255,255,0.05)', color: 'inherit', fontFamily: 'inherit' }}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            marginTop: '8px', 
            background: loading ? '#94a3b8' : 'linear-gradient(135deg, #ef4444, #dc2626)', 
            color: '#fff', 
            border: 'none', 
            padding: '14px', 
            borderRadius: '12px', 
            fontWeight: '800', 
            cursor: loading ? 'not-allowed' : 'pointer', 
            fontSize: '13px',
            boxShadow: loading ? 'none' : '0 4px 15px rgba(220, 38, 38, 0.25)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            transition: 'all 0.2s ease',
            width: '100%'
          }}
        >
          {loading ? 'Transmitting Data Nodes...' : 'Broadcast Secure Threat Log'}
        </button>
      </form>

      {/* Status Message */}
      {statusMessage && (
        <div style={{ marginTop: '16px', padding: '10px', borderRadius: '8px', background: statusMessage.includes('successfully') || statusMessage.includes('locked') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${statusMessage.includes('successfully') || statusMessage.includes('locked') ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}` }}>
          <p style={{ fontSize: '12px', fontWeight: '700', color: statusMessage.includes('successfully') || statusMessage.includes('locked') ? '#10b981' : '#ef4444', textAlign: 'center', margin: 0 }}>
            {statusMessage}
          </p>
        </div>
      )}
    </div>
  );
}

export default ReportIncident;