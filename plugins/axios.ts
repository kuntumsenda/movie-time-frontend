// import { defineNuxtPlugin } from "#app";
import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const apiClient = axios.create({
    baseURL: useRuntimeConfig().public.API_BASE_URL as string, // Replace with your API base URL
    timeout: 10000,
  });

  apiClient.interceptors.request.use((request) => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTlhZTUxM2M3Y2VmZGJiOTM5NDJjOTYxMjJjMDZjMiIsIm5iZiI6MTYzODM1MTg0MC4zNjgsInN1YiI6IjYxYTc0M2UwM2RjMzEzMDAyZDI5Yzk1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nuCaqBbWvJHNI5pxxwWs0h8KEUyhoyajh9A5_21HoJg";
    if (token) {
      request.headers.Accept = "application/json";
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });

  return {
    provide: {
      axios: apiClient,
    },
  };
});

// import axios from "axios";

// export default defineNuxtPlugin(async () => {
//   return {
//     provide: {
//       axios: axios,
//     },
//   };
// });
