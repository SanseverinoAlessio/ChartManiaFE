import {
  TextField,
  Button,
  Stack,
  Typography,
  Link as MUILink,
} from "@mui/material";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import { Link } from "react-router";
import { useState } from "react";
import AxiosClient from "../config/AxiosClient";
import AuthService from "../services/api/AuthService";
import JwtService from "../services/JwtService";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  async function login() {
    try {
      let response = await AuthService.login(username, password);
      JwtService.setAccessToken(response.accessToken);
      JwtService.setExpiresAt(response.expiresAt);
      navigate("/personal-area");

    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Login to continue to ChartMania."
      imageSrc="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=1200&q=80"
      imageAlt="Login"
    >
      <Stack spacing={2}>
        <TextField
          required
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          type="username"
          fullWidth
        />
        <TextField
          required
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
          fullWidth
        />

        <Button
          onClick={login}
          variant="contained"
          sx={{ height: 44, borderRadius: 2, fontWeight: 700 }}
        >
          Login
        </Button>

        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Don&apos;t have an account?
          <Link
            style={{ marginLeft: "5px" }}
            to="/register"
            href="/register"
            underline="hover"
          >
            Register
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}

export default Login;
