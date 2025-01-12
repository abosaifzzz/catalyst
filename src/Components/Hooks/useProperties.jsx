import { useState, useEffect } from "react";
import axios from "axios";

export const useProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProperties = async () => {
        try {
            const response = await axios.get("https://test.catalystegy.com/public/api/properties");
            const fetchedProperties = response.data;
            setProperties(fetchedProperties);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    useEffect(() => {


        fetchProperties();
    }, []);

    return { properties, loading, fetchProperties };
};
