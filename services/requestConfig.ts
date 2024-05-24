import axios from "axios";

const client = axios.create({
  // baseURL: "https://auth-backoffice-xyes-balancer-1136423868.us-east-2.elb.amazonaws.com",
});

client.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if(!token) return config;
  
    // config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['Authorization'] = `${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default client;