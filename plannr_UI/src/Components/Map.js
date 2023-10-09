import React, { useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '50vh',  // 50% of the viewport height
};

const center = {
  lat: -37.8136,  // Coordinates for Melbourne
  lng: 144.9631,
};

function MapComponent() {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* You can add markers, overlays, and other features here */}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;

