import axios from "axios";

// Function to get the CSRF token from the meta tag
const getCsrfToken = () => {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    return token;
};

const errorHandler = (error) => {
    if (error.response && error.response.status === 422) {
        return { ...error.response.data, status: false }
    } else {
        return { status: false, error: error }
    }
}

const api = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCsrfToken()
    }
});

export const getRecords = async (url, page, q) => {
    try {
        const response = await api.get(url, {
            params: {
                page: page,
                q: q
            }
        })

        return {
            status: true,
            records: response.data.records,
            meta: response.data.meta,
            hasMore: response.data.meta.total_pages !== page
        }
    } catch (error) {
        errorHandler(error)
    }
};

export const getAllRecords = async (url, q) => {
    try {
        const response = await api.get(url,  {
            params: {
                q: q
            }
        })

        return {
            status: true,
            records: response.data.records
        }
    } catch (error) {
        errorHandler(error)
    }
};

export const createRecords = async (url, payload) => {
    try {
        const response = await api.post(url, payload)

        return {
            status: true,
            message: response.data.message
        }
    } catch (error) {
        return errorHandler(error)
    }
};

export const updateRecords = async (url, payload) => {
    try {
        await api.patch(url, payload)

        return {
            status: true
        }
    } catch (error) {
        return errorHandler(error)
    }
};

export const deleteRecords = async (url, payload) => {
    try {
        const response = await api.delete(url, {data: payload})

        return {
            status: true,
            message: response.data.message
        }
    } catch (error) {
        return errorHandler(error)
    }
};