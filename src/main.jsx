import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './normalize.css'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPäge.jsx";
import {Home} from "./components/Home.jsx";
import {Ejidatarios} from "./routes/Ejidatarios.jsx";
import {Ejidos} from "./routes/Ejidos.jsx";
import { store } from './redux/store.js'
import {Provider} from 'react-redux'
import Login from "./routes/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import {Buscar} from "./routes/Buscar.jsx";


const router = createBrowserRouter([
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
                element: <Ejidatarios />
            },
            {
                path: "parcela",
                element: <Ejidos />,
            },
            {
                path: "buscar",
                element: <Buscar />,
            },

        ],
    },
    {
        path: "login",
        element: <Login />,
    },
]);


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
)
