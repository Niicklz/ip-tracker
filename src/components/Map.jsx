import React from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon-2x.png";
import "./Map.css";

export const Map = ({ lat, lng }) => {
  const iconMark = new L.icon({ iconUrl: markerIcon });
 
  return (
    <MapContainer
      key={"joseMap"}
      center={[lat, lng]}
      zoom={18}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker

        position={[lat, lng]}
        icon={iconMark}
        
      ></Marker>
    </MapContainer>
  );
};
