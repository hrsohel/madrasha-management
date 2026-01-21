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

export const saveDraftStudent = async (data) => {
    try {
        let body = data;
        let headers = {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        };

        // Check if data should be FormData (if it contains a File)
        const hasFile = data.student?.profileImage instanceof File;
        if (hasFile) {
            const formData = new FormData();
            // Append nested objects as stringified JSON for backend parseField to handle
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    if (typeof data[key] === 'object' && !(data[key] instanceof File)) {
                        formData.append(key, JSON.stringify(data[key]));
                    } else {
                        formData.append(key, data[key]);
                    }
                }
            }
            // Multer specifically looks for 'profileImage' field
            if (data.student?.profileImage instanceof File) {
                formData.append('profileImage', data.student.profileImage);
            }
            body = formData;
            delete headers['Content-Type']; // Let browser set boundary
        }

        const response = await axios.post(
            `${API_BASE_URL}/api/v1/students/students/save-draft`,
            body,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Error saving draft student:", error);
        throw error;
    }
};

export const getDraftStudents = async () => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/v1/students/students/get-drafts`,
            {
                headers: getAuthHeader()
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching draft students:", error);
        throw error;
    }
};

export const updateDraftStudent = async (id, data) => {
    try {
        let body = data;
        let headers = {
            ...getAuthHeader(),
            'Content-Type': 'application/json'
        };

        const hasFile = data.profileImage instanceof File || data.student?.profileImage instanceof File;
        if (hasFile) {
            const formData = new FormData();
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    if (typeof data[key] === 'object' && !(data[key] instanceof File)) {
                        formData.append(key, JSON.stringify(data[key]));
                    } else {
                        formData.append(key, data[key]);
                    }
                }
            }
            if (data.profileImage instanceof File) {
                formData.append('profileImage', data.profileImage);
            } else if (data.student?.profileImage instanceof File) {
                formData.append('profileImage', data.student.profileImage);
            }
            body = formData;
            delete headers['Content-Type'];
        }

        const response = await axios.put(
            `${API_BASE_URL}/api/v1/students/students/update-draft/${id}`,
            body,
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating draft student:", error);
        throw error;
    }
};

export const deleteDraft = async (id) => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}/api/v1/students/students/delete-draft/${id}`,
            {
                headers: getAuthHeader()
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting draft:", error);
        throw error;
    }
};
