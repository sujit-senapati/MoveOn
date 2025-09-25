import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMapEvents, useMap } from 'react-leaflet';
import FitBounds from '../components/FitBounds'

const Map = ({
    pickupLocation,
    destinationLocation,
    vehiclePanel
}) => {

    const [currentPosition, setCurrentPosition] = useState([22.5726, 88.3639]); // default fallback (Kolkata)
    const [locationLoaded, setLocationLoaded] = useState(false);

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
                <Marker position={pickupLocation}>
                    <Popup>Pickup</Popup>
                </Marker>
            )}
            {destinationLocation && (
                <Marker position={destinationLocation}>
                    <Popup>Desination</Popup>
                </Marker>
            )}
            <FitBounds
                pickupLocation={pickupLocation}
                destinationLocation={destinationLocation}
                trigger={vehiclePanel}
            />
        </MapContainer>
    );
};

export default Map;
