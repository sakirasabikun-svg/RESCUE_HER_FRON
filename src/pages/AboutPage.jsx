
// // src/pages/AboutPage.jsx
// import React, { useState } from 'react';

// function AboutPage({ theme = 'light' }) {
//   const [activeFaq, setActiveFaq] = useState(null);

//   const toggleFaq = (index) => {
//     setActiveFaq(activeFaq === index ? null : index);
//   };

//   // 🎨 ডায়নামিক ডে/ডার্ক থিম কালারস
//   const isDark = theme === 'dark';
//   const colors = {
//     pageBg: isDark ? '#020617' : '#f8fafc',
//     textMain: isDark ? '#f8fafc' : '#0f172a',
//     textMuted: isDark ? '#94a3b8' : '#64748b',
//     cardBg: isDark ? 'rgba(15, 23, 42, 0.6)' : '#ffffff',
//     cardBorder: isDark ? 'rgba(51, 65, 85, 0.5)' : '#e2e8f0',
//     cardShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.4)' : '0 4px 6px -1px rgba(0,0,0,0.05)',
//     primary: '#00bfa5',
//     accentRedBg: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fee2e2',
//     accentRedText: isDark ? '#fca5a5' : '#dc2626',
//     accentBlueBg: isDark ? 'rgba(59, 130, 246, 0.1)' : '#eff6ff',
//     accentBlueText: isDark ? '#93c5fd' : '#2563eb',
//     accentGreenBg: isDark ? 'rgba(16, 185, 129, 0.1)' : '#ecfdf5',
//     accentGreenText: isDark ? '#6ee7b7' : '#059669',
//     badgeBg: isDark ? 'rgba(51, 65, 85, 0.6)' : '#e2e8f0',
//     badgeText: isDark ? '#cbd5e1' : '#475569'
//   };

//   // ১. কোর ফিচার ডাটা অ্যারো
//   const coreFeatures = [
//     { icon: '🚨', title: 'Instant SOS Echo', desc: 'One-click immediate distress broadcast routing live GPS telemetry to secure servers.' },
//     { icon: '📍', title: 'Geospatial Mesh', desc: 'Real-time positioning powered by Leaflet and high-accuracy browser geolocation APIs.' },
//     { icon: '📝', title: 'Anonymous Telemetry', desc: 'Identity-protected hotspot logging to safely crowdsource unsafe city zones.' },
//     { icon: '🔒', title: 'End-to-End Privacy', desc: 'Secured database masking protecting user parameters during non-emergency states.' }
//   ];

//   // ২. ন্যাশনাল হেল্পলাইন ডাটা
//   const helplines = [
//     { title: 'National Emergency', phone: '999', bg: colors.accentRedBg, color: colors.accentRedText, btnBg: '#dc2626' },
//     { title: 'Women & Children Helpline', phone: '109', bg: colors.accentBlueBg, color: colors.accentBlueText, btnBg: '#2563eb' },
//     { title: 'Human Rights Alert', phone: '1072', bg: colors.accentGreenBg, color: colors.accentGreenText, btnBg: '#059669' }
//   ];

//   // ৩. FAQ ডাটা
//   const faqs = [
//     { q: "How does the Live Tracking Sync mechanism operate?", a: "When SOS is triggered, the architecture uses aggressive short-polling to continuously map GPS nodes to the database without requiring standard UI page refreshes." },
//     { q: "Is the Incident Reporting pipeline fully confidential?", a: "Yes. The backend architecture strips away authorization headers and user tokens, storing only the telemetry metadata to construct crime hotspot matrices." },
//     { q: "Can I manage emergency nodes dynamically?", a: "Absolutely. The unified control dashboard allows instant insertion, update, and real-time deletion parameters for emergency contacts." }
//   ];

//   return (
//     <div style={{ 
//       padding: '50px 30px', 
//       fontFamily: 'system-ui, -apple-system, sans-serif', 
//       color: colors.textMain, 
//       backgroundColor: colors.pageBg, 
//       minHeight: '100vh',
//       transition: 'all 0.3s ease',
//       position: 'relative',
//       overflow: 'hidden'
//     }}>
      
//       {/* 🌌 Background Elements */}
//       <div style={{ position: 'absolute', width: '300px', height: '300px', background: isDark ? 'rgba(0, 191, 165, 0.05)' : 'rgba(0, 191, 165, 0.03)', filter: 'blur(80px)', top: '-50px', left: '-50px', zIndex: 0, pointerEvents: 'none' }}></div>
//       <div style={{ position: 'absolute', width: '400px', height: '400px', background: isDark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.03)', filter: 'blur(100px)', bottom: '10%', right: '-10%', zIndex: 0, pointerEvents: 'none' }}></div>

//       {/* ✨ CSS ANIMATIONS */}
//       <style>{`
//         .hero-gradient {
//           background: ${isDark ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 0.95) 100%)' : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'};
//         }
//         .hover-card:hover {
//           transform: translateY(-6px);
//           box-shadow: ${isDark ? '0 12px 30px rgba(0, 191, 165, 0.15)' : '0 12px 20px -5px rgba(0,0,0,0.1)'};
//           border-color: ${isDark ? 'rgba(0, 191, 165, 0.4)' : '#cbd5e1'};
//         }
//         @keyframes floatUp {
//           0% { transform: translateY(20px); opacity: 0; }
//           100% { transform: translateY(0); opacity: 1; }
//         }
//         .animate-float { animation: floatUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
//       `}</style>

//       <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

//         {/* ✨ HERO MISSION SECTION */}
//         <div className="hero-gradient animate-float" style={{ 
//           textAlign: 'center', 
//           padding: '60px 30px', 
//           borderRadius: '28px', 
//           color: 'white',
//           boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
//           marginBottom: '50px',
//           border: `1px solid ${isDark ? 'rgba(51, 65, 85, 0.8)' : 'transparent'}`,
//           position: 'relative',
//           overflow: 'hidden'
//         }}>
//           {/* Glowing Orb inside Hero */}
//           <div style={{ position: 'absolute', width: '200px', height: '200px', background: 'rgba(0, 191, 165, 0.2)', filter: 'blur(50px)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }}></div>
          
//           <div style={{ position: 'relative', zIndex: 1 }}>
//             <h1 style={{ fontSize: '38px', fontWeight: '900', marginBottom: '16px', letterSpacing: '-0.5px', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
//               Empowering Safety Through Real-Time Tech
//             </h1>
//             <p style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '650px', margin: '0 auto', lineHeight: '1.7', fontWeight: '500' }}>
//               A next-generation premium safety ecosystem utilizing advanced geospatial telemetry and cryptographic data masking to build a decentralized network of protection.
//             </p>
//           </div>
//         </div>

//         {/* 🧩 CORE ARCHITECTURE */}
//         <div className="animate-float" style={{ animationDelay: '0.1s', opacity: 0 }}>
//           <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: colors.textMain, display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <span style={{ fontSize: '24px' }}>🛡️</span> Application Core Pillars
//           </h2>
//           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '50px' }}>
//             {coreFeatures.map((item, idx) => (
//               <div 
//                 key={idx}
//                 className="hover-card"
//                 style={{ 
//                   flex: '1 1 calc(25% - 24px)',
//                   minWidth: '240px',
//                   backgroundColor: colors.cardBg,
//                   padding: '28px 24px',
//                   borderRadius: '20px',
//                   border: `1px solid ${colors.cardBorder}`,
//                   boxShadow: colors.cardShadow,
//                   transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//                   cursor: 'pointer',
//                   backdropFilter: 'blur(10px)'
//                 }}
//               >
//                 <div style={{ fontSize: '36px', marginBottom: '16px', textShadow: isDark ? '0 0 15px rgba(255,255,255,0.2)' : 'none' }}>{item.icon}</div>
//                 <h3 style={{ fontSize: '17px', fontWeight: '800', color: colors.textMain, marginBottom: '10px', letterSpacing: '0.3px' }}>{item.title}</h3>
//                 <p style={{ fontSize: '13.5px', color: colors.textMuted, lineHeight: '1.6', margin: 0, fontWeight: '500' }}>{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 🧭 INTERACTIVE WORKFLOW TIMELINE */}
//         <div className="animate-float" style={{ animationDelay: '0.2s', opacity: 0 }}>
//           <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: colors.textMain, display: 'flex', alignItems: 'center', gap: '10px' }}>
//             <span style={{ fontSize: '24px', color: '#ef4444' }}>⚡</span> Execution Lifecycle Pipeline
//           </h2>
//           <div style={{ 
//             display: 'flex', flexWrap: 'wrap', gap: '20px', 
//             backgroundColor: colors.cardBg, padding: '30px', 
//             borderRadius: '24px', border: `1px solid ${colors.cardBorder}`, 
//             marginBottom: '50px', boxShadow: colors.cardShadow,
//             backdropFilter: 'blur(10px)'
//           }}>
//             {[
//               { step: '01', title: 'Trigger Event', desc: 'User initiates critical breach signal via dashboard/SOS hardware button maps.' },
//               { step: '02', title: 'Fetch Telemetry', desc: 'Hardware geolocation sensors aggressively capture spatial coordinates.' },
//               { step: '03', title: 'Database Sync', desc: 'REST architecture pushes secure records downstream to MySQL nodes.' },
//               { step: '04', title: 'Alert Broadcast', desc: 'Nodemailer and emergency networks deploy immediate multi-channel notifications.' }
//             ].map((time, idx) => (
//               <div key={idx} style={{ flex: '1 1 calc(25% - 20px)', minWidth: '200px', padding: '10px' }}>
//                 <span style={{ fontSize: '28px', fontWeight: '900', color: '#ef4444', display: 'block', marginBottom: '8px', textShadow: isDark ? '0 0 10px rgba(239, 68, 68, 0.4)' : 'none' }}>{time.step}</span>
//                 <h4 style={{ fontSize: '15px', fontWeight: '800', color: colors.textMain, marginBottom: '8px' }}>{time.title}</h4>
//                 <p style={{ fontSize: '13px', color: colors.textMuted, margin: 0, lineHeight: '1.5', fontWeight: '500' }}>{time.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* 📞 HELPLINE & FAQs */}
//         <div className="animate-float" style={{ animationDelay: '0.3s', opacity: 0, display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          
//           {/* Left: Helpline Directory */}
//           <div style={{ flex: '1 1 calc(40% - 40px)', minWidth: '320px' }}>
//             <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: colors.textMain, display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <span style={{ fontSize: '24px' }}>📞</span> Crisis Command Directory
//             </h2>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//               {helplines.map((help, idx) => (
//                 <div key={idx} className="hover-card" style={{ 
//                   display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
//                   padding: '20px', backgroundColor: help.bg, borderRadius: '16px', 
//                   border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'}`,
//                   transition: 'transform 0.2s ease', cursor: 'default'
//                 }}>
//                   <span style={{ fontSize: '14.5px', fontWeight: '700', color: help.color }}>{help.title}</span>
//                   <a href={`tel:${help.phone}`} style={{ 
//                     textDecoration: 'none', backgroundColor: help.btnBg, color: 'white', 
//                     padding: '8px 18px', borderRadius: '10px', fontSize: '13.5px', 
//                     fontWeight: '800', boxShadow: `0 4px 10px ${help.btnBg}66`,
//                     transition: 'opacity 0.2s'
//                   }}
//                   onMouseEnter={(e) => e.target.style.opacity = 0.9}
//                   onMouseLeave={(e) => e.target.style.opacity = 1}
//                   >
//                     Call {help.phone}
//                   </a>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right: FAQ Accordion */}
//           <div style={{ flex: '1 1 calc(60% - 40px)', minWidth: '320px' }}>
//             <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: colors.textMain, display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <span style={{ fontSize: '24px' }}>💬</span> System Intelligence FAQs
//             </h2>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//               {faqs.map((faq, idx) => (
//                 <div key={idx} style={{ 
//                   backgroundColor: colors.cardBg, borderRadius: '16px', 
//                   border: `1px solid ${colors.cardBorder}`, overflow: 'hidden',
//                   boxShadow: colors.cardShadow, backdropFilter: 'blur(10px)'
//                 }}>
//                   <button 
//                     onClick={() => toggleFaq(idx)}
//                     style={{ 
//                       width: '100%', padding: '20px', border: 'none', backgroundColor: 'transparent', 
//                       textAlign: 'left', display: 'flex', justifyContent: 'space-between', 
//                       alignItems: 'center', cursor: 'pointer', fontWeight: '700', 
//                       fontSize: '14.5px', color: colors.textMain, outline: 'none' 
//                     }}
//                   >
//                     <span>{faq.q}</span>
//                     <span style={{ 
//                       fontSize: '16px', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
//                       transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
//                       color: colors.primary
//                     }}>🔽</span>
//                   </button>
//                   <div style={{ 
//                     maxHeight: activeFaq === idx ? '200px' : '0', 
//                     overflow: 'hidden', 
//                     transition: 'max-height 0.3s ease-in-out' 
//                   }}>
//                     <div style={{ padding: '0 20px 20px 20px', fontSize: '13.5px', color: colors.textMuted, lineHeight: '1.6', fontWeight: '500' }}>
//                       {faq.a}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>

//         {/* 🛠️ TECH STACK MATRIX */}
//         <div className="animate-float" style={{ animationDelay: '0.4s', opacity: 0, marginTop: '60px', borderTop: `1px solid ${colors.cardBorder}`, paddingTop: '30px', textAlign: 'center' }}>
//           <p style={{ fontSize: '12px', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700' }}>
//             System Architecture Tech Stack Matrix
//           </p>
//           <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '20px', paddingBottom: '20px' }}>
//             {['React 18', 'Node.js', 'Express', 'MySQL Server', 'OpenStreetMap API', 'Leaflet Engine'].map((tech, idx) => (
//               <span key={idx} style={{ 
//                 padding: '8px 16px', backgroundColor: colors.badgeBg, color: colors.badgeText, 
//                 borderRadius: '10px', fontSize: '12px', fontWeight: '700',
//                 border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'transparent'}`,
//                 boxShadow: isDark ? 'inset 0 1px 0 rgba(255,255,255,0.1)' : 'none'
//               }}>
//                 {tech}
//               </span>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default AboutPage;


















// src/pages/AboutPage.jsx
import React, { useState } from 'react';

function AboutPage({ theme = 'light' }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // 🎨 ডায়নামিক ডে/ডার্ক থিম কালারস
  const isDark = theme === 'dark';
  const colors = {
    pageBg: isDark ? '#020617' : '#f8fafc',
    textMain: isDark ? '#f8fafc' : '#0f172a',
    textMuted: isDark ? '#94a3b8' : '#64748b',
    cardBg: isDark ? 'rgba(15, 23, 42, 0.6)' : '#ffffff',
    cardBorder: isDark ? 'rgba(51, 65, 85, 0.5)' : '#e2e8f0',
    cardShadow: isDark ? '0 8px 24px rgba(0, 0, 0, 0.4)' : '0 4px 6px -1px rgba(0,0,0,0.05)',
    primary: '#00bfa5',
    accentRedBg: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fee2e2',
    accentRedText: isDark ? '#fca5a5' : '#dc2626',
    accentBlueBg: isDark ? 'rgba(59, 130, 246, 0.1)' : '#eff6ff',
    accentBlueText: isDark ? '#93c5fd' : '#2563eb',
    accentGreenBg: isDark ? 'rgba(16, 185, 129, 0.1)' : '#ecfdf5',
    accentGreenText: isDark ? '#6ee7b7' : '#059669',
    badgeBg: isDark ? 'rgba(51, 65, 85, 0.6)' : '#e2e8f0',
    badgeText: isDark ? '#cbd5e1' : '#475569'
  };

  // ১. কোর ফিচার ডাটা অ্যারো
  const coreFeatures = [
    { icon: '🚨', title: 'Instant SOS Echo', desc: 'One-click immediate distress broadcast routing live GPS telemetry to secure servers.' },
    { icon: '📍', title: 'Geospatial Mesh', desc: 'Real-time positioning powered by Leaflet and high-accuracy browser geolocation APIs.' },
    { icon: '📝', title: 'Anonymous Telemetry', desc: 'Identity-protected hotspot logging to safely crowdsource unsafe city zones.' },
    { icon: '🔒', title: 'End-to-End Privacy', desc: 'Secured database masking protecting user parameters during non-emergency states.' }
  ];

  // ২. ন্যাশনাল হেল্পলাইন ডাটা
  const helplines = [
    { title: 'National Emergency', phone: '999', bg: colors.accentRedBg, color: colors.accentRedText, btnBg: '#dc2626' },
    { title: 'Women & Children Helpline', phone: '109', bg: colors.accentBlueBg, color: colors.accentBlueText, btnBg: '#2563eb' },
    { title: 'Human Rights Alert', phone: '1072', bg: colors.accentGreenBg, color: colors.accentGreenText, btnBg: '#059669' }
  ];

  // ৩. FAQ ডাটা
  const faqs = [
    { q: "How does the Live Tracking Sync mechanism operate?", a: "When SOS is triggered, the architecture uses aggressive short-polling to continuously map GPS nodes to the database without requiring standard UI page refreshes." },
    { q: "Is the Incident Reporting pipeline fully confidential?", a: "Yes. The backend architecture strips away authorization headers and user tokens, storing only the telemetry metadata to construct crime hotspot matrices." },
    { q: "Can I manage emergency nodes dynamically?", a: "Absolutely. The unified control dashboard allows instant insertion, update, and real-time deletion parameters for emergency contacts." }
  ];

  return (
    <div className="about-container" style={{ 
      padding: '50px 30px', 
      fontFamily: 'system-ui, -apple-system, sans-serif', 
      color: colors.textMain, 
      backgroundColor: colors.pageBg, 
      minHeight: '100vh',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* 🌌 Background Elements */}
      <div style={{ position: 'absolute', width: '300px', height: '300px', background: isDark ? 'rgba(0, 191, 165, 0.05)' : 'rgba(0, 191, 165, 0.03)', filter: 'blur(80px)', top: '-50px', left: '-50px', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', width: '400px', height: '400px', background: isDark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.03)', filter: 'blur(100px)', bottom: '10%', right: '-10%', zIndex: 0, pointerEvents: 'none' }}></div>

      {/* ✨ CSS ANIMATIONS & MOBILE RESPONSIVENESS */}
      <style>{`
        .hero-gradient {
          background: ${isDark ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 0.95) 100%)' : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'};
        }
        .hover-card:hover {
          transform: translateY(-6px);
          box-shadow: ${isDark ? '0 12px 30px rgba(0, 191, 165, 0.15)' : '0 12px 20px -5px rgba(0,0,0,0.1)'};
          border-color: ${isDark ? 'rgba(0, 191, 165, 0.4)' : '#cbd5e1'};
        }
        @keyframes floatUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-float { animation: floatUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards; }

        /* 📱 Mobile Media Query (AI Added) */
        @media (max-width: 768px) {
          .about-container { padding: 30px 15px !important; }
          .hero-section { padding: 40px 20px !important; margin-bottom: 30px !important; }
          .hero-section h1 { font-size: 26px !important; line-height: 1.3; }
          .hero-section p { font-size: 14px !important; }
          
          .grid-container { display: flex !important; flex-direction: column !important; gap: 15px !important; }
          .grid-item { flex: 1 1 100% !important; min-width: 100% !important; }
          
          .help-faq-wrapper { flex-direction: column !important; gap: 30px !important; }
          .help-faq-col { min-width: 100% !important; }
          
          .tech-stack-matrix span { font-size: 11px !important; padding: 6px 12px !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ✨ HERO MISSION SECTION */}
        <div className="hero-gradient animate-float hero-section" style={{ 
          textAlign: 'center', 
          padding: '60px 30px', 
          borderRadius: '28px', 
          color: 'white',
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
          marginBottom: '50px',
          border: `1px solid ${isDark ? 'rgba(51, 65, 85, 0.8)' : 'transparent'}`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Glowing Orb inside Hero */}
          <div style={{ position: 'absolute', width: '200px', height: '200px', background: 'rgba(0, 191, 165, 0.2)', filter: 'blur(50px)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontSize: '38px', fontWeight: '900', marginBottom: '16px', letterSpacing: '-0.5px', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              Empowering Safety Through Real-Time Tech
            </h1>
            <p style={{ fontSize: '16px', color: '#cbd5e1', maxWidth: '650px', margin: '0 auto', lineHeight: '1.7', fontWeight: '500' }}>
              A next-generation premium safety ecosystem utilizing advanced geospatial telemetry and cryptographic data masking to build a decentralized network of protection.
            </p>
          </div>
        </div>

        {/* 🧩 CORE ARCHITECTURE */}
        <div className="animate-float" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: colors.textMain, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>🛡️</span> Application Core Pillars
          </h2>
          <div className="grid-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '50px' }}>
            {coreFeatures.map((item, idx) => (
              <div 
                key={idx}
                className="hover-card grid-item"
                style={{ 
                  flex: '1 1 calc(25% - 24px)',
                  minWidth: '240px',
                  backgroundColor: colors.cardBg,
                  padding: '28px 24px',
                  borderRadius: '20px',
                  border: `1px solid ${colors.cardBorder}`,
                  boxShadow: colors.cardShadow,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '16px', textShadow: isDark ? '0 0 15px rgba(255,255,255,0.2)' : 'none' }}>{item.icon}</div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: colors.textMain, marginBottom: '10px', letterSpacing: '0.3px' }}>{item.title}</h3>
                <p style={{ fontSize: '13.5px', color: colors.textMuted, lineHeight: '1.6', margin: 0, fontWeight: '500' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🧭 INTERACTIVE WORKFLOW TIMELINE */}
        <div className="animate-float" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: colors.textMain, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px', color: '#ef4444' }}>⚡</span> Execution Lifecycle Pipeline
          </h2>
          <div className="grid-container" style={{ 
            display: 'flex', flexWrap: 'wrap', gap: '20px', 
            backgroundColor: colors.cardBg, padding: '30px', 
            borderRadius: '24px', border: `1px solid ${colors.cardBorder}`, 
            marginBottom: '50px', boxShadow: colors.cardShadow,
            backdropFilter: 'blur(10px)'
          }}>
            {[
              { step: '01', title: 'Trigger Event', desc: 'User initiates critical breach signal via dashboard/SOS hardware button maps.' },
              { step: '02', title: 'Fetch Telemetry', desc: 'Hardware geolocation sensors aggressively capture spatial coordinates.' },
              { step: '03', title: 'Database Sync', desc: 'REST architecture pushes secure records downstream to MySQL nodes.' },
              { step: '04', title: 'Alert Broadcast', desc: 'Nodemailer and emergency networks deploy immediate multi-channel notifications.' }
            ].map((time, idx) => (
              <div key={idx} className="grid-item" style={{ flex: '1 1 calc(25% - 20px)', minWidth: '200px', padding: '10px' }}>
                <span style={{ fontSize: '28px', fontWeight: '900', color: '#ef4444', display: 'block', marginBottom: '8px', textShadow: isDark ? '0 0 10px rgba(239, 68, 68, 0.4)' : 'none' }}>{time.step}</span>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: colors.textMain, marginBottom: '8px' }}>{time.title}</h4>
                <p style={{ fontSize: '13px', color: colors.textMuted, margin: 0, lineHeight: '1.5', fontWeight: '500' }}>{time.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 📞 HELPLINE & FAQs */}
        <div className="animate-float help-faq-wrapper" style={{ animationDelay: '0.3s', opacity: 0, display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
          
          {/* Left: Helpline Directory */}
          <div className="help-faq-col" style={{ flex: '1 1 calc(40% - 40px)', minWidth: '320px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: colors.textMain, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>📞</span> Crisis Command Directory
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {helplines.map((help, idx) => (
                <div key={idx} className="hover-card" style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  padding: '20px', backgroundColor: help.bg, borderRadius: '16px', 
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'}`,
                  transition: 'transform 0.2s ease', cursor: 'default'
                }}>
                  <span style={{ fontSize: '14.5px', fontWeight: '700', color: help.color }}>{help.title}</span>
                  <a href={`tel:${help.phone}`} style={{ 
                    textDecoration: 'none', backgroundColor: help.btnBg, color: 'white', 
                    padding: '8px 18px', borderRadius: '10px', fontSize: '13.5px', 
                    fontWeight: '800', boxShadow: `0 4px 10px ${help.btnBg}66`,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = 0.9}
                  onMouseLeave={(e) => e.target.style.opacity = 1}
                  >
                    Call {help.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right: FAQ Accordion */}
          <div className="help-faq-col" style={{ flex: '1 1 calc(60% - 40px)', minWidth: '320px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: colors.textMain, display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>💬</span> System Intelligence FAQs
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ 
                  backgroundColor: colors.cardBg, borderRadius: '16px', 
                  border: `1px solid ${colors.cardBorder}`, overflow: 'hidden',
                  boxShadow: colors.cardShadow, backdropFilter: 'blur(10px)'
                }}>
                  <button 
                    onClick={() => toggleFaq(idx)}
                    style={{ 
                      width: '100%', padding: '20px', border: 'none', backgroundColor: 'transparent', 
                      textAlign: 'left', display: 'flex', justifyContent: 'space-between', 
                      alignItems: 'center', cursor: 'pointer', fontWeight: '700', 
                      fontSize: '14.5px', color: colors.textMain, outline: 'none' 
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ 
                      fontSize: '16px', transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
                      transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                      color: colors.primary
                    }}>🔽</span>
                  </button>
                  <div style={{ 
                    maxHeight: activeFaq === idx ? '200px' : '0', 
                    overflow: 'hidden', 
                    transition: 'max-height 0.3s ease-in-out' 
                  }}>
                    <div style={{ padding: '0 20px 20px 20px', fontSize: '13.5px', color: colors.textMuted, lineHeight: '1.6', fontWeight: '500' }}>
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 🛠️ TECH STACK MATRIX */}
        <div className="animate-float tech-stack-matrix" style={{ animationDelay: '0.4s', opacity: 0, marginTop: '60px', borderTop: `1px solid ${colors.cardBorder}`, paddingTop: '30px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700' }}>
            System Architecture Tech Stack Matrix
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '20px', paddingBottom: '20px' }}>
            {['React 18', 'Node.js', 'Express', 'MySQL Server', 'OpenStreetMap API', 'Leaflet Engine'].map((tech, idx) => (
              <span key={idx} style={{ 
                padding: '8px 16px', backgroundColor: colors.badgeBg, color: colors.badgeText, 
                borderRadius: '10px', fontSize: '12px', fontWeight: '700',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'transparent'}`,
                boxShadow: isDark ? 'inset 0 1px 0 rgba(255,255,255,0.1)' : 'none'
              }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutPage;