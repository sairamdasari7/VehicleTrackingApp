// VehicleMap.js
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const VehicleMap = () => {
  const [vehicleData, setVehicleData] = useState([]);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    // Fetch vehicle data from your API
    fetch('http://localhost:5000/api/vehicle-data') // Replace with your API endpoint
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON
      })
      .then(data => {
        setVehicleData(data);
        if (data.length > 0) {
          setCenter({ lat: data[0].latitude, lng: data[0].longitude });
        }
      })
      .catch(error => console.error('Error fetching vehicle data:', error));
  }, []);

  const path = vehicleData.map(point => ({
    lat: point.latitude,
    lng: point.longitude
  }));

  return (
    <LoadScript
      googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY" // Replace with your API key
    >
      <GoogleMap
        mapContainerStyle={{ height: "100vh", width: "100%" }}
        center={center}
        zoom={12}
      >
        {vehicleData.length > 0 && (
          <>
            <Marker
              position={center}
              icon="http://maps.google.com/mapfiles/ms/icons/car.png" // Replace with your vehicle icon
            />
            <Polyline
              path={path}
              options={{ strokeColor: "#FF0000", strokeOpacity: 1.0, strokeWeight: 2 }}
            />
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default VehicleMap;
