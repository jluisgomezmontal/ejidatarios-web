/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { EJIDATARIO } from "../utils/const";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableCell, StyledTableRow } from "../styles";
// eslint-disable-next-line react/prop-types

export const EjidatarioTable = ({ resultado }) => {
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
        ejidatario.nombre,
        ejidatario.apellidoPaterno,
        ejidatario.apellidoMaterno,
        ejidatario.calidadAgraria,
        ejidatario.telefono,
        ejidatario.curp,
        ejidatario.iD_Ejidatario
      )
    );
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
            {rows.map((row) => (
              <StyledTableRow key={row.nombre}>
                <StyledTableCell component="th" scope="row">
                  {row.iD_Ejidatario}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row.nombre} {row.apellidoPaterno} {row.apellidoMaterno}
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
            <StyledTableRow key={resultado.nombre}>
              <StyledTableCell component="th" scope="row">
                {resultado.iD_Ejidatario}
              </StyledTableCell>
              <StyledTableCell align="left">
                {resultado.nombre} {resultado.apellidoPaterno}{" "}
                {resultado.apellidoMaterno}
              </StyledTableCell>
              <StyledTableCell align="left">{resultado.curp}</StyledTableCell>
              <StyledTableCell align="left">
                {resultado.telefono}
              </StyledTableCell>
              <StyledTableCell align="left">
                <Link
                  className="link"
                  target="_blank"
                  to={`/perfil/${resultado.iD_Ejidatario}`}
                >
                  Visitar
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
};
