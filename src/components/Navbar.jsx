import { Outlet, Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import MenuIcon from "@mui/icons-material/Menu";

function NavbarComponent() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const user = JSON.parse(localStorage.getItem("user"));

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const inactivityTime = 10 * 1000 * 60;

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(setLoggedOut());
      }, inactivityTime);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {user?.isAdmin && (
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/admin/dashboard">
              <ListItemText primary={user.name} />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={RUTAS.agregarSujeto}>
            <ListItemText primary="Sujetos" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={RUTAS.agregarParcela}>
            <ListItemText primary="Parcela" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to={RUTAS.buscar}>
            <ListItemText primary="Buscar" />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={() => dispatch(setLoggedOut())}>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => dispatch(toggleTheme())}>
            <ListItemText
              primary={mode === "dark" ? "Modo Claro" : "Modo Oscuro"}
            />
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box className="d-flex flex-column min-vh-100">
      <AppBar position="static" color="primary" sx={{ zIndex: 99999 }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: "none",
                color: "inherit",
                whiteSpace: "nowrap",
              }}
            >
              Ejido de San Marcos
            </Typography>

            {isMobile ? (
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  onClick={() => dispatch(toggleTheme())}
                  color="inherit"
                >
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 1 }}>
                {user?.isAdmin && (
                  <Button
                    component={RouterLink}
                    to="/admin/dashboard"
                    color="inherit"
                  >
                    {user.name}
                  </Button>
                )}
                <Button
                  component={RouterLink}
                  to={RUTAS.agregarSujeto}
                  color="inherit"
                >
                  Sujetos
                </Button>
                <Button
                  component={RouterLink}
                  to={RUTAS.agregarParcela}
                  color="inherit"
                >
                  Parcela
                </Button>
                <Button
                  component={RouterLink}
                  to={RUTAS.buscar}
                  color="inherit"
                >
                  Buscar
                </Button>
                <Button
                  onClick={() => dispatch(setLoggedOut())}
                  variant="contained"
                  color="error"
                >
                  Salir
                </Button>
                <IconButton
                  onClick={() => dispatch(toggleTheme())}
                  color="inherit"
                >
                  {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer solo visible en móviles */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawerContent}
      </Drawer>

      <Container className="pt-3 flex-grow-1">
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
}

export default NavbarComponent;
