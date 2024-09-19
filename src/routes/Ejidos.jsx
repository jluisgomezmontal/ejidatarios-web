import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "../hooks/useForm.jsx";
import {ejidatariosEjemplo} from "../mocks.js";
import {useState} from "react";

export const Ejidos = () => {
    const initialForm = {
        iD_Ejidatario: '',
        noCertificado: '',
        tipoCertificado: 'Parcelario', // Cambiado a un array
        noParcel: '',
        actoJuridico: 'ADDAT',
    };

    const [formValues, handleInputChange, reset] = useForm(initialForm);

    const [nombre, setNombre] = useState()

    const handleIdentificar = () => {
        const ejidatario =ejidatariosEjemplo.find(ejidatarioNombre => ejidatarioNombre.iD_Ejidatario === formValues.iD_Ejidatario);
        setNombre(`${ejidatario.nombre} ${ejidatario.apellidoPaterno} ${ejidatario.apellidoMaterno}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        reset();
    };
    return (
        <div>
            <h3>Agregar Parcela</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="my-5">
                    <Col md={"6"} >
                        <Form.Group>
                            <Form.Label>Certificado</Form.Label>
                            <Form.Select
                                onChange={handleInputChange}
                                name="tipoCertificado"
                                value={formValues.tipoCertificado}
                            >
                                <option value={""}>Seleccione una opcion</option>
                                <option>1.-Parcelario</option>
                                <option>2.-Uso comun</option>
                                <option>3.-Posesionario</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    {
                        formValues.tipoCertificado !== "Uso comun" &&
                        <Col md={"6"}>
                            <Form.Label>Numero de {formValues.tipoCertificado === "Parcelario"? "Parcela" : "Folio"}</Form.Label>
                            <Form.Control
                                placeholder="Introdusca Numero"
                                onChange={handleInputChange}
                                name="noParcel"
                                value={formValues.noParcel}
                            />
                        </Col>
                    }
                </Form.Group>
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
                            <p className="mt-2 fs-4">{nombre === undefined ? "" : "Ejidatario: "+ nombre}</p>
                        </Form.Group>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="my-5">
                    <Col md={"4"}>
                        <Form.Label>Numero de Certificado</Form.Label>
                        <Form.Control
                            placeholder="Numero de certificado"
                            name="noCertificado"
                            onChange={handleInputChange}
                            value={formValues.noCertificado}
                        />
                    </Col>
                    <Col md={"4"} className="">
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Label>Foto Vendedor</Form.Label>
                                <Form.Control type="file" multiple />
                            </Form.Group>
                        </Col>
                </Form.Group>
                <Form.Group as={Row} className="my-5">
                    <Col md={"4"} className="">
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Foto Testigo Vendedor</Form.Label>
                            <Form.Control type="file" multiple />
                        </Form.Group>
                    </Col>
                    <Col md={"4"} className="">
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Foto Testigo Vendedor</Form.Label>
                            <Form.Control type="file" multiple />
                        </Form.Group>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="my-5">
                    <Col md={"4"} className="">
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Foto Testigo Comprador</Form.Label>
                            <Form.Control type="file" multiple />
                        </Form.Group>
                    </Col>
                    <Col md={"4"} className="">
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Foto Testigo Comprador</Form.Label>
                            <Form.Control type="file" multiple />
                        </Form.Group>
                    </Col>
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
                                    <option>ADDAT</option>
                                    <option>AJENACION</option>
                                    <option>SENTENCIA</option>
                                    <option>ASIGNACION</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                </Form.Group>
                <Button type="submit">Guardar</Button>
            </Form>
        </div>
    );
};
