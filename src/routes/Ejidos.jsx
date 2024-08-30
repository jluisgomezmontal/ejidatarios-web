import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useForm } from "../hooks/useForm.jsx";

export const Ejidos = () => {
    const initialForm = {
        iD_Ejidatario: '',
        noCertificado: '',
        tipoCertificado: [], // Cambiado a un array
        noParcel: '',
        actoJuridico: '',
    };

    const [formValues, handleInputChange, reset] = useForm(initialForm);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        reset();
    };

    return (
        <div>
            <h3>Agregar Ejido</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="my-5">
                    <Row>
                        <Col md={"4"}>
                            <Form.Control
                                placeholder="ID Ejidatario"
                                onChange={handleInputChange}
                                name="iD_Ejidatario"
                                value={formValues.iD_Ejidatario}
                            />
                        </Col>
                        <Col md={"4"} className="d-flex justify-content-between">
                            <Form.Label></Form.Label>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group as={Row} className="my-5">
                    <Row>
                        <Col md={"4"}>
                            <Form.Control
                                placeholder="Numero de certificado"
                                name="noCertificado"
                                onChange={handleInputChange}
                                value={formValues.noCertificado}
                            />
                        </Col>
                        <Col md={"4"} className="d-flex justify-content-between ">
                            <Form.Label>Tipo de certificado</Form.Label>
                            <Form.Group className="mb-3 d-flex gap-3" id="formGridCheckbox">
                                <Form.Check
                                    type="checkbox"
                                    label="Parcelario"
                                    name="tipoCertificado"
                                    value="Parcelario"
                                    checked={formValues.tipoCertificado.includes("Parcelario")}
                                    onChange={handleInputChange}
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Uso comun"
                                    name="tipoCertificado"
                                    value="Uso comun"
                                    checked={formValues.tipoCertificado.includes("Uso comun")}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group as={Row} className="my-5">
                    <Row>
                        <Col md={"4"}>
                            <Form.Control
                                placeholder="Numero de parcel"
                                onChange={handleInputChange}
                                name="noParcel"
                                value={formValues.noParcel}
                            />
                        </Col>
                        <Col className="d-flex gap-5">
                            <Form.Group controlId="formFileMultiple" className="mb-3 d-flex gap-5">
                                <Form.Label>Fotos</Form.Label>
                                <Form.Control type="file" multiple />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group as={Row} className="my-5">
                    <Row>
                        <Col className="d-flex gap-5">
                            <Form.Group className="mb-3">
                                <Form.Label>Acto Juridico</Form.Label>
                                <Form.Select
                                    onChange={handleInputChange}
                                    name="actoJuridico"
                                    value={formValues.actoJuridico}
                                >
                                    <option>ADDAT </option>
                                    <option>AJENACION</option>
                                    <option>SENTENCIA</option>
                                    <option>ASIGNACION</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form.Group>
                <Button type="submit">Guardar</Button>
            </Form>
        </div>
    );
};
