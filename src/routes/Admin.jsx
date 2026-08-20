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
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Home as HomeIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MapIcon from "@mui/icons-material/Map";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DescriptionIcon from "@mui/icons-material/Description";

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

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Panel de Administración
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => navigate("/")}
            title="Volver al inicio"
          >
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
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
            {
              text: "Documentos",
              url: "documentos",
              icon: <DescriptionIcon />,
            },
          ].map((item, index) => (
            <ListItem
              button
              key={index}
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/admin/${item.url}`);
                if (!isDesktop) toggleDrawer();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem
            button
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
              if (!isDesktop) toggleDrawer();
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Salir del Admin" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
