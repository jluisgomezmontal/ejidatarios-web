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

    const handleSubmit = (e)=>{
        e.preventDefault()
        setEjidatarios([...ejidatarios, formValues])
        console.log(ejidatarios)
        reset();
    }
    return (
        <div>
            <h3>Agregar Sujeto</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="my-5">
                    <Col md={"6"} className="">
                        <Form.Label>Calidad Agraria:</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Select value={formValues.calidadAgraria} onChange={handleInputChange} name="calidadAgraria" >
                                <option>Seleccione una opcion</option>
                                <option>Avecindado</option>
                                <option>Posicionario</option>
                                <option>Ejidatario</option>
                                <option>No Aplica</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Form.Group>
                {
                    formValues.calidadAgraria !== "" &&
                <Form.Group as={Row} className="my-5">
                        <Col>
                            <Form.Label>{formValues.calidadAgraria === 'No Aplica'? 'ID Sujeto:' : 'ID Ejidatario:'}</Form.Label>
                            <Form.Control placeholder={formValues.calidadAgraria === 'No Aplica'? 'ID Sujeto' : 'ID Ejidatario'} value={formValues.iD_Ejidatario} onChange={handleInputChange} name="iD_Ejidatario" />
                        </Col>
                        <Col>
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control placeholder="Nombre" value={formValues.nombre} onChange={handleInputChange} name="nombre" />
                        </Col>
                </Form.Group>
                }
                {
                    formValues.nombre !== "" &&
                <Form.Group as={Row} className="my-5">
                        <Col>
                            <Form.Label>Apellido Paterno:</Form.Label>
                            <Form.Control placeholder="Apellido Paterno" value={formValues.apellidoPaterno} onChange={handleInputChange} name="apellidoPaterno"/>
                        </Col>
                        <Col>
                            <Form.Label>Apellido Materno:</Form.Label>
                            <Form.Control placeholder="Apellido Materno" value={formValues.apellidoMaterno} onChange={handleInputChange} name={"apellidoMaterno"} />
                        </Col>
                </Form.Group>
                }
                {
                    formValues.apellidoMaterno !== "" &&
                <Form.Group as={Row} className="my-5">
                        <Col>
                            <Form.Label>Domicilio:</Form.Label>
                            <Form.Control placeholder="Domicilio" value={formValues.domicilio} onChange={handleInputChange} name="domicilio" />
                        </Col>
                        <Col>
                            <Form.Label>Telefono:</Form.Label>
                            <Form.Control placeholder="Telefono" value={formValues.telefono} onChange={handleInputChange} name="telefono" />
                        </Col>
                </Form.Group>
                }
                {
                    formValues.telefono !== "" &&
                <Form.Group as={Row} className="my-5">
                    <Col >
                        <Form.Label>CURP:</Form.Label>
                        <Form.Control placeholder="CURP" value={formValues.curp} onChange={handleInputChange} name="curp" />
                        <Link  to={`https://www.gob.mx/curp/`} target={"_blank"}>
                            Obtener CURP
                        </Link >
                    </Col>
                    <Col>
                        <Form.Group controlId="formFileMultiple" className="mb-3">
                            <Form.Label>Foto INE</Form.Label>
                            <Form.Control type="file" />
                        </Form.Group>
                    </Col>
                </Form.Group>
                }
                <Button type="submit">Guardar</Button>
            </Form>
        </div>
    )
}
