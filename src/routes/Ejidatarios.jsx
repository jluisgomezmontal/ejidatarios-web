import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useForm} from "../hooks/useForm.jsx";


export const Ejidatarios = () => {
    const initialForm = {
        iD_Ejidatario: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        calidadAgraria: '',
    };
    const [ formValues, handleInputChange, reset ] = useForm( initialForm );
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(formValues);
        reset();
    }
    return (
        <div>
            <h3>Agregar Ejidatario</h3>

            <Form onSubmit={handleSubmit}>
                <Form.Group as={Row} className="my-5">
                    <Row>
                        <Col>
                            <Form.Control placeholder="ID Ejidatario" value={formValues.iD_Ejidatario} onChange={handleInputChange} name="iD_Ejidatario" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Nombre" value={formValues.nombre} onChange={handleInputChange} name="nombre" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group as={Row} className="my-5">
                    <Row>
                        <Col>
                            <Form.Control placeholder="Apellido Paterno" value={formValues.apellidoPaterno} onChange={handleInputChange} name="apellidoPaterno"/>
                        </Col>
                        <Col>
                            <Form.Control placeholder="Apellido Materno" value={formValues.apellidoMaterno} onChange={handleInputChange} name={"apellidoMaterno"} />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group as={Row} className="my-5">
                    <Row>
                        <Col className="d-flex gap-5">
                            <Form.Group className="mb-3">
                                <Form.Label>Calidad Agraria</Form.Label>
                                <Form.Select value={formValues.calidadAgraria} onChange={handleInputChange} name="calidadAgraria" >
                                    <option>Avecindado</option>
                                    <option>Posicionario</option>
                                    <option>Ejidatario</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form.Group>
                <Button type="submit">Guardar</Button>
            </Form>
        </div>
    )
}
