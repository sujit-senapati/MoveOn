import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents, useMap, Polyline } from 'react-leaflet';
import FitBounds from '../components/FitBounds'
import RideMap from './RideMap';


import pickupImg from '../assets/icons/pickup.png';  // relative to Map.jsx
import destinationImg from '../assets/icons/destination.png';  // relative to Map.jsx

const pickupIcon = new L.Icon({
  iconUrl: pickupImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const destinationIcon = new L.Icon({
    iconUrl: destinationImg,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});


const Map = ({
    pickupLocation,
    destinationLocation,
    vehiclePanel
}) => {

    const [currentPosition, setCurrentPosition] = useState([22.5726, 88.3639]); // default fallback (Kolkata)
    const [locationLoaded, setLocationLoaded] = useState(false);
    const [route, setRoute] = useState([])  //polyline coordinates




    useEffect(() => {
        // Get user's current location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition([latitude, longitude]);
                    setLocationLoaded(true);
                },
                (err) => {
                    console.error('Error getting location:', err);
                    setLocationLoaded(true); // still render map with fallback
                }
            );
        } else {
            console.error('Geolocation not supported');
            setLocationLoaded(true);
        }
    }, []);

    if (!locationLoaded) return <div>Loading map...</div>;

    return (
        <MapContainer
            center={pickupLocation || currentPosition} //default center position is currentPosition which is set above inside useEffect
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}        // remove default zoom buttons
            attributionControl={false} // remove attribution text
            dragging={true}
            doubleClickZoom={false}
            scrollWheelZoom={true}     // allow desktop users to zoom with scroll
            touchZoom={true} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {pickupLocation && (
                <Marker position={pickupLocation} icon={pickupIcon}>
                    <Popup>Pickup</Popup>
                </Marker>
            )}
            {destinationLocation && (
                <Marker position={destinationLocation} icon={destinationIcon}>
                    <Popup>Desination</Popup>
                </Marker>
            )}
            <FitBounds
                pickupLocation={pickupLocation}
                destinationLocation={destinationLocation}
                trigger={vehiclePanel}
            />

            {/* drawing the route */}
            {route.length > 0 && <Polyline positions={route} color='black' />}

            <RideMap
                pickupLocation={pickupLocation}
                destinationLocation={destinationLocation}
                onRouteFetched={setRoute}  //save polyline coordinates
            />
        </MapContainer>
    );
};

export default Map;
