import axios from "axios";


export interface FetchResponse<T> {
  count: number;
  results: T[];
}


export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "3a28329946c34b9e9b3d7c09484ef02a",
  },
});
