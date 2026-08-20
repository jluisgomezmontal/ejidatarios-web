/* eslint-disable react/prop-types */
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./normalize.css";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/ErrorPäge.jsx";
import { Home } from "./components/Home.jsx";
import { Ejidatarios } from "./routes/Ejidatarios.jsx";
import { Ejidos } from "./routes/Ejidos.jsx";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import Login from "./routes/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { Buscar } from "./routes/Buscar.jsx";
import { Perfil } from "./components/Perfil.jsx";
import { Terreno } from "./components/Terreno.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { EditarEjidatarios } from "./routes/EditarEjidatario.jsx";
import { EditarTerrenos } from "./routes/EditarTerreno.jsx";
import { RUTAS } from "./utils/const.js";
import { Parcela } from "./components/Parcela.jsx";
import { Admin } from "./routes/Admin.jsx";
import { Users } from "./routes/Users.jsx";
import { Dashboard } from "./routes/Dashboard.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import { AdminEjidatarios } from "./routes/AdminEjidatarios.jsx";
import { AdminParcelas } from "./routes/AdminParcelas.jsx";
import { Respaldo } from "./routes/Respaldo.jsx";
import { Documentos } from "./routes/Documentos.jsx";
import { useSelector as useReduxSelector } from "react-redux";
import { useMemo } from "react";

const router = createBrowserRouter(
  [
    {
      path: RUTAS.home,
      element: (
        <PrivateRoute>
          <App />
        </PrivateRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: RUTAS.admin,
          element: (
            <AdminRoute>
              <Admin />
            </AdminRoute>
          ),
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "usuarios",
              element: <Users />,
            },
            {
              path: "ejidatarios",
              element: <AdminEjidatarios />,
            },
            {
              path: "configuracion",
              element: <Users />,
            },
            {
              path: "parcelas",
              element: <AdminParcelas />,
            },
            {
              path: "respaldar",
              element: <Respaldo />,
            },
            {
              path: "documentos",
              element: <Documentos />,
            },
          ],
        },
        {
          path: RUTAS.agregarSujeto,
          element: <Ejidatarios />,
        },
        {
          path: RUTAS.agregarParcela,
          element: <Ejidos />,
        },
        {
          path: RUTAS.buscar,
          element: <Buscar />,
        },
        {
          path: RUTAS.perfilID,
          element: <Perfil />,
        },
        {
          path: RUTAS.parcelaID,
          element: <Parcela />,
        },
        {
          path: RUTAS.terrenoID,
          element: <Terreno />,
        },
        {
          path: RUTAS.editarEjidatarios,
          element: <EditarEjidatarios />,
        },
        {
          path: RUTAS.editarTerrenos,
          element: <EditarTerrenos />,
        },
      ],
    },
    {
      path: RUTAS.login,
      element: <Login />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

function ThemeWrapper({ children }) {
  const mode = useReduxSelector((state) => state.theme.mode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // Modo Light: Colores vibrantes y modernos
          // Modo Dark: Tonos negros y grises con acentos azules
          primary: {
            main: mode === "light" ? "#1976d2" : "#64b5f6",
            light: mode === "light" ? "#42a5f5" : "#90caf9",
            dark: mode === "light" ? "#1565c0" : "#42a5f5",
            contrastText: mode === "light" ? "#ffffff" : "#000000",
          },
          secondary: {
            main: mode === "light" ? "#9c27b0" : "#81c784",
            light: mode === "light" ? "#ba68c8" : "#a5d6a7",
            dark: mode === "light" ? "#7b1fa2" : "#66bb6a",
          },
          success: {
            main: mode === "light" ? "#2e7d32" : "#66bb6a",
            light: mode === "light" ? "#4caf50" : "#81c784",
            dark: mode === "light" ? "#1b5e20" : "#388e3c",
          },
          warning: {
            main: mode === "light" ? "#ed6c02" : "#ffa726",
            light: mode === "light" ? "#ff9800" : "#ffb74d",
            dark: mode === "light" ? "#e65100" : "#f57c00",
          },
          error: {
            main: mode === "light" ? "#d32f2f" : "#f44336",
            light: mode === "light" ? "#ef5350" : "#e57373",
            dark: mode === "light" ? "#c62828" : "#d32f2f",
          },
          info: {
            main: mode === "light" ? "#0288d1" : "#64b5f6",
            light: mode === "light" ? "#03a9f4" : "#90caf9",
            dark: mode === "light" ? "#01579b" : "#42a5f5",
          },
          background: {
            default: mode === "light" ? "#f5f5f5" : "#121212",
            paper: mode === "light" ? "#ffffff" : "#1e1e1e",
          },
          text: {
            primary: mode === "light" ? "rgba(0, 0, 0, 0.87)" : "#ffffff",
            secondary: mode === "light" ? "rgba(0, 0, 0, 0.6)" : "#90caf9",
            disabled: mode === "light" ? "rgba(0, 0, 0, 0.38)" : "rgba(255, 255, 255, 0.5)",
          },
          divider: mode === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(100, 181, 246, 0.2)",
          action: {
            hover: mode === "light" ? "rgba(0, 0, 0, 0.04)" : "rgba(100, 181, 246, 0.08)",
            selected: mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(100, 181, 246, 0.16)",
            disabled: mode === "light" ? "rgba(0, 0, 0, 0.26)" : "rgba(255, 255, 255, 0.3)",
            disabledBackground: mode === "light" ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)",
          },
        },
        typography: {
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 700,
          },
          h2: {
            fontWeight: 700,
          },
          h3: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 600,
          },
          h6: {
            fontWeight: 600,
          },
          button: {
            textTransform: "none",
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 8,
        },
        shadows: mode === "light"
          ? [
              "none",
              "0px 2px 4px rgba(0,0,0,0.05)",
              "0px 4px 8px rgba(0,0,0,0.08)",
              "0px 8px 16px rgba(0,0,0,0.1)",
              "0px 12px 24px rgba(0,0,0,0.12)",
              "0px 16px 32px rgba(0,0,0,0.14)",
              "0px 20px 40px rgba(0,0,0,0.16)",
              "0px 24px 48px rgba(0,0,0,0.18)",
              "0px 2px 4px rgba(0,0,0,0.05)",
              "0px 4px 8px rgba(0,0,0,0.08)",
              "0px 8px 16px rgba(0,0,0,0.1)",
              "0px 12px 24px rgba(0,0,0,0.12)",
              "0px 16px 32px rgba(0,0,0,0.14)",
              "0px 20px 40px rgba(0,0,0,0.16)",
              "0px 24px 48px rgba(0,0,0,0.18)",
              "0px 2px 4px rgba(0,0,0,0.05)",
              "0px 4px 8px rgba(0,0,0,0.08)",
              "0px 8px 16px rgba(0,0,0,0.1)",
              "0px 12px 24px rgba(0,0,0,0.12)",
              "0px 16px 32px rgba(0,0,0,0.14)",
              "0px 20px 40px rgba(0,0,0,0.16)",
              "0px 24px 48px rgba(0,0,0,0.18)",
              "0px 2px 4px rgba(0,0,0,0.05)",
              "0px 4px 8px rgba(0,0,0,0.08)",
              "0px 8px 16px rgba(0,0,0,0.1)",
            ]
          : [
              "none",
              "0px 2px 4px rgba(0,0,0,0.3)",
              "0px 4px 8px rgba(0,0,0,0.35)",
              "0px 8px 16px rgba(0,0,0,0.4)",
              "0px 12px 24px rgba(0,0,0,0.45)",
              "0px 16px 32px rgba(0,0,0,0.5)",
              "0px 20px 40px rgba(0,0,0,0.55)",
              "0px 24px 48px rgba(0,0,0,0.6)",
              "0px 2px 4px rgba(0,0,0,0.3)",
              "0px 4px 8px rgba(0,0,0,0.35)",
              "0px 8px 16px rgba(0,0,0,0.4)",
              "0px 12px 24px rgba(0,0,0,0.45)",
              "0px 16px 32px rgba(0,0,0,0.5)",
              "0px 20px 40px rgba(0,0,0,0.55)",
              "0px 24px 48px rgba(0,0,0,0.6)",
              "0px 2px 4px rgba(0,0,0,0.3)",
              "0px 4px 8px rgba(0,0,0,0.35)",
              "0px 8px 16px rgba(0,0,0,0.4)",
              "0px 12px 24px rgba(0,0,0,0.45)",
              "0px 16px 32px rgba(0,0,0,0.5)",
              "0px 20px 40px rgba(0,0,0,0.55)",
              "0px 24px 48px rgba(0,0,0,0.6)",
              "0px 2px 4px rgba(0,0,0,0.3)",
              "0px 4px 8px rgba(0,0,0,0.35)",
              "0px 8px 16px rgba(0,0,0,0.4)",
            ],
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: "none",
                fontWeight: 500,
                padding: "8px 16px",
              },
              contained: {
                boxShadow: mode === "light" 
                  ? "0px 2px 4px rgba(0,0,0,0.1)" 
                  : "0px 2px 4px rgba(0,0,0,0.3)",
                "&:hover": {
                  boxShadow: mode === "light"
                    ? "0px 4px 8px rgba(0,0,0,0.15)"
                    : "0px 4px 8px rgba(0,0,0,0.4)",
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: mode === "light"
                  ? "0px 2px 8px rgba(0,0,0,0.08)"
                  : "0px 2px 8px rgba(0,0,0,0.4)",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
              elevation1: {
                boxShadow: mode === "light"
                  ? "0px 2px 4px rgba(0,0,0,0.05)"
                  : "0px 2px 4px rgba(0,0,0,0.3)",
              },
              elevation2: {
                boxShadow: mode === "light"
                  ? "0px 4px 8px rgba(0,0,0,0.08)"
                  : "0px 4px 8px rgba(0,0,0,0.35)",
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeWrapper>
      <RouterProvider router={router} />
    </ThemeWrapper>
  </Provider>
);
