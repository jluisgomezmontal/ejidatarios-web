import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { RUTAS, TERRENO } from "../utils/const";
import Spinner from "react-bootstrap/Spinner";
import LaunchIcon from "@mui/icons-material/Launch";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

export const Parcela = () => {
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
      setTerreno(ejidatario.reverse());
      setPosesionario(posesionarios);
      setLoading(!loading);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="info" />
        </div>
      ) : (
        <>
          <div className="mt-5">
            <h2 className="text-center my-4 fs-1 text-info ">Terreno</h2>
            <Table striped bordered hover variant="dark" className="mb-5">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>{TERRENO.numeroParcela}</th>
                  <th>{TERRENO.tipoCertificado}</th>
                  <th>{TERRENO.numeroCertificado}</th>
                  <th>{TERRENO.actoJuridico}</th>
                  <th>{TERRENO.propietario}</th>
                </tr>
              </thead>
              <tbody>
                {terreno.map((ter, index, array) => (
                  <tr key={ter.numeroParcela + ter.propietario.curp}>
                    <td>
                      {array.length - index === array.length
                        ? "Actual"
                        : array.length - index}
                    </td>
                    <td>{ter.numeroParcela}</td>
                    <td>{ter.tipoCertificado}</td>
                    <td>{ter.numeroCertificado}</td>
                    <td>{ter.actoJuridico}</td>

                    <td>
                      <Link
                        to={`${RUTAS.perfil}${ter.iD_Ejidatario}`}
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
                  navigate(`/editar/terreno/${terreno[0]._id}`, {
                    state: terreno[0],
                  })
                }
              >
                Editar
              </Button>
              <Button
                variant="contained"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={async () => {
                  try {
                    Swal.fire({
                      title: "¿Seguro que quieres eliminar el terreno?",
                      text: "No podras revertir esto.",
                      showDenyButton: true,
                      confirmButtonText: "Cancelar",
                      confirmButtonColor: "#0d6efd",
                      icon: "warning",
                      denyButtonText: `Eliminar`,
                    }).then(async (result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (!result.isConfirmed) {
                        const url = `https://ejidatarios-api.onrender.com/api/terrenos/${terreno._id}`;
                        const response = await fetch(url, {
                          method: "DELETE",
                        });
                        const data = await response.json();
                        Swal.fire({
                          title: data.message,
                          icon: "success",
                          confirmButtonColor: "#0d6efd",
                          timer: 2000,
                        });
                        navigate("/");
                      } else {
                        Swal.fire({
                          title: "Terreno no eliminado",
                          icon: "info",
                          confirmButtonColor: "#0d6efd",
                          timer: 1000,
                        });
                      }
                    });
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Eliminar
              </Button>
            </div>
            {posesionario.length > 0 ? (
              <>
                <h2 className="text-center my-4 fs-1 text-info mt-5">
                  Posesionarios
                </h2>
                <Table striped bordered hover variant="dark">
                  <thead className="bg-info">
                    <tr>
                      <th>No.</th>
                      <th>{TERRENO.tipoCertificado}</th>
                      <th>{TERRENO.folio}</th>
                      <th>{TERRENO.actoJuridico}</th>
                      <th>{TERRENO.posesionario}</th>
                      <th>{TERRENO.emitido}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posesionario?.map((pos, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{pos.tipoCertificado}</td>
                        <td>{pos.numeroCertificado}</td>
                        <td>{pos.actoJuridico}</td>

                        <td>
                          <Link
                            to={`${RUTAS.perfil}${pos.iD_Ejidatario}`}
                            className="link"
                          >
                            {pos.propietario?.nombre === undefined ? "undefined":pos.propietario?.nombre}{" "}
                            {pos.propietario?.apellidoPaterno}{" "}
                            {pos.propietario?.apellidoMaterno}
                            {pos.propietario?.nombre && <LaunchIcon />}
                          </Link>
                        </td>
                        <td>
                          {pos.propietarioOrigen?.nombre === undefined ? "undefined": pos.propietarioOrigen?.nombre }{" "}
                          {pos.propietarioOrigen?.apellidoPaterno}{" "}
                          {pos.propietarioOrigen?.apellidoMaterno}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              terreno[0].tipoCertificado !== "USO COMUN" && (
                <h2 className="text-center my-4 fs-1 text-danger">
                  Sin Posesionarios
                </h2>
              )
            )}
          </div>
        </>
      )}
    </>
  );
};
