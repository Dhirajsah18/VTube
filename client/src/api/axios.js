import axios from "axios";

const normalizeApiBaseUrl = (rawUrl) => {
  const fallback = "http://localhost:8000/api/v1";
  if (!rawUrl) return fallback;

  let url = String(rawUrl).trim();

  // Handle accidental values like: VITE_API_URL=https://...
  if (url.startsWith("VITE_API_URL=")) {
    url = url.slice("VITE_API_URL=".length);
  }

  url = url.replace(/\/+$/, "");

  // Avoid duplicated /users segment when env is misconfigured.
  if (url.endsWith("/users")) {
    url = url.slice(0, -"/users".length);
  }

  return url || fallback;
};

const api = axios.create({
  baseURL: normalizeApiBaseUrl(import.meta.env.VITE_API_URL),
  withCredentials: true, // refreshToken cookie
});

// request interceptor (access token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor (refresh token)
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const url = originalRequest.url || "";

    const skipRefresh =
      url.includes("/users/login") ||
      url.includes("/users/register") ||
      url.includes("/users/logout") ||
      url.includes("/users/refresh-token") ||
      url.includes("/users/current-user");

    if (error.response?.status === 401 && !skipRefresh) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch(Promise.reject);
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post("/users/refresh-token");

        localStorage.setItem("accessToken", res.data.data.accessToken);

        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
