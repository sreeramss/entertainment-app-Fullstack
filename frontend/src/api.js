// api.js
import axios from 'axios';

let API;

export const initializeAPI = () => {
    const token = localStorage.getItem("token");
    const defaultOptions = {
        baseURL: 'https://movie-app-backend-oqma.onrender.com',
        headers: {
            "Content-Type": "application/json"
        },
    };

    if (token !== null) {
        defaultOptions.headers.Authorization = `Bearer ${token}`;
    }

    API = axios.create(defaultOptions);
};

export const fetchBookmarks = () => API.get('/api/bookmarks/');
export const addBookmark = (bookmark) => API.post('/api/bookmarks', bookmark);
export const deleteBookmark = (id) => API.delete(`/api/bookmarks/${id}`);
export const deleteBookmarkByMovieId = (movieId) => API.delete(`/api/bookmarks/movie/${movieId}`);

export const loginAPICall = (payload) => axios.post('https://movie-app-backend-oqma.onrender.com/login', payload);
export const signupAPICall = (payload) => axios.post('https://movie-app-backend-oqma.onrender.com/signup', payload);
