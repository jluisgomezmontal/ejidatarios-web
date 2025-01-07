import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { TERRENO } from "../utils/const";
import Spinner from "react-bootstrap/Spinner";
import LaunchIcon from "@mui/icons-material/Launch";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const Terreno = () => {
  let navigate = useNavigate();
  let { ID } = useParams();
  const [loading, setLoading] = useState(true);
  const [terreno, setTerreno] = useState({});
  const [posesionario, setPosesionario] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://ejidatarios-api.onrender.com/api/terrenos/parcela/${ID}`;
      const url2 = `https://ejidatarios-api.onrender.com/api/terrenos/origen/${ID}`;
      const [response, response2] = await Promise.all([
        fetch(url),
        fetch(url2),
      ]);

      const [ejidatario, posesionarios] = await Promise.all([
        response.json(),
        response2.json(),
      ]);
      Array.isArray(ejidatario)
        ? setTerreno(ejidatario)
        : setTerreno(ejidatario);
      console.log(ejidatario);
      console.log(posesionarios);
      setPosesionario(posesionarios);
      setLoading(!loading);
      // navigate(`/perfil/${data.iD_Ejidatario}`);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="info" />
        </div>
      ) : (
        <>
          <div className="mt-5 vh-100">
            <h2 className="text-center my-4 fs-1 text-info ">Terreno</h2>
            <Table striped bordered hover variant="dark" className="mb-5">
              <thead>
                <tr>
                  <th>{TERRENO.numeroParcela}</th>
                  <th>{TERRENO.tipoCertificado}</th>
                  <th>{TERRENO.numeroCertificado}</th>
                  <th>{TERRENO.actoJuridico}</th>
                  <th>{TERRENO.propietario}</th>
                </tr>
              </thead>
              <tbody>
                {terreno.map((ter) => (
                  <tr key={ter.numeroParcela}>
                    <td>{ter.numeroParcela}</td>
                    <td>{ter.tipoCertificado}</td>
                    <td>{ter.numeroCertificado}</td>
                    <td>{ter.actoJuridico}</td>

                    <td>
                      <Link
                        target="_blank"
                        to={`/perfil/${ter.iD_Ejidatario}`}
                        className="link"
                      >
                        {ter.propietario.nombre}{" "}
                        {ter.propietario.apellidoPaterno}{" "}
                        {ter.propietario.apellidoMaterno}
                        {ter.propietario.nombre && <LaunchIcon />}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex gap-2">
              <Button
                variant="contained"
                endIcon={<EditIcon />}
                onClick={() =>
                  navigate(`/editar/terreno/${terreno.iD_Ejidatario}`, {
                    state: terreno,
                  })
                }
              >
                Editar
              </Button>
            </div>
            <h2 className="text-center my-4 fs-1 text-info mt-5">
              Posesionarios
            </h2>
            <Table striped bordered hover variant="dark">
              <thead className="bg-info">
                <tr>
                  <th>{TERRENO.tipoCertificado}</th>
                  <th>{TERRENO.folio}</th>
                  <th>{TERRENO.actoJuridico}</th>
                  <th>{TERRENO.posesionario}</th>
                </tr>
              </thead>
              <tbody>
                {posesionario?.map((pos, idx) => (
                  <tr key={idx}>
                    <td>{pos.tipoCertificado}</td>
                    <td>{pos.numeroCertificado}</td>
                    <td>{pos.actoJuridico}</td>

                    <td>
                      <Link
                        target="_blank"
                        to={`/perfil/${pos.iD_Ejidatario}`}
                        className="link"
                      >
                        {pos.propietario.nombre}{" "}
                        {pos.propietario.apellidoPaterno}{" "}
                        {pos.propietario.apellidoMaterno}
                        {pos.propietario.nombre && <LaunchIcon />}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </>
  );
};
