import axios from "axios";

export const getRecords = async (url, page, q) => {
    try {
        const response = await axios.get(url, {
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
        return { status: false, error: error }
    }
};