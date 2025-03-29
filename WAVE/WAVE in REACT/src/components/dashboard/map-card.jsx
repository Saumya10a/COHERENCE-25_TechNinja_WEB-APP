// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Loader } from "lucide-react"

// export function MapCard({ title, apiKey }) {
//   const mapRef = useRef(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     // If no API key is provided, show an error
//     // if (!apiKey || apiKey === "AIzaSyB8fS17q0DunrLCQ7Zh1cveLl8G8tBoijw") {
//     //   setError(
//     //     "Google Maps API key is missing. Please add your API key in the settings."
//     //   );
//     //   setLoading(false);
//     //   return;
//     // }
//     const apiKey = "AIzaSyB8fS17q0DunrLCQ7Zh1cveLl8G8tBoijw";
//     // Create a simple iframe with Google Maps embed
//     // This is a fallback solution if the Google Maps JavaScript API doesn't load
//     if (mapRef.current) {
//       const iframe = document.createElement("iframe")
//       iframe.src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=New+York&zoom=12&maptype=roadmap`
//       iframe.width = "100%"
//       iframe.height = "100%"
//       iframe.style.border = "0"
//       iframe.allowFullscreen = true
//       iframe.loading = "lazy"
//       iframe.referrerPolicy = "no-referrer-when-downgrade"

//       mapRef.current.innerHTML = ""
//       mapRef.current.appendChild(iframe)
//       setLoading(false)
//     }
//   }, [apiKey])

//   return (
//     <Card className="col-span-2">
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {loading && (
//           <div className="flex h-[400px] items-center justify-center">
//             <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
//           </div>
//         )}
//         {error && (
//           <div className="flex h-[400px] items-center justify-center">
//             <div className="text-center text-muted-foreground">
//               <p>{error}</p>
//               <p className="mt-2 text-sm">Please add your Google Maps API key in the settings.</p>
//             </div>
//           </div>
//         )}
//         <div
//           ref={mapRef}
//           className="h-[400px] w-full rounded-md"
//           style={{ display: loading || error ? "none" : "block" }}
//         />
//       </CardContent>
//     </Card>
//   )
// }

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Loader } from "lucide-react";

// export function MapCard({ title }) {
//   const mapRef = useRef(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [location, setLocation] = useState(null);

//   // const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Store API key in .env file

//   useEffect(() => {
//     // if (!apiKey) {
//     //   setError(
//     //     "Google Maps API key is missing. Please configure your settings."
//     //   );
//     //   setLoading(false);
//     //   return;
//     // }

//     // Get user's current location
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });

//         const script = document.createElement("script");
//         script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8fS17q0DunrLCQ7Zh1cveLl8G8tBoijw&callback=initMap`;
//         script.async = true;
//         script.defer = true;
//         document.body.appendChild(script);

//         script.onload = () => {
//           if (window.google) {
//             const map = new window.google.maps.Map(mapRef.current, {
//               center: { lat: latitude, lng: longitude },
//               zoom: 14,
//             });

//             new window.google.maps.Marker({
//               position: { lat: latitude, lng: longitude },
//               map,
//               title: "Your Location",
//             });

//             setLoading(false);
//           } else {
//             setError("Failed to load Google Maps.");
//           }
//         };

//         script.onerror = () => {
//           setError("Failed to load Google Maps.");
//           setLoading(false);
//         };
//       },
//       (err) => {
//         setError("Unable to fetch location. Please enable location services.");
//         setLoading(false);
//       }
//     );

//     return () => {
//       document.body
//         .querySelectorAll("script[src*='googleapis']")
//         .forEach((el) => el.remove());
//     };
//   }, []);

//   return (
//     <Card className="col-span-2">
//       <CardHeader>
//         <CardTitle>{title}</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {loading && (
//           <div className="flex h-[400px] items-center justify-center">
//             <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
//           </div>
//         )}
//         {error && (
//           <div className="flex h-[400px] items-center justify-center">
//             <div className="text-center text-muted-foreground">
//               <p>{error}</p>
//               <p className="mt-2 text-sm">Please enable location access.</p>
//             </div>
//           </div>
//         )}
//         <div ref={mapRef} className="h-[400px] w-full rounded-md bg-gray-200" />
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from "lucide-react";

export function MapCard({ title }) {
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationData, setLocationData] = useState(null);

  // const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Use API key from .env

  useEffect(() => {
    // if (!apiKey) {
    //   setError(
    //     "Google Maps API key is missing. Please configure your settings."
    //   );
    //   setLoading(false);
    //   return;
    // }

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        // Load Google Maps script dynamically
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB8fS17q0DunrLCQ7Zh1cveLl8G8tBoijw&callback=initMap&libraries=places`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
          if (window.google) {
            const map = new window.google.maps.Map(mapRef.current, {
              center: { lat: latitude, lng: longitude },
              zoom: 14,
            });

            new window.google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map,
              title: "Your Location",
            });

            setLoading(false);
          } else {
            setError("Failed to load Google Maps.");
          }
        };

        script.onerror = () => {
          setError("Failed to load Google Maps.");
          setLoading(false);
        };

        // Fetch location details (address & nearby places)
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB8fS17q0DunrLCQ7Zh1cveLl8G8tBoijw`
        );
        const data = await res.json();
        if (data.results.length > 0) {
          setLocationData(data.results[0].formatted_address);
        }
      },
      (err) => {
        setError("Unable to fetch location. Please enable location services.");
        setLoading(false);
      }
    );

    return () => {
      document.body
        .querySelectorAll("script[src*='googleapis']")
        .forEach((el) => el.remove());
    };
  }, []);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex h-[400px] items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
        {error && (
          <div className="flex h-[400px] items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>{error}</p>
              <p className="mt-2 text-sm">Please enable location access.</p>
            </div>
          </div>
        )}
        {!loading && locationData && (
          <div className="mb-4 text-center text-gray-700">
            <p>
              <strong>Address:</strong> {locationData}
            </p>
            <p>
              <strong>Latitude:</strong> {location?.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {location?.longitude}
            </p>
          </div>
        )}
        <div ref={mapRef} className="h-[400px] w-full rounded-md bg-gray-200" />
      </CardContent>
    </Card>
  );
}
