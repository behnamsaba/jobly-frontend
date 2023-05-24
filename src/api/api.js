import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

lass JoblyApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = 'get') {
        console.debug('API Call:', endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };
        const params = method === 'get' ? data : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error('API Error:', err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get details on a company by handle. */

    static async getCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    // get username

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }
    //get all companies (filtered by name if not undefined)
    static async getAllCompanies(data) {
        let res = await this.request('companies', data);
        return res.companies;
    }

    //get job associated with company
    static async jobsByCompany(handle) {
        let res = await this.request(`companies/${handle}`);
        return res.company;
    }

    //get all jobs (filtered by title if not undefined)
    static async getAllJobs(title) {
        let res = await this.request('jobs', { title });
        return res.jobs;
    }

    // apply

    static async applyToJob(username, id) {
        let res = await this.request(`users/${username}/jobs/${id}`, {}, 'post');
        console.log(res);

    }

    //sign up

    static async signUp(data) {
        let res = await this.request(`auth/register`, data, 'post');
        return res.token;
    }

    //login

    static async login(data) {
        let res = await this.request(`auth/token`, data, 'post');
        return res.token;
    }

    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, 'patch');
        console.log(res.user);
        return res.user;
    }
}


export default JoblyApi;
