
/////////////////222/////////////////



// // src/App.jsx
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import LandingPage from './pages/LandingPage'; 
// import DashboardPage from './pages/DashboardPage';
// import SOSPage from './pages/SOSPage';
// import ContactsPage from './pages/ContactsPage';
// import LiveLocationPage from './pages/LiveLocationPage';
// import SafetyTipsPage from './pages/SafetyTipsPage';
// import ReportIncidentPage from './pages/ReportIncidentPage';
// import AlertHistoryPage from './pages/AlertHistoryPage';
// import AboutPage from './pages/AboutPage'; 
// import SettingsPage from './pages/SettingsPage';
// import ProfileView from './pages/ProfileView';
// import FAQPage from './pages/FAQPage'; // 👈 FAQPage ইম্পোর্ট করা হলো

// function App() {
//   const [activePage, setActivePage] = useState(() => {
//     const savedToken = localStorage.getItem('token');
//     return savedToken ? 'Dashboard' : 'Landing';
//   });

//   const [userName, setUserName] = useState(() => {
//     return localStorage.getItem('userName') || 'User';
//   });
  
//   const [userAvatar, setUserAvatar] = useState(() => {
//     return localStorage.getItem('profilePic') || '';
//   }); 
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     return localStorage.getItem('token') !== null;
//   });

//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     return localStorage.getItem('themeMode') === 'dark';
//   });

//   useEffect(() => {
//     const savedToken = localStorage.getItem('token');
//     const savedName = localStorage.getItem('userName');
//     const userId = localStorage.getItem('userId');
//     const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';
    
//     const localPic = localStorage.getItem('profilePic');
//     if (localPic) {
//       setUserAvatar(localPic);
//     }

//     if (savedToken) {
//       setIsLoggedIn(true);
//       if (savedName) setUserName(savedName);

//       if (userId) {
//         fetch(`${backendUrl}/api/profile/${userId}`, {
//           headers: {
//             'Authorization': `Bearer ${savedToken}`
//           }
//         })
//           .then(res => {
//             if (!res.ok) throw new Error("Profile API endpoint is not configured yet.");
//             return res.json();
//           })
//           .then(data => {
//             if (data && data.profile_pic) {
//               const fullImgUrl = `${backendUrl}${data.profile_pic}`;
//               setUserAvatar(fullImgUrl);
//               localStorage.setItem('profilePic', fullImgUrl);
//             }
//           })
//           .catch(err => {
//             console.log("ℹ️ Profile pic sync skipped: API route not implemented yet.");
//           });
//       }
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, [activePage]);

//   useEffect(() => {
//     const handleProfileUpdate = () => {
//       const updatedPic = localStorage.getItem('profilePic');
//       if (updatedPic) {
//         setUserAvatar(updatedPic);
//       }
//     };

//     window.addEventListener('profileLocalStorageUpdate', handleProfileUpdate);
//     window.addEventListener('storage', handleProfileUpdate);

//     return () => {
//       window.removeEventListener('profileLocalStorageUpdate', handleProfileUpdate);
//       window.removeEventListener('storage', handleProfileUpdate);
//     };
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('themeMode', isDarkMode ? 'dark' : 'light');
//   }, [isDarkMode]);

//   useEffect(() => {
//     const existingStyle = document.getElementById('professional-cursor-styles');
//     if (!existingStyle) {
//       const styleNode = document.createElement('style');
//       styleNode.id = 'professional-cursor-styles';
//       styleNode.innerHTML = `
//         html, body, a, button, [role="button"] {
//           cursor: none !important;
//         }
//         .custom-cursor-dot {
//           position: fixed;
//           width: 8px;
//           height: 8px;
//           background-color: #10b981;
//           border-radius: 50%;
//           pointer-events: none;
//           z-index: 999999;
//           transform: translate(-50%, -50%);
//           transition: width 0.2s, height 0.2s, opacity 0.3s ease;
//           opacity: 0;
//         }
//         .custom-cursor-glow {
//           position: fixed;
//           width: 32px;
//           height: 32px;
//           border: 2px solid rgba(16, 185, 129, 0.4);
//           background-color: rgba(16, 185, 129, 0.05);
//           border-radius: 50%;
//           pointer-events: none;
//           z-index: 999998;
//           transform: translate(-50%, -50%);
//           transition: transform 0.08s ease-out, width 0.2s, height 0.2s, opacity 0.3s ease;
//           opacity: 0;
//         }
//         .cursor-hovering .custom-cursor-dot {
//           width: 4px;
//           height: 4px;
//           background-color: #ef4444;
//         }
//         .cursor-hovering .custom-cursor-glow {
//           width: 48px;
//           height: 48px;
//           border-color: rgba(239, 68, 68, 0.6);
//           background-color: rgba(239, 68, 68, 0.1);
//         }
//       `;
//       document.head.appendChild(styleNode);
//     }

//     const dot = document.createElement('div');
//     const glow = document.createElement('div');
//     dot.className = 'custom-cursor-dot';
//     glow.className = 'custom-cursor-glow';
//     document.body.appendChild(dot);
//     document.body.appendChild(glow);

//     const handleMouseMove = (e) => {
//       dot.style.opacity = '1';
//       glow.style.opacity = '1';
      
//       dot.style.left = `${e.clientX}px`;
//       dot.style.top = `${e.clientY}px`;
//       glow.style.left = `${e.clientX}px`;
//       glow.style.top = `${e.clientY}px`;

//       const target = e.target;
//       if (
//         target.tagName === 'BUTTON' || 
//         target.tagName === 'A' || 
//         target.closest('.nav-item') || 
//         window.getComputedStyle(target).cursor === 'pointer'
//       ) {
//         document.body.classList.add('cursor-hovering');
//       } else {
//         document.body.classList.remove('cursor-hovering');
//       }
//     };

//     const handleMouseLeave = () => {
//       dot.style.opacity = '0';
//       glow.style.opacity = '0';
//     };

//     const handleMouseEnter = () => {
//       dot.style.opacity = '1';
//       glow.style.opacity = '1';
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseleave', handleMouseLeave);
//     document.addEventListener('mouseenter', handleMouseEnter);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseleave', handleMouseLeave);
//       document.removeEventListener('mouseenter', handleMouseEnter);
//       dot.remove();
//       glow.remove();
//     };
//   }, []);

//   const handleExplore = (loggedInName) => {
//     if (loggedInName) {
//       setUserName(loggedInName);
//       localStorage.setItem('userName', loggedInName);
//     }
//     setIsLoggedIn(true);
//     setActivePage('Dashboard');
//   };

//   const handleActualLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('userName');
//     localStorage.removeItem('profilePic');
//     setIsLoggedIn(false);
//     setUserAvatar('');
//     setActivePage('Landing');
//   };

//   const renderPage = () => {
//     const currentTheme = isDarkMode ? 'dark' : 'light';
//     switch (activePage) {
//       case 'Dashboard': return <DashboardPage userName={userName} setActiveView={setActivePage} theme={currentTheme} />;
//       case 'SOS Alert': return <SOSPage theme={currentTheme} />;
//       case 'Contacts': return <ContactsPage theme={currentTheme} />;
//       case 'Live Location': return <LiveLocationPage theme={currentTheme} />;
//       case 'Safety Tips': return <SafetyTipsPage theme={currentTheme} />;
//       case 'Report Incident': return <ReportIncidentPage theme={currentTheme} />;
//       case 'Alert History': return <AlertHistoryPage theme={currentTheme} />;
//       case 'Settings': return <SettingsPage theme={currentTheme} />;
//       case 'About Us': return <AboutPage theme={currentTheme} />; 
//       case 'Profile': return <ProfileView onLogout={handleActualLogout} setActiveView={setActivePage} theme={currentTheme} />;
//       case 'FAQ': return <FAQPage theme={currentTheme} />; // 👈 সুইচ কেসে FAQPage রেন্ডার করা হলো
//       default:
//         return (
//           <div style={{ padding: '20px', color: isDarkMode ? '#94a3b8' : '#64748b', textAlign: 'left' }}>
//             <h3 style={{ fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#093325' }}>Module Under Development</h3>
//             <p style={{ fontSize: '14px' }}>The requested matrix endpoint ({activePage}) is currently compiling.</p>
//           </div>
//         );
//     }
//   };

//   if (activePage === 'Landing') {
//     return (
//       <LandingPage 
//         onExplore={handleExplore} 
//         isLoggedIn={isLoggedIn} 
//         setActiveView={setActivePage} 
//         theme={isDarkMode ? 'dark' : 'light'}
//         toggleTheme={() => setIsDarkMode(!isDarkMode)}
//       />
//     );
//   }

//   const themeStyles = {
//     bg: isDarkMode ? '#0a120f' : '#f3faf7',
//     text: isDarkMode ? '#f8fafc' : '#093325',
//     sidebarBg: isDarkMode ? '#111a16' : '#ffffff',
//     navbarBg: isDarkMode ? 'rgba(17, 26, 22, 0.92)' : 'rgba(243, 250, 247, 0.92)',
//     navbarBorder: isDarkMode ? 'rgba(255,255,255,0.06)' : '#edf2f7',
//     footerBg: isDarkMode ? '#141d19' : '#f0efe9',
//     footerBorder: isDarkMode ? 'rgba(255,255,255,0.06)' : '#dcdbd3',
//     cardText: isDarkMode ? '#a2b7b0' : '#5c726a'
//   };

//   return (
//     <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`} style={{ backgroundColor: themeStyles.bg, minHeight: '100vh', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', overflowX: 'hidden' }}>
      
//       {/* 📱 🚨 CRITICAL MOBILE RESPONSIVE FIXES INTERNAL STORAGE */}
//       <style>{`
//         @media (max-width: 768px) {
//           .desktop-only { display: none !important; }
//           .top-navbar { padding: 12px 16px !important; width: 100% !important; box-sizing: border-box !important; }
//           .mobile-logo-text { font-size: 18px !important; }
//           .mobile-gap { gap: 10px !important; }

//           /* 🌟 Footer Mobile Security Overhaul */
//           .dashboard-body {
//             padding: 16px !important; /* Reduces external body clipping */
//           }
//           .dashboard-footer {
//             padding: 40px 20px 24px 20px !important; /* Shrinks huge horizontal paddings safely */
//             margin-top: 40px !important;
//             gap: 30px !important;
//           }
//           .footer-grid {
//             grid-template-columns: 1fr !important; /* Converts multi column grid to simple vertical rows */
//             gap: 32px !important;
//             padding-bottom: 24px !important;
//           }
//           .footer-bottom-row {
//             flex-direction: column !important; /* Elements stack up instead of going side-by-side */
//             align-items: center !important;
//             text-align: center !important;
//             gap: 16px !important;
//           }
//           .footer-policy-links {
//             justify-content: center !important;
//             gap: 20px !important;
//           }
//         }
//       `}</style>

//       {/* SIDEBAR */}
//       <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ backgroundColor: themeStyles.sidebarBg, borderRight: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #edf2f7', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column' }}>
//         <div className="logo-container">
//           <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)} style={{ color: themeStyles.text }}>✕</button>

//           <div className="logo-section">
//             <h2 style={{ cursor: 'pointer', fontWeight: '900', letterSpacing: '-0.5px', color: themeStyles.text }} onClick={() => { setActivePage('Dashboard'); setIsSidebarOpen(false); }}>RescueHer</h2>
//             <p style={{ textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.5px', color: isDarkMode ? '#10b981' : '#64748b', fontWeight: '700', marginTop: '2px' }}>Safety Core Architecture</p>
//           </div>
          
//           <nav className="nav-links">
//             {[
//               { id: 'Dashboard', label: 'Dashboard Panel' },
//               { id: 'Profile', label: 'User Profile' },
//               { id: 'SOS Alert', label: 'SOS Emergency Core' },
//               { id: 'Contacts', label: 'Guardian Directory' },
//               { id: 'Live Location', label: 'Geospatial Tracking' },
//               { id: 'Safety Tips', label: 'Defensive Guidelines' },
//               { id: 'Report Incident', label: 'Threat Intelligence' },
//               { id: 'Alert History', label: 'Transmission Logs' },
//               { id: 'Settings', label: 'System Parameters' },
//               { id: 'FAQ', label: 'FAQ & Help Center' }, // 👈 সাইডবারে FAQ অপশন যুক্ত করা হলো
//               { id: 'About Us', label: 'Platform Overview' }
//             ].map(item => (
//               <div 
//                 key={item.id}
//                 className={`nav-item ${activePage === item.id ? 'active' : ''}`} 
//                 onClick={() => { setActivePage(item.id); setIsSidebarOpen(false); }}
//                 style={{ 
//                   color: activePage === item.id ? '#10b981' : themeStyles.text,
//                   fontWeight: activePage === item.id ? '800' : '500',
//                   background: activePage === item.id ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
//                   transition: 'all 0.2s ease'
//                 }}
//               >
//                 {item.label}
//               </div>
//             ))}
//           </nav>
//         </div>

//         <div className="emergency-helpline-card" style={{ background: isDarkMode ? 'rgba(239, 68, 68, 0.08)' : '#fee2e2', border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.15)' : '1px solid #fee2e2', borderRadius: '12px', padding: '16px', margin: '20px 0', transition: 'all 0.3s ease' }}>
//           <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px 0' }}>National Emergency Hotline</p>
//           <h3 style={{ color: '#dc2626', fontSize: '24px', fontWeight: '900', margin: 0 }}>999</h3>
//           <p style={{ fontSize: '10px', color: isDarkMode ? '#f8fafc' : '#7f1d1d', marginTop: '4px', fontWeight: '600' }}>Direct Law Enforcement Link</p>
//         </div>

//         {/* 🚪 Terminate Button inside Sidebar (Visible mainly for Mobile users) */}
//         <div style={{ marginTop: 'auto', padding: '20px 0 10px 0', borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #edf2f7' }}>
//           <button 
//             onClick={handleActualLogout}
//             style={{ 
//               width: '100%', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', 
//               border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', 
//               color: '#ef4444', fontWeight: '800', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
//             }}
//           >
//             Terminate Session
//           </button>
//         </div>
//       </aside>

//       {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

//       <main className="main-content" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
//         {/* 🔝 HEADER / NAVBAR */}
//         <header className="top-navbar" style={{ 
//           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//           position: 'sticky', top: 0, zIndex: 9999,
//           background: themeStyles.navbarBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
//           boxShadow: '0 4px 20px rgba(9, 51, 37, 0.05)',
//           padding: '14px 24px', borderBottom: `1px solid ${themeStyles.navbarBorder}`,
//           width: '100%', boxSizing: 'border-box',
//           transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
//         }}>
          
//           <div className="mobile-gap" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//             <button className="hamburger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ fontSize: '22px', color: themeStyles.text, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
//               ☰
//             </button>
            
//             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => setActivePage('Dashboard')}>
//               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//               </svg>
//               <span className="mobile-logo-text" style={{ fontSize: '20px', fontWeight: '900', color: themeStyles.text, letterSpacing: '-0.5px' }}>
//                 Rescue<span style={{ color: '#10b981' }}>Her</span>
//               </span>
//             </div>

//             <span className="desktop-only" onClick={() => setActivePage('Landing')} style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', cursor: 'pointer', marginLeft: '12px', padding: '4px 12px', borderRadius: '50px', background: 'rgba(16, 185, 129, 0.08)', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
//               Gateway Portal →
//             </span>
//           </div>

//           <div className="mobile-gap" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
//             <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#ffffff', border: `1px solid ${themeStyles.navbarBorder}`, borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
//               {isDarkMode ? '☀️' : '🌙'}
//             </button>

//             <span className="desktop-only" style={{ fontSize: '13.5px', fontWeight: '600', cursor: 'pointer', color: themeStyles.text }} onClick={() => setActivePage('Profile')}>
//               Session: <strong style={{ color: '#10b981', fontWeight: '700' }}>{userName}</strong> 
//             </span>
            
//             <div className="avatar" onClick={() => setActivePage('Profile')} style={{ backgroundImage: userAvatar ? `url(${userAvatar})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: userAvatar ? 'transparent' : '#10b981', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', border: activePage === 'Profile' ? '2px solid #10b981' : '2px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>
//               {!userAvatar && userName.charAt(0).toUpperCase()}
//             </div>
            
//             <button className="desktop-only" onClick={handleActualLogout} style={{ padding: '8px 16px', background: isDarkMode ? 'rgba(255,255,255,0.04)' : '#ffffff', border: '1px solid #e8ece9', borderRadius: '50px', fontSize: '11px', fontWeight: '700', color: themeStyles.text, cursor: 'pointer', textTransform: 'uppercase' }}>
//               Terminate
//             </button>
//           </div>
//         </header>

//         <div className="dashboard-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px', backgroundColor: themeStyles.bg, transition: 'all 0.3s ease' }}>
//           <div style={{ flex: 1 }}>
//             {renderPage()}
//           </div>

//           {/* 🌟 REFACTORING FOOTER WITH DYNAMIC STYLING CLASSES */}
//           <footer className="dashboard-footer" style={{
//             marginTop: '60px', padding: '50px 40px 30px 40px',
//             background: themeStyles.footerBg, borderRadius: '24px', 
//             display: 'flex', flexDirection: 'column', gap: '40px',
//             borderTop: `1px solid ${themeStyles.footerBorder}`, transition: 'all 0.3s ease'
//           }}>
            
//             <div className="footer-grid" style={{
//               display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//               gap: '40px', borderBottom: `1px solid ${themeStyles.footerBorder}`,
//               paddingBottom: '35px', textAlign: 'left'
//             }}>
              
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '24px', color: '#093325', letterSpacing: '-0.5px' }}>
//                   <svg width="26" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//                   </svg>
//                   <span style={{ color: themeStyles.text }}>Rescue<span style={{ color: '#10b981' }}>Her</span></span>
//                 </div>
//                 <p style={{ margin: 0, fontSize: '13.5px', color: themeStyles.cardText, lineHeight: '1.65', fontWeight: '500' }}>
//                   Next-gen community defense layer engineering advanced smart safety loops for absolute protection matrix.
//                 </p>
//               </div>

//               <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//                 <h4 style={{ margin: 0, fontSize: '12px', fontWeight: '800', color: '#10b981', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Emergency Response Hotlines</h4>
//                 <div style={{ fontSize: '13.5px', color: themeStyles.cardText, display: 'flex', flexDirection: 'column', gap: '10px', fontWeight: '600' }}>
//                   <span>National Command: <strong style={{ color: '#ef4444', fontWeight: '800' }}>999</strong></span>
//                   <span>Women Support Line: <strong style={{ color: '#10b981', fontWeight: '800' }}>109</strong></span>
//                   <span>Cyber Security Division: <strong style={{ color: themeStyles.cardText }}>Verified Relay</strong></span>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//                 <h4 style={{ margin: 0, fontSize: '12px', fontWeight: '800', color: '#10b981', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Platform Shortcuts</h4>
//                 <div style={{ color: themeStyles.cardText, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', fontWeight: '600' }}>
//                   <span onClick={() => setActivePage('Dashboard')} style={{ color: themeStyles.cardText, cursor: 'pointer', transition: 'color 0.2s' }}>System Control Dashboard</span>
//                   <span onClick={() => setActivePage('Safety Tips')} style={{ color: themeStyles.cardText, cursor: 'pointer', transition: 'color 0.2s' }}>Defensive Security Protocols</span>
//                   <span onClick={() => setActivePage('About Us')} style={{ color: themeStyles.cardText, cursor: 'pointer', transition: 'color 0.2s' }}>Architecture Documentation</span>
//                 </div>
//               </div>

//               <div style={{ 
//                 background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(9, 51, 37, 0.02)', 
//                 padding: '20px', borderRadius: '16px', borderLeft: '4px solid #10b981',
//                 display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left'
//               }}>
//                 <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: themeStyles.text, fontStyle: 'italic' }}>
//                   "Autonomy Through Security"
//                 </h5>
//                 <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: themeStyles.cardText, lineHeight: '1.5', fontWeight: '500' }}>
//                   Continuous backend telemetry processing provides active surveillance shielding during isolated transit states.
//                 </p>
//               </div>
//             </div>

//             <div className="footer-bottom-row" style={{ 
//               display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
//               flexWrap: 'wrap', gap: '12px', fontSize: '12.5px', color: themeStyles.cardText, fontWeight: '500'
//             }}>
//               <span>&copy; {new Date().getFullYear()} RescueHer Grid. Decentralized Civilian Network.</span>
//               <div className="footer-policy-links" style={{ display: 'flex', gap: '24px', fontWeight: '700' }}>
//                 <span style={{ cursor: 'pointer', color: '#10b981' }}>Privacy Policy</span>
//                 <span style={{ cursor: 'pointer', color: '#10b981' }}>Terms of Service</span>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;












// //////////////----------////////////



// // src/App.jsx
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import LandingPage from './pages/LandingPage'; 
// import DashboardPage from './pages/DashboardPage';
// import SOSPage from './pages/SOSPage';
// import ContactsPage from './pages/ContactsPage';
// import LiveLocationPage from './pages/LiveLocationPage';
// import SafetyTipsPage from './pages/SafetyTipsPage';
// import ReportIncidentPage from './pages/ReportIncidentPage';
// import AlertHistoryPage from './pages/AlertHistoryPage';
// import AboutPage from './pages/AboutPage'; 
// import SettingsPage from './pages/SettingsPage';
// import ProfileView from './pages/ProfileView';
// import FAQPage from './pages/FAQPage';

// function App() {
//   const [activePage, setActivePage] = useState(() => {
//     const savedToken = localStorage.getItem('token');
//     return savedToken ? 'Dashboard' : 'Landing';
//   });

//   const [userName, setUserName] = useState(() => {
//     return localStorage.getItem('userName') || 'User';
//   });
  
//   const [userAvatar, setUserAvatar] = useState(() => {
//     return localStorage.getItem('profilePic') || '';
//   }); 
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     return localStorage.getItem('token') !== null;
//   });

//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     return localStorage.getItem('themeMode') === 'dark';
//   });

//   useEffect(() => {
//     const savedToken = localStorage.getItem('token');
//     const savedName = localStorage.getItem('userName');
//     const userId = localStorage.getItem('userId');
//     const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';
    
//     const localPic = localStorage.getItem('profilePic');
//     if (localPic) {
//       setUserAvatar(localPic);
//     }

//     if (savedToken) {
//       setIsLoggedIn(true);
//       if (savedName) setUserName(savedName);

//       if (userId) {
//         fetch(`${backendUrl}/api/profile/${userId}`, {
//           headers: {
//             'Authorization': `Bearer ${savedToken}`
//           }
//         })
//           .then(res => {
//             if (!res.ok) throw new Error("Profile API endpoint is not configured yet.");
//             return res.json();
//           })
//           .then(data => {
//             if (data && data.profile_pic) {
//               const fullImgUrl = `${backendUrl}${data.profile_pic}`;
//               setUserAvatar(fullImgUrl);
//               localStorage.setItem('profilePic', fullImgUrl);
//             }
//           })
//           .catch(err => {
//             console.log("ℹ️ Profile pic sync skipped: API route not implemented yet.");
//           });
//       }
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, [activePage]);

//   useEffect(() => {
//     const handleProfileUpdate = () => {
//       const updatedPic = localStorage.getItem('profilePic');
//       if (updatedPic) {
//         setUserAvatar(updatedPic);
//       }
//     };

//     window.addEventListener('profileLocalStorageUpdate', handleProfileUpdate);
//     window.addEventListener('storage', handleProfileUpdate);

//     return () => {
//       window.removeEventListener('profileLocalStorageUpdate', handleProfileUpdate);
//       window.removeEventListener('storage', handleProfileUpdate);
//     };
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('themeMode', isDarkMode ? 'dark' : 'light');
//   }, [isDarkMode]);

//   useEffect(() => {
//     const existingStyle = document.getElementById('professional-cursor-styles');
//     if (!existingStyle) {
//       const styleNode = document.createElement('style');
//       styleNode.id = 'professional-cursor-styles';
//       styleNode.innerHTML = `
//         html, body, a, button, [role="button"] {
//           cursor: none !important;
//         }
//         .custom-cursor-dot {
//           position: fixed;
//           width: 8px;
//           height: 8px;
//           background-color: #10b981;
//           border-radius: 50%;
//           pointer-events: none;
//           z-index: 999999;
//           transform: translate(-50%, -50%);
//           transition: width 0.2s, height 0.2s, opacity 0.3s ease;
//           opacity: 0;
//         }
//         .custom-cursor-glow {
//           position: fixed;
//           width: 32px;
//           height: 32px;
//           border: 2px solid rgba(16, 185, 129, 0.4);
//           background-color: rgba(16, 185, 129, 0.05);
//           border-radius: 50%;
//           pointer-events: none;
//           z-index: 999998;
//           transform: translate(-50%, -50%);
//           transition: transform 0.08s ease-out, width 0.2s, height 0.2s, opacity 0.3s ease;
//           opacity: 0;
//         }
//         .cursor-hovering .custom-cursor-dot {
//           width: 4px;
//           height: 4px;
//           background-color: #ef4444;
//         }
//         .cursor-hovering .custom-cursor-glow {
//           width: 48px;
//           height: 48px;
//           border-color: rgba(239, 68, 68, 0.6);
//           background-color: rgba(239, 68, 68, 0.1);
//         }
//       `;
//       document.head.appendChild(styleNode);
//     }

//     const dot = document.createElement('div');
//     const glow = document.createElement('div');
//     dot.className = 'custom-cursor-dot';
//     glow.className = 'custom-cursor-glow';
//     document.body.appendChild(dot);
//     document.body.appendChild(glow);

//     const handleMouseMove = (e) => {
//       dot.style.opacity = '1';
//       glow.style.opacity = '1';
      
//       dot.style.left = `${e.clientX}px`;
//       dot.style.top = `${e.clientY}px`;
//       glow.style.left = `${e.clientX}px`;
//       glow.style.top = `${e.clientY}px`;

//       const target = e.target;
//       if (
//         target.tagName === 'BUTTON' || 
//         target.tagName === 'A' || 
//         target.closest('.nav-item') || 
//         window.getComputedStyle(target).cursor === 'pointer'
//       ) {
//         document.body.classList.add('cursor-hovering');
//       } else {
//         document.body.classList.remove('cursor-hovering');
//       }
//     };

//     const handleMouseLeave = () => {
//       dot.style.opacity = '0';
//       glow.style.opacity = '0';
//     };

//     const handleMouseEnter = () => {
//       dot.style.opacity = '1';
//       glow.style.opacity = '1';
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseleave', handleMouseLeave);
//     document.addEventListener('mouseenter', handleMouseEnter);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseleave', handleMouseLeave);
//       document.removeEventListener('mouseenter', handleMouseEnter);
//       dot.remove();
//       glow.remove();
//     };
//   }, []);

//   const handleExplore = (loggedInName) => {
//     if (loggedInName) {
//       setUserName(loggedInName);
//       localStorage.setItem('userName', loggedInName);
//     }
//     setIsLoggedIn(true);
//     setActivePage('Dashboard');
//   };

//   const handleActualLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('userName');
//     localStorage.removeItem('profilePic');
//     setIsLoggedIn(false);
//     setUserAvatar('');
//     setActivePage('Landing');
//   };

//   const renderPage = () => {
//     const currentTheme = isDarkMode ? 'dark' : 'light';
//     switch (activePage) {
//       case 'Dashboard': return <DashboardPage userName={userName} setActiveView={setActivePage} theme={currentTheme} />;
//       case 'SOS Alert': return <SOSPage theme={currentTheme} />;
//       case 'Contacts': return <ContactsPage theme={currentTheme} />;
//       case 'Live Location': return <LiveLocationPage theme={currentTheme} />;
//       case 'Safety Tips': return <SafetyTipsPage theme={currentTheme} />;
//       case 'Report Incident': return <ReportIncidentPage theme={currentTheme} />;
//       case 'Alert History': return <AlertHistoryPage theme={currentTheme} />;
//       case 'Settings': return <SettingsPage theme={currentTheme} />;
//       case 'About Us': return <AboutPage theme={currentTheme} />; 
//       case 'Profile': return <ProfileView onLogout={handleActualLogout} setActiveView={setActivePage} theme={currentTheme} />;
//       case 'FAQ': return <FAQPage theme={currentTheme} />;
//       default:
//         return (
//           <div style={{ padding: '20px', color: isDarkMode ? '#94a3b8' : '#64748b', textAlign: 'left' }}>
//             <h3 style={{ fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#093325' }}>Module Under Development</h3>
//             <p style={{ fontSize: '14px' }}>The requested matrix endpoint ({activePage}) is currently compiling.</p>
//           </div>
//         );
//     }
//   };

//   if (activePage === 'Landing') {
//     return (
//       <LandingPage 
//         onExplore={handleExplore} 
//         isLoggedIn={isLoggedIn} 
//         setActiveView={setActivePage} 
//         theme={isDarkMode ? 'dark' : 'light'}
//         toggleTheme={() => setIsDarkMode(!isDarkMode)}
//       />
//     );
//   }

//   const themeStyles = {
//     bg: isDarkMode ? '#0a120f' : '#f3faf7',
//     text: isDarkMode ? '#f8fafc' : '#093325',
//     sidebarBg: isDarkMode ? '#111a16' : '#ffffff',
//     navbarBg: isDarkMode ? 'rgba(17, 26, 22, 0.92)' : 'rgba(243, 250, 247, 0.92)',
//     navbarBorder: isDarkMode ? 'rgba(255,255,255,0.06)' : '#edf2f7',
//     footerBg: isDarkMode ? '#141d19' : '#f0efe9',
//     footerBorder: isDarkMode ? 'rgba(255,255,255,0.06)' : '#dcdbd3',
//     cardText: isDarkMode ? '#a2b7b0' : '#5c726a'
//   };

//   return (
//     <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`} style={{ backgroundColor: themeStyles.bg, minHeight: '100vh', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', overflowX: 'hidden' }}>
      
//       {/* 📱 🚨 CRITICAL MOBILE RESPONSIVE FIXES INTERNAL STORAGE */}
//       <style>{`
//         @media (max-width: 768px) {
//           .desktop-only { display: none !important; }
//           .top-navbar { padding: 12px 16px !important; width: 100% !important; box-sizing: border-box !important; }
//           .mobile-logo-text { font-size: 18px !important; }
//           .mobile-gap { gap: 10px !important; }

//           /* 🌟 Footer Mobile Security Overhaul */
//           .dashboard-body {
//             padding: 16px !important;
//           }
//           .dashboard-footer {
//             padding: 40px 20px 24px 20px !important;
//             margin-top: 40px !important;
//             gap: 30px !important;
//           }
//           .footer-grid {
//             grid-template-columns: 1fr !important;
//             gap: 32px !important;
//             padding-bottom: 24px !important;
//           }
//           .footer-bottom-row {
//             flex-direction: column !important;
//             align-items: center !important;
//             text-align: center !important;
//             gap: 16px !important;
//           }
//           .footer-policy-links {
//             justify-content: center !important;
//             gap: 20px !important;
//           }
//         }
//       `}</style>

//       {/* SIDEBAR */}
//       <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ backgroundColor: themeStyles.sidebarBg, borderRight: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #edf2f7', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column' }}>
//         <div className="logo-container">
//           <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)} style={{ color: themeStyles.text }}>✕</button>

//           <div className="logo-section">
//             <h2 style={{ cursor: 'pointer', fontWeight: '900', letterSpacing: '-0.5px', color: themeStyles.text }} onClick={() => { setActivePage('Dashboard'); setIsSidebarOpen(false); }}>RescueHer</h2>
//             <p style={{ textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.5px', color: isDarkMode ? '#10b981' : '#64748b', fontWeight: '700', marginTop: '2px' }}>Safety Core Architecture</p>
//           </div>
          
//           <nav className="nav-links">
//             {[
//               { id: 'Landing', label: '🌐 Gateway Portal (Home)' }, // 👈 মোবাইল মেনুতে যুক্ত করা হলো
//               { id: 'Dashboard', label: 'Dashboard Panel' },
//               { id: 'Profile', label: 'User Profile' },
//               { id: 'SOS Alert', label: 'SOS Emergency Core' },
//               { id: 'Contacts', label: 'Guardian Directory' },
//               { id: 'Live Location', label: 'Geospatial Tracking' },
//               { id: 'Safety Tips', label: 'Defensive Guidelines' },
//               { id: 'Report Incident', label: 'Threat Intelligence' },
//               { id: 'Alert History', label: 'Transmission Logs' },
//               { id: 'Settings', label: 'System Parameters' },
//               { id: 'FAQ', label: 'FAQ & Help Center' },
//               { id: 'About Us', label: 'Platform Overview' }
//             ].map(item => (
//               <div 
//                 key={item.id}
//                 className={`nav-item ${activePage === item.id ? 'active' : ''}`} 
//                 onClick={() => { setActivePage(item.id); setIsSidebarOpen(false); }}
//                 style={{ 
//                   color: activePage === item.id ? '#10b981' : themeStyles.text,
//                   fontWeight: activePage === item.id ? '800' : '500',
//                   background: activePage === item.id ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
//                   transition: 'all 0.2s ease'
//                 }}
//               >
//                 {item.label}
//               </div>
//             ))}
//           </nav>
//         </div>

//         <div className="emergency-helpline-card" style={{ background: isDarkMode ? 'rgba(239, 68, 68, 0.08)' : '#fee2e2', border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.15)' : '1px solid #fee2e2', borderRadius: '12px', padding: '16px', margin: '20px 0', transition: 'all 0.3s ease' }}>
//           <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px 0' }}>National Emergency Hotline</p>
//           <h3 style={{ color: '#dc2626', fontSize: '24px', fontWeight: '900', margin: 0 }}>999</h3>
//           <p style={{ fontSize: '10px', color: isDarkMode ? '#f8fafc' : '#7f1d1d', marginTop: '4px', fontWeight: '600' }}>Direct Law Enforcement Link</p>
//         </div>

//         {/* 🚪 Terminate Button inside Sidebar (Visible mainly for Mobile users) */}
//         <div style={{ marginTop: 'auto', padding: '20px 0 10px 0', borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #edf2f7' }}>
//           <button 
//             onClick={handleActualLogout}
//             style={{ 
//               width: '100%', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', 
//               border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', 
//               color: '#ef4444', fontWeight: '800', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
//             }}
//           >
//             Terminate Session
//           </button>
//         </div>
//       </aside>

//       {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

//       <main className="main-content" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
//         {/* 🔝 HEADER / NAVBAR */}
//         <header className="top-navbar" style={{ 
//           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//           position: 'sticky', top: 0, zIndex: 9999,
//           background: themeStyles.navbarBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
//           boxShadow: '0 4px 20px rgba(9, 51, 37, 0.05)',
//           padding: '14px 24px', borderBottom: `1px solid ${themeStyles.navbarBorder}`,
//           width: '100%', boxSizing: 'border-box',
//           transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
//         }}>
          
//           <div className="mobile-gap" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//             <button className="hamburger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ fontSize: '22px', color: themeStyles.text, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
//               ☰
//             </button>
            
//             {/* 👈 লোগোতে ক্লিক করলে এখন Dashboard-এর বদলে Landing (Gateway Portal)-এ যাবে */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => setActivePage('Landing')}>
//               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//               </svg>
//               <span className="mobile-logo-text" style={{ fontSize: '20px', fontWeight: '900', color: themeStyles.text, letterSpacing: '-0.5px' }}>
//                 Rescue<span style={{ color: '#10b981' }}>Her</span>
//               </span>
//             </div>

//             <span className="desktop-only" onClick={() => setActivePage('Landing')} style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', cursor: 'pointer', marginLeft: '12px', padding: '4px 12px', borderRadius: '50px', background: 'rgba(16, 185, 129, 0.08)', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
//               Gateway Portal →
//             </span>
//           </div>

//           <div className="mobile-gap" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
//             <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#ffffff', border: `1px solid ${themeStyles.navbarBorder}`, borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
//               {isDarkMode ? '☀️' : '🌙'}
//             </button>

//             <span className="desktop-only" style={{ fontSize: '13.5px', fontWeight: '600', cursor: 'pointer', color: themeStyles.text }} onClick={() => setActivePage('Profile')}>
//               Session: <strong style={{ color: '#10b981', fontWeight: '700' }}>{userName}</strong> 
//             </span>
            
//             <div className="avatar" onClick={() => setActivePage('Profile')} style={{ backgroundImage: userAvatar ? `url(${userAvatar})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: userAvatar ? 'transparent' : '#10b981', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', border: activePage === 'Profile' ? '2px solid #10b981' : '2px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>
//               {!userAvatar && userName.charAt(0).toUpperCase()}
//             </div>
            
//             <button className="desktop-only" onClick={handleActualLogout} style={{ padding: '8px 16px', background: isDarkMode ? 'rgba(255,255,255,0.04)' : '#ffffff', border: '1px solid #e8ece9', borderRadius: '50px', fontSize: '11px', fontWeight: '700', color: themeStyles.text, cursor: 'pointer', textTransform: 'uppercase' }}>
//               Terminate
//             </button>
//           </div>
//         </header>

//         <div className="dashboard-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px', backgroundColor: themeStyles.bg, transition: 'all 0.3s ease' }}>
//           <div style={{ flex: 1 }}>
//             {renderPage()}
//           </div>

//           {/* 🌟 REFACTORING FOOTER WITH DYNAMIC STYLING CLASSES */}
//           <footer className="dashboard-footer" style={{
//             marginTop: '60px', padding: '50px 40px 30px 40px',
//             background: themeStyles.footerBg, borderRadius: '24px', 
//             display: 'flex', flexDirection: 'column', gap: '40px',
//             borderTop: `1px solid ${themeStyles.footerBorder}`, transition: 'all 0.3s ease'
//           }}>
            
//             <div className="footer-grid" style={{
//               display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//               gap: '40px', borderBottom: `1px solid ${themeStyles.footerBorder}`,
//               paddingBottom: '35px', textAlign: 'left'
//             }}>
              
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '24px', color: '#093325', letterSpacing: '-0.5px' }}>
//                   <svg width="26" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//                   </svg>
//                   <span style={{ color: themeStyles.text }}>Rescue<span style={{ color: '#10b981' }}>Her</span></span>
//                 </div>
//                 <p style={{ margin: 0, fontSize: '13.5px', color: themeStyles.cardText, lineHeight: '1.65', fontWeight: '500' }}>
//                   Next-gen community defense layer engineering advanced smart safety loops for absolute protection matrix.
//                 </p>
//               </div>

//               <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//                 <h4 style={{ margin: 0, fontSize: '12px', fontWeight: '800', color: '#10b981', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Emergency Response Hotlines</h4>
//                 <div style={{ fontSize: '13.5px', color: themeStyles.cardText, display: 'flex', flexDirection: 'column', gap: '10px', fontWeight: '600' }}>
//                   <span>National Command: <strong style={{ color: '#ef4444', fontWeight: '800' }}>999</strong></span>
//                   <span>Women Support Line: <strong style={{ color: '#10b981', fontWeight: '800' }}>109</strong></span>
//                   <span>Cyber Security Division: <strong style={{ color: themeStyles.cardText }}>Verified Relay</strong></span>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//                 <h4 style={{ margin: 0, fontSize: '12px', fontWeight: '800', color: '#10b981', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Platform Shortcuts</h4>
//                 <div style={{ color: themeStyles.cardText, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', fontWeight: '600' }}>
//                   <span onClick={() => setActivePage('Dashboard')} style={{ color: themeStyles.cardText, cursor: 'pointer', transition: 'color 0.2s' }}>System Control Dashboard</span>
//                   <span onClick={() => setActivePage('Safety Tips')} style={{ color: themeStyles.cardText, cursor: 'pointer', transition: 'color 0.2s' }}>Defensive Security Protocols</span>
//                   <span onClick={() => setActivePage('About Us')} style={{ color: themeStyles.cardText, cursor: 'pointer', transition: 'color 0.2s' }}>Architecture Documentation</span>
//                 </div>
//               </div>

//               <div style={{ 
//                 background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(9, 51, 37, 0.02)', 
//                 padding: '20px', borderRadius: '16px', borderLeft: '4px solid #10b981',
//                 display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left'
//               }}>
//                 <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: themeStyles.text, fontStyle: 'italic' }}>
//                   "Autonomy Through Security"
//                 </h5>
//                 <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: themeStyles.cardText, lineHeight: '1.5', fontWeight: '500' }}>
//                   Continuous backend telemetry processing provides active surveillance shielding during isolated transit states.
//                 </p>
//               </div>
//             </div>

//             <div className="footer-bottom-row" style={{ 
//               display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
//               flexWrap: 'wrap', gap: '12px', fontSize: '12.5px', color: themeStyles.cardText, fontWeight: '500'
//             }}>
//               <span>&copy; {new Date().getFullYear()} RescueHer Grid. Decentralized Civilian Network.</span>
//               <div className="footer-policy-links" style={{ display: 'flex', gap: '24px', fontWeight: '700' }}>
//                 <span style={{ cursor: 'pointer', color: '#10b981' }}>Privacy Policy</span>
//                 <span style={{ cursor: 'pointer', color: '#10b981' }}>Terms of Service</span>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;








// // src/App.jsx
// import React, { useState, useEffect } from 'react';
// import './App.css';
// import LandingPage from './pages/LandingPage'; 
// import DashboardPage from './pages/DashboardPage';
// import SOSPage from './pages/SOSPage';
// import ContactsPage from './pages/ContactsPage';
// import LiveLocationPage from './pages/LiveLocationPage';
// import SafetyTipsPage from './pages/SafetyTipsPage';
// import ReportIncidentPage from './pages/ReportIncidentPage';
// import AlertHistoryPage from './pages/AlertHistoryPage';
// import AboutPage from './pages/AboutPage'; 
// import SettingsPage from './pages/SettingsPage';
// import ProfileView from './pages/ProfileView';
// import FAQPage from './pages/FAQPage';

// function App() {
//   const [activePage, setActivePage] = useState(() => {
//     const savedToken = localStorage.getItem('token');
//     return savedToken ? 'Dashboard' : 'Landing';
//   });

//   const [userName, setUserName] = useState(() => {
//     return localStorage.getItem('userName') || 'User';
//   });
  
//   const [userAvatar, setUserAvatar] = useState(() => {
//     return localStorage.getItem('profilePic') || '';
//   }); 
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     return localStorage.getItem('token') !== null;
//   });

//   const [isDarkMode, setIsDarkMode] = useState(() => {
//     return localStorage.getItem('themeMode') === 'dark';
//   });

//   useEffect(() => {
//     const savedToken = localStorage.getItem('token');
//     const savedName = localStorage.getItem('userName');
//     const userId = localStorage.getItem('userId');
//     const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';
    
//     const localPic = localStorage.getItem('profilePic');
//     if (localPic) {
//       setUserAvatar(localPic);
//     }

//     if (savedToken) {
//       setIsLoggedIn(true);
//       if (savedName) setUserName(savedName);

//       if (userId) {
//         fetch(`${backendUrl}/api/profile/${userId}`, {
//           headers: {
//             'Authorization': `Bearer ${savedToken}`
//           }
//         })
//           .then(res => {
//             if (!res.ok) throw new Error("Profile API endpoint is not configured yet.");
//             return res.json();
//           })
//           .then(data => {
//             if (data && data.profile_pic) {
//               const fullImgUrl = `${backendUrl}${data.profile_pic}`;
//               setUserAvatar(fullImgUrl);
//               localStorage.setItem('profilePic', fullImgUrl);
//             }
//           })
//           .catch(err => {
//             console.log("ℹ️ Profile pic sync skipped: API route not implemented yet.");
//           });
//       }
//     } else {
//       setIsLoggedIn(false);
//     }
//   }, [activePage]);

//   useEffect(() => {
//     const handleProfileUpdate = () => {
//       const updatedPic = localStorage.getItem('profilePic');
//       if (updatedPic) {
//         setUserAvatar(updatedPic);
//       }
//     };

//     window.addEventListener('profileLocalStorageUpdate', handleProfileUpdate);
//     window.addEventListener('storage', handleProfileUpdate);

//     return () => {
//       window.removeEventListener('profileLocalStorageUpdate', handleProfileUpdate);
//       window.removeEventListener('storage', handleProfileUpdate);
//     };
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('themeMode', isDarkMode ? 'dark' : 'light');
//   }, [isDarkMode]);

//   useEffect(() => {
//     const existingStyle = document.getElementById('professional-cursor-styles');
//     if (!existingStyle) {
//       const styleNode = document.createElement('style');
//       styleNode.id = 'professional-cursor-styles';
//       styleNode.innerHTML = `
//         html, body, a, button, [role="button"] {
//           cursor: none !important;
//         }
//         .custom-cursor-dot {
//           position: fixed;
//           width: 8px;
//           height: 8px;
//           background-color: #10b981;
//           border-radius: 50%;
//           pointer-events: none;
//           z-index: 999999;
//           transform: translate(-50%, -50%);
//           transition: width 0.2s, height 0.2s, opacity 0.3s ease;
//           opacity: 0;
//         }
//         .custom-cursor-glow {
//           position: fixed;
//           width: 32px;
//           height: 32px;
//           border: 2px solid rgba(16, 185, 129, 0.4);
//           background-color: rgba(16, 185, 129, 0.05);
//           border-radius: 50%;
//           pointer-events: none;
//           z-index: 999998;
//           transform: translate(-50%, -50%);
//           transition: transform 0.08s ease-out, width 0.2s, height 0.2s, opacity 0.3s ease;
//           opacity: 0;
//         }
//         .cursor-hovering .custom-cursor-dot {
//           width: 4px;
//           height: 4px;
//           background-color: #ef4444;
//         }
//         .cursor-hovering .custom-cursor-glow {
//           width: 48px;
//           height: 48px;
//           border-color: rgba(239, 68, 68, 0.6);
//           background-color: rgba(239, 68, 68, 0.1);
//         }
//       `;
//       document.head.appendChild(styleNode);
//     }

//     const dot = document.createElement('div');
//     const glow = document.createElement('div');
//     dot.className = 'custom-cursor-dot';
//     glow.className = 'custom-cursor-glow';
//     document.body.appendChild(dot);
//     document.body.appendChild(glow);

//     const handleMouseMove = (e) => {
//       dot.style.opacity = '1';
//       glow.style.opacity = '1';
      
//       dot.style.left = `${e.clientX}px`;
//       dot.style.top = `${e.clientY}px`;
//       glow.style.left = `${e.clientX}px`;
//       glow.style.top = `${e.clientY}px`;

//       const target = e.target;
//       if (
//         target.tagName === 'BUTTON' || 
//         target.tagName === 'A' || 
//         target.closest('.nav-item') || 
//         window.getComputedStyle(target).cursor === 'pointer'
//       ) {
//         document.body.classList.add('cursor-hovering');
//       } else {
//         document.body.classList.remove('cursor-hovering');
//       }
//     };

//     const handleMouseLeave = () => {
//       dot.style.opacity = '0';
//       glow.style.opacity = '0';
//     };

//     const handleMouseEnter = () => {
//       dot.style.opacity = '1';
//       glow.style.opacity = '1';
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     document.addEventListener('mouseleave', handleMouseLeave);
//     document.addEventListener('mouseenter', handleMouseEnter);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       document.removeEventListener('mouseleave', handleMouseLeave);
//       document.removeEventListener('mouseenter', handleMouseEnter);
//       dot.remove();
//       glow.remove();
//     };
//   }, []);

//   const handleExplore = (loggedInName) => {
//     if (loggedInName) {
//       setUserName(loggedInName);
//       localStorage.setItem('userName', loggedInName);
//     }
//     setIsLoggedIn(true);
//     setActivePage('Dashboard');
//   };

//   const handleActualLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     localStorage.removeItem('userName');
//     localStorage.removeItem('profilePic');
//     setIsLoggedIn(false);
//     setUserAvatar('');
//     setActivePage('Landing');
//   };

//   const renderPage = () => {
//     const currentTheme = isDarkMode ? 'dark' : 'light';
//     switch (activePage) {
//       case 'Dashboard': return <DashboardPage userName={userName} setActiveView={setActivePage} theme={currentTheme} />;
//       case 'SOS Alert': return <SOSPage theme={currentTheme} />;
//       case 'Contacts': return <ContactsPage theme={currentTheme} />;
//       case 'Live Location': return <LiveLocationPage theme={currentTheme} />;
//       case 'Safety Tips': return <SafetyTipsPage theme={currentTheme} />;
//       case 'Report Incident': return <ReportIncidentPage theme={currentTheme} />;
//       case 'Alert History': return <AlertHistoryPage theme={currentTheme} />;
//       case 'Settings': return <SettingsPage theme={currentTheme} />;
//       case 'About Us': return <AboutPage theme={currentTheme} />; 
//       case 'Profile': return <ProfileView onLogout={handleActualLogout} setActiveView={setActivePage} theme={currentTheme} />;
//       case 'FAQ': return <FAQPage theme={currentTheme} />;
//       default:
//         return (
//           <div style={{ padding: '20px', color: isDarkMode ? '#94a3b8' : '#64748b', textAlign: 'left' }}>
//             <h3 style={{ fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#093325' }}>Module Under Development</h3>
//             <p style={{ fontSize: '14px' }}>The requested matrix endpoint ({activePage}) is currently compiling.</p>
//           </div>
//         );
//     }
//   };

//   if (activePage === 'Landing') {
//     return (
//       <LandingPage 
//         onExplore={handleExplore} 
//         isLoggedIn={isLoggedIn} 
//         setActiveView={setActivePage} 
//         theme={isDarkMode ? 'dark' : 'light'}
//         toggleTheme={() => setIsDarkMode(!isDarkMode)}
//       />
//     );
//   }

//   const themeStyles = {
//     bg: isDarkMode ? '#0a120f' : '#f3faf7',
//     text: isDarkMode ? '#f8fafc' : '#093325',
//     sidebarBg: isDarkMode ? '#111a16' : '#ffffff',
//     navbarBg: isDarkMode ? 'rgba(17, 26, 22, 0.92)' : 'rgba(243, 250, 247, 0.92)',
//     navbarBorder: isDarkMode ? 'rgba(255,255,255,0.06)' : '#edf2f7',
//     footerBg: isDarkMode ? '#141d19' : '#f0efe9',
//     footerBorder: isDarkMode ? 'rgba(255,255,255,0.06)' : '#dcdbd3',
//     cardText: isDarkMode ? '#a2b7b0' : '#5c726a'
//   };

//   return (
//     <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`} style={{ backgroundColor: themeStyles.bg, minHeight: '100vh', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', overflowX: 'hidden' }}>
      
//       {/* 📱 🚨 CRITICAL MOBILE RESPONSIVE FIXES INTERNAL STORAGE */}
//       <style>{`
//         /* 🚀 ১. সাইডবার স্ক্রল ফিক্স (হামবার্গার মেনুর জন্য) */
//         .sidebar {
//           overflow-y: auto !important; /* মেনু বড় হলে নিজে থেকেই স্ক্রলবার আনবে */
//           max-height: 100vh !important; /* স্ক্রিনের বাইরে যেতে দেবে না */
//           -webkit-overflow-scrolling: touch; /* মোবাইলে স্মুথ স্ক্রলিং */
//         }
        
//         /* সাইডবারের স্ক্রলবারটা একটু সুন্দর করার জন্য */
//         .sidebar::-webkit-scrollbar { width: 4px; }
//         .sidebar::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }

//         /* 🚀 ২. ড্যাশবোর্ড ওভারল্যাপ গ্লোবাল ফিক্স */
//         .app-container, .main-content {
//           overflow-x: hidden !important;
//           width: 100% !important;
//         }

//         @media (max-width: 768px) {
//           .desktop-only { display: none !important; }
//           .top-navbar { padding: 12px 16px !important; width: 100% !important; box-sizing: border-box !important; }
//           .mobile-logo-text { font-size: 18px !important; }
//           .mobile-gap { gap: 10px !important; }

//           /* 🌟 Footer Mobile Security Overhaul */
//           .dashboard-body {
//             padding: 16px !important;
//             width: 100% !important;
//             box-sizing: border-box !important;
//           }
//           .dashboard-footer {
//             padding: 40px 20px 24px 20px !important;
//             margin-top: 40px !important;
//             gap: 30px !important;
//           }
//           .footer-grid {
//             grid-template-columns: 1fr !important;
//             gap: 32px !important;
//             padding-bottom: 24px !important;
//           }
//           .footer-bottom-row {
//             flex-direction: column !important;
//             align-items: center !important;
//             text-align: center !important;
//             gap: 16px !important;
//           }
//           .footer-policy-links {
//             justify-content: center !important;
//             gap: 20px !important;
//           }
//         }
//       `}</style>

//       {/* SIDEBAR */}
//       <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ backgroundColor: themeStyles.sidebarBg, borderRight: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #edf2f7', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column' }}>
//         <div className="logo-container">
//           <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)} style={{ color: themeStyles.text }}>✕</button>

//           <div className="logo-section">
//             <h2 style={{ cursor: 'pointer', fontWeight: '900', letterSpacing: '-0.5px', color: themeStyles.text }} onClick={() => { setActivePage('Dashboard'); setIsSidebarOpen(false); }}>RescueHer</h2>
//             <p style={{ textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.5px', color: isDarkMode ? '#10b981' : '#64748b', fontWeight: '700', marginTop: '2px' }}>Safety Core Architecture</p>
//           </div>
          
//           <nav className="nav-links">
//             {[
//               { id: 'Landing', label: '🌐 Gateway Portal (Home)' }, 
//               { id: 'Dashboard', label: 'Dashboard Panel' },
//               { id: 'Profile', label: 'User Profile' },
//               { id: 'SOS Alert', label: 'SOS Emergency Core' },
//               { id: 'Contacts', label: 'Guardian Directory' },
//               { id: 'Live Location', label: 'Geospatial Tracking' },
//               { id: 'Safety Tips', label: 'Defensive Guidelines' },
//               { id: 'Report Incident', label: 'Threat Intelligence' },
//               { id: 'Alert History', label: 'Transmission Logs' },
//               { id: 'Settings', label: 'System Parameters' },
//               { id: 'FAQ', label: 'FAQ & Help Center' },
//               { id: 'About Us', label: 'Platform Overview' }
//             ].map(item => (
//               <div 
//                 key={item.id}
//                 className={`nav-item ${activePage === item.id ? 'active' : ''}`} 
//                 onClick={() => { setActivePage(item.id); setIsSidebarOpen(false); }}
//                 style={{ 
//                   color: activePage === item.id ? '#10b981' : themeStyles.text,
//                   fontWeight: activePage === item.id ? '800' : '500',
//                   background: activePage === item.id ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
//                   transition: 'all 0.2s ease'
//                 }}
//               >
//                 {item.label}
//               </div>
//             ))}
//           </nav>
//         </div>

//         <div className="emergency-helpline-card" style={{ background: isDarkMode ? 'rgba(239, 68, 68, 0.08)' : '#fee2e2', border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.15)' : '1px solid #fee2e2', borderRadius: '12px', padding: '16px', margin: '20px 0', transition: 'all 0.3s ease' }}>
//           <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px 0' }}>National Emergency Hotline</p>
//           <h3 style={{ color: '#dc2626', fontSize: '24px', fontWeight: '900', margin: 0 }}>999</h3>
//           <p style={{ fontSize: '10px', color: isDarkMode ? '#f8fafc' : '#7f1d1d', marginTop: '4px', fontWeight: '600' }}>Direct Law Enforcement Link</p>
//         </div>

//         {/* 🚪 Terminate Button inside Sidebar (Visible mainly for Mobile users) */}
//         <div style={{ marginTop: 'auto', padding: '20px 0 10px 0', borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #edf2f7' }}>
//           <button 
//             onClick={handleActualLogout}
//             style={{ 
//               width: '100%', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', 
//               border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', 
//               color: '#ef4444', fontWeight: '800', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
//             }}
//           >
//             Terminate Session
//           </button>
//         </div>
//       </aside>

//       {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

//       <main className="main-content" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
//         {/* 🔝 HEADER / NAVBAR */}
//         <header className="top-navbar" style={{ 
//           display: 'flex', justifyContent: 'space-between', alignItems: 'center',
//           position: 'sticky', top: 0, zIndex: 9999,
//           background: themeStyles.navbarBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
//           boxShadow: '0 4px 20px rgba(9, 51, 37, 0.05)',
//           padding: '14px 24px', borderBottom: `1px solid ${themeStyles.navbarBorder}`,
//           width: '100%', boxSizing: 'border-box',
//           transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
//         }}>
          
//           <div className="mobile-gap" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//             <button className="hamburger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ fontSize: '22px', color: themeStyles.text, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
//               ☰
//             </button>
            
//             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => setActivePage('Landing')}>
//               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//               </svg>
//               <span className="mobile-logo-text" style={{ fontSize: '20px', fontWeight: '900', color: themeStyles.text, letterSpacing: '-0.5px' }}>
//                 Rescue<span style={{ color: '#10b981' }}>Her</span>
//               </span>
//             </div>

//             <span className="desktop-only" onClick={() => setActivePage('Landing')} style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', cursor: 'pointer', marginLeft: '12px', padding: '4px 12px', borderRadius: '50px', background: 'rgba(16, 185, 129, 0.08)', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
//               Gateway Portal →
//             </span>
//           </div>

//           <div className="mobile-gap" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
//             <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#ffffff', border: `1px solid ${themeStyles.navbarBorder}`, borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
//               {isDarkMode ? '☀️' : '🌙'}
//             </button>

//             <span className="desktop-only" style={{ fontSize: '13.5px', fontWeight: '600', cursor: 'pointer', color: themeStyles.text }} onClick={() => setActivePage('Profile')}>
//               Session: <strong style={{ color: '#10b981', fontWeight: '700' }}>{userName}</strong> 
//             </span>
            
//             <div className="avatar" onClick={() => setActivePage('Profile')} style={{ backgroundImage: userAvatar ? `url(${userAvatar})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: userAvatar ? 'transparent' : '#10b981', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', border: activePage === 'Profile' ? '2px solid #10b981' : '2px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>
//               {!userAvatar && userName.charAt(0).toUpperCase()}
//             </div>
            
//             <button className="desktop-only" onClick={handleActualLogout} style={{ padding: '8px 16px', background: isDarkMode ? 'rgba(255,255,255,0.04)' : '#ffffff', border: '1px solid #e8ece9', borderRadius: '50px', fontSize: '11px', fontWeight: '700', color: themeStyles.text, cursor: 'pointer', textTransform: 'uppercase' }}>
//               Terminate
//             </button>
//           </div>
//         </header>

//         <div className="dashboard-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px', backgroundColor: themeStyles.bg, transition: 'all 0.3s ease' }}>
//           <div style={{ flex: 1 }}>
//             {renderPage()}
//           </div>

//           {/* 🌟 REFACTORING FOOTER WITH DYNAMIC STYLING CLASSES */}
//           <footer className="dashboard-footer" style={{
//             marginTop: '60px', padding: '50px 40px 30px 40px',
//             background: themeStyles.footerBg, borderRadius: '24px', 
//             display: 'flex', flexDirection: 'column', gap: '40px',
//             borderTop: `1px solid ${themeStyles.footerBorder}`, transition: 'all 0.3s ease'
//           }}>
            
//             <div className="footer-grid" style={{
//               display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
//               gap: '40px', borderBottom: `1px solid ${themeStyles.footerBorder}`,
//               paddingBottom: '35px', textAlign: 'left'
//             }}>
              
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '24px', color: '#093325', letterSpacing: '-0.5px' }}>
//                   <svg width="26" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//                   </svg>
//                   <span style={{ color: themeStyles.text }}>Rescue<span style={{ color: '#10b981' }}>Her</span></span>
//                 </div>
//                 <p style={{ margin: 0, fontSize: '13.5px', color: themeStyles.cardText, lineHeight: '1.65', fontWeight: '500' }}>
//                   Next-gen community defense layer engineering advanced smart safety loops for absolute protection matrix.
//                 </p>
//               </div>

//               <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//                 <h4 style={{ margin: 0, fontSize: '12px', fontWeight: '800', color: '#10b981', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Emergency Response Hotlines</h4>
//                 <div style={{ fontSize: '13.5px', color: themeStyles.cardText, display: 'flex', flexDirection: 'column', gap: '10px', fontWeight: '600' }}>
//                   <span>National Command: <strong style={{ color: '#ef4444', fontWeight: '800' }}>999</strong></span>
//                   <span>Women Support Line: <strong style={{ color: '#10b981', fontWeight: '800' }}>109</strong></span>
//                   <span>Cyber Security Division: <strong style={{ color: themeStyles.cardText }}>Verified Relay</strong></span>
//                 </div>
//               </div>

//               <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
//                 <h4 style={{ margin: 0, fontSize: '12px', fontWeight: '800', color: '#10b981', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Platform Shortcuts</h4>
//                 <div style={{ color: themeStyles.cardText, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', fontWeight: '600' }}>
//                   <span onClick={() => setActivePage('Dashboard')} style={{ color: themeStyles.cardText, cursor: 'pointer', transition: 'color 0.2s' }}>System Control Dashboard</span>
//                   <span onClick={() => setActivePage('Safety Tips')} style={{ color: themeStyles.cardText, cursor: 'pointer', transition: 'color 0.2s' }}>Defensive Security Protocols</span>
//                   <span onClick={() => setActivePage('About Us')} style={{ color: themeStyles.cardText, cursor: 'pointer', transition: 'color 0.2s' }}>Architecture Documentation</span>
//                 </div>
//               </div>

//               <div style={{ 
//                 background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(9, 51, 37, 0.02)', 
//                 padding: '20px', borderRadius: '16px', borderLeft: '4px solid #10b981',
//                 display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left'
//               }}>
//                 <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: themeStyles.text, fontStyle: 'italic' }}>
//                   "Autonomy Through Security"
//                 </h5>
//                 <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: themeStyles.cardText, lineHeight: '1.5', fontWeight: '500' }}>
//                   Continuous backend telemetry processing provides active surveillance shielding during isolated transit states.
//                 </p>
//               </div>
//             </div>

//             <div className="footer-bottom-row" style={{ 
//               display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
//               flexWrap: 'wrap', gap: '12px', fontSize: '12.5px', color: themeStyles.cardText, fontWeight: '500'
//             }}>
//               <span>&copy; {new Date().getFullYear()} RescueHer Grid. Decentralized Civilian Network.</span>
//               <div className="footer-policy-links" style={{ display: 'flex', gap: '24px', fontWeight: '700' }}>
//                 <span style={{ cursor: 'pointer', color: '#10b981' }}>Privacy Policy</span>
//                 <span style={{ cursor: 'pointer', color: '#10b981' }}>Terms of Service</span>
//               </div>
//             </div>
//           </footer>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;








////////////important code below for the app.jsx file



// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage'; 
import DashboardPage from './pages/DashboardPage';
import SOSPage from './pages/SOSPage';
import ContactsPage from './pages/ContactsPage';
import LiveLocationPage from './pages/LiveLocationPage';
import SafetyTipsPage from './pages/SafetyTipsPage';
import ReportIncidentPage from './pages/ReportIncidentPage';
import AlertHistoryPage from './pages/AlertHistoryPage';
import AboutPage from './pages/AboutPage'; 
import SettingsPage from './pages/SettingsPage';
import ProfileView from './pages/ProfileView';
import FAQPage from './pages/FAQPage';

function App() {
  const [activePage, setActivePage] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken ? 'Dashboard' : 'Landing';
  });

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || 'User';
  });
  
  const [userAvatar, setUserAvatar] = useState(() => {
    return localStorage.getItem('profilePic') || '';
  }); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('token') !== null;
  });

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('themeMode') === 'dark';
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';
    
    const localPic = localStorage.getItem('profilePic');
    if (localPic) {
      setUserAvatar(localPic);
    }

    if (savedToken) {
      setIsLoggedIn(true);
      if (savedName) setUserName(savedName);

      if (userId) {
        fetch(`${backendUrl}/api/profile/${userId}`, {
          headers: {
            'Authorization': `Bearer ${savedToken}`
          }
        })
          .then(res => {
            if (!res.ok) throw new Error("Profile API endpoint is not configured yet.");
            return res.json();
          })
          .then(data => {
            if (data && data.profile_pic) {
              const fullImgUrl = `${backendUrl}${data.profile_pic}`;
              setUserAvatar(fullImgUrl);
              localStorage.setItem('profilePic', fullImgUrl);
            }
          })
          .catch(err => {
            console.log("ℹ️ Profile pic sync skipped: API route not implemented yet.");
          });
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [activePage]);

  useEffect(() => {
    const handleProfileUpdate = () => {
      const updatedPic = localStorage.getItem('profilePic');
      if (updatedPic) {
        setUserAvatar(updatedPic);
      }
    };

    window.addEventListener('profileLocalStorageUpdate', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate);

    return () => {
      window.removeEventListener('profileLocalStorageUpdate', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const existingStyle = document.getElementById('professional-cursor-styles');
    if (!existingStyle) {
      const styleNode = document.createElement('style');
      styleNode.id = 'professional-cursor-styles';
      styleNode.innerHTML = `
        html, body, a, button, [role="button"] {
          cursor: none !important;
        }
        .custom-cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          pointer-events: none;
          z-index: 999999;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, opacity 0.3s ease;
          opacity: 0;
        }
        .custom-cursor-glow {
          position: fixed;
          width: 32px;
          height: 32px;
          border: 2px solid rgba(16, 185, 129, 0.4);
          background-color: rgba(16, 185, 129, 0.05);
          border-radius: 50%;
          pointer-events: none;
          z-index: 999998;
          transform: translate(-50%, -50%);
          transition: transform 0.08s ease-out, width 0.2s, height 0.2s, opacity 0.3s ease;
          opacity: 0;
        }
        .cursor-hovering .custom-cursor-dot {
          width: 4px;
          height: 4px;
          background-color: #ef4444;
        }
        .cursor-hovering .custom-cursor-glow {
          width: 48px;
          height: 48px;
          border-color: rgba(239, 68, 68, 0.6);
          background-color: rgba(239, 68, 68, 0.1);
        }
      `;
      document.head.appendChild(styleNode);
    }

    const dot = document.createElement('div');
    const glow = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    glow.className = 'custom-cursor-glow';
    document.body.appendChild(dot);
    document.body.appendChild(glow);

    const handleMouseMove = (e) => {
      dot.style.opacity = '1';
      glow.style.opacity = '1';
      
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;

      const target = e.target;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.nav-item') || 
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        document.body.classList.add('cursor-hovering');
      } else {
        document.body.classList.remove('cursor-hovering');
      }
    };

    const handleMouseLeave = () => {
      dot.style.opacity = '0';
      glow.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      dot.style.opacity = '1';
      glow.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      dot.remove();
      glow.remove();
    };
  }, []);

  const handleExplore = (loggedInName) => {
    if (loggedInName) {
      setUserName(loggedInName);
      localStorage.setItem('userName', loggedInName);
    }
    setIsLoggedIn(true);
    setActivePage('Dashboard');
  };

  const handleActualLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('profilePic');
    setIsLoggedIn(false);
    setUserAvatar('');
    setActivePage('Landing');
  };

  const renderPage = () => {
    const currentTheme = isDarkMode ? 'dark' : 'light';
    switch (activePage) {
      case 'Dashboard': return <DashboardPage userName={userName} setActiveView={setActivePage} theme={currentTheme} />;
      case 'SOS Alert': return <SOSPage theme={currentTheme} />;
      case 'Contacts': return <ContactsPage theme={currentTheme} />;
      case 'Live Location': return <LiveLocationPage theme={currentTheme} />;
      case 'Safety Tips': return <SafetyTipsPage theme={currentTheme} />;
      case 'Report Incident': return <ReportIncidentPage theme={currentTheme} />;
      case 'Alert History': return <AlertHistoryPage theme={currentTheme} />;
      case 'Settings': return <SettingsPage theme={currentTheme} />;
      case 'About Us': return <AboutPage theme={currentTheme} />; 
      case 'Profile': return <ProfileView onLogout={handleActualLogout} setActiveView={setActivePage} theme={currentTheme} />;
      case 'FAQ': return <FAQPage theme={currentTheme} />;
      default:
        return (
          <div style={{ padding: '20px', color: isDarkMode ? '#94a3b8' : '#64748b', textAlign: 'left' }}>
            <h3 style={{ fontWeight: '600', color: isDarkMode ? '#f8fafc' : '#093325' }}>Module Under Development</h3>
            <p style={{ fontSize: '14px' }}>The requested matrix endpoint ({activePage}) is currently compiling.</p>
          </div>
        );
    }
  };

  if (activePage === 'Landing') {
    return (
      <LandingPage 
        onExplore={handleExplore} 
        isLoggedIn={isLoggedIn} 
        setActiveView={setActivePage} 
        theme={isDarkMode ? 'dark' : 'light'}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />
    );
  }

  const themeStyles = {
    bg: isDarkMode ? '#0a120f' : '#f3faf7',
    text: isDarkMode ? '#f8fafc' : '#093325',
    sidebarBg: isDarkMode ? '#111a16' : '#ffffff',
    navbarBg: isDarkMode ? 'rgba(17, 26, 22, 0.92)' : 'rgba(243, 250, 247, 0.92)',
    navbarBorder: isDarkMode ? 'rgba(255,255,255,0.06)' : '#edf2f7',
    footerBg: isDarkMode ? '#141d19' : '#f0efe9',
    footerBorder: isDarkMode ? 'rgba(255,255,255,0.06)' : '#dcdbd3',
    cardText: isDarkMode ? '#a2b7b0' : '#5c726a'
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`} style={{ backgroundColor: themeStyles.bg, minHeight: '100vh', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', overflowX: 'hidden' }}>
      
      {/* 📱 🚨 CRITICAL MOBILE RESPONSIVE FIXES INTERNAL STORAGE */}
      <style>{`
        /* 🚀 ১. সাইডবার স্ক্রল ফিক্স (হামবার্গার মেনুর জন্য) */
        .sidebar {
          overflow-y: auto !important; /* মেনু বড় হলে নিজে থেকেই স্ক্রলবার আনবে */
          max-height: 100vh !important; /* স্ক্রিনের বাইরে যেতে দেবে না */
          -webkit-overflow-scrolling: touch; /* মোবাইলে স্মুথ স্ক্রলিং */
        }
        
        /* সাইডবারের স্ক্রলবারটা একটু সুন্দর করার জন্য */
        .sidebar::-webkit-scrollbar { width: 4px; }
        .sidebar::-webkit-scrollbar-thumb { background: #10b981; border-radius: 10px; }

        /* 🚀 ২. ড্যাশবোর্ড ওভারল্যাপ গ্লোবাল ফিক্স */
        .app-container, .main-content {
          overflow-x: hidden !important;
          width: 100% !important;
        }

        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .top-navbar { padding: 12px 16px !important; width: 100% !important; box-sizing: border-box !important; }
          .mobile-logo-text { font-size: 18px !important; }
          .mobile-gap { gap: 10px !important; }

          /* 🌟 Footer Mobile Security Overhaul */
          .dashboard-body {
            padding: 16px !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .dashboard-footer {
            padding: 40px 20px 24px 20px !important;
            margin-top: 40px !important;
            gap: 30px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
            padding-bottom: 24px !important;
          }
          .footer-bottom-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 16px !important;
          }
          .footer-policy-links {
            justify-content: center !important;
            gap: 20px !important;
          }
        }
      `}</style>

      {/* SIDEBAR */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`} style={{ backgroundColor: themeStyles.sidebarBg, borderRight: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #edf2f7', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column' }}>
        <div className="logo-container">
          <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)} style={{ color: themeStyles.text }}>✕</button>

          <div className="logo-section">
            <h2 style={{ cursor: 'pointer', fontWeight: '900', letterSpacing: '-0.5px', color: themeStyles.text }} onClick={() => { setActivePage('Dashboard'); setIsSidebarOpen(false); }}>RescueHer</h2>
            <p style={{ textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.5px', color: isDarkMode ? '#10b981' : '#64748b', fontWeight: '700', marginTop: '2px' }}>Safety Core Architecture</p>
          </div>
          
          <nav className="nav-links">
            {[
              { id: 'Landing', label: '🌐 Gateway Portal (Home)' }, 
              { id: 'Dashboard', label: 'Dashboard Panel' },
              { id: 'Profile', label: 'User Profile' },
              { id: 'SOS Alert', label: 'SOS Emergency Core' },
              { id: 'Contacts', label: 'Guardian Directory' },
              { id: 'Live Location', label: 'Geospatial Tracking' },
              { id: 'Safety Tips', label: 'Defensive Guidelines' },
              { id: 'Report Incident', label: 'Threat Intelligence' },
              { id: 'Alert History', label: 'Transmission Logs' },
              { id: 'Settings', label: 'System Parameters' },
              { id: 'FAQ', label: 'FAQ & Help Center' },
              { id: 'About Us', label: 'Platform Overview' }
            ].map(item => (
              <div 
                key={item.id}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`} 
                onClick={() => { setActivePage(item.id); setIsSidebarOpen(false); }}
                style={{ 
                  color: activePage === item.id ? '#10b981' : themeStyles.text,
                  fontWeight: activePage === item.id ? '800' : '500',
                  background: activePage === item.id ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.label}
              </div>
            ))}
          </nav>
        </div>

        <div className="emergency-helpline-card" style={{ background: isDarkMode ? 'rgba(239, 68, 68, 0.08)' : '#fee2e2', border: isDarkMode ? '1px solid rgba(239, 68, 68, 0.15)' : '1px solid #fee2e2', borderRadius: '12px', padding: '16px', margin: '20px 0', transition: 'all 0.3s ease' }}>
          <p style={{ color: '#ef4444', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 6px 0' }}>National Emergency Hotline</p>
          <h3 style={{ color: '#dc2626', fontSize: '24px', fontWeight: '900', margin: 0 }}>999</h3>
          <p style={{ fontSize: '10px', color: isDarkMode ? '#f8fafc' : '#7f1d1d', marginTop: '4px', fontWeight: '600' }}>Direct Law Enforcement Link</p>
        </div>

        {/* 🚪 Terminate Button inside Sidebar (Visible mainly for Mobile users) */}
        <div style={{ marginTop: 'auto', padding: '20px 0 10px 0', borderTop: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid #edf2f7' }}>
          <button 
            onClick={handleActualLogout}
            style={{ 
              width: '100%', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '10px', 
              color: '#ef4444', fontWeight: '800', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
            }}
          >
            Terminate Session
          </button>
        </div>
      </aside>

      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      <main className="main-content" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        {/* 🔝 HEADER / NAVBAR */}
        <header className="top-navbar" style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, zIndex: 9999,
          background: themeStyles.navbarBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 4px 20px rgba(9, 51, 37, 0.05)',
          padding: '14px 24px', borderBottom: `1px solid ${themeStyles.navbarBorder}`,
          width: '100%', boxSizing: 'border-box',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          
          <div className="mobile-gap" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button className="hamburger-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ fontSize: '22px', color: themeStyles.text, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
              ☰
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => setActivePage('Landing')}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span className="mobile-logo-text" style={{ fontSize: '20px', fontWeight: '900', color: themeStyles.text, letterSpacing: '-0.5px' }}>
                Rescue<span style={{ color: '#10b981' }}>Her</span>
              </span>
            </div>

            <span className="desktop-only" onClick={() => setActivePage('Landing')} style={{ fontSize: '11px', fontWeight: '700', color: '#10b981', cursor: 'pointer', marginLeft: '12px', padding: '4px 12px', borderRadius: '50px', background: 'rgba(16, 185, 129, 0.08)', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              Gateway Portal →
            </span>
          </div>

          <div className="mobile-gap" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            
            <button onClick={() => setIsDarkMode(!isDarkMode)} style={{ background: isDarkMode ? 'rgba(255,255,255,0.05)' : '#ffffff', border: `1px solid ${themeStyles.navbarBorder}`, borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            <span className="desktop-only" style={{ fontSize: '13.5px', fontWeight: '600', cursor: 'pointer', color: themeStyles.text }} onClick={() => setActivePage('Profile')}>
              Session: <strong style={{ color: '#10b981', fontWeight: '700' }}>{userName}</strong> 
            </span>
            
            <div className="avatar" onClick={() => setActivePage('Profile')} style={{ backgroundImage: userAvatar ? `url(${userAvatar})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: userAvatar ? 'transparent' : '#10b981', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', border: activePage === 'Profile' ? '2px solid #10b981' : '2px solid rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>
              {!userAvatar && userName.charAt(0).toUpperCase()}
            </div>
            
            <button className="desktop-only" onClick={handleActualLogout} style={{ padding: '8px 16px', background: isDarkMode ? 'rgba(255,255,255,0.04)' : '#ffffff', border: '1px solid #e8ece9', borderRadius: '50px', fontSize: '11px', fontWeight: '700', color: themeStyles.text, cursor: 'pointer', textTransform: 'uppercase' }}>
              Terminate
            </button>
          </div>
        </header>

        <div className="dashboard-body" style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '24px', backgroundColor: themeStyles.bg, transition: 'all 0.3s ease' }}>
          <div style={{ flex: 1 }}>
            {renderPage()}
          </div>

          {/* 🌟 REFACTORING FOOTER WITH DYNAMIC STYLING CLASSES */}
          <footer className="dashboard-footer" style={{
            marginTop: '60px', padding: '50px 40px 30px 40px',
            background: themeStyles.footerBg, borderRadius: '24px', 
            display: 'flex', flexDirection: 'column', gap: '40px',
            borderTop: `1px solid ${themeStyles.footerBorder}`, transition: 'all 0.3s ease'
          }}>
            
            <div className="footer-grid" style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '40px', borderBottom: `1px solid ${themeStyles.footerBorder}`,
              paddingBottom: '35px', textAlign: 'left'
            }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '24px', color: '#093325', letterSpacing: '-0.5px' }}>
                  <svg width="26" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  <span style={{ color: themeStyles.text }}>Rescue<span style={{ color: '#10b981' }}>Her</span></span>
                </div>
                <p style={{ margin: 0, fontSize: '13.5px', color: themeStyles.cardText, lineHeight: '1.65', fontWeight: '500' }}>
                  Next-gen community defense layer engineering advanced smart safety loops for absolute protection matrix.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '12px', fontWeight: '800', color: '#10b981', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Emergency Response Hotlines</h4>
                <div style={{ fontSize: '13.5px', color: themeStyles.cardText, display: 'flex', flexDirection: 'column', gap: '10px', fontWeight: '600' }}>
                  <span>National Command: <strong style={{ color: '#ef4444', fontWeight: '800' }}>999</strong></span>
                  <span>Women Support Line: <strong style={{ color: '#10b981', fontWeight: '800' }}>109</strong></span>
                  <span>Cyber Security Division: <strong style={{ color: themeStyles.cardText }}>Verified Relay</strong></span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ margin: 0, fontSize: '12px', fontWeight: '800', color: '#10b981', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Platform Shortcuts</h4>
                <div style={{ color: themeStyles.cardText, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', fontWeight: '600' }}>
                  <span onClick={() => setActivePage('Dashboard')} style={{ color: themeStyles.cardText, cursor: 'pointer', transition: 'color 0.2s' }}>System Control Dashboard</span>
                  <span onClick={() => setActivePage('Safety Tips')} style={{ color: themeStyles.cardText, cursor: 'pointer', transition: 'color 0.2s' }}>Defensive Security Protocols</span>
                  <span onClick={() => setActivePage('About Us')} style={{ color: themeStyles.cardText, cursor: 'pointer', transition: 'color 0.2s' }}>Architecture Documentation</span>
                </div>
              </div>

              <div style={{ 
                background: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(9, 51, 37, 0.02)', 
                padding: '20px', borderRadius: '16px', borderLeft: '4px solid #10b981',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left'
              }}>
                <h5 style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: themeStyles.text, fontStyle: 'italic' }}>
                  "Autonomy Through Security"
                </h5>
                <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: themeStyles.cardText, lineHeight: '1.5', fontWeight: '500' }}>
                  Continuous backend telemetry processing provides active surveillance shielding during isolated transit states.
                </p>
              </div>
            </div>

            <div className="footer-bottom-row" style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              flexWrap: 'wrap', gap: '12px', fontSize: '12.5px', color: themeStyles.cardText, fontWeight: '500'
            }}>
              <span>&copy; {new Date().getFullYear()} RescueHer Grid. Decentralized Civilian Network.</span>
              <div className="footer-policy-links" style={{ display: 'flex', gap: '24px', fontWeight: '700' }}>
                <span style={{ cursor: 'pointer', color: '#10b981' }}>Privacy Policy</span>
                <span style={{ cursor: 'pointer', color: '#10b981' }}>Terms of Service</span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;