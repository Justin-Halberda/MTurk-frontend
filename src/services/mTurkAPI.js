import API from "./api";

export default class mTurkAPI {

    constructor() {
        this.api = new API();
    }

    /**
     * Write to database
     * @param {*} payload The payload
     * @returns the created instance
     */
    async write(payload) {
        const body = payload;
        const res = await this.api.instance.post("/api/write", body);
        return res.data.data;
    }
}