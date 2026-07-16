
// src/pages/SafetyTipsPage.jsx
import React, { useState, useEffect } from 'react';

function SafetyTipsPage({ theme }) {
  const [liveArticles, setLiveArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // 🎥 Video Play korar jonno state (Popup Modal)
  const [activeVideo, setActiveVideo] = useState(null); 

  const isDark = theme === 'dark';

  // Dynamic colors for standalone responsiveness
  const colors = {
    bg: isDark ? '#0b1310' : '#f9fbf9',
    cardBg: isDark ? '#111a16' : '#ffffff',
    cardBorder: isDark ? 'rgba(16, 185, 129, 0.2)' : '#e8ece9',
    primaryText: isDark ? '#f8fafc' : '#093325',
    secondaryText: isDark ? '#a2b7b0' : '#5c726a',
    accentBg: isDark ? 'rgba(16, 185, 129, 0.1)' : '#eef5f2',
    accentColor: '#10b981',
    skeletonBg: isDark ? '#1a2721' : '#f0f4f1'
  };

  // 🌐 LIVE API FETCH (Google News RSS to JSON via rss2json)
  useEffect(() => {
    const fetchLiveTips = async () => {
      try {
        // Query: women safety tips self defense
        const rssUrl = encodeURIComponent('https://news.google.com/rss/search?q=women+safety+tips+self+defense&hl=en-US&gl=US&ceid=US:en');
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.status === 'ok') {
          // 🚀 Filtering and cleaning up the data (Taking up to 12 articles)
          const cleanArticles = data.items.slice(0, 12).map(item => ({
            title: item.title.split(' - ')[0], // Remove the publisher name from title
            publisher: item.title.split(' - ')[1] || 'Global News',
            link: item.link,
            pubDate: new Date(item.pubDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
          }));
          setLiveArticles(cleanArticles);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch live tips:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveTips();
  }, []);

  // 🎥 Real YouTube Video Guides Data (6 Videos added)
  const videoGuides = [
    { title: "The #1 Self-Defense Tip for Women", duration: "1:28", videoId: "u0kZ7xDkxZo", bg: "https://img.youtube.com/vi/u0kZ7xDkxZo/hqdefault.jpg" },
    { title: "How to Use Pepper Spray Properly", duration: "3:40", videoId: "IxaXz_7OalM", bg: "https://img.youtube.com/vi/IxaXz_7OalM/hqdefault.jpg" },
    { title: "5 Self-Defense Moves Every Woman Should Know", duration: "5:22", videoId: "M4BqqNEFMs0", bg: "https://img.youtube.com/vi/M4BqqNEFMs0/hqdefault.jpg" },
    { title: "How to Escape a Chokehold", duration: "4:15", videoId: "T7aNSRoDCmg", bg: "https://img.youtube.com/vi/T7aNSRoDCmg/hqdefault.jpg" },
    { title: "Using Everyday Objects for Defense", duration: "6:30", videoId: "-V4vEyhWDZ0", bg: "https://img.youtube.com/vi/-V4vEyhWDZ0/hqdefault.jpg" },
    { title: "Self Defense Myths vs Reality", duration: "10:15", videoId: "0S_Y3LqGzEA", bg: "https://img.youtube.com/vi/0S_Y3LqGzEA/hqdefault.jpg" }
  ];

  return (
    <div className="safety-tips-container" style={{ background: colors.bg, minHeight: '100vh', padding: '40px 0', transition: 'all 0.3s ease' }}>
      
      {/* 📱 INDEPENDENT RESPONSIVE CSS */}
      <style>{`
        .safety-tips-container { box-sizing: border-box; width: 100%; font-family: system-ui, -apple-system, sans-serif; }
        .safety-tips-container * { box-sizing: border-box; }
        
        .st-header { text-align: center; margin-bottom: 50px; padding: 0 20px; }
        .st-badge { display: inline-block; padding: 6px 16px; background: ${colors.accentBg}; color: ${colors.accentColor}; border-radius: 50px; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; border: 1px solid ${colors.cardBorder}; }
        .st-title { font-size: 36px; font-weight: 800; color: ${colors.primaryText}; margin: 0 0 16px 0; letter-spacing: -1px; }
        .st-desc { font-size: 15px; color: ${colors.secondaryText}; max-width: 600px; margin: 0 auto; line-height: 1.6; }

        .st-section { max-width: 1200px; margin: 0 auto 60px auto; padding: 0 24px; }
        .st-section-title { font-size: 22px; font-weight: 800; color: ${colors.primaryText}; margin-bottom: 24px; display: flex; align-items: center; gap: 10px; }
        
        .core-tips-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .core-card { background: ${colors.cardBg}; border: 1px solid ${colors.cardBorder}; border-radius: 20px; padding: 24px; transition: transform 0.3s, box-shadow 0.3s; }
        .core-card:hover { transform: translateY(-5px); border-color: ${colors.accentColor}; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .core-icon { font-size: 28px; margin-bottom: 16px; }
        .core-card h3 { font-size: 18px; font-weight: 700; color: ${colors.primaryText}; margin: 0 0 10px 0; }
        .core-card p { font-size: 14px; color: ${colors.secondaryText}; line-height: 1.6; margin: 0; }

        /* 🎥 Video CSS from previous version */
        .video-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 40px; }
        .video-card { position: relative; border-radius: 20px; overflow: hidden; height: 180px; cursor: pointer; border: 1px solid ${colors.cardBorder}; transition: transform 0.3s; }
        .video-card:hover { transform: scale(1.02); border-color: ${colors.accentColor}; }
        .video-bg { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; filter: brightness(0.6) grayscale(20%); }
        .video-card:hover .video-bg { transform: scale(1.1); filter: brightness(0.4); }
        .play-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50px; height: 50px; background: rgba(255,0,0,0.8); backdrop-filter: blur(5px); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; border: 2px solid rgba(255,255,255,0.8); transition: all 0.3s; }
        .video-card:hover .play-btn { background: #ff0000; border-color: #fff; transform: translate(-50%, -50%) scale(1.1); }
        .video-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 16px; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); }
        .video-title-text { color: white; font-weight: 700; font-size: 15px; margin: 0 0 4px 0; }
        .video-duration { color: #a2b7b0; font-size: 11px; font-weight: 600; background: rgba(0,0,0,0.5); padding: 2px 8px; border-radius: 4px; display: inline-block; }

        /* 🛑 Video Modal CSS */
        .video-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(10px); z-index: 99999; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .video-modal-content { width: 100%; max-width: 800px; background: #000; border-radius: 20px; overflow: hidden; position: relative; box-shadow: 0 20px 50px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1); }
        .close-video-btn { position: absolute; top: 15px; right: 15px; background: rgba(255,255,255,0.2); border: none; color: white; width: 36px; height: 36px; border-radius: 50%; font-size: 16px; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
        .close-video-btn:hover { background: rgba(239, 68, 68, 0.8); }
        .video-wrapper { position: relative; padding-bottom: 56.25%; height: 0; }
        .video-wrapper iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }

        .live-articles-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; }
        .article-card { background: ${colors.cardBg}; border: 1px solid ${colors.cardBorder}; border-radius: 20px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.3s; text-decoration: none; }
        .article-card:hover { border-color: ${colors.accentColor}; background: ${isDark ? '#14201b' : '#fafffc'}; }
        .article-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 11px; font-weight: 700; color: ${colors.accentColor}; text-transform: uppercase; letter-spacing: 0.5px; }
        .article-title { font-size: 16px; font-weight: 700; color: ${colors.primaryText}; line-height: 1.5; margin: 0 0 16px 0; }
        .article-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; border-top: 1px solid ${colors.cardBorder}; padding-top: 16px; }
        .article-date { font-size: 12px; color: ${colors.secondaryText}; font-weight: 600; }
        .read-more { font-size: 12px; font-weight: 800; color: ${colors.primaryText}; transition: color 0.2s; }
        .article-card:hover .read-more { color: ${colors.accentColor}; }

        /* Skeleton Loading Animation */
        @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        .skeleton { background: ${colors.skeletonBg}; border-radius: 8px; animation: pulse 1.5s infinite ease-in-out; }
        .sk-meta { height: 12px; width: 40%; margin-bottom: 16px; }
        .sk-title { height: 20px; width: 100%; margin-bottom: 8px; }
        .sk-title-2 { height: 20px; width: 70%; margin-bottom: 24px; }
        .sk-footer { height: 14px; width: 30%; }

        @media (max-width: 768px) {
          .st-title { font-size: 28px; }
          .st-desc { font-size: 14px; }
          .core-tips-grid, .live-articles-grid, .video-grid { grid-template-columns: 1fr; gap: 16px; }
          .st-section { padding: 0 16px; margin-bottom: 40px; }
          .article-title { font-size: 15px; }
        }
      `}</style>

      {/* 🛑 YOUTUBE VIDEO POPUP MODAL */}
      {activeVideo && (
        <div className="video-modal-overlay" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-video-btn" onClick={() => setActiveVideo(null)}>✕</button>
            <div className="video-wrapper">
              <iframe 
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} 
                title="Self Defense Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="st-header">
        <span className="st-badge">Knowledge Base</span>
        <h1 className="st-title">Defensive Guidelines & Live Intel</h1>
        <p className="st-desc">Stay informed with fundamental self-defense strategies and real-time news articles curated globally for women's safety.</p>
      </div>

      {/* SECTION 1: CORE STATIC TIPS */}
      <div className="st-section">
        <h2 className="st-section-title">🛡️ Fundamental Defense Rules</h2>
        <div className="core-tips-grid">
          <div className="core-card">
            <div className="core-icon">👁️</div>
            <h3>Situational Awareness</h3>
            <p>Always keep your head up and scan your surroundings. Avoid looking down at your phone when walking in isolated or dimly lit areas.</p>
          </div>
          <div className="core-card">
            <div className="core-icon">🚗</div>
            <h3>Ride-Share Safety</h3>
            <p>Before entering any ride-share, verify the license plate, ask the driver "Who are you here for?", and share your live tracking link with a guardian.</p>
          </div>
          <div className="core-card">
            <div className="core-icon">🔑</div>
            <h3>Key & Hand Defense</h3>
            <p>Keep your car or house keys in your hand while approaching the door. In emergencies, they can act as a quick defensive tool against an attacker.</p>
          </div>
        </div>
      </div>

      {/* 🎥 SECTION 2: SELF DEFENSE VIDEO MASTERCLASS */}
      <div className="st-section">
        <h2 className="st-section-title">🥋 Physical Defense Tactics</h2>
        <div className="video-grid">
          {videoGuides.map((vid, idx) => (
            <div key={idx} className="video-card" onClick={() => setActiveVideo(vid.videoId)}>
              <img src={vid.bg} alt={vid.title} className="video-bg" />
              <div className="play-btn">▶</div>
              <div className="video-info">
                <h3 className="video-title-text">{vid.title}</h3>
                <span className="video-duration">{vid.duration} Masterclass</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: LIVE API ARTICLES */}
      <div className="st-section">
        <h2 className="st-section-title">🌐 Live Safety Intel & Global Updates</h2>
        
        <div className="live-articles-grid">
          {loading ? (
            /* SKELETON LOADERS WHILE FETCHING API */
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="article-card" style={{ pointerEvents: 'none' }}>
                <div>
                  <div className="skeleton sk-meta"></div>
                  <div className="skeleton sk-title"></div>
                  <div className="skeleton sk-title-2"></div>
                </div>
                <div className="article-footer">
                  <div className="skeleton sk-footer"></div>
                </div>
              </div>
            ))
          ) : error ? (
            /* ERROR FALLBACK */
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: colors.cardBg, borderRadius: '20px', border: `1px solid ${colors.cardBorder}` }}>
              <p style={{ fontSize: '15px', color: colors.secondaryText, fontStyle: 'italic' }}>
                ⚠️ Unable to fetch live network updates right now. Please check your connection or try again later.
              </p>
            </div>
          ) : liveArticles.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', background: colors.cardBg, borderRadius: '20px', border: `1px solid ${colors.cardBorder}` }}>
              <p style={{ fontSize: '15px', color: colors.secondaryText, fontStyle: 'italic' }}>
                No recent safety articles found.
              </p>
            </div>
          ) : (
            /* RENDER LIVE ARTICLES */
            liveArticles.map((article, idx) => (
              <a key={idx} href={article.link} target="_blank" rel="noopener noreferrer" className="article-card">
                <div>
                  <div className="article-meta">
                    <span>📰 {article.publisher}</span>
                  </div>
                  <h3 className="article-title">{article.title}</h3>
                </div>
                <div className="article-footer">
                  <span className="article-date">{article.pubDate}</span>
                  <span className="read-more">Read Source →</span>
                </div>
              </a>
            ))
          )}
        </div>
      </div>

    </div>
  );
}

export default SafetyTipsPage;