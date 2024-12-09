import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useForm} from "../hooks/useForm.jsx";
import {useState} from "react";

export const Buscar = () => {
    const initialForm = {
        metodoDeBusqueda: 'ID',
        valor: ""
    };
    const [formValues, handleInputChange] = useForm(initialForm);
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        const url = "https://ejidatarios-api.onrender.com/api/ejidatarios";
        // const url = "http://localhost:3000/api/ejidatarios";
        ;
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        console.log(form.checkValidity())
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
                                <option value="ID">1.-ID</option>
                                <option value="CURP">2.-CURP</option>
                                <option value="Telefono">3.-Telefono</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid" className="text-white">
                                Seleccione una opcion
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Metodo de busqueda</Form.Label>
                        <Form.Control autoComplete="off" required placeholder="Metodo de busqueda"
                                      value={formValues.valor} onChange={handleInputChange} name="valor" />
                        <Form.Control.Feedback type="invalid">
                            Campo Obligatorio
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Button type="submit">Buscar</Button>
            </Form>
        </div>
    )
}
