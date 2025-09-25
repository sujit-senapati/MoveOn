import { useMap } from "react-leaflet";
import { useEffect } from "react";

// FitBounds.jsx
function FitBounds({ pickupLocation, destinationLocation, trigger }) {
    const map = useMap();

    useEffect(() => {
        if (
            pickupLocation &&
            destinationLocation &&
            typeof pickupLocation.lat === 'number' &&
            typeof pickupLocation.lng === 'number' &&
            typeof destinationLocation.lat === 'number' &&
            typeof destinationLocation.lng === 'number'
        ) {
            const bounds = [
                [pickupLocation.lat, pickupLocation.lng],
                [destinationLocation.lat, destinationLocation.lng]
            ];
            map.fitBounds(bounds, {
                padding: [100, 100],
                animate: true,
                duration: 1
            });
            setTimeout(() => {
                map.panBy([0, 70]); // [x, y] in pixels; negative y moves north
            }, 400); // Wait for fitBounds animation to finish
        }
    }, [pickupLocation, destinationLocation, trigger, map]);
}

export default FitBounds;