import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {useForm} from "../hooks/useForm.jsx";
import {useState} from "react";
import {Alert} from "react-bootstrap";
import {EjidatarioTable} from "../components/EjidatarioTable.jsx";

export const Buscar = () => {
    const initialForm = {
        metodoDeBusqueda: 'ID',
        valor: "220690"
    };
    const [formValues, handleInputChange] = useForm(initialForm);
    const [validated, setValidated] = useState(false);
    const [resultado, setResultado] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        let url
        if (formValues.metodoDeBusqueda === 'ID') {
            url = `https://ejidatarios-api.onrender.com/api/ejidatarios/id/${formValues.valor}`;
        }else if (formValues.metodoDeBusqueda === 'CURP') {
            url = `https://ejidatarios-api.onrender.com/api/ejidatarios/curp/${formValues.valor}`;
        }else if (formValues.metodoDeBusqueda === 'TELEFONO') {
            url = `https://ejidatarios-api.onrender.com/api/ejidatarios/telefono/${formValues.valor}`;
        }else{
            url = `https://ejidatarios-api.onrender.com/api/ejidatarios`;
        }
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        setResultado(data);
    };
    return (
        <div className="vh-100">
            <h2 className="text-center my-4 fs-1 text-info ">
                Buscar
            </h2>
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
                <Form.Group as={Row} className="my-5" controlId="validationCustom01">
                    <Col md={"6"}>
                        <Form.Group controlId="validationCustom02">
                            <Form.Label>¿Metodo de busqueda?</Form.Label>
                            <Form.Select
                                required
                                onChange={handleInputChange}
                                name="metodoDeBusqueda"
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
                                      value={formValues.valor} onChange={handleInputChange} name="valor"/>
                        <Form.Control.Feedback type="invalid">
                            Campo Obligatorio
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Button type="submit">Buscar</Button>
            </Form>
            <h2 className="my-5 fs-2 text-light ">
                Resultados
            </h2>

            {
                resultado.iD_Ejidatario &&
                <EjidatarioTable resultado={resultado}/>
            }
            {
                resultado.error &&
                <Alert variant="danger" text={"dark"}>
                    No se encontraron datos
                </Alert>

            }
        </div>
    )
}
