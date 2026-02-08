import axios from "./axios";

/**
 * Get all published videos (Home page)
 */
export const getAllVideos = (params = {}) => {
  return axios.get("/videos", { params });
};

/**
 * Get single video by ID (Watch page)
 */
export const getVideoById = (videoId) => {
  return axios.get(`/videos/${videoId}`);
};

/**
 * Get videos by channel (Channel page)
 * username is used as param
 */
export const getVideosByChannel = (username) => {
  return axios.get(`/videos/channel/${username}`);
};


// Creator dashboard stats
export const getDashboardStats = () => {
  return axios.get("/dashboard");
};

// Publish / Unpublish video
export const togglePublishVideo = (videoId) => {
  return axios.patch(`/videos/toggle/publish/${videoId}`);
};

// Delete video
export const deleteVideo = (videoId) => {
  return axios.delete(`/videos/${videoId}`);
};
/**
 * Upload new video (Upload page)
 */
export const uploadVideo = (formData) => {
  return axios.post("/videos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
