import {Link, useNavigate, useParams,} from "react-router-dom";
import {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import { TERRENO } from "../utils/const";
import Spinner from 'react-bootstrap/Spinner';

export const Terreno = () => {
    let {ID}  = useParams();
    const [loading, setLoading] = useState(true);
    const [terreno, setTerreno] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const url = `https://ejidatarios-api.onrender.com/api/terrenos/parcela/${ID}`;
            const response = await fetch(url)
            const data = await response.json()
            console.log(data)   
            setTerreno(data);
            setLoading(!loading);
            navigate(`/perfil/${data.iD_Ejidatario}`);
        };
        fetchData();
    }, []);

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
                    Terreno
                </h2>
                <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>{TERRENO.numeroParcela}</th>
                                <th>{TERRENO.tipoCertificado}</th>
                                <th>{TERRENO.numeroCertificado}</th>
                                <th>{TERRENO.actoJuridico}</th>
                                <th>{TERRENO.parcelaOrigen}</th>
                                <th>{TERRENO.propietario}</th>
                                <th>{TERRENO.documentoPDF}</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
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
                                        <Link 
                                            target="_blank"
                                            to={`/perfil/${terreno.iD_Ejidatario}`}>
                                                {terreno.iD_Ejidatario}
                                        </Link>
                                    </td>
                                    <td>
                                        {
                                            terreno.documentoPDF !== "" &&
                                            <Link target="_blank"
                                                to={`https://ejidatarios-api.onrender.com/api/terrenos/files/${terreno.documentoPDF}`}>Descargar</Link>
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                </div>
        }
        </>
    )
}
