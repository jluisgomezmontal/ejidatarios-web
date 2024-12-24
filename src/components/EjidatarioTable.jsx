/* eslint-disable react/prop-types */
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { EJIDATARIO } from "../utils/const";

// eslint-disable-next-line react/prop-types
export const EjidatarioTable = ({ resultado }) => {
  if (Array.isArray(resultado)) {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>{EJIDATARIO.id}</th>
            <th>{EJIDATARIO.nombreCompleto}</th>
            <th>{EJIDATARIO.calidadAgraria}</th>
            <th>{EJIDATARIO.telefono}</th>
            <th>{EJIDATARIO.curp}</th>
            <th>{EJIDATARIO.perfil}</th>
          </tr>
        </thead>
        {
          // eslint-disable-next-line react/prop-types
          resultado.map((element, index) => (
            <tbody key={index}>
              <tr>
                <td>{element.iD_Ejidatario}</td>
                <td>
                  {element.nombre ? element.nombre : element.propietario.nombre}{" "}
                  {element.apellidoPaterno} {element.apellidoMaterno}
                </td>
                <td>{element.calidadAgraria}</td>
                <td>{element.telefono}</td>
                <td>{element.curp}</td>
                <td>
                  <Link to={`/perfil/${element.iD_Ejidatario}`}>VISITAR</Link>
                </td>
              </tr>
            </tbody>
          ))
        }
      </Table>
    );
  } else {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>{EJIDATARIO.id}</th>
            <th>{EJIDATARIO.nombreCompleto}</th>
            <th>{EJIDATARIO.calidadAgraria}</th>
            <th>{EJIDATARIO.perfil}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{resultado.iD_Ejidatario}</td>
            <td>
              {resultado.nombre
                ? resultado.nombre
                : resultado.propietario.nombre}{" "}
              {resultado.apellidoPaterno
                ? resultado.apellidoPaterno
                : resultado.propietario.apellidoPaterno}{" "}
              {resultado.apellidoMaterno
                ? resultado.apellidoMaterno
                : resultado.propietario.apellidoMaterno}
            </td>
            <td>
              {resultado.calidadAgraria
                ? resultado.calidadAgraria
                : resultado.propietario.calidadAgraria}
            </td>
            <td>
              <Link to={`/perfil/${resultado.iD_Ejidatario}`}>VISITAR</Link>
            </td>
          </tr>
        </tbody>
      </Table>
    );
  }
};
