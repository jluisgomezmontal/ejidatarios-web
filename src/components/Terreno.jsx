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

export const Terreno = () => {
  let navigate = useNavigate();
  let { ID } = useParams();
  const [loading, setLoading] = useState(true);
  const [terreno, setTerreno] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://ejidatarios-api.onrender.com/api/terrenos/certificado/${ID}`;
      const response = await fetch(url);

      const data = await response.json();
      setTerreno(data);
      console.log(data);
      setLoading(!loading);
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
                  <th>No.</th>
                  <th>{TERRENO.numeroParcela}</th>
                  <th>{TERRENO.tipoCertificado}</th>
                  <th>{TERRENO.numeroCertificado}</th>
                  <th>{TERRENO.actoJuridico}</th>
                  <th>{TERRENO.propietario}</th>
                </tr>
              </thead>
              <tbody>
                <tr key={terreno.numeroParcela + terreno.propietario.curp}>
                  <td>Actual</td>
                  <td>{terreno.numeroParcela}</td>
                  <td>{terreno.tipoCertificado}</td>
                  <td>{terreno.numeroCertificado}</td>
                  <td>{terreno.actoJuridico}</td>

                  <td>
                    <Link
                      target="_blank"
                      to={`${RUTAS.perfil}${terreno.iD_Ejidatario}`}
                      className="link"
                    >
                      {terreno.propietario.nombre}{" "}
                      {terreno.propietario.apellidoPaterno}{" "}
                      {terreno.propietario.apellidoMaterno}
                      {terreno.propietario.nombre && <LaunchIcon />}
                    </Link>
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className="d-flex gap-2">
              <Button
                variant="contained"
                endIcon={<EditIcon />}
                onClick={() =>
                  navigate(`/editar/terreno/${terreno._id}`, {
                    state: terreno,
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
          </div>
        </>
      )}
    </>
  );
};
