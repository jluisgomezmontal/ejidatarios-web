import { Outlet, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { setLoggedOut } from "../redux/loginSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { RUTAS } from "../utils/const.js";
import { Footer } from "./Footer.jsx";

function NavbarComponent() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  // Tiempo de inactividad en milisegundos (10 minutos)
  const inactivityTime = 10 * 1000 * 60;

  // const handleRespaldos = async () => {
  //   const url1 = `https://ejidatarios-api.onrender.com/api/ejidatarios/export/ejidatarios`;
  //   const url2 = `https://ejidatarios-api.onrender.com/api/ejidatarios/export/terrenos`;

  //   try {
  //     const [res1, res2] = await Promise.all([fetch(url1), fetch(url2)]);

  //     if (!res1.ok || !res2.ok) {
  //       throw new Error("Uno de los respaldos falló");
  //     }

  //     const blob1 = await res1.blob();
  //     const blob2 = await res2.blob();

  //     // Descargar el primer respaldo
  //     const link1 = document.createElement("a");
  //     link1.href = URL.createObjectURL(blob1);
  //     link1.download = "ejidatarios.json";
  //     link1.click();

  //     // Descargar el segundo respaldo
  //     const link2 = document.createElement("a");
  //     link2.href = URL.createObjectURL(blob2);
  //     link2.download = "terrenos.json";
  //     link2.click();

  //     console.log("Respaldos descargados correctamente");
  //   } catch (error) {
  //     console.error("Error al hacer respaldo:", error.message);
  //   }
  // };

  useEffect(() => {
    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        dispatch(setLoggedOut());
      }, inactivityTime);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
    };
  }, []);
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-dark border-bottom border-info "
        style={{ zIndex: 9999 }}
        variant="dark"
      >
        <Container>
          <Link className="text-decoration-none" to="/">
            <Navbar.Brand>Ejido de San Marcos</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Link
                eventKey="3"
                to="/admin/dashboard"
                className={`text-decoration-none me-3 nav-link ${
                  !user.isAdmin ? "disabled-link" : ""
                }`}
                tabIndex={user.isAdmin ? 0 : -1}
                style={{
                  pointerEvents: user.isAdmin ? "auto" : "none",
                  color: user.isAdmin ? "inherit" : "#888",
                }}
              >
                {user.name}
              </Link>

              <Link
                className="text-decoration-none me-3 nav-link"
                to={RUTAS.agregarSujeto}
              >
                Sujetos
              </Link>
              <Link
                className="text-decoration-none me-3 nav-link"
                to={RUTAS.agregarParcela}
              >
                Parcela
              </Link>
              <Link
                className="text-decoration-none me-5 nav-link"
                to={RUTAS.buscar}
              >
                Buscar
              </Link>
              <Button
                variant="outline-danger"
                className="px-4"
                onClick={() => dispatch(setLoggedOut())}
              >
                Salir
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container id="detail" className="pt-3 flex-grow-1">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}

export default NavbarComponent;
