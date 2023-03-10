import axios, * as others from 'axios';

export default class api {
    constructor(baseUrl = "https://mturk.onrender.com") {        
        this.instance =
            axios.create({
                baseURL: baseUrl,
                timeout: 2500,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "DELETE, POST, PUT, GET, OPTIONS",
                    "Access-Control-Allow-Headers":
                        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            },
        })
    }
}