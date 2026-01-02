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

  static async refreshToken() {
    try {
      const { data } = await AxiosClient.post("/auth/refresh-token");
      return data;
    } catch (error) {
      throw error;
    }
  }


  static async logout(){
    try{
      const {data} = await AxiosClient.post("/auth/logout");
      return data;
    }
    catch(error){
      throw error;
    }
  }

}

export default AuthService;
