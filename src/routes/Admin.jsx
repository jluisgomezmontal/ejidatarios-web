/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

export const Admin = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        overflowX: "hidden",
        overflowY: "auto", // si quieres scroll vertical
        marginLeft: isDesktop ? `${drawerWidth}px` : 0,
        transition: "margin-left 0.3s",
      }}
    >
      <CssBaseline />

      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        anchor="left"
        open={isDesktop ? true : open}
        onClose={!isDesktop ? toggleDrawer : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {[
            { text: "Dashboard", url: "dashboard", icon: <DashboardIcon /> },
            { text: "Usuarios", url: "usuarios", icon: <DashboardIcon /> },
            {
              text: "Los Ejidatarios",
              url: "ejidatarios",
              icon: <PeopleIcon />,
            },
            {
              text: "Configuración",
              url: "configuracion",
              icon: <SettingsIcon />,
            },
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => navigate(`/admin/${item.url}`)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: open ? `${drawerWidth}px` : 0,
          transition: "margin-left 0.3s",
        }}
      >
        <Toolbar />
        <Typography variant="h4" gutterBottom textAlign="center">
          Administrador
        </Typography>
        <Container id="detail" className="pt-3">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
