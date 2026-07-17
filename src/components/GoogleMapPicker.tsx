"use client";

import { useState, useCallback } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const RESTAURANT_LOC = { lat: -7.9734, lng: 111.4522 };
const libraries: ("geometry")[] = ["geometry"];

export default function GoogleMapPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  // IMPORTANT: Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [markerPos, setMarkerPos] = useState(RESTAURANT_LOC);

  const onMarkerDragEnd = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setMarkerPos({ lat, lng });
        onLocationSelect(lat, lng);
      }
    },
    [onLocationSelect]
  );

  const onMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setMarkerPos({ lat, lng });
        onLocationSelect(lat, lng);
      }
    },
    [onLocationSelect]
  );

  if (loadError) return <div className="h-[300px] w-full rounded-xl flex items-center justify-center bg-red-50 text-red-500 font-bold border border-red-200 text-center px-4">Error memuat peta. Periksa API Key Google Maps Anda.</div>;
  if (!isLoaded) return <div className="h-[300px] w-full rounded-xl bg-gray-200 animate-pulse flex items-center justify-center text-gray-500 font-semibold border border-gray-300">Memuat Google Maps...</div>;

  return (
    <div className="h-[300px] w-full rounded-xl overflow-hidden shadow-sm relative z-0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPos}
        zoom={14}
        onClick={onMapClick}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        <Marker 
          position={markerPos} 
          draggable={true} 
          onDragEnd={onMarkerDragEnd} 
        />
      </GoogleMap>
    </div>
  );
}
