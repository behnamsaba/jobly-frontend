import axios from 'axios';

// Base URL for the API, defaulting to localhost if environment variable is not set.
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/**
 * JoblyApi Class.
 * 
 * This class provides static methods for interacting with the backend API.
 * It abstracts the details of making HTTP requests and handles common operations like
 * token management and error processing.
 */
class JoblyApi {
    // Token for authenticating API requests.
    static token;

    /**
     * Generic request method for all API calls.
     * 
     * @param {string} endpoint - The API endpoint to call.
     * @param {object} data - The payload for POST/PATCH requests.
     * @param {string} method - HTTP method (default: 'get').
     * @returns {Promise<object>} - The data from the API response.
     * @throws {Array<string>} - An array of error messages from the API response.
     */
    static async request(endpoint, data = {}, method = 'get') {
        console.debug('API Call:', endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = (method === 'get') ? data : {};

        try {
            const response = await axios({ url, method, data, params, headers });
            return response.data;
        } catch (err) {
            console.error('API Error:', err.response);
            const message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // API endpoint methods below:

    static async getCompany(handle) {
        const res = await this.request(`companies/${handle}`);
        return res.company;
    }

    static async getCurrentUser(username) {
        const res = await this.request(`users/${username}`);
        return res.user;
    }

    static async getAllCompanies(data) {
        const res = await this.request('companies', data);
        return res.companies;
    }

    static async jobsByCompany(handle) {
        const res = await this.request(`companies/${handle}`);
        return res.company;
    }

    static async getAllJobs(title) {
        const res = await this.request('jobs', { title });
        return res.jobs;
    }

    static async applyToJob(username, id) {
        const res = await this.request(`users/${username}/jobs/${id}`, {}, 'post');
        console.log(res);
    }

    static async signUp(data) {
        const res = await this.request(`auth/register`, data, 'post');
        return res.token;
    }

    static async login(data) {
        const res = await this.request(`auth/token`, data, 'post');
        return res.token;
    }

    static async saveProfile(username, data) {
        const res = await this.request(`users/${username}`, data, 'patch');
        console.log(res.user);
        return res.user;
    }
}

export default JoblyApi;
