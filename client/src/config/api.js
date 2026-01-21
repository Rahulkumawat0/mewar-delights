// Automatically use production URL when deployed, localhost for development
export const API_BASE_URL = 
  import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? `https://${window.location.hostname}` 
    : "http://localhost:5000");
