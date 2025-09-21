import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";


export default function MapPicker({ coords, onSelect }) {
    const mapContainerRef = useRef(null);
    const [ready, setReady] = useState(false);
  
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: "AIzaSyDkML5bh7060CKrHB8Jv2t1L9REzY4-oPc", // replace with env variable
    });
  
    // Ensure container exists before rendering GoogleMap
    useEffect(() => {
      if (mapContainerRef.current) setReady(true);
    }, [mapContainerRef.current]);
  
    if (loadError) return <div>Error loading map</div>;
    if (!isLoaded || !ready) return <div>Loading map...</div>;
  
    const handleMapClick = (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
  
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          onSelect({
            coords: { lat, lng },
            address: results[0].formatted_address,
          });
        }
      });
    };
  
    return (
      <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }}>
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={coords}
          zoom={12}
          onClick={handleMapClick}
        >
          {coords && <Marker position={coords} />}
        </GoogleMap>
      </div>
    );
}