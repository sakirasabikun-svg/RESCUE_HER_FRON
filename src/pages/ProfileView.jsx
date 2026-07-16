

// src/pages/ProfileView.jsx
import React, { useState, useEffect } from 'react';

function ProfileView({ onLogout, theme = 'light' }) {
  // 👤 ইউজার ইনফো স্টেট
  const [userInfo] = useState({
    name: localStorage.getItem('userName') || 'Kotha Jahan',
    email: localStorage.getItem('userEmail') || 'kotha@gmail.com',
    phone: localStorage.getItem('userPhone') || '01841558033',
  });

  // 📝 ফর্ম স্টেট
  const [bloodGroup, setBloodGroup] = useState('');
  const [dob, setDob] = useState('');
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  
  // 🖼️ প্রোফাইল পিকচার স্টেট
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem('profilePic') || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  );

  const hobbyOptions = ['Reading', 'Traveling', 'Martial Arts', 'Gaming', 'Fitness', 'Coding', 'Music', 'Volunteering'];

  // 🏆 RescueHer ট্র্যাকিং লিডারবোর্ড ডেটা
  const safetyLeaderboard = [
    { rank: '#1', teamName: 'Alpha Rescuers', points: '9,450 pts', casesSolved: '12 Cases', icon: '🏆' },
    { rank: '#2', teamName: 'Shield Angels', points: '8,210 pts', casesSolved: '8 Cases', icon: '🛡️' },
    { rank: '#3', teamName: 'Cyber Guardians', points: '7,560 pts', casesSolved: '5 Cases', icon: '⚡' },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfilePic(base64Image);
        localStorage.setItem('profilePic', base64Image);
        window.dispatchEvent(new Event('profileLocalStorageUpdate'));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleHobby = (hobby) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const handleSaveProfile = () => {
    const profileData = { bloodGroup, dob, selectedHobbies };
    localStorage.setItem('additionalProfile', JSON.stringify(profileData));
    window.dispatchEvent(new Event('profileLocalStorageUpdate'));
    alert('Profile parameters updated successfully!');
  };

  useEffect(() => {
    const savedData = localStorage.getItem('additionalProfile');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      if (parsed.bloodGroup) setBloodGroup(parsed.bloodGroup);
      if (parsed.dob) setDob(parsed.dob);
      if (parsed.selectedHobbies) setSelectedHobbies(parsed.selectedHobbies);
    }
  }, []);

  // 🎨 কালার থিম কনফিগারেশন (আপনার ইমেজের গ্রিন ভাইব অনুযায়ী)
  const isDark = theme === 'dark';
  const colors = {
    pageBg: isDark ? '#0b1321' : '#f5f9f6',
    cardBg: isDark ? '#1a2436' : '#ffffff',
    cardBorder: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
    textMain: isDark ? '#f1f5f9' : '#2d3748',
    textMuted: isDark ? '#94a3b8' : '#718096',
    inputBg: isDark ? '#0f172a' : '#f8fafc',
    inputBorder: isDark ? 'rgba(255, 255, 255, 0.1)' : '#cbd5e1',
    accent: '#48bb78', 
    accentLight: isDark ? 'rgba(72, 187, 120, 0.15)' : '#e6fffa',
    shadow: isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.05)',
  };

  return (
    <div style={{ backgroundColor: colors.pageBg, minHeight: '100vh', paddingBottom: '80px', color: colors.textMain, fontFamily: 'system-ui, sans-serif' }}>
      
      {/* 🌆 ১. আপনার দেওয়া ইমেজের হুবহু কিউট গ্রিন ও পিঙ্ক গার্ডেন কার্টুন ইলাস্ট্রেশন ব্যানার */}
      <div style={{ 
        width: '100%', 
        height: '340px', 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#bbf2c4'
      }}>
        <img 
          src="https://pub-c5e31b5cdafb419a824e6939b7bf4f4a.r2.dev/mock-garden-anime.jpg" // একদম আপনার আপলোড করা ইমেজের ভাইবের লাইভ বিকল্প ক্লাউড সোর্স
          alt="Premium Cute Garden Anime Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', 
            objectPosition: 'center 40%' 
          }}
          onError={(e) => {
            // ক্লাউড সোর্সের ব্যাকআপ যদি কোনো কারণে নেটওয়ার্ক ডাউন থাকে
            e.target.src = "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&q=80&w=1200";
          }}
        />
        {/* স্মুথ বটম শ্যাডো ব্লেন্ডিং */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '140px', background: `linear-gradient(to bottom, transparent, ${colors.pageBg})` }}></div>
      </div>

      {/* 📦 মেইন কন্টেইনার */}
      <div style={{ maxWidth: '940px', margin: '-130px auto 0 auto', padding: '0 20px', position: 'relative', zIndex: 5 }}>
        
        {/* 🪪 ২. মেইন প্রোফাইল ওভারলে কার্ড */}
        <div style={{ backgroundColor: colors.cardBg, borderRadius: '28px', border: `1px solid ${colors.cardBorder}`, boxShadow: `0 12px 30px ${colors.shadow}`, padding: '0 30px 30px 30px', textAlign: 'center' }}>
          
          {/* 🔴 গোল প্রোফাইল ইমেজ */}
          <div style={{ position: 'relative', width: '160px', height: '160px', margin: '-80px auto 18px auto' }}>
            <img 
              src={profilePic} 
              alt="Avatar" 
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: `6px solid ${colors.cardBg}`, boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }} 
            />
            <label style={{ position: 'absolute', bottom: '6px', right: '6px', backgroundColor: colors.accent, color: '#fff', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            </label>
          </div>

          <span style={{ display: 'inline-block', padding: '5px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', backgroundColor: colors.accentLight, color: colors.accent, marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Rescueher Verified Member
          </span>
          
          <h1 style={{ fontSize: '30px', fontWeight: '800', margin: '0 0 12px 0' }}>{userInfo.name}</h1>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', borderTop: `1px solid ${colors.cardBorder}`, paddingTop: '18px', marginTop: '10px' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: colors.textMuted, fontWeight: '600' }}>Email Address</div>
              <div style={{ fontSize: '14px', fontWeight: '700' }}>{userInfo.email}</div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '12px', color: colors.textMuted, fontWeight: '600' }}>Emergency Line</div>
              <div style={{ fontSize: '14px', fontWeight: '700' }}>{userInfo.phone}</div>
            </div>
          </div>
        </div>

        {/* 📊 ৩. "Top Safety Responders" পডিয়াম বক্স */}
        <div style={{ backgroundColor: colors.cardBg, borderRadius: '24px', border: `1px solid ${colors.cardBorder}`, boxShadow: `0 10px 25px ${colors.shadow}`, padding: '24px', marginTop: '28px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, borderBottom: `3px solid ${colors.accent}`, paddingBottom: '4px', display: 'inline-block' }}>
              RescueHer Top Responders
            </h3>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '16px', flexWrap: 'wrap', padding: '10px 0' }}>
            
            {/* 🥈 Rank #2 Box */}
            <div style={{ width: '170px', backgroundColor: colors.inputBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '30px' }}>{safetyLeaderboard[1].icon}</div>
              <h4 style={{ margin: '8px 0 2px 0', fontSize: '14px', fontWeight: '700' }}>{safetyLeaderboard[1].teamName}</h4>
              <p style={{ margin: 0, fontWeight: '800', color: colors.accent }}>{safetyLeaderboard[1].points}</p>
              <div style={{ marginTop: '10px', backgroundColor: '#e2e8f0', color: '#475569', fontSize: '12px', fontWeight: '700', padding: '4px', borderRadius: '8px' }}>
                Rank 2 <span style={{ fontWeight: '400', fontSize: '11px' }}>({safetyLeaderboard[1].casesSolved})</span>
              </div>
            </div>

            {/* 🥇 Rank #1 Box */}
            <div style={{ width: '190px', backgroundColor: colors.accentLight, border: `2px solid ${colors.accent}`, borderRadius: '20px', padding: '24px 16px', textAlign: 'center', boxShadow: '0 8px 20px rgba(72,187,120,0.15)' }}>
              <div style={{ fontSize: '38px', marginTop: '-10px' }}>{safetyLeaderboard[0].icon}</div>
              <h4 style={{ margin: '8px 0 2px 0', fontSize: '16px', fontWeight: '800', color: colors.accent }}>{safetyLeaderboard[0].teamName}</h4>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: '900', color: colors.accent }}>{safetyLeaderboard[0].points}</p>
              <div style={{ marginTop: '12px', backgroundColor: colors.accent, color: '#fff', fontSize: '13px', fontWeight: '800', padding: '6px', borderRadius: '10px' }}>
                Rank 1 <span style={{ fontWeight: '400', fontSize: '11px' }}>({safetyLeaderboard[0].casesSolved})</span>
              </div>
            </div>

            {/* 🥉 Rank #3 Box */}
            <div style={{ width: '170px', backgroundColor: colors.inputBg, border: `1px solid ${colors.cardBorder}`, borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '30px' }}>{safetyLeaderboard[2].icon}</div>
              <h4 style={{ margin: '8px 0 2px 0', fontSize: '14px', fontWeight: '700' }}>{safetyLeaderboard[2].teamName}</h4>
              <p style={{ margin: 0, fontWeight: '800', color: colors.accent }}>{safetyLeaderboard[2].points}</p>
              <div style={{ marginTop: '10px', backgroundColor: '#e2e8f0', color: '#64748b', fontSize: '12px', fontWeight: '700', padding: '4px', borderRadius: '8px' }}>
                Rank 3 <span style={{ fontWeight: '400', fontSize: '10px' }}>({safetyLeaderboard[2].casesSolved})</span>
              </div>
            </div>

          </div>
        </div>

        {/* 🗂️ ৪. ফর্ম এবং ট্যাগস গ্রিড সেকশন */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginTop: '24px' }}>
          
          {/* বায়োমেট্রিক ফর্ম */}
          <div style={{ backgroundColor: colors.cardBg, borderRadius: '20px', border: `1px solid ${colors.cardBorder}`, padding: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: colors.accent, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '20px', marginTop: 0 }}>
              Biometric Data
            </h3>
            
            <div style={inputGroup}>
              <label style={formLabel}>Blood Group</label>
              <select 
                value={bloodGroup} 
                onChange={(e) => setBloodGroup(e.target.value)} 
                style={{ ...inputStyle, backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.textMain }}
              >
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div style={inputGroup}>
              <label style={formLabel}>Date of Birth</label>
              <input 
                type="date" 
                value={dob} 
                onChange={(e) => setDob(e.target.value)} 
                style={{ ...inputStyle, backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.textMain }} 
              />
            </div>
          </div>

          {/* ট্যাগ ও অ্যাকশন বাটন */}
          <div style={{ backgroundColor: colors.cardBg, borderRadius: '20px', border: `1px solid ${colors.cardBorder}`, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '800', color: colors.accent, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '16px', marginTop: 0 }}>
                Attributes / Tags
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {hobbyOptions.map((hobby) => {
                  const isSelected = selectedHobbies.includes(hobby);
                  return (
                    <span
                      key={hobby}
                      onClick={() => toggleHobby(hobby)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? colors.accent : colors.inputBg,
                        color: isSelected ? '#ffffff' : colors.textMain,
                        border: `1px solid ${isSelected ? colors.accent : colors.inputBorder}`,
                      }}
                    >
                      {hobby}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* অ্যাকশন বাটনসমূহ */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={handleSaveProfile} style={{ flex: 2, padding: '12px', backgroundColor: colors.accent, color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                Save Profile Parameters
              </button>
              <button onClick={onLogout} style={{ flex: 1, padding: '12px', backgroundColor: '#e53e3e', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}>
                Logout
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

const inputGroup = { display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' };
const formLabel = { fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', opacity: 0.8 };
const inputStyle = { padding: '11px 14px', borderRadius: '10px', border: '1px solid', fontSize: '13.5px', outline: 'none', width: '100%', boxSizing: 'border-box' };

export default ProfileView;










