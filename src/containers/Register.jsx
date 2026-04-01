import {
  TextField,
  Button,
  Stack,
  Typography,
  Link as MUILink,
} from "@mui/material";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import AuthService from "../services/api/AuthService";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useRef } from "react";
import { CircularProgress } from "@mui/material";

function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const password = watch("password");

  const onSubmit = async (data) => {

    console.log('submit!');
    setServerError("");
    try {
      console.log(data);
      const response = await AuthService.register(data);
      if (response.success) navigate("/login");
    } catch (error) {
      setServerError(
        "There was a problem with your request. please check the data and try again.",
      );
    }
  };

  const checkUsernameTimeout = useRef(null);
  const checkEmailTimeout = useRef(null);

  async function checkUsernameAvailability(username) {
    return await new Promise((resolve) => {
      clearTimeout(checkUsernameTimeout.current);
      checkUsernameTimeout.current = setTimeout(async () => {
        const response = await AuthService.checkUsernameExists(username);
        let exists = response.data.exists;
        resolve(!exists || "Username already taken");
      }, 500);
    });
  }

  async function checkEmailAvailability(email) {
     return await new Promise((resolve) => {
      clearTimeout(checkEmailTimeout.current);
      checkEmailTimeout.current = setTimeout(async () => {
        const response = await AuthService.checkEmailExists(email);
        let exists = response.data.exists;
        resolve(!exists || "Email already taken");
      }, 500);
    });
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join ChartMania and start tracking your charts."
      imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
      imageAlt="Register"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              validate: {
                usernameAvaible: checkUsernameAvailability,
              },
            })}
            label="Username"
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
              validate:{
                emailAvaible: checkEmailAvailability


              }
            })}
            label="Email"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            label="Password"
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            {...register("repeat_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            label="Confirm password"
            type="password"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Typography color="error">{serverError}</Typography>

          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isSubmitting}
            sx={{ height: 44, borderRadius: 2, fontWeight: 700 }}
          >
              {isSubmitting ? <CircularProgress size={20} color="inherit" /> : "Register"} 
          </Button>

          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Already have an account?
            <Link style={{ marginLeft: "5px" }} to="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </Stack>
      </form>
    </AuthLayout>
  );
}

export default Register;
