import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useForm} from "../hooks/useForm.jsx";
import {useState} from "react";

export const Buscar = () => {
    const initialForm = {
        metodoDeBusqueda: '',
        valor: ""
    };
    const [formValues, handleInputChange] = useForm(initialForm);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    return (
        <div>
            <h3>Buscar</h3>
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
                <Form.Group as={Row} className="my-5" controlId="validationCustom01">
                    <Col md={"6"}>
                        <Form.Group controlId="validationCustom02" >
                            <Form.Label>¿Metodo de busqueda?</Form.Label>
                            <Form.Select
                                required
                                onChange={handleInputChange}
                                name="metodoDeBusqueda"
                                value={formValues.metodoDeBusqueda}
                            >
                                <option value="">Seleccione una opcion</option>
                                <option value="ID">1.-ID</option>
                                <option value="CURP">2.-CURP</option>
                                <option value="Numero de Certificado">3.-Numero de Certificado</option>
                                <option value="Numero de Parcela">4.-Numero de Parcela o Folio</option>
                                <option value="Numero de Folio">4.-Numero de Parcela o Folio</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="text-white">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    {
                        formValues.metodoDeBusqueda !== "" &&
                        <Col md={"6"}>
                            <Form.Label>{formValues.metodoDeBusqueda}</Form.Label>
                            <Form.Control type="text" placeholder={"Introduzca "+formValues.metodoDeBusqueda} required />
                            <Form.Control.Feedback type="invalid">
                                Introdusca un valor valido.
                            </Form.Control.Feedback>
                        </Col>
                    }
                </Form.Group>
                <Button type="submit">Buscar</Button>
            </Form>
        </div>
    )
}
