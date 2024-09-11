import { Outlet, Link  } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NavbarComponent() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-dark border-bottom border-info" variant="dark">
                <Container>
                    <Link className={"text-decoration-none"} to={`/`}>
                        <Navbar.Brand>Ejido de San Marcos</Navbar.Brand>
                    </Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <Link className={"text-decoration-none"} to={`ejidatarios`}>
                                <Nav.Link href="#deets">Ejidatarios</Nav.Link>
                            </Link>
                            <Link className={"text-decoration-none mx-3"} to={`ejidos`}>
                                <Nav.Link href="#deets">Ejido</Nav.Link>
                            </Link>
                            <Form inline="true">
                                <Row>
                                    <Col xs="auto">
                                        <Form.Control
                                            type="text"
                                            placeholder="Celular"
                                            className=" mr-sm-2"
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Button variant="outline-light" type="submit">Buscar</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container id="detail" className="pt-3">
                <Outlet/>
            </Container>
        </>
    );
}

export default NavbarComponent;