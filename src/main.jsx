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


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "ejidatarios",
                element: <Ejidatarios />,
            },
            {
                path: "ejidos",
                element: <Ejidos />,
            },
        ],
    }
]);


createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
