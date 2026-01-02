import React from 'react';
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
  Box 
} from '@mui/material';

import { useNavigate } from 'react-router';

const drawerWidth = 260;

const PersonalAreaSidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: 'I miei Grafici', path: '/personal-area/charts' },
    { text: 'Crea Nuovo', path: '/personal-area/chart/create' },
    { text: 'Profilo', path: '/personal-area/profile' },
  ];

  const settingItems = [
    { text: 'Impostazioni', path: '/personal-area/settings' },
    { text: 'Logout', path: '/logout', color: 'error.main' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          ChartMania
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: 'auto' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ my: 1 }} />
        
        <List>
          <Typography variant="caption" sx={{ px: 3, color: 'text.secondary', textTransform: 'uppercase' }}>
            Account
          </Typography>
          {settingItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon sx={{ color: item.color || 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ color: item.color || 'inherit' }} 
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