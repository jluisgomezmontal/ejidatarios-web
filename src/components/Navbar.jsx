import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedOut } from "../redux/loginSlice";
import { toggleTheme } from "../redux/themeSlice";
import { useEffect, useState } from "react";
import { RUTAS } from "../utils/const.js";
import { Footer } from "./Footer.jsx";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
  useTheme,
  Tooltip,
  ListItemIcon,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MapIcon from "@mui/icons-material/Map";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeIcon from "@mui/icons-material/Home";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

function NavbarComponent() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showInactivityModal, setShowInactivityModal] = useState(false);
  const [countdown, setCountdown] = useState(60);

  // Ocultar navbar en rutas de admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  const truncateName = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    return words.slice(0, 3).join(" ");
  };

  const inactivityTime = 10 * 60 * 1000;
  const warningTime = 60 * 1000;

  useEffect(() => {
    let inactivityTimeout;
    let warningTimeout;
    let countdownInterval;

    const resetTimer = () => {
      clearTimeout(inactivityTimeout);
      clearTimeout(warningTimeout);
      clearInterval(countdownInterval);
      setShowInactivityModal(false);
      setCountdown(60);

      warningTimeout = setTimeout(() => {
        setShowInactivityModal(true);
        setCountdown(60);

        countdownInterval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, inactivityTime - warningTime);

      inactivityTimeout = setTimeout(() => {
        dispatch(setLoggedOut());
      }, inactivityTime);
    };

    const handleActivity = () => {
      if (showInactivityModal) {
        resetTimer();
      }
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);
    window.addEventListener("scroll", handleActivity);

    resetTimer();

    return () => {
      clearTimeout(inactivityTimeout);
      clearTimeout(warningTimeout);
      clearInterval(countdownInterval);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, [showInactivityModal]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleStayActive = () => {
    setShowInactivityModal(false);
    setCountdown(60);
  };

  const menuItems = [
    { text: "Inicio", path: "/", icon: <HomeIcon /> },
    { text: "Sujetos", path: RUTAS.agregarSujeto, icon: <PersonAddIcon /> },
    { text: "Parcela", path: RUTAS.agregarParcela, icon: <MapIcon /> },
    { text: "Buscar", path: RUTAS.buscar, icon: <SearchIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
        <Typography variant="h6" noWrap>
          Ejido de San Marcos
        </Typography>
        {user?.name && (
          <Chip
            icon={user.isAdmin ? <AdminPanelSettingsIcon /> : undefined}
            label={truncateName(user.name)}
            size="small"
            sx={{ mt: 1, bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
          />
        )}
      </Box>
      <List>
        {user?.isAdmin && (
          <>
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/admin/dashboard"
                onClick={handleDrawerToggle}
                selected={location.pathname.startsWith("/admin")}
              >
                <ListItemIcon>
                  <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Panel Admin" />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        )}
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={handleDrawerToggle}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <ListItem disablePadding>
          <ListItemButton onClick={() => dispatch(toggleTheme())}>
            <ListItemIcon>
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </ListItemIcon>
            <ListItemText
              primary={mode === "dark" ? "Modo Claro" : "Modo Oscuro"}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              dispatch(setLoggedOut());
              handleDrawerToggle();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar Sesión" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!isAdminRoute && (
        <>
          <AppBar
            position="static"
            color="primary"
            elevation={2}
            sx={{
              transition: "all 0.3s ease",
            }}
          >
            <Container maxWidth="xl">
              <Toolbar disableGutters sx={{ px: { xs: 1, sm: 2 } }}>
                <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                  <HomeIcon sx={{ mr: 1, display: { xs: "none", sm: "block" } }} />
                  <Typography
                    variant="h6"
                    component={RouterLink}
                    to="/"
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: 600,
                      transition: "opacity 0.2s",
                      "&:hover": {
                        opacity: 0.8,
                      },
                    }}
                  >
                    Ejido de San Marcos
                  </Typography>
                </Box>

                {isMobile ? (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title={mode === "dark" ? "Modo Claro" : "Modo Oscuro"}>
                      <IconButton
                        onClick={() => dispatch(toggleTheme())}
                        color="inherit"
                        size="large"
                      >
                        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                      </IconButton>
                    </Tooltip>
                    <IconButton
                      color="inherit"
                      edge="end"
                      onClick={handleDrawerToggle}
                      size="large"
                    >
                      <MenuIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    {user?.name && (
                      user.isAdmin ? (
                        <Tooltip title="Panel de Administración">
                          <Button
                            component={RouterLink}
                            to="/admin/dashboard"
                            color="inherit"
                            startIcon={<AdminPanelSettingsIcon />}
                            sx={{
                              bgcolor: location.pathname.startsWith("/admin")
                                ? "rgba(255,255,255,0.15)"
                                : "transparent",
                              "&:hover": {
                                bgcolor: "rgba(255,255,255,0.2)",
                              },
                            }}
                          >
                            {truncateName(user.name)}
                          </Button>
                        </Tooltip>
                      ) : (
                        <Chip
                          label={truncateName(user.name)}
                          color="default"
                          sx={{
                            bgcolor: "rgba(255,255,255,0.15)",
                            color: "inherit",
                            "& .MuiChip-label": {
                              px: 1.5,
                            },
                          }}
                        />
                      )
                    )}
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      {menuItems.slice(1).map((item) => (
                        <Tooltip key={item.path} title={item.text}>
                          <Button
                            component={RouterLink}
                            to={item.path}
                            color="inherit"
                            startIcon={item.icon}
                            sx={{
                              bgcolor:
                                location.pathname === item.path
                                  ? "rgba(255,255,255,0.15)"
                                  : "transparent",
                              "&:hover": {
                                bgcolor: "rgba(255,255,255,0.2)",
                              },
                              transition: "all 0.2s",
                            }}
                          >
                            {item.text}
                          </Button>
                        </Tooltip>
                      ))}
                    </Box>
                    <Divider orientation="vertical" flexItem sx={{ mx: 1, bgcolor: "rgba(255,255,255,0.3)" }} />
                    <Tooltip title={mode === "dark" ? "Modo Claro" : "Modo Oscuro"}>
                      <IconButton
                        onClick={() => dispatch(toggleTheme())}
                        color="inherit"
                        size="large"
                      >
                        {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cerrar Sesión">
                      <Button
                        onClick={() => dispatch(setLoggedOut())}
                        variant="contained"
                        color="error"
                        startIcon={<LogoutIcon />}
                        sx={{
                          transition: "all 0.2s",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: 2,
                          },
                        }}
                      >
                        Salir
                      </Button>
                    </Tooltip>
                  </Box>
                )}
              </Toolbar>
            </Container>
          </AppBar>

          {/* Drawer para navegación móvil */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      )}

      <Container
        maxWidth={isAdminRoute ? false : "xl"}
        sx={{
          flexGrow: 1,
          py: isAdminRoute ? 0 : 3,
          px: isAdminRoute ? 0 : { xs: 2, sm: 3 },
        }}
      >
        <Outlet />
      </Container>

      {!isAdminRoute && <Footer />}

      <Dialog
        open={showInactivityModal}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleStayActive();
          }
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 24,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "warning.main",
            color: "warning.contrastText",
          }}
        >
          <WarningAmberIcon />
          Advertencia de Inactividad
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText
            sx={{
              fontSize: "1.1rem",
              textAlign: "center",
              mb: 2,
            }}
          >
            Tu sesión se cerrará por inactividad en:
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 3,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: "bold",
                color: countdown <= 10 ? "error.main" : "warning.main",
                fontSize: { xs: "3rem", sm: "4rem" },
                transition: "color 0.3s ease",
              }}
            >
              {countdown}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                ml: 1,
                color: "text.secondary",
              }}
            >
              seg
            </Typography>
          </Box>
          <DialogContentText sx={{ textAlign: "center", color: "text.secondary" }}>
            Mueve el mouse o presiona cualquier tecla para continuar tu sesión.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={handleStayActive}
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Continuar Activo
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NavbarComponent;
