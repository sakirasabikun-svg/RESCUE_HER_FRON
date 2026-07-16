
// // src/pages/FeaturesPage.jsx
// import React from 'react';

// function FeaturesPage() {
//   // আনস্প্ল্যাশ থেকে হাই-কোয়ালিটি সেফটি ও টেকনোলজি রিলেটেড ইমেজ ইউআরএল
//   const images = {
//     sos: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80", // Security/Emergency Tech
//     tracking: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80", // Cyber/Map Data Grid
//     logging: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"   // Encryption/Digital Log
//   };

//   return (
//     <div style={{ color: '#093325', paddingBottom: '40px' }}>
      
//       {/* 🎯 HERO TITLE */}
//       <section style={{ padding: '60px 6% 40px 6%', textAlign: 'center' }}>
//         <span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>SYSTEM ARCHITECTURE</span>
//         <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#093325', letterSpacing: '-1.5px', margin: '0 auto 20px auto', maxWidth: '600px', lineHeight: '1.2' }}>
//           Advanced Security Features Engineered For You
//         </h1>
//         <p style={{ fontSize: '16px', color: '#5c726a', maxWidth: '540px', margin: '0 auto', lineHeight: '1.6' }}>
//           Explore the core defensive modules operating seamlessly inside the RescueHer secure matrix framework.
//         </p>
//       </section>

//       {/* 📦 DETAILED FEATURES SECTION */}
//       <section style={{ padding: '40px 6% 60px 6%', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
//         {/* FEATURE 1: INSTANT SOS */}
//         <div style={featureRowStyle}>
//           <div style={featureContentStyle}>
//             <div style={badgeStyle}>MODULE 01</div>
//             <h2 style={featureTitleStyle}>Instant SOS Broadcast Node</h2>
//             <p style={featureDescStyle}>
//               Trigger an immediate, high-priority alarm with a single interaction. The system automatically bypasses browser background delays to process telemetry packets, instantly fetching high-accuracy GPS grids.
//             </p>
//             <ul style={featureListStyle}>
//               <li>⚡ One-tap critical hardware routing layer</li>
//               <li>✉️ Simultaneous multi-peer emergency email pipeline</li>
//               <li>🔒 Securely managed token authentication state</li>
//             </ul>
//           </div>
//           <div style={featureImageWrapper}>
//             <img src={images.sos} alt="Instant SOS Node" style={imageStyle} />
//           </div>
//         </div>

//         {/* FEATURE 2: LIVE TRACK GRID (REVERSED LAYOUT) */}
//         <div style={{ ...featureRowStyle, flexDirection: 'row-reverse' }}>
//           <div style={featureContentStyle}>
//             <div style={{ ...badgeStyle, background: '#e0f2fe', color: '#0284c7' }}>MODULE 02</div>
//             <h2 style={featureTitleStyle}>Live Telemetry Tracking Grid</h2>
//             <p style={featureDescStyle}>
//               Keep your trusted guardians updated with active location parameters. Leveraging integrated digital cartography layers, the application streams accurate coordinates without heavy network resource draining.
//             </p>
//             <ul style={featureListStyle}>
//               <li>📍 Precision coordinates gathering loop</li>
//               <li>🗺️ Clean, accessible OpenStreetMap or Map link outputs</li>
//               <li>🔋 Optimized client-to-server data synchronization</li>
//             </ul>
//           </div>
//           <div style={featureImageWrapper}>
//             <img src={images.tracking} alt="Live Track Grid" style={imageStyle} />
//           </div>
//         </div>

//         {/* FEATURE 3: HAZARD LOGGING */}
//         <div style={featureRowStyle}>
//           <div style={featureContentStyle}>
//             <div style={{ ...badgeStyle, background: '#f4f6f4', color: '#093325' }}>MODULE 03</div>
//             <h2 style={featureTitleStyle}>Incident History & Hazard Logs</h2>
//             <p style={featureDescStyle}>
//               Every active defense trigger writes a secure, permanent historical log into the decentralized relational system layer. This provides real-time event logging, helpful for threat mapping and legal audit compilation.
//             </p>
//             <ul style={featureListStyle}>
//               <li>📝 Automatic database incident logging pipelines</li>
//               <li>📊 Structured severity mapping (Critical, Alert, Normal)</li>
//               <li>🛡️ Encrypted user identifiers ensuring high data privacy</li>
//             </ul>
//           </div>
//           <div style={featureImageWrapper}>
//             <img src={images.logging} alt="Intel Hazard Logging" style={imageStyle} />
//           </div>
//         </div>

//       </section>
//     </div>
//   );
// }

// // 🎨 INLINE STYLES FOR FEATURES PAGE
// const featureRowStyle = {
//   display: 'grid',
//   gridTemplateColumns: '1fr 1fr',
//   gap: '60px',
//   alignItems: 'center'
// };

// const featureContentStyle = {
//   textAlign: 'left'
// };

// const badgeStyle = {
//   padding: '6px 14px',
//   background: '#fee2e2',
//   color: '#ef4444',
//   borderRadius: '50px',
//   fontSize: '11px',
//   fontWeight: '700',
//   display: 'inline-block',
//   marginBottom: '20px',
//   letterSpacing: '0.5px'
// };

// const featureTitleStyle = {
//   fontSize: '32px',
//   fontWeight: '800',
//   color: '#093325',
//   margin: '0 0 18px 0',
//   letterSpacing: '-0.8px'
// };

// const featureDescStyle = {
//   fontSize: '15px',
//   color: '#5c726a',
//   lineHeight: '1.65',
//   margin: '0 0 24px 0'
// };

// const featureListStyle = {
//   paddingLeft: '20px',
//   margin: 0,
//   fontSize: '14.5px',
//   color: '#093325',
//   lineHeight: '2',
//   fontWeight: '600',
//   listStyleType: 'square'
// };

// const featureImageWrapper = {
//   width: '100%',
//   height: '340px',
//   borderRadius: '24px',
//   overflow: 'hidden',
//   boxShadow: '0 12px 30px rgba(9, 51, 37, 0.06)'
// };

// const imageStyle = {
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover'
// };

// export default FeaturesPage;







// // src/pages/FeaturesPage.jsx
// import React, { useState, useEffect } from 'react';

// function FeaturesPage() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => setIsMobile(window.innerWidth < 768);
//     handleResize(); // Initialize on mount
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const images = {
//     sos: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80",
//     tracking: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80",
//     logging: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
//   };

//   const dynamicRowStyle = (isReversed = false) => ({
//     display: 'flex',
//     flexDirection: isMobile ? 'column' : (isReversed ? 'row-reverse' : 'row'),
//     gap: isMobile ? '30px' : '60px',
//     alignItems: 'center',
//     width: '100%'
//   });

//   return (
//     <div style={{ color: '#093325', paddingBottom: '40px' }}>
      
//       {/* 🎯 HERO TITLE */}
//       <section style={{ padding: '60px 6% 40px 6%', textAlign: 'center' }}>
//         <span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: '700', color: '#10b981', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>SYSTEM ARCHITECTURE</span>
//         <h1 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: '800', color: '#093325', letterSpacing: '-1.5px', margin: '0 auto 20px auto', maxWidth: '600px', lineHeight: '1.2' }}>
//           Advanced Security Features Engineered For You
//         </h1>
//         <p style={{ fontSize: '16px', color: '#5c726a', maxWidth: '540px', margin: '0 auto', lineHeight: '1.6' }}>
//           Explore the core defensive modules operating seamlessly inside the RescueHer secure matrix framework.
//         </p>
//       </section>

//       {/* 📦 DETAILED FEATURES SECTION */}
//       <section style={{ padding: '40px 6% 60px 6%', display: 'flex', flexDirection: 'column', gap: isMobile ? '60px' : '80px' }}>
        
//         {/* FEATURE 1: INSTANT SOS */}
//         <div style={dynamicRowStyle(false)}>
//           <div style={featureContentStyle}>
//             <div style={badgeStyle}>MODULE 01</div>
//             <h2 style={featureTitleStyle}>Instant SOS Broadcast Node</h2>
//             <p style={featureDescStyle}>
//               Trigger an immediate, high-priority alarm with a single interaction. The system automatically bypasses browser background delays to process telemetry packets, instantly fetching high-accuracy GPS grids.
//             </p>
//             <ul style={featureListStyle}>
//               <li>⚡ One-tap critical hardware routing layer</li>
//               <li>✉️ Simultaneous multi-peer emergency email pipeline</li>
//               <li>🔒 Securely managed token authentication state</li>
//             </ul>
//           </div>
//           <div style={featureImageWrapper}>
//             <img src={images.sos} alt="Instant SOS Node" style={imageStyle} />
//           </div>
//         </div>

//         {/* FEATURE 2: LIVE TRACK GRID (CORRECTLY REVERSED VIA FLEXBOX) */}
//         <div style={dynamicRowStyle(true)}>
//           <div style={featureContentStyle}>
//             <div style={{ ...badgeStyle, background: '#e0f2fe', color: '#0284c7' }}>MODULE 02</div>
//             <h2 style={featureTitleStyle}>Live Telemetry Tracking Grid</h2>
//             <p style={featureDescStyle}>
//               Keep your trusted guardians updated with active location parameters. Leveraging integrated digital cartography layers, the application streams accurate coordinates without heavy network resource draining.
//             </p>
//             <ul style={featureListStyle}>
//               <li>📍 Precision coordinates gathering loop</li>
//               <li>🗺️ Clean, accessible OpenStreetMap or Map link outputs</li>
//               <li>🔋 Optimized client-to-server data synchronization</li>
//             </ul>
//           </div>
//           <div style={featureImageWrapper}>
//             <img src={images.tracking} alt="Live Track Grid" style={imageStyle} />
//           </div>
//         </div>

//         {/* FEATURE 3: HAZARD LOGGING */}
//         <div style={dynamicRowStyle(false)}>
//           <div style={featureContentStyle}>
//             <div style={{ ...badgeStyle, background: '#f4f6f4', color: '#093325' }}>MODULE 03</div>
//             <h2 style={featureTitleStyle}>Incident History & Hazard Logs</h2>
//             <p style={featureDescStyle}>
//               Every active defense trigger writes a secure, permanent historical log into the decentralized relational system layer. This provides real-time event logging, helpful for threat mapping and legal audit compilation.
//             </p>
//             <ul style={featureListStyle}>
//               <li>📝 Automatic database incident logging pipelines</li>
//               <li>📊 Structured severity mapping (Critical, Alert, Normal)</li>
//               <li>🛡️ Encrypted user identifiers ensuring high data privacy</li>
//             </ul>
//           </div>
//           <div style={featureImageWrapper}>
//             <img src={images.logging} alt="Intel Hazard Logging" style={imageStyle} />
//           </div>
//         </div>

//       </section>
//     </div>
//   );
// }

// // 🎨 UPDATED INLINE STYLES FOR DESKTOP & FLEX LAYOUT ACCESSIBILITY
// const featureContentStyle = {
//   flex: 1,
//   textAlign: 'left'
// };

// const badgeStyle = {
//   padding: '6px 14px',
//   background: '#fee2e2',
//   color: '#ef4444',
//   borderRadius: '50px',
//   fontSize: '11px',
//   fontWeight: '700',
//   display: 'inline-block',
//   marginBottom: '20px',
//   letterSpacing: '0.5px'
// };

// const featureTitleStyle = {
//   fontSize: '32px',
//   fontWeight: '800',
//   color: '#093325',
//   margin: '0 0 18px 0',
//   letterSpacing: '-0.8px'
// };

// const featureDescStyle = {
//   fontSize: '15px',
//   color: '#5c726a',
//   lineHeight: '1.65',
//   margin: '0 0 24px 0'
// };

// const featureListStyle = {
//   paddingLeft: '20px',
//   margin: 0,
//   fontSize: '14.5px',
//   color: '#093325',
//   lineHeight: '2',
//   fontWeight: '600',
//   listStyleType: 'square'
// };

// const featureImageWrapper = {
//   flex: 1,
//   width: '100%',
//   height: '340px',
//   borderRadius: '24px',
//   overflow: 'hidden',
//   boxShadow: '0 12px 30px rgba(9, 51, 37, 0.06)'
// };

// const imageStyle = {
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover'
// };

// export default FeaturesPage;




// src/pages/FeaturesPage.jsx
import React from 'react';

function FeaturesPage() {
  const images = {
    sos: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80",
    tracking: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80",
    logging: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
  };

  return (
    <div className="features-page-container">
      
      {/* 📱 100% INDEPENDENT LOCAL RESPONSIVE STYLESHEET */}
      <style>{`
        .features-page-container {
          box-sizing: border-box;
          width: 100%;
          color: #093325;
          padding-bottom: 40px;
          font-family: system-ui, -apple-system, sans-serif;
          background-color: #f9fbf9; /* Makes container completely standalone */
        }
        .features-page-container *, 
        .features-page-container *::before, 
        .features-page-container *::after {
          box-sizing: border-box;
        }
        
        /* HERO TITLE SECTION */
        .features-hero {
          padding: 140px 6% 40px 6%;
          text-align: center;
        }
        .features-subtitle {
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 700;
          color: #10b981;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 12px;
        }
        .features-main-title {
          font-size: 48px;
          font-weight: 800;
          color: #093325;
          letter-spacing: -1.5px;
          margin: 0 auto 20px auto;
          max-width: 600px;
          line-height: 1.2;
        }
        .features-hero-desc {
          font-size: 16px;
          color: #5c726a;
          max-width: 540px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* DETAILED FEATURES SECTION */
        .features-content-section {
          padding: 40px 6% 60px 6%;
          display: flex;
          flex-direction: column;
          gap: 80px;
          width: 100%;
        }
        .feature-row {
          display: flex;
          flex-direction: row;
          gap: 60px;
          align-items: center;
          width: 100%;
        }
        .feature-row.is-reversed {
          flex-direction: row-reverse;
        }
        
        /* INNER COMPONENTS STYLING */
        .feature-content {
          flex: 1;
          text-align: left;
        }
        .feature-badge {
          padding: 6px 14px;
          background: #fee2e2;
          color: #ef4444;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 20px;
          letter-spacing: 0.5px;
        }
        .feature-title {
          font-size: 32px;
          font-weight: 800;
          color: #093325;
          margin: 0 0 18px 0;
          letter-spacing: -0.8px;
        }
        .feature-desc {
          font-size: 15px;
          color: #5c726a;
          line-height: 1.65;
          margin: 0 0 24px 0;
        }
        .feature-list {
          padding-left: 20px;
          margin: 0;
          font-size: 14.5px;
          color: #093325;
          line-height: 2;
          font-weight: 600;
          list-style-type: square;
        }
        .feature-image-wrapper {
          flex: 1;
          width: 100%;
          height: 340px;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(9, 51, 37, 0.06);
          transition: transform 0.3s ease;
        }
        .feature-image-wrapper:hover {
          transform: scale(1.02);
        }
        .feature-image {
          width: 100%;
          height: 100%;
          objectFit: 'cover';
          object-fit: 'cover';
          display: block;
        }

        /* 📱 Tablet & Mobile Responsive Breakpoints */
        @media (max-width: 768px) {
          .features-hero {
            padding: 100px 20px 30px 20px;
          }
          .features-main-title {
            font-size: 28px;
          }
          .features-hero-desc {
            font-size: 14.5px;
          }
          .features-content-section {
            padding: 20px 20px 40px 20px;
            gap: 50px;
          }
          /* Normal and Reversed rows will both stack vertically uniformly on mobile */
          .feature-row, 
          .feature-row.is-reversed {
            flex-direction: column;
            gap: 24px;
          }
          .feature-title {
            font-size: 24px;
            margin-bottom: 12px;
          }
          .feature-desc {
            font-size: 14px;
            margin-bottom: 16px;
          }
          .feature-image-wrapper {
            height: 250px; /* Reduced height for mobile optimization */
            border-radius: 16px;
          }
        }

        /* 📱 Small Portrait Smartphones */
        @media (max-width: 480px) {
          .features-hero {
            padding: 90px 16px 24px 16px;
          }
          .features-main-title {
            font-size: 24px;
          }
          .feature-image-wrapper {
            height: 200px;
          }
        }
      `}</style>

      {/* 🎯 HERO TITLE */}
      <section className="features-hero">
        <span className="features-subtitle">SYSTEM ARCHITECTURE</span>
        <h1 className="features-main-title">
          Advanced Security Features Engineered For You
        </h1>
        <p className="features-hero-desc">
          Explore the core defensive modules operating seamlessly inside the RescueHer secure matrix framework.
        </p>
      </section>

      {/* 📦 DETAILED FEATURES SECTION */}
      <section className="features-content-section">
        
        {/* FEATURE 1: INSTANT SOS */}
        <div className="feature-row">
          <div className="feature-content">
            <div className="feature-badge">MODULE 01</div>
            <h2 className="feature-title">Instant SOS Broadcast Node</h2>
            <p className="feature-desc">
              Trigger an immediate, high-priority alarm with a single interaction. The system automatically bypasses browser background delays to process telemetry packets, instantly fetching high-accuracy GPS grids.
            </p>
            <ul className="feature-list">
              <li>⚡ One-tap critical hardware routing layer</li>
              <li>✉️ Simultaneous multi-peer emergency email pipeline</li>
              <li>🔒 Securely managed token authentication state</li>
            </ul>
          </div>
          <div className="feature-image-wrapper">
            <img src={images.sos} alt="Instant SOS Node" className="feature-image" />
          </div>
        </div>

        {/* FEATURE 2: LIVE TRACK GRID */}
        <div className="feature-row is-reversed">
          <div className="feature-content">
            <div className="feature-badge" style={{ background: '#e0f2fe', color: '#0284c7' }}>MODULE 02</div>
            <h2 className="feature-title">Live Telemetry Tracking Grid</h2>
            <p className="feature-desc">
              Keep your trusted guardians updated with active location parameters. Leveraging integrated digital cartography layers, the application streams accurate coordinates without heavy network resource draining.
            </p>
            <ul className="feature-list">
              <li>📍 Precision coordinates gathering loop</li>
              <li>🗺️ Clean, accessible OpenStreetMap or Map link outputs</li>
              <li>🔋 Optimized client-to-server data synchronization</li>
            </ul>
          </div>
          <div className="feature-image-wrapper">
            <img src={images.tracking} alt="Live Track Grid" className="feature-image" />
          </div>
        </div>

        {/* FEATURE 3: HAZARD LOGGING */}
        <div className="feature-row">
          <div className="feature-content">
            <div className="feature-badge" style={{ background: '#f4f6f4', color: '#093325' }}>MODULE 03</div>
            <h2 className="feature-title">Incident History & Hazard Logs</h2>
            <p className="feature-desc">
              Every active defense trigger writes a secure, permanent historical log into the decentralized relational system layer. This provides real-time event logging, helpful for threat mapping and legal audit compilation.
            </p>
            <ul className="feature-list">
              <li>📝 Automatic database incident logging pipelines</li>
              <li>📊 Structured severity mapping (Critical, Alert, Normal)</li>
              <li>🛡️ Encrypted user identifiers ensuring high data privacy</li>
            </ul>
          </div>
          <div className="feature-image-wrapper">
            <img src={images.logging} alt="Intel Hazard Logging" className="feature-image" />
          </div>
        </div>

      </section>
    </div>
  );
}

export default FeaturesPage;