import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
    (config) => {
        const userStr = localStorage.getItem('fne_user');
        if (userStr) {
            const user = JSON.parse(userStr);
            if (user.token) {
                config.headers.Authorization = `Bearer ${user.token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs globales (ex: 401 Unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Check current path to redirect to the right login
            const currentPath = window.location.pathname;
            const isAdminPath = currentPath.startsWith('/admin');

            localStorage.removeItem('fne_user');

            // Avoid infinite loops if already on login page
            if (!currentPath.includes('/login') && !currentPath.includes('/admin')) {
                window.location.href = isAdminPath ? '/admin' : '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);

/**
 * Helper: get auth token from localStorage
 */
const getToken = (): string | null => {
    const userStr = localStorage.getItem('fne_user');
    if (userStr) {
        const user = JSON.parse(userStr);
        return user.token || null;
    }
    return null;
};

/**
 * Download a file (PDF, etc.) with authentication
 */
export const apiDownload = async (endpoint: string, filename: string): Promise<void> => {
    const token = getToken();
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Erreur lors du téléchargement');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
};

/**
 * Open a PDF in a new tab (with authentication)
 */
export const apiOpenPdf = async (endpoint: string): Promise<void> => {
    const token = getToken();
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Erreur lors du chargement du PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
};

export default api;
