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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#0D6EFD",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
});

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

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ThemeProvider>
);
