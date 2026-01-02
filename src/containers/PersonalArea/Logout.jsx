import { useEffect, useRef, useState } from "react";
import AuthService from "../../services/api/AuthService";
import JwtService from "../../services/JwtService";
import { useNavigate } from "react-router";

function Logout() {
  const sent = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    if (sent.current) return;

    console.log(sent);
    const logoutRequest = async () => {
      try {
        sent.current = true;
        await AuthService.logout();
        JwtService.removeAccessToken();
        navigate("/");
      } catch (e) {
        console.error(e);
        navigate("/");
        return;
      }
    };

    logoutRequest();
  }, []);

  return <></>;
}

export default Logout;
