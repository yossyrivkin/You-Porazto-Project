import axios from 'axios';

const mode = process.env.NODE_ENV
const urlMode = mode === 'development' ? REACT_APP_DEV_URL : mode === 'production' ? REACT_APP_PROD_URL : null
const API = axios.create({ baseURL: urlMode });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchStand = (id) => API.get(`/stands/${id}`);
export const fetchStands = (page) => API.get(`/stands?page=${page}`);
export const fetchStandsByCreator = (name) => API.get(`/stands/creator?name=${name}`);
export const fetchStandsBySearch = (searchQuery) => API.get(`/stands/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);
export const createStand = (newStand) => API.post('/stands', newStand);
export const likeStand = (id) => API.patch(`/stands/${id}/likeStand`);
export const comment = (value, id) => API.post(`/stands/${id}/commentStand`, { value });
export const updateStand = (id, updatedStand) => API.patch(`/stands/${id}`, updatedStand);
export const deleteStand = (id) => API.delete(`/stands/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);




