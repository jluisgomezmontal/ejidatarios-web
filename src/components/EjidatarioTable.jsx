/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { EJIDATARIO } from "../utils/const";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import { StyledTableCell, StyledTableRow } from "../styles";
import { useDispatch } from "react-redux";
import { setRecientes } from "../redux/loginSlice";
import { useRecientes } from "../hooks/useRecientes";

export const EjidatarioTable = ({ resultado }) => {
  const theme = useTheme();
  const {handleRecientes} = useRecientes();
  if (Array.isArray(resultado)) {
    const rows = resultado.map((ejidatario) => ({
      nombre: ejidatario.nombre ?? ejidatario.propietario?.nombre,
      apellidoPaterno:
        ejidatario.apellidoPaterno ?? ejidatario.propietario?.apellidoPaterno,
      apellidoMaterno:
        ejidatario.apellidoMaterno ?? ejidatario.propietario?.apellidoMaterno,
      calidadAgraria:
        ejidatario.calidadAgraria ?? ejidatario.propietario?.calidadAgraria,
      telefono: ejidatario.telefono ?? ejidatario.propietario?.telefono,
      curp: ejidatario.curp ?? ejidatario.propietario?.curp,
      iD_Ejidatario:
        ejidatario.iD_Ejidatario ?? ejidatario.propietario?.iD_Ejidatario,
    }));

    return (
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="tabla ejidatarios">
          <TableHead>
            <TableRow>
              <StyledTableCell>No.</StyledTableCell>
              <StyledTableCell>{EJIDATARIO.id}</StyledTableCell>
              <StyledTableCell align="left">Nombre Completo</StyledTableCell>
              <StyledTableCell align="left">{EJIDATARIO.curp}</StyledTableCell>
              <StyledTableCell align="left">
                {EJIDATARIO.telefono}
              </StyledTableCell>
              <StyledTableCell align="left">
                {EJIDATARIO.perfil}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{row.iD_Ejidatario}</StyledTableCell>
                <StyledTableCell align="left">
                  {`${row.nombre} ${row.apellidoPaterno} ${row.apellidoMaterno}`}
                </StyledTableCell>
                <StyledTableCell align="left">{row.curp}</StyledTableCell>
                <StyledTableCell align="left">{row.telefono}</StyledTableCell>
                <StyledTableCell align="left">
                  <Link className="link" to={`/perfil/${row.iD_Ejidatario}`}>
                    Visitar <LaunchIcon fontSize="small" />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    const ej = resultado.propietario ?? resultado;

    return (
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Table sx={{ minWidth: 700 }} aria-label="tabla ejidatario">
          <TableHead>
            <TableRow>
              <StyledTableCell>{EJIDATARIO.id}</StyledTableCell>
              <StyledTableCell align="left">Nombre Completo</StyledTableCell>
              <StyledTableCell align="left">{EJIDATARIO.curp}</StyledTableCell>
              <StyledTableCell align="left">
                {EJIDATARIO.telefono}
              </StyledTableCell>
              <StyledTableCell align="left">
                {EJIDATARIO.perfil}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow key={ej?.iD_Ejidatario}>
              <StyledTableCell>{ej?.iD_Ejidatario}</StyledTableCell>
              <StyledTableCell align="left">
                {`${ej?.nombre} ${ej?.apellidoPaterno} ${ej?.apellidoMaterno}`}
              </StyledTableCell>
              <StyledTableCell align="left">{ej?.curp}</StyledTableCell>
              <StyledTableCell align="left">{ej?.telefono}</StyledTableCell>
              <StyledTableCell align="left">
                <Link className="link" to={`/perfil/${ej?.iD_Ejidatario}`}>
                  Visitar <LaunchIcon fontSize="small" />
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};
