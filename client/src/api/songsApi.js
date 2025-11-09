import axios from "axios"
const API_URL = "http://[::1]:3000/";
export const getSongs = ()=>axios.get(API_URL/lyrics);
export const getSongById = (id) =>axios.get(`${API_URL}/lyrics/${id}`)
export const addSong = (songData) => axios.post(API_URL/lyrics, songData)
export const updateSong = (id, songData) => axios.put(`${API_URL}/lyrics/${id}`, songData)
export const deleteSong = (id) =>axios.get(`${API_URL}/lyrics/${id}`)

