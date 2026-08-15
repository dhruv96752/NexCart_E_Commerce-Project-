const API_BASE_URL = 'https://nexcart-backend-n56a.onrender.com/api';

const api = {
    async request(path, options = {}) {
        const token = localStorage.getItem('nexcartToken');

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 10000);

        try {
            const response = await fetch(API_BASE_URL + path, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token
                        ? { Authorization: `Bearer ${token}` }
                        : {})
                },
                signal: controller.signal,
                ...options
            });

            const data = await response
                .json()
                .catch(() => ({
                    success: false,
                    message: 'Server returned an invalid response'
                }));

            if (!response.ok) {
                throw new Error(
                    data.message || 'Request failed'
                );
            }

            return data;

        } finally {
            clearTimeout(timer);
        }
    },

    get(path) {
        return this.request(path);
    },

    post(path, body) {
        return this.request(path, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    },

    put(path, body) {
        return this.request(path, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    },

    delete(path) {
        return this.request(path, {
            method: 'DELETE'
        });
    }
};