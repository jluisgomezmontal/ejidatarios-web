import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Alert, Button } from "react-bootstrap";
import { EJIDATARIO, TERRENO } from "../utils/const";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";

export const Perfil = () => {
  let navigate = useNavigate();
  let { ID } = useParams();
  const [loading, setLoading] = useState(true);
  const [ejidatario, setEjidatario] = useState({});
  const [terrenos, setTerrenos] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://ejidatarios-api.onrender.com/api/terrenos/sujeto/${ID}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.length === 0) {
          const url = `https://ejidatarios-api.onrender.com/api/ejidatarios/id/${ID}`;
          const response = await fetch(url);
          const data = await response.json();
          setEjidatario(data);
        } else {
          setEjidatario(data[0].propietario);
        }
        setTerrenos(data);
        setLoading(!loading);
      } catch (error) {
        console.error(error);
      }
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
        <div className="mt-5 vh-100">
          <h2 className="text-center my-4 fs-1 text-info ">Sujeto</h2>
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
                <td>
                  {ejidatario.documentoPDF !== "" && (
                    <Link
                      target="_blank"
                      to={`https://ejidatarios-api.onrender.com/api/ejidatarios/files/${ejidatario.documentoPDF}`}
                    >
                      Descargar
                    </Link>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="d-flex gap-2 mb-2">
            <Link
              className="btn btn-primary"
              to={`/editar/${ejidatario.iD_Ejidatario}`}
            >
              Editar
            </Link>
            <Button
              onClick={async () => {
                try {
                  Swal.fire({
                    title: "¿Seguro que quieres eliminar el perfil?",
                    text: "No podras revertir esto.",
                    showDenyButton: true,
                    confirmButtonText: "Cancelar",
                    confirmButtonColor: "#0d6efd",
                    icon: "warning",
                    denyButtonText: `Eliminar`,
                  }).then(async (result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (!result.isConfirmed) {
                      const url = `https://ejidatarios-api.onrender.com/api/ejidatarios/${ejidatario._id}`;
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
                        title: "Perfil no eliminado",
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
              variant="danger"
            >
              Eliminar
            </Button>
          </div>

          <h2 className="text-center my-4 fs-1 text-info ">Terrenos</h2>

          {terrenos.length > 0 ? (
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
                {terrenos?.map((terreno, index) => (
                  <tr key={index}>
                    <td>{terreno.numeroParcela}</td>
                    <td>{terreno.tipoCertificado}</td>
                    <td>{terreno.numeroCertificado}</td>
                    <td>{terreno.actoJuridico}</td>
                    <td>
                      {
                        <Link
                          target="_blank"
                          to={`/terreno/${terreno.parcelaOrigen}`}
                        >
                          {terreno.parcelaOrigen}
                        </Link>
                      }
                    </td>
                    <td>
                      {terreno.documentoPDF !== "" && (
                        <Link
                          target="_blank"
                          to={`https://ejidatarios-api.onrender.com/api/terrenos/files/${terreno.documentoPDF}`}
                        >
                          Descargar
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="danger" text={"dark"}>
              No se encontraron terrenos
            </Alert>
          )}
        </div>
      )}
    </>
  );
};
