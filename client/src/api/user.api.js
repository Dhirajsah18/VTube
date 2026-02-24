import api from "./axios";

export const getChannelProfile = (username) =>
  api.get(`/users/c/${username}`);

export const searchChannels = (params = {}) =>
  api.get("/users/search", { params });
