import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "ad5c7de6-7cc4-452c-957a-f645c63594a0",
  },
});

export const authApi = {
  me() {
    return instance.get(`auth/me`);
  },
  login(email: string, password: string, rememberme = false) {
    return instance.post(`auth/login`, { email, password, rememberme });
  },
  logout() {
    alert("logout");
    return instance.delete(`auth/login`);
  },
};

export const profileApi = {
  savePhotos(file: any) {
    const formData = new FormData();
    formData.append("image", file);
    return instance.put("profile/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
