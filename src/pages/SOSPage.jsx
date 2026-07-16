
// // src/pages/SOSPage.jsx
// import React, { useState, useEffect } from 'react';
// import emailjs from '@emailjs/browser'; // 📧 EmailJS ইমপোর্ট করা হলো

// function SOSPage({ theme = 'light' }) {
//   const [sosLoading, setSosLoading] = useState(false);
//   const [statusText, setStatusText] = useState('System Ready to Broadcast');
//   const [contacts, setContacts] = useState([]); // 👥 কন্টাক্ট স্টেট যোগ করা হলো

//   // 🎨 কালার থিম কনফিগারেশন (ডার্ক ও লাইট মোড)
//   const isDark = theme === 'dark';
//   const colors = {
//     pageBg: isDark ? '#0b1321' : '#f8fafc',
//     cardBg: isDark ? '#1a2436' : '#ffffff',
//     cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
//     textMain: isDark ? '#f1f5f9' : '#0f172a',
//     textMuted: isDark ? '#94a3b8' : '#64748b',
//     statusBg: isDark ? '#0f172a' : '#f1f5f9',
//     danger: '#ef4444',
//     dangerDark: '#991b1b',
//     dangerLight: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
//     success: '#10b981',
//     shadow: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(15, 23, 42, 0.04)',
//   };

//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');
//   // 🌐 ডায়নামিক ব্যাকঅ্যান্ড URL সেটআপ
//   const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

//   // 👥 קন্টাক্ট লিস্ট ফেচ করা (ইমেইল পাঠানোর জন্য প্রয়োজন)
//   useEffect(() => {
//     if (userId && token) {
//       fetch(`${backendUrl}/api/contacts?userId=${userId}`, {
//         method: 'GET',
//         headers: { 'Authorization': `Bearer ${token}` }
//       })
//       .then(res => res.json())
//       .then(data => {
//         if (Array.isArray(data)) setContacts(data);
//         else if (data && Array.isArray(data.data)) setContacts(data.data);
//       })
//       .catch(err => console.error("Error fetching contacts:", err));
//     }
//   }, [userId, token, backendUrl]);

//   // 📍 লাইভ জিপিএস লোকেশন ট্র্যাকিং, ডাটাবেজ আপডেট ও ইমেইল পাঠানো
//   const handleSosTrigger = () => {
//     if (!navigator.geolocation) {
//       alert("System Limitation: Geolocation protocols are not supported by this browser client.");
//       return;
//     }

//     if (!userId) {
//       alert("Authentication Requirement: Active session not found. Re-authenticate prior to initializing SOS.");
//       return;
//     }

//     setSosLoading(true);
//     setStatusText('Resolving Global Positioning Coordinates...');

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        
//         console.log("📍 Captured GPS Coordinates:", latitude, longitude);

//         // ১. লোকেশন আপডেট
//         fetch(`${backendUrl}/api/location/update`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': token ? `Bearer ${token}` : ''
//           },
//           body: JSON.stringify({ userId, latitude, longitude, area: "SOS System Main Dashboard Trigger" })
//         })
//           .then((res) => {
//             if (!res.ok) throw new Error("Location telemetry update failed");
//             return res.json();
//           })
//           .then((resData) => {
//             console.log("✅ Location Synced");
//             setStatusText('Compiling Matrix Incident Logs...');
//             // ২. রিপোর্ট জেনারেট
//             return fetch(`${backendUrl}/api/report`, {
//               method: 'POST',
//               headers: { 
//                 'Content-Type': 'application/json',
//                 'Authorization': token ? `Bearer ${token}` : ''
//               },
//               body: JSON.stringify({
//                 userId,
//                 location: "SOS Operational Center",
//                 severity: "CRITICAL",
//                 description: `Emergency distress event initialized. Satellite Link: ${googleMapsLink}`
//               })
//             });
//           })
//           .then((reportRes) => {
//             if (!reportRes.ok) throw new Error("Incident log generation failed");
//             return reportRes.json();
//           })
//           .then(() => {
//             setStatusText('Executing Emergency Node Dispatches...');
//             // ৩. SOS ট্রিগার হিস্ট্রি সেভ
//             return fetch(`${backendUrl}/api/sos/trigger`, {
//               method: 'POST',
//               headers: { 
//                 'Content-Type': 'application/json',
//                 'Authorization': token ? `Bearer ${token}` : ''
//               },
//               body: JSON.stringify({
//                 userId, latitude, longitude, mapLink: googleMapsLink, area: "SOS Core Verification Nexus"
//               })
//             });
//           })
//           .then((res) => res.json())
//           .then(() => {
//             setStatusText('Transmitting Encrypted Emails...');
//             // 📧 ৪. EmailJS দিয়ে কন্টাক্টদের মেইল পাঠানো
//             if (contacts && contacts.length > 0) {
//               const emailPromises = contacts.map((person) => {
//                 if (!person.email) return Promise.resolve(); 

//                 const templateParams = {
//                   user_name: "User",
//                   to_email: person.email,
//                   area: "SOS Core Verification Nexus",
//                   latitude: latitude,
//                   longitude: longitude
//                 };

//                 return emailjs.send(
//                   'service_8n0i8gk',      // Service ID
//                   'tot9vs7',              // Template ID
//                   templateParams,
//                   'hZ2bKqFAKIbDR_TyU'     // Public Key
//                 );
//               });

//               return Promise.all(emailPromises);
//             }
//           })
//           .then(() => {
//             setSosLoading(false);
//             setStatusText('BROADCAST COMPLETELY SUCCESSFUL');
//             alert(`CRITICAL EMERGENCY SOS OVERRIDE ACTIVATED\n\nCoordinates Redirect & Emails Sent: ${googleMapsLink}`);
//           })
//           .catch((err) => {
//             console.error("❌ Error:", err);
//             setSosLoading(false);
//             setStatusText('BROADCAST INITIALIZED (Fallback Mode)');
//             alert(`EMERGENCY SOS ACTIVATED (Fallback Mode - Email may have failed)\n\nLocal Coordinates: ${googleMapsLink}`);
//           });
//       },
//       (error) => {
//         setSosLoading(false);
//         setStatusText('Satellite Hardware Interrupted');
//         alert("Hardware Restriction: Ensure browser location permissions are enabled.");
//       },
//       { enableHighAccuracy: true, timeout: 12000 }
//     );
//   };

//   return (
//     <div style={{ padding: '50px 20px', textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: colors.pageBg, minHeight: '100vh', boxSizing: 'border-box', transition: 'background-color 0.3s' }}>
      
//       {/* 🔮 CSS DYNAMIC RADAR PULSE EFFECT */}
//       <style>{`
//         @keyframes radarPulse {
//           0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6), 0 0 0 0 rgba(239, 68, 68, 0.4); }
//           50% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0.2), 0 0 0 40px rgba(239, 68, 68, 0.1); }
//           100% { box-shadow: 0 0 0 40px rgba(239, 68, 68, 0), 0 0 0 80px rgba(239, 68, 68, 0); }
//         }
//         @keyframes loadingSpin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//         .sos-btn {
//           position: relative;
//         }
//         .sos-btn::before {
//           content: '';
//           position: absolute;
//           top: -10px; left: -10px; right: -10px; bottom: -10px;
//           border-radius: 50%;
//           border: 2px dashed ${colors.danger};
//           opacity: 0.3;
//           animation: ${sosLoading ? 'loadingSpin 4s linear infinite' : 'none'};
//         }
//         .sos-active-pulse {
//           animation: ${sosLoading ? 'none' : 'radarPulse 2.5s infinite'};
//         }
//       `}</style>

//       <div style={{ maxWidth: '540px', margin: '0 auto', background: colors.cardBg, padding: '50px 40px', borderRadius: '32px', border: `1px solid ${colors.cardBorder}`, boxShadow: `0 15px 40px ${colors.shadow}`, position: 'relative', overflow: 'hidden' }}>
        
//         {/* Background Accent glow */}
//         <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px', background: colors.dangerLight, filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }}></div>

//         {/* HEADER BLOCK */}
//         <div style={{ marginBottom: '45px', position: 'relative', zIndex: 2 }}>
//           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', backgroundColor: colors.dangerLight, color: colors.danger, borderRadius: '20px', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
//             <span style={{ width: '8px', height: '8px', backgroundColor: colors.danger, borderRadius: '50%', display: 'inline-block', animation: 'loadingSpin 2s infinite' }}></span>
//             Emergency Core
//           </div>
//           <h2 style={{ fontSize: '30px', fontWeight: '900', color: colors.textMain, margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>Distress Protocol</h2>
//           <p style={{ fontSize: '14.5px', color: colors.textMuted, margin: 0, fontWeight: '500', lineHeight: '1.6' }}>
//             Activating the core will instantly broadcast your live geodetic matrix to all trusted guardians and local authorities.
//           </p>
//         </div>
        
//         {/* 🔴 LIVE PULSE BIG RED BUTTON */}
//         <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 45px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
//           <button 
//             onClick={sosLoading ? null : handleSosTrigger}
//             className="sos-btn sos-active-pulse"
//             style={{ 
//               width: '170px', 
//               height: '170px', 
//               backgroundColor: sosLoading ? colors.dangerDark : colors.danger, 
//               borderRadius: '50%', 
//               display: 'flex', 
//               flexDirection: 'column',
//               gap: '10px',
//               alignItems: 'center', 
//               justifyContent: 'center', 
//               color: '#ffffff', 
//               fontSize: '28px', 
//               fontWeight: '900', 
//               letterSpacing: '2px',
//               cursor: sosLoading ? 'not-allowed' : 'pointer',
//               border: `6px solid ${colors.cardBg}`,
//               outline: 'none',
//               boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4), inset 0 -5px 15px rgba(0,0,0,0.2)',
//               transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//               userSelect: 'none',
//               WebkitTapHighlightColor: 'transparent',
//               position: 'relative'
//             }}
//             onMouseDown={(e) => !sosLoading && (e.currentTarget.style.transform = 'scale(0.94)')}
//             onMouseUp={(e) => !sosLoading && (e.currentTarget.style.transform = 'scale(1)')}
//             onMouseLeave={(e) => !sosLoading && (e.currentTarget.style.transform = 'scale(1)')}
//           >
//             {sosLoading ? (
//               <>
//                 <div style={{ width: '26px', height: '26px', border: '3px solid rgba(255,255,255,0.2)', borderTop: '3px solid #ffffff', borderRadius: '50%', animation: 'loadingSpin 0.8s linear infinite' }}></div>
//                 <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px', opacity: 0.9 }}>DISPATCHING</span>
//               </>
//             ) : (
//               <>
//                 <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
//                 </svg>
//                 SOS
//               </>
//             )}
//           </button>
//         </div>
        
//         {/* TELEMETRY & STATUS METRICS */}
//         <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 2, position: 'relative' }}>
          
//           <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
//             <div style={{ flex: 1, backgroundColor: colors.statusBg, padding: '12px', borderRadius: '16px', border: `1px solid ${colors.cardBorder}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <div style={{ width: '10px', height: '10px', backgroundColor: colors.success, borderRadius: '50%' }}></div>
//               <div style={{ textAlign: 'left' }}>
//                 <div style={{ fontSize: '10px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase' }}>GPS Uplink</div>
//                 <div style={{ fontSize: '13px', fontWeight: '800', color: colors.textMain }}>Secured</div>
//               </div>
//             </div>
            
//             <div style={{ flex: 1, backgroundColor: colors.statusBg, padding: '12px', borderRadius: '16px', border: `1px solid ${colors.cardBorder}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <div style={{ width: '10px', height: '10px', backgroundColor: colors.success, borderRadius: '50%' }}></div>
//               <div style={{ textAlign: 'left' }}>
//                 <div style={{ fontSize: '10px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase' }}>Network Node</div>
//                 <div style={{ fontSize: '13px', fontWeight: '800', color: colors.textMain }}>Active</div>
//               </div>
//             </div>
//           </div>

//           <div style={{ padding: '16px', backgroundColor: colors.statusBg, borderRadius: '16px', border: `1px solid ${colors.cardBorder}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
//             <span style={{ fontSize: '11px', fontWeight: '800', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>
//               Terminal Broadcast Status
//             </span>
//             <span style={{ fontSize: '15px', fontWeight: '800', color: sosLoading ? colors.danger : colors.textMain, letterSpacing: '-0.3px', textAlign: 'center' }}>
//               {statusText}
//             </span>
//           </div>

//         </div>

//         {/* DISCLAIMER FOOTER */}
//         <p style={{ fontSize: '11px', color: colors.textMuted, margin: '25px 0 0 0', fontWeight: '600', opacity: 0.7 }}>
//           ⚠️ Warning: False triggering of the emergency protocol may result in network suspension. Use only in critical situations.
//         </p>

//       </div>
//     </div>
//   );
// }

// export default SOSPage;









// src/pages/SOSPage.jsx
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser'; // 📧 EmailJS ইমপোর্ট করা হলো

function SOSPage({ theme = 'light' }) {
  const [sosLoading, setSosLoading] = useState(false);
  const [statusText, setStatusText] = useState('System Ready to Broadcast');
  const [contacts, setContacts] = useState([]); // 👥 কন্টাক্ট স্টেট যোগ করা হলো

  // 🎨 কালার থিম কনফিগারেশন (ডার্ক ও লাইট মোড)
  const isDark = theme === 'dark';
  const colors = {
    pageBg: isDark ? '#0b1321' : '#f8fafc',
    cardBg: isDark ? '#1a2436' : '#ffffff',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
    textMain: isDark ? '#f1f5f9' : '#0f172a',
    textMuted: isDark ? '#94a3b8' : '#64748b',
    statusBg: isDark ? '#0f172a' : '#f1f5f9',
    danger: '#ef4444',
    dangerDark: '#991b1b',
    dangerLight: isDark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
    success: '#10b981',
    shadow: isDark ? 'rgba(0, 0, 0, 0.5)' : 'rgba(15, 23, 42, 0.04)',
  };

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  // 🌐 ডায়নামিক ব্যাকঅ্যান্ড URL সেটআপ
  const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

  // 👥 קন্টাক্ট লিস্ট ফেচ করা (ইমেইল পাঠানোর জন্য প্রয়োজন)
  useEffect(() => {
    if (userId && token) {
      fetch(`${backendUrl}/api/contacts?userId=${userId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setContacts(data);
        else if (data && Array.isArray(data.data)) setContacts(data.data);
      })
      .catch(err => console.error("Error fetching contacts:", err));
    }
  }, [userId, token, backendUrl]);

  // 📍 লাইভ জিপিএস লোকেশন ট্র্যাকিং, ডাটাবেজ আপডেট ও ইমেইল পাঠানো
  const handleSosTrigger = () => {
    if (!navigator.geolocation) {
      alert("System Limitation: Geolocation protocols are not supported by this browser client.");
      return;
    }

    if (!userId) {
      alert("Authentication Requirement: Active session not found. Re-authenticate prior to initializing SOS.");
      return;
    }

    setSosLoading(true);
    setStatusText('Resolving Global Positioning Coordinates...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        
        console.log("📍 Captured GPS Coordinates:", latitude, longitude);

        // ১. লোকেশন আপডেট
        fetch(`${backendUrl}/api/location/update`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': token ? `Bearer ${token}` : ''
          },
          body: JSON.stringify({ userId, latitude, longitude, area: "SOS System Main Dashboard Trigger" })
        })
          .then((res) => {
            if (!res.ok) throw new Error("Location telemetry update failed");
            return res.json();
          })
          .then((resData) => {
            console.log("✅ Location Synced");
            setStatusText('Compiling Matrix Incident Logs...');
            // ২. রিপোর্ট জেনারেট
            return fetch(`${backendUrl}/api/report`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
              },
              body: JSON.stringify({
                userId,
                location: "SOS Operational Center",
                severity: "CRITICAL",
                description: `Emergency distress event initialized. Satellite Link: ${googleMapsLink}`
              })
            });
          })
          .then((reportRes) => {
            if (!reportRes.ok) throw new Error("Incident log generation failed");
            return reportRes.json();
          })
          .then(() => {
            setStatusText('Executing Emergency Node Dispatches...');
            // ৩. SOS ট্রিগার হিস্ট্রি সেভ
            return fetch(`${backendUrl}/api/sos/trigger`, {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
              },
              body: JSON.stringify({
                userId, latitude, longitude, mapLink: googleMapsLink, area: "SOS Core Verification Nexus"
              })
            });
          })
          .then((res) => res.json())
          .then(() => {
            setStatusText('Transmitting Encrypted Emails...');
            // 📧 ৪. EmailJS দিয়ে কন্টাক্টদের মেইল পাঠানো
            if (contacts && contacts.length > 0) {
              const emailPromises = contacts.map((person) => {
                if (!person.email) return Promise.resolve(); 

                // 🟢 ঠিক করা templateParams
                const templateParams = {
                  user_name: "Kotha", // সাবজেক্টের জন্য
                  to_email: person.email,
                  name: "Kotha", // ইমেইলের বডির জন্য
                  message: `Emergency Triggered! Track my live location here: ${googleMapsLink}`,
                  time: new Date().toLocaleString(),
                  email: person.email,
                  area: "SOS Core Verification Nexus",
                  latitude: latitude,
                  longitude: longitude
                };

                // 🟢 ঠিক করা Service ID, Template ID এবং Public Key
                return emailjs.send(
                   'service_8n0i8gk',      // Service ID
                'template_ppnnfio',     // Template ID (সঠিক আইডি দেওয়া হলো)
                templateParams,
                'hZ2bKqFAKIbDR_TyU'     // Public Key (সঠিকটি দেওয়া হলো)
                );
              });

              return Promise.all(emailPromises);
            }
          })
          .then(() => {
            setSosLoading(false);
            setStatusText('BROADCAST COMPLETELY SUCCESSFUL');
            alert(`CRITICAL EMERGENCY SOS OVERRIDE ACTIVATED\n\nCoordinates Redirect & Emails Sent: ${googleMapsLink}`);
          })
          .catch((err) => {
            console.error("❌ Error:", err);
            setSosLoading(false);
            setStatusText('BROADCAST INITIALIZED (Fallback Mode)');
            alert(`EMERGENCY SOS ACTIVATED (Fallback Mode - Email may have failed)\n\nLocal Coordinates: ${googleMapsLink}`);
          });
      },
      (error) => {
        setSosLoading(false);
        setStatusText('Satellite Hardware Interrupted');
        alert("Hardware Restriction: Ensure browser location permissions are enabled.");
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  return (
    <div style={{ padding: '50px 20px', textAlign: 'center', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: colors.pageBg, minHeight: '100vh', boxSizing: 'border-box', transition: 'background-color 0.3s' }}>
      
      {/* 🔮 CSS DYNAMIC RADAR PULSE EFFECT */}
      <style>{`
        @keyframes radarPulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6), 0 0 0 0 rgba(239, 68, 68, 0.4); }
          50% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0.2), 0 0 0 40px rgba(239, 68, 68, 0.1); }
          100% { box-shadow: 0 0 0 40px rgba(239, 68, 68, 0), 0 0 0 80px rgba(239, 68, 68, 0); }
        }
        @keyframes loadingSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .sos-btn {
          position: relative;
        }
        .sos-btn::before {
          content: '';
          position: absolute;
          top: -10px; left: -10px; right: -10px; bottom: -10px;
          border-radius: 50%;
          border: 2px dashed ${colors.danger};
          opacity: 0.3;
          animation: ${sosLoading ? 'loadingSpin 4s linear infinite' : 'none'};
        }
        .sos-active-pulse {
          animation: ${sosLoading ? 'none' : 'radarPulse 2.5s infinite'};
        }
      `}</style>

      <div style={{ maxWidth: '540px', margin: '0 auto', background: colors.cardBg, padding: '50px 40px', borderRadius: '32px', border: `1px solid ${colors.cardBorder}`, boxShadow: `0 15px 40px ${colors.shadow}`, position: 'relative', overflow: 'hidden' }}>
        
        {/* Background Accent glow */}
        <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px', background: colors.dangerLight, filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }}></div>

        {/* HEADER BLOCK */}
        <div style={{ marginBottom: '45px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', backgroundColor: colors.dangerLight, color: colors.danger, borderRadius: '20px', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '16px' }}>
            <span style={{ width: '8px', height: '8px', backgroundColor: colors.danger, borderRadius: '50%', display: 'inline-block', animation: 'loadingSpin 2s infinite' }}></span>
            Emergency Core
          </div>
          <h2 style={{ fontSize: '30px', fontWeight: '900', color: colors.textMain, margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>Distress Protocol</h2>
          <p style={{ fontSize: '14.5px', color: colors.textMuted, margin: 0, fontWeight: '500', lineHeight: '1.6' }}>
            Activating the core will instantly broadcast your live geodetic matrix to all trusted guardians and local authorities.
          </p>
        </div>
        
        {/* 🔴 LIVE PULSE BIG RED BUTTON */}
        <div style={{ position: 'relative', width: '220px', height: '220px', margin: '0 auto 45px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
          <button 
            onClick={sosLoading ? null : handleSosTrigger}
            className="sos-btn sos-active-pulse"
            style={{ 
              width: '170px', 
              height: '170px', 
              backgroundColor: sosLoading ? colors.dangerDark : colors.danger, 
              borderRadius: '50%', 
              display: 'flex', 
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center', 
              justifyContent: 'center', 
              color: '#ffffff', 
              fontSize: '28px', 
              fontWeight: '900', 
              letterSpacing: '2px',
              cursor: sosLoading ? 'not-allowed' : 'pointer',
              border: `6px solid ${colors.cardBg}`,
              outline: 'none',
              boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4), inset 0 -5px 15px rgba(0,0,0,0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
              position: 'relative'
            }}
            onMouseDown={(e) => !sosLoading && (e.currentTarget.style.transform = 'scale(0.94)')}
            onMouseUp={(e) => !sosLoading && (e.currentTarget.style.transform = 'scale(1)')}
            onMouseLeave={(e) => !sosLoading && (e.currentTarget.style.transform = 'scale(1)')}
          >
            {sosLoading ? (
              <>
                <div style={{ width: '26px', height: '26px', border: '3px solid rgba(255,255,255,0.2)', borderTop: '3px solid #ffffff', borderRadius: '50%', animation: 'loadingSpin 0.8s linear infinite' }}></div>
                <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px', opacity: 0.9 }}>DISPATCHING</span>
              </>
            ) : (
              <>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                SOS
              </>
            )}
          </button>
        </div>
        
        {/* TELEMETRY & STATUS METRICS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 2, position: 'relative' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
            <div style={{ flex: 1, backgroundColor: colors.statusBg, padding: '12px', borderRadius: '16px', border: `1px solid ${colors.cardBorder}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: colors.success, borderRadius: '50%' }}></div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase' }}>GPS Uplink</div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: colors.textMain }}>Secured</div>
              </div>
            </div>
            
            <div style={{ flex: 1, backgroundColor: colors.statusBg, padding: '12px', borderRadius: '16px', border: `1px solid ${colors.cardBorder}`, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '10px', height: '10px', backgroundColor: colors.success, borderRadius: '50%' }}></div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase' }}>Network Node</div>
                <div style={{ fontSize: '13px', fontWeight: '800', color: colors.textMain }}>Active</div>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px', backgroundColor: colors.statusBg, borderRadius: '16px', border: `1px solid ${colors.cardBorder}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Terminal Broadcast Status
            </span>
            <span style={{ fontSize: '15px', fontWeight: '800', color: sosLoading ? colors.danger : colors.textMain, letterSpacing: '-0.3px', textAlign: 'center' }}>
              {statusText}
            </span>
          </div>

        </div>

        {/* DISCLAIMER FOOTER */}
        <p style={{ fontSize: '11px', color: colors.textMuted, margin: '25px 0 0 0', fontWeight: '600', opacity: 0.7 }}>
          ⚠️ Warning: False triggering of the emergency protocol may result in network suspension. Use only in critical situations.
        </p>

      </div>
    </div>
  );
}

export default SOSPage;