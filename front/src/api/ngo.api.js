import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "x-role": "NGO" }
});

export const fetchSummary = () => API.get("/insights/summary");
export const fetchHeatmapData = () => API.get("/insights/heatmap");
