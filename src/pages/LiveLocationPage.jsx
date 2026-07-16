
// // src/pages/LiveLocationPage.jsx
// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// let DefaultIcon = L.icon({
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41]
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// // ম্যাপ সেন্টার ফিক্সার - এটি সবসময় লোকেশনকে ফোকাসে রাখবে
// function MapCenterFixer({ position }) {
//   const map = useMap();
//   useEffect(() => {
//     if (position) {
//       map.setView(position, 16);
//     }
//   }, [position, map]);
//   return null;
// }

// function LiveLocationPage() {
//   const [locationData, setLocationData] = useState({ 
//     area: 'Syncing Location...', latitude: 23.8812, longitude: 90.4071, updatedAt: 'Now' 
//   });
//   const [syncing, setSyncing] = useState(false);
//   const backendUrl = 'https://rescue-her-backend.onrender.com';

//   const handleLocationUpdate = async (lat, lng) => {
//     setSyncing(true);
//     try {
//       // Nominatim এপিআই থেকে এলাকা বের করা
//       const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
//       const geo = await res.json();
//       const area = geo.display_name || `📍 (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

//       // ব্যাকএন্ডে আপডেট
//       await fetch(`${backendUrl}/api/location/update`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ latitude: lat, longitude: lng, area })
//       });

//       setLocationData({ area, latitude: lat, longitude: lng, updatedAt: new Date().toLocaleTimeString() });
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSyncing(false);
//     }
//   };

//   const triggerGPSUpdate = () => {
//     if (!navigator.geolocation) return alert("Geolocation not supported.");
//     setSyncing(true);

//     const options = {
//       enableHighAccuracy: true,
//       timeout: 20000,
//       maximumAge: 0
//     };

//     navigator.geolocation.getCurrentPosition(
//       (pos) => handleLocationUpdate(pos.coords.latitude, pos.coords.longitude),
//       (err) => {
//         setSyncing(false);
//         alert("GPS signal weak, but we have pinned your approximate location.");
//         if(err.coords) handleLocationUpdate(err.coords.latitude, err.coords.longitude);
//       },
//       options
//     );
//   };

//   return (
//     <div style={{ 
//       padding: '20px', 
//       background: '#fff', 
//       borderRadius: '16px', 
//       border: '1px solid #e2e8f0',
//       height: '100%',
//       display: 'flex',
//       flexDirection: 'column'
//     }}>
//       {/* 🗺️ ম্যাপ কন্টেইনার ফিক্স: Z-Index 0 সেট করা হয়েছে যাতে মেনুর ওপর না আসে */}
//       <div style={{ 
//         height: '220px', 
//         width: '100%', 
//         borderRadius: '12px', 
//         overflow: 'hidden',
//         position: 'relative',
//         zIndex: 0
//       }}>
//         <MapContainer 
//           center={[locationData.latitude, locationData.longitude]} 
//           zoom={16} 
//           style={{ height: '100%', width: '100%' }}
//         >
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={[locationData.latitude, locationData.longitude]} />
//           <MapCenterFixer position={[locationData.latitude, locationData.longitude]} />
//         </MapContainer>
//       </div>

//       <button 
//         onClick={triggerGPSUpdate} disabled={syncing}
//         style={{ 
//           width: '100%', 
//           padding: '12px', 
//           marginTop: '15px', 
//           background: '#059669', 
//           color: '#fff', 
//           border: 'none', 
//           borderRadius: '10px', 
//           cursor: 'pointer',
//           fontSize: '12px',
//           fontWeight: 'bold'
//         }}
//       >
//         {syncing ? "📡 Mapping..." : "🎯 PIN LIVE LOCATION"}
//       </button>

//       <div style={{ marginTop: '10px' }}>
//         <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}><strong>Area:</strong> {locationData.area}</p>
//       </div>
//     </div>
//   );
// }

// export default LiveLocationPage;










// src/pages/LiveLocationPage.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// ম্যাপ সেন্টার ফিক্সার - এটি সবসময় লোকেশনকে ফোকাসে রাখবে
function MapCenterFixer({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 16);
    }
  }, [position, map]);
  return null;
}

function LiveLocationPage() {
  const [locationData, setLocationData] = useState({ 
    area: 'Syncing Location...', latitude: 23.8812, longitude: 90.4071, updatedAt: 'Now' 
  });
  const [syncing, setSyncing] = useState(false);
  
  // 🔗 ব্যাকএন্ড লিংক ঠিক করা হয়েছে
  const backendUrl = import.meta.env.VITE_API_URL || 'https://rescue-her-back-1.onrender.com';
  
  // 🔐 লোকাল স্টোরেজ থেকে সিকিউরিটি টোকেন নেওয়া হলো
  const token = localStorage.getItem('token');

  const handleLocationUpdate = async (lat, lng) => {
    setSyncing(true);
    try {
      // Nominatim এপিআই থেকে এলাকা বের করা
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const geo = await res.json();
      const area = geo.display_name || `📍 (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

      // 🛡️ ব্যাকএন্ডে আপডেট (টোকেন সহ)
      if (token) {
        await fetch(`${backendUrl}/api/location/update`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // পাহারাদারের জন্য অ্যাক্সেস কার্ড
          },
          body: JSON.stringify({ latitude: lat, longitude: lng, area })
        });
      } else {
        console.warn("User not authenticated, location saved locally only.");
      }

      setLocationData({ area, latitude: lat, longitude: lng, updatedAt: new Date().toLocaleTimeString() });
    } catch (err) {
      console.error("Location update failed:", err);
    } finally {
      setSyncing(false);
    }
  };

  const triggerGPSUpdate = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    setSyncing(true);

    const options = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => handleLocationUpdate(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        setSyncing(false);
        alert("GPS signal weak, but we have pinned your approximate location.");
        if(err.coords) handleLocationUpdate(err.coords.latitude, err.coords.longitude);
      },
      options
    );
  };

  return (
    <div style={{ 
      padding: '20px', 
      background: '#fff', 
      borderRadius: '16px', 
      border: '1px solid #e2e8f0',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 🗺️ ম্যাপ কন্টেইনার ফিক্স: Z-Index 0 সেট করা হয়েছে যাতে মেনুর ওপর না আসে */}
      <div style={{ 
        height: '220px', 
        width: '100%', 
        borderRadius: '12px', 
        overflow: 'hidden',
        position: 'relative',
        zIndex: 0
      }}>
        <MapContainer 
          center={[locationData.latitude, locationData.longitude]} 
          zoom={16} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[locationData.latitude, locationData.longitude]} />
          <MapCenterFixer position={[locationData.latitude, locationData.longitude]} />
        </MapContainer>
      </div>

      <button 
        onClick={triggerGPSUpdate} disabled={syncing}
        style={{ 
          width: '100%', 
          padding: '12px', 
          marginTop: '15px', 
          background: '#059669', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '10px', 
          cursor: 'pointer',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        {syncing ? "📡 Mapping..." : "🎯 PIN LIVE LOCATION"}
      </button>

      <div style={{ marginTop: '10px' }}>
        <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}><strong>Area:</strong> {locationData.area}</p>
      </div>
    </div>
  );
}

export default LiveLocationPage;