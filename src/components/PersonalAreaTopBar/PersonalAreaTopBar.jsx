import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import TuneIcon from "@mui/icons-material/Tune";
import { useLocation } from "react-router";
import { useChartInputSidebar } from "../../contexts/ChartInputSidebarContext.jsx";

const PersonalAreaTopBar = ({ onMenuClick, sidebarOpen }) => {
  const location = useLocation();
  const isChartPage = /\/personal-area\/chart\/(create\/.+|edit\/.+)/.test(location.pathname);
  const { toggle } = useChartInputSidebar();

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
        {isChartPage && (
          <Tooltip title="Pannello input">
            <IconButton
              color="inherit"
              aria-label="toggle input panel"
              edge="end"
              onClick={toggle}
            >
              <TuneIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default PersonalAreaTopBar;
