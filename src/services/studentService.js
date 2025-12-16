import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAuthHeader = () => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
    }
    return {};
};

export const updateStudentFullDetails = async (id, data) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/api/v1/students/students/update-student/${id}`,
            data,
            {
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating student full details:", error);
        throw error;
    }
};
