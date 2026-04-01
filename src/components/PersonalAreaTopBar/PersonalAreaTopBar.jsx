import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const PersonalAreaTopBar = ({ onMenuClick, sidebarOpen }) => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "var(--sidebar-background)",
        color: "var(--sidebar-text)",
        borderBottom: "1px solid var(--sidebar-divider)",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          ChartMania
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default PersonalAreaTopBar;
