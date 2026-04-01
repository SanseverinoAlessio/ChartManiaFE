import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import UserService from "../../services/api/UserService";
import AreaChartIcon from '@mui/icons-material/AreaChart';
import AddchartIcon from '@mui/icons-material/Addchart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from "react-router";
import { Avatar } from "@mui/material";

const drawerWidth = 260;

const PersonalAreaSidebar = ({ open, onClose, isMobile = false }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await UserService.getCurrentUser();
      setUsername(response.data.username);
    };

    fetchUserInfo();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const menuItems = [
    { text: "My Charts", path: "/personal-area/charts", icon: <AreaChartIcon/>},
    { text: "New Chart", path: "/personal-area/chart/create", icon: <AddchartIcon/> },
    { text: "Profile", path: "/personal-area/profile", icon: <PersonIcon/> },
  ];

  const settingItems = [
    { text: "Logout", path: "/logout", color: "error.main",icon: <LogoutIcon/> },
  ];

  return (
    <Drawer
      variant={isMobile ? "temporary" : "persistent"}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: isMobile ? drawerWidth : open ? drawerWidth : 0,
        flexShrink: 0,
        transition: "width 0.3s ease",
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "var(--sidebar-background)",
          color: "var(--sidebar-text)",
          transition: "transform 0.3s ease",
        },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: "bold", color: "var(--sidebar-title)" }}
        >
          ChartMania
        </Typography>
        <IconButton onClick={onClose} sx={{ color: "var(--sidebar-text)" }}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Grid
        sx={{
          marginTop: "20px",
          marginLeft: "20px",
          justifyContent: "start",
        }}
        container
        spacing={2}
      >
        <Avatar
          sx={{
            width: 48,
            height: 48,
            mb: 2,
            transition: "transform 0.2s",
            backgroundColor: "var(--sidebar-avatar-bg)",
            color: "var(--sidebar-avatar-text)",
          }}
        />
        <Typography style={{ marginTop: "15px", color: "var(--sidebar-text)" }} fontWeight={500}>
          {username}
        </Typography>
      </Grid>
      <Divider sx={{ my: 1, borderColor: "var(--sidebar-divider)" }} />

      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  "&:hover": {
                    backgroundColor: "var(--sidebar-hover)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "var(--sidebar-icon)" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{ color: "var(--sidebar-text)" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          {settingItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  "&:hover": {
                    backgroundColor: "var(--sidebar-logout-hover)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "var(--sidebar-logout)" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ color: "var(--sidebar-logout)" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default PersonalAreaSidebar;
