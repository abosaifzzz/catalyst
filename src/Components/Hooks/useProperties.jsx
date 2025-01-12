import { useState, useEffect } from "react";
import axios from "axios";

export const useProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProperties = async () => {
        try {
            const response = await axios.get("https://test.catalystegy.com/public/api/properties");
            const fetchedProperties = response.data; // Adjust the range if needed
            setProperties(fetchedProperties);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    useEffect(() => {
        // Fetch properties data from the API


        fetchProperties();
    }, []);

    return { properties, loading, fetchProperties };
};
