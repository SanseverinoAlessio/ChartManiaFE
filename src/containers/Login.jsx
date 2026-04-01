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
import { useForm } from "react-hook-form";
import AxiosClient from "../config/AxiosClient";
import AuthService from "../services/api/AuthService";
import JwtService from "../services/JwtService";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate("");
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    try {
      let response = await AuthService.login(data.username, data.password);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            {...register("username", {
              required: "Username is required",
            })}
            label="Username"
            type="text"
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register("password", {
              required: "Password is required",
            })}
            label="Password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <Button
            type="submit"
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
      </form>
    </AuthLayout>
  );
}

export default Login;
