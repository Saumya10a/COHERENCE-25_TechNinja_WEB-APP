import { GoogleMap, LoadScript, TrafficLayer } from "@react-google-maps/api";
import { useState, useEffect } from "react";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

export default function LiveTrafficMap() {
  const [center, setCenter] = useState(null); // Start with null to avoid flickering
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      {loading ? (
        <p>Loading map...</p>
      ) : center ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={12}
          center={center}
        >
          <TrafficLayer />
        </GoogleMap>
      ) : (
        <p>Unable to fetch location.</p>
      )}
    </LoadScript>
  );
}
