import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Alert } from "react-bootstrap";
import Button from "@mui/material/Button";
import { BOTONES, EJIDATARIO, RUTAS, TERRENO } from "../utils/const";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import LaunchIcon from "@mui/icons-material/Launch";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid2";
import {
  ButtonGroup,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useRecientes } from "../hooks/useRecientes";
import { Recientes } from "./Recientes.jsx";
import { useSelector } from "react-redux";

export const Perfil = () => {
  let navigate = useNavigate();
  let {handleRecientes} = useRecientes();
  let { ID } = useParams();
  const [loading, setLoading] = useState(true);
  const [ejidatario, setEjidatario] = useState({});
  const [terrenos, setTerrenos] = useState([]);
  const { recientes } = useSelector((state) => state.login);
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
          handleRecientes({nombre:`${data.nombre} ${data.apellidoPaterno[0]}. ${data.apellidoMaterno[0]}.`, ejidatario:data.iD_Ejidatario})
        } else {
          setEjidatario(data[0].propietario);
          handleRecientes({nombre:`${data[0].propietario.nombre} ${data[0].propietario.apellidoPaterno[0]}. ${data[0].propietario.apellidoMaterno[0]}.`, ejidatario:data[0].propietario.iD_Ejidatario})
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
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="info" />
        </div>
      ) : (
        <div className="mt-5">
          <h2 className="text-center my-4 fs-1 text-info ">Sujeto</h2>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            {recientes?.length > 0 && (
              <Grid size={{ xs: 12, md: 3 }}>
                <Recientes />
              </Grid>
            )}
            <Grid size={{ xs: 12, md: recientes?.length > 0 ? 9 : 12 }}>
          <Box component="form" noValidate autoComplete="off">
            <Grid
              container
              rowSpacing={5}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid size={12}>
                <FormControl sx={{ width: "100%" }} disabled>
                  <InputLabel id="demo-simple-select-label">
                    Calidad Agraria
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    value={ejidatario?.calidadAgraria}
                    name="calidadAgraria"
                  >
                    <MenuItem value={""}>Seleccione una opcion</MenuItem>
                    <MenuItem value="EJIDATARIO">1.-EJIDATARIO</MenuItem>
                    <MenuItem value="AVECINDADO">2.-AVECINDADO</MenuItem>
                    <MenuItem value="POSESIONARIO DE HECHO">
                      3.-POSESIONARIO DE HECHO
                    </MenuItem>
                    <MenuItem value="POSESIONARIO DE DERECHO">
                      4.-POSESIONARIO DE DERECHO{" "}
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={6}>
                <TextField
                  disabled
                  autoComplete="off"
                  placeholder={EJIDATARIO.id}
                  value={ejidatario?.iD_Ejidatario}
                  name="iD_Ejidatario"
                  label="ID Ejidatario"
                  variant="outlined"
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  disabled
                  sx={{ width: "100%" }}
                  placeholder={EJIDATARIO.nombre}
                  value={ejidatario?.nombre}
                  name="nombre"
                  label={EJIDATARIO.nombre}
                  variant="outlined"
                />
              </Grid>

              <Grid size={6}>
                <TextField
                  disabled
                  sx={{ width: "100%" }}
                  autoComplete="nope"
                  placeholder={EJIDATARIO.apellidoPaterno}
                  value={ejidatario?.apellidoPaterno}
                  label={EJIDATARIO.apellidoPaterno}
                  name="apellidoPaterno"
                  variant="outlined"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  disabled
                  autoComplete="nope"
                  placeholder={EJIDATARIO.apellidoMaterno}
                  label={EJIDATARIO.apellidoMaterno}
                  value={ejidatario?.apellidoMaterno}
                  name={"apellidoMaterno"}
                  sx={{ width: "100%" }}
                  variant="outlined"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  disabled
                  autoComplete="off"
                  placeholder={EJIDATARIO.telefono}
                  label={EJIDATARIO.telefono}
                  value={ejidatario?.telefono}
                  sx={{ width: "100%" }}
                  name="telefono"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  disabled
                  autoComplete="off"
                  placeholder={EJIDATARIO.curp}
                  label={EJIDATARIO.curp}
                  sx={{ width: "100%" }}
                  value={ejidatario?.curp}
                  name="curp"
                />
              </Grid>
              {ejidatario?.documentoPDF !== "" && (
                <Grid size={12} className="mb-4">
                  <ButtonGroup
                    aria-label="Disabled button group"
                    variant="outlined"
                  >
                    <Button
                      component="label"
                      color="success"
                      tabIndex={-1}
                      startIcon={<CloudDownloadIcon />}
                      onClick={() => {
                        window.open(
                          `https://ejidatarios-api.onrender.com/api/ejidatarios/files/${ejidatario?.documentoPDF}`,
                          "_blank"
                        );
                      }}
                    >
                      {BOTONES.descargarINE}
                    </Button>
                    <Button
                      component="label"
                      color="info"
                      tabIndex={-1}
                      startIcon={<CloudDownloadIcon />}
                      onClick={() => {
                        window.open(
                          `https://ejidatarios-api.onrender.com/uploads/ejidatarios/${ejidatario?.documentoPDF}`,
                          "_blank"
                        );
                      }}
                    >
                      {BOTONES.verINE}
                    </Button>
                  </ButtonGroup>
                </Grid>
              )}
            </Grid>
          </Box>
          </Grid>
          </Grid>
          <div className="d-flex gap-2 my-4">
            <Button
              variant="contained"
              endIcon={<EditIcon />}
              onClick={() =>
                navigate(`/editar/ejidatario/${ejidatario?.iD_Ejidatario}`, {
                  state: ejidatario,
                })
              }
            >
              {BOTONES.editar}
            </Button>
            <Button
              variant="contained"
              color="error"
              endIcon={<DeleteIcon />}
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
                      const url = `https://ejidatarios-api.onrender.com/api/ejidatarios/${ejidatario?._id}`;
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
            >
              {BOTONES.eliminar}
            </Button>
          </div>

          <h2 className="text-center my-4 fs-1 text-info ">Terrenos</h2>

          {terrenos.length > 0 ? (
            <Table striped bordered hover variant="dark" responsive>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>{TERRENO.numeroParcela}</th>
                  <th>{TERRENO.tipoCertificado}</th>
                  <th>
                    {TERRENO.numeroCertificado} o {TERRENO.folio}
                  </th>
                  <th>{TERRENO.actoJuridico}</th>
                  <th>{TERRENO.parcelaOrigen}</th>
                  <th>{TERRENO.documentoPDF}</th>
                </tr>
              </thead>
              <tbody>
                {terrenos?.map((terreno, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {
                        <Link
                          className="link"
                          to={`${RUTAS.parcela}${terreno.numeroParcela}`}
                        >
                          {terreno.numeroParcela}
                          {terreno.numeroParcela && <LaunchIcon />}
                        </Link>
                      }
                    </td>
                    <td>
                      {terreno.tipoCertificado === "USO COMUN"
                        ? `${terreno.tipoCertificado} ${terreno.porcentaje}%`
                        : terreno.tipoCertificado}
                    </td>
                    <td>
                      {
                        <Link
                          className="link"
                          to={`${RUTAS.terreno}${terreno.numeroCertificado}`}
                        >
                          {terreno.numeroCertificado}
                          {terreno.numeroCertificado && <LaunchIcon />}
                        </Link>
                      }
                    </td>
                    <td>{terreno.actoJuridico}</td>
                    <td>
                      {
                        <Link
                          className="link"
                          to={`${RUTAS.parcela}${terreno.parcelaOrigen}`}
                        >
                          {terreno.parcelaOrigen}
                          {terreno.parcelaOrigen && <LaunchIcon />}
                        </Link>
                      }
                    </td>
                    <td>
                      {terreno.documentoPDF !== "" && (
                        <>
                        {/* <Button
                          component="label"
                          color="success"
                          tabIndex={-1}
                          startIcon={<CloudDownloadIcon />}
                          onClick={() => {
                            window.open(
                              `https://ejidatarios-api.onrender.com/api/terrenos/files/${terreno.documentoPDF}`,
                              "_blank"
                            );
                          }}
                          >
                          Descargar
                        </Button> */}
                        <Button
                          component="label"
                          color="success"
                          tabIndex={-1}
                          startIcon={<CloudDownloadIcon />}
                          onClick={() => {
                            window.open(
                              `https://ejidatarios-api.onrender.com/uploads/terrenos/${terreno.documentoPDF}`,
                              "_blank"
                            );
                          }}
                          >
                          Ver
                        </Button>
                      </>
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
