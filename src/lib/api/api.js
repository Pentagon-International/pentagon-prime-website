import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL; 


const apiCallProtected = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
});

export { apiCallProtected, baseURL };
