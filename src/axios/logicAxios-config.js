import axios from "axios";
import { jwtDecode } from "jwt-decode";

const instance = axios.create({
  baseURL: "https://netflix-server.azurewebsites.net//api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

async function getAccessToken() {
  await axios
    .get("/auth/access-token", {
      baseURL: "https://netflix-server.azurewebsites.net/",
      withCredentials: true,
      headers: {
        "Content-Type": "Application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error.message);
      return null;
    });
}

instance.interceptors.request.use(async function (config) {
  const cookies = decodeURIComponent(document.cookie).split(";");
  for (let cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name == "access_token") {
      const data = jwtDecode(value);
      if (data.exp * 1000 < new Date().getTime()) {
        // Lấy access token mới.
        const token = await getAccessToken();
        if(token)
          config.headers.Authorization = `Bearer ${token}`;
      } else {
        config.headers.Authorization = `Bearer ${value}`;
      }
    }
  }
  return config;
});

export default instance;
