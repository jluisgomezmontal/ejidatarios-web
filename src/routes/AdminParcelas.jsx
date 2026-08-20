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

export const AdminParcelas = () => {
  const [parcelas, setParcelas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParcelas = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/terrenos`
        );
        const data = await res.json();
        setParcelas(data);
      } catch (error) {
        console.error("Error al obtener las parcelas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParcelas();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography color="primary" variant="h5" gutterBottom>
        Lista de Parcelas
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>tipo Certificado</TableCell>
              <TableCell>Numero Parcela</TableCell>
              <TableCell>numeroCertificado</TableCell>
              <TableCell>actoJuridico</TableCell>
              <TableCell>Propietario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parcelas.map((p, index) => (
              <TableRow key={p._id}>
                <TableCell>{index + 1 || "N/A"}</TableCell>
                <TableCell>{p.tipoCertificado || "N/A"}</TableCell>
                <TableCell>{p.numeroParcela || "N/A"}</TableCell>
                <TableCell>{p.numeroCertificado || "N/A"}</TableCell>
                <TableCell>{p.actoJuridico || "N/A"}</TableCell>
                <TableCell>
                  {p.propietario?.nombre
                    ? `${p.propietario.nombre} ${p.propietario.apellidoPaterno} ${p.propietario.apellidoMaterno}`
                    : "Sin propietario"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
