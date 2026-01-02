class JwtService {
  static setAccessToken(accessToken) {
    localStorage.setItem("access-token", accessToken);
  }

  static setExpiresAt(expiresAt){
    localStorage.setItem("expires-at", expiresAt);
  }
  
  static getExpiresAt(){
    return localStorage.getItem('expires-at');
  }


  static removeAccessToken(){
    localStorage.removeItem("access-token");
  }


  static getAccessToken() {
    return localStorage.getItem("access-token");
  }


  static accessTokenExpired(){
     const accessToken = JwtService.getAccessToken();
     const expiresAt = JwtService.getExpiresAt();

     if(!accessToken || !expiresAt)
        return true;

     const nowUnix = new Date().getTime();
     const expiresAtUnix = new Date(expiresAt).getTime(); 

     return expiresAtUnix <= nowUnix;
  }


}

export default JwtService;
