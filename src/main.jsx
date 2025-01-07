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
      path: "/",
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
          path: "sujeto",
          element: <Ejidatarios />,
        },
        {
          path: "parcela",
          element: <Ejidos />,
        },
        {
          path: "buscar",
          element: <Buscar />,
        },
        {
          path: "perfil/:ID",
          element: <Perfil />,
        },
        {
          path: "terreno/:ID",
          element: <Terreno />,
        },
        {
          path: "editar/ejidatario/:ID",
          element: <EditarEjidatarios />,
        },
        {
          path: "editar/terreno/:ID",
          element: <EditarTerrenos />,
        },
      ],
    },
    {
      path: "login",
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
