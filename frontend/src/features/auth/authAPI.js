import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8008",
})


API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `bearer ${token}`
    }
    return config
})



export const userLoginAPI = (data) => API.post("/user/login", data)
export const userSignupAPI = (data) => API.post("/user/register", data);
export const adminLoginAPI = (data) => API.post("/admin/login", data)

export const getUsersAPI = () => API.get("/admin/users");
export const deleteUserAPI = (id) => API.delete(`/admin/users/${id}`);
export const toggleUserAPI = (id) => API.patch(`/admin/users/${id}`);