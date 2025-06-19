import { Outlet, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedOut } from "../redux/loginSlice";
import { toggleTheme } from "../redux/themeSlice";
import { useEffect } from "react";
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
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function NavbarComponent() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const user = JSON.parse(localStorage.getItem("user"));

  // Tiempo de inactividad en milisegundos (10 minutos)
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

  return (
    <Box className="d-flex flex-column min-vh-100">
      <AppBar position="static" color="primary" elevation={5} sx={{zIndex:99999}}>
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Ejido de San Marcos
          </Typography>

          {user?.isAdmin && (
            <Button
              component={RouterLink}
              to="/admin/dashboard"
              color="inherit"
              sx={{ mr: 1 }}
            >
              {user.name}
            </Button>
          )}

          <Button
            component={RouterLink}
            to={RUTAS.agregarSujeto}
            color="inherit"
            sx={{ mr: 1 }}
          >
            Sujetos
          </Button>
          <Button
            component={RouterLink}
            to={RUTAS.agregarParcela}
            color="inherit"
            sx={{ mr: 1 }}
          >
            Parcela
          </Button>
          <Button
            component={RouterLink}
            to={RUTAS.buscar}
            color="inherit"
            sx={{ mr: 1 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => dispatch(setLoggedOut())}
            variant="contained"
            color="error"
            sx={{ mr: 1 }}
          >
            Salir
          </Button>
          <IconButton
            onClick={() => dispatch(toggleTheme())}
            color="inherit"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container className="pt-3 flex-grow-1">
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
}

export default NavbarComponent;
