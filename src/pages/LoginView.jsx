
// // src/pages/LoginView.jsx
// import React, { useState } from 'react';
// // 🔐 ফায়ারবেস ইমপোর্ট করা হলো (ফাইলটি src/ এ থাকায় path হবে '../firebase')
// import { auth, googleProvider, signInWithPopup } from '../firebase';

// function LoginView({ onLoginSuccess, onSwitchToSignup, onBackToHome }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // 🚀 ইমেইল ও পাসওয়ার্ড দিয়ে ম্যানুয়াল লগইন ইন্টিগ্রেশন
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       alert("Please fill in all fields to proceed.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

//       const response = await fetch(`${backendUrl}/api/login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const resData = await response.json();

//       if (response.ok && resData.success) {
//         alert(`Access Granted. Welcome back, ${resData.user.name}.`);
        
//         // 🔒 ব্রাউজারের লোকাল স্টোরেজে সিকিউর টোকেন ও ইউজার আইডি সেভ করা
//         localStorage.setItem('token', resData.token);
//         localStorage.setItem('userId', resData.user.id);
        
//         // প্রোফাইল পেজের জন্য গ্লোবাল ডেটা সিঙ্ক করা হলো
//         localStorage.setItem('userName', resData.user.name);
//         localStorage.setItem('userEmail', resData.user.email);
//         localStorage.setItem('userPhone', resData.user.phone || '01841558033'); 
        
//         onLoginSuccess(resData.user.name); 
//       } else {
//         alert(`${resData.message || "Invalid credentials. Please verify your identity and try again."}`);
//       }
//     } catch (err) {
//       console.error("❌ Login Error:", err);
//       alert("Authentication Service Unavailable. Please verify your backend system state.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🌐 গুগল সোশ্যাল লগইন ইন্টিগ্রেশন
//   const handleGoogleLogin = async () => {
//     setLoading(true);
//     try {
//       // ১. ফায়ারবেস পপআপ দিয়ে গুগল অ্যাকাউন্ট সিলেক্ট করানো
//       const result = await signInWithPopup(auth, googleProvider);
//       const googleUser = result.user;

//       const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

//       // ২. গুগল থেকে পাওয়া তথ্য ব্যাকএন্ডে পাঠানো
//       const response = await fetch(`${backendUrl}/api/google-login`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: googleUser.email,
//           name: googleUser.displayName,
//           googleId: googleUser.uid,
//           photoURL: googleUser.photoURL
//         }),
//       });

//       const resData = await response.json();

//       if (response.ok && resData.success) {
//         alert(`Access Granted. Welcome, ${resData.user.name}.`);
        
//         // ৩. লোকাল স্টোরেজে টোকেন ও প্রোফাইল ডাটা সেভ
//         localStorage.setItem('token', resData.token);
//         localStorage.setItem('userId', resData.user.id);
//         localStorage.setItem('userName', resData.user.name);
//         localStorage.setItem('userEmail', resData.user.email);
//         localStorage.setItem('userPhone', resData.user.phone || ''); 
//         localStorage.setItem('userPhoto', googleUser.photoURL || '');

//         onLoginSuccess(resData.user.name);
//       } else {
//         alert(`${resData.message || "Google Authentication failed at backend."}`);
//       }
//     } catch (err) {
//       console.error("❌ Google Login Error:", err);
//       alert("Google Sign-In was cancelled or failed to connect.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={pageWrapperStyle}>
//       <div style={bgBlobLeft}></div>
//       <div style={bgBlobRight}></div>

//       <div style={containerStyle}>
//         <div style={logoStyle}>Rescue<span style={{ color: '#00bfa5' }}>Her</span></div>
//         <p style={subtitleStyle}>Secure Identity Verification System</p>

//         {/* Credentials Authentication Form */}
//         <form onSubmit={handleLogin} style={formStyle}>
//           <div style={{ textAlign: 'left' }}>
//             <label style={labelStyle}>Corporate Email Address</label>
//             <div style={inputWrapperStyle}>
//               <input 
//                 type="email" 
//                 placeholder="name@example.com" 
//                 autoComplete="off" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//                 style={inputStyle} 
//               />
//             </div>
//           </div>

//           <div style={{ textAlign: 'left' }}>
//             <label style={labelStyle}>Secure Password</label>
//             <div style={inputWrapperStyle}>
//               <input 
//                 type={showPassword ? "text" : "password"} 
//                 placeholder="••••••••" 
//                 autoComplete="current-password"
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 style={{ ...inputStyle, paddingRight: '55px' }}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 style={eyeButtonStyle}
//               >
//                 <span style={{ fontSize: '11px', fontWeight: '700', color: '#00bfa5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//                   {showPassword ? "Hide" : "Show"}
//                 </span>
//               </button>
//             </div>
//           </div>

//           <div style={actionRowStyle}>
//             <label style={rememberMeStyle}>
//               <input type="checkbox" style={{ cursor: 'pointer', accentColor: '#00bfa5' }} /> Keep me authenticated
//             </label>
//             <span style={forgotPasswordStyle}>Account Recovery?</span>
//           </div>

//           <button type="submit" disabled={loading} style={submitButtonStyle}>
//             {loading ? "Verifying..." : "Authenticate Access"}
//           </button>
//         </form>

//         <div style={dividerContainer}>
//           <div style={dividerLine}></div>
//           <span style={dividerText}>Secure Sign-In Options</span>
//           <div style={dividerLine}></div>
//         </div>

//         {/* SOCIAL LOGIN BUTTONS */}
//         <div style={socialContainerStyle}>
//           {/* গুগল বাটন (টাইপ 'button' দেওয়া হয়েছে যাতে ফর্ম সাবমিট না হয়) */}
//           <button 
//             type="button" 
//             onClick={handleGoogleLogin} 
//             disabled={loading} 
//             style={{ ...socialButtonStyle, opacity: loading ? 0.7 : 1 }}
//           >
//             <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" style={socialIconStyle} /> 
//             {loading ? "Verifying..." : "Continue with Google Identity"}
//           </button>
          
//           <button type="button" style={socialButtonStyle}>
//             <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" style={socialIconStyle} /> Continue with Facebook Secure OpenID
//           </button>
//         </div>

//         <div style={switchTextStyle}>
//           New to the Security Network? <span onClick={onSwitchToSignup} style={linkStyle}>Register Workspace</span>
//         </div>

//         <button onClick={onBackToHome} style={backButtonStyle}>← Return to Platform Gateway</button>
//       </div>
//     </div>
//   );
// }

// // 🎨 Styles (হুবহু আগের মতই আছে)
// const pageWrapperStyle = { position: 'relative', width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdfa 100%)', overflowX: 'hidden', padding: '40px 20px', boxSizing: 'border-box' };
// const bgBlobLeft = { position: 'absolute', width: '400px', height: '400px', top: '-100px', left: '-150px', borderRadius: '50%', background: 'rgba(0, 191, 165, 0.05)', filter: 'blur(80px)', zIndex: 0 };
// const bgBlobRight = { position: 'absolute', width: '500px', height: '500px', bottom: '-100px', right: '-150px', borderRadius: '50%', background: 'rgba(0, 191, 165, 0.06)', filter: 'blur(100px)', zIndex: 0 };
// const containerStyle = { position: 'relative', background: '#ffffff', padding: '44px 40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.02), 0 1px 3px rgba(15, 23, 42, 0.01)', width: '100%', maxWidth: '450px', border: '1px solid #e2e8f0', textAlign: 'center', fontFamily: "system-ui, -apple-system, sans-serif", zIndex: 1 };
// const logoStyle = { fontWeight: '900', fontSize: '30px', color: '#0f172a', marginBottom: '6px', letterSpacing: '-1px' };
// const subtitleStyle = { color: '#64748b', fontWeight: '600', fontSize: '13.5px', marginBottom: '30px', letterSpacing: '-0.1px' };
// const formStyle = { display: 'flex', flexDirection: 'column', gap: '18px' };
// const labelStyle = { fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' };
// const inputWrapperStyle = { position: 'relative', display: 'flex', alignItems: 'center' };
// const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#ffffff', color: '#0f172a', transition: 'border-color 0.2s, box-shadow 0.2s', fontFamily: 'inherit' };
// const eyeButtonStyle = { position: 'absolute', right: '16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' };
// const actionRowStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' };
// const rememberMeStyle = { fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' };
// const forgotPasswordStyle = { fontSize: '13px', color: '#00bfa5', fontWeight: '600', cursor: 'pointer' };
// const submitButtonStyle = { padding: '14px', background: '#00bfa5', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '6px', boxShadow: '0 4px 12px rgba(0, 191, 165, 0.15)', transition: 'background-color 0.2s, transform 0.2s' };
// const dividerContainer = { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px 0 20px 0' };
// const dividerLine = { flex: 1, height: '1px', backgroundColor: '#edf2f7' };
// const dividerText = { padding: '0 14px', color: '#94a3b8', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' };
// const socialContainerStyle = { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' };
// const socialButtonStyle = { width: '100%', padding: '12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontWeight: '600', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', transition: 'background-color 0.2s' };
// const socialIconStyle = { width: '16px', height: '16px' };
// const switchTextStyle = { marginTop: '20px', fontSize: '13.5px', color: '#64748b', fontWeight: '500' };
// const linkStyle = { color: '#00bfa5', fontWeight: '700', cursor: 'pointer' };
// const backButtonStyle = { background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', marginTop: '20px', cursor: 'pointer', textDecoration: 'none', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' };

// export default LoginView;










// src/pages/LoginView.jsx
import React, { useState } from 'react';
// 🔐 ফায়ারবেস ইমপোর্ট করা হলো (ফাইলটি src/ এ থাকায় path হবে '../firebase')
import { auth, googleProvider, signInWithPopup } from '../firebase';

function LoginView({ onLoginSuccess, onSwitchToSignup, onBackToHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🚀 ইমেইল ও পাসওয়ার্ড দিয়ে ম্যানুয়াল লগইন ইন্টিগ্রেশন
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields to proceed.");
      return;
    }

    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

      const response = await fetch(`${backendUrl}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        alert(`Access Granted. Welcome back, ${resData.user.name}.`);
        
        // 🔒 ব্রাউজারের লোকাল স্টোরেজে সিকিউর টোকেন ও ইউজার আইডি সেভ করা
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.user.id);
        
        // প্রোফাইল পেজের জন্য গ্লোবাল ডেটা সিঙ্ক করা হলো
        localStorage.setItem('userName', resData.user.name);
        localStorage.setItem('userEmail', resData.user.email);
        localStorage.setItem('userPhone', resData.user.phone || '01841558033'); 
        
        onLoginSuccess(resData.user.name); 
      } else {
        alert(`${resData.message || "Invalid credentials. Please verify your identity and try again."}`);
      }
    } catch (err) {
      console.error("❌ Login Error:", err);
      alert("Authentication Service Unavailable. Please verify your backend system state.");
    } finally {
      setLoading(false);
    }
  };

  // 🌐 গুগল সোশ্যাল লগইন ইন্টিগ্রেশন
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      // ১. ফায়ারবেস পপআপ দিয়ে গুগল অ্যাকাউন্ট সিলেক্ট করানো
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

      // ২. গুগল থেকে পাওয়া তথ্য ব্যাকএন্ডে পাঠানো
      const response = await fetch(`${backendUrl}/api/google-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: googleUser.email,
          name: googleUser.displayName,
          googleId: googleUser.uid,
          photoURL: googleUser.photoURL
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        alert(`Access Granted. Welcome, ${resData.user.name}.`);
        
        // ৩. লোকাল স্টোরেজে টোকেন ও প্রোফাইল ডাটা সেভ
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.user.id);
        localStorage.setItem('userName', resData.user.name);
        localStorage.setItem('userEmail', resData.user.email);
        localStorage.setItem('userPhone', resData.user.phone || ''); 
        localStorage.setItem('userPhoto', googleUser.photoURL || '');

        onLoginSuccess(resData.user.name);
      } else {
        alert(`${resData.message || "Google Authentication failed at backend."}`);
      }
    } catch (err) {
      console.error("❌ Google Login Error:", err);
      alert("Google Sign-In was cancelled or failed to connect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageWrapperStyle}>
      <div style={bgBlobLeft}></div>
      <div style={bgBlobRight}></div>

      <div style={containerStyle}>
        <div style={logoStyle}>Rescue<span style={{ color: '#00bfa5' }}>Her</span></div>
        <p style={subtitleStyle}>Secure Identity Verification System</p>

        {/* Credentials Authentication Form */}
        <form onSubmit={handleLogin} style={formStyle}>
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Corporate Email Address</label>
            <div style={inputWrapperStyle}>
              <input 
                type="email" 
                placeholder="name@example.com" 
                autoComplete="off" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={inputStyle} 
              />
            </div>
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Secure Password</label>
            <div style={inputWrapperStyle}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                autoComplete="current-password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={{ ...inputStyle, paddingRight: '55px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={eyeButtonStyle}
              >
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#00bfa5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              </button>
            </div>
          </div>

          <div style={actionRowStyle}>
            <label style={rememberMeStyle}>
              <input type="checkbox" style={{ cursor: 'pointer', accentColor: '#00bfa5' }} /> Keep me authenticated
            </label>
            <span style={forgotPasswordStyle}>Account Recovery?</span>
          </div>

          <button type="submit" disabled={loading} style={submitButtonStyle}>
            {loading ? "Verifying..." : "Authenticate Access"}
          </button>
        </form>

        <div style={dividerContainer}>
          <div style={dividerLine}></div>
          <span style={dividerText}>Secure Sign-In Options</span>
          <div style={dividerLine}></div>
        </div>

        {/* SOCIAL LOGIN BUTTONS */}
        <div style={socialContainerStyle}>
          {/* গুগল বাটন */}
          <button 
            type="button" 
            onClick={handleGoogleLogin} 
            disabled={loading} 
            style={{ ...socialButtonStyle, opacity: loading ? 0.7 : 1 }}
          >
            <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" style={socialIconStyle} /> 
            {loading ? "Verifying..." : "Continue with Google Identity"}
          </button>
          
          {/* ফেসবুক বাটন সাময়িকভাবে হাইড করা হলো */}
          {/* 
          <button type="button" style={socialButtonStyle}>
            <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" style={socialIconStyle} /> Continue with Facebook Secure OpenID
          </button> 
          */}
        </div>

        <div style={switchTextStyle}>
          New to the Security Network? <span onClick={onSwitchToSignup} style={linkStyle}>Sign Up</span>
        </div>

        <button onClick={onBackToHome} style={backButtonStyle}>← Return to Platform Gateway</button>
      </div>
    </div>
  );
}

// 🎨 Styles
const pageWrapperStyle = { position: 'relative', width: '100vw', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdfa 100%)', overflowX: 'hidden', padding: '40px 20px', boxSizing: 'border-box' };
const bgBlobLeft = { position: 'absolute', width: '400px', height: '400px', top: '-100px', left: '-150px', borderRadius: '50%', background: 'rgba(0, 191, 165, 0.05)', filter: 'blur(80px)', zIndex: 0 };
const bgBlobRight = { position: 'absolute', width: '500px', height: '500px', bottom: '-100px', right: '-150px', borderRadius: '50%', background: 'rgba(0, 191, 165, 0.06)', filter: 'blur(100px)', zIndex: 0 };
const containerStyle = { position: 'relative', background: '#ffffff', padding: '44px 40px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.02), 0 1px 3px rgba(15, 23, 42, 0.01)', width: '100%', maxWidth: '450px', border: '1px solid #e2e8f0', textAlign: 'center', fontFamily: "system-ui, -apple-system, sans-serif", zIndex: 1 };
const logoStyle = { fontWeight: '900', fontSize: '30px', color: '#0f172a', marginBottom: '6px', letterSpacing: '-1px' };
const subtitleStyle = { color: '#64748b', fontWeight: '600', fontSize: '13.5px', marginBottom: '30px', letterSpacing: '-0.1px' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '18px' };
const labelStyle = { fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' };
const inputWrapperStyle = { position: 'relative', display: 'flex', alignItems: 'center' };
const inputStyle = { width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#ffffff', color: '#0f172a', transition: 'border-color 0.2s, box-shadow 0.2s', fontFamily: 'inherit' };
const eyeButtonStyle = { position: 'absolute', right: '16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' };
const actionRowStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2px' };
const rememberMeStyle = { fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' };
const forgotPasswordStyle = { fontSize: '13px', color: '#00bfa5', fontWeight: '600', cursor: 'pointer' };
const submitButtonStyle = { padding: '14px', background: '#00bfa5', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '6px', boxShadow: '0 4px 12px rgba(0, 191, 165, 0.15)', transition: 'background-color 0.2s, transform 0.2s' };
const dividerContainer = { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px 0 20px 0' };
const dividerLine = { flex: 1, height: '1px', backgroundColor: '#edf2f7' };
const dividerText = { padding: '0 14px', color: '#94a3b8', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' };
const socialContainerStyle = { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' };
const socialButtonStyle = { width: '100%', padding: '12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontWeight: '600', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', transition: 'background-color 0.2s' };
const socialIconStyle = { width: '16px', height: '16px' };
const switchTextStyle = { marginTop: '20px', fontSize: '13.5px', color: '#64748b', fontWeight: '500' };
const linkStyle = { color: '#00bfa5', fontWeight: '700', cursor: 'pointer' };
const backButtonStyle = { background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', marginTop: '20px', cursor: 'pointer', textDecoration: 'none', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' };

export default LoginView;