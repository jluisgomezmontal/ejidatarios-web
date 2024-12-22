import {Link, useParams,} from "react-router-dom";
import {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import {Alert, Button} from "react-bootstrap";
import { EJIDATARIO, TERRENO } from "../utils/const";
import Spinner from 'react-bootstrap/Spinner';

export const Perfil = () => {
    let {ID}  = useParams();
    const [loading, setLoading] = useState(true);
    const [ejidatario, setEjidatario] = useState({});
    const [terrenos, setTerrenos] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const url = `https://ejidatarios-api.onrender.com/api/ejidatarios/id/${ID}`;
            const urlTerreno = `https://ejidatarios-api.onrender.com/api/terrenos/sujeto/${ID}`;
            const response = await fetch(url)
            const responseTerreno = await fetch(urlTerreno)
            const data = await response.json()
            const dataTerreno = await responseTerreno.json()
            console.log(data)   
            console.log(dataTerreno)   
            setEjidatario(data);
            setTerrenos(dataTerreno);
            setLoading(!loading);
        };
        fetchData();
    }, []);

    console.log(terrenos)
    return (
        <>
        {
            loading ? 
            <div className="vh-100 d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="info"/>
        </div>
         : 
                <div className="mt-5 vh-100">
                <h2 className="text-center my-4 fs-1 text-info ">
                    Sujeto
                </h2>
                <Table striped bordered hover size="sm" variant="dark">
                    <tbody>
                    <tr>
                        <td className="fw-bold">{EJIDATARIO.id}</td>
                        <td>{ejidatario.iD_Ejidatario}</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">{EJIDATARIO.nombre}</td>
                        <td>{ejidatario.nombre}</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">{EJIDATARIO.apellidoPaterno}</td>
                        <td>{ejidatario.apellidoPaterno}</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">{EJIDATARIO.apellidoMaterno}</td>
                        <td>{ejidatario.apellidoMaterno}</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">{EJIDATARIO.telefono}</td>
                        <td>{ejidatario.telefono}</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">{EJIDATARIO.curp}</td>
                        <td>{ejidatario.curp}</td>
                    </tr>
                    <tr>
                        <td className="fw-bold">{EJIDATARIO.ine}</td>
                        <td>{
                                ejidatario.documentoPDF !== "" &&
                                    <Link target="_blank"
                                        to={`https://ejidatarios-api.onrender.com/api/ejidatarios/files/${ejidatario.documentoPDF}`}>Descargar</Link>
                        }</td>
                    </tr>
                    </tbody>
                </Table>
                <Link className="btn btn-primary" to={`/editar/${ejidatario.iD_Ejidatario}`}>Editar</Link>
                <Button variant="danger">Eliminar</Button>
                <h2 className="text-center my-4 fs-1 text-info ">
                    Terrenos
                </h2>

                {
                    terrenos.length > 0 ?
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>{TERRENO.numeroParcela}</th>
                                <th>{TERRENO.tipoCertificado}</th>
                                <th>{TERRENO.numeroCertificado}</th>
                                <th>{TERRENO.actoJuridico}</th>
                                <th>{TERRENO.parcelaOrigen}</th>
                                <th>{TERRENO.documentoPDF}</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                terrenos?.map((terreno, index) => (
                                    <tr key={index}>
                                        <td>{terreno.numeroParcela}</td>
                                        <td>{terreno.tipoCertificado}</td>
                                        <td>{terreno.numeroCertificado}</td>
                                        <td>{terreno.actoJuridico}</td>
                                        <td>{
                                            <Link 
                                                target="_blank"
                                                to={`/terreno/${terreno.parcelaOrigen}`}
                                            >
                                                {terreno.parcelaOrigen}
                                            </Link>
                                            }
                                        </td>
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
        }
        </>
    )
}
