
// // src/pages/SignupView.jsx
// import React, { useState } from 'react';
// // 🔐 ফায়ারবেস ইমপোর্ট করা হলো
// import { auth, googleProvider, signInWithPopup } from '../firebase';

// function SignupView({ onSignupSuccess, onSwitchToLogin, onBackToHome }) {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState(''); 
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // 📝 ম্যানুয়াল ফর্ম সাইনআপ ইন্টিগ্রেশন
//   const handleSignup = async (e) => {
//     e.preventDefault();
    
//     if (!name || !phone || !email || !password || !confirmPassword) {
//       alert("Please populate all required fields to initialize your account registration.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Registration mismatch: Passwords do not match.");
//       return;
//     }

//     if (password.length < 8) {
//       alert("Security restriction: Password must be at least 8 characters long.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';
      
//       const response = await fetch(`${backendUrl}/api/signup`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, phone, email, password }),
//       });

//       const resData = await response.json();

//       if (response.ok && resData.success) {
//         alert(`Account registered successfully for ${name}.`);
        
//         // 💾 টোকেন ও আইডি সেভ করা হলো
//         localStorage.setItem('token', resData.token);
//         localStorage.setItem('userId', resData.user.id);
        
//         // প্রোফাইল পেজে ডেটা সিঙ্ক করার প্যারামিটার
//         localStorage.setItem('userName', name);
//         localStorage.setItem('userEmail', email);
//         localStorage.setItem('userPhone', phone); 
        
//         // 🛠️ সেফটি চেক
//         if (typeof onSignupSuccess === 'function') {
//           onSignupSuccess(name); 
//         } else if (typeof onSwitchToLogin === 'function') {
//           onSwitchToLogin(); 
//         } else {
//           window.location.href = '/'; 
//         }
        
//       } else {
//         alert(`Registration Failed: ${resData.message || "An unresolved server anomaly occurred."}`);
//       }
//     } catch (err) {
//       console.error("❌ Signup Error:", err);
//       alert("Network Service Interrupted. Unable to connect to backend authentication server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🌐 গুগল সোশ্যাল সাইনআপ (লগইন) ইন্টিগ্রেশন
//   const handleGoogleSignup = async () => {
//     setLoading(true);
//     try {
//       // ১. ফায়ারবেস গুগল পপআপ ওপেন করা
//       const result = await signInWithPopup(auth, googleProvider);
//       const googleUser = result.user;

//       const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

//       // ২. গুগল থেকে পাওয়া তথ্য ব্যাকএন্ডে পাঠানো (যা ইউজার না থাকলে নতুন অ্যাকাউন্ট তৈরি করবে)
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
//         alert(`Account linked successfully! Welcome, ${resData.user.name}.`);
        
//         // ৩. লোকাল স্টোরেজে ডেটা সেভ
//         localStorage.setItem('token', resData.token);
//         localStorage.setItem('userId', resData.user.id);
//         localStorage.setItem('userName', resData.user.name);
//         localStorage.setItem('userEmail', resData.user.email);
//         localStorage.setItem('userPhone', resData.user.phone || ''); 
//         localStorage.setItem('userPhoto', googleUser.photoURL || '');

//         // ৪. সেফটি চেক মেনে সাকসেস স্টেট ট্রিগার করা
//         if (typeof onSignupSuccess === 'function') {
//           onSignupSuccess(resData.user.name); 
//         } else if (typeof onSwitchToLogin === 'function') {
//           onSwitchToLogin(); 
//         } else {
//           window.location.href = '/'; 
//         }
//       } else {
//         alert(`${resData.message || "Google registration failed at database backend."}`);
//       }
//     } catch (err) {
//       console.error("❌ Google Signup Error:", err);
//       alert("Google registration was cancelled or failed.");
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
//         <p style={subtitleStyle}>Initialize Your Secure Safety Profile</p>

//         <form onSubmit={handleSignup} style={formStyle}>
//           {/* ১. নাম ইনপুট */}
//           <div style={{ textAlign: 'left' }}>
//             <label style={labelStyle}>Full Name</label>
//             <div style={inputWrapperStyle}>
//               <input 
//                 type="text" 
//                 placeholder="John Doe" 
//                 autoComplete="off"
//                 value={name} 
//                 onChange={(e) => setName(e.target.value)} 
//                 style={inputStyle} 
//               />
//             </div>
//           </div>

//           {/* ২. ইমেল ইনপুট */}
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

//           {/* ৩. ফোন ইনপুট */}
//           <div style={{ textAlign: 'left' }}>
//             <label style={labelStyle}>Contact Mobile Line</label>
//             <div style={inputWrapperStyle}>
//               <input 
//                 type="tel" 
//                 placeholder="e.g., 01XXXXXXXXX" 
//                 autoComplete="off"
//                 value={phone} 
//                 onChange={(e) => setPhone(e.target.value)} 
//                 style={inputStyle} 
//               />
//             </div>
//           </div>

//           {/* ৪. পাসওয়ার্ড ইনপুট */}
//           <div style={{ textAlign: 'left' }}>
//             <label style={labelStyle}>Secure Password</label>
//             <div style={inputWrapperStyle}>
//               <input 
//                 type={showPassword ? "text" : "password"} 
//                 placeholder="••••••••" 
//                 autoComplete="new-password"
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

//           {/* ৫. কনফার্ম পাসওয়ার্ড ইনপুট */}
//           <div style={{ textAlign: 'left' }}>
//             <label style={labelStyle}>Confirm Password</label>
//             <div style={inputWrapperStyle}>
//               <input 
//                 type={showConfirmPassword ? "text" : "password"} 
//                 placeholder="••••••••" 
//                 autoComplete="new-password"
//                 value={confirmPassword} 
//                 onChange={(e) => setConfirmPassword(e.target.value)} 
//                 style={{ ...inputStyle, paddingRight: '55px' }}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 style={eyeButtonStyle}
//               >
//                 <span style={{ fontSize: '11px', fontWeight: '700', color: '#00bfa5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//                   {showConfirmPassword ? "Hide" : "Show"}
//                 </span>
//               </button>
//             </div>
//           </div>

//           <div style={checkboxContainerStyle}>
//             <input type="checkbox" id="terms" required style={{ cursor: 'pointer', accentColor: '#00bfa5' }} />
//             <label htmlFor="terms" style={checkboxLabelStyle}>
//               I accept the regulatory <span style={linkStyle}>Terms of Service</span> and verified <span style={linkStyle}>Privacy Framework</span>
//             </label>
//           </div>

//           <button type="submit" disabled={loading} style={submitButtonStyle}>
//             {loading ? "Registering..." : "Initialize Security Profile"}
//           </button>
//         </form>

//         <div style={orDividerContainer}>
//           <div style={lineStyle}></div>
//           <span style={orSpanStyle}>Secure Integration Options</span>
//           <div style={lineStyle}></div>
//         </div>

//         {/* SOCIAL SIGNUP BUTTONS */}
//         <div style={socialContainerStyle}>
//           {/* গুগল বাটন (টাইপ 'button' দেওয়া হয়েছে যাতে ফর্ম সাবমিট না হয় এবং ক্লিক হ্যান্ডলার যুক্ত করা হয়েছে) */}
//           <button 
//             type="button" 
//             onClick={handleGoogleSignup} 
//             disabled={loading} 
//             style={{ ...socialButtonStyle, opacity: loading ? 0.7 : 1 }}
//           >
//             <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" style={socialIconStyle} /> 
//             {loading ? "Processing..." : "Continue with Google Identity"}
//           </button>
          
//           <button type="button" style={socialButtonStyle}>
//             <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" style={socialIconStyle} /> Continue with Facebook Secure OpenID
//           </button>
//         </div>

//         <div style={switchTextStyle}>
//           Already have an operational profile? <span onClick={onSwitchToLogin} style={loginLinkStyle}>Login</span>
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
// const checkboxContainerStyle = { display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '2px', textAlign: 'left' };
// const checkboxLabelStyle = { fontSize: '12.5px', color: '#64748b', cursor: 'pointer', lineHeight: '1.4', fontWeight: '500' };
// const linkStyle = { color: '#00bfa5', fontWeight: '700', cursor: 'pointer', textDecoration: 'none' };
// const submitButtonStyle = { padding: '14px', background: '#00bfa5', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '6px', boxShadow: '0 4px 12px rgba(0, 191, 165, 0.15)', transition: 'background-color 0.2s' };
// const orDividerContainer = { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px 0 20px 0' };
// const lineStyle = { flex: 1, height: '1px', backgroundColor: '#edf2f7' };
// const orSpanStyle = { padding: '0 14px', color: '#94a3b8', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' };
// const socialContainerStyle = { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' };
// const socialButtonStyle = { width: '100%', padding: '12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontWeight: '600', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', transition: 'background-color 0.2s' };
// const socialIconStyle = { width: '16px', height: '16px' };
// const switchTextStyle = { marginTop: '20px', fontSize: '13.5px', color: '#64748b', fontWeight: '500' };
// const loginLinkStyle = { color: '#00bfa5', fontWeight: '700', cursor: 'pointer' };
// const backButtonStyle = { background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', marginTop: '20px', cursor: 'pointer', textDecoration: 'none', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' };

// export default SignupView;












// // src/pages/SignupView.jsx
// import React, { useState } from 'react';
// // 🔐 ফায়ারবেস ইমপোর্ট করা হলো
// import { auth, googleProvider, signInWithPopup } from '../firebase';

// function SignupView({ onSignupSuccess, onSwitchToLogin, onBackToHome }) {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState(''); 
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // 📝 ম্যানুয়াল ফর্ম সাইনআপ ইন্টিগ্রেশন
//   const handleSignup = async (e) => {
//     e.preventDefault();
    
//     if (!name || !phone || !email || !password || !confirmPassword) {
//       alert("Please populate all required fields to initialize your account registration.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       alert("Registration mismatch: Passwords do not match.");
//       return;
//     }

//     if (password.length < 8) {
//       alert("Security restriction: Password must be at least 8 characters long.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';
      
//       const response = await fetch(`${backendUrl}/api/signup`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name, phone, email, password }),
//       });

//       const resData = await response.json();

//       if (response.ok && resData.success) {
//         alert(`Account registered successfully for ${name}.`);
        
//         // 💾 টোকেন ও আইডি সেভ করা হলো
//         localStorage.setItem('token', resData.token);
//         localStorage.setItem('userId', resData.user.id);
        
//         // প্রোফাইল পেজে ডেটা সিঙ্ক করার প্যারামিটার
//         localStorage.setItem('userName', name);
//         localStorage.setItem('userEmail', email);
//         localStorage.setItem('userPhone', phone); 
        
//         // 🛠️ সেফটি চেক
//         if (typeof onSignupSuccess === 'function') {
//           onSignupSuccess(name); 
//         } else if (typeof onSwitchToLogin === 'function') {
//           onSwitchToLogin(); 
//         } else {
//           window.location.href = '/'; 
//         }
        
//       } else {
//         alert(`Registration Failed: ${resData.message || "An unresolved server anomaly occurred."}`);
//       }
//     } catch (err) {
//       console.error("❌ Signup Error:", err);
//       alert("Network Service Interrupted. Unable to connect to backend authentication server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🌐 গুগল সোশ্যাল সাইনআপ (লগইন) ইন্টিগ্রেশন
//   const handleGoogleSignup = async () => {
//     setLoading(true);
//     try {
//       // ১. ফায়ারবেস গুগল পপআপ ওপেন করা
//       const result = await signInWithPopup(auth, googleProvider);
//       const googleUser = result.user;

//       const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

//       // ২. গুগল থেকে পাওয়া তথ্য ব্যাকএন্ডে পাঠানো (যা ইউজার না থাকলে নতুন অ্যাকাউন্ট তৈরি করবে)
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
//         alert(`Account linked successfully! Welcome, ${resData.user.name}.`);
        
//         // ৩. লোকাল স্টোরেজে ডেটা সেভ
//         localStorage.setItem('token', resData.token);
//         localStorage.setItem('userId', resData.user.id);
//         localStorage.setItem('userName', resData.user.name);
//         localStorage.setItem('userEmail', resData.user.email);
//         localStorage.setItem('userPhone', resData.user.phone || ''); 
//         localStorage.setItem('userPhoto', googleUser.photoURL || '');

//         // ৪. সেফটি চেক মেনে সাকসেস স্টেট ট্রিগার করা
//         if (typeof onSignupSuccess === 'function') {
//           onSignupSuccess(resData.user.name); 
//         } else if (typeof onSwitchToLogin === 'function') {
//           onSwitchToLogin(); 
//         } else {
//           window.location.href = '/'; 
//         }
//       } else {
//         alert(`${resData.message || "Google registration failed at database backend."}`);
//       }
//     } catch (err) {
//       console.error("❌ Google Signup Error:", err);
//       alert("Google registration was cancelled or failed.");
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
//         <p style={subtitleStyle}>Initialize Your Secure Safety Profile</p>

//         <form onSubmit={handleSignup} style={formStyle}>
//           {/* ১. নাম ইনপুট */}
//           <div style={{ textAlign: 'left' }}>
//             <label style={labelStyle}>Full Name</label>
//             <div style={inputWrapperStyle}>
//               <input 
//                 type="text" 
//                 placeholder="John Doe" 
//                 autoComplete="off"
//                 value={name} 
//                 onChange={(e) => setName(e.target.value)} 
//                 style={inputStyle} 
//               />
//             </div>
//           </div>

//           {/* ২. ইমেল ইনপুট */}
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

//           {/* ৩. ফোন ইনপুট */}
//           <div style={{ textAlign: 'left' }}>
//             <label style={labelStyle}>Contact Mobile Line</label>
//             <div style={inputWrapperStyle}>
//               <input 
//                 type="tel" 
//                 placeholder="e.g., 01XXXXXXXXX" 
//                 autoComplete="off"
//                 value={phone} 
//                 onChange={(e) => setPhone(e.target.value)} 
//                 style={inputStyle} 
//               />
//             </div>
//           </div>

//           {/* ৪. পাসওয়ার্ড ইনপুট */}
//           <div style={{ textAlign: 'left' }}>
//             <label style={labelStyle}>Secure Password</label>
//             <div style={inputWrapperStyle}>
//               <input 
//                 type={showPassword ? "text" : "password"} 
//                 placeholder="••••••••" 
//                 autoComplete="new-password"
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

//           {/* ৫. কনফার্ম পাসওয়ার্ড ইনপুট */}
//           <div style={{ textAlign: 'left' }}>
//             <label style={labelStyle}>Confirm Password</label>
//             <div style={inputWrapperStyle}>
//               <input 
//                 type={showConfirmPassword ? "text" : "password"} 
//                 placeholder="••••••••" 
//                 autoComplete="new-password"
//                 value={confirmPassword} 
//                 onChange={(e) => setConfirmPassword(e.target.value)} 
//                 style={{ ...inputStyle, paddingRight: '55px' }}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 style={eyeButtonStyle}
//               >
//                 <span style={{ fontSize: '11px', fontWeight: '700', color: '#00bfa5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//                   {showConfirmPassword ? "Hide" : "Show"}
//                 </span>
//               </button>
//             </div>
//           </div>

//           <div style={checkboxContainerStyle}>
//             <input type="checkbox" id="terms" required style={{ cursor: 'pointer', accentColor: '#00bfa5' }} />
//             <label htmlFor="terms" style={checkboxLabelStyle}>
//               I accept the regulatory <span style={linkStyle}>Terms of Service</span> and verified <span style={linkStyle}>Privacy Framework</span>
//             </label>
//           </div>

//           <button type="submit" disabled={loading} style={submitButtonStyle}>
//             {loading ? "Registering..." : "Initialize Security Profile"}
//           </button>
//         </form>

//         <div style={orDividerContainer}>
//           <div style={lineStyle}></div>
//           <span style={orSpanStyle}>Secure Integration Options</span>
//           <div style={lineStyle}></div>
//         </div>

//         {/* SOCIAL SIGNUP BUTTONS */}
//         <div style={socialContainerStyle}>
//           {/* গুগল বাটন (টাইপ 'button' দেওয়া হয়েছে যাতে ফর্ম সাবমিট না হয় এবং ক্লিক হ্যান্ডলার যুক্ত করা হয়েছে) */}
//           <button 
//             type="button" 
//             onClick={handleGoogleSignup} 
//             disabled={loading} 
//             style={{ ...socialButtonStyle, opacity: loading ? 0.7 : 1 }}
//           >
//             <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" style={socialIconStyle} /> 
//             {loading ? "Processing..." : "Continue with Google Identity"}
//           </button>
          
//           {/* ফেসবুক বাটন সাময়িকভাবে হাইড করা হলো */}
//           {/* <button type="button" style={socialButtonStyle}>
//             <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" style={socialIconStyle} /> Continue with Facebook Secure OpenID
//           </button>
//           */}
//         </div>

//         <div style={switchTextStyle}>
//           Already have an operational profile? <span onClick={onSwitchToLogin} style={loginLinkStyle}>Login</span>
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
// const checkboxContainerStyle = { display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '2px', textAlign: 'left' };
// const checkboxLabelStyle = { fontSize: '12.5px', color: '#64748b', cursor: 'pointer', lineHeight: '1.4', fontWeight: '500' };
// const linkStyle = { color: '#00bfa5', fontWeight: '700', cursor: 'pointer', textDecoration: 'none' };
// const submitButtonStyle = { padding: '14px', background: '#00bfa5', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '6px', boxShadow: '0 4px 12px rgba(0, 191, 165, 0.15)', transition: 'background-color 0.2s' };
// const orDividerContainer = { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px 0 20px 0' };
// const lineStyle = { flex: 1, height: '1px', backgroundColor: '#edf2f7' };
// const orSpanStyle = { padding: '0 14px', color: '#94a3b8', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' };
// const socialContainerStyle = { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' };
// const socialButtonStyle = { width: '100%', padding: '12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontWeight: '600', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', transition: 'background-color 0.2s' };
// const socialIconStyle = { width: '16px', height: '16px' };
// const switchTextStyle = { marginTop: '20px', fontSize: '13.5px', color: '#64748b', fontWeight: '500' };
// const loginLinkStyle = { color: '#00bfa5', fontWeight: '700', cursor: 'pointer' };
// const backButtonStyle = { background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', marginTop: '20px', cursor: 'pointer', textDecoration: 'none', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' };

// export default SignupView;












// src/pages/SignupView.jsx
import React, { useState } from 'react';
// 🔐 ফায়ারবেস ইমপোর্ট করা হলো
import { auth, googleProvider, signInWithPopup } from '../firebase';

// 🚀 onLoginSuccess প্রপসটি যুক্ত করা হয়েছে ড্যাশবোর্ডে সরাসরি যাওয়ার জন্য
function SignupView({ onSignupSuccess, onLoginSuccess, onSwitchToLogin, onBackToHome }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // 📝 ম্যানুয়াল ফর্ম সাইনআপ ইন্টিগ্রেশন
  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!name || !phone || !email || !password || !confirmPassword) {
      alert("Please populate all required fields to initialize your account registration.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Registration mismatch: Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      alert("Security restriction: Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';
      
      const response = await fetch(`${backendUrl}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email, password }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        alert(`Account registered successfully for ${name}.`);
        
        // 💾 টোকেন ও আইডি সেভ করা হলো
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.user.id);
        
        // প্রোফাইল পেজে ডেটা সিঙ্ক করার প্যারামিটার
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPhone', phone); 
        
        // 🚀 সরাসরি ড্যাশবোর্ডে রিডাইরেক্ট করা (লগইন পেজে না পাঠিয়ে)
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess(name); 
        } else if (typeof onSignupSuccess === 'function') {
          onSignupSuccess(name); 
        } else {
          window.location.href = '/'; 
        }
        
      } else {
        alert(`Registration Failed: ${resData.message || "An unresolved server anomaly occurred."}`);
      }
    } catch (err) {
      console.error("❌ Signup Error:", err);
      alert("Network Service Interrupted. Unable to connect to backend authentication server.");
    } finally {
      setLoading(false);
    }
  };

  // 🌐 গুগল সোশ্যাল সাইনআপ (লগইন) ইন্টিগ্রেশন
  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      // ১. ফায়ারবেস গুগল পপআপ ওপেন করা
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
        alert(`Account linked successfully! Welcome, ${resData.user.name}.`);
        
        // ৩. লোকাল স্টোরেজে ডেটা সেভ
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.user.id);
        localStorage.setItem('userName', resData.user.name);
        localStorage.setItem('userEmail', resData.user.email);
        localStorage.setItem('userPhone', resData.user.phone || ''); 
        localStorage.setItem('userPhoto', googleUser.photoURL || '');

        // 🚀 ৪. সরাসরি ড্যাশবোর্ডে রিডাইরেক্ট করা
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess(resData.user.name); 
        } else if (typeof onSignupSuccess === 'function') {
          onSignupSuccess(resData.user.name); 
        } else {
          window.location.href = '/'; 
        }
      } else {
        alert(`${resData.message || "Google registration failed at database backend."}`);
      }
    } catch (err) {
      console.error("❌ Google Signup Error:", err);
      alert("Google registration was cancelled or failed.");
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
        <p style={subtitleStyle}>Initialize Your Secure Safety Profile</p>

        <form onSubmit={handleSignup} style={formStyle}>
          {/* ১. নাম ইনপুট */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Full Name</label>
            <div style={inputWrapperStyle}>
              <input 
                type="text" 
                placeholder="John Doe" 
                autoComplete="off"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                style={inputStyle} 
              />
            </div>
          </div>

          {/* ২. ইমেল ইনপুট */}
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

          {/* ৩. ফোন ইনপুট */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Contact Mobile Line</label>
            <div style={inputWrapperStyle}>
              <input 
                type="tel" 
                placeholder="e.g., 01XXXXXXXXX" 
                autoComplete="off"
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                style={inputStyle} 
              />
            </div>
          </div>

          {/* ৪. পাসওয়ার্ড ইনপুট */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Secure Password</label>
            <div style={inputWrapperStyle}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                autoComplete="new-password"
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

          {/* ৫. কনফার্ম পাসওয়ার্ড ইনপুট */}
          <div style={{ textAlign: 'left' }}>
            <label style={labelStyle}>Confirm Password</label>
            <div style={inputWrapperStyle}>
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="••••••••" 
                autoComplete="new-password"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                style={{ ...inputStyle, paddingRight: '55px' }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={eyeButtonStyle}
              >
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#00bfa5', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {showConfirmPassword ? "Hide" : "Show"}
                </span>
              </button>
            </div>
          </div>

          <div style={checkboxContainerStyle}>
            <input type="checkbox" id="terms" required style={{ cursor: 'pointer', accentColor: '#00bfa5' }} />
            <label htmlFor="terms" style={checkboxLabelStyle}>
              I accept the regulatory <span style={linkStyle}>Terms of Service</span> and verified <span style={linkStyle}>Privacy Framework</span>
            </label>
          </div>

          <button type="submit" disabled={loading} style={submitButtonStyle}>
            {loading ? "Registering..." : "Initialize Security Profile"}
          </button>
        </form>

        <div style={orDividerContainer}>
          <div style={lineStyle}></div>
          <span style={orSpanStyle}>Secure Integration Options</span>
          <div style={lineStyle}></div>
        </div>

        {/* SOCIAL SIGNUP BUTTONS */}
        <div style={socialContainerStyle}>
          {/* গুগল বাটন */}
          <button 
            type="button" 
            onClick={handleGoogleSignup} 
            disabled={loading} 
            style={{ ...socialButtonStyle, opacity: loading ? 0.7 : 1 }}
          >
            <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" style={socialIconStyle} /> 
            {loading ? "Processing..." : "Continue with Google Identity"}
          </button>
          
          {/* ফেসবুক বাটন সাময়িকভাবে হাইড করা হলো */}
          {/* <button type="button" style={socialButtonStyle}>
            <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook" style={socialIconStyle} /> Continue with Facebook Secure OpenID
          </button>
          */}
        </div>

        <div style={switchTextStyle}>
          Already have an operational profile? <span onClick={onSwitchToLogin} style={loginLinkStyle}>Login</span>
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
const checkboxContainerStyle = { display: 'flex', alignItems: 'flex-start', gap: '8px', marginTop: '2px', textAlign: 'left' };
const checkboxLabelStyle = { fontSize: '12.5px', color: '#64748b', cursor: 'pointer', lineHeight: '1.4', fontWeight: '500' };
const linkStyle = { color: '#00bfa5', fontWeight: '700', cursor: 'pointer', textDecoration: 'none' };
const submitButtonStyle = { padding: '14px', background: '#00bfa5', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', marginTop: '6px', boxShadow: '0 4px 12px rgba(0, 191, 165, 0.15)', transition: 'background-color 0.2s' };
const orDividerContainer = { display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '30px 0 20px 0' };
const lineStyle = { flex: 1, height: '1px', backgroundColor: '#edf2f7' };
const orSpanStyle = { padding: '0 14px', color: '#94a3b8', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' };
const socialContainerStyle = { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' };
const socialButtonStyle = { width: '100%', padding: '12px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '13px', fontWeight: '600', color: '#334155', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', transition: 'background-color 0.2s' };
const socialIconStyle = { width: '16px', height: '16px' };
const switchTextStyle = { marginTop: '20px', fontSize: '13.5px', color: '#64748b', fontWeight: '500' };
const loginLinkStyle = { color: '#00bfa5', fontWeight: '700', cursor: 'pointer' };
const backButtonStyle = { background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', marginTop: '20px', cursor: 'pointer', textDecoration: 'none', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' };

export default SignupView;