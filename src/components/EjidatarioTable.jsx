/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { EJIDATARIO } from "../utils/const";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LaunchIcon from "@mui/icons-material/Launch";
import { StyledTableCell, StyledTableRow } from "../styles";
// eslint-disable-next-line react/prop-types

export const EjidatarioTable = ({ resultado }) => {
  console.log(resultado);
  if (Array.isArray(resultado)) {
    function createData(
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      calidadAgraria,
      telefono,
      curp,
      iD_Ejidatario
    ) {
      return {
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        calidadAgraria,
        telefono,
        curp,
        iD_Ejidatario,
      };
    }

    const rows = resultado.map((ejidatario) =>
      createData(
        ejidatario.nombre ?? ejidatario.propietario.nombre,
        ejidatario.apellidoPaterno ?? ejidatario.propietario.apellidoPaterno,
        ejidatario.apellidoMaterno ?? ejidatario.propietario.apellidoMaterno,
        ejidatario.calidadAgraria ?? ejidatario.propietario.calidadAgraria,
        ejidatario.telefono ?? ejidatario.propietario.telefono,
        ejidatario.curp ?? ejidatario.propietario.curp,
        ejidatario.iD_Ejidatario ?? ejidatario.propietario.iD_Ejidatario
      )
    );
    console.log(rows);
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No.</StyledTableCell>
              <StyledTableCell>{EJIDATARIO.id}</StyledTableCell>
              <StyledTableCell align="left">Nombre Completo</StyledTableCell>
              <StyledTableCell align="left">{EJIDATARIO.curp}</StyledTableCell>
              <StyledTableCell align="left">
                {EJIDATARIO.calidadAgraria}
              </StyledTableCell>
              <StyledTableCell align="left">
                {EJIDATARIO.perfil}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.iD_Ejidatario}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {`${row.nombre ?? "row.propietario.nombre"} ${
                    row.apellidoPaterno ?? "row.propietario.apellidoPaterno"
                  } ${
                    row.apellidoMaterno ?? "row.propietario.apellidoMaterno"
                  }`}
                </StyledTableCell>
                <StyledTableCell align="left">{row.curp}</StyledTableCell>
                <StyledTableCell align="left">{row.telefono}</StyledTableCell>
                <StyledTableCell align="left">
                  <Link
                    className="link"
                    target="_blank"
                    to={`/perfil/${row.iD_Ejidatario}`}
                  >
                    Visitar
                    <LaunchIcon />
                  </Link>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>{EJIDATARIO.id}</StyledTableCell>
              <StyledTableCell align="left">Nombre Completo</StyledTableCell>
              <StyledTableCell align="left">{EJIDATARIO.curp}</StyledTableCell>
              <StyledTableCell align="left">
                {EJIDATARIO.calidadAgraria}
              </StyledTableCell>
              <StyledTableCell align="left">
                {EJIDATARIO.perfil}
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow key={resultado.propietario?.nombre}>
              <StyledTableCell component="th" scope="row">
                {resultado.propietario?.iD_Ejidatario ??
                  resultado.iD_Ejidatario}
              </StyledTableCell>
              <StyledTableCell align="left">
                {resultado.propietario?.nombre ??
                  resultado.nombre ??
                  resultado?.apellidoPaterno}{" "}
                {resultado.propietario?.apellidoPaterno ??
                  resultado?.apellidoPaterno}{" "}
                {resultado.propietario?.apellidoMaterno ??
                  resultado?.apellidoMaterno}
              </StyledTableCell>
              <StyledTableCell align="left">
                {resultado.propietario?.curp ?? resultado?.curp}
              </StyledTableCell>
              <StyledTableCell align="left">
                {resultado.propietario?.telefono ?? resultado?.telefono}
              </StyledTableCell>
              <StyledTableCell align="left">
                <Link
                  className="link"
                  target="_blank"
                  to={`/perfil/${
                    resultado.propietario?.iD_Ejidatario ??
                    resultado?.iD_Ejidatario
                  }`}
                >
                  Visitar
                  <LaunchIcon />
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};
