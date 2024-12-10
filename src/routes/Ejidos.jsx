import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "../hooks/useForm.jsx";
import {useState} from "react";
import {Badge} from "react-bootstrap";

export const Ejidos = () => {
    const initialForm = {
        iD_Ejidatario: '',
        noCertificado: '',
        tipoCertificado: 'PARCELARIO', // Cambiado a un array
        numeroParcela: '',
        actoJuridico: 'ADDAT',
        documentoPDF: ""
    };

    const [formValues, handleInputChange, reset] = useForm(initialForm);
    const [ejidatario, setEjidatario] = useState();
    const handleIdentificar = async (e) => {
        e.preventDefault();

        const url = `https://ejidatarios-api.onrender.com/api/ejidatarios/${formValues.iD_Ejidatario}`;
        const response = await fetch(url)
        const data = await response.json()
        setEjidatario(data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formData:", formValues);
        try {
            const url = `https://ejidatarios-api.onrender.com/api/terrenos`;
            //const url = `http://localhost:3000/api/terrenos/`;

            // Crear un objeto FormData
            const formData = new FormData();
            Object.entries(formValues).forEach(([key, value]) => {
                formData.append(key, value);
            });
            const response = await fetch(url, {
                method: "POST",
                body: formData, // Enviar el FormData directamente
            });

            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            alert("Datos enviados correctamente");
        } catch (error) {
            console.error("Error al enviar los datos:", error.message);
        }

        reset();
    };
    return (
        <div>
            <h2 className="text-center my-4 fs-1 text-info ">
                Agregar Parcela
            </h2>
            <Form onSubmit={handleIdentificar}>
                <Form.Group as={Row} className="my-5">
                <Col md={"4"}>
                        <Form.Label>ID Sujeto</Form.Label>
                        <Form.Control
                            placeholder="ID Ejidatario"
                            onChange={handleInputChange}
                            name="iD_Ejidatario"
                            value={formValues.iD_Ejidatario}
                        />
                    </Col>
                    <Col md={"2"} className="mt-4">
                        <Form.Label onClick={handleIdentificar} className="btn btn-primary mt-2">Identificar</Form.Label>
                    </Col>
                    <Col md={"4"} className="mt-4">
                        <Form.Group >
                            {ejidatario === undefined ? "" :
                                ejidatario.nombre === undefined ?
                                    <Badge pill bg="danger" className={"p-3 fs-7"}>
                                        Ejidatario no encontrado
                                    </Badge>
                                    : <Badge pill bg="success" className={"p-3 fs-7"}>Ejidatario: {ejidatario.nombre} {ejidatario.apellidoPaterno} {ejidatario.apellidoMaterno}</Badge>
                            }
                        </Form.Group>
                    </Col>
                </Form.Group>
            </Form>
            <Form onSubmit={handleSubmit}>


                <Form.Group as={Row} className="my-5">
                    <Col md={"6"} >
                        <Form.Group>
                            <Form.Label>Certificado</Form.Label>
                            <Form.Select
                                onChange={handleInputChange}
                                name="tipoCertificado"
                            >
                                <option value={""}>SELECCIONE UNA OPCION</option>
                                <option value="PARCELARIO">1.-PARCELARIO</option>
                                <option value="USO COMUN">2.-USO COMUN</option>
                                <option value="POSESION">3.-POSESION</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    {
                        formValues.tipoCertificado !== "USO COMUN" &&
                        <Col md={"6"}>
                            <Form.Label>Numero de {formValues.tipoCertificado === "Parcelario"? "Parcela" : "Parcela Origen"}</Form.Label>
                            <Form.Control
                                placeholder="Introdusca Numero"
                                onChange={handleInputChange}
                                name="numeroParcela"
                                value={formValues.numeroParcela}
                            />
                        </Col>
                    }
                </Form.Group>
                <Form.Group as={Row} className="my-5">
                        <Col className="d-flex gap-5">
                            <Form.Group className="mb-3">
                                <Form.Label>Acto Juridico</Form.Label>
                                <Form.Select
                                    onChange={handleInputChange}
                                    name="actoJuridico"
                                    value={formValues.actoJuridico}
                                >
                                    <option value={""}>Seleccione una opcion</option>
                                    <option value="ADDAT">1.-ADDAT</option>
                                    <option value="ENAJENACION">2.-AJENACION</option>
                                    <option value="SENTENCIA">3.-SENTENCIA</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                </Form.Group>
                {
                    formValues.tipoCertificado === "POSESION" &&
                    <>
                        <Form.Group as={Row} className="my-5">
                            <Col>
                                <Form.Group controlId="formFileMultiple" className="mb-3">
                                    <Form.Label>Credencial del Comprador</Form.Label>
                                    <Form.Control type="file" onChange={handleInputChange}  name="documentoPDF"/>
                                </Form.Group>
                            </Col>
                        </Form.Group>
                    </>
                }
                <Button type="submit">Guardar</Button>
            </Form>
        </div>
    );
};
