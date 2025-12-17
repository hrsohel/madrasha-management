import axios from 'axios';

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/madrasa-settings`;

const getAuthHeader = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
    }
    return {};
};

export const getMadrasaSettings = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching madrasa settings:", error);
        throw error;
    }
};

export const updateMadrasaSettings = async (settingsData) => {
    try {
        const response = await axios.patch(API_URL, settingsData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating madrasa settings:", error);
        throw error;
    }
};

export const createMadrasaSettings = async (settingsData) => {
    try {
        const response = await axios.post(API_URL, settingsData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating madrasa settings:", error);
        throw error;
    }
};
