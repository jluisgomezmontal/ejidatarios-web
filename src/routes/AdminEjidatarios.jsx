import { useEffect, useState } from "react";
import { API_URL } from "../utils/const.js";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

export const AdminEjidatarios = () => {
  const [ejidatarios, setEjidatarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEjidatarios = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/ejidatarios`
        );
        const data = await res.json();
        setEjidatarios(data);
      } catch (error) {
        console.error("Error al obtener los ejidatarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEjidatarios();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography color="primary" variant="h5" gutterBottom>
        Lista de Ejidatarios
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>ID Ejidatario</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido Paterno</TableCell>
              <TableCell>Apellido Materno</TableCell>
              <TableCell>Calidad Agraria</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>CURP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ejidatarios.map((e, index) => (
              <TableRow key={e._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{e.iD_Ejidatario}</TableCell>
                <TableCell>{e.nombre}</TableCell>
                <TableCell>{e.apellidoPaterno}</TableCell>
                <TableCell>{e.apellidoMaterno}</TableCell>
                <TableCell>{e.calidadAgraria}</TableCell>
                <TableCell>{e.telefono}</TableCell>
                <TableCell>{e.curp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
