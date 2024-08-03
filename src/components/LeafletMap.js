import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dummy data
const vehicleData = [
  { latitude: 51.505, longitude: -0.09, timestamp: "2024-08-03T10:00:00Z" },
  { latitude: 51.515, longitude: -0.1, timestamp: "2024-08-03T10:05:00Z" },
  { latitude: 51.525, longitude: -0.11, timestamp: "2024-08-03T10:10:00Z" },
];

const LeafletMap = () => {
  useEffect(() => {
    // Check if map already exists
    if (!document.getElementById('map')._leaflet_id) {
      const map = L.map('map').setView([51.505, -0.09], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.polyline(
        vehicleData.map(point => [point.latitude, point.longitude]),
        { color: 'blue' }
      ).addTo(map);

      // Create a custom icon using FontAwesome SVG
      const vehicleIcon = L.divIcon({
        className: 'leaflet-fontawesome-icon',
        html: `<span><i class="fas fa-car"></i></span>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      L.marker([vehicleData[0].latitude, vehicleData[0].longitude], { icon: vehicleIcon }).addTo(map)
        .bindPopup('Vehicle Start')
        .openPopup();

      L.marker([vehicleData[vehicleData.length - 1].latitude, vehicleData[vehicleData.length - 1].longitude], { icon: vehicleIcon }).addTo(map)
        .bindPopup('Vehicle End')
        .openPopup();
      
      // Cleanup function to remove map on component unmount
      return () => {
        map.remove();
      };
    }
  }, []);

  return <div id="map" style={{ height: "80vh", width: "100%" }}></div>;
};

export default LeafletMap;
