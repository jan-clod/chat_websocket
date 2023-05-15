import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/profile/",
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

export const usersApi = {
  getProfile(userId: number) {
    return instance.get(`/` + userId);
  },
};

export const profileApi = {
  getProfile(userId: number) {
    return usersApi.getProfile(userId)
  },
  updatePhotos(file: any) {
    const formData = new FormData();
    formData.append("image", file);
    return instance.put("photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updadeStatus(status:string){
    return instance.put("photo", status);
  }
};
