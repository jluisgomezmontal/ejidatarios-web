import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useForm} from "../hooks/useForm.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import {ejidatariosEjemplo} from "../mocks.js";

export const Ejidatarios = () => {

    const initialForm = {
        calidadAgraria: '',
        iD_Ejidatario: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        domicilio: '',
        telefono: '',
        curp: '',
    };

    const [ formValues, handleInputChange, reset ] = useForm( initialForm );

    const [ejidatarios, setEjidatarios] = useState(ejidatariosEjemplo)
    const [validated, setValidated] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity()) {
            // Agregar los valores del formulario a la lista de ejidatarios
            setEjidatarios([...ejidatarios, formValues]);
            console.log("Nuevo ejidatario agregado");

            // Limpiar el formulario
            reset();

            // Resetear la validación después de un envío exitoso
            setValidated(false);
        } else {
            // Mostrar errores de validación
            setValidated(true);
        }
    };

    return (
        <div>
            <h3>Agregar Sujeto</h3>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="my-5" controlId="validationCustom01" hasValidation>
                    <Col md={"6"} className="">
                        <Form.Label>Calidad Agraria:</Form.Label>
                        <Form.Group className="mb-3" >
                            <Form.Select value={formValues.calidadAgraria} onChange={handleInputChange} name="calidadAgraria" required>
                                <option value={""}>Seleccione una opcion</option>
                                <option>1.-Ejidatario</option>
                                <option>2.-Avecindado</option>
                                <option>3.-Posesionario de hecho</option>
                                <option>4.-Posesionario de derecho</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                Campo Obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Group>
                {
                    //formValues.calidadAgraria !== "" &&
                <Form.Group as={Row} className="my-5" controlId="validationCustomUsername22" hasValidation>
                        <Col>
                            <Form.Label>{formValues.calidadAgraria === 'No Aplica'? 'ID Sujeto:' : 'ID Ejidatario:'}</Form.Label>
                            <Form.Control autoComplete="off" required placeholder={formValues.calidadAgraria === 'No Aplica'? 'ID Sujeto' : 'ID Ejidatario'}
                                          value={formValues.iD_Ejidatario} onChange={handleInputChange} name="iD_Ejidatario" />
                            <Form.Control.Feedback type="invalid">
                                Campo Obligatorio
                            </Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control autoComplete="nope" required  placeholder="Nombre" value={formValues.nombre} onChange={handleInputChange} name="nombre" />
                            <Form.Control.Feedback type="invalid">
                                Campo Obligatorio
                            </Form.Control.Feedback>
                        </Col>
                </Form.Group>
                }
                {
                    //formValues.nombre !== "" &&
                <Form.Group as={Row} className="my-5" hasValidation>
                        <Col>
                            <Form.Label>Apellido Paterno:</Form.Label>
                            <Form.Control required autoComplete="nope" placeholder="Apellido Paterno" value={formValues.apellidoPaterno} onChange={handleInputChange} name="apellidoPaterno"/>
                            <Form.Control.Feedback type="invalid">
                                Campo Obligatorio
                            </Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Label>Apellido Materno:</Form.Label>
                            <Form.Control required autoComplete="nope" placeholder="Apellido Materno" value={formValues.apellidoMaterno} onChange={handleInputChange} name={"apellidoMaterno"} />
                            <Form.Control.Feedback type="invalid">
                                Campo Obligatorio
                            </Form.Control.Feedback>
                        </Col>
                </Form.Group>
                }
                {
                 //   formValues.apellidoMaterno !== "" &&
                <Form.Group as={Row} className="my-5" hasValidation>
                        <Col>
                            <Form.Label>Domicilio:</Form.Label>
                            <Form.Control required autoComplete="off" placeholder="Domicilio" value={formValues.domicilio} onChange={handleInputChange} name="domicilio" />
                            <Form.Control.Feedback type="invalid">
                                Campo Obligatorio
                            </Form.Control.Feedback>
                        </Col>
                        <Col>
                            <Form.Label>Telefono:</Form.Label>
                            <Form.Control required autoComplete="off" placeholder="Telefono" value={formValues.telefono} onChange={handleInputChange} name="telefono" />
                            <Form.Control.Feedback type="invalid">
                                Campo Obligatorio
                            </Form.Control.Feedback>
                        </Col>
                </Form.Group>
                }
                {
                    //formValues.telefono !== "" &&
                <Form.Group as={Row} className="my-5" hasValidation>
                    <Col >
                        <Form.Label>CURP:</Form.Label>
                        <Form.Control required autoComplete="off" placeholder="CURP" value={formValues.curp} onChange={handleInputChange} name="curp" />
                        <Form.Control.Feedback type="invalid">
                            Campo Obligatorio
                        </Form.Control.Feedback>
                        <Link  to={`https://www.gob.mx/curp/`} target={"_blank"}>
                            Obtener CURP
                        </Link >
                    </Col>
                    <Col>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Foto INE</Form.Label>
                            <Form.Control type="file" required autoComplete="off"/>
                            <Form.Control.Feedback type="invalid">
                                Campo Obligatorio
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Form.Group>
                }
                <Button type="submit">Guardar</Button>
            </Form>
        </div>
    )
}
