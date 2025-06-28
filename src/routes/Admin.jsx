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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MapIcon from "@mui/icons-material/Map";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

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
    <Box sx={{ display: "flex" }}>
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
            bgcolor:
              theme.palette.mode === "light"
                ? "#e5eafc"
                : theme.palette.background.default,
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          {[
            { text: "Dashboard", url: "dashboard", icon: <DashboardIcon /> },
            { text: "Usuarios", url: "usuarios", icon: <AccountCircleIcon /> },
            {
              text: "Los Ejidatarios",
              url: "ejidatarios",
              icon: <PeopleIcon />,
            },
            {
              text: "Las Parcelas",
              url: "parcelas",
              icon: <MapIcon />,
            },
            {
              text: "Respaldar",
              url: "respaldar",
              icon: <CloudDownloadIcon />,
            },
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/admin/${item.url}`)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflowX: "hidden",
          overflowY: "auto",
          marginLeft: isDesktop ? `${drawerWidth}px` : 0,
          transition: "margin-left 0.3s",
        }}
      >
        <Toolbar />
        <Typography
          variant="h4"
          color="primary"
          textAlign="left"
          gutterBottom
        >
          Administrador
        </Typography>
        <Outlet />
      </Box>
    </Box>
  );
};
