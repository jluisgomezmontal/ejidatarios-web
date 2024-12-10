import Table from "react-bootstrap/Table";
import {Link} from "react-router-dom";

                    // eslint-disable-next-line react/prop-types
export const EjidatarioTable = ({resultado}) => {
    if (Array.isArray(resultado)){
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>iD_Ejidatario</th>
                    <th>Nombre Completo</th>
                    <th>Calidad Agraria</th>
                    <th>Telefono</th>
                    <th>Curp</th>
                    <th>Perfil</th>
                </tr>
                </thead>
                {
                    // eslint-disable-next-line react/prop-types
                    resultado.map((element, index) => (
                        <tbody key={index}>
                        <tr>
                            <td>{element.iD_Ejidatario}</td>
                            <td>{element.nombre} {element.apellidoPaterno} {element.apellidoMaterno}</td>
                            <td>{element.calidadAgraria}</td>
                            <td>{element.telefono}</td>
                            <td>{element.curp}</td>
                            <td>{element.curp}</td>
                        </tr>
                        </tbody>
                    ))
                }
            </Table>
        )
    } else {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>iD_Ejidatario</th>
                    <th>Nombre Completo</th>
                    <th>Calidad Agraria</th>
                    <th>Telefono</th>
                    <th>Curp</th>
                    <th>Perfil</th>
                </tr>
                </thead>
                <tbody>
            <tr>
                <td>{resultado.iD_Ejidatario}</td>
                <td>{resultado.nombre} {resultado.apellidoPaterno} {resultado.apellidoMaterno}</td>
                <td>{resultado.calidadAgraria}</td>
                <td>{resultado.telefono}</td>
                <td>{resultado.curp}</td>
                <td>
                    <Link to={`/perfil/${resultado.iD_Ejidatario}`}>VISITAR</Link>
                </td>
            </tr>
            </tbody>
        </Table>)
    }
}
