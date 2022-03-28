import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `https://api.github.com`,
  params: {
    client_id: 'fbbd56e2def79c52006e',
  },
});

export default axiosInstance;
