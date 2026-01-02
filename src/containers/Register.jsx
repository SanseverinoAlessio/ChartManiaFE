import { TextField, Button, Stack, Typography, Link as MUILink } from "@mui/material";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import { Link } from "react-router";

function Register() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join ChartMania and start tracking your charts."
      imageSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
      imageAlt="Register"
    >
      <Stack spacing={2}>
        <TextField label="Username" fullWidth />
        <TextField label="Email" type="email" fullWidth />
        <TextField label="Password" type="password" fullWidth />
        <TextField label="Confirm password" type="password" fullWidth />

        <Button  variant="contained" sx={{ height: 44, borderRadius: 2, fontWeight: 700 }}>
          Register
        </Button>

        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Already have an account?
          <Link style={{marginLeft:'5px'}} to="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </Stack>
    </AuthLayout>
  );
}

export default Register;
