// // src/pages/ContactsPage.jsx
// import React, { useState, useEffect } from 'react';

// function ContactsPage({ theme = 'light' }) {
//   const [contacts, setContacts] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   // 🎨 থিম কনফিগারেশন
//   const isDark = theme === 'dark';
//   const colors = {
//     pageBg: isDark ? '#0b1321' : '#f8fafc',
//     cardBg: isDark ? '#1a2436' : '#ffffff',
//     textMain: isDark ? '#f1f5f9' : '#0f172a',
//     textMuted: isDark ? '#94a3b8' : '#64748b',
//     border: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
//     tableHeaderBg: isDark ? '#0f172a' : '#f8fafc',
//     tableHover: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc',
//     primary: '#10b981',
//     primaryHover: '#059669',
//     danger: '#ef4444',
//     dangerBg: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2',
//     inputBg: isDark ? '#0f172a' : '#ffffff',
//     inputBorder: isDark ? '#334155' : '#cbd5e1',
//     modalOverlay: 'rgba(15, 23, 42, 0.6)',
//   };

//   // 🔒 লোকাল স্টোরেজ থেকে অথেনটিকেশন টোকেন নেওয়া
//   const token = localStorage.getItem('token') || null;
  
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     role: 'Family'
//   });

//   const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

//   // 🔄 ১. কন্টাক্ট ফেচ করা (টোকেন দিয়ে রিকোয়েস্ট পাঠানো হচ্ছে)
//   const fetchContacts = () => {
//     if (!token) return setContacts([]);

//     fetch(`${backendUrl}/api/contacts`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Server error");
//         return res.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) setContacts(data);
//         else if (data && Array.isArray(data.data)) setContacts(data.data);
//         else setContacts([]);
//       })
//       .catch((err) => {
//         console.error("❌ Load failed:", err);
//         setContacts([]); 
//       });
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, [backendUrl, token]);

//   // 📝 ২. কন্টাক্ট সেভ করা
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.name || !formData.phone || !formData.email) {
//       alert("⚠️ Please fill in all fields!");
//       return;
//     }
//     if (!token) {
//       alert("🚨 Access denied. Please log in again to add contacts.");
//       return;
//     }

//     fetch(`${backendUrl}/api/contacts`, {
//       method: 'POST',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => res.json())
//       .then((resData) => {
//         if (resData.success) {
//           setFormData({ name: '', phone: '', email: '', role: 'Family' });
//           setShowModal(false);
//           if (resData.data && Array.isArray(resData.data)) setContacts(resData.data);
//           else fetchContacts();
//         } else {
//           alert(`🚨 Failed: ${resData.message}`);
//         }
//       })
//       .catch(() => alert("🚨 Something went wrong."));
//   };

//   // 🗑️ ৩. কন্টাক্ট মুছে ফেলা (আইডি এরর এবং ইউআরএল প্যারামিটার ফিক্সড)
//   const handleDelete = (id) => {
//     if (!token) return;

//     if (window.confirm("Are you sure you want to remove this emergency contact?")) {
//       fetch(`${backendUrl}/api/contacts/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       })
//         .then((res) => res.json())
//         .then((resData) => {
//           if (resData.success && Array.isArray(resData.data)) {
//             setContacts(resData.data); 
//           } else {
//             alert("🚨 Failed to delete contact.");
//           }
//         })
//         .catch((err) => console.error("❌ Delete error:", err));
//     }
//   };

//   // 🏷️ রোল অনুযায়ী ব্যাজ কালার জেনারেট করার ফাংশন
//   const getRoleStyle = (role) => {
//     switch(role) {
//       case 'Family': return { bg: isDark ? 'rgba(59, 130, 246, 0.15)' : '#eff6ff', color: isDark ? '#60a5fa' : '#2563eb' };
//       case 'Friend': return { bg: isDark ? 'rgba(139, 92, 246, 0.15)' : '#f5f3ff', color: isDark ? '#a78bfa' : '#7c3aed' };
//       case 'Authority / Helpline': return { bg: isDark ? 'rgba(239, 68, 68, 0.15)' : '#fef2f2', color: isDark ? '#f87171' : '#dc2626' };
//       default: return { bg: isDark ? 'rgba(148, 163, 184, 0.15)' : '#f8fafc', color: colors.textMuted };
//     }
//   };

//   return (
//     <div style={{ padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: colors.pageBg, minHeight: '100vh', transition: 'background-color 0.3s' }}>
      
//       <style>{`
//         .contact-row { transition: background-color 0.2s; }
//         .contact-row:hover { background-color: ${colors.tableHover} !important; }
//         .custom-input:focus { outline: 2px solid ${colors.primary}; outline-offset: -1px; border-color: transparent !important; }
//       `}</style>

//       <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
//         {/* 🏷️ HEADER SECTION */}
//         <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
//           <div>
//             <h2 style={{ color: colors.textMain, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800' }}>Trusted Contacts</h2>
//             <p style={{ color: colors.textMuted, margin: 0, fontSize: '14px', fontWeight: '500' }}>Manage the people who get notified during an SOS broadcast.</p>
//           </div>
//           <button 
//             onClick={() => setShowModal(true)}
//             style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: colors.primary, color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: 'background-color 0.2s', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' }}
//             onMouseOver={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
//             onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.primary}
//           >
//             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"></path></svg>
//             Add Contact
//           </button>
//         </div>
        
//         {/* 📊 DATA TABLE CARD */}
//         <div style={{ overflowX: 'auto', backgroundColor: colors.cardBg, borderRadius: '16px', border: `1px solid ${colors.border}`, boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 25px -5px rgba(15, 23, 42, 0.05)' }}>
//           <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', whiteSpace: 'nowrap' }}>
//             <thead>
//               <tr style={{ backgroundColor: colors.tableHeaderBg, borderBottom: `1px solid ${colors.border}` }}>
//                 <th style={{ padding: '18px 24px', color: colors.textMuted, fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact Name</th>
//                 <th style={{ padding: '18px 24px', color: colors.textMuted, fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</th>
//                 <th style={{ padding: '18px 24px', color: colors.textMuted, fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</th>
//                 <th style={{ padding: '18px 24px', color: colors.textMuted, fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Relation</th>
//                 <th style={{ padding: '18px 24px', color: colors.textMuted, fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {!Array.isArray(contacts) || contacts.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" style={{ padding: '60px 20px', textAlign: 'center' }}>
//                     <div style={{ width: '48px', height: '48px', backgroundColor: isDark ? '#1e293b' : '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', color: colors.textMuted }}>
//                       <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
//                     </div>
//                     <p style={{ margin: 0, color: colors.textMain, fontWeight: '600', fontSize: '15px' }}>No contacts found</p>
//                     <p style={{ margin: '4px 0 0 0', color: colors.textMuted, fontSize: '13px' }}>Add people you trust to be notified in emergencies.</p>
//                   </td>
//                 </tr>
//               ) : (
//                 contacts.map((contact) => (
//                   <tr key={contact._id} className="contact-row" style={{ borderBottom: `1px solid ${colors.border}` }}>
//                     <td style={{ padding: '18px 24px', fontWeight: '600', color: colors.textMain, fontSize: '14.5px' }}>{contact.name}</td>
//                     <td style={{ padding: '18px 24px', color: colors.textMuted, fontSize: '14px', fontFamily: 'monospace', letterSpacing: '0.5px' }}>{contact.phone}</td>
//                     <td style={{ padding: '18px 24px', color: colors.textMuted, fontSize: '14px' }}>{contact.email || '—'}</td>
//                     <td style={{ padding: '18px 24px' }}>
//                       <span style={{ backgroundColor: getRoleStyle(contact.role).bg, color: getRoleStyle(contact.role).color, padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>
//                         {contact.role}
//                       </span>
//                     </td>
//                     <td style={{ padding: '18px 24px', textAlign: 'right' }}>
//                       <button 
//                         onClick={() => handleDelete(contact._id)}
//                         style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', color: colors.danger, backgroundColor: colors.dangerBg, border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
//                         title="Delete Contact"
//                       >
//                         <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* 🪟 ADD CONTACT MODAL */}
//         {showModal && (
//           <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: colors.modalOverlay, backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px', boxSizing: 'border-box' }}>
//             <div style={{ backgroundColor: colors.cardBg, padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '420px', border: `1px solid ${colors.border}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
              
//               <h3 style={{ margin: '0 0 24px 0', color: colors.textMain, fontSize: '20px', fontWeight: '800' }}>Add New Contact</h3>
              
//               <form onSubmit={handleSubmit}>
//                 <div style={{ marginBottom: '18px' }}>
//                   <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
//                   <input className="custom-input" type="text" placeholder="e.g. John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, backgroundColor: colors.inputBg, color: colors.textMain, borderRadius: '10px', boxSizing: 'border-box', fontSize: '14px', transition: 'outline 0.2s' }} />
//                 </div>
                
//                 <div style={{ marginBottom: '18px' }}>
//                   <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number</label>
//                   <input className="custom-input" type="text" placeholder="e.g. +88017XXXXXXXX" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, backgroundColor: colors.inputBg, color: colors.textMain, borderRadius: '10px', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'monospace' }} />
//                 </div>

//                 <div style={{ marginBottom: '18px' }}>
//                   <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
//                   <input className="custom-input" type="email" placeholder="e.g. hello@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, backgroundColor: colors.inputBg, color: colors.textMain, borderRadius: '10px', boxSizing: 'border-box', fontSize: '14px' }} />
//                 </div>
                
//                 <div style={{ marginBottom: '28px' }}>
//                   <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Relation Type</label>
//                   <select className="custom-input" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, backgroundColor: colors.inputBg, color: colors.textMain, borderRadius: '10px', boxSizing: 'border-box', fontSize: '14px', cursor: 'pointer' }}>
//                     <option value="Family">Family</option>
//                     <option value="Friend">Friend</option>
//                     <option value="Authority / Helpline">Authority / Helpline</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div style={{ display: 'flex', gap: '12px' }}>
//                   <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', border: `1px solid ${colors.inputBorder}`, backgroundColor: 'transparent', color: colors.textMain, borderRadius: '10px', cursor: 'pointer', fontWeight: '600', transition: 'background-color 0.2s' }}>Cancel</button>
//                   <button type="submit" style={{ flex: 1, padding: '12px', border: 'none', backgroundColor: colors.primary, color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', transition: 'background-color 0.2s' }}>Save Contact</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default ContactsPage;














// src/pages/ContactsPage.jsx
import React, { useState, useEffect } from 'react';

function ContactsPage({ theme = 'light' }) {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🎨 থিম কনফিগারেশন
  const isDark = theme === 'dark';
  const colors = {
    pageBg: isDark ? '#0b1321' : '#f8fafc',
    cardBg: isDark ? '#1a2436' : '#ffffff',
    textMain: isDark ? '#f1f5f9' : '#0f172a',
    textMuted: isDark ? '#94a3b8' : '#64748b',
    border: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
    tableHeaderBg: isDark ? '#0f172a' : '#f8fafc',
    tableHover: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc',
    primary: '#10b981',
    primaryHover: '#059669',
    danger: '#ef4444',
    dangerBg: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2',
    inputBg: isDark ? '#0f172a' : '#ffffff',
    inputBorder: isDark ? '#334155' : '#cbd5e1',
    modalOverlay: 'rgba(15, 23, 42, 0.6)',
  };

  // 🔒 লোকাল স্টোরেজ থেকে অথেনটিকেশন টোকেন নেওয়া
  const token = localStorage.getItem('token') || null;
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'Family'
  });

  const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';

  // 🔄 ১. কন্টাক্ট ফেচ করা (টোকেন দিয়ে রিকোয়েস্ট পাঠানো হচ্ছে)
  const fetchContacts = () => {
    if (!token) return setContacts([]);

    fetch(`${backendUrl}/api/contacts`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setContacts(data);
        else if (data && Array.isArray(data.data)) setContacts(data.data);
        else setContacts([]);
      })
      .catch((err) => {
        console.error("❌ Load failed:", err);
        setContacts([]); 
      });
  };

  useEffect(() => {
    fetchContacts();
  }, [backendUrl, token]);

  // 📝 ২. কন্টাক্ট সেভ করা
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert("⚠️ Please fill in all fields!");
      return;
    }
    if (!token) {
      alert("🚨 Access denied. Please log in again to add contacts.");
      return;
    }

    fetch(`${backendUrl}/api/contacts`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          setFormData({ name: '', phone: '', email: '', role: 'Family' });
          setShowModal(false);
          if (resData.data && Array.isArray(resData.data)) setContacts(resData.data);
          else fetchContacts();
        } else {
          alert(`🚨 Failed: ${resData.message}`);
        }
      })
      .catch(() => alert("🚨 Something went wrong."));
  };

  // 🗑️ ৩. কন্টাক্ট মুছে ফেলা (আইডি এরর এবং ইউআরএল প্যারামিটার ফিক্সড)
  const handleDelete = (id) => {
    if (!token) return;

    if (window.confirm("Are you sure you want to remove this emergency contact?")) {
      fetch(`${backendUrl}/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
        .then((res) => res.json())
        .then((resData) => {
          if (resData.success && Array.isArray(resData.data)) {
            setContacts(resData.data); 
          } else {
            alert("🚨 Failed to delete contact.");
          }
        })
        .catch((err) => console.error("❌ Delete error:", err));
    }
  };

  // 🏷️ রোল অনুযায়ী ব্যাজ কালার জেনারেট করার ফাংশন
  const getRoleStyle = (role) => {
    switch(role) {
      case 'Family': return { bg: isDark ? 'rgba(59, 130, 246, 0.15)' : '#eff6ff', color: isDark ? '#60a5fa' : '#2563eb' };
      case 'Friend': return { bg: isDark ? 'rgba(139, 92, 246, 0.15)' : '#f5f3ff', color: isDark ? '#a78bfa' : '#7c3aed' };
      case 'Authority / Helpline': return { bg: isDark ? 'rgba(239, 68, 68, 0.15)' : '#fef2f2', color: isDark ? '#f87171' : '#dc2626' };
      default: return { bg: isDark ? 'rgba(148, 163, 184, 0.15)' : '#f8fafc', color: colors.textMuted };
    }
  };

  return (
    <div className="contacts-page-container" style={{ padding: '40px 20px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: colors.pageBg, minHeight: '100vh', transition: 'all 0.3s' }}>
      
      {/* 📱 Mobile Responsive Advanced CSS */}
      <style>{`
        .contact-row { transition: background-color 0.2s; }
        .contact-row:hover { background-color: ${colors.tableHover} !important; }
        .custom-input:focus { outline: 2px solid ${colors.primary}; outline-offset: -1px; border-color: transparent !important; }
        
        @media (max-width: 768px) {
          .contacts-page-container {
            padding: 20px 12px !important;
          }
          .header-section {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 16px !important;
          }
          .add-btn {
            width: 100% !important;
            justify-content: center !important;
            padding: 14px !important;
          }
          .table-card {
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
          .responsive-table thead {
            display: none !important;
          }
          .responsive-table, .responsive-table tbody, .responsive-table tr, .responsive-table td {
            display: block !important;
            width: 100% !important;
          }
          .contact-row {
            background-color: ${colors.cardBg} !important;
            border: 1px solid ${colors.border} !important;
            border-radius: 14px !important;
            padding: 16px !important;
            margin-bottom: 16px !important;
            box-shadow: ${isDark ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 8px rgba(15, 23, 42, 0.04)'} !important;
          }
          .contact-cell {
            padding: 8px 0 !important;
            border: none !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            white-space: normal !important;
          }
          .contact-cell::before {
            content: attr(data-label);
            font-weight: 700;
            color: ${colors.textMuted};
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .contact-cell.actions-cell {
            justify-content: flex-end !important;
            border-top: 1px dashed ${colors.border} !important;
            margin-top: 10px !important;
            padding-top: 12px !important;
          }
          .contact-cell.actions-cell::before {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .modal-box {
            padding: 24px 20px !important;
            border-radius: 20px !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* 🏷️ HEADER SECTION */}
        <div className="header-section" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h2 style={{ color: colors.textMain, margin: '0 0 8px 0', fontSize: '24px', fontWeight: '800' }}>Trusted Contacts</h2>
            <p style={{ color: colors.textMuted, margin: 0, fontSize: '14px', fontWeight: '500' }}>Manage the people who get notified during an SOS broadcast.</p>
          </div>
          <button 
            className="add-btn"
            onClick={() => setShowModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: colors.primary, color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: 'background-color 0.2s', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = colors.primaryHover}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = colors.primary}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"></path></svg>
            Add Contact
          </button>
        </div>
        
        {/* 📊 DATA TABLE CARD */}
        <div className="table-card" style={{ overflowX: 'auto', backgroundColor: colors.cardBg, borderRadius: '16px', border: `1px solid ${colors.border}`, boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 25px -5px rgba(15, 23, 42, 0.05)' }}>
          <table className="responsive-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', whiteSpace: 'nowrap' }}>
            <thead>
              <tr style={{ backgroundColor: colors.tableHeaderBg, borderBottom: `1px solid ${colors.border}` }}>
                <th style={{ padding: '18px 24px', color: colors.textMuted, fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Contact Name</th>
                <th style={{ padding: '18px 24px', color: colors.textMuted, fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</th>
                <th style={{ padding: '18px 24px', color: colors.textMuted, fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</th>
                <th style={{ padding: '18px 24px', color: colors.textMuted, fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Relation</th>
                <th style={{ padding: '18px 24px', color: colors.textMuted, fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!Array.isArray(contacts) || contacts.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '60px 20px', textAlign: 'center' }}>
                    <div style={{ width: '48px', height: '48px', backgroundColor: isDark ? '#1e293b' : '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px auto', color: colors.textMuted }}>
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <p style={{ margin: 0, color: colors.textMain, fontWeight: '600', fontSize: '15px' }}>No contacts found</p>
                    <p style={{ margin: '4px 0 0 0', color: colors.textMuted, fontSize: '13px' }}>Add people you trust to be notified in emergencies.</p>
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact._id} className="contact-row" style={{ borderBottom: `1px solid ${colors.border}` }}>
                    <td className="contact-cell" data-label="Contact Name" style={{ padding: '18px 24px', fontWeight: '600', color: colors.textMain, fontSize: '14.5px' }}>
                      <span>{contact.name}</span>
                    </td>
                    <td className="contact-cell" data-label="Phone" style={{ padding: '18px 24px', color: colors.textMuted, fontSize: '14px', fontFamily: 'monospace', letterSpacing: '0.5px' }}>
                      <span>{contact.phone}</span>
                    </td>
                    <td className="contact-cell" data-label="Email Address" style={{ padding: '18px 24px', color: colors.textMuted, fontSize: '14px' }}>
                      <span>{contact.email || '—'}</span>
                    </td>
                    <td className="contact-cell" data-label="Relation" style={{ padding: '18px 24px' }}>
                      <span style={{ backgroundColor: getRoleStyle(contact.role).bg, color: getRoleStyle(contact.role).color, padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>
                        {contact.role}
                      </span>
                    </td>
                    <td className="contact-cell actions-cell" style={{ padding: '18px 24px', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleDelete(contact._id)}
                        style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', color: colors.danger, backgroundColor: colors.dangerBg, border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}
                        title="Delete Contact"
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 🪟 ADD CONTACT MODAL */}
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: colors.modalOverlay, backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px', boxSizing: 'border-box' }}>
            <div className="modal-box" style={{ backgroundColor: colors.cardBg, padding: '32px', borderRadius: '24px', width: '100%', maxWidth: '420px', border: `1px solid ${colors.border}`, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', transition: 'all 0.3s' }}>
              
              <h3 style={{ margin: '0 0 24px 0', color: colors.textMain, fontSize: '20px', fontWeight: '800' }}>Add New Contact</h3>
              
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
                  <input className="custom-input" type="text" placeholder="e.g. John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, backgroundColor: colors.inputBg, color: colors.textMain, borderRadius: '10px', boxSizing: 'border-box', fontSize: '14px', transition: 'outline 0.2s' }} />
                </div>
                
                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number</label>
                  <input className="custom-input" type="text" placeholder="e.g. +88017XXXXXXXX" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, backgroundColor: colors.inputBg, color: colors.textMain, borderRadius: '10px', boxSizing: 'border-box', fontSize: '14px', fontFamily: 'monospace' }} />
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                  <input className="custom-input" type="email" placeholder="e.g. hello@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, backgroundColor: colors.inputBg, color: colors.textMain, borderRadius: '10px', boxSizing: 'border-box', fontSize: '14px' }} />
                </div>
                
                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: '700', color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Relation Type</label>
                  <select className="custom-input" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ width: '100%', padding: '12px 14px', border: `1px solid ${colors.inputBorder}`, backgroundColor: colors.inputBg, color: colors.textMain, borderRadius: '10px', boxSizing: 'border-box', fontSize: '14px', cursor: 'pointer' }}>
                    <option value="Family">Family</option>
                    <option value="Friend">Friend</option>
                    <option value="Authority / Helpline">Authority / Helpline</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', border: `1px solid ${colors.inputBorder}`, backgroundColor: 'transparent', color: colors.textMain, borderRadius: '10px', cursor: 'pointer', fontWeight: '600', transition: 'background-color 0.2s' }}>Cancel</button>
                  <button type="submit" style={{ flex: 1, padding: '12px', border: 'none', backgroundColor: colors.primary, color: 'white', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', transition: 'background-color 0.2s' }}>Save Contact</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ContactsPage;