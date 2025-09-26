import React, { useEffect, useState } from 'react'

const LocationSearchPanel = ({
    setPanelOpen,
    setVehiclePanel,
    activeInput,
    setPickupLocation,
    setDestinationLocation,
    pickupLocation,
    destinationLocation,
    setPickup,
    setDestination,
    query,
    setQuery,
    vehiclePanel
}) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (query) handleSearch(query);
        }, 300); // 300ms delay
        return () => clearTimeout(timer);
    }, [query]);

    //sample array of locations
    // const locations = [
    //     "24B, Near Bustand, Daspur, West Bengal",
    //     "56A, Near Mall, Kolkata, West Bengal",
    //     "12C, Near Park Street, Kolkata, West Bengal",
    //     "78D, Near Airport, Kolkata, West Bengal",
    //     "90E, Near Station, Howrah, West Bengal"
    // ]

    //function to handle the searching on the panel
    const handleSearch = async (q) => {
        if (!q) return setResults([]);
        try {
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}`;
            const response = await fetch(url);
            const data = await response.json();
            setResults(data);
        } catch (err) {
            console.error(err);
        }
    };

    //function for 
    const handleSelect = (place) => {
        //coordinates = longitue, lattitude
        const coords = {lat: parseFloat(place.lat), lng: parseFloat(place.lon)};

        if (activeInput === 'pickup') {
            setPickupLocation(coords);
            setPickup(place.display_name) //repopulating the input field with the value provided in the search results
        } else if (activeInput === 'destination') {
            setDestinationLocation(coords);
            setDestination(place.display_name)
        }

        // setPanelOpen(false);
        // setVehiclePanel(true);
        setQuery('');
        setResults([]);
    };

    return (
        <div className="flex flex-col justify-between h-screen bg-gray-50">
            {/* Search Results Panel */}
            <div className="flex flex-col gap-2 p-4">
                {results.length > 0 && (
                    <ul className="max-h-64 overflow-auto bg-white border border-gray-200 rounded-lg shadow-md divide-y divide-gray-100">
                        {results.map((place, idx) => (
                            <li
                                key={idx}
                                onClick={() => handleSelect(place)}
                                className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors"
                            >
                                <i className="ri-map-pin-2-fill text-gray-500"></i>
                                <span className="text-sm text-gray-800">{place.display_name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Continue Button */}
            <div className="sticky bottom-0 bg-gray-50 p-4">
                <button
                    onClick={() => {
                        setVehiclePanel(true);
                        setPanelOpen(false);
                    }}
                    className="w-full text-center bg-black text-white py-3 rounded-lg font-medium shadow-md hover:bg-gray-900 active:scale-95 transition-transform"
                >
                    Continue
                </button>
            </div>
        </div>

    )
}

export default LocationSearchPanel
