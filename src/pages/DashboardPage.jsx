

// ////eitavalo code but dark mode e hs er image er colour mixmatched 


// // src/pages/DashboardPage.jsx
// import React, { useState, useEffect } from 'react'; 
// import heroBgImage from '../assets/hero-bg.png'; 
// import ReportIncident from './ReportIncident.jsx'; 
// import LiveLocationPage from './LiveLocationPage.jsx'; 
// import emailjs from '@emailjs/browser'; 

// function DashboardPage({ setActiveView, theme }) {
//   const [contacts, setContacts] = useState([]); 
//   const [loading, setLoading] = useState(true);
  
//   const [reports, setReports] = useState([]);
//   const [reportsLoading, setReportsLoading] = useState(true);
//   const [sosLoading, setSosLoading] = useState(false); 

//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');
//   const backendUrl = 'https://rescue-her-back-1.onrender.com';

//   const isDark = theme === 'dark'; 

//   const fetchContacts = () => {
//     if (!userId || !token) {
//       setLoading(false);
//       return;
//     }

//     fetch(`${backendUrl}/api/contacts?userId=${userId}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("Unauthorized Contacts Fetch");
//         return response.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setContacts(data);
//         } else if (data && Array.isArray(data.data)) {
//           setContacts(data.data);
//         } else {
//           setContacts([]);
//         }
//         setTimeout(() => setLoading(false), 500); // UI Smoothness
//       })
//       .catch((err) => {
//         console.error("❌ Backend connection failed (Contacts):", err);
//         setContacts([]);
//         setLoading(false);
//       });
//   };

//   const fetchUserReports = () => {
//     if (!userId || !token) {
//       setReportsLoading(false);
//       return;
//     }

//     fetch(`${backendUrl}/api/reports?userId=${userId}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Unauthorized Reports Fetch");
//         return res.json();
//       })
//       .then((data) => {
//         setReports(Array.isArray(data) ? data : []);
//         setReportsLoading(false);
//       })
//       .catch((err) => {
//         console.error("❌ Failed to fetch alert history:", err);
//         setReports([]);
//         setReportsLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchContacts();
//     fetchUserReports(); 
//   }, [userId, token]);

//   const handleSosTrigger = () => {
//     if (!navigator.geolocation) {
//       alert("⚠️ Geolocation is not supported by your browser!");
//       return;
//     }

//     if (!userId || !token) {
//       alert("🚨 Authentication Error: User session not found. Please log in again.");
//       return;
//     }

//     setSosLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const googleMapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        
//         fetch(`${backendUrl}/api/location/update`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({ userId, latitude, longitude, area: "Dashboard SOS Trigger" })
//         })
//         .then(() => {
//           return fetch(`${backendUrl}/api/sos/trigger`, {
//             method: 'POST',
//             headers: { 
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               area: "Dashboard Security Hub"
//             })
//           });
//         })
//         .then((res) => res.json())
//         .then(() => {
//           if (contacts && contacts.length > 0) {
//             const emailPromises = contacts.map((person) => {
//               if (!person.email) return Promise.resolve(); 

//               const templateParams = {
//                 user_name: "User", 
//                 to_email: person.email,
//                 name: person.name || "Guardian",
//                 message: `Emergency Triggered! Track my live location here: ${googleMapsLink}`,
//                 time: new Date().toLocaleString(),
//                 email: person.email,
//                 area: "Dashboard Security Hub",
//                 latitude: latitude,
//                 longitude: longitude
//               };

//               return emailjs.send(
//                 'service_8n0i8gk',      
//                 'template_ppnnfio',     
//                 templateParams,
//                 'hZ2bKqFAKIbDR_TyU'     
//               );
//             });

//             return Promise.all(emailPromises);
//           }
//         })
//         .then(() => {
//           setSosLoading(false);
//           alert(`🚨 EMERGENCY SOS ACTIVATED!\n\nLocation logged & Emergency alerts dispatched to your trusted networks via Email!\n\nTrack here: ${googleMapsLink}`);
//           fetchUserReports(); 
//         })
//         .catch((err) => {
//           console.error("❌ Failed to complete SOS chain:", err);
//           setSosLoading(false);
//           alert(`🚨 EMERGENCY SOS TRIGGERED (Offline/Email Error)!\nMaps Link: ${googleMapsLink}`);
//         });
//       },
//       (error) => {
//         setSosLoading(false);
//         alert("⚠️ Could not fetch your location. Please check browser location permissions!");
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   };

//   const colors = {
//     cardBg: isDark ? '#111a16' : '#ffffff',
//     cardBorder: isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.12)',
//     primaryText: isDark ? '#f8fafc' : '#093325',
//     secondaryText: isDark ? '#a2b7b0' : '#5c726a',
//     innerBoxBg: isDark ? '#16231f' : '#fcfcfb',
//     contactsPanelBg: isDark ? 'linear-gradient(135deg, #181111, #111a16)' : '#fff5f5'
//   };

//   // ✅ রেসপনসিভ কার্ড লেআউট স্টাইল
//   const premiumCardStyle = {
//     backgroundColor: colors.cardBg, 
//     padding: '24px', 
//     borderRadius: '20px', 
//     border: `1px solid ${colors.cardBorder}`, 
//     boxShadow: isDark ? '0 8px 30px rgba(0, 0, 0, 0.2)' : '0 8px 30px rgba(9, 51, 37, 0.03)', 
//     display: 'flex', 
//     flexDirection: 'column',
//     transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//     width: '100%',            // Card will take full width of grid cell
//     boxSizing: 'border-box',  // Prevents padding from breaking width
//     overflow: 'hidden'        // Prevents child elements from bleeding out
//   };

//   return (
//     <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: isDark ? '#0a120f' : '#f3faf7', justifyContent: 'space-between', transition: 'all 0.3s ease' }}>
      
//       {/* 📱 Advanced Mobile Responsive Styles */}
//       <style>{`
//         @keyframes sosPulse {
//           0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
//           70% { transform: scale(0.95); box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
//           100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
//         }
//         @keyframes borderGlow {
//           0% { border-color: rgba(16, 185, 129, 0.25); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
//           50% { border-color: rgba(255, 182, 193, 0.5); box-shadow: 0 8px 30px rgba(16, 185, 129, 0.08); }
//           100% { border-color: rgba(16, 185, 129, 0.25); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
//         }
//         .animated-sos {
//           animation: sosPulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
//         }
//         .grid-card-hover {
//           transition: all 0.3s ease;
//           ${isDark ? 'animation: borderGlow 4s infinite ease-in-out;' : ''}
//         }
//         .grid-card-hover:hover {
//           transform: translateY(-4px);
//           box-shadow: ${isDark ? '0 12px 35px rgba(16, 185, 129, 0.15) !important' : '0 12px 35px rgba(16, 185, 129, 0.08) !important'};
//           border-color: #10b981 !important;
//         }

//         /* 📱 Responsive Grid System - Forces Vertical Stack on Small Screens */
//         .bottom-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//           gap: 24px;
//           margin-top: 28px;
//           width: 100%;
//         }

//         /* 📱 Mobile Specific Media Queries */
//         @media (max-width: 768px) {
//           .dashboard-container {
//             padding: 16px 10px !important;
//           }
//           .hero-grid {
//             padding: 30px 24px !important;
//             min-height: auto !important;
//             flex-direction: column !important;
//             align-items: flex-start !important;
//             gap: 24px !important;
//           }
//           .hero-bg-overlay {
//             background-size: cover !important;
//             background-position: center right !important;
//             opacity: 0.4 !important;
//           }
//           .hero-gradient-overlay {
//             background: ${isDark 
//               ? 'linear-gradient(to bottom, rgba(17, 26, 22, 0.85) 0%, #111a16 100%)' 
//               : 'linear-gradient(to bottom, rgba(245, 228, 228, 0.8) 0%, #f5e4e4 100%)'} !important;
//           }
//           .hero-left h1 {
//             font-size: 28px !important;
//           }
//           .sos-box {
//             width: 100% !important;
//             justify-content: space-between !important;
//             gap: 12px !important;
//           }
          
//           .quick-contacts-card {
//             padding: 20px 16px !important;
//           }
//           .quick-contacts-card .card-header {
//             flex-direction: column !important;
//             align-items: flex-start !important;
//             gap: 16px !important;
//           }
//           .quick-contacts-card .card-header button {
//             width: 100% !important;
//             padding: 10px !important;
//             text-align: center !important;
//           }

//           /* Force grid to 1 column in mobile to stack perfectly */
//           .bottom-grid {
//             grid-template-columns: 1fr !important; /* 👈 THE MAGIC FIX FOR MOBILE STACK */
//             gap: 20px !important;
//           }

//           .premium-responsive-card {
//             padding: 18px 16px !important;
//           }
//         }

//         @media (max-width: 480px) {
//           .hero-left h1 {
//             font-size: 24px !important;
//           }
//           .sos-box {
//             flex-direction: column !important;
//             align-items: center !important;
//             text-align: center !important;
//             gap: 16px !important;
//           }
//           .status-indicator {
//             width: 100% !important;
//             text-align: center !important;
//             box-sizing: border-box !important;
//           }
//         }
//       `}</style>
        
//       <div style={{ padding: '24px 2%', flexGrow: 1 }}>
          
//         {/* 🏷️ HERO GRID */}
//         <div className="hero-grid" style={{ 
//           backgroundColor: isDark ? '#111a16' : '#f5e4e4', 
//           position: 'relative',
//           padding: '40px 48px', 
//           borderRadius: '24px',
//           marginBottom: '28px',
//           border: `1px solid ${colors.cardBorder}`,
//           minHeight: '280px',
//           display: 'flex',
//           alignItems: 'center',
//           overflow: 'hidden',
//           transition: 'all 0.3s ease'
//         }}>
          
//           <div className="hero-bg-overlay" style={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             bottom: 0,
//             left: 0,
//             backgroundImage: `url(${heroBgImage})`,
//             backgroundSize: 'contain',
//             backgroundPosition: 'right center',
//             backgroundRepeat: 'no-repeat',
//             opacity: isDark ? 0.75 : 1,
//             filter: isDark ? 'brightness(0.85) contrast(1.05) saturate(0.95)' : 'none',
//             zIndex: 1,
//             transition: 'all 0.3s ease'
//           }} />

//           <div className="hero-gradient-overlay" style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: isDark 
//               ? 'linear-gradient(to right, #111a16 0%, #111a16 42%, rgba(17, 26, 22, 0.85) 58%, rgba(17, 26, 22, 0.3) 75%, rgba(17, 26, 22, 0) 95%)'
//               : 'linear-gradient(to right, #f5e4e4 0%, #f5e4e4 40%, rgba(245, 228, 228, 0.5) 65%, rgba(245, 228, 228, 0) 100%)',
//             zIndex: 2,
//             transition: 'all 0.3s ease'
//           }} />

//           {isDark && (
//             <div style={{
//               position: 'absolute',
//               top: 0,
//               right: 0,
//               bottom: 0,
//               left: '45%',
//               background: 'linear-gradient(to right, rgba(17, 26, 22, 0), rgba(16, 185, 129, 0.05))',
//               mixBlendMode: 'color',
//               zIndex: 2,
//               pointerEvents: 'none'
//             }} />
//           )}

//           <div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', position: 'relative', width: '100%' }}>
//             <div className="hero-left" style={{ maxWidth: '480px' }}>
//               <h1 style={{ fontSize: '38px', fontWeight: '800', color: colors.primaryText, lineHeight: '1.2', margin: 0, letterSpacing: '-1.2px', transition: 'all 0.3s' }}>
//                 Your Safety,<br />
//                 <span style={{ fontStyle: 'italic', fontWeight: '400', fontFamily: 'Georgia, serif', color: '#10b981' }}>Our Priority</span>
//               </h1>
//               <p style={{ color: colors.secondaryText, marginTop: '12px', fontSize: '13.5px', fontWeight: '500', lineHeight: '1.6' }}>
//                 Press the SOS button in an emergency. The system will track your location and instantly dispatch alert notifications to your inner networks.
//               </p>
//             </div>
//             <div className="sos-box" style={{ display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.3s' }}>
//               <div className={`sos-button ${sosLoading ? '' : 'animated-sos'}`} 
//                    onClick={sosLoading ? null : handleSosTrigger} 
//                    style={{ 
//                      cursor: sosLoading ? 'not-allowed' : 'pointer', 
//                      margin: '0',
//                      opacity: sosLoading ? 0.7 : 1,
//                      background: 'radial-gradient(circle, #ef4444 0%, #b91c1c 100%)',
//                      boxShadow: '0 0 25px rgba(239, 68, 68, 0.45)',
//                      borderRadius: '50%',
//                      width: '90px',
//                      height: '90px',
//                      display: 'flex',
//                      flexDirection: 'column',
//                      alignItems: 'center',
//                      justifyContent: 'center',
//                      color: '#fff',
//                      transition: 'all 0.3s ease',
//                      flexShrink: 0
//                    }}>
//                 <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '0.5px' }}>{sosLoading ? "..." : "SOS"}</span>
//                 <small style={{ fontSize: '9px', fontWeight: '600', opacity: 0.9, marginTop: '2px' }}>{sosLoading ? "Tracking..." : "Press Help"}</small>
//               </div>
//               <div className="status-indicator" style={{ background: colors.cardBg, padding: '10px 20px', borderRadius: '50px', fontSize: '12px', fontWeight: '700', color: colors.primaryText, border: `1px solid ${colors.cardBorder}`, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', whiteSpace: 'nowrap' }}>
//                 <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', marginRight: '8px', boxShadow: '0 0 8px #10b981' }}></span>
//                 System Active
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 👥 QUICK CONTACTS CARD */}
//         <div className="quick-contacts-card" style={{ padding: '28px', borderRadius: '24px', background: colors.contactsPanelBg, border: `1px solid ${colors.cardBorder}`, transition: 'all 0.3s ease', width: '100%', boxSizing: 'border-box' }}>
//           <div className="card-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
//             <div style={{ textAlign: 'left' }}>
//               <h4 style={{ fontWeight: '800', color: colors.primaryText, margin: 0, fontSize: '18px', letterSpacing: '-0.3px' }}>👥 Trusted Quick Contacts</h4>
//               <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: colors.secondaryText }}>Live synced from your primary contact directory</p>
//             </div>
//             <button 
//               onClick={() => setActiveView('Contacts')}
//               style={{ padding: '8px 18px', background: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '50px', fontSize: '12px', fontWeight: '700', color: colors.primaryText, cursor: 'pointer', transition: 'all 0.2s' }}
//             >
//               ⚙️ Manage Contacts
//             </button>
//           </div>

//           {loading ? (
//             <p style={{ padding: '10px', fontSize: '13px', color: '#10b981', margin: 0, fontStyle: 'italic', fontWeight: '600', textAlign: 'left' }}>⏳ Syncing encrypted communication networks...</p>
//           ) : (!contacts || contacts.length === 0) ? (
//             <div style={{ padding: '40px 10px', textAlign: 'center', background: colors.cardBg, borderRadius: '16px', border: `1px dashed ${colors.cardBorder}` }}>
//               <p style={{ margin: 0, fontSize: '13.5px', color: colors.secondaryText, fontStyle: 'italic' }}>
//                 ⚠️ No emergency networks configured yet.
//               </p>
//               <span onClick={() => setActiveView('Contacts')} style={{ display: 'inline-block', marginTop: '8px', fontSize: '12.5px', color: '#10b981', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>
//                 Click here to add trusted guardians
//               </span>
//             </div>
//           ) : (
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
//               {contacts.map((person) => (
//                 <div className="contact-item" key={person.id || person._id} style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', background: colors.cardBg, borderRadius: '16px', border: `1px solid ${colors.cardBorder}` }}>
//                   <div className="contact-avatar" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginRight: '14px', flexShrink: 0, fontSize: '14px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
//                     {person.name ? person.name.charAt(0).toUpperCase() : '?'}
//                   </div>
//                   <div style={{ textAlign: 'left', overflow: 'hidden' }}>
//                     <h5 style={{ margin: 0, fontSize: '13.5px', fontWeight: '700', color: colors.primaryText, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
//                       <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '120px' }}>{person.name}</span> 
//                       <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '700', background: 'rgba(16, 185, 129, 0.08)', padding: '2px 8px', borderRadius: '50px' }}>{person.role}</span>
//                     </h5>
//                     <p style={{ margin: 0, fontSize: '11.5px', color: colors.secondaryText, marginTop: '5px', fontWeight: '500' }}>📞 {person.phone}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* 📊 BOTTOM GRID CARDS - Now handles proper mobile stacking */}
//         <div className="bottom-grid">
          
//           <div className="grid-card-hover premium-responsive-card" style={{ ...premiumCardStyle, position: 'relative', zIndex: 1 }}>
//             <div style={{ filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%)' : 'none', borderRadius: '14px', overflow: 'hidden', height: '100%', minHeight: '220px', width: '100%' }}>
//               <LiveLocationPage />
//             </div>
//           </div>

//           <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
//             <div className="card-title-bar" style={{ borderBottom: `1px solid ${colors.cardBorder}`, paddingBottom: '12px', marginBottom: '16px', fontWeight: '800', fontSize: '15px', color: colors.primaryText, textAlign: 'left' }}>
//               <span>🛡️ Safety Tips & Guidelines</span>
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1, textAlign: 'left' }}>
//               <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '12px 14px', borderRadius: '12px', borderLeft: '4px solid #ef4444', fontWeight: '600', lineHeight: '1.5' }}>
//                 🚶‍♀️ <strong>Isolated Routes:</strong> Avoid dark routes. Keep your phone in hand but stay aware.
//               </div>
//               <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '12px 14px', borderRadius: '12px', borderLeft: '4px solid #10b981', fontWeight: '600', lineHeight: '1.5' }}>
//                 📱 <strong>Speed Dials:</strong> Memorize quick emergency hotkeys and speed dials (999).
//               </div>
//               <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '10px 14px', borderRadius: '12px', borderLeft: `4px solid ${isDark ? '#10b981' : '#093325'}`, fontWeight: '600', lineHeight: '1.5' }}>
//                 🚗 <strong>Ride Verification:</strong> Verify the license plates and driver profile beforehand.
//               </div>
//             </div>
//           </div>
          
//           <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
//             <div style={{ color: colors.primaryText, width: '100%' }}>
//               <ReportIncident />
//             </div>
//           </div>
          
//           <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
//             <div className="card-title-bar" style={{ borderBottom: `1px solid ${colors.cardBorder}`, paddingBottom: '12px', marginBottom: '16px', fontWeight: '800', fontSize: '15px', color: colors.primaryText, textAlign: 'left' }}>
//               <span>⏳ Your Live Alert History</span>
//             </div>
            
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
//               {reportsLoading ? (
//                 <p style={{ fontSize: '12px', color: colors.secondaryText, textAlign: 'center', fontWeight: '500' }}>Syncing history nodes...</p>
//               ) : (!reports || reports.length === 0) ? (
//                 <p style={{ fontSize: '12px', color: colors.secondaryText, textAlign: 'center', fontStyle: 'italic', padding: '30px 0', fontWeight: '500' }}>
//                   ☘️ Secure Matrix Cleared. No incidents logged.
//                 </p>
//               ) : (
//                 reports.map((report) => {
//                   const isCritical = report.severity === 'CRITICAL' || report.severity === 'High' || report.severity === 'Critical';
//                   const bgStyle = isCritical ? (isDark ? '#2a1414' : '#fef2f2') : (isDark ? '#0e241b' : 'rgba(16, 185, 129, 0.04)');
//                   const borderStyle = isCritical ? (isDark ? '#4c1d1d' : '#fee2e2') : (isDark ? '#113829' : 'rgba(16, 185, 129, 0.12)');
//                   const accentColor = isCritical ? '#ef4444' : '#10b981';
//                   const textColor = isCritical ? (isDark ? '#fca5a5' : '#991b1b') : colors.primaryText;

//                   return (
//                     <div key={report.id || report._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', backgroundColor: bgStyle, borderRadius: '12px', border: `1px solid ${borderStyle}`, borderLeft: `4px solid ${accentColor}`, textAlign: 'left' }}>
//                       <div style={{ maxWidth: '72%' }}>
//                         <span style={{ fontSize: '12.5px', fontWeight: '700', color: textColor, display: 'block' }}>{report.location}</span>
//                         <span style={{ fontSize: '11.5px', color: colors.secondaryText, display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '3px' }}>{report.description}</span>
//                         <span style={{ fontSize: '10px', color: colors.secondaryText, display: 'block', marginTop: '3px', fontWeight: '500' }}>{report.timestamp}</span>
//                       </div>
//                       <span style={{ fontSize: '9px', backgroundColor: accentColor, color: 'white', padding: '4px 8px', borderRadius: '50px', fontWeight: '800', letterSpacing: '0.3px' }}>
//                         {report.severity ? report.severity.toUpperCase() : 'INFO'}
//                       </span>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }

// export default DashboardPage;






//kono rokom cole 


// // src/pages/DashboardPage.jsx
// import React, { useState, useEffect } from 'react'; 
// import heroBgImage from '../assets/hero-bg.png'; 
// import ReportIncident from './ReportIncident.jsx'; 
// import LiveLocationPage from './LiveLocationPage.jsx'; 
// import emailjs from '@emailjs/browser'; 

// function DashboardPage({ setActiveView, theme }) {
//   const [contacts, setContacts] = useState([]); 
//   const [loading, setLoading] = useState(true);
  
//   const [reports, setReports] = useState([]);
//   const [reportsLoading, setReportsLoading] = useState(true);
//   const [sosLoading, setSosLoading] = useState(false); 

//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');
//   const backendUrl = 'https://rescue-her-back-1.onrender.com';

//   const isDark = theme === 'dark'; 

//   const fetchContacts = () => {
//     if (!userId || !token) {
//       setLoading(false);
//       return;
//     }

//     fetch(`${backendUrl}/api/contacts?userId=${userId}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("Unauthorized Contacts Fetch");
//         return response.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setContacts(data);
//         } else if (data && Array.isArray(data.data)) {
//           setContacts(data.data);
//         } else {
//           setContacts([]);
//         }
//         setTimeout(() => setLoading(false), 500); // UI Smoothness
//       })
//       .catch((err) => {
//         console.error("❌ Backend connection failed (Contacts):", err);
//         setContacts([]);
//         setLoading(false);
//       });
//   };

//   const fetchUserReports = () => {
//     if (!userId || !token) {
//       setReportsLoading(false);
//       return;
//     }

//     fetch(`${backendUrl}/api/reports?userId=${userId}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Unauthorized Reports Fetch");
//         return res.json();
//       })
//       .then((data) => {
//         setReports(Array.isArray(data) ? data : []);
//         setReportsLoading(false);
//       })
//       .catch((err) => {
//         console.error("❌ Failed to fetch alert history:", err);
//         setReports([]);
//         setReportsLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchContacts();
//     fetchUserReports(); 
//   }, [userId, token]);

//   const handleSosTrigger = () => {
//     if (!navigator.geolocation) {
//       alert("⚠️ Geolocation is not supported by your browser!");
//       return;
//     }

//     if (!userId || !token) {
//       alert("🚨 Authentication Error: User session not found. Please log in again.");
//       return;
//     }

//     setSosLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const googleMapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        
//         fetch(`${backendUrl}/api/location/update`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({ userId, latitude, longitude, area: "Dashboard SOS Trigger" })
//         })
//         .then(() => {
//           return fetch(`${backendUrl}/api/sos/trigger`, {
//             method: 'POST',
//             headers: { 
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               area: "Dashboard Security Hub"
//             })
//           });
//         })
//         .then((res) => res.json())
//         .then(() => {
//           if (contacts && contacts.length > 0) {
//             const emailPromises = contacts.map((person) => {
//               if (!person.email) return Promise.resolve(); 

//               const templateParams = {
//                 user_name: "User", 
//                 to_email: person.email,
//                 name: person.name || "Guardian",
//                 message: `Emergency Triggered! Track my live location here: ${googleMapsLink}`,
//                 time: new Date().toLocaleString(),
//                 email: person.email,
//                 area: "Dashboard Security Hub",
//                 latitude: latitude,
//                 longitude: longitude
//               };

//               return emailjs.send(
//                 'service_8n0i8gk',      
//                 'template_ppnnfio',     
//                 templateParams,
//                 'hZ2bKqFAKIbDR_TyU'     
//               );
//             });

//             return Promise.all(emailPromises);
//           }
//         })
//         .then(() => {
//           setSosLoading(false);
//           alert(`🚨 EMERGENCY SOS ACTIVATED!\n\nLocation logged & Emergency alerts dispatched to your trusted networks via Email!\n\nTrack here: ${googleMapsLink}`);
//           fetchUserReports(); 
//         })
//         .catch((err) => {
//           console.error("❌ Failed to complete SOS chain:", err);
//           setSosLoading(false);
//           alert(`🚨 EMERGENCY SOS TRIGGERED (Offline/Email Error)!\nMaps Link: ${googleMapsLink}`);
//         });
//       },
//       (error) => {
//         setSosLoading(false);
//         alert("⚠️ Could not fetch your location. Please check browser location permissions!");
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   };

//   // 🎨 Balanced Dark / Light Palette
//   const colors = {
//     cardBg: isDark ? '#141e1a' : '#ffffff',
//     cardBorder: isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.12)',
//     primaryText: isDark ? '#ffffff' : '#093325',
//     secondaryText: isDark ? '#cbd5e1' : '#5c726a',
//     innerBoxBg: isDark ? '#1a2924' : '#fcfcfb',
//     contactsPanelBg: isDark ? 'linear-gradient(135deg, #1c1414, #141e1a)' : '#fff5f5'
//   };

//   const premiumCardStyle = {
//     backgroundColor: colors.cardBg, 
//     padding: '24px', 
//     borderRadius: '20px', 
//     border: `1px solid ${colors.cardBorder}`, 
//     boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 30px rgba(9, 51, 37, 0.03)', 
//     display: 'flex', 
//     flexDirection: 'column',
//     transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//     width: '100%',            
//     boxSizing: 'border-box',  
//     overflow: 'hidden'        
//   };

//   return (
//     <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: isDark ? '#0b1310' : '#f3faf7', justifyContent: 'space-between', transition: 'all 0.3s ease' }}>
      
//       <style>{`
//         @keyframes sosPulse {
//           0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); }
//           70% { transform: scale(0.95); box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
//           100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
//         }
//         @keyframes borderGlow {
//           0% { border-color: rgba(16, 185, 129, 0.3); }
//           50% { border-color: rgba(16, 185, 129, 0.6); }
//           100% { border-color: rgba(16, 185, 129, 0.3); }
//         }
//         .animated-sos {
//           animation: sosPulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
//         }
//         .grid-card-hover {
//           transition: all 0.3s ease;
//           ${isDark ? 'animation: borderGlow 4s infinite ease-in-out;' : ''}
//         }
//         .grid-card-hover:hover {
//           transform: translateY(-4px);
//           box-shadow: ${isDark ? '0 12px 35px rgba(16, 185, 129, 0.25) !important' : '0 12px 35px rgba(16, 185, 129, 0.08) !important'};
//           border-color: #10b981 !important;
//         }
//         .bottom-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//           gap: 24px;
//           margin-top: 28px;
//           width: 100%;
//         }
//         @media (max-width: 768px) {
//           .dashboard-container { padding: 16px 10px !important; }
//           .hero-grid {
//             padding: 30px 24px !important;
//             min-height: auto !important;
//             flex-direction: column !important;
//             align-items: flex-start !important;
//             gap: 24px !important;
//           }
//           .hero-bg-overlay {
//             background-size: cover !important;
//             background-position: center !important;
//             opacity: 0.35 !important;
//           }
//           .hero-gradient-overlay {
//             background: ${isDark 
//               ? 'linear-gradient(to bottom, rgba(20, 30, 26, 0.9) 0%, #141e1a 100%)' 
//               : 'linear-gradient(to bottom, rgba(245, 228, 228, 0.85) 0%, #f5e4e4 100%)'} !important;
//           }
//           .hero-left h1 { font-size: 28px !important; }
//           .sos-box { width: 100% !important; justify-content: space-between !important; gap: 12px !important; }
//           .quick-contacts-card { padding: 20px 16px !important; }
//           .quick-contacts-card .card-header { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
//           .quick-contacts-card .card-header button { width: 100% !important; text-align: center !important; }
//           .bottom-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
//           .premium-responsive-card { padding: 18px 16px !important; }
//         }
//         @media (max-width: 480px) {
//           .hero-left h1 { font-size: 24px !important; }
//           .sos-box { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 16px !important; }
//           .status-indicator { width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
//         }
//       `}</style>
        
//       <div style={{ padding: '24px 2%', flexGrow: 1 }}>
          
//         {/* 🏷️ HERO GRID */}
//         <div className="hero-grid" style={{ 
//           backgroundColor: isDark ? '#141e1a' : '#f5e4e4', 
//           position: 'relative',
//           padding: '40px 48px', 
//           borderRadius: '24px',
//           marginBottom: '28px',
//           border: `1px solid ${colors.cardBorder}`,
//           minHeight: '280px',
//           display: 'flex',
//           alignItems: 'center',
//           overflow: 'hidden',
//           transition: 'all 0.3s ease'
//         }}>
          
//           {/* Background image takes full size perfectly with clear display settings */}
//           <div className="hero-bg-overlay" style={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             bottom: 0,
//             left: 0,
//             backgroundImage: `url(${heroBgImage})`,
//             backgroundSize: 'contain', 
//             backgroundPosition: 'right center',
//             backgroundRepeat: 'no-repeat',
//             opacity: isDark ? 0.8 : 1,
//             zIndex: 1,
//             transition: 'all 0.3s ease'
//           }} />

//           {/* Color Balance Overlay for enhanced contrast in dark theme */}
//           <div className="hero-gradient-overlay" style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: isDark 
//               ? 'linear-gradient(to right, #141e1a 0%, #141e1a 45%, rgba(20, 30, 26, 0.7) 65%, rgba(20, 30, 26, 0.2) 90%, rgba(20, 30, 26, 0) 100%)'
//               : 'linear-gradient(to right, #f5e4e4 0%, #f5e4e4 45%, rgba(245, 228, 228, 0.5) 70%, rgba(245, 228, 228, 0) 100%)',
//             zIndex: 2,
//             transition: 'all 0.3s ease'
//           }} />

//           <div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', position: 'relative', width: '100%' }}>
//             <div className="hero-left" style={{ maxWidth: '500px' }}>
//               <h1 style={{ fontSize: '38px', fontWeight: '800', color: colors.primaryText, lineHeight: '1.2', margin: 0, letterSpacing: '-1.2px', transition: 'all 0.3s' }}>
//                 Your Safety,<br />
//                 <span style={{ fontStyle: 'italic', fontWeight: '400', fontFamily: 'Georgia, serif', color: '#10b981' }}>Our Priority</span>
//               </h1>
//               <p style={{ color: colors.secondaryText, marginTop: '14px', fontSize: '14px', fontWeight: '500', lineHeight: '1.6' }}>
//                 Press the SOS button in an emergency. The system will track your location and instantly dispatch alert notifications to your inner networks.
//               </p>
//             </div>
            
//             <div className="sos-box" style={{ display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.3s' }}>
//               <div className={`sos-button ${sosLoading ? '' : 'animated-sos'}`} 
//                    onClick={sosLoading ? null : handleSosTrigger} 
//                    style={{ 
//                      cursor: sosLoading ? 'not-allowed' : 'pointer', 
//                      margin: '0',
//                      opacity: sosLoading ? 0.7 : 1,
//                      background: 'radial-gradient(circle, #ef4444 0%, #b91c1c 100%)',
//                      boxShadow: '0 0 25px rgba(239, 68, 68, 0.5)',
//                      borderRadius: '50%',
//                      width: '90px',
//                      height: '90px',
//                      display: 'flex',
//                      flexDirection: 'column',
//                      alignItems: 'center',
//                      justifyContent: 'center',
//                      color: '#fff',
//                      transition: 'all 0.3s ease',
//                      flexShrink: 0
//                    }}>
//                 <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '0.5px' }}>{sosLoading ? "..." : "SOS"}</span>
//                 <small style={{ fontSize: '9px', fontWeight: '600', opacity: 0.9, marginTop: '2px' }}>{sosLoading ? "Tracking..." : "Press Help"}</small>
//               </div>
//               <div className="status-indicator" style={{ background: colors.cardBg, padding: '10px 20px', borderRadius: '50px', fontSize: '12px', fontWeight: '700', color: colors.primaryText, border: `1px solid ${colors.cardBorder}`, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', whiteSpace: 'nowrap' }}>
//                 <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', marginRight: '8px', boxShadow: '0 0 8px #10b981' }}></span>
//                 System Active
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 👥 QUICK CONTACTS CARD */}
//         <div className="quick-contacts-card" style={{ padding: '28px', borderRadius: '24px', background: colors.contactsPanelBg, border: `1px solid ${colors.cardBorder}`, transition: 'all 0.3s ease', width: '100%', boxSizing: 'border-box' }}>
//           <div className="card-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
//             <div style={{ textAlign: 'left' }}>
//               <h4 style={{ fontWeight: '800', color: colors.primaryText, margin: 0, fontSize: '18px', letterSpacing: '-0.3px' }}>👥 Trusted Quick Contacts</h4>
//               <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: colors.secondaryText }}>Live synced from your primary contact directory</p>
//             </div>
//             <button 
//               onClick={() => setActiveView('Contacts')}
//               style={{ padding: '8px 18px', background: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '50px', fontSize: '12px', fontWeight: '700', color: colors.primaryText, cursor: 'pointer', transition: 'all 0.2s' }}
//             >
//               ⚙️ Manage Contacts
//             </button>
//           </div>

//           {loading ? (
//             <p style={{ padding: '10px', fontSize: '13px', color: '#10b981', margin: 0, fontStyle: 'italic', fontWeight: '600', textAlign: 'left' }}>⏳ Syncing encrypted communication networks...</p>
//           ) : (!contacts || contacts.length === 0) ? (
//             <div style={{ padding: '40px 10px', textAlign: 'center', background: colors.cardBg, borderRadius: '16px', border: `1px dashed ${colors.cardBorder}` }}>
//               <p style={{ margin: 0, fontSize: '13.5px', color: colors.secondaryText, fontStyle: 'italic' }}>
//                 ⚠️ No emergency networks configured yet.
//               </p>
//               <span onClick={() => setActiveView('Contacts')} style={{ display: 'inline-block', marginTop: '8px', fontSize: '12.5px', color: '#10b981', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>
//                 Click here to add trusted guardians
//               </span>
//             </div>
//           ) : (
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
//               {contacts.map((person) => (
//                 <div className="contact-item" key={person.id || person._id} style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', background: colors.cardBg, borderRadius: '16px', border: `1px solid ${colors.cardBorder}` }}>
//                   <div className="contact-avatar" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginRight: '14px', flexShrink: 0, fontSize: '14px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
//                     {person.name ? person.name.charAt(0).toUpperCase() : '?'}
//                   </div>
//                   <div style={{ textAlign: 'left', overflow: 'hidden' }}>
//                     <h5 style={{ margin: 0, fontSize: '13.5px', fontWeight: '700', color: colors.primaryText, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
//                       <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '120px' }}>{person.name}</span> 
//                       <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '700', background: 'rgba(16, 185, 129, 0.08)', padding: '2px 8px', borderRadius: '50px' }}>{person.role}</span>
//                     </h5>
//                     <p style={{ margin: 0, fontSize: '11.5px', color: colors.secondaryText, marginTop: '5px', fontWeight: '500' }}>📞 {person.phone}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* 📊 BOTTOM GRID CARDS */}
//         <div className="bottom-grid">
          
//           <div className="grid-card-hover premium-responsive-card" style={{ ...premiumCardStyle, position: 'relative', zIndex: 1 }}>
//             <div style={{ filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%)' : 'none', borderRadius: '14px', overflow: 'hidden', height: '100%', minHeight: '220px', width: '100%' }}>
//               <LiveLocationPage />
//             </div>
//           </div>

//           <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
//             <div className="card-title-bar" style={{ borderBottom: `1px solid ${colors.cardBorder}`, paddingBottom: '12px', marginBottom: '16px', fontWeight: '800', fontSize: '15px', color: colors.primaryText, textAlign: 'left' }}>
//               <span>🛡️ Safety Tips & Guidelines</span>
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1, textAlign: 'left' }}>
//               <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '12px 14px', borderRadius: '12px', borderLeft: '4px solid #ef4444', fontWeight: '600', lineHeight: '1.5' }}>
//                 🚶‍♀️ <strong>Isolated Routes:</strong> Avoid dark routes. Keep your phone in hand but stay aware.
//               </div>
//               <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '12px 14px', borderRadius: '12px', borderLeft: '4px solid #10b981', fontWeight: '600', lineHeight: '1.5' }}>
//                 📱 <strong>Speed Dials:</strong> Memorize quick emergency hotkeys and speed dials (999).
//               </div>
//               <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '10px 14px', borderRadius: '12px', borderLeft: `4px solid ${isDark ? '#10b981' : '#093325'}`, fontWeight: '600', lineHeight: '1.5' }}>
//                 🚗 <strong>Ride Verification:</strong> Verify the license plates and driver profile beforehand.
//               </div>
//             </div>
//           </div>
          
//           <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
//             <div style={{ color: colors.primaryText, width: '100%' }}>
//               <ReportIncident />
//             </div>
//           </div>
          
//           <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
//             <div className="card-title-bar" style={{ borderBottom: `1px solid ${colors.cardBorder}`, paddingBottom: '12px', marginBottom: '16px', fontWeight: '800', fontSize: '15px', color: colors.primaryText, textAlign: 'left' }}>
//               <span>⏳ Your Live Alert History</span>
//             </div>
            
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
//               {reportsLoading ? (
//                 <p style={{ fontSize: '12px', color: colors.secondaryText, textAlign: 'center', fontWeight: '500' }}>Syncing history nodes...</p>
//               ) : (!reports || reports.length === 0) ? (
//                 <p style={{ fontSize: '12px', color: colors.secondaryText, textAlign: 'center', fontStyle: 'italic', padding: '30px 0', fontWeight: '500' }}>
//                   ☘️ Secure Matrix Cleared. No incidents logged.
//                 </p>
//               ) : (
//                 reports.map((report) => {
//                   const isCritical = report.severity === 'CRITICAL' || report.severity === 'High' || report.severity === 'Critical';
//                   const bgStyle = isCritical ? (isDark ? '#2d1919' : '#fef2f2') : (isDark ? '#16241f' : 'rgba(16, 185, 129, 0.04)');
//                   const borderStyle = isCritical ? (isDark ? '#5c2424' : '#fee2e2') : (isDark ? '#1e3a2f' : 'rgba(16, 185, 129, 0.12)');
//                   const accentColor = isCritical ? '#ef4444' : '#10b981';
//                   const textColor = isCritical ? (isDark ? '#fca5a5' : '#991b1b') : colors.primaryText;

//                   return (
//                     <div key={report.id || report._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', backgroundColor: bgStyle, borderRadius: '12px', border: `1px solid ${borderStyle}`, borderLeft: `4px solid ${accentColor}`, textAlign: 'left' }}>
//                       <div style={{ maxWidth: '72%' }}>
//                         <span style={{ fontSize: '12.5px', fontWeight: '700', color: textColor, display: 'block' }}>{report.location}</span>
//                         <span style={{ fontSize: '11.5px', color: colors.secondaryText, display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '3px' }}>{report.description}</span>
//                         <span style={{ fontSize: '10px', color: colors.secondaryText, display: 'block', marginTop: '3px', fontWeight: '500' }}>{report.timestamp}</span>
//                       </div>
//                       <span style={{ fontSize: '9px', backgroundColor: accentColor, color: 'white', padding: '4px 8px', borderRadius: '50px', fontWeight: '800', letterSpacing: '0.3px' }}>
//                         {report.severity ? report.severity.toUpperCase() : 'INFO'}
//                       </span>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }

// export default DashboardPage;












//besi boro lage 


// // src/pages/DashboardPage.jsx
// import React, { useState, useEffect } from 'react'; 
// import heroBgImage from '../assets/hero-bg.png'; 
// import ReportIncident from './ReportIncident.jsx'; 
// import LiveLocationPage from './LiveLocationPage.jsx'; 
// import emailjs from '@emailjs/browser'; 

// function DashboardPage({ setActiveView, theme }) {
//   const [contacts, setContacts] = useState([]); 
//   const [loading, setLoading] = useState(true);
  
//   const [reports, setReports] = useState([]);
//   const [reportsLoading, setReportsLoading] = useState(true);
//   const [sosLoading, setSosLoading] = useState(false); 

//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');
//   const backendUrl = 'https://rescue-her-back-1.onrender.com';

//   const isDark = theme === 'dark'; 

//   const fetchContacts = () => {
//     if (!userId || !token) {
//       setLoading(false);
//       return;
//     }

//     fetch(`${backendUrl}/api/contacts?userId=${userId}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("Unauthorized Contacts Fetch");
//         return response.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setContacts(data);
//         } else if (data && Array.isArray(data.data)) {
//           setContacts(data.data);
//         } else {
//           setContacts([]);
//         }
//         setTimeout(() => setLoading(false), 500); // UI Smoothness
//       })
//       .catch((err) => {
//         console.error("❌ Backend connection failed (Contacts):", err);
//         setContacts([]);
//         setLoading(false);
//       });
//   };

//   const fetchUserReports = () => {
//     if (!userId || !token) {
//       setReportsLoading(false);
//       return;
//     }

//     fetch(`${backendUrl}/api/reports?userId=${userId}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Unauthorized Reports Fetch");
//         return res.json();
//       })
//       .then((data) => {
//         setReports(Array.isArray(data) ? data : []);
//         setReportsLoading(false);
//       })
//       .catch((err) => {
//         console.error("❌ Failed to fetch alert history:", err);
//         setReports([]);
//         setReportsLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchContacts();
//     fetchUserReports(); 
//   }, [userId, token]);

//   const handleSosTrigger = () => {
//     if (!navigator.geolocation) {
//       alert("⚠️ Geolocation is not supported by your browser!");
//       return;
//     }

//     if (!userId || !token) {
//       alert("🚨 Authentication Error: User session not found. Please log in again.");
//       return;
//     }

//     setSosLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const googleMapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        
//         fetch(`${backendUrl}/api/location/update`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({ userId, latitude, longitude, area: "Dashboard SOS Trigger" })
//         })
//         .then(() => {
//           return fetch(`${backendUrl}/api/sos/trigger`, {
//             method: 'POST',
//             headers: { 
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               area: "Dashboard Security Hub"
//             })
//           });
//         })
//         .then((res) => res.json())
//         .then(() => {
//           if (contacts && contacts.length > 0) {
//             const emailPromises = contacts.map((person) => {
//               if (!person.email) return Promise.resolve(); 

//               const templateParams = {
//                 user_name: "User", 
//                 to_email: person.email,
//                 name: person.name || "Guardian",
//                 message: `Emergency Triggered! Track my live location here: ${googleMapsLink}`,
//                 time: new Date().toLocaleString(),
//                 email: person.email,
//                 area: "Dashboard Security Hub",
//                 latitude: latitude,
//                 longitude: longitude
//               };

//               return emailjs.send(
//                 'service_8n0i8gk',      
//                 'template_ppnnfio',     
//                 templateParams,
//                 'hZ2bKqFAKIbDR_TyU'     
//               );
//             });

//             return Promise.all(emailPromises);
//           }
//         })
//         .then(() => {
//           setSosLoading(false);
//           alert(`🚨 EMERGENCY SOS ACTIVATED!\n\nLocation logged & Emergency alerts dispatched to your trusted networks via Email!\n\nTrack here: ${googleMapsLink}`);
//           fetchUserReports(); 
//         })
//         .catch((err) => {
//           console.error("❌ Failed to complete SOS chain:", err);
//           setSosLoading(false);
//           alert(`🚨 EMERGENCY SOS TRIGGERED (Offline/Email Error)!\nMaps Link: ${googleMapsLink}`);
//         });
//       },
//       (error) => {
//         setSosLoading(false);
//         alert("⚠️ Could not fetch your location. Please check browser location permissions!");
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   };

//   // 🎨 Balanced Dark / Light Palette
//   const colors = {
//     cardBg: isDark ? '#141e1a' : '#ffffff',
//     cardBorder: isDark ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.12)',
//     primaryText: isDark ? '#ffffff' : '#093325',
//     secondaryText: isDark ? '#cbd5e1' : '#5c726a',
//     innerBoxBg: isDark ? '#1a2924' : '#fcfcfb',
//     contactsPanelBg: isDark ? 'linear-gradient(135deg, #1c1414, #141e1a)' : '#fff5f5'
//   };

//   const premiumCardStyle = {
//     backgroundColor: colors.cardBg, 
//     padding: '24px', 
//     borderRadius: '20px', 
//     border: `1px solid ${colors.cardBorder}`, 
//     boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 30px rgba(9, 51, 37, 0.03)', 
//     display: 'flex', 
//     flexDirection: 'column',
//     transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//     width: '100%',            
//     boxSizing: 'border-box',  
//     overflow: 'hidden'        
//   };

//   return (
//     <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: isDark ? '#0b1310' : '#f3faf7', justifyContent: 'space-between', transition: 'all 0.3s ease' }}>
      
//       <style>{`
//         @keyframes sosPulse {
//           0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.6); }
//           70% { transform: scale(0.95); box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
//           100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
//         }
//         @keyframes borderGlow {
//           0% { border-color: rgba(16, 185, 129, 0.3); }
//           50% { border-color: rgba(16, 185, 129, 0.6); }
//           100% { border-color: rgba(16, 185, 129, 0.3); }
//         }
//         .animated-sos {
//           animation: sosPulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
//         }
//         .grid-card-hover {
//           transition: all 0.3s ease;
//           ${isDark ? 'animation: borderGlow 4s infinite ease-in-out;' : ''}
//         }
//         .grid-card-hover:hover {
//           transform: translateY(-4px);
//           box-shadow: ${isDark ? '0 12px 35px rgba(16, 185, 129, 0.25) !important' : '0 12px 35px rgba(16, 185, 129, 0.08) !important'};
//           border-color: #10b981 !important;
//         }
//         .bottom-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//           gap: 24px;
//           margin-top: 28px;
//           width: 100%;
//         }
//         @media (max-width: 768px) {
//           .dashboard-container { padding: 16px 10px !important; }
//           .hero-grid {
//             padding: 30px 24px !important;
//             min-height: auto !important;
//             flex-direction: column !important;
//             align-items: flex-start !important;
//             gap: 24px !important;
//           }
//           .hero-bg-overlay {
//             background-size: cover !important;
//             background-position: center right !important;
//             left: 0 !important;
//             opacity: ${isDark ? 0.35 : 0.6} !important;
//           }
//           .hero-gradient-overlay {
//             background: ${isDark 
//               ? 'linear-gradient(to bottom, #141e1a 0%, rgba(20, 30, 26, 0.8) 50%, rgba(20, 30, 26, 0) 100%)' 
//               : 'linear-gradient(to bottom, #f5e4e4 0%, rgba(245, 228, 228, 0.8) 50%, rgba(245, 228, 228, 0) 100%)'} !important;
//           }
//           .hero-left h1 { font-size: 28px !important; }
//           .sos-box { width: 100% !important; justify-content: space-between !important; gap: 12px !important; }
//           .quick-contacts-card { padding: 20px 16px !important; }
//           .quick-contacts-card .card-header { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
//           .quick-contacts-card .card-header button { width: 100% !important; text-align: center !important; }
//           .bottom-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
//           .premium-responsive-card { padding: 18px 16px !important; }
//         }
//         @media (max-width: 480px) {
//           .hero-left h1 { font-size: 24px !important; }
//           .sos-box { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 16px !important; }
//           .status-indicator { width: 100% !important; text-align: center !important; box-sizing: border-box !important; }
//         }
//       `}</style>
        
//       <div style={{ padding: '24px 2%', flexGrow: 1 }}>
          
//         {/* 🏷️ HERO GRID */}
//         <div className="hero-grid" style={{ 
//           backgroundColor: isDark ? '#141e1a' : '#f5e4e4', 
//           position: 'relative',
//           padding: '40px 48px', 
//           borderRadius: '24px',
//           marginBottom: '28px',
//           border: `1px solid ${colors.cardBorder}`,
//           minHeight: '280px',
//           display: 'flex',
//           alignItems: 'center',
//           overflow: 'hidden',
//           transition: 'all 0.3s ease'
//         }}>
          
//           {/* 🌟 Fixed Overlay: Image uses cover to remove hard edges */}
//           <div className="hero-bg-overlay" style={{
//             position: 'absolute',
//             top: 0,
//             right: 0,
//             bottom: 0,
//             left: '25%', // Left gap ensures text is highly readable
//             backgroundImage: `url(${heroBgImage})`,
//             backgroundSize: 'cover', 
//             backgroundPosition: 'right center',
//             backgroundRepeat: 'no-repeat',
//             opacity: isDark ? 0.7 : 1,
//             zIndex: 1,
//             transition: 'all 0.3s ease'
//           }} />

//           {/* 🌟 Fixed Gradient Blend: Perfectly matches the background color to create a seamless fade */}
//           <div className="hero-gradient-overlay" style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: isDark 
//               ? 'linear-gradient(to right, #141e1a 0%, #141e1a 35%, rgba(20, 30, 26, 0.8) 55%, rgba(20, 30, 26, 0) 100%)'
//               : 'linear-gradient(to right, #f5e4e4 0%, #f5e4e4 35%, rgba(245, 228, 228, 0.8) 55%, rgba(245, 228, 228, 0) 100%)',
//             zIndex: 2,
//             transition: 'all 0.3s ease'
//           }} />

//           <div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', position: 'relative', width: '100%' }}>
//             <div className="hero-left" style={{ maxWidth: '500px' }}>
//               <h1 style={{ fontSize: '38px', fontWeight: '800', color: colors.primaryText, lineHeight: '1.2', margin: 0, letterSpacing: '-1.2px', transition: 'all 0.3s' }}>
//                 Your Safety,<br />
//                 <span style={{ fontStyle: 'italic', fontWeight: '400', fontFamily: 'Georgia, serif', color: '#10b981' }}>Our Priority</span>
//               </h1>
//               <p style={{ color: colors.secondaryText, marginTop: '14px', fontSize: '14px', fontWeight: '500', lineHeight: '1.6' }}>
//                 Press the SOS button in an emergency. The system will track your location and instantly dispatch alert notifications to your inner networks.
//               </p>
//             </div>
            
//             <div className="sos-box" style={{ display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.3s' }}>
//               <div className={`sos-button ${sosLoading ? '' : 'animated-sos'}`} 
//                    onClick={sosLoading ? null : handleSosTrigger} 
//                    style={{ 
//                      cursor: sosLoading ? 'not-allowed' : 'pointer', 
//                      margin: '0',
//                      opacity: sosLoading ? 0.7 : 1,
//                      background: 'radial-gradient(circle, #ef4444 0%, #b91c1c 100%)',
//                      boxShadow: '0 0 25px rgba(239, 68, 68, 0.5)',
//                      borderRadius: '50%',
//                      width: '90px',
//                      height: '90px',
//                      display: 'flex',
//                      flexDirection: 'column',
//                      alignItems: 'center',
//                      justifyContent: 'center',
//                      color: '#fff',
//                      transition: 'all 0.3s ease',
//                      flexShrink: 0
//                    }}>
//                 <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '0.5px' }}>{sosLoading ? "..." : "SOS"}</span>
//                 <small style={{ fontSize: '9px', fontWeight: '600', opacity: 0.9, marginTop: '2px' }}>{sosLoading ? "Tracking..." : "Press Help"}</small>
//               </div>
//               <div className="status-indicator" style={{ background: colors.cardBg, padding: '10px 20px', borderRadius: '50px', fontSize: '12px', fontWeight: '700', color: colors.primaryText, border: `1px solid ${colors.cardBorder}`, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', whiteSpace: 'nowrap' }}>
//                 <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', marginRight: '8px', boxShadow: '0 0 8px #10b981' }}></span>
//                 System Active
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 👥 QUICK CONTACTS CARD */}
//         <div className="quick-contacts-card" style={{ padding: '28px', borderRadius: '24px', background: colors.contactsPanelBg, border: `1px solid ${colors.cardBorder}`, transition: 'all 0.3s ease', width: '100%', boxSizing: 'border-box' }}>
//           <div className="card-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
//             <div style={{ textAlign: 'left' }}>
//               <h4 style={{ fontWeight: '800', color: colors.primaryText, margin: 0, fontSize: '18px', letterSpacing: '-0.3px' }}>👥 Trusted Quick Contacts</h4>
//               <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: colors.secondaryText }}>Live synced from your primary contact directory</p>
//             </div>
//             <button 
//               onClick={() => setActiveView('Contacts')}
//               style={{ padding: '8px 18px', background: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '50px', fontSize: '12px', fontWeight: '700', color: colors.primaryText, cursor: 'pointer', transition: 'all 0.2s' }}
//             >
//               ⚙️ Manage Contacts
//             </button>
//           </div>

//           {loading ? (
//             <p style={{ padding: '10px', fontSize: '13px', color: '#10b981', margin: 0, fontStyle: 'italic', fontWeight: '600', textAlign: 'left' }}>⏳ Syncing encrypted communication networks...</p>
//           ) : (!contacts || contacts.length === 0) ? (
//             <div style={{ padding: '40px 10px', textAlign: 'center', background: colors.cardBg, borderRadius: '16px', border: `1px dashed ${colors.cardBorder}` }}>
//               <p style={{ margin: 0, fontSize: '13.5px', color: colors.secondaryText, fontStyle: 'italic' }}>
//                 ⚠️ No emergency networks configured yet.
//               </p>
//               <span onClick={() => setActiveView('Contacts')} style={{ display: 'inline-block', marginTop: '8px', fontSize: '12.5px', color: '#10b981', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>
//                 Click here to add trusted guardians
//               </span>
//             </div>
//           ) : (
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
//               {contacts.map((person) => (
//                 <div className="contact-item" key={person.id || person._id} style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', background: colors.cardBg, borderRadius: '16px', border: `1px solid ${colors.cardBorder}` }}>
//                   <div className="contact-avatar" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginRight: '14px', flexShrink: 0, fontSize: '14px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
//                     {person.name ? person.name.charAt(0).toUpperCase() : '?'}
//                   </div>
//                   <div style={{ textAlign: 'left', overflow: 'hidden' }}>
//                     <h5 style={{ margin: 0, fontSize: '13.5px', fontWeight: '700', color: colors.primaryText, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
//                       <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '120px' }}>{person.name}</span> 
//                       <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '700', background: 'rgba(16, 185, 129, 0.08)', padding: '2px 8px', borderRadius: '50px' }}>{person.role}</span>
//                     </h5>
//                     <p style={{ margin: 0, fontSize: '11.5px', color: colors.secondaryText, marginTop: '5px', fontWeight: '500' }}>📞 {person.phone}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* 📊 BOTTOM GRID CARDS */}
//         <div className="bottom-grid">
          
//           <div className="grid-card-hover premium-responsive-card" style={{ ...premiumCardStyle, position: 'relative', zIndex: 1 }}>
//             <div style={{ filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%)' : 'none', borderRadius: '14px', overflow: 'hidden', height: '100%', minHeight: '220px', width: '100%' }}>
//               <LiveLocationPage />
//             </div>
//           </div>

//           <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
//             <div className="card-title-bar" style={{ borderBottom: `1px solid ${colors.cardBorder}`, paddingBottom: '12px', marginBottom: '16px', fontWeight: '800', fontSize: '15px', color: colors.primaryText, textAlign: 'left' }}>
//               <span>🛡️ Safety Tips & Guidelines</span>
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1, textAlign: 'left' }}>
//               <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '12px 14px', borderRadius: '12px', borderLeft: '4px solid #ef4444', fontWeight: '600', lineHeight: '1.5' }}>
//                 🚶‍♀️ <strong>Isolated Routes:</strong> Avoid dark routes. Keep your phone in hand but stay aware.
//               </div>
//               <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '12px 14px', borderRadius: '12px', borderLeft: '4px solid #10b981', fontWeight: '600', lineHeight: '1.5' }}>
//                 📱 <strong>Speed Dials:</strong> Memorize quick emergency hotkeys and speed dials (999).
//               </div>
//               <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '10px 14px', borderRadius: '12px', borderLeft: `4px solid ${isDark ? '#10b981' : '#093325'}`, fontWeight: '600', lineHeight: '1.5' }}>
//                 🚗 <strong>Ride Verification:</strong> Verify the license plates and driver profile beforehand.
//               </div>
//             </div>
//           </div>
          
//           <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
//             <div style={{ color: colors.primaryText, width: '100%' }}>
//               <ReportIncident />
//             </div>
//           </div>
          
//           <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
//             <div className="card-title-bar" style={{ borderBottom: `1px solid ${colors.cardBorder}`, paddingBottom: '12px', marginBottom: '16px', fontWeight: '800', fontSize: '15px', color: colors.primaryText, textAlign: 'left' }}>
//               <span>⏳ Your Live Alert History</span>
//             </div>
            
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
//               {reportsLoading ? (
//                 <p style={{ fontSize: '12px', color: colors.secondaryText, textAlign: 'center', fontWeight: '500' }}>Syncing history nodes...</p>
//               ) : (!reports || reports.length === 0) ? (
//                 <p style={{ fontSize: '12px', color: colors.secondaryText, textAlign: 'center', fontStyle: 'italic', padding: '30px 0', fontWeight: '500' }}>
//                   ☘️ Secure Matrix Cleared. No incidents logged.
//                 </p>
//               ) : (
//                 reports.map((report) => {
//                   const isCritical = report.severity === 'CRITICAL' || report.severity === 'High' || report.severity === 'Critical';
//                   const bgStyle = isCritical ? (isDark ? '#2d1919' : '#fef2f2') : (isDark ? '#16241f' : 'rgba(16, 185, 129, 0.04)');
//                   const borderStyle = isCritical ? (isDark ? '#5c2424' : '#fee2e2') : (isDark ? '#1e3a2f' : 'rgba(16, 185, 129, 0.12)');
//                   const accentColor = isCritical ? '#ef4444' : '#10b981';
//                   const textColor = isCritical ? (isDark ? '#fca5a5' : '#991b1b') : colors.primaryText;

//                   return (
//                     <div key={report.id || report._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', backgroundColor: bgStyle, borderRadius: '12px', border: `1px solid ${borderStyle}`, borderLeft: `4px solid ${accentColor}`, textAlign: 'left' }}>
//                       <div style={{ maxWidth: '72%' }}>
//                         <span style={{ fontSize: '12.5px', fontWeight: '700', color: textColor, display: 'block' }}>{report.location}</span>
//                         <span style={{ fontSize: '11.5px', color: colors.secondaryText, display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '3px' }}>{report.description}</span>
//                         <span style={{ fontSize: '10px', color: colors.secondaryText, display: 'block', marginTop: '3px', fontWeight: '500' }}>{report.timestamp}</span>
//                       </div>
//                       <span style={{ fontSize: '9px', backgroundColor: accentColor, color: 'white', padding: '4px 8px', borderRadius: '50px', fontWeight: '800', letterSpacing: '0.3px' }}>
//                         {report.severity ? report.severity.toUpperCase() : 'INFO'}
//                       </span>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }

// export default DashboardPage;








// ///eita hero section dekha jaina valo moto 

// // src/pages/DashboardPage.jsx
// import React, { useState, useEffect } from 'react'; 
// import heroBgImage from '../assets/hero-bg.png'; 
// import ReportIncident from './ReportIncident.jsx'; 
// import LiveLocationPage from './LiveLocationPage.jsx'; 
// import emailjs from '@emailjs/browser'; 

// function DashboardPage({ setActiveView, theme }) {
//   const [contacts, setContacts] = useState([]); 
//   const [loading, setLoading] = useState(true);
  
//   const [reports, setReports] = useState([]);
//   const [reportsLoading, setReportsLoading] = useState(true);
//   const [sosLoading, setSosLoading] = useState(false); 

//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token');
//   const backendUrl = 'https://rescue-her-back-1.onrender.com';

//   const isDark = theme === 'dark'; 

//   const fetchContacts = () => {
//     if (!userId || !token) {
//       setLoading(false);
//       return;
//     }

//     fetch(`${backendUrl}/api/contacts?userId=${userId}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("Unauthorized Contacts Fetch");
//         return response.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setContacts(data);
//         } else if (data && Array.isArray(data.data)) {
//           setContacts(data.data);
//         } else {
//           setContacts([]);
//         }
//         setTimeout(() => setLoading(false), 500);
//       })
//       .catch((err) => {
//         console.error("❌ Backend connection failed (Contacts):", err);
//         setContacts([]);
//         setLoading(false);
//       });
//   };

//   const fetchUserReports = () => {
//     if (!userId || !token) {
//       setReportsLoading(false);
//       return;
//     }

//     fetch(`${backendUrl}/api/reports?userId=${userId}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Unauthorized Reports Fetch");
//         return res.json();
//       })
//       .then((data) => {
//         setReports(Array.isArray(data) ? data : []);
//         setReportsLoading(false);
//       })
//       .catch((err) => {
//         console.error("❌ Failed to fetch alert history:", err);
//         setReports([]);
//         setReportsLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchContacts();
//     fetchUserReports(); 
//   }, [userId, token]);

//   const handleSosTrigger = () => {
//     if (!navigator.geolocation) {
//       alert("⚠️ Geolocation is not supported by your browser!");
//       return;
//     }

//     if (!userId || !token) {
//       alert("🚨 Authentication Error: User session not found. Please log in again.");
//       return;
//     }

//     setSosLoading(true);

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const googleMapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        
//         fetch(`${backendUrl}/api/location/update`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({ userId, latitude, longitude, area: "Dashboard SOS Trigger" })
//         })
//         .then(() => {
//           return fetch(`${backendUrl}/api/sos/trigger`, {
//             method: 'POST',
//             headers: { 
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({
//               area: "Dashboard Security Hub"
//             })
//           });
//         })
//         .then((res) => res.json())
//         .then(() => {
//           if (contacts && contacts.length > 0) {
//             const emailPromises = contacts.map((person) => {
//               if (!person.email) return Promise.resolve(); 

//               const templateParams = {
//                 user_name: "User", 
//                 to_email: person.email,
//                 name: person.name || "Guardian",
//                 message: `Emergency Triggered! Track my live location here: ${googleMapsLink}`,
//                 time: new Date().toLocaleString(),
//                 email: person.email,
//                 area: "Dashboard Security Hub",
//                 latitude: latitude,
//                 longitude: longitude
//               };

//               return emailjs.send(
//                 'service_8n0i8gk',      
//                 'template_ppnnfio',     
//                 templateParams,
//                 'hZ2bKqFAKIbDR_TyU'     
//               );
//             });

//             return Promise.all(emailPromises);
//           }
//         })
//         .then(() => {
//           setSosLoading(false);
//           alert(`🚨 EMERGENCY SOS ACTIVATED!\n\nLocation logged & Emergency alerts dispatched to your trusted networks via Email!\n\nTrack here: ${googleMapsLink}`);
//           fetchUserReports(); 
//         })
//         .catch((err) => {
//           console.error("❌ Failed to complete SOS chain:", err);
//           setSosLoading(false);
//           alert(`🚨 EMERGENCY SOS TRIGGERED (Offline/Email Error)!\nMaps Link: ${googleMapsLink}`);
//         });
//       },
//       (error) => {
//         setSosLoading(false);
//         alert("⚠️ Could not fetch your location. Please check browser location permissions!");
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   };

//   const colors = {
//     cardBg: isDark ? '#111a16' : '#ffffff',
//     cardBorder: isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.12)',
//     primaryText: isDark ? '#f8fafc' : '#093325',
//     secondaryText: isDark ? '#a2b7b0' : '#5c726a',
//     innerBoxBg: isDark ? '#16231f' : '#fcfcfb',
//     contactsPanelBg: isDark ? 'linear-gradient(135deg, #181111, #111a16)' : '#fff5f5'
//   };

//   const premiumCardStyle = {
//     backgroundColor: colors.cardBg, 
//     padding: '24px', 
//     borderRadius: '20px', 
//     border: `1px solid ${colors.cardBorder}`, 
//     boxShadow: isDark ? '0 8px 30px rgba(0, 0, 0, 0.2)' : '0 8px 30px rgba(9, 51, 37, 0.03)', 
//     display: 'flex', 
//     flexDirection: 'column',
//     transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//     width: '100%',            
//     boxSizing: 'border-box',  
//     overflow: 'hidden'        
//   };

//   return (
//     <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: isDark ? '#0a120f' : '#f3faf7', justifyContent: 'space-between', transition: 'all 0.3s ease' }}>
      
//       {/* 📱 Advanced Responsive Styles */}
//       <style>{`
//         @keyframes sosPulse {
//           0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
//           70% { transform: scale(0.95); box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
//           100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
//         }
//         @keyframes borderGlow {
//           0% { border-color: rgba(16, 185, 129, 0.25); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
//           50% { border-color: rgba(255, 182, 193, 0.5); box-shadow: 0 8px 30px rgba(16, 185, 129, 0.08); }
//           100% { border-color: rgba(16, 185, 129, 0.25); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
//         }
//         .animated-sos {
//           animation: sosPulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
//         }
//         .grid-card-hover {
//           transition: all 0.3s ease;
//           ${isDark ? 'animation: borderGlow 4s infinite ease-in-out;' : ''}
//         }
//         .grid-card-hover:hover {
//           transform: translateY(-4px);
//           box-shadow: ${isDark ? '0 12px 35px rgba(16, 185, 129, 0.15) !important' : '0 12px 35px rgba(16, 185, 129, 0.08) !important'};
//           border-color: #10b981 !important;
//         }

//         .bottom-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
//           gap: 24px;
//           margin-top: 28px;
//           width: 100%;
//         }

//         @media (max-width: 768px) {
//           .dashboard-container {
//             padding: 16px 10px !important;
//           }
//           .hero-grid {
//             padding: 30px 24px !important;
//             min-height: auto !important;
//             flex-direction: column !important;
//             align-items: flex-start !important;
//             gap: 24px !important;
//           }
          
//           /* 🔥 Mobile Image Masking Fix */
//           .hero-bg-overlay {
//             left: 0 !important;
//             background-position: right top !important;
//             opacity: ${isDark ? 0.15 : 0.3} !important;
//             -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 100%) !important;
//             mask-image: linear-gradient(to bottom, transparent 0%, black 100%) !important;
//           }

//           .hero-left h1 {
//             font-size: 28px !important;
//           }
//           .sos-box {
//             width: 100% !important;
//             justify-content: space-between !important;
//             gap: 12px !important;
//           }
//           .quick-contacts-card {
//             padding: 20px 16px !important;
//           }
//           .quick-contacts-card .card-header {
//             flex-direction: column !important;
//             align-items: flex-start !important;
//             gap: 16px !important;
//           }
//           .quick-contacts-card .card-header button {
//             width: 100% !important;
//             padding: 10px !important;
//             text-align: center !important;
//           }
//           .bottom-grid {
//             grid-template-columns: 1fr !important;
//             gap: 20px !important;
//           }
//           .premium-responsive-card {
//             padding: 18px 16px !important;
//           }
//         }

//         @media (max-width: 480px) {
//           .hero-left h1 {
//             font-size: 24px !important;
//           }
//           .sos-box {
//             flex-direction: column !important;
//             align-items: center !important;
//             text-align: center !important;
//             gap: 16px !important;
//           }
//           .status-indicator {
//             width: 100% !important;
//             text-align: center !important;
//             box-sizing: border-box !important;
//           }
//         }
//       `}</style>
        
//       <div style={{ padding: '24px 2%', flexGrow: 1 }}>
          
//         {/* 🏷️ HERO GRID - Refactored for Flawless Blending */}
//         <div className="hero-grid" style={{ 
//           backgroundColor: isDark ? '#111a16' : '#f0fdf4', 
//           position: 'relative',
//           padding: '40px 48px', 
//           borderRadius: '24px',
//           marginBottom: '28px',
//           border: `1px solid ${colors.cardBorder}`,
//           minHeight: '280px',
//           display: 'flex',
//           alignItems: 'center',
//           overflow: 'hidden',
//           transition: 'all 0.3s ease'
//         }}>
          
//           {/* 🔥 The Magic Mask Fix: smoothly fades the image to transparent left */}
//           <div className="hero-bg-overlay" style={{
//             position: 'absolute',
//             top: 0, 
//             right: 0, 
//             bottom: 0, 
//             left: '20%', 
//             backgroundImage: `url(${heroBgImage})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center 20%',
//             backgroundRepeat: 'no-repeat',
//             opacity: isDark ? 0.25 : 0.85, 
//             filter: isDark ? 'grayscale(50%) contrast(1.2)' : 'none',
//             WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 65%)',
//             maskImage: 'linear-gradient(to right, transparent 0%, black 65%)',
//             zIndex: 1,
//             transition: 'all 0.3s ease'
//           }} />

//           <div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', position: 'relative', width: '100%' }}>
//             <div className="hero-left" style={{ maxWidth: '480px' }}>
//               <h1 style={{ fontSize: '38px', fontWeight: '800', color: colors.primaryText, lineHeight: '1.2', margin: 0, letterSpacing: '-1.2px', transition: 'all 0.3s' }}>
//                 Your Safety,<br />
//                 <span style={{ fontStyle: 'italic', fontWeight: '400', fontFamily: 'Georgia, serif', color: '#10b981' }}>Our Priority</span>
//               </h1>
//               <p style={{ color: colors.secondaryText, marginTop: '12px', fontSize: '13.5px', fontWeight: '500', lineHeight: '1.6' }}>
//                 Press the SOS button in an emergency. The system will track your location and instantly dispatch alert notifications to your inner networks.
//               </p>
//             </div>
            
//             <div className="sos-box" style={{ display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.3s' }}>
//               <div className={`sos-button ${sosLoading ? '' : 'animated-sos'}`} 
//                    onClick={sosLoading ? null : handleSosTrigger} 
//                    style={{ 
//                      cursor: sosLoading ? 'not-allowed' : 'pointer', 
//                      margin: '0',
//                      opacity: sosLoading ? 0.7 : 1,
//                      background: 'radial-gradient(circle, #ef4444 0%, #b91c1c 100%)',
//                      boxShadow: '0 0 25px rgba(239, 68, 68, 0.45)',
//                      borderRadius: '50%',
//                      width: '90px',
//                      height: '90px',
//                      display: 'flex',
//                      flexDirection: 'column',
//                      alignItems: 'center',
//                      justifyContent: 'center',
//                      color: '#fff',
//                      transition: 'all 0.3s ease',
//                      flexShrink: 0
//                    }}>
//                 <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '0.5px' }}>{sosLoading ? "..." : "SOS"}</span>
//                 <small style={{ fontSize: '9px', fontWeight: '600', opacity: 0.9, marginTop: '2px' }}>{sosLoading ? "Tracking..." : "Press Help"}</small>
//               </div>
//               <div className="status-indicator" style={{ background: colors.cardBg, padding: '10px 20px', borderRadius: '50px', fontSize: '12px', fontWeight: '700', color: colors.primaryText, border: `1px solid ${colors.cardBorder}`, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', whiteSpace: 'nowrap' }}>
//                 <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', marginRight: '8px', boxShadow: '0 0 8px #10b981' }}></span>
//                 System Active
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* 👥 QUICK CONTACTS CARD */}
//         <div className="quick-contacts-card" style={{ padding: '28px', borderRadius: '24px', background: colors.contactsPanelBg, border: `1px solid ${colors.cardBorder}`, transition: 'all 0.3s ease', width: '100%', boxSizing: 'border-box' }}>
//           <div className="card-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
//             <div style={{ textAlign: 'left' }}>
//               <h4 style={{ fontWeight: '800', color: colors.primaryText, margin: 0, fontSize: '18px', letterSpacing: '-0.3px' }}>👥 Trusted Quick Contacts</h4>
//               <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: colors.secondaryText }}>Live synced from your primary contact directory</p>
//             </div>
//             <button 
//               onClick={() => setActiveView('Contacts')}
//               style={{ padding: '8px 18px', background: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '50px', fontSize: '12px', fontWeight: '700', color: colors.primaryText, cursor: 'pointer', transition: 'all 0.2s' }}
//             >
//               ⚙️ Manage Contacts
//             </button>
//           </div>

//           {loading ? (
//             <p style={{ padding: '10px', fontSize: '13px', color: '#10b981', margin: 0, fontStyle: 'italic', fontWeight: '600', textAlign: 'left' }}>⏳ Syncing encrypted communication networks...</p>
//           ) : (!contacts || contacts.length === 0) ? (
//             <div style={{ padding: '40px 10px', textAlign: 'center', background: colors.cardBg, borderRadius: '16px', border: `1px dashed ${colors.cardBorder}` }}>
//               <p style={{ margin: 0, fontSize: '13.5px', color: colors.secondaryText, fontStyle: 'italic' }}>
//                 ⚠️ No emergency networks configured yet.
//               </p>
//               <span onClick={() => setActiveView('Contacts')} style={{ display: 'inline-block', marginTop: '8px', fontSize: '12.5px', color: '#10b981', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>
//                 Click here to add trusted guardians
//               </span>
//             </div>
//           ) : (
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
//               {contacts.map((person) => (
//                 <div className="contact-item" key={person.id || person._id} style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', background: colors.cardBg, borderRadius: '16px', border: `1px solid ${colors.cardBorder}` }}>
//                   <div className="contact-avatar" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginRight: '14px', flexShrink: 0, fontSize: '14px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
//                     {person.name ? person.name.charAt(0).toUpperCase() : '?'}
//                   </div>
//                   <div style={{ textAlign: 'left', overflow: 'hidden' }}>
//                     <h5 style={{ margin: 0, fontSize: '13.5px', fontWeight: '700', color: colors.primaryText, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
//                       <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '120px' }}>{person.name}</span> 
//                       <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '700', background: 'rgba(16, 185, 129, 0.08)', padding: '2px 8px', borderRadius: '50px' }}>{person.role}</span>
//                     </h5>
//                     <p style={{ margin: 0, fontSize: '11.5px', color: colors.secondaryText, marginTop: '5px', fontWeight: '500' }}>📞 {person.phone}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* 📊 BOTTOM GRID CARDS */}
//         <div className="bottom-grid">
          
//           <div className="grid-card-hover premium-responsive-card" style={{ ...premiumCardStyle, position: 'relative', zIndex: 1 }}>
//             <div style={{ filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%)' : 'none', borderRadius: '14px', overflow: 'hidden', height: '100%', minHeight: '220px', width: '100%' }}>
//               <LiveLocationPage />
//             </div>
//           </div>

//           <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
//             <div className="card-title-bar" style={{ borderBottom: `1px solid ${colors.cardBorder}`, paddingBottom: '12px', marginBottom: '16px', fontWeight: '800', fontSize: '15px', color: colors.primaryText, textAlign: 'left' }}>
//               <span>🛡️ Safety Tips & Guidelines</span>
//             </div>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1, textAlign: 'left' }}>
//               <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '12px 14px', borderRadius: '12px', borderLeft: '4px solid #ef4444', fontWeight: '600', lineHeight: '1.5' }}>
//                 🚶‍♀️ <strong>Isolated Routes:</strong> Avoid dark routes. Keep your phone in hand but stay aware.
//               </div>
//               <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '12px 14px', borderRadius: '12px', borderLeft: '4px solid #10b981', fontWeight: '600', lineHeight: '1.5' }}>
//                 📱 <strong>Speed Dials:</strong> Memorize quick emergency hotkeys and speed dials (999).
//               </div>
//               <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '10px 14px', borderRadius: '12px', borderLeft: `4px solid ${isDark ? '#10b981' : '#093325'}`, fontWeight: '600', lineHeight: '1.5' }}>
//                 🚗 <strong>Ride Verification:</strong> Verify the license plates and driver profile beforehand.
//               </div>
//             </div>
//           </div>
          
//           <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
//             <div style={{ color: colors.primaryText, width: '100%' }}>
//               <ReportIncident />
//             </div>
//           </div>
          
//           <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
//             <div className="card-title-bar" style={{ borderBottom: `1px solid ${colors.cardBorder}`, paddingBottom: '12px', marginBottom: '16px', fontWeight: '800', fontSize: '15px', color: colors.primaryText, textAlign: 'left' }}>
//               <span>⏳ Your Live Alert History</span>
//             </div>
            
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
//               {reportsLoading ? (
//                 <p style={{ fontSize: '12px', color: colors.secondaryText, textAlign: 'center', fontWeight: '500' }}>Syncing history nodes...</p>
//               ) : (!reports || reports.length === 0) ? (
//                 <p style={{ fontSize: '12px', color: colors.secondaryText, textAlign: 'center', fontStyle: 'italic', padding: '30px 0', fontWeight: '500' }}>
//                   ☘️ Secure Matrix Cleared. No incidents logged.
//                 </p>
//               ) : (
//                 reports.map((report) => {
//                   const isCritical = report.severity === 'CRITICAL' || report.severity === 'High' || report.severity === 'Critical';
//                   const bgStyle = isCritical ? (isDark ? '#2a1414' : '#fef2f2') : (isDark ? '#0e241b' : 'rgba(16, 185, 129, 0.04)');
//                   const borderStyle = isCritical ? (isDark ? '#4c1d1d' : '#fee2e2') : (isDark ? '#113829' : 'rgba(16, 185, 129, 0.12)');
//                   const accentColor = isCritical ? '#ef4444' : '#10b981';
//                   const textColor = isCritical ? (isDark ? '#fca5a5' : '#991b1b') : colors.primaryText;

//                   return (
//                     <div key={report.id || report._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', backgroundColor: bgStyle, borderRadius: '12px', border: `1px solid ${borderStyle}`, borderLeft: `4px solid ${accentColor}`, textAlign: 'left' }}>
//                       <div style={{ maxWidth: '72%' }}>
//                         <span style={{ fontSize: '12.5px', fontWeight: '700', color: textColor, display: 'block' }}>{report.location}</span>
//                         <span style={{ fontSize: '11.5px', color: colors.secondaryText, display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '3px' }}>{report.description}</span>
//                         <span style={{ fontSize: '10px', color: colors.secondaryText, display: 'block', marginTop: '3px', fontWeight: '500' }}>{report.timestamp}</span>
//                       </div>
//                       <span style={{ fontSize: '9px', backgroundColor: accentColor, color: 'white', padding: '4px 8px', borderRadius: '50px', fontWeight: '800', letterSpacing: '0.3px' }}>
//                         {report.severity ? report.severity.toUpperCase() : 'INFO'}
//                       </span>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }

// export default DashboardPage;















/////In Sha Allah final  code 




// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react'; 
import heroBgImage from '../assets/hero-bg.png'; // আপনার নতুন ব্যাকগ্রাউন্ড ইমেজটি এই পাথেই সেভ করা থাকবে
import ReportIncident from './ReportIncident.jsx'; 
import LiveLocationPage from './LiveLocationPage.jsx'; 
import emailjs from '@emailjs/browser'; 

function DashboardPage({ setActiveView, theme }) {
  const [contacts, setContacts] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  const [reports, setReports] = useState([]);
  const [reportsLoading, setReportsLoading] = useState(true);
  const [sosLoading, setSosLoading] = useState(false); 

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const backendUrl = 'https://rescue-her-back-1.onrender.com';

  const isDark = theme === 'dark'; 

  const fetchContacts = () => {
    if (!userId || !token) {
      setLoading(false);
      return;
    }

    fetch(`${backendUrl}/api/contacts?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error("Unauthorized Contacts Fetch");
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setContacts(data);
        } else if (data && Array.isArray(data.data)) {
          setContacts(data.data);
        } else {
          setContacts([]);
        }
        setTimeout(() => setLoading(false), 500); // UI Smoothness
      })
      .catch((err) => {
        console.error("❌ Backend connection failed (Contacts):", err);
        setContacts([]);
        setLoading(false);
      });
  };

  const fetchUserReports = () => {
    if (!userId || !token) {
      setReportsLoading(false);
      return;
    }

    fetch(`${backendUrl}/api/reports?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized Reports Fetch");
        return res.json();
      })
      .then((data) => {
        setReports(Array.isArray(data) ? data : []);
        setReportsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch alert history:", err);
        setReports([]);
        setReportsLoading(false);
      });
  };

  useEffect(() => {
    fetchContacts();
    fetchUserReports(); 
  }, [userId, token]);

  const handleSosTrigger = () => {
    if (!navigator.geolocation) {
      alert("⚠️ Geolocation is not supported by your browser!");
      return;
    }

    if (!userId || !token) {
      alert("🚨 Authentication Error: User session not found. Please log in again.");
      return;
    }

    setSosLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const googleMapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;
        
        fetch(`${backendUrl}/api/location/update`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ userId, latitude, longitude, area: "Dashboard SOS Trigger" })
        })
        .then(() => {
          return fetch(`${backendUrl}/api/sos/trigger`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              area: "Dashboard Security Hub"
            })
          });
        })
        .then((res) => res.json())
        .then(() => {
          if (contacts && contacts.length > 0) {
            const emailPromises = contacts.map((person) => {
              if (!person.email) return Promise.resolve(); 

              const templateParams = {
                user_name: "User", 
                to_email: person.email,
                name: person.name || "Guardian",
                message: `Emergency Triggered! Track my live location here: ${googleMapsLink}`,
                time: new Date().toLocaleString(),
                email: person.email,
                area: "Dashboard Security Hub",
                latitude: latitude,
                longitude: longitude
              };

              return emailjs.send(
                'service_8n0i8gk',      
                'template_ppnnfio',     
                templateParams,
                'hZ2bKqFAKIbDR_TyU'     
              );
            });

            return Promise.all(emailPromises);
          }
        })
        .then(() => {
          setSosLoading(false);
          alert(`🚨 EMERGENCY SOS ACTIVATED!\n\nLocation logged & Emergency alerts dispatched to your trusted networks via Email!\n\nTrack here: ${googleMapsLink}`);
          fetchUserReports(); 
        })
        .catch((err) => {
          console.error("❌ Failed to complete SOS chain:", err);
          setSosLoading(false);
          alert(`🚨 EMERGENCY SOS TRIGGERED (Offline/Email Error)!\nMaps Link: ${googleMapsLink}`);
        });
      },
      (error) => {
        setSosLoading(false);
        alert("⚠️ Could not fetch your location. Please check browser location permissions!");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const colors = {
    cardBg: isDark ? '#111a16' : '#ffffff',
    cardBorder: isDark ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.12)',
    primaryText: isDark ? '#f8fafc' : '#093325',
    secondaryText: isDark ? '#a2b7b0' : '#5c726a',
    innerBoxBg: isDark ? '#16231f' : '#fcfcfb',
    contactsPanelBg: isDark ? 'linear-gradient(135deg, #181111, #111a16)' : '#fff5f5'
  };

  const premiumCardStyle = {
    backgroundColor: colors.cardBg, 
    padding: '24px', 
    borderRadius: '20px', 
    border: `1px solid ${colors.cardBorder}`, 
    boxShadow: isDark ? '0 8px 30px rgba(0, 0, 0, 0.2)' : '0 8px 30px rgba(9, 51, 37, 0.03)', 
    display: 'flex', 
    flexDirection: 'column',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    width: '100%',            
    boxSizing: 'border-box',  
    overflow: 'hidden'        
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: isDark ? '#0a120f' : '#f3faf7', justifyContent: 'space-between', transition: 'all 0.3s ease' }}>
      
      <style>{`
        @keyframes sosPulse {
          0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.5); }
          70% { transform: scale(0.95); box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
          100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @keyframes borderGlow {
          0% { border-color: rgba(16, 185, 129, 0.25); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
          50% { border-color: rgba(255, 182, 193, 0.5); box-shadow: 0 8px 30px rgba(16, 185, 129, 0.08); }
          100% { border-color: rgba(16, 185, 129, 0.25); box-shadow: 0 8px 30px rgba(0,0,0,0.2); }
        }
        .animated-sos {
          animation: sosPulse 2s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }
        .grid-card-hover {
          transition: all 0.3s ease;
          ${isDark ? 'animation: borderGlow 4s infinite ease-in-out;' : ''}
        }
        .grid-card-hover:hover {
          transform: translateY(-4px);
          box-shadow: ${isDark ? '0 12px 35px rgba(16, 185, 129, 0.15) !important' : '0 12px 35px rgba(16, 185, 129, 0.08) !important'};
          border-color: #10b981 !important;
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 24px;
          margin-top: 28px;
          width: 100%;
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 16px 10px !important;
          }
          .hero-grid {
            padding: 30px 24px !important;
            min-height: auto !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 24px !important;
          }
          .hero-bg-overlay {
            background-size: cover !important;
            background-position: center !important;
            opacity: ${isDark ? 0.35 : 0.85} !important;
          }
          .hero-gradient-overlay {
            background: ${isDark 
              ? 'linear-gradient(135deg, rgba(17, 26, 22, 0.85) 0%, rgba(17, 26, 22, 0.65) 100%)' 
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(245, 228, 228, 0.1) 100%)'} !important;
          }
          .hero-left h1 {
            font-size: 28px !important;
          }
          .sos-box {
            width: 100% !important;
            justify-content: space-between !important;
            gap: 12px !important;
          }
          
          .quick-contacts-card {
            padding: 20px 16px !important;
          }
          .quick-contacts-card .card-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .quick-contacts-card .card-header button {
            width: 100% !important;
            padding: 10px !important;
            text-align: center !important;
          }

          .bottom-grid {
            grid-template-columns: 1fr !important; 
            gap: 20px !important;
          }

          .premium-responsive-card {
            padding: 18px 16px !important;
          }
        }

        @media (max-width: 480px) {
          .hero-left h1 {
            font-size: 24px !important;
          }
          .sos-box {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 16px !important;
          }
          .status-indicator {
            width: 100% !important;
            text-align: center !important;
            box-sizing: border-box !important;
          }
        }
      `}</style>
        
      <div style={{ padding: '24px 2%', flexGrow: 1 }}>
          
        {/* 🏷️ HERO GRID - FULL TEXTURED BACKGROUND CONFIGURED */}
        <div className="hero-grid" style={{ 
          backgroundColor: isDark ? '#111a16' : '#ffffff', 
          position: 'relative',
          padding: '40px 48px', 
          borderRadius: '24px',
          marginBottom: '28px',
          border: `1px solid ${colors.cardBorder}`,
          minHeight: '280px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        }}>
          
          {/* 🖼️ NEW FULL BACKGROUND SMOOTH TEXTURE ENGINE */}
          <div className="hero-bg-overlay" style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundImage: `url(${heroBgImage})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat',
            opacity: isDark ? 0.35 : 0.85, 
            zIndex: 1,
            transition: 'all 0.3s ease'
          }} />

          {/* 🎛️ SMART BLENDING OVERLAY FOR TEXT READABILITY */}
          <div className="hero-gradient-overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDark 
              ? 'linear-gradient(135deg, rgba(17, 26, 22, 0.85) 0%, rgba(17, 26, 22, 0.6) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(245, 228, 228, 0.05) 100%)',
            zIndex: 2,
            transition: 'all 0.3s ease'
          }} />

          <div style={{ zIndex: 3, display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', position: 'relative', width: '100%' }}>
            <div className="hero-left" style={{ maxWidth: '480px' }}>
              <h1 style={{ fontSize: '38px', fontWeight: '800', color: colors.primaryText, lineHeight: '1.2', margin: 0, letterSpacing: '-1.2px', transition: 'all 0.3s' }}>
                Your Safety,<br />
                <span style={{ fontStyle: 'italic', fontWeight: '400', fontFamily: 'Georgia, serif', color: '#10b981' }}>Our Priority</span>
              </h1>
              <p style={{ color: colors.secondaryText, marginTop: '12px', fontSize: '13.5px', fontWeight: '500', lineHeight: '1.6' }}>
                Press the SOS button in an emergency. The system will track your location and instantly dispatch alert notifications to your inner networks.
              </p>
            </div>
            <div className="sos-box" style={{ display: 'flex', alignItems: 'center', gap: '20px', transition: 'all 0.3s' }}>
              <div className={`sos-button ${sosLoading ? '' : 'animated-sos'}`} 
                   onClick={sosLoading ? null : handleSosTrigger} 
                   style={{ 
                     cursor: sosLoading ? 'not-allowed' : 'pointer', 
                     margin: '0',
                     opacity: sosLoading ? 0.7 : 1,
                     background: 'radial-gradient(circle, #ef4444 0%, #b91c1c 100%)',
                     boxShadow: '0 0 25px rgba(239, 68, 68, 0.45)',
                     borderRadius: '50%',
                     width: '90px',
                     height: '90px',
                     display: 'flex',
                     flexDirection: 'column',
                     alignItems: 'center',
                     justifyContent: 'center',
                     color: '#fff',
                     transition: 'all 0.3s ease',
                     flexShrink: 0
                   }}>
                <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '0.5px' }}>{sosLoading ? "..." : "SOS"}</span>
                <small style={{ fontSize: '9px', fontWeight: '600', opacity: 0.9, marginTop: '2px' }}>{sosLoading ? "Tracking..." : "Press Help"}</small>
              </div>
              <div className="status-indicator" style={{ background: colors.cardBg, padding: '10px 20px', borderRadius: '50px', fontSize: '12px', fontWeight: '700', color: colors.primaryText, border: `1px solid ${colors.cardBorder}`, boxShadow: '0 4px 12px rgba(0,0,0,0.02)', whiteSpace: 'nowrap' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', marginRight: '8px', boxShadow: '0 0 8px #10b981' }}></span>
                System Active
              </div>
            </div>
          </div>
        </div>

        {/* 👥 QUICK CONTACTS CARD */}
        <div className="quick-contacts-card" style={{ padding: '28px', borderRadius: '24px', background: colors.contactsPanelBg, border: `1px solid ${colors.cardBorder}`, transition: 'all 0.3s ease', width: '100%', boxSizing: 'border-box' }}>
          <div className="card-header" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontWeight: '800', color: colors.primaryText, margin: 0, fontSize: '18px', letterSpacing: '-0.3px' }}>👥 Trusted Quick Contacts</h4>
              <p style={{ margin: '4px 0 0 0', fontSize: '12.5px', color: colors.secondaryText }}>Live synced from your primary contact directory</p>
            </div>
            <button 
              onClick={() => setActiveView('Contacts')}
              style={{ padding: '8px 18px', background: colors.cardBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '50px', fontSize: '12px', fontWeight: '700', color: colors.primaryText, cursor: 'pointer', transition: 'all 0.2s' }}
            >
              ⚙️ Manage Contacts
            </button>
          </div>

          {loading ? (
            <p style={{ padding: '10px', fontSize: '13px', color: '#10b981', margin: 0, fontStyle: 'italic', fontWeight: '600', textAlign: 'left' }}>⏳ Syncing encrypted communication networks...</p>
          ) : (!contacts || contacts.length === 0) ? (
            <div style={{ padding: '40px 10px', textAlign: 'center', background: colors.cardBg, borderRadius: '16px', border: `1px dashed ${colors.cardBorder}` }}>
              <p style={{ margin: 0, fontSize: '13.5px', color: colors.secondaryText, fontStyle: 'italic' }}>
                ⚠️ No emergency networks configured yet.
              </p>
              <span onClick={() => setActiveView('Contacts')} style={{ display: 'inline-block', marginTop: '8px', fontSize: '12.5px', color: '#10b981', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}>
                Click here to add trusted guardians
              </span>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '14px' }}>
              {contacts.map((person) => (
                <div className="contact-item" key={person.id || person._id} style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', background: colors.cardBg, borderRadius: '16px', border: `1px solid ${colors.cardBorder}` }}>
                  <div className="contact-avatar" style={{ backgroundColor: 'rgba(16, 185, 129, 0.08)', color: '#10b981', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', marginRight: '14px', flexShrink: 0, fontSize: '14px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                    {person.name ? person.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                    <h5 style={{ margin: 0, fontSize: '13.5px', fontWeight: '700', color: colors.primaryText, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '120px' }}>{person.name}</span> 
                      <span style={{ fontSize: '10px', color: '#10b981', fontWeight: '700', background: 'rgba(16, 185, 129, 0.08)', padding: '2px 8px', borderRadius: '50px' }}>{person.role}</span>
                    </h5>
                    <p style={{ margin: 0, fontSize: '11.5px', color: colors.secondaryText, marginTop: '5px', fontWeight: '500' }}>📞 {person.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 📊 BOTTOM GRID CARDS */}
        <div className="bottom-grid">
          
          <div className="grid-card-hover premium-responsive-card" style={{ ...premiumCardStyle, position: 'relative', zIndex: 1 }}>
            <div style={{ filter: isDark ? 'invert(90%) hue-rotate(180deg) brightness(95%)' : 'none', borderRadius: '14px', overflow: 'hidden', height: '100%', minHeight: '220px', width: '100%' }}>
              <LiveLocationPage />
            </div>
          </div>

          <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
            <div className="card-title-bar" style={{ borderBottom: `1px solid ${colors.cardBorder}`, paddingBottom: '12px', marginBottom: '16px', fontWeight: '800', fontSize: '15px', color: colors.primaryText, textAlign: 'left' }}>
              <span>🛡️ Safety Tips & Guidelines</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1, textAlign: 'left' }}>
              <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '12px 14px', borderRadius: '12px', borderLeft: '4px solid #ef4444', fontWeight: '600', lineHeight: '1.5' }}>
                🚶‍♀️ <strong>Isolated Routes:</strong> Avoid dark routes. Keep your phone in hand but stay aware.
              </div>
              <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '12px 14px', borderRadius: '12px', borderLeft: '4px solid #10b981', fontWeight: '600', lineHeight: '1.5' }}>
                📱 <strong>Speed Dials:</strong> Memorize quick emergency hotkeys and speed dials (999).
              </div>
              <div style={{ fontSize: '12.5px', color: colors.primaryText, background: colors.innerBoxBg, padding: '10px 14px', borderRadius: '12px', borderLeft: `4px solid ${isDark ? '#10b981' : '#093325'}`, fontWeight: '600', lineHeight: '1.5' }}>
                🚗 <strong>Ride Verification:</strong> Verify the license plates and driver profile beforehand.
              </div>
            </div>
          </div>
          
          <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
            <div style={{ color: colors.primaryText, width: '100%' }}>
              <ReportIncident />
            </div>
          </div>
          
          <div className="grid-card-hover premium-responsive-card" style={premiumCardStyle}>
            <div className="card-title-bar" style={{ borderBottom: `1px solid ${colors.cardBorder}`, paddingBottom: '12px', marginBottom: '16px', fontWeight: '800', fontSize: '15px', color: colors.primaryText, textAlign: 'left' }}>
              <span>⏳ Your Live Alert History</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px' }}>
              {reportsLoading ? (
                <p style={{ fontSize: '12px', color: colors.secondaryText, textAlign: 'center', fontWeight: '500' }}>Syncing history nodes...</p>
              ) : (!reports || reports.length === 0) ? (
                <p style={{ fontSize: '12px', color: colors.secondaryText, textAlign: 'center', fontStyle: 'italic', padding: '30px 0', fontWeight: '500' }}>
                  ☘️ Secure Matrix Cleared. No incidents logged.
                </p>
              ) : (
                reports.map((report) => {
                  const isCritical = report.severity === 'CRITICAL' || report.severity === 'High' || report.severity === 'Critical';
                  const bgStyle = isCritical ? (isDark ? '#2a1414' : '#fef2f2') : (isDark ? '#0e241b' : 'rgba(16, 185, 129, 0.04)');
                  const borderStyle = isCritical ? (isDark ? '#4c1d1d' : '#fee2e2') : (isDark ? '#113829' : 'rgba(16, 185, 129, 0.12)');
                  const accentColor = isCritical ? '#ef4444' : '#10b981';
                  const textColor = isCritical ? (isDark ? '#fca5a5' : '#991b1b') : colors.primaryText;

                  return (
                    <div key={report.id || report._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', backgroundColor: bgStyle, borderRadius: '12px', border: `1px solid ${borderStyle}`, borderLeft: `4px solid ${accentColor}`, textAlign: 'left' }}>
                      <div style={{ maxWidth: '72%' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: '700', color: textColor, display: 'block' }}>{report.location}</span>
                        <span style={{ fontSize: '11.5px', color: colors.secondaryText, display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '3px' }}>{report.description}</span>
                        <span style={{ fontSize: '10px', color: colors.secondaryText, display: 'block', marginTop: '3px', fontWeight: '500' }}>{report.timestamp}</span>
                      </div>
                      <span style={{ fontSize: '9px', backgroundColor: accentColor, color: 'white', padding: '4px 8px', borderRadius: '50px', fontWeight: '800', letterSpacing: '0.3px' }}>
                        {report.severity ? report.severity.toUpperCase() : 'INFO'}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default DashboardPage;