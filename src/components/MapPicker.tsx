"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icon issue in Next.js/React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const RESTAURANT_LOC = { lat: -8.0364233, lng: 111.414764 }; // Soto Ayam Pringgondani

export default function MapPicker({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<L.LatLng>(new L.LatLng(RESTAURANT_LOC.lat, RESTAURANT_LOC.lng));
  const markerRef = useRef<L.Marker>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    onLocationSelect(position.lat, position.lng);
  }, []);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const latlng = marker.getLatLng();
          setPosition(latlng);
          onLocationSelect(latlng.lat, latlng.lng);
        }
      },
    }),
    [onLocationSelect]
  );

  function LocationClick() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onLocationSelect(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  if (!mounted) {
    return <div className="h-64 w-full rounded-xl bg-gray-200 animate-pulse flex items-center justify-center text-gray-500 font-semibold border border-gray-300">Memuat Peta...</div>;
  }

  return (
    <div className="h-64 w-full rounded-xl overflow-hidden shadow-sm relative z-0">
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%", zIndex: 10 }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
        />
        <LocationClick />
      </MapContainer>
    </div>
  );
}
