import axios, { AxiosRequestConfig } from "axios";


export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}


const axiosInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "3a28329946c34b9e9b3d7c09484ef02a",
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
  this.endpoint = endpoint;
  }

  getAll(config: AxiosRequestConfig) {
    return axiosInstance 
      .get<FetchResponse<T>>(this.endpoint)
      .then(res => res.data)
  }

} 

export default APIClient;
