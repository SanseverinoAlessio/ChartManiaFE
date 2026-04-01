import AxiosClient from "../../config/AxiosClient";
import JwtService from "../JwtService";

class AuthService {
  static async login(username, password) {
    try {
      const { data } = await AxiosClient.post("/auth/login", {
        username: username,
        password: password,
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  static async register(registrationFormData) {
    const { data } = await AxiosClient.post(
      "/auth/register",
      registrationFormData,
    );
    return data;
  }

  static async checkUsernameExists(username) {
    if(!username)
      return false;

    const { data } = await AxiosClient.get("/auth/check-username-exists/" + username);
    return data;
  }

  static async checkEmailExists(email) {
    if(!email)
      return false;

    const { data } = await AxiosClient.get("/auth/check-email-exists/" + email);
    return data;

  }

  static async refreshToken() {
    try {
      const { data } = await AxiosClient.post("/auth/refresh-token");
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async logout() {
    try {
      const { data } = await AxiosClient.post("/auth/logout");
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
