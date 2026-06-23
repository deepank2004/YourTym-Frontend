import axios from "axios";

const API =
axios.create({

    baseURL:
    "https://your-tym-backend.vercel.app/api"
});

export default API;