



// // src/pages/FAQPage.jsx
// import React, { useState } from 'react';

// function FAQPage({ theme }) {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const isDark = theme === 'dark';

//   // Dynamic colors based on theme
//   const colors = {
//     primaryText: isDark ? '#f8fafc' : '#093325',
//     secondaryText: isDark ? '#a2b7b0' : '#5c726a',
//     cardBg: isDark ? '#111a16' : '#ffffff',
//     cardBorder: isDark ? 'rgba(16, 185, 129, 0.25)' : '#e8ece9',
//     emblemBg: isDark ? '#16231f' : '#eef5f2',
//     dividerColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#f0f4f1',
//     meshColor: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.04)'
//   };

//   const faqs = [
//     {
//       question: "How does the Instant SOS button work?",
//       answer: "When you press the SOS button, RescueHer instantly captures your background telemetry (live GPS coordinates) and triggers an encrypted data packet bypass. This simultaneously sends emergency alerts to your pre-configured Guardian Nodes without any intermediate server processing delay."
//     },
//     {
//       question: "Will RescueHer track my location all the time?",
//       answer: "Absolutely not. We believe in total data privacy. Your location parameters are only processed locally inside your active session window when you explicitly engage a security tracking layer or trigger an SOS signal."
//     },
//     {
//       question: "What is a Guardian Node?",
//       answer: "A Guardian Node is a trusted contact (friend, family, or emergency service endpoint) that you securely configure inside your Security Hub dashboard. They receive instant real-time alerts and live-tracking map vectors whenever you trigger an incident report."
//     },
//     {
//       question: "Does it require a continuous internet connection?",
//       answer: "For real-time map synchronization and instant e-mail/API alerts, an active data stream is ideal. However, the system is designed to compress telemetry data packets tightly so they can pipe through even under weak cellular network signals."
//     },
//     {
//       question: "Are my incident records securely encrypted?",
//       answer: "Yes, fully. All logs, active endpoints, and threat intelligence streams are encrypted with industry-standard AES-256 protocols and guarded by strict JSON Web Token (JWT) layers, making it entirely private to you and authorized peers."
//     }
//   ];

//   return (
//     <div className="faq-container" style={{ padding: '140px 6% 40px 6%', position: 'relative', minHeight: '100vh', transition: 'all 0.3s ease', overflowX: 'hidden' }}>
      
//       {/* 📱 LOCAL COMPONENT RESPONSIVE STYLES (Upai 2 Style) */}
//       <style>{`
//         .faq-container {
//           box-sizing: border-box;
//           width: 100%;
//           display: flex;
//           flex-direction: column;
//         }
//         .faq-container *, .faq-container *::before, .faq-container *::after {
//           box-sizing: border-box; /* Ensures padding never forces layout overflow */
//         }
//         .support-card {
//           background: ${colors.cardBg};
//           border: 1px solid ${colors.cardBorder};
//           border-radius: 24px;
//           padding: 32px;
//           display: flex;
//           flex-direction: column;
//           align-items: flex-start;
//           text-align: left;
//           transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
//           cursor: pointer;
//         }
//         .support-card:hover {
//           transform: translateY(-5px);
//           box-shadow: ${isDark ? '0 12px 30px rgba(0,0,0,0.4)' : '0 12px 30px rgba(9, 51, 37, 0.05)'};
//           border-color: #10b981;
//         }
//         .faq-item-row {
//           transition: border-color 0.3s ease, box-shadow 0.3s ease;
//         }
//         .faq-item-row:hover {
//           border-color: #10b981 !important;
//         }
//         .br-desktop {
//           display: block;
//         }
//         .footer-link {
//           text-decoration: none;
//           transition: color 0.2s ease;
//         }
//         .footer-link:hover {
//           color: #10b981 !important;
//         }

//         /* Tablet & Mobile Screens Viewport */
//         @media (max-width: 768px) {
//           .faq-container {
//             padding: 120px 20px 30px 20px !important;
//           }
//           .faq-header-wrapper {
//             margin-bottom: 40px !important;
//             gap: 20px !important;
//             flex-direction: column !important;
//             align-items: flex-start !important;
//           }
//           .faq-main-title {
//             font-size: 30px !important;
//             line-height: 1.25 !important;
//           }
//           .br-desktop {
//             display: none !important;
//           }
//           .faq-emblem {
//             width: 70px !important;
//             height: 70px !important;
//             font-size: 28px !important;
//             border-radius: 16px !important;
//             align-self: flex-start !important;
//           }
//           .support-grid {
//             grid-template-columns: 1fr !important;
//             gap: 16px !important;
//             margin-bottom: 40px !important;
//           }
//           .support-card {
//             padding: 20px !important;
//           }
//           .faq-section-title {
//             font-size: 20px !important;
//             margin-bottom: 20px !important;
//           }
//           .faq-list-wrapper {
//             gap: 12px !important;
//             width: 100% !important;
//             margin-bottom: 60px !important;
//           }
//           .faq-item-row {
//             padding: 16px 18px !important;
//           }
//           .faq-question-text {
//             font-size: 14.5px !important;
//           }
          
//           /* Responsive Footer Modifications */
//           .faq-footer {
//             flex-direction: column !important;
//             align-items: flex-start !important;
//             gap: 20px !important;
//             margin-top: 50px !important;
//             padding-top: 24px !important;
//           }
//           .faq-footer-links {
//             justify-content: flex-start !important;
//             gap: 16px !important;
//             width: 100%;
//           }
//         }

//         /* Small Portrait Smartphones */
//         @media (max-width: 480px) {
//           .faq-container {
//             padding: 110px 16px 24px 16px !important;
//           }
//           .faq-main-title {
//             font-size: 24px !important;
//           }
//           .faq-footer-links {
//             flex-direction: column !important;
//             gap: 10px !important;
//           }
//         }
//       `}</style>
      
//       {/* BACKGROUND MESH GLOW */}
//       <div style={{
//         position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px',
//         background: `radial-gradient(circle, ${colors.meshColor} 0%, transparent 70%)`, pointerEvents: 'none'
//       }}></div>

//       {/* 🚀 HEADER WITH FLEX LAYOUT & VISUAL EMBLEM */}
//       <div className="faq-header-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', marginBottom: '60px', flexWrap: 'wrap' }}>
//         <div style={{ maxWidth: '650px', textAlign: 'left' }}>
//           <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>SUPPORT PLATFORM</span>
//           <h1 className="faq-main-title" style={{ fontSize: '44px', fontWeight: '800', color: colors.primaryText, letterSpacing: '-1.5px', margin: '0 0 16px 0', lineHeight: '1.2', transition: 'color 0.3s' }}>
//             Frequently Asked <br className="br-desktop" />Questions Matrix
//           </h1>
//           <p style={{ fontSize: '14.5px', color: colors.secondaryText, lineHeight: '1.6', margin: 0 }}>
//             Have questions about security node synchronization, telemetry logging, or system uptime? Explore our technical knowledge layer below.
//           </p>
//         </div>
        
//         {/* RIGHT SIDE ABSTRACT IMAGE/ICON EMBLEM */}
//         <div className="faq-emblem" style={{
//           background: colors.emblemBg, width: '130px', height: '130px', borderRadius: '32px',
//           display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px',
//           boxShadow: isDark ? 'inset 0 0 20px rgba(16, 185, 129, 0.15)' : 'inset 0 0 20px rgba(16, 185, 129, 0.1)', 
//           border: `1px solid ${colors.cardBorder}`, transition: 'all 0.3s ease'
//         }}>
//           💡
//         </div>
//       </div>

//       {/* 🌟 VISUAL QUICK HELP CARDS GRID */}
//       <div className="support-grid" style={{
//         display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//         gap: '24px', marginBottom: '70px', width: '100%'
//       }}>
//         {/* CARD 1: EMERGENCY */}
//         <div className="support-card">
//           <div style={{ width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '24px', background: isDark ? '#3b1818' : '#fee2e2', color: '#ef4444' }}>🚨</div>
//           <h3 style={{ fontSize: '19px', fontWeight: '700', color: colors.primaryText, margin: '0 0 10px 0' }}>Emergency SOS</h3>
//           <p style={{ fontSize: '13.5px', color: colors.secondaryText, lineHeight: '1.5', margin: '0 0 20px 0', flexGrow: 1 }}>Live telemetry coordinates transmission & hardware synchronization updates protocol.</p>
//           <span style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>View Protocol →</span>
//         </div>

//         {/* CARD 2: PRIVACY */}
//         <div className="support-card">
//           <div style={{ width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '24px', background: isDark ? '#0b291b' : '#d1fae5', color: '#10b981' }}>🔒</div>
//           <h3 style={{ fontSize: '19px', fontWeight: '700', color: colors.primaryText, margin: '0 0 10px 0' }}>Data Sovereignty</h3>
//           <p style={{ fontSize: '13.5px', color: colors.secondaryText, lineHeight: '1.5', margin: '0 0 20px 0', flexGrow: 1 }}>Understand how local active session memories process core parameters privately.</p>
//           <span style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Privacy Specs →</span>
//         </div>

//         {/* CARD 3: SYSTEM STATUS */}
//         <div className="support-card">
//           <div style={{ width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '24px', background: isDark ? '#0c2333' : '#e0f2fe', color: '#0284c7' }}>🛰️</div>
//           <h3 style={{ fontSize: '19px', fontWeight: '700', color: colors.primaryText, margin: '0 0 10px 0' }}>Telemetry Sync</h3>
//           <p style={{ fontSize: '13.5px', color: colors.secondaryText, lineHeight: '1.5', margin: '0 0 20px 0', flexGrow: 1 }}>Configuring continuous civilian guardian nodes map endpoints smoothly.</p>
//           <span style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Network Health →</span>
//         </div>
//       </div>

//       {/* --- SECTION DIVIDER --- */}
//       <h2 className="faq-section-title" style={{ fontSize: '24px', fontWeight: '800', color: colors.primaryText, marginBottom: '32px', letterSpacing: '-0.5px', textAlign: 'left', transition: 'color 0.3s' }}>Detailed Core Diagnostics</h2>

//       {/* FAQ ACCORDION LIST */}
//       <div className="faq-list-wrapper" style={{ maxWidth: '850px', display: 'flex', flexDirection: 'column', gap: '16px', margin: '0 auto 80px 0', width: '100%' }}>
//         {faqs.map((faq, index) => {
//           const isOpen = activeIndex === index;
//           return (
//             <div 
//               key={index} 
//               className="faq-item-row"
//               style={{
//                 background: colors.cardBg,
//                 border: isOpen ? '1px solid #10b981' : `1px solid ${colors.cardBorder}`,
//                 borderRadius: '16px',
//                 padding: '24px',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
//                 boxShadow: isOpen ? (isDark ? '0 10px 25px rgba(0,0,0,0.3)' : '0 10px 25px rgba(16, 185, 129, 0.05)') : 'none'
//               }}
//               onClick={() => toggleFAQ(index)}
//             >
//               {/* Question Row */}
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
//                 <h3 className="faq-question-text" style={{ fontSize: '16px', fontWeight: '700', color: colors.primaryText, margin: 0, textAlign: 'left', transition: 'color 0.3s', lineHeight: '1.4' }}>
//                   {faq.question}
//                 </h3>
//                 <span style={{ 
//                   fontSize: '20px', 
//                   color: isOpen ? '#10b981' : colors.secondaryText,
//                   transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
//                   transition: 'transform 0.2s ease',
//                   fontWeight: '300',
//                   flexShrink: 0
//                 }}>
//                   ＋
//                 </span>
//               </div>

//               {/* Answer Row (Collapsible) */}
//               <div style={{
//                 maxHeight: isOpen ? '300px' : '0',
//                 opacity: isOpen ? 1 : 0,
//                 overflow: 'hidden',
//                 transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
//                 marginTop: isOpen ? '16px' : '0'
//               }}>
//                 <p style={{ fontSize: '14px', color: colors.secondaryText, lineHeight: '1.6', margin: 0, paddingTop: '12px', borderTop: `1px solid ${colors.dividerColor}`, textAlign: 'left', transition: 'all 0.3s' }}>
//                   {faq.answer}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* 👣 INTEGRATED RESPONSIVE FOOTER MODULE */}
//       <footer className="faq-footer" style={{
//         marginTop: 'auto',
//         paddingTop: '32px',
//         borderTop: `1px solid ${colors.dividerColor}`,
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         flexWrap: 'wrap',
//         gap: '24px',
//         width: '100%',
//         transition: 'border-color 0.3s ease'
//       }}>
//         <div style={{ textAlign: 'left' }}>
//           <span style={{ fontSize: '16px', fontWeight: '800', color: '#10b981', letterSpacing: '-0.5px' }}>RescueHer</span>
//           <p style={{ fontSize: '13px', color: colors.secondaryText, margin: '4px 0 0 0', lineHeight: '1.4' }}>
//             &copy; {new Date().getFullYear()} Secure Matrix Network. All rights reserved.
//           </p>
//         </div>
        
//         <div className="faq-footer-links" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
//           <a href="#privacy" className="footer-link" style={{ fontSize: '13px', color: colors.secondaryText }}>Privacy Policy</a>
//           <a href="#terms" className="footer-link" style={{ fontSize: '13px', color: colors.secondaryText }}>Terms of Service</a>
//           <a href="#contact" className="footer-link" style={{ fontSize: '13px', color: colors.secondaryText }}>Contact Hub</a>
//         </div>
//       </footer>

//     </div>
//   );
// }

// export default FAQPage;









// // src/pages/FAQPage.jsx
// import React, { useState } from 'react';

// function FAQPage({ theme }) {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const isDark = theme === 'dark';

//   // Dynamic colors based on theme
//   const colors = {
//     primaryText: isDark ? '#f8fafc' : '#093325',
//     secondaryText: isDark ? '#a2b7b0' : '#5c726a',
//     cardBg: isDark ? '#111a16' : '#ffffff',
//     cardBorder: isDark ? 'rgba(16, 185, 129, 0.25)' : '#e8ece9',
//     emblemBg: isDark ? '#16231f' : '#eef5f2',
//     dividerColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#f0f4f1',
//     meshColor: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.04)'
//   };

//   // CSS variables mapping to optimize rendering and prevent styles flashing
//   const cssVariables = {
//     '--card-bg': colors.cardBg,
//     '--card-border': colors.cardBorder,
//     '--primary-text': colors.primaryText,
//     '--secondary-text': colors.secondaryText,
//     '--emblem-bg': colors.emblemBg,
//     '--divider-color': colors.dividerColor,
//     '--hover-shadow': isDark ? '0 12px 30px rgba(0,0,0,0.4)' : '0 12px 30px rgba(9, 51, 37, 0.05)',
//     '--active-shadow': isDark ? '0 10px 25px rgba(0,0,0,0.3)' : '0 10px 25px rgba(16, 185, 129, 0.05)'
//   };

//   const faqs = [
//     {
//       question: "How does the Instant SOS button work?",
//       answer: "When you press the SOS button, RescueHer instantly captures your background telemetry (live GPS coordinates) and triggers an encrypted data packet bypass. This simultaneously sends emergency alerts to your pre-configured Guardian Nodes without any intermediate server processing delay."
//     },
//     {
//       question: "Will RescueHer track my location all the time?",
//       answer: "Absolutely not. We believe in total data privacy. Your location parameters are only processed locally inside your active session window when you explicitly engage a security tracking layer or trigger an SOS signal."
//     },
//     {
//       question: "What is a Guardian Node?",
//       answer: "A Guardian Node is a trusted contact (friend, family, or emergency service endpoint) that you securely configure inside your Security Hub dashboard. They receive instant real-time alerts and live-tracking map vectors whenever you trigger an incident report."
//     },
//     {
//       question: "Does it require a continuous internet connection?",
//       answer: "For real-time map synchronization and instant e-mail/API alerts, an active data stream is ideal. However, the system is designed to compress telemetry data packets tightly so they can pipe through even under weak cellular network signals."
//     },
//     {
//       question: "Are my incident records securely encrypted?",
//       answer: "Yes, fully. All logs, active endpoints, and threat intelligence streams are encrypted with industry-standard AES-256 protocols and guarded by strict JSON Web Token (JWT) layers, making it entirely private to you and authorized peers."
//     }
//   ];

//   return (
//     <div 
//       className="faq-container" 
//       style={{ 
//         ...cssVariables,
//         padding: '140px 6% 40px 6%', 
//         position: 'relative', 
//         minHeight: '100vh', 
//         transition: 'all 0.3s ease', 
//         overflowX: 'hidden' 
//       }}
//     >
      
//       {/* 📱 LOCAL COMPONENT RESPONSIVE STYLES (Optimized with CSS Variables) */}
//       <style>{`
//         .faq-container {
//           box-sizing: border-box;
//           width: 100%;
//           display: flex;
//           flex-direction: column;
//         }
//         .faq-container *, .faq-container *::before, .faq-container *::after {
//           box-sizing: border-box;
//         }
//         .support-card {
//           background: var(--card-bg);
//           border: 1px solid var(--card-border);
//           border-radius: 24px;
//           padding: 32px;
//           display: flex;
//           flex-direction: column;
//           align-items: flex-start;
//           text-align: left;
//           transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
//           cursor: pointer;
//         }
//         .support-card:hover {
//           transform: translateY(-5px);
//           box-shadow: var(--hover-shadow);
//           border-color: #10b981;
//         }
//         .faq-item-row {
//           transition: border-color 0.3s ease, box-shadow 0.3s ease;
//         }
//         .faq-item-row:hover {
//           border-color: #10b981 !important;
//         }
//         .br-desktop {
//           display: block;
//         }
//         .footer-link {
//           text-decoration: none;
//           transition: color 0.2s ease;
//         }
//         .footer-link:hover {
//           color: #10b981 !important;
//         }

//         /* Tablet & Mobile Screens Viewport */
//         @media (max-width: 768px) {
//           .faq-container {
//             padding: 120px 20px 30px 20px !important;
//           }
//           .faq-header-wrapper {
//             margin-bottom: 40px !important;
//             gap: 20px !important;
//             flex-direction: column !important;
//             align-items: flex-start !important;
//           }
//           .faq-main-title {
//             font-size: 30px !important;
//             line-height: 1.25 !important;
//           }
//           .br-desktop {
//             display: none !important;
//           }
//           .faq-emblem {
//             width: 70px !important;
//             height: 70px !important;
//             font-size: 28px !important;
//             border-radius: 16px !important;
//             align-self: flex-start !important;
//           }
//           .support-grid {
//             grid-template-columns: 1fr !important;
//             gap: 16px !important;
//             margin-bottom: 40px !important;
//           }
//           .support-card {
//             padding: 20px !important;
//           }
//           .faq-section-title {
//             font-size: 20px !important;
//             margin-bottom: 20px !important;
//           }
//           .faq-list-wrapper {
//             gap: 12px !important;
//             width: 100% !important;
//             margin-bottom: 60px !important;
//           }
//           .faq-item-row {
//             padding: 16px 18px !important;
//           }
//           .faq-question-text {
//             font-size: 14.5px !important;
//           }
          
//           /* Responsive Footer Modifications */
//           .faq-footer {
//             flex-direction: column !important;
//             align-items: flex-start !important;
//             gap: 20px !important;
//             margin-top: 50px !important;
//             padding-top: 24px !important;
//           }
//           .faq-footer-links {
//             justify-content: flex-start !important;
//             gap: 16px !important;
//             width: 100%;
//           }
//         }

//         /* Small Portrait Smartphones */
//         @media (max-width: 480px) {
//           .faq-container {
//             padding: 110px 16px 24px 16px !important;
//           }
//           .faq-main-title {
//             font-size: 24px !important;
//           }
//           .faq-footer-links {
//             flex-direction: column !important;
//             gap: 10px !important;
//           }
//         }
//       `}</style>
      
//       {/* BACKGROUND MESH GLOW */}
//       <div style={{
//         position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px',
//         background: `radial-gradient(circle, ${colors.meshColor} 0%, transparent 70%)`, pointerEvents: 'none'
//       }}></div>

//       {/* 🚀 HEADER WITH FLEX LAYOUT & VISUAL EMBLEM */}
//       <div className="faq-header-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', marginBottom: '60px', flexWrap: 'wrap' }}>
//         <div style={{ maxWidth: '650px', textAlign: 'left' }}>
//           <span style={{ textTransform: 'uppercase', fontSize: '11px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>SUPPORT PLATFORM</span>
//           <h1 className="faq-main-title" style={{ fontSize: '44px', fontWeight: '800', color: 'var(--primary-text)', letterSpacing: '-1.5px', margin: '0 0 16px 0', lineHeight: '1.2', transition: 'color 0.3s' }}>
//             Frequently Asked <br className="br-desktop" />Questions Matrix
//           </h1>
//           <p style={{ fontSize: '14.5px', color: 'var(--secondary-text)', lineHeight: '1.6', margin: 0 }}>
//             Have questions about security node synchronization, telemetry logging, or system uptime? Explore our technical knowledge layer below.
//           </p>
//         </div>
        
//         {/* RIGHT SIDE ABSTRACT ICON EMBLEM */}
//         <div className="faq-emblem" style={{
//           background: 'var(--emblem-bg)', width: '130px', height: '130px', borderRadius: '32px',
//           display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '56px',
//           boxShadow: isDark ? 'inset 0 0 20px rgba(16, 185, 129, 0.15)' : 'inset 0 0 20px rgba(16, 185, 129, 0.1)', 
//           border: '1px solid var(--card-border)', transition: 'all 0.3s ease'
//         }}>
//           💡
//         </div>
//       </div>

//       {/* 🌟 VISUAL QUICK HELP CARDS GRID */}
//       <div className="support-grid" style={{
//         display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//         gap: '24px', marginBottom: '70px', width: '100%'
//       }}>
//         {/* CARD 1: EMERGENCY */}
//         <div className="support-card">
//           <div style={{ width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '24px', background: isDark ? '#3b1818' : '#fee2e2', color: '#ef4444' }}>🚨</div>
//           <h3 style={{ fontSize: '19px', fontWeight: '700', color: 'var(--primary-text)', margin: '0 0 10px 0' }}>Emergency SOS</h3>
//           <p style={{ fontSize: '13.5px', color: 'var(--secondary-text)', lineHeight: '1.5', margin: '0 0 20px 0', flexGrow: 1 }}>Live telemetry coordinates transmission & hardware synchronization updates protocol.</p>
//           <span style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>View Protocol →</span>
//         </div>

//         {/* CARD 2: PRIVACY */}
//         <div className="support-card">
//           <div style={{ width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '24px', background: isDark ? '#0b291b' : '#d1fae5', color: '#10b981' }}>🔒</div>
//           <h3 style={{ fontSize: '19px', fontWeight: '700', color: 'var(--primary-text)', margin: '0 0 10px 0' }}>Data Sovereignty</h3>
//           <p style={{ fontSize: '13.5px', color: 'var(--secondary-text)', lineHeight: '1.5', margin: '0 0 20px 0', flexGrow: 1 }}>Understand how local active session memories process core parameters privately.</p>
//           <span style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Privacy Specs →</span>
//         </div>

//         {/* CARD 3: SYSTEM STATUS */}
//         <div className="support-card">
//           <div style={{ width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '24px', background: isDark ? '#0c2333' : '#e0f2fe', color: '#0284c7' }}>🛰️</div>
//           <h3 style={{ fontSize: '19px', fontWeight: '700', color: 'var(--primary-text)', margin: '0 0 10px 0' }}>Telemetry Sync</h3>
//           <p style={{ fontSize: '13.5px', color: 'var(--secondary-text)', lineHeight: '1.5', margin: '0 0 20px 0', flexGrow: 1 }}>Configuring continuous civilian guardian nodes map endpoints smoothly.</p>
//           <span style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Network Health →</span>
//         </div>
//       </div>

//       {/* --- SECTION DIVIDER --- */}
//       <h2 className="faq-section-title" style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-text)', marginBottom: '32px', letterSpacing: '-0.5px', textAlign: 'left', transition: 'color 0.3s' }}>Detailed Core Diagnostics</h2>

//       {/* FAQ ACCORDION LIST */}
//       <div className="faq-list-wrapper" style={{ maxWidth: '850px', display: 'flex', flexDirection: 'column', gap: '16px', margin: '0 auto 80px 0', width: '100%' }}>
//         {faqs.map((faq, index) => {
//           const isOpen = activeIndex === index;
//           return (
//             <div 
//               key={index} 
//               className="faq-item-row"
//               role="button"
//               tabIndex={0}
//               style={{
//                 background: 'var(--card-bg)',
//                 border: isOpen ? '1px solid #10b981' : '1px solid var(--card-border)',
//                 borderRadius: '16px',
//                 padding: '24px',
//                 cursor: 'pointer',
//                 outline: 'none',
//                 transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
//                 boxShadow: isOpen ? 'var(--active-shadow)' : 'none'
//               }}
//               onClick={() => toggleFAQ(index)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   e.preventDefault();
//                   toggleFAQ(index);
//                 }
//               }}
//             >
//               {/* Question Row */}
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
//                 <h3 className="faq-question-text" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-text)', margin: 0, textAlign: 'left', transition: 'color 0.3s', lineHeight: '1.4' }}>
//                   {faq.question}
//                 </h3>
//                 <span style={{ 
//                   fontSize: '20px', 
//                   color: isOpen ? '#10b981' : 'var(--secondary-text)',
//                   transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
//                   transition: 'transform 0.2s ease',
//                   fontWeight: '300',
//                   flexShrink: 0
//                 }}>
//                   ＋
//                 </span>
//               </div>

//               {/* Answer Row (Collapsible) */}
//               <div style={{
//                 maxHeight: isOpen ? '300px' : '0',
//                 opacity: isOpen ? 1 : 0,
//                 overflow: 'hidden',
//                 transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
//                 marginTop: isOpen ? '16px' : '0'
//               }}>
//                 <p style={{ fontSize: '14px', color: 'var(--secondary-text)', lineHeight: '1.6', margin: 0, paddingTop: '12px', borderTop: '1px solid var(--divider-color)', textAlign: 'left', transition: 'all 0.3s' }}>
//                   {faq.answer}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* 👣 INTEGRATED RESPONSIVE FOOTER MODULE */}
//       <footer className="faq-footer" style={{
//         marginTop: 'auto',
//         paddingTop: '32px',
//         borderTop: '1px solid var(--divider-color)',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         flexWrap: 'wrap',
//         gap: '24px',
//         width: '100%',
//         transition: 'border-color 0.3s ease'
//       }}>
//         <div style={{ textAlign: 'left' }}>
//           <span style={{ fontSize: '16px', fontWeight: '800', color: '#10b981', letterSpacing: '-0.5px' }}>RescueHer</span>
//           <p style={{ fontSize: '13px', color: 'var(--secondary-text)', margin: '4px 0 0 0', lineHeight: '1.4' }}>
//             &copy; {new Date().getFullYear()} Secure Matrix Network. All rights reserved.
//           </p>
//         </div>
        
//         <div className="faq-footer-links" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
//           <a href="#privacy" className="footer-link" style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>Privacy Policy</a>
//           <a href="#terms" className="footer-link" style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>Terms of Service</a>
//           <a href="#contact" className="footer-link" style={{ fontSize: '13px', color: 'var(--secondary-text)' }}>Contact Hub</a>
//         </div>
//       </footer>

//     </div>
//   );
// }

// export default FAQPage;









// // src/pages/FAQPage.jsx
// import React, { useState } from 'react';

// function FAQPage({ theme }) {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFAQ = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   const isDark = theme === 'dark';

//   // Dynamic colors based on theme
//   const colors = {
//     primaryText: isDark ? '#f8fafc' : '#093325',
//     secondaryText: isDark ? '#a2b7b0' : '#5c726a',
//     cardBg: isDark ? '#111a16' : '#ffffff',
//     cardBorder: isDark ? 'rgba(16, 185, 129, 0.25)' : '#e8ece9',
//     emblemBg: isDark ? '#16231f' : '#eef5f2',
//     dividerColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#f0f4f1',
//     meshColor: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.04)'
//   };

//   // Centralized CSS variables to feed into our independent stylesheet
//   const cssVariables = {
//     '--bg-color': isDark ? '#0b1310' : '#f9fbf9', // Makes container standalone
//     '--card-bg': colors.cardBg,
//     '--card-border': colors.cardBorder,
//     '--primary-text': colors.primaryText,
//     '--secondary-text': colors.secondaryText,
//     '--emblem-bg': colors.emblemBg,
//     '--divider-color': colors.dividerColor,
//     '--mesh-color': colors.meshColor,
//     '--emblem-shadow': isDark ? 'inset 0 0 20px rgba(16, 185, 129, 0.15)' : 'inset 0 0 20px rgba(16, 185, 129, 0.1)',
//     '--hover-shadow': isDark ? '0 12px 30px rgba(0,0,0,0.4)' : '0 12px 30px rgba(9, 51, 37, 0.05)',
//     '--active-shadow': isDark ? '0 10px 25px rgba(0,0,0,0.3)' : '0 10px 25px rgba(16, 185, 129, 0.05)'
//   };

//   const faqs = [
//     {
//       question: "How does the Instant SOS button work?",
//       answer: "When you press the SOS button, RescueHer instantly captures your background telemetry (live GPS coordinates) and triggers an encrypted data packet bypass. This simultaneously sends emergency alerts to your pre-configured Guardian Nodes without any intermediate server processing delay."
//     },
//     {
//       question: "Will RescueHer track my location all the time?",
//       answer: "Absolutely not. We believe in total data privacy. Your location parameters are only processed locally inside your active session window when you explicitly engage a security tracking layer or trigger an SOS signal."
//     },
//     {
//       question: "What is a Guardian Node?",
//       answer: "A Guardian Node is a trusted contact (friend, family, or emergency service endpoint) that you securely configure inside your Security Hub dashboard. They receive instant real-time alerts and live-tracking map vectors whenever you trigger an incident report."
//     },
//     {
//       question: "Does it require a continuous internet connection?",
//       answer: "For real-time map synchronization and instant e-mail/API alerts, an active data stream is ideal. However, the system is designed to compress telemetry data packets tightly so they can pipe through even under weak cellular network signals."
//     },
//     {
//       question: "Are my incident records securely encrypted?",
//       answer: "Yes, fully. All logs, active endpoints, and threat intelligence streams are encrypted with industry-standard AES-256 protocols and guarded by strict JSON Web Token (JWT) layers, making it entirely private to you and authorized peers."
//     }
//   ];

//   return (
//     <div className="faq-container" style={cssVariables}>
      
//       {/* 📱 100% INDEPENDENT LOCAL RESPONSIVE STYLESHEET */}
//       <style>{`
//         .faq-container {
//           box-sizing: border-box;
//           width: 100%;
//           min-height: 100vh;
//           position: relative;
//           overflow-x: hidden;
//           background-color: var(--bg-color);
//           color: var(--primary-text);
//           padding: 140px 6% 40px 6%;
//           transition: background-color 0.3s ease, color 0.3s ease;
//           display: flex;
//           flex-direction: column;
//         }
//         .faq-container *, .faq-container *::before, .faq-container *::after {
//           box-sizing: border-box;
//         }
//         .faq-bg-glow {
//           position: absolute; 
//           top: -10%; 
//           right: -10%; 
//           width: 400px; 
//           height: 400px;
//           background: radial-gradient(circle, var(--mesh-color) 0%, transparent 70%); 
//           pointer-events: none;
//         }
//         .faq-header-wrapper {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 40px;
//           margin-bottom: 60px;
//           width: 100%;
//         }
//         .faq-title-area {
//           max-width: 650px;
//           text-align: left;
//         }
//         .faq-subtitle {
//           text-transform: uppercase;
//           font-size: 11px;
//           fontWeight: 700;
//           color: #10b981;
//           letter-spacing: 2px;
//           display: block;
//           margin-bottom: 12px;
//         }
//         .faq-main-title {
//           font-size: 44px;
//           font-weight: 800;
//           color: var(--primary-text);
//           letter-spacing: -1.5px;
//           margin: 0 0 16px 0;
//           line-height: 1.2;
//           transition: color 0.3s;
//         }
//         .faq-description {
//           font-size: 14.5px;
//           color: var(--secondary-text);
//           line-height: 1.6;
//           margin: 0;
//         }
//         .faq-emblem {
//           background: var(--emblem-bg);
//           width: 130px;
//           height: 130px;
//           border-radius: 32px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 56px;
//           box-shadow: var(--emblem-shadow);
//           border: 1px solid var(--card-border);
//           transition: all 0.3s ease;
//           flex-shrink: 0;
//         }
//         .support-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//           gap: 24px;
//           margin-bottom: 70px;
//           width: 100%;
//         }
//         .support-card {
//           background: var(--card-bg);
//           border: 1px solid var(--card-border);
//           border-radius: 24px;
//           padding: 32px;
//           display: flex;
//           flex-direction: column;
//           align-items: flex-start;
//           text-align: left;
//           transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
//           cursor: pointer;
//         }
//         .support-card:hover {
//           transform: translateY(-5px);
//           box-shadow: var(--hover-shadow);
//           border-color: #10b981;
//         }
//         .support-icon-wrapper {
//           width: 48px;
//           height: 48px;
//           border-radius: 16px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 20px;
//           margin-bottom: 24px;
//         }
//         .support-card-title {
//           font-size: 19px;
//           font-weight: 700;
//           color: var(--primary-text);
//           margin: 0 0 10px 0;
//         }
//         .support-card-desc {
//           font-size: 13.5px;
//           color: var(--secondary-text);
//           line-height: 1.5;
//           margin: 0 0 20px 0;
//           flex-grow: 1;
//         }
//         .support-card-link {
//           font-size: 12px;
//           font-weight: 700;
//           color: #10b981;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }
//         .faq-section-title {
//           font-size: 24px;
//           font-weight: 800;
//           color: var(--primary-text);
//           margin-bottom: 32px;
//           letter-spacing: -0.5px;
//           text-align: left;
//           transition: color 0.3s;
//         }
//         .faq-list-wrapper {
//           max-width: 850px;
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           margin: 0 auto 80px 0;
//           width: 100%;
//         }
//         .faq-item-row {
//           background: var(--card-bg);
//           border: 1px solid var(--card-border);
//           border-radius: 16px;
//           padding: 24px;
//           cursor: pointer;
//           outline: none;
//           transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
//         }
//         .faq-item-row:hover {
//           border-color: #10b981;
//         }
//         .faq-item-row.is-open {
//           border-color: #10b981;
//           box-shadow: var(--active-shadow);
//         }
//         .faq-question-row {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           gap: 20px;
//         }
//         .faq-question-text {
//           font-size: 16px;
//           font-weight: 700;
//           color: var(--primary-text);
//           margin: 0;
//           text-align: left;
//           transition: color 0.3s;
//           line-height: 1.4;
//         }
//         .faq-icon-indicator {
//           font-size: 20px;
//           color: var(--secondary-text);
//           transition: transform 0.2s ease, color 0.2s ease;
//           font-weight: 300;
//           flex-shrink: 0;
//         }
//         .faq-item-row.is-open .faq-icon-indicator {
//           color: #10b981;
//           transform: rotate(45deg);
//         }
//         .faq-answer-container {
//           max-height: 0;
//           opacity: 0;
//           overflow: hidden;
//           transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
//           margin-top: 0;
//         }
//         .faq-item-row.is-open .faq-answer-container {
//           max-height: 300px;
//           opacity: 1;
//           margin-top: 16px;
//         }
//         .faq-answer-text {
//           font-size: 14px;
//           color: var(--secondary-text);
//           line-height: 1.6;
//           margin: 0;
//           padding-top: 12px;
//           border-top: 1px solid var(--divider-color);
//           text-align: left;
//           transition: all 0.3s;
//         }
//         .faq-footer {
//           margin-top: auto;
//           padding-top: 32px;
//           border-top: 1px solid var(--divider-color);
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           width: 100%;
//           transition: border-color 0.3s ease;
//         }
//         .faq-footer-left {
//           text-align: left;
//         }
//         .faq-footer-brand {
//           font-size: 16px;
//           font-weight: 800;
//           color: #10b981;
//           letter-spacing: -0.5px;
//         }
//         .faq-footer-copyright {
//           font-size: 13px;
//           color: var(--secondary-text);
//           margin: 4px 0 0 0;
//           line-height: 1.4;
//         }
//         .faq-footer-links {
//           display: flex;
//           gap: 24px;
//           align-items: center;
//           justify-content: flex-end;
//         }
//         .footer-link {
//           text-decoration: none;
//           font-size: 13px;
//           color: var(--secondary-text);
//           transition: color 0.2s ease;
//         }
//         .footer-link:hover {
//           color: #10b981;
//         }
//         .br-desktop {
//           display: block;
//         }

//         /* 📱 Tablet & Mobile Screens Viewport Breakdown */
//         @media (max-width: 768px) {
//           .faq-container {
//             padding: 100px 20px 30px 20px;
//           }
//           .faq-header-wrapper {
//             margin-bottom: 32px;
//             gap: 24px;
//             flex-direction: column;
//             align-items: flex-start;
//           }
//           .faq-main-title {
//             font-size: 28px;
//             line-height: 1.25;
//           }
//           .br-desktop {
//             display: none;
//           }
//           .faq-emblem {
//             width: 64px;
//             height: 64px;
//             font-size: 24px;
//             border-radius: 16px;
//             align-self: flex-start;
//           }
//           .support-grid {
//             grid-template-columns: 1fr;
//             gap: 16px;
//             margin-bottom: 40px;
//           }
//           .support-card {
//             padding: 20px;
//             border-radius: 18px;
//           }
//           .support-icon-wrapper {
//             margin-bottom: 16px;
//           }
//           .faq-section-title {
//             font-size: 20px;
//             margin-bottom: 20px;
//           }
//           .faq-list-wrapper {
//             gap: 12px;
//             margin-bottom: 50px;
//           }
//           .faq-item-row {
//             padding: 16px;
//             border-radius: 12px;
//           }
//           .faq-question-text {
//             font-size: 14.5px;
//           }
//           .faq-footer {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 20px;
//             padding-top: 20px;
//           }
//           .faq-footer-links {
//             justify-content: flex-start;
//             gap: 16px;
//             width: 100%;
//           }
//         }

//         /* 📱 Small Portrait Smartphones */
//         @media (max-width: 480px) {
//           .faq-container {
//             padding: 90px 16px 24px 16px;
//           }
//           .faq-main-title {
//             font-size: 24px;
//           }
//           .faq-footer-links {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 12px;
//           }
//         }
//       `}</style>
      
//       {/* BACKGROUND MESH GLOW */}
//       <div className="faq-bg-glow"></div>

//       {/* 🚀 HEADER WITH FLEX LAYOUT & VISUAL EMBLEM */}
//       <div className="faq-header-wrapper">
//         <div className="faq-title-area">
//           <span className="faq-subtitle">SUPPORT PLATFORM</span>
//           <h1 className="faq-main-title">
//             Frequently Asked <br className="br-desktop" />Questions Matrix
//           </h1>
//           <p className="faq-description">
//             Have questions about security node synchronization, telemetry logging, or system uptime? Explore our technical knowledge layer below.
//           </p>
//         </div>
        
//         {/* RIGHT SIDE ABSTRACT ICON EMBLEM */}
//         <div className="faq-emblem">💡</div>
//       </div>

//       {/* 🌟 VISUAL QUICK HELP CARDS GRID */}
//       <div className="support-grid">
//         {/* CARD 1: EMERGENCY */}
//         <div className="support-card">
//           <div className="support-icon-wrapper" style={{ background: isDark ? '#3b1818' : '#fee2e2', color: '#ef4444' }}>🚨</div>
//           <h3 className="support-card-title">Emergency SOS</h3>
//           <p className="support-card-desc">Live telemetry coordinates transmission & hardware synchronization updates protocol.</p>
//           <span className="support-card-link">View Protocol →</span>
//         </div>

//         {/* CARD 2: PRIVACY */}
//         <div className="support-card">
//           <div className="support-icon-wrapper" style={{ background: isDark ? '#0b291b' : '#d1fae5', color: '#10b981' }}>🔒</div>
//           <h3 className="support-card-title">Data Sovereignty</h3>
//           <p className="support-card-desc">Understand how local active session memories process core parameters privately.</p>
//           <span className="support-card-link">Privacy Specs →</span>
//         </div>

//         {/* CARD 3: SYSTEM STATUS */}
//         <div className="support-card">
//           <div className="support-icon-wrapper" style={{ background: isDark ? '#0c2333' : '#e0f2fe', color: '#0284c7' }}>🛰️</div>
//           <h3 className="support-card-title">Telemetry Sync</h3>
//           <p className="support-card-desc">Configuring continuous civilian guardian nodes map endpoints smoothly.</p>
//           <span className="support-card-link">Network Health →</span>
//         </div>
//       </div>

//       {/* --- SECTION DIVIDER --- */}
//       <h2 className="faq-section-title">Detailed Core Diagnostics</h2>

//       {/* FAQ ACCORDION LIST */}
//       <div className="faq-list-wrapper">
//         {faqs.map((faq, index) => {
//           const isOpen = activeIndex === index;
//           return (
//             <div 
//               key={index} 
//               className={`faq-item-row ${isOpen ? 'is-open' : ''}`}
//               role="button"
//               tabIndex={0}
//               onClick={() => toggleFAQ(index)}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   e.preventDefault();
//                   toggleFAQ(index);
//                 }
//               }}
//             >
//               {/* Question Row */}
//               <div className="faq-question-row">
//                 <h3 className="faq-question-text">{faq.question}</h3>
//                 <span className="faq-icon-indicator">＋</span>
//               </div>

//               {/* Answer Row (Collapsible) */}
//               <div className="faq-answer-container">
//                 <p className="faq-answer-text">{faq.answer}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* 👣 INTEGRATED RESPONSIVE FOOTER MODULE */}
//       <footer className="faq-footer">
//         <div className="faq-footer-left">
//           <span className="faq-footer-brand">RescueHer</span>
//           <p className="faq-footer-copyright">
//             &copy; {new Date().getFullYear()} Secure Matrix Network. All rights reserved.
//           </p>
//         </div>
        
//         <div className="faq-footer-links">
//           <a href="#privacy" className="footer-link">Privacy Policy</a>
//           <a href="#terms" className="footer-link">Terms of Service</a>
//           <a href="#contact" className="footer-link">Contact Hub</a>
//         </div>
//       </footer>

//     </div>
//   );
// }

// export default FAQPage;












// src/pages/FAQPage.jsx
import React, { useState } from 'react';

function FAQPage({ theme }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const isDark = theme === 'dark';

  // Dynamic colors based on theme
  const colors = {
    primaryText: isDark ? '#f8fafc' : '#093325',
    secondaryText: isDark ? '#a2b7b0' : '#5c726a',
    cardBg: isDark ? '#111a16' : '#ffffff',
    cardBorder: isDark ? 'rgba(16, 185, 129, 0.25)' : '#e8ece9',
    emblemBg: isDark ? '#16231f' : '#eef5f2',
    dividerColor: isDark ? 'rgba(16, 185, 129, 0.2)' : '#f0f4f1',
    meshColor: isDark ? 'rgba(16, 185, 129, 0.08)' : 'rgba(16, 185, 129, 0.04)'
  };

  // Centralized CSS variables to feed into our independent stylesheet
  const cssVariables = {
    '--bg-color': isDark ? '#0b1310' : '#f9fbf9', 
    '--card-bg': colors.cardBg,
    '--card-border': colors.cardBorder,
    '--primary-text': colors.primaryText,
    '--secondary-text': colors.secondaryText,
    '--emblem-bg': colors.emblemBg,
    '--divider-color': colors.dividerColor,
    '--mesh-color': colors.meshColor,
    '--emblem-shadow': isDark ? 'inset 0 0 20px rgba(16, 185, 129, 0.15)' : 'inset 0 0 20px rgba(16, 185, 129, 0.1)',
    '--hover-shadow': isDark ? '0 12px 30px rgba(0,0,0,0.4)' : '0 12px 30px rgba(9, 51, 37, 0.05)',
    '--active-shadow': isDark ? '0 10px 25px rgba(0,0,0,0.3)' : '0 10px 25px rgba(16, 185, 129, 0.05)'
  };

  const faqs = [
    {
      question: "How does the Instant SOS button work?",
      answer: "When you press the SOS button, RescueHer instantly captures your background telemetry (live GPS coordinates) and triggers an encrypted data packet bypass. This simultaneously sends emergency alerts to your pre-configured Guardian Nodes without any intermediate server processing delay."
    },
    {
      question: "Will RescueHer track my location all the time?",
      answer: "Absolutely not. We believe in total data privacy. Your location parameters are only processed locally inside your active session window when you explicitly engage a security tracking layer or trigger an SOS signal."
    },
    {
      question: "What is a Guardian Node?",
      answer: "A Guardian Node is a trusted contact (friend, family, or emergency service endpoint) that you securely configure inside your Security Hub dashboard. They receive instant real-time alerts and live-tracking map vectors whenever you trigger an incident report."
    },
    {
      question: "Does it require a continuous internet connection?",
      answer: "For real-time map synchronization and instant e-mail/API alerts, an active data stream is ideal. However, the system is designed to compress telemetry data packets tightly so they can pipe through even under weak cellular network signals."
    },
    {
      question: "Are my incident records securely encrypted?",
      answer: "Yes, fully. All logs, active endpoints, and threat intelligence streams are encrypted with industry-standard AES-256 protocols and guarded by strict JSON Web Token (JWT) layers, making it entirely private to you and authorized peers."
    }
  ];

  return (
    <div className="faq-container" style={cssVariables}>
      
      {/* 📱 100% INDEPENDENT LOCAL RESPONSIVE STYLESHEET */}
      <style>{`
        .faq-container {
          box-sizing: border-box;
          width: 100%;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
          background-color: var(--bg-color);
          color: var(--primary-text);
          padding: 140px 6% 40px 6%;
          transition: background-color 0.3s ease, color 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .faq-container *, .faq-container *::before, .faq-container *::after {
          box-sizing: border-box;
        }
        .faq-bg-glow {
          position: absolute; 
          top: -10%; 
          right: -10%; 
          width: 400px; 
          height: 400px;
          background: radial-gradient(circle, var(--mesh-color) 0%, transparent 70%); 
          pointer-events: none;
        }
        .faq-header-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          margin-bottom: 60px;
          width: 100%;
        }
        .faq-title-area {
          max-width: 650px;
          text-align: left;
        }
        .faq-subtitle {
          text-transform: uppercase;
          font-size: 11px;
          font-weight: 700;
          color: #10b981;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 12px;
        }
        .faq-main-title {
          font-size: 44px;
          font-weight: 800;
          color: var(--primary-text);
          letter-spacing: -1.5px;
          margin: 0 0 16px 0;
          line-height: 1.2;
          transition: color 0.3s;
        }
        .faq-description {
          font-size: 14.5px;
          color: var(--secondary-text);
          line-height: 1.6;
          margin: 0;
        }
        .faq-emblem {
          background: var(--emblem-bg);
          width: 130px;
          height: 130px;
          border-radius: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 56px;
          box-shadow: var(--emblem-shadow);
          border: 1px solid var(--card-border);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .support-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 70px;
          width: 100%;
        }
        .support-card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 24px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
        }
        .support-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--hover-shadow);
          border-color: #10b981;
        }
        .support-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-bottom: 24px;
        }
        .support-card-title {
          font-size: 19px;
          font-weight: 700;
          color: var(--primary-text);
          margin: 0 0 10px 0;
        }
        .support-card-desc {
          font-size: 13.5px;
          color: var(--secondary-text);
          line-height: 1.5;
          margin: 0 0 20px 0;
          flex-grow: 1;
        }
        .support-card-link {
          font-size: 12px;
          font-weight: 700;
          color: #10b981;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .faq-section-title {
          font-size: 24px;
          font-weight: 800;
          color: var(--primary-text);
          margin-bottom: 32px;
          letter-spacing: -0.5px;
          text-align: left;
          transition: color 0.3s;
        }
        .faq-list-wrapper {
          max-width: 850px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 0 auto 40px 0;
          width: 100%;
        }
        .faq-item-row {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          padding: 24px;
          cursor: pointer;
          outline: none;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .faq-item-row:hover {
          border-color: #10b981;
        }
        .faq-item-row.is-open {
          border-color: #10b981;
          box-shadow: var(--active-shadow);
        }
        .faq-question-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
        }
        .faq-question-text {
          font-size: 16px;
          font-weight: 700;
          color: var(--primary-text);
          margin: 0;
          text-align: left;
          transition: color 0.3s;
          line-height: 1.4;
        }
        .faq-icon-indicator {
          font-size: 20px;
          color: var(--secondary-text);
          transition: transform 0.2s ease, color 0.2s ease;
          font-weight: 300;
          flex-shrink: 0;
        }
        .faq-item-row.is-open .faq-icon-indicator {
          color: #10b981;
          transform: rotate(45deg);
        }
        .faq-answer-container {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          margin-top: 0;
        }
        .faq-item-row.is-open .faq-answer-container {
          max-height: 300px;
          opacity: 1;
          margin-top: 16px;
        }
        .faq-answer-text {
          font-size: 14px;
          color: var(--secondary-text);
          line-height: 1.6;
          margin: 0;
          padding-top: 12px;
          border-top: 1px solid var(--divider-color);
          text-align: left;
          transition: all 0.3s;
        }
        .br-desktop {
          display: block;
        }

        /* 📱 Tablet & Mobile Screens Viewport Breakdown */
        @media (max-width: 768px) {
          .faq-container {
            padding: 100px 20px 30px 20px;
          }
          .faq-header-wrapper {
            margin-bottom: 32px;
            gap: 24px;
            flex-direction: column;
            align-items: flex-start;
          }
          .faq-main-title {
            font-size: 28px;
            line-height: 1.25;
          }
          .br-desktop {
            display: none;
          }
          .faq-emblem {
            width: 64px;
            height: 64px;
            font-size: 24px;
            border-radius: 16px;
            align-self: flex-start;
          }
          .support-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 40px;
          }
          .support-card {
            padding: 20px;
            border-radius: 18px;
          }
          .support-icon-wrapper {
            margin-bottom: 16px;
          }
          .faq-section-title {
            font-size: 20px;
            margin-bottom: 20px;
          }
          .faq-list-wrapper {
            gap: 12px;
            margin-bottom: 30px;
          }
          .faq-item-row {
            padding: 16px;
            border-radius: 12px;
          }
          .faq-question-text {
            font-size: 14.5px;
          }
        }

        /* 📱 Small Portrait Smartphones */
        @media (max-width: 480px) {
          .faq-container {
            padding: 90px 16px 24px 16px;
          }
          .faq-main-title {
            font-size: 24px;
          }
        }
      `}</style>
      
      {/* BACKGROUND MESH GLOW */}
      <div className="faq-bg-glow"></div>

      {/* 🚀 HEADER WITH FLEX LAYOUT & VISUAL EMBLEM */}
      <div className="faq-header-wrapper">
        <div className="faq-title-area">
          <span className="faq-subtitle">SUPPORT PLATFORM</span>
          <h1 className="faq-main-title">
            Frequently Asked <br className="br-desktop" />Questions Matrix
          </h1>
          <p className="faq-description">
            Have questions about security node synchronization, telemetry logging, or system uptime? Explore our technical knowledge layer below.
          </p>
        </div>
        
        {/* RIGHT SIDE ABSTRACT ICON EMBLEM */}
        <div className="faq-emblem">💡</div>
      </div>

      {/* 🌟 VISUAL QUICK HELP CARDS GRID */}
      <div className="support-grid">
        {/* CARD 1: EMERGENCY */}
        <div className="support-card">
          <div className="support-icon-wrapper" style={{ background: isDark ? '#3b1818' : '#fee2e2', color: '#ef4444' }}>🚨</div>
          <h3 className="support-card-title">Emergency SOS</h3>
          <p className="support-card-desc">Live telemetry coordinates transmission & hardware synchronization updates protocol.</p>
          <span className="support-card-link">View Protocol →</span>
        </div>

        {/* CARD 2: PRIVACY */}
        <div className="support-card">
          <div className="support-icon-wrapper" style={{ background: isDark ? '#0b291b' : '#d1fae5', color: '#10b981' }}>🔒</div>
          <h3 className="support-card-title">Data Sovereignty</h3>
          <p className="support-card-desc">Understand how local active session memories process core parameters privately.</p>
          <span className="support-card-link">Privacy Specs →</span>
        </div>

        {/* CARD 3: SYSTEM STATUS */}
        <div className="support-card">
          <div className="support-icon-wrapper" style={{ background: isDark ? '#0c2333' : '#e0f2fe', color: '#0284c7' }}>🛰️</div>
          <h3 className="support-card-title">Telemetry Sync</h3>
          <p className="support-card-desc">Configuring continuous civilian guardian nodes map endpoints smoothly.</p>
          <span className="support-card-link">Network Health →</span>
        </div>
      </div>

      {/* --- SECTION DIVIDER --- */}
      <h2 className="faq-section-title">Detailed Core Diagnostics</h2>

      {/* FAQ ACCORDION LIST */}
      <div className="faq-list-wrapper">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index} 
              className={`faq-item-row ${isOpen ? 'is-open' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => toggleFAQ(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleFAQ(index);
                }
              }}
            >
              {/* Question Row */}
              <div className="faq-question-row">
                <h3 className="faq-question-text">{faq.question}</h3>
                <span className="faq-icon-indicator">＋</span>
              </div>

              {/* Answer Row (Collapsible) */}
              <div className="faq-answer-container">
                <p className="faq-answer-text">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default FAQPage;