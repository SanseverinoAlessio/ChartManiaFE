import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Avatar,
  Typography,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./edit_profile.css";
import UserService from "../../../services/api/UserService";

export default function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const genericAlert = withReactContent(Swal);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      oldPassword: "",
      password: "",
      repeatPassword: "",
      avatar: null,
    },
  });

  const password = watch("password");

  async function loadUserProfile() {
    try {
      const response = await UserService.getCurrentUser();
      console.log(response);
      setValue("username", response.data.username);
      setValue("email", response.data.email);
    } catch (e) {
      console.error("Error loading profile:", e);
      genericAlert.fire({
        title: "Error",
        text: "Failed to load profile data",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(data) {
    try {
      setIsSaving(true);
      const response = await UserService.updateUserInfo({
        username: data.username,
        email: data.email,
        oldPassword: data.oldPassword || null,
        password: data.password || null,
      });

      if (response.success) {
        setIsEditing(false);
        // Reset password fields
        setValue("oldPassword", "");
        setValue("password", "");
        setValue("repeatPassword", "");
        
        genericAlert.fire({
          title: "Success",
          text: "Profile updated successfully",
          icon: "success",
        });
      } else {
        genericAlert.fire({
          title: "Error",
          text: response.message || "Failed to update profile",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error.response.data);
      genericAlert.fire({
        title: "Error",
        text: error?.response?.data?.message || "An error occurred while updating the profile",
        icon: "error",
      });
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    loadUserProfile();
  }, []);

  const handleAvatarClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("avatar", file);
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarPreview(null);
    reset({
      username: watch("username"),
      email: watch("email"),
      oldPassword: "",
      password: "",
      repeatPassword: "",
      avatar: null,
    });
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
        >
          My Profile
        </Typography>

        {/* Avatar Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Avatar
            src={avatarPreview}
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              cursor: isEditing ? "pointer" : "default",
              transition: "transform 0.2s",
              "&:hover": isEditing ? { transform: "scale(1.05)" } : {},
            }}
            onClick={handleAvatarClick}
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          {isEditing && (
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Click on the image to change it
            </Typography>
          )}
        </Box>

        {/* Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Username"
              {...register("username", {
                required: "Username is required",
              })}
              disabled={!isEditing}
              error={!!errors.username}
              helperText={errors.username?.message}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              disabled={!isEditing}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="outlined"
            />

            {isEditing && (
              <>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  {...register("oldPassword", {
                    validate: (value) => {
                      const pwd = watch("password");
                      if (pwd && !value) {
                        return "Current password is required";
                      }
                      return true;
                    },
                  })}
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword?.message}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  {...register("password", {
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    validate: (value) => {
                      const oldPwd = watch("oldPassword");
                      if (oldPwd && !value) {
                        return "New password is required";
                      }
                      return true;
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  {...register("repeatPassword", {
                    validate: (value) => {
                      const pwd = watch("password");
                      if (pwd && value !== pwd) {
                        return "Passwords do not match";
                      }
                      if (pwd && !value) {
                        return "Please confirm your password";
                      }
                      return true;
                    },
                  })}
                  error={!!errors.repeatPassword}
                  helperText={errors.repeatPassword?.message}
                  variant="outlined"
                />
              </>
            )}
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            {!isEditing ? (
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={() => setTimeout(()=>{setIsEditing(true)},100)}
                sx={{ px: 4 }}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSaving || !isEditing}
                  sx={{ px: 4 }}
                >
                  {isSaving ? "Updating..." : "Update"}
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleCancel}
                  sx={{ px: 4 }}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
