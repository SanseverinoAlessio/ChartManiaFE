import AxiosClient from "../../config/AxiosClient";

class UserService {
  static async getCurrentUser() {
    const { data } = await AxiosClient.get("personal-area/users/me");
    return data;
  }

  static async updateUserInfo(userData) {
    const { data } = await AxiosClient.put("personal-area/users/me", userData);
    return data;
  }
}

export default UserService;

