// // src/pages/AlertHistoryPage.js
// import React, { useState, useEffect } from 'react';

// function AlertHistoryPage() {
//   const [historyData, setHistoryData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // 🔒 লোকাল স্টোরেজ থেকে আইডি ও টোকেন তুলে নেওয়া হলো
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');

//     if (!userId || !token) {
//       setError("Authentication missing. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     // 🌐 ডায়নামিক ব্যাকঅ্যান্ড URL সেটআপ
//     const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

//     const fetchAlertHistory = async () => {
//       try {
//         // 🚨 কুয়েরি প্যারামিটারে userId এবং হেডারে Authorization টোকেন পাস করা হলো
//         const response = await fetch(`${backendUrl}/api/reports?userId=${userId}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch logs from database');
//         }
        
//         const data = await response.json();
        
//         // ব্যাকঅ্যান্ড যদি { success: true, data: [...] } আকারে পাঠায় বা ডিরেক্ট অ্যারে পাঠায়, দুইটাই হ্যান্ডেল করা হলো
//         if (Array.isArray(data)) {
//           setHistoryData(data);
//         } else if (data && Array.isArray(data.data)) {
//           setHistoryData(data.data);
//         } else {
//           setHistoryData([]);
//         }
        
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching history:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchAlertHistory();
//   }, []);

//   // 🕒 টাইম ফরম্যাট করার সুন্দর ফাংশন
//   const formatTime = (isoString) => {
//     if (!isoString) return "Unknown Time";
//     const date = new Date(isoString);
//     return date.toLocaleString('en-US', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   if (loading) {
//     return <div style={{ padding: '20px', color: '#64748b' }}>⏳ Fetching live incident logs from MySQL database...</div>;
//   }

//   if (error) {
//     return <div style={{ padding: '20px', color: '#ef4444' }}>❌ Error: {error}. Please ensure your backend server is running.</div>;
//   }

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2 style={{ marginBottom: '6px', color: '#0f172a' }}>⏳ Emergency Alert Logs History</h2>
//       <p style={{ color: '#64748b', marginBottom: '25px', fontSize: '14px' }}>Chronological records of all SOS triggers and communication streams broadcasted from your profile.</p>

//       <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//         {historyData.length === 0 ? (
//           <div style={{ padding: '30px', textAlign: 'center', color: '#94a3b8', border: '1px dashed #cbd5e1', borderRadius: '10px' }}>
//             📭 No emergency records found in the database yet.
//           </div>
//         ) : (
//           historyData.map((log) => (
//             <div key={log.id} style={{ backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <div>
//                 <h4 style={{ color: log.severity === 'Critical' ? '#ef4444' : '#3b82f6', fontSize: '15px', fontWeight: '600' }}>
//                   🚨 {log.severity || 'SOS'} Alert: {log.description || 'No Description'}
//                 </h4>
//                 <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
//                   📅 {log.created_at ? formatTime(log.created_at) : (log.timestamp || 'Just now')} | 📍 {log.location || log.area || 'Unknown Location'}
//                 </p>
//               </div>
//               <span style={{ 
//                 backgroundColor: log.severity === 'Critical' ? '#fee2e2' : '#e0f2fe',
//                 color: log.severity === 'Critical' ? '#ef4444' : '#0369a1',
//                 padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600'
//               }}>
//                 {log.severity || 'Active'}
//               </span>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default AlertHistoryPage;






// // src/pages/AlertHistoryPage.js
// import React, { useState, useEffect } from 'react';

// function AlertHistoryPage({ theme = 'light' }) {
//   const [historyData, setHistoryData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // 🎨 ডায়নামিক থিম কালার (ডার্ক মোডের জন্য)
//   const isDark = theme === 'dark';
//   const colors = {
//     textMain: isDark ? '#f8fafc' : '#0f172a',
//     textMuted: isDark ? '#94a3b8' : '#64748b',
//     cardBg: isDark ? '#1e293b' : '#ffffff',
//     cardBorder: isDark ? '#334155' : '#e2e8f0',
//     criticalText: isDark ? '#fca5a5' : '#ef4444',
//     criticalBg: isDark ? 'rgba(239, 68, 68, 0.15)' : '#fee2e2',
//     normalText: isDark ? '#93c5fd' : '#0369a1',
//     normalBg: isDark ? 'rgba(59, 130, 246, 0.15)' : '#e0f2fe',
//   };

//   useEffect(() => {
//     // 🔒 লোকাল স্টোরেজ থেকে আইডি ও টোকেন তুলে নেওয়া হলো
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');

//     if (!userId || !token) {
//       setError("Authentication missing. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     // 🌐 ডায়নামিক ব্যাকঅ্যান্ড URL সেটআপ
//     const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

//     const fetchAlertHistory = async () => {
//       try {
//         // 🚨 কুয়েরি প্যারামিটারে userId এবং হেডারে Authorization টোকেন পাস করা হলো
//         const response = await fetch(`${backendUrl}/api/reports?userId=${userId}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch logs from database');
//         }
        
//         const data = await response.json();
        
//         // ব্যাকঅ্যান্ড যদি { success: true, data: [...] } আকারে পাঠায় বা ডিরেক্ট অ্যারে পাঠায়, দুইটাই হ্যান্ডেল করা হলো
//         if (Array.isArray(data)) {
//           setHistoryData(data);
//         } else if (data && Array.isArray(data.data)) {
//           setHistoryData(data.data);
//         } else {
//           setHistoryData([]);
//         }
        
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching history:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchAlertHistory();
//   }, []);

//   // 🕒 টাইম ফরম্যাট করার সুন্দর ফাংশন
//   const formatTime = (isoString) => {
//     if (!isoString) return "Unknown Time";
//     const date = new Date(isoString);
//     return date.toLocaleString('en-US', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   if (loading) {
//     return <div style={{ padding: '20px', color: colors.textMuted }}>⏳ Fetching live incident logs from MySQL database...</div>;
//   }

//   if (error) {
//     return <div style={{ padding: '20px', color: '#ef4444' }}>❌ Error: {error}. Please ensure your backend server is running.</div>;
//   }

//   return (
//     <div className="alert-history-container" style={{ padding: '20px', transition: 'all 0.3s ease' }}>
      
//       {/* 📱 Mobile Responsive CSS */}
//       <style>{`
//         @media (max-width: 768px) {
//           .alert-history-container {
//             padding: 10px !important;
//           }
//           .alert-card {
//             flex-direction: column !important;
//             align-items: flex-start !important;
//             gap: 12px !important;
//             padding: 16px !important;
//           }
//           .alert-title {
//             font-size: 14px !important;
//             line-height: 1.4 !important;
//           }
//           .alert-meta {
//             font-size: 11px !important;
//           }
//           .alert-badge {
//             align-self: flex-start !important;
//             font-size: 11px !important;
//             padding: 4px 10px !important;
//           }
//         }
//       `}</style>

//       <h2 style={{ marginBottom: '6px', color: colors.textMain }}>⏳ Emergency Alert Logs History</h2>
//       <p style={{ color: colors.textMuted, marginBottom: '25px', fontSize: '14px' }}>Chronological records of all SOS triggers and communication streams broadcasted from your profile.</p>

//       <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//         {historyData.length === 0 ? (
//           <div style={{ padding: '30px', textAlign: 'center', color: colors.textMuted, border: `1px dashed ${colors.cardBorder}`, borderRadius: '10px' }}>
//             📭 No emergency records found in the database yet.
//           </div>
//         ) : (
//           historyData.map((log) => (
//             <div 
//               key={log.id} 
//               className="alert-card"
//               style={{ 
//                 backgroundColor: colors.cardBg, 
//                 padding: '16px 20px', 
//                 borderRadius: '10px', 
//                 border: `1px solid ${colors.cardBorder}`, 
//                 display: 'flex', 
//                 justifyContent: 'space-between', 
//                 alignItems: 'center',
//                 boxShadow: isDark ? '0 4px 6px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.05)',
//                 transition: 'all 0.3s ease'
//               }}
//             >
//               <div>
//                 <h4 
//                   className="alert-title"
//                   style={{ 
//                     color: log.severity === 'Critical' ? colors.criticalText : colors.normalText, 
//                     fontSize: '15px', 
//                     fontWeight: '600',
//                     margin: '0 0 4px 0'
//                   }}
//                 >
//                   🚨 {log.severity || 'SOS'} Alert: {log.description || 'No Description'}
//                 </h4>
//                 <p 
//                   className="alert-meta"
//                   style={{ fontSize: '12px', color: colors.textMuted, margin: 0 }}
//                 >
//                   📅 {log.created_at ? formatTime(log.created_at) : (log.timestamp || 'Just now')} | 📍 {log.location || log.area || 'Unknown Location'}
//                 </p>
//               </div>
              
//               <span 
//                 className="alert-badge"
//                 style={{ 
//                   backgroundColor: log.severity === 'Critical' ? colors.criticalBg : colors.normalBg,
//                   color: log.severity === 'Critical' ? colors.criticalText : colors.normalText,
//                   padding: '4px 12px', 
//                   borderRadius: '20px', 
//                   fontSize: '12px', 
//                   fontWeight: '600',
//                   whiteSpace: 'nowrap'
//                 }}
//               >
//                 {log.severity || 'Active'}
//               </span>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default AlertHistoryPage;







// src/pages/LiveLocationPage.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// ম্যাপ সেন্টার ফিক্সার - এটি সবসময় লোকেশনকে ফোকাসে রাখবে
function MapCenterFixer({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 16);
    }
  }, [position, map]);
  return null;
}

function LiveLocationPage() {
  const [locationData, setLocationData] = useState({ 
    area: 'Syncing Location...', latitude: 23.8812, longitude: 90.4071, updatedAt: 'Now' 
  });
  const [syncing, setSyncing] = useState(false);
  
  // 🔗 ব্যাকএন্ড লিংক ঠিক করা হয়েছে
  const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';
  
  // 🔐 লোকাল স্টোরেজ থেকে সিকিউরিটি টোকেন নেওয়া হলো
  const token = localStorage.getItem('token');

  const handleLocationUpdate = async (lat, lng) => {
    setSyncing(true);
    try {
      // Nominatim এপিআই থেকে এলাকা বের করা
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const geo = await res.json();
      const area = geo.display_name || `📍 (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

      // 🛡️ ব্যাকএন্ডে আপডেট (টোকেন সহ)
      if (token) {
        await fetch(`${backendUrl}/api/location/update`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // পাহারাদারের জন্য অ্যাক্সেস কার্ড
          },
          body: JSON.stringify({ latitude: lat, longitude: lng, area })
        });
      } else {
        console.warn("User not authenticated, location saved locally only.");
      }

      setLocationData({ area, latitude: lat, longitude: lng, updatedAt: new Date().toLocaleTimeString() });
    } catch (err) {
      console.error("Location update failed:", err);
    } finally {
      setSyncing(false);
    }
  };

  const triggerGPSUpdate = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    setSyncing(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => handleLocationUpdate(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        setSyncing(false);
        alert("GPS signal weak, but we have pinned your approximate location.");
        if(err.coords) handleLocationUpdate(err.coords.latitude, err.coords.longitude);
      },
      options
    );
  };

  return (
    <div style={{ 
      padding: '16px', 
      background: '#fff', 
      borderRadius: '16px', 
      border: '1px solid #e2e8f0',
      width: '100%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px' // কন্টেন্টগুলোর মাঝে সুন্দর স্পেস রাখার জন্য
    }}>
      {/* 🗺️ ম্যাপ কন্টেইনার ফিক্স: মোবাইল স্ক্রিনে এটি যাতে ওভারফ্লো না করে */}
      <div style={{ 
        height: '200px', 
        width: '100%', 
        borderRadius: '12px', 
        overflow: 'hidden',
        position: 'relative',
        zIndex: 0
      }}>
        <MapContainer 
          center={[locationData.latitude, locationData.longitude]} 
          zoom={16} 
          style={{ height: '100%', width: '100%', borderRadius: '12px' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[locationData.latitude, locationData.longitude]} />
          <MapCenterFixer position={[locationData.latitude, locationData.longitude]} />
        </MapContainer>
      </div>

      {/* বাটন কন্টেইনার */}
      <div style={{ width: '100%' }}>
        <button 
          onClick={triggerGPSUpdate} disabled={syncing}
          style={{ 
            width: '100%', 
            padding: '12px', 
            background: '#059669', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '10px', 
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold',
            boxSizing: 'border-box'
          }}
        >
          {syncing ? "📡 Mapping..." : "🎯 PIN LIVE LOCATION"}
        </button>
      </div>

      {/* টেক্সট এরিয়া - লম্বা এড্রেস হলেও যাতে ভেঙে নিচে চলে আসে */}
      <div style={{ 
        width: '100%', 
        wordBreak: 'break-word', 
        whiteSpace: 'normal' 
      }}>
        <p style={{ 
          fontSize: '12px', 
          color: '#475569', 
          margin: 0,
          lineHeight: '1.5'
        }}>
          <strong>Area:</strong> {locationData.area}
        </p>
      </div>
    </div>
  );
}

export default LiveLocationPage;