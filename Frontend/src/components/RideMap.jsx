import { useEffect, useState } from "react";
import axios from "axios"; // or fetch
import polyline from '@mapbox/polyline'

function RideMap({ pickupLocation, destinationLocation, onRouteFetched }) {
    const [route, setRoute] = useState([]);

    useEffect(() => {
        const fetchRoute = async () => {
            if (
                pickupLocation?.lat &&
                pickupLocation?.lng &&
                destinationLocation?.lat &&
                destinationLocation?.lng
            ) {
                try {
                    const res = await axios.post(
                        `${import.meta.env.VITE_BASE_URL}/ride/find-route`,
                        {
                            start: pickupLocation,
                            end: destinationLocation
                        }
                    );
                    // Assuming backend sends GeoJSON line coordinates
                    const coordinates = polyline.decode(res.data.routes[0].geometry); // returns [[lat, lng], ...]
                    // Convert [lng, lat] -> [lat, lng] for Leaflet
                    const latLngs = coordinates.map(([lng, lat]) => [lat, lng]);
                    setRoute(latLngs);
                    // send route back to map
                    onRouteFetched(coordinates);
                } catch (err) {
                    console.error("Error fetching route:", err);
                }
            }
        };

        fetchRoute();
    }, [pickupLocation, destinationLocation]);

    return null;
}

export default RideMap;
