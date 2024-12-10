import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {Alert} from "react-bootstrap";

export const Perfil = () => {
    let {ID}  = useParams();
    const [ejidatario, setEjidatario] = useState({});
    const [terrenos, setTerrenos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = `https://ejidatarios-api.onrender.com/api/ejidatarios/${ID}`;
            const urlTerreno = `https://ejidatarios-api.onrender.com/api/terrenos/sujeto/${ID}`;
            const response = await fetch(url)
            const responseTerreno = await fetch(urlTerreno)
            const data = await response.json()
            const dataTerreno = await responseTerreno.json()
            setEjidatario(data);
            setTerrenos(dataTerreno);
        };
        fetchData();
    }, []);


    return (
        <div className="mt-5">
            <h2 className="text-center my-4 fs-1 text-info ">
                Sujeto
            </h2>
            <Table striped bordered hover size="sm">
                <tbody>
                <tr>
                    <td className="fw-bold">iD_Ejidatario</td>
                    <td>{ejidatario.iD_Ejidatario}</td>
                </tr>
                <tr>
                    <td className="fw-bold">Nombre</td>
                    <td>{ejidatario.nombre}</td>
                </tr>
                <tr>
                    <td className="fw-bold">Apellido Paterno</td>
                    <td>{ejidatario.apellidoPaterno}</td>
                </tr>
                <tr>
                    <td className="fw-bold">Apellido Materno</td>
                    <td>{ejidatario.apellidoMaterno}</td>
                </tr>
                <tr>
                    <td className="fw-bold">Telefono</td>
                    <td>{ejidatario.telefono}</td>
                </tr>
                <tr>
                    <td className="fw-bold">Curp</td>
                    <td>{ejidatario.curp}</td>
                </tr>
                <tr>
                    <td className="fw-bold">INE</td>
                    <td>{
                            ejidatario.documentoPDF !== "" &&
                                <Link target="_blank"
                                      to={`https://ejidatarios-api.onrender.com/api/terrenos/files/${ejidatario.documentoPDF}`}>Descargar</Link>
                    }</td>
                </tr>
                </tbody>
            </Table>

            <h2 className="text-center my-4 fs-1 text-info ">
                Terrenos
            </h2>

            {
                terrenos.length > 0 ?
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>tipoCertificado</th>
                            <th>numeroParcela</th>
                            <th>actoJuridico</th>
                            <th>@documentoPDF</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            terrenos?.map((terreno, index) => (
                                <tr key={index}>
                                    <td>{terreno.tipoCertificado}</td>
                                    <td>{terreno.numeroParcela}</td>
                                    <td>{terreno.actoJuridico}</td>
                                    <td>
                                        {
                                            terreno.documentoPDF !== "" &&
                                            <Link target="_blank"
                                                  to={`https://ejidatarios-api.onrender.com/api/terrenos/files/${terreno.documentoPDF}`}>Descargar</Link>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                    :
                    <Alert variant="danger" text={"dark"}>
                        No se encontraron terrenos
                    </Alert>
            }

        </div>
    )
}
