import {Link, useRouteError} from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (

    <div id="error-page" className="d-flex justify-content-center align-items-center vh-100">
        <div>

        <p className="fs-1">Lo siento error en la pagina</p>
        <Link to="/login" className="btn btn-outline-primary d-block">Regresar</Link>
        </div>
    </div>

)
    ;
}