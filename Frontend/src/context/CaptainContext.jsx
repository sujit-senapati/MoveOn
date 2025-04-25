import React, { createContext, useContext, useState } from 'react';

// Create the CaptainContext
export const CaptainDataContext = createContext();

// // Create a provider component
// export const useCaptain = () => {
//     const context = useContext(CaptainDataContext);
//     if(!context) {
//         throw new Error('useCapatain must be used within a CaptainProvider');
//     }

//     return context;
// };


const CaptainContext = ({ children }) => {
    const [captain,setCaptain] = useState(null); // Initialize captain state to null
    const [isLoading, setIsLoading] = useState(false); // Initialize loading state to false
    const [error, setError] = useState(null); // Initialize error state to null

    const updateCaptain = (captainData) => {
        setCaptain(captainData); // Update the captain state with the provided data
    }

    const value = {
        captain,
        isLoading,
        error,
        setCaptain,
        setIsLoading,
        setError
    }

    return (
        <CaptainDataContext.Provider value={value}>
            {children} {/* Render the children components within the provider */}
        </CaptainDataContext.Provider>
    )
}

export default CaptainContext; // Export the CaptainContext component for use in other parts of the application