import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useForm} from "../hooks/useForm.jsx";

export const Buscar = () => {
    const initialForm = {
        buscar: '',
        metodoDeBusqueda: '',
        valor: ""
    };
    const [formValues, handleInputChange] = useForm(initialForm);

    return (
        <div>
            <h3>Buscar</h3>
            <Form>
                <Form.Group as={Row} className="my-5">
                    <Col md={"6"}>
                        <Form.Group>
                            <Form.Label>¿Que desea buscar?</Form.Label>
                            <Form.Select
                                onChange={handleInputChange}
                                name="buscar"
                                value={formValues.buscar}
                            >
                                <option>----------Seleccione una opcion</option>
                                <option>Sujetos</option>
                                <option>Parcelas</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    {
                        formValues.buscar !== "" &&
                        <Col md={"6"}>
                            <Form.Group>
                                <Form.Label>¿Como lo desea buscar buscar?</Form.Label>
                                <Form.Select
                                    onChange={handleInputChange}
                                    name="metodoDeBusqueda"
                                    value={formValues.metodoDeBusqueda}
                                >
                                    <option>ID</option>
                                    <option>CURP</option>
                                    <option>CURP</option>
                                    <option>Telefono</option>
                                    <option>Numero de Parcela o Folio</option>
                                    <option>Numero de Certificado</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    }
                </Form.Group>
                <Button type="submit">Guardar</Button>
            </Form>
        </div>
    )
}
