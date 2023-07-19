import axios from "axios";
import { getUserLocalStorage } from "../contexts/AuthProvider/util";

export const api = axios.create({
  baseURL: 'http://localhost:3333'
});

// adiciona o token no header das requisições
api.interceptors.request.use(
  (config) => {
      const user = getUserLocalStorage();

      config.headers.Authorization = `Bearer ${user?.token}`;

      return config;
  },
  (error) => {
      return Promise.reject(error)
  }
  
)