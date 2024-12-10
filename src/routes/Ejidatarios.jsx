import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useForm} from "../hooks/useForm.jsx";
import {Link} from "react-router-dom";
import {useState} from "react";

export const Ejidatarios = () => {

    const initialForm = {
        calidadAgraria: '',
        iD_Ejidatario: "",
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        telefono: "",
        curp: "",
        documentoPDF: ""
    };

    // const initialForm = {
    //     calidadAgraria: 'EJIDATARIO',
    //     iD_Ejidatario: "150513",
    //     nombre: "STEPH",
    //     apellidoPaterno: "VAZQUEZ",
    //     apellidoMaterno: "GALEANA",
    //     telefono: "7444215691",
    //     curp: "CURPSTEPH",
    //     documentoPDF: "documentoPDF"
    // };

    const [ formValues, handleInputChange, reset ] = useForm( initialForm );

    const [validated, setValidated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity()) {
            try {
                // const apiEjidaterios = "http://localhost:3000/api/ejidatarios";
                const apiEjidaterios = "https://ejidatarios-api.onrender.com/api/ejidatarios";

                // Crear un objeto FormData
                const formData = new FormData();
                Object.entries(formValues).forEach(([key, value]) => {
                        formData.append(key, value);
                });

                console.log("formData:", formData);
                const response = await fetch(apiEjidaterios, {
                    method: "POST",
                    body: formData, // Enviar el FormData directamente
                });

                const data = await response.json();
                console.log("Respuesta del servidor:", data);
                alert("Datos enviados correctamente");
            } catch (error) {
                console.error("Error al enviar los datos:", error.message);
            }

            // Limpiar el formulario
            reset();
            setValidated(false);
        } else {
            setValidated(true);
        }
    };

    return (
        <div>
            <h2 className="text-center my-4 fs-1 text-info ">
                Agregar Sujeto Agrario
            </h2>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="my-5" controlId="validationCustom01" hasValidation>
                    <Col md={"6"} className="">
                        <Form.Label>Calidad Agraria:</Form.Label>
                        <Form.Group className="mb-3" >
                            <Form.Select value={formValues.calidadAgraria} onChange={handleInputChange} name="calidadAgraria" required>
                                <option value={""}>Seleccione una opcion</option>
                                <option value="EJIDATARIO">1.-EJIDATARIO</option>
                                <option value="AVECINDADO">2.-AVECINDADO</option>
                                <option value="POSESIONARIO DE HECHO">3.-POSESIONARIO DE HECHO</option>
                                <option value="POSESIONARIO DE DERECHO">4.-POSESIONARIO DE DERECHO</option>
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
                            <Form.Label>Telefono:</Form.Label>
                            <Form.Control required autoComplete="off" placeholder="Telefono" value={formValues.telefono} onChange={handleInputChange} name="telefono" />
                            <Form.Control.Feedback type="invalid">
                                Campo Obligatorio
                            </Form.Control.Feedback>
                        </Col>
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
                </Form.Group>
                }
                {
                    //formValues.telefono !== "" &&
                <Form.Group as={Row} className="my-5" hasValidation>

                    <Col>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Foto INE</Form.Label>
                            <Form.Control
                                type="file"
                                autoComplete="off"
                                onChange={handleInputChange} // Sigue utilizando el mismo manejador
                                name="documentoPDF"
                            />
                        </Form.Group>
                    </Col>
                </Form.Group>
                }
                <Button type="submit">Guardar</Button>
            </Form>
        </div>
    )
}
