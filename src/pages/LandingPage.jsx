

// // src/pages/LandingPage.jsx
// import React, { useState, useEffect } from 'react';
// import LoginView from './LoginView';
// import SignupView from './SignupView';
// import FeaturesPage from './FeaturesPage'; 
// import FAQPage from './FAQPage'; 

// // 🔹 Props Pipeline: গ্লোবাল অ্যাপ থেকে 'theme' এবং 'toggleTheme' রিসিভ করা হলো
// function LandingPage({ onExplore, isLoggedIn, setActiveView, theme, toggleTheme }) {
//   const [authView, setAuthView] = useState('none'); 
//   const [showSplash, setShowSplash] = useState(true); 
//   const [fadeSplash, setFadeSplash] = useState(false);
//   const [currentSubView, setCurrentSubView] = useState('home'); 

//   const isDark = theme === 'dark'; // 🌓 ডার্ক মোড ট্র্যাকিং কন্ডিশন নোড

//   useEffect(() => {
//     const fadeTimeout = setTimeout(() => {
//       setFadeSplash(true);
//     }, 1800);

//     const clearSplashTimeout = setTimeout(() => {
//       setShowSplash(false);
//     }, 2400);

//     return () => {
//       clearTimeout(fadeTimeout);
//       clearTimeout(clearSplashTimeout);
//     };
//   }, []);

//   if (authView === 'login' || authView === 'signup') {
//     return (
//       <div style={{
//         fontFamily: "'Plus Jakarta Sans', sans-serif",
//         background: isDark ? '#0a120f' : '#fcfcfb',
//         minHeight: '100vh',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center', 
//         padding: '40px 20px',
//         transition: 'all 0.3s ease'
//       }}>
//         {authView === 'login' ? (
//           <LoginView 
//             onLoginSuccess={(userName) => onExplore(userName)}
//             onSwitchToSignup={() => setAuthView('signup')}
//             onBackToHome={() => setAuthView('none')}
//           />
//         ) : (
//           <SignupView 
//             onLoginSuccess={(userName) => onExplore(userName)}
//             onSwitchToLogin={() => setAuthView('login')}
//             onBackToHome={() => setAuthView('none')}
//           />
//         )}
//       </div>
//     );
//   }

//   const getNavLinkStyle = (viewName) => {
//     const isActive = currentSubView === viewName;
//     return {
//       cursor: 'pointer',
//       color: isActive ? '#10b981' : (isDark ? '#a2b7b0' : '#5c726a'),
//       fontSize: '14px',
//       fontWeight: isActive ? '800' : '600',
//       transition: 'all 0.2s ease',
//       borderBottom: isActive ? '2px solid #10b981' : '2px solid transparent',
//       paddingBottom: '4px'
//     };
//   };

//   // 🎨 ল্যান্ডিং পেজের জন্য লাক্সারি ডাইনামিক থিম প্যালেট
//   const landColors = {
//     bg: isDark ? '#0a120f' : '#f3faf7',
//     text: isDark ? '#f8fafc' : '#093325',
//     subText: isDark ? '#a2b7b0' : '#5c726a',
//     navbarBg: isDark ? 'rgba(17, 26, 22, 0.92)' : 'rgba(243, 250, 247, 0.92)',
//     navbarBorder: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(9, 51, 37, 0.06)',
//     cardBg: isDark ? '#111a16' : '#ffffff',
//     cardBorder: isDark ? 'rgba(16, 185, 129, 0.2)' : '#e8ece9',
//     sectionBg: isDark ? '#0d1713' : '#ffffff',
//     matrixBg: isDark ? '#0d1713' : '#f4f6f4',
//     footerBg: isDark ? '#141d19' : '#f0efe9',
//     footerBorder: isDark ? 'rgba(255,255,255,0.06)' : '#dcdbd3',
//     globeLeft: isDark ? '#122d25' : '#cbf2ec',
//     globeRight: isDark ? '#14352b' : '#ccf5ea'
//   };

//   return (
//     <div style={{ 
//       fontFamily: "'Plus Jakarta Sans', sans-serif", 
//       background: landColors.bg, 
//       minHeight: '100vh', 
//       color: landColors.text, 
//       overflowX: 'hidden',
//       position: 'relative',
//       transition: 'all 0.4s ease'
//     }}>
      
//       {/* 🟢 বাম পাশের গ্লোব */}
//       <div style={{ position: 'absolute', width: '450px', height: '450px', left: '-150px', top: '-100px', background: landColors.globeLeft, borderRadius: '50%', filter: 'blur(60px)', opacity: isDark ? 0.45 : 0.7, pointerEvents: 'none', zIndex: 0 }}></div>

//       {/* 🟢 ডান পাশের গ্লোব */}
//       <div style={{ position: 'absolute', width: '500px', height: '500px', right: '-180px', top: '100px', background: landColors.globeRight, borderRadius: '50%', filter: 'blur(70px)', opacity: isDark ? 0.4 : 0.6, pointerEvents: 'none', zIndex: 0 }}></div>

//       {/* 🌟 SPLASH SCREEN ANIMATION */}
//       {showSplash && (
//         <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: isDark ? '#0a120f' : '#fcfcfb', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, opacity: fadeSplash ? 0 : 1, transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)', pointerEvents: fadeSplash ? 'none' : 'all' }}>
//           <h1 style={{ fontSize: '56px', fontWeight: '800', color: landColors.text, letterSpacing: '-1.5px', display: 'flex', alignItems: 'center', gap: '12px', animation: 'asconeReveal 1.2s ease-out forwards' }}>
//             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//             </svg>
//             Rescue<span style={{ color: '#10b981', fontStyle: 'italic', fontWeight: '400', fontFamily: 'Georgia, serif' }}>Her</span>
//           </h1>
//         </div>
//       )}

//       {/* 🧭 FIXED NAVBAR CONTAINER */}
//       <nav style={{ 
//         display: 'flex', 
//         justifyContent: 'space-between', 
//         alignItems: 'center', 
//         padding: '0 6%', 
//         height: '85px',
//         background: landColors.navbarBg, 
//         backdropFilter: 'blur(20px)', 
//         position: 'fixed', 
//         top: 0, 
//         left: 0,
//         width: '100%',
//         boxSizing: 'border-box',
//         zIndex: 999, 
//         borderBottom: `1px solid ${landColors.navbarBorder}`, 
//         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)',
//         transition: 'all 0.4s ease'
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
//           <div onClick={() => setCurrentSubView('home')} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '24px', color: landColors.text, letterSpacing: '-0.5px', cursor: 'pointer' }}>
//             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//             </svg>
//             <span>Rescue<span style={{ color: '#10b981' }}>Her</span></span>
//           </div>
          
//           <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
//             <span onClick={() => setCurrentSubView('home')} style={getNavLinkStyle('home')}>Home</span>
//             <span onClick={() => setCurrentSubView('features')} style={getNavLinkStyle('features')}>Features</span>
//             <a 
//               href="#network" 
//               onClick={() => setCurrentSubView('home')}
//               style={{ textDecoration: 'none', color: isDark ? '#a2b7b0' : '#5c726a', fontSize: '14px', fontWeight: '600', transition: 'color 0.2s' }} 
//               onMouseEnter={(e) => e.target.style.color = '#10b981'} 
//               onMouseLeave={(e) => { e.target.style.color = isDark ? '#a2b7b0' : '#5c726a'; }}
//             >
//               Network Matrix
//             </a>
//             <span onClick={() => setCurrentSubView('faq')} style={getNavLinkStyle('faq')}>FAQ</span>
//           </div>
//         </div>
        
//         {/* RIGHT ACTION CONTROLS */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
//           {/* ☀️ 🌙 NEW DAY/NIGHT INTERACTIVE TOGGLE BUTTON */}
//           <button 
//             onClick={toggleTheme}
//             style={{
//               background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
//               border: `1px solid ${landColors.navbarBorder}`,
//               borderRadius: '50%',
//               width: '38px',
//               height: '38px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '16px',
//               cursor: 'pointer',
//               boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
//               transition: 'all 0.3s'
//             }}
//             title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
//           >
//             {isDark ? '☀️' : '🌙'}
//           </button>

//           <button 
//             onClick={() => { if (isLoggedIn) { setActiveView('Dashboard'); } else { setAuthView('login'); } }}
//             style={{ padding: '12px 28px', background: isDark ? '#10b981' : '#093325', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 14px rgba(9, 51, 37, 0.12)' }}
//           >
//             {isLoggedIn ? "Launch Security Hub" : "Sign In"}
//           </button>
//         </div>
//       </nav>

//       <div style={{ paddingTop: '85px' }}>
//         {currentSubView === 'features' ? (
//           <FeaturesPage theme={theme} />
//         ) : currentSubView === 'faq' ? (
//           <FAQPage theme={theme} />
//         ) : (
//           <>
//             {/* HERO MODULE SECTION */}
//             <section style={{ padding: '80px 6% 120px 6%', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
//               <div style={{ textAlign: 'left', animation: 'contentFadeIn 1s ease-out 2.2s both' }}>
//                 <div style={{ padding: '6px 14px', background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', borderRadius: '50px', border: '1px solid rgba(16, 185, 129, 0.15)', fontSize: '12px', fontWeight: '700', display: 'inline-block', marginBottom: '24px', letterSpacing: '0.5px' }}>
//                   🛡️ SECURE CIVILIAN GRID OPERATIONAL
//                 </div>
//                 <h1 style={{ fontSize: '68px', fontWeight: '800', color: landColors.text, lineHeight: '1.1', letterSpacing: '-2.5px', margin: '0 0 32px 0' }}>
//                   Change the way <br />you use your <br /><span style={{ fontStyle: 'italic', fontWeight: '400', fontFamily: 'Georgia, serif', color: '#10b981', borderBottom: '3px wavy #a7f3d0', paddingBottom: '4px' }}>security.</span>
//                 </h1>
//                 <p style={{ fontSize: '16px', color: landColors.subText, maxWidth: '460px', lineHeight: '1.6', margin: '0 0 44px 0' }}>
//                   From your everyday travel, to emergency matrix triggers. RescueHer ecosystem syncs encrypted telemetry layers to guard you instantly.
//                 </p>
//                 <button 
//                   onClick={() => { if (isLoggedIn) { setActiveView('Dashboard'); } else { setAuthView('login'); } }}
//                   style={{ padding: '18px 38px', background: isDark ? '#10b981' : '#093325', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 8px 24px rgba(9, 51, 37, 0.2)' }}
//                 >
//                   {isLoggedIn ? "Access Dashboard" : "Get Started Now"}
//                 </button>
//               </div>

//               {/* RIGHT GRAPHICS NODES */}
//               <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px', animation: 'contentFadeIn 1.2s ease-out 2.4s both' }}>
//                 <div style={{ position: 'relative', backgroundImage: "url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '28px', padding: '36px', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gridRow: 'span 2', border: `1px solid ${landColors.cardBorder}`, boxShadow: '0 20px 40px rgba(0,0,0,0.12)', cursor: 'pointer', overflow: 'hidden' }}>
//                   <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(9,51,37,0.2), rgba(9,51,37,0.85))', zIndex: 1 }}></div>
//                   <div style={{ position: 'relative', zIndex: 2 }}>
//                     <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🛡️</div>
//                   </div>
//                   <div style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
//                     <h4 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800', color: '#ffffff' }}>Active Nodes</h4>
//                     <p style={{ margin: 0, fontSize: '14px', color: '#eef5f2', lineHeight: '1.4', fontWeight: '500' }}>Real-time satellite matrix sync layer active.</p>
//                   </div>
//                 </div>
                
//                 <div style={{ background: landColors.cardBg, borderRadius: '24px', padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: `1px solid ${landColors.cardBorder}`, boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}>
//                   <h2 style={{ fontSize: '52px', margin: 0, fontWeight: '800', color: '#10b981' }}>99.9%</h2>
//                   <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: landColors.subText, fontWeight: '500' }}>Signal Uptime Matrix</p>
//                 </div>
//                 <div style={{ background: isDark ? '#111a16' : '#093325', color: '#fff', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: `1px solid ${landColors.cardBorder}`, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}>
//                   <h3 style={{ fontSize: '26px', margin: '0 0 6px 0', fontWeight: '700', color: '#10b981' }}>24/7</h3>
//                   <p style={{ margin: 0, fontSize: '13px', color: '#a2b7b0', lineHeight: '1.4' }}>Direct emergency pipeline protocol built.</p>
//                 </div>
//               </div>
//             </section>

//             {styleTag}

//             {/* INTEGRATED CORE PROTOCOLS SECTION */}
//             <section style={{ padding: '100px 6%', background: landColors.sectionBg, borderTop: `1px solid ${landColors.cardBorder}`, position: 'relative', zIndex: 1, transition: 'all 0.4s ease' }}>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '50px', marginBottom: '70px' }}>
//                 <div style={{ textAlign: 'left' }}>
//                   <span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: '700', color: landColors.subText, letterSpacing: '1px' }}>Values</span>
//                   <h2 style={{ fontSize: '38px', fontWeight: '800', margin: '12px 0 0 0', lineHeight: '1.2' }}>Absolute Defense, Well-Spent Intel</h2>
//                 </div>
//                 <p style={{ color: landColors.subText, fontSize: '16px', lineHeight: '1.6', margin: 0, alignSelf: 'end', textAlign: 'left' }}>
//                   We engineered a completely friction-free layout structure. No heavy data tracking, just pure peer-to-peer civilian protection matrices operating safely within optimized local memory parameters.
//                 </p>
//               </div>

//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', textAlign: 'left' }}>
//                 <div className="grid-card-hover" style={{ ...minimalCardStyle, background: landColors.cardBg, borderColor: landColors.cardBorder }}>
//                   <div style={{ ...iconBoxStyle, background: isDark ? '#16231f' : '#f4f6f4', color: landColors.text }}>🚨</div>
//                   <h3 style={{ ...cardTitleStyle, color: landColors.text }}>Instant SOS Node</h3>
//                   <p style={cardDescStyle}>One-click hardware loop bypass broadcasting encrypted metadata layers directly to pre-configured security pipelines.</p>
//                   <div style={{ ...arrowBtnStyle, color: landColors.text, borderColor: landColors.cardBorder }}>➔</div>
//                 </div>
//                 <div className="grid-card-hover" style={{ ...minimalCardStyle, background: landColors.cardBg, borderColor: landColors.cardBorder }}>
//                   <div style={{ ...iconBoxStyle, background: isDark ? '#16231f' : '#f4f6f4', color: landColors.text }}>📍</div>
//                   <h3 style={{ ...cardTitleStyle, color: landColors.text }}>Live Track Grid</h3>
//                   <p style={cardDescStyle}>Synchronized OpenStreetMap telemetry routing engines updating verified civilian peers securely using minimal stream protocols.</p>
//                   <div style={{ ...arrowBtnStyle, color: landColors.text, borderColor: landColors.cardBorder }}>➔</div>
//                 </div>
//                 <div className="grid-card-hover" style={{ ...minimalCardStyle, borderRadius: '0px 80px 24px 24px', background: isDark ? '#162520' : '#f4f6f4', borderColor: isDark ? 'rgba(16, 185, 129, 0.25)' : 'transparent' }}>
//                   <div style={{ ...iconBoxStyle, background: '#093325', color: '#fff' }}>📝</div>
//                   <h3 style={{ ...cardTitleStyle, color: isDark ? '#fff' : '#093325' }}>Intel Threat Logging</h3>
//                   <p style={cardDescStyle}>Anonymous distributed incident compiling architecture allowing node clusters to register localized threat grids safely.</p>
//                   <div style={{ ...arrowBtnStyle, background: '#093325', color: '#fff', border: 'none' }}>➔</div>
//                 </div>
//               </div>
//             </section>

//             {/* PRIVACY MANIFESTO MODULE */}
//             <section style={{ padding: '100px 6%', background: landColors.bg, position: 'relative', zIndex: 1 }}>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', alignItems: 'center' }}>
//                 <div style={{ height: '420px', borderRadius: '32px', backgroundImage: "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: `1px solid ${landColors.cardBorder}` }}></div>
//                 <div style={{ textAlign: 'left' }}>
//                   <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '16px' }}>DATA PRIVACY MANIFESTO</span>
//                   <blockquote style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '600', color: landColors.text, lineHeight: '1.4', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
//                     "True security doesn't demand your privacy as a trade-off. It empowers you to navigate the world safely while keeping your data entirely under your own command."
//                   </blockquote>
//                   <p style={{ fontSize: '15px', color: landColors.subText, lineHeight: '1.6', margin: 0 }}>
//                     RescueHer structures are mapped to eliminate cloud metadata exposures. When you launch our grid architecture, your active coordinates process exclusively during telemetry triggers, locking out surveillance loops forever.
//                   </p>
//                 </div>
//               </div>
//             </section>

//             {/* LIVE RESPONSE MATRIX */}
//             <section id="network" style={{ padding: '100px 6%', background: landColors.matrixBg, borderTop: `1px solid ${landColors.cardBorder}`, textAlign: 'center', scrollMarginTop: '80px', position: 'relative', zIndex: 1, transition: 'all 0.4s ease' }}>
//               <div style={{ maxWidth: '800px', margin: '0 auto 60px auto' }}>
//                 <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>DECENTRALIZED PROTECTION</span>
//                 <h2 style={{ fontSize: '42px', fontWeight: '800', color: landColors.text, letterSpacing: '-1px', margin: '0 0 16px 0' }}>The Live Response Network Matrix</h2>
//                 <p style={{ fontSize: '16px', color: landColors.subText, lineHeight: '1.6' }}>
//                   RescueHer operates via decentralized node synchronization. When an alert triggers, your telemetry pulses through a multi-layered verification grid to ensure zero latency communication.
//                 </p>
//               </div>

//               <div style={{ background: isDark ? '#111a16' : '#093325', borderRadius: '28px', padding: '50px 40px', color: '#fff', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden', border: `1px solid ${landColors.cardBorder}` }}>
//                 <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 0)', backgroundSize: '24px 24px', opacity: 0.6, pointerEvents: 'none' }}></div>
//                 <div style={matrixCardStyle}>
//                   <div style={matrixIconStyle}>🌐</div>
//                   <h3 style={matrixTitleStyle}>01. Guardian Node</h3>
//                   <p style={matrixDescStyle}>Your trusted primary contacts act as high-priority mesh networks, receiving instant P2P data packets directly from your active session.</p>
//                   <div style={matrixStatusStyle}><span style={pulseDotStyle}></span><span style={{ color: '#a2b7b0' }}>Live Synced</span></div>
//                 </div>
//                 <div style={matrixCardStyle}>
//                   <div style={matrixIconStyle}>🛰️</div>
//                   <h3 style={matrixTitleStyle}>02. Telemetry Grid</h3>
//                   <p style={matrixDescStyle}>High-accuracy W3C Geolocation standard parameters running background loops to bypass cellular network congestion during critical spikes.</p>
//                   <div style={matrixStatusStyle}><span style={pulseDotStyle}></span><span style={{ color: '#a2b7b0' }}>99.9% Telemetry Uptime</span></div>
//                 </div>
//                 <div style={matrixCardStyle}>
//                   <div style={matrixIconStyle}>🔒</div>
//                   <h3 style={matrixTitleStyle}>03. Encrypted Relays</h3>
//                   <p style={matrixDescStyle}>All incident details, map endpoints, and emergency broadcast vectors are securely piped via JSON Web Token (JWT) verification layers.</p>
//                   <div style={matrixStatusStyle}><span style={{ ...pulseDotStyle, backgroundColor: '#38bdf8' }}></span><span style={{ color: '#a2b7b0' }}>AES-256 Protocol</span></div>
//                 </div>
//               </div>
//             </section>

//             {/* EMPOWERMENT TIERS BLOCK */}
//             <section style={{ padding: '120px 6%', background: landColors.bg, textAlign: 'center', position: 'relative', zIndex: 1 }}>
//               <div style={{ maxWidth: '750px', margin: '0 auto 60px auto' }}>
//                 <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '16px' }}>COMMUNITY IMPULSE</span>
//                 <h2 style={{ fontSize: '42px', fontWeight: '800', color: landColors.text, letterSpacing: '-1.5px', margin: '0' }}>Designed for Peace of Mind</h2>
//               </div>
              
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', textAlign: 'left' }}>
//                 <div className="grid-card-hover" style={{ background: landColors.cardBg, padding: '40px', borderRadius: '24px', border: `1px solid ${landColors.cardBorder}` }}>
//                   <p style={{ fontSize: '24px', marginBottom: '20px' }}>🌟</p>
//                   <p style={{ fontSize: '15px', color: landColors.subText, lineHeight: '1.6', fontStyle: 'italic', marginBottom: '24px' }}>
//                     "As a university student returning late from lab sessions, RescueHer changed how I commute. Knowing one tap activates my inner defense tier gives me pure confidence."
//                   </p>
//                   <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: landColors.text }}>Verified Active Node</h4>
//                   <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#10b981', fontWeight: '600' }}>Dhaka Grid Sector</p>
//                 </div>

//                 <div className="grid-card-hover" style={{ background: landColors.cardBg, padding: '40px', borderRadius: '24px', border: `1px solid ${landColors.cardBorder}` }}>
//                   <p style={{ fontSize: '24px', marginBottom: '20px' }}>🛡️</p>
//                   <p style={{ fontSize: '15px', color: landColors.subText, lineHeight: '1.6', fontStyle: 'italic', marginBottom: '24px' }}>
//                     "The discrete logging architecture is perfect. No clumsy setups or heavy battery drainage. It runs tight code loops and ensures emergency map streams trigger with zero delay."
//                   </p>
//                   <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: landColors.text }}>System Audit Review</h4>
//                   <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#10b981', fontWeight: '600' }}>Tech Compliance Node</p>
//                 </div>
//               </div>
//             </section>

//             {/* CTA BANNER */}
//             <section style={{ padding: '80px 6% 60px 6%', background: landColors.sectionBg, position: 'relative', zIndex: 1 }}>
//               <div style={{ background: '#093325', color: '#fff', borderRadius: '24px', padding: '80px 60px', display: 'grid', gridTemplateColumns: '1.6fr 1fr', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
//                 <div style={{ textAlign: 'left' }}>
//                   <h2 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 16px 0', lineHeight: '1.2', letterSpacing: '-1px' }}>Change the way you <br />use your safety armor.</h2>
//                   <p style={{ color: '#a2b7b0', fontSize: '15px', margin: '0 0 36px 0', maxWidth: '460px', lineHeight: '1.5' }}>Join thousands of verified active nodes who trust RescueHer safety system ecosystem for fast, fully private and resilient decentralized assistance.</p>
//                   <button onClick={() => { if (isLoggedIn) { setActiveView('Dashboard'); } else { setAuthView('login'); } }} style={{ padding: '16px 36px', background: '#fff', color: '#093325', border: 'none', borderRadius: '50px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>Get Started Now</button>
//                 </div>
//                 <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '130px', opacity: 0.12, userSelect: 'none' }}>🛡️</div>
//               </div>
//             </section>
//           </>
//         )}

//         {/* 📥 100% BRAND MATCHED DEEPER BEIGE FOOTER */}
//         <footer style={{ padding: '80px 6% 40px 6%', background: landColors.footerBg, borderTop: `1px solid ${landColors.footerBorder}`, position: 'relative', zIndex: 1, transition: 'all 0.4s ease' }}>
//           <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: '40px', marginBottom: '60px', textAlign: 'left' }}>
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '26px', color: '#093325', letterSpacing: '-0.5px', marginBottom: '16px' }}>
//                 <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                   <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
//                 </svg>
//                 <span style={{ color: landColors.text }}>Rescue<span style={{ color: '#10b981' }}>Her</span></span>
//               </div>
//               <p style={{ color: landColors.subText, fontSize: '14px', maxWidth: '280px', lineHeight: '1.6' }}>Next-gen community defense layer engineering advanced smart safety loops for absolute protection matrix.</p>
//             </div>
//             <div>
//               <h4 style={{ ...footerHeadingStyle, color: '#10b981' }}>Account</h4>
//               <p style={{ ...footerLinkStyle, color: landColors.subText }}>Security Grid</p>
//               <p style={{ ...footerLinkStyle, color: landColors.subText }}>Node Sync</p>
//               <p style={{ ...footerLinkStyle, color: landColors.subText }}>Encryption</p>
//             </div>
//             <div>
//               <h4 style={{ ...footerHeadingStyle, color: '#10b981' }}>Help</h4>
//               <p style={{ ...footerLinkStyle, color: landColors.subText }}>Crisis Hotline</p>
//               <p style={{ ...footerLinkStyle, color: landColors.subText }}>Community Hub</p>
//               <p style={{ ...footerLinkStyle, color: landColors.subText }}>Privacy Framework</p>
//             </div>
//             <div>
//               <h4 style={{ ...footerHeadingStyle, color: '#10b981' }}>Project</h4>
//               <p style={{ ...footerLinkStyle, color: landColors.subText }}>About Architecture</p>
//               <p style={{ ...footerLinkStyle, color: landColors.subText }}>Sovereignty</p>
//               <p style={{ ...footerLinkStyle, color: landColors.subText }}>Contact Endpoint</p>
//             </div>
//           </div>

//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '32px', borderTop: `1px solid ${landColors.footerBorder}`, fontSize: '13px', color: landColors.subText }}>
//             <p>© 2026 RescueHer Secure Matrix Network. Built for safety.</p>
//             <div style={{ display: 'flex', gap: '28px', fontWeight: '700' }}>
//               <span style={{ cursor: 'pointer', color: '#10b981' }}>Privacy Policy</span>
//               <span style={{ cursor: 'pointer', color: '#10b981' }}>Terms of Matrix</span>
//               <span style={{ cursor: 'pointer', color: '#10b981' }}>Disclosures</span>
//             </div>
//           </div>
//         </footer>
//       </div>
//     </div>
//   );
// }

// // STYLES 
// const minimalCardStyle = { padding: '44px 40px', background: '#ffffff', borderRadius: '24px', border: '1px solid #e8ece9', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', boxShadow: '0 4px 20px rgba(9, 51, 37, 0.02)' };
// const iconBoxStyle = { width: '52px', height: '52px', borderRadius: '50%', background: '#f4f6f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '36px', color: '#093325' };
// const cardTitleStyle = { fontSize: '22px', fontWeight: '700', color: '#093325', margin: '0 0 14px 0', letterSpacing: '-0.3px' };
// const cardDescStyle = { fontSize: '14px', color: '#5c726a', lineHeight: '1.6', margin: '0 0 32px 0' };
// const arrowBtnStyle = { width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e8ece9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer', color: '#093325', transition: 'all 0.2s ease' };
// const footerHeadingStyle = { fontSize: '13px', fontWeight: '700', color: '#093325', margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '0.5px' };
// const footerLinkStyle = { fontSize: '14px', color: '#5c726a', margin: '0 0 12px 0', cursor: 'pointer' };
// const matrixCardStyle = { background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2, backdropFilter: 'blur(10px)' };
// const matrixIconStyle = { fontSize: '28px', marginBottom: '20px' };
// const matrixTitleStyle = { fontSize: '20px', fontWeight: '700', color: '#ffffff', margin: '0 0 12px 0' };
// const matrixDescStyle = { fontSize: '13.5px', color: '#a2b7b0', lineHeight: '1.6', margin: '0 0 24px 0' };
// const matrixStatusStyle = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' };
// const pulseDotStyle = { width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #10b981' };
// const styleTag = ( <style>{` @keyframes contentFadeIn { 0% { opacity: 0; transform: translateY(25px); } 100% { opacity: 1; transform: translateY(0); } } 
// @keyframes borderGlow {
//   0% { border-color: rgba(16, 185, 129, 0.2); box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
//   50% { border-color: rgba(255, 182, 193, 0.4); box-shadow: 0 4px 25px rgba(16, 185, 129, 0.06); }
//   100% { border-color: rgba(16, 185, 129, 0.2); box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
// }`}</style> );

// export default LandingPage;











// src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import LoginView from './LoginView';
import SignupView from './SignupView';
import FeaturesPage from './FeaturesPage'; 
import FAQPage from './FAQPage'; 

// 🔹 Props Pipeline: গ্লোবাল অ্যাপ থেকে 'theme' এবং 'toggleTheme' রিসিভ করা হলো
function LandingPage({ onExplore, isLoggedIn, setActiveView, theme, toggleTheme }) {
  const [authView, setAuthView] = useState('none'); 
  const [showSplash, setShowSplash] = useState(true); 
  const [fadeSplash, setFadeSplash] = useState(false);
  const [currentSubView, setCurrentSubView] = useState('home'); 

  const isDark = theme === 'dark'; // 🌓 ডার্ক মোড ট্র্যাকিং কন্ডিশন নোড

  useEffect(() => {
    const fadeTimeout = setTimeout(() => {
      setFadeSplash(true);
    }, 1800);

    const clearSplashTimeout = setTimeout(() => {
      setShowSplash(false);
    }, 2400);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(clearSplashTimeout);
    };
  }, []);

  if (authView === 'login' || authView === 'signup') {
    return (
      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: isDark ? '#0a120f' : '#fcfcfb',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        padding: '40px 20px',
        transition: 'all 0.3s ease'
      }}>
        {authView === 'login' ? (
          <LoginView 
            onLoginSuccess={(userName) => onExplore(userName)}
            onSwitchToSignup={() => setAuthView('signup')}
            onBackToHome={() => setAuthView('none')}
          />
        ) : (
          <SignupView 
            onLoginSuccess={(userName) => onExplore(userName)}
            onSwitchToLogin={() => setAuthView('login')}
            onBackToHome={() => setAuthView('none')}
          />
        )}
      </div>
    );
  }

  const getNavLinkStyle = (viewName) => {
    const isActive = currentSubView === viewName;
    return {
      cursor: 'pointer',
      color: isActive ? '#10b981' : (isDark ? '#a2b7b0' : '#5c726a'),
      fontSize: '14px',
      fontWeight: isActive ? '800' : '600',
      transition: 'all 0.2s ease',
      borderBottom: isActive ? '2px solid #10b981' : '2px solid transparent',
      paddingBottom: '4px'
    };
  };

  // 🎨 ল্যান্ডিং পেজের জন্য লাক্সারি ডাইনামিক থিম প্যালেট
  const landColors = {
    bg: isDark ? '#0a120f' : '#f3faf7',
    text: isDark ? '#f8fafc' : '#093325',
    subText: isDark ? '#a2b7b0' : '#5c726a',
    navbarBg: isDark ? 'rgba(17, 26, 22, 0.92)' : 'rgba(243, 250, 247, 0.92)',
    navbarBorder: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(9, 51, 37, 0.06)',
    cardBg: isDark ? '#111a16' : '#ffffff',
    cardBorder: isDark ? 'rgba(16, 185, 129, 0.2)' : '#e8ece9',
    sectionBg: isDark ? '#0d1713' : '#ffffff',
    matrixBg: isDark ? '#0d1713' : '#f4f6f4',
    footerBg: isDark ? '#141d19' : '#f0efe9',
    footerBorder: isDark ? 'rgba(255,255,255,0.06)' : '#dcdbd3',
    globeLeft: isDark ? '#122d25' : '#cbf2ec',
    globeRight: isDark ? '#14352b' : '#ccf5ea'
  };

  return (
    <div style={{ 
      fontFamily: "'Plus Jakarta Sans', sans-serif", 
      background: landColors.bg, 
      minHeight: '100vh', 
      color: landColors.text, 
      overflowX: 'hidden',
      position: 'relative',
      transition: 'all 0.4s ease'
    }}>
      
      {/* 🟢 বাম পাশের গ্লোব */}
      <div style={{ position: 'absolute', width: '450px', height: '450px', left: '-150px', top: '-100px', background: landColors.globeLeft, borderRadius: '50%', filter: 'blur(60px)', opacity: isDark ? 0.45 : 0.7, pointerEvents: 'none', zIndex: 0 }}></div>

      {/* 🟢 ডান পাশের গ্লোব */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', right: '-180px', top: '100px', background: landColors.globeRight, borderRadius: '50%', filter: 'blur(70px)', opacity: isDark ? 0.4 : 0.6, pointerEvents: 'none', zIndex: 0 }}></div>

      {/* 🌟 SPLASH SCREEN ANIMATION */}
      {showSplash && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: isDark ? '#0a120f' : '#fcfcfb', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, opacity: fadeSplash ? 0 : 1, transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)', pointerEvents: fadeSplash ? 'none' : 'all' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '800', color: landColors.text, letterSpacing: '-1.5px', display: 'flex', alignItems: 'center', gap: '12px', animation: 'asconeReveal 1.2s ease-out forwards' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Rescue<span style={{ color: '#10b981', fontStyle: 'italic', fontWeight: '400', fontFamily: 'Georgia, serif' }}>Her</span>
          </h1>
        </div>
      )}

      {/* 🧭 FIXED NAVBAR CONTAINER */}
      <nav className="responsive-nav" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0 6%', 
        height: '85px',
        background: landColors.navbarBg, 
        backdropFilter: 'blur(20px)', 
        position: 'fixed', 
        top: 0, 
        left: 0,
        width: '100%',
        boxSizing: 'border-box',
        zIndex: 999, 
        borderBottom: `1px solid ${landColors.navbarBorder}`, 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.01)',
        transition: 'all 0.4s ease'
      }}>
        <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <div onClick={() => setCurrentSubView('home')} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '24px', color: landColors.text, letterSpacing: '-0.5px', cursor: 'pointer' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Rescue<span style={{ color: '#10b981' }}>Her</span></span>
          </div>
          
          <div className="nav-links-container" style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <span onClick={() => setCurrentSubView('home')} style={getNavLinkStyle('home')}>Home</span>
            <span onClick={() => setCurrentSubView('features')} style={getNavLinkStyle('features')}>Features</span>
            <a 
              href="#network" 
              onClick={() => setCurrentSubView('home')}
              style={{ textDecoration: 'none', color: isDark ? '#a2b7b0' : '#5c726a', fontSize: '14px', fontWeight: '600', transition: 'color 0.2s' }} 
              onMouseEnter={(e) => e.target.style.color = '#10b981'} 
              onMouseLeave={(e) => { e.target.style.color = isDark ? '#a2b7b0' : '#5c726a'; }}
            >
              Network Matrix
            </a>
            <span onClick={() => setCurrentSubView('faq')} style={getNavLinkStyle('faq')}>FAQ</span>
          </div>
        </div>
        
        {/* RIGHT ACTION CONTROLS */}
        <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* ☀️ 🌙 NEW DAY/NIGHT INTERACTIVE TOGGLE BUTTON */}
          <button 
            onClick={toggleTheme}
            style={{
              background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
              border: `1px solid ${landColors.navbarBorder}`,
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              transition: 'all 0.3s'
            }}
            title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <button 
            onClick={() => { if (isLoggedIn) { setActiveView('Dashboard'); } else { setAuthView('login'); } }}
            style={{ padding: '12px 28px', background: isDark ? '#10b981' : '#093325', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 14px rgba(9, 51, 37, 0.12)' }}
          >
            {isLoggedIn ? "Launch Security Hub" : "Sign In"}
          </button>
        </div>
      </nav>

      <div style={{ paddingTop: '85px' }}>
        {currentSubView === 'features' ? (
          <FeaturesPage theme={theme} />
        ) : currentSubView === 'faq' ? (
          <FAQPage theme={theme} />
        ) : (
          <>
            {/* HERO MODULE SECTION */}
            <section className="responsive-hero-section" style={{ padding: '80px 6% 120px 6%', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '60px', alignItems: 'center', position: 'relative', zIndex: 1 }}>
              <div className="hero-left-content" style={{ textAlign: 'left', animation: 'contentFadeIn 1s ease-out 2.2s both' }}>
                <div style={{ padding: '6px 14px', background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', borderRadius: '50px', border: '1px solid rgba(16, 185, 129, 0.15)', fontSize: '12px', fontWeight: '700', display: 'inline-block', marginBottom: '24px', letterSpacing: '0.5px' }}>
                  🛡️ SECURE CIVILIAN GRID OPERATIONAL
                </div>
                <h1 style={{ fontSize: '68px', fontWeight: '800', color: landColors.text, lineHeight: '1.1', letterSpacing: '-2.5px', margin: '0 0 32px 0' }}>
                  Change the way <br />you use your <br /><span style={{ fontStyle: 'italic', fontWeight: '400', fontFamily: 'Georgia, serif', color: '#10b981', borderBottom: '3px wavy #a7f3d0', paddingBottom: '4px' }}>security.</span>
                </h1>
                <p style={{ fontSize: '16px', color: landColors.subText, maxWidth: '460px', lineHeight: '1.6', margin: '0 0 44px 0' }}>
                  From your everyday travel, to emergency matrix triggers. RescueHer ecosystem syncs encrypted telemetry layers to guard you instantly.
                </p>
                <button 
                  onClick={() => { if (isLoggedIn) { setActiveView('Dashboard'); } else { setAuthView('login'); } }}
                  style={{ padding: '18px 38px', background: isDark ? '#10b981' : '#093325', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 8px 24px rgba(9, 51, 37, 0.2)' }}
                >
                  {isLoggedIn ? "Access Dashboard" : "Get Started Now"}
                </button>
              </div>

              {/* RIGHT GRAPHICS NODES */}
              <div className="hero-right-graphics" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px', animation: 'contentFadeIn 1.2s ease-out 2.4s both' }}>
                <div style={{ position: 'relative', backgroundImage: "url('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '28px', padding: '36px', minHeight: '320px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gridRow: 'span 2', border: `1px solid ${landColors.cardBorder}`, boxShadow: '0 20px 40px rgba(0,0,0,0.12)', cursor: 'pointer', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(9,51,37,0.2), rgba(9,51,37,0.85))', zIndex: 1 }}></div>
                  <div style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🛡️</div>
                  </div>
                  <div style={{ position: 'relative', zIndex: 2, textAlign: 'left' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800', color: '#ffffff' }}>Active Nodes</h4>
                    <p style={{ margin: 0, fontSize: '14px', color: '#eef5f2', lineHeight: '1.4', fontWeight: '500' }}>Real-time satellite matrix sync layer active.</p>
                  </div>
                </div>
                
                <div style={{ background: landColors.cardBg, borderRadius: '24px', padding: '32px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: `1px solid ${landColors.cardBorder}`, boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}>
                  <h2 style={{ fontSize: '52px', margin: 0, fontWeight: '800', color: '#10b981' }}>99.9%</h2>
                  <p style={{ margin: '6px 0 0 0', fontSize: '14px', color: landColors.subText, fontWeight: '500' }}>Signal Uptime Matrix</p>
                </div>
                <div style={{ background: isDark ? '#111a16' : '#093325', color: '#fff', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: `1px solid ${landColors.cardBorder}`, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ fontSize: '26px', margin: '0 0 6px 0', fontWeight: '700', color: '#10b981' }}>24/7</h3>
                  <p style={{ margin: 0, fontSize: '13px', color: '#a2b7b0', lineHeight: '1.4' }}>Direct emergency pipeline protocol built.</p>
                </div>
              </div>
            </section>

            {styleTag}

            {/* INTEGRATED CORE PROTOCOLS SECTION */}
            <section style={{ padding: '100px 6%', background: landColors.sectionBg, borderTop: `1px solid ${landColors.cardBorder}`, position: 'relative', zIndex: 1, transition: 'all 0.4s ease' }}>
              <div className="values-section-header" style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '50px', marginBottom: '70px' }}>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: '700', color: landColors.subText, letterSpacing: '1px' }}>Values</span>
                  <h2 style={{ fontSize: '38px', fontWeight: '800', margin: '12px 0 0 0', lineHeight: '1.2' }}>Absolute Defense, Well-Spent Intel</h2>
                </div>
                <p style={{ color: landColors.subText, fontSize: '16px', lineHeight: '1.6', margin: 0, alignSelf: 'end', textAlign: 'left' }}>
                  We engineered a completely friction-free layout structure. No heavy data tracking, just pure peer-to-peer civilian protection matrices operating safely within optimized local memory parameters.
                </p>
              </div>

              <div className="protocols-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', textAlign: 'left' }}>
                <div className="grid-card-hover" style={{ ...minimalCardStyle, background: landColors.cardBg, borderColor: landColors.cardBorder }}>
                  <div style={{ ...iconBoxStyle, background: isDark ? '#16231f' : '#f4f6f4', color: landColors.text }}>🚨</div>
                  <h3 style={{ ...cardTitleStyle, color: landColors.text }}>Instant SOS Node</h3>
                  <p style={cardDescStyle}>One-click hardware loop bypass broadcasting encrypted metadata layers directly to pre-configured security pipelines.</p>
                  <div style={{ ...arrowBtnStyle, color: landColors.text, borderColor: landColors.cardBorder }}>➔</div>
                </div>
                <div className="grid-card-hover" style={{ ...minimalCardStyle, background: landColors.cardBg, borderColor: landColors.cardBorder }}>
                  <div style={{ ...iconBoxStyle, background: isDark ? '#16231f' : '#f4f6f4', color: landColors.text }}>📍</div>
                  <h3 style={{ ...cardTitleStyle, color: landColors.text }}>Live Track Grid</h3>
                  <p style={cardDescStyle}>Synchronized OpenStreetMap telemetry routing engines updating verified civilian peers securely using minimal stream protocols.</p>
                  <div style={{ ...arrowBtnStyle, color: landColors.text, borderColor: landColors.cardBorder }}>➔</div>
                </div>
                <div className="grid-card-hover" style={{ ...minimalCardStyle, borderRadius: '0px 80px 24px 24px', background: isDark ? '#162520' : '#f4f6f4', borderColor: isDark ? 'rgba(16, 185, 129, 0.25)' : 'transparent' }}>
                  <div style={{ ...iconBoxStyle, background: '#093325', color: '#fff' }}>📝</div>
                  <h3 style={{ ...cardTitleStyle, color: isDark ? '#fff' : '#093325' }}>Intel Threat Logging</h3>
                  <p style={cardDescStyle}>Anonymous distributed incident compiling architecture allowing node clusters to register localized threat grids safely.</p>
                  <div style={{ ...arrowBtnStyle, background: '#093325', color: '#fff', border: 'none' }}>➔</div>
                </div>
              </div>
            </section>

            {/* PRIVACY MANIFESTO MODULE */}
            <section style={{ padding: '100px 6%', background: landColors.bg, position: 'relative', zIndex: 1 }}>
              <div className="manifesto-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', alignItems: 'center' }}>
                <div style={{ height: '420px', borderRadius: '32px', backgroundImage: "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: `1px solid ${landColors.cardBorder}` }}></div>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '16px' }}>DATA PRIVACY MANIFESTO</span>
                  <blockquote style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '600', color: landColors.text, lineHeight: '1.4', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
                    "True security doesn't demand your privacy as a trade-off. It empowers you to navigate the world safely while keeping your data entirely under your own command."
                  </blockquote>
                  <p style={{ fontSize: '15px', color: landColors.subText, lineHeight: '1.6', margin: 0 }}>
                    RescueHer structures are mapped to eliminate cloud metadata exposures. When you launch our grid architecture, your active coordinates process exclusively during telemetry triggers, locking out surveillance loops forever.
                  </p>
                </div>
              </div>
            </section>

            {/* LIVE RESPONSE MATRIX */}
            <section id="network" style={{ padding: '100px 6%', background: landColors.matrixBg, borderTop: `1px solid ${landColors.cardBorder}`, textAlign: 'center', scrollMarginTop: '80px', position: 'relative', zIndex: 1, transition: 'all 0.4s ease' }}>
              <div style={{ maxWidth: '800px', margin: '0 auto 60px auto' }}>
                <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>DECENTRALIZED PROTECTION</span>
                <h2 style={{ fontSize: '42px', fontWeight: '800', color: landColors.text, letterSpacing: '-1px', margin: '0 0 16px 0' }}>The Live Response Network Matrix</h2>
                <p style={{ fontSize: '16px', color: landColors.subText, lineHeight: '1.6' }}>
                  RescueHer operates via decentralized node synchronization. When an alert triggers, your telemetry pulses through a multi-layered verification grid to ensure zero latency communication.
                </p>
              </div>

              <div className="matrix-grid-container" style={{ background: isDark ? '#111a16' : '#093325', borderRadius: '28px', padding: '50px 40px', color: '#fff', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative', overflow: 'hidden', border: `1px solid ${landColors.cardBorder}` }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.15) 1px, transparent 0)', backgroundSize: '24px 24px', opacity: 0.6, pointerEvents: 'none' }}></div>
                <div style={matrixCardStyle}>
                  <div style={matrixIconStyle}>🌐</div>
                  <h3 style={matrixTitleStyle}>01. Guardian Node</h3>
                  <p style={matrixDescStyle}>Your trusted primary contacts act as high-priority mesh networks, receiving instant P2P data packets directly from your active session.</p>
                  <div style={matrixStatusStyle}><span style={pulseDotStyle}></span><span style={{ color: '#a2b7b0' }}>Live Synced</span></div>
                </div>
                <div style={matrixCardStyle}>
                  <div style={matrixIconStyle}>🛰️</div>
                  <h3 style={matrixTitleStyle}>02. Telemetry Grid</h3>
                  <p style={matrixDescStyle}>High-accuracy W3C Geolocation standard parameters running background loops to bypass cellular network congestion during critical spikes.</p>
                  <div style={matrixStatusStyle}><span style={pulseDotStyle}></span><span style={{ color: '#a2b7b0' }}>99.9% Telemetry Uptime</span></div>
                </div>
                <div style={matrixCardStyle}>
                  <div style={matrixIconStyle}>🔒</div>
                  <h3 style={matrixTitleStyle}>03. Encrypted Relays</h3>
                  <p style={matrixDescStyle}>All incident details, map endpoints, and emergency broadcast vectors are securely piped via JSON Web Token (JWT) verification layers.</p>
                  <div style={matrixStatusStyle}><span style={{ ...pulseDotStyle, backgroundColor: '#38bdf8' }}></span><span style={{ color: '#a2b7b0' }}>AES-256 Protocol</span></div>
                </div>
              </div>
            </section>

            {/* EMPOWERMENT TIERS BLOCK */}
            <section style={{ padding: '120px 6%', background: landColors.bg, textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ maxWidth: '750px', margin: '0 auto 60px auto' }}>
                <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '16px' }}>COMMUNITY IMPULSE</span>
                <h2 style={{ fontSize: '42px', fontWeight: '800', color: landColors.text, letterSpacing: '-1.5px', margin: '0' }}>Designed for Peace of Mind</h2>
              </div>
              
              <div className="tiers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', textAlign: 'left' }}>
                <div className="grid-card-hover" style={{ background: landColors.cardBg, padding: '40px', borderRadius: '24px', border: `1px solid ${landColors.cardBorder}` }}>
                  <p style={{ fontSize: '24px', marginBottom: '20px' }}>🌟</p>
                  <p style={{ fontSize: '15px', color: landColors.subText, lineHeight: '1.6', fontStyle: 'italic', marginBottom: '24px' }}>
                    "As a university student returning late from lab sessions, RescueHer changed how I commute. Knowing one tap activates my inner defense tier gives me pure confidence."
                  </p>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: landColors.text }}>Verified Active Node</h4>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#10b981', fontWeight: '600' }}>Dhaka Grid Sector</p>
                </div>

                <div className="grid-card-hover" style={{ background: landColors.cardBg, padding: '40px', borderRadius: '24px', border: `1px solid ${landColors.cardBorder}` }}>
                  <p style={{ fontSize: '24px', marginBottom: '20px' }}>🛡️</p>
                  <p style={{ fontSize: '15px', color: landColors.subText, lineHeight: '1.6', fontStyle: 'italic', marginBottom: '24px' }}>
                    "The discrete logging architecture is perfect. No clumsy setups or heavy battery drainage. It runs tight code loops and ensures emergency map streams trigger with zero delay."
                  </p>
                  <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: landColors.text }}>System Audit Review</h4>
                  <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#10b981', fontWeight: '600' }}>Tech Compliance Node</p>
                </div>
              </div>
            </section>

            {/* CTA BANNER */}
            <section style={{ padding: '80px 6% 60px 6%', background: landColors.sectionBg, position: 'relative', zIndex: 1 }}>
              <div className="cta-banner-grid" style={{ background: '#093325', color: '#fff', borderRadius: '24px', padding: '80px 60px', display: 'grid', gridTemplateColumns: '1.6fr 1fr', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ textAlign: 'left' }}>
                  <h2 style={{ fontSize: '48px', fontWeight: '800', margin: '0 0 16px 0', lineHeight: '1.2', letterSpacing: '-1px' }}>Change the way you <br />use your safety armor.</h2>
                  <p style={{ color: '#a2b7b0', fontSize: '15px', margin: '0 0 36px 0', maxWidth: '460px', lineHeight: '1.5' }}>Join thousands of verified active nodes who trust RescueHer safety system ecosystem for fast, fully private and resilient decentralized assistance.</p>
                  <button onClick={() => { if (isLoggedIn) { setActiveView('Dashboard'); } else { setAuthView('login'); } }} style={{ padding: '16px 36px', background: '#fff', color: '#093325', border: 'none', borderRadius: '50px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>Get Started Now</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '130px', opacity: 0.12, userSelect: 'none' }}>🛡️</div>
              </div>
            </section>
          </>
        )}

        {/* 📥 FOOTER */}
        <footer className="responsive-footer" style={{ padding: '80px 6% 40px 6%', background: landColors.footerBg, borderTop: `1px solid ${landColors.footerBorder}`, position: 'relative', zIndex: 1, transition: 'all 0.4s ease' }}>
          <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: '40px', marginBottom: '60px', textAlign: 'left' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '800', fontSize: '26px', color: '#093325', letterSpacing: '-0.5px', marginBottom: '16px' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span style={{ color: landColors.text }}>Rescue<span style={{ color: '#10b981' }}>Her</span></span>
              </div>
              <p style={{ color: landColors.subText, fontSize: '14px', maxWidth: '280px', lineHeight: '1.6' }}>Next-gen community defense layer engineering advanced smart safety loops for absolute protection matrix.</p>
            </div>
            <div>
              <h4 style={{ ...footerHeadingStyle, color: '#10b981' }}>Account</h4>
              <p style={{ ...footerLinkStyle, color: landColors.subText }}>Security Grid</p>
              <p style={{ ...footerLinkStyle, color: landColors.subText }}>Node Sync</p>
              <p style={{ ...footerLinkStyle, color: landColors.subText }}>Encryption</p>
            </div>
            <div>
              <h4 style={{ ...footerHeadingStyle, color: '#10b981' }}>Help</h4>
              <p style={{ ...footerLinkStyle, color: landColors.subText }}>Crisis Hotline</p>
              <p style={{ ...footerLinkStyle, color: landColors.subText }}>Community Hub</p>
              <p style={{ ...footerLinkStyle, color: landColors.subText }}>Privacy Framework</p>
            </div>
            <div>
              <h4 style={{ ...footerHeadingStyle, color: '#10b981' }}>Project</h4>
              <p style={{ ...footerLinkStyle, color: landColors.subText }}>About Architecture</p>
              <p style={{ ...footerLinkStyle, color: landColors.subText }}>Sovereignty</p>
              <p style={{ ...footerLinkStyle, color: landColors.subText }}>Contact Endpoint</p>
            </div>
          </div>

          <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '32px', borderTop: `1px solid ${landColors.footerBorder}`, fontSize: '13px', color: landColors.subText }}>
            <p>© 2026 RescueHer Secure Matrix Network. Built for safety.</p>
            <div style={{ display: 'flex', gap: '28px', fontWeight: '700' }}>
              <span style={{ cursor: 'pointer', color: '#10b981' }}>Privacy Policy</span>
              <span style={{ cursor: 'pointer', color: '#10b981' }}>Terms of Matrix</span>
              <span style={{ cursor: 'pointer', color: '#10b981' }}>Disclosures</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// STYLES 
const minimalCardStyle = { padding: '44px 40px', background: '#ffffff', borderRadius: '24px', border: '1px solid #e8ece9', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', boxShadow: '0 4px 20px rgba(9, 51, 37, 0.02)' };
const iconBoxStyle = { width: '52px', height: '52px', borderRadius: '50%', background: '#f4f6f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '36px', color: '#093325' };
const cardTitleStyle = { fontSize: '22px', fontWeight: '700', color: '#093325', margin: '0 0 14px 0', letterSpacing: '-0.3px' };
const cardDescStyle = { fontSize: '14px', color: '#5c726a', lineHeight: '1.6', margin: '0 0 32px 0' };
const arrowBtnStyle = { width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e8ece9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', cursor: 'pointer', color: '#093325', transition: 'all 0.2s ease' };
const footerHeadingStyle = { fontSize: '13px', fontWeight: '700', color: '#093325', margin: '0 0 20px 0', textTransform: 'uppercase', letterSpacing: '0.5px' };
const footerLinkStyle = { fontSize: '14px', color: '#5c726a', margin: '0 0 12px 0', cursor: 'pointer' };
const matrixCardStyle = { background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '20px', padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 2, backdropFilter: 'blur(10px)' };
const matrixIconStyle = { fontSize: '28px', marginBottom: '20px' };
const matrixTitleStyle = { fontSize: '20px', fontWeight: '700', color: '#ffffff', margin: '0 0 12px 0' };
const matrixDescStyle = { fontSize: '13.5px', color: '#a2b7b0', lineHeight: '1.6', margin: '0 0 24px 0' };
const matrixStatusStyle = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' };
const pulseDotStyle = { width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #10b981' };

const styleTag = (
  <style>{`
    @keyframes contentFadeIn { 
      0% { opacity: 0; transform: translateY(25px); } 
      100% { opacity: 1; transform: translateY(0); } 
    } 
    @keyframes borderGlow {
      0% { border-color: rgba(16, 185, 129, 0.2); box-shadow: 0 4px 20px rgba(9, 51, 37, 0.02); }
      50% { border-color: rgba(16, 185, 129, 0.6); box-shadow: 0 4px 20px rgba(16, 185, 129, 0.15); }
      100% { border-color: rgba(16, 185, 129, 0.2); box-shadow: 0 4px 20px rgba(9, 51, 37, 0.02); }
    }
    .grid-card-hover {
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
    }
    .grid-card-hover:hover {
      transform: translateY(-5px) !important;
      border-color: #10b981 !important;
      box-shadow: 0 12px 30px rgba(16, 185, 129, 0.12) !important;
    }

    /* 📱 Mobile & Tablet Responsive Core Overrides */
    @media (max-width: 991px) {
      .responsive-nav {
        height: auto !important;
        padding: 15px 4% !important;
        flex-direction: column !important;
        gap: 15px !important;
      }
      .nav-left {
        flex-direction: column !important;
        gap: 15px !important;
        width: 100% !important;
        align-items: center !important;
      }
      .nav-links-container {
        gap: 16px !important;
        flex-wrap: wrap !important;
        justify-content: center !important;
      }
      .nav-right {
        width: 100% !important;
        justify-content: center !important;
      }

      .responsive-hero-section {
        grid-template-columns: 1fr !important;
        gap: 40px !important;
        padding: 40px 4% 60px 4% !important;
        text-align: center !important;
      }
      .hero-left-content {
        text-align: center !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
      }
      .hero-left-content h1 {
        font-size: 44px !important;
        text-align: center !important;
      }
      .hero-left-content p {
        margin: 12px auto 28px auto !important;
      }
      .hero-right-graphics {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
      }

      .values-section-header {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
        margin-bottom: 40px !important;
      }
      .values-section-header p {
        text-align: center !important;
      }

      .manifesto-grid {
        grid-template-columns: 1fr !important;
        gap: 30px !important;
      }

      .cta-banner-grid {
        grid-template-columns: 1fr !important;
        padding: 50px 30px !important;
        text-align: center !important;
      }
      .cta-banner-grid div {
        text-align: center !important;
      }
      .cta-banner-grid h2 {
        font-size: 32px !important;
      }
      .cta-banner-grid p {
        margin: 0 auto 24px auto !important;
      }
      .cta-banner-grid button {
        margin: 0 auto !important;
      }
      .cta-banner-grid div:last-child {
        display: none !important; /* Mobile e big emoji node hide thakbe */
      }

      .footer-grid {
        grid-template-columns: 1fr !important;
        gap: 30px !important;
        text-align: center !important;
      }
      .footer-grid div {
        text-align: center !important;
      }
      .footer-grid div div {
        justify-content: center !important;
      }
      .footer-bottom {
        flex-direction: column !important;
        gap: 20px !important;
        text-align: center !important;
      }
      .footer-bottom div {
        justify-content: center !important;
        flex-wrap: wrap !important;
      }
    }

    @media (max-width: 576px) {
      .responsive-hero-section h1 {
        font-size: 34px !important;
      }
      .protocols-grid {
        grid-template-columns: 1fr !important;
      }
      .matrix-grid-container {
        grid-template-columns: 1fr !important;
        padding: 30px 20px !important;
      }
      .tiers-grid {
        grid-template-columns: 1fr !important;
      }
    }
  `}</style>
);

export default LandingPage;