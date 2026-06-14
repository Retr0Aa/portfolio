import { useState } from 'react';
import {
    Button,
    Form,
    Offcanvas,
    Container,
    Nav,
    Navbar,
    NavDropdown
} from 'react-bootstrap';
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/Navbar.scss';

export default function NavbarComponent() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleNav = (path) => {
        setShow(false);
        navigate(path);
    };

    return (
        <>
            <Navbar
                expand={false}
                style={{
                    height: '70px',
                    position: 'relative'
                }}
            >
                <Container fluid>
                    <Navbar.Brand className="sf-font" style={{ cursor: 'pointer' }} onClick={() => handleNav("/")}>
                        Alex Buchkov
                    </Navbar.Brand>

                    <button
                        className={`menu-btn ${show ? "open" : ""}`}
                        onClick={() => setShow(!show)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </Container>
            </Navbar>

            <Offcanvas
                show={show}
                onHide={() => setShow(false)}
                placement="start"
                backdrop={false}
                className="portfolio-menu"
            >
                <Offcanvas.Body>
                    <Nav className="menu-links">
                        <Nav.Link as="button" onClick={() => handleNav("/")}>Home</Nav.Link>
                        <Nav.Link as="button" onClick={() => handleNav("/projects")}>Projects</Nav.Link>
                        <Nav.Link as="button" onClick={() => handleNav("/about")}>About</Nav.Link>
                        <Nav.Link as="button" onClick={() => handleNav("/contact")}>Contact</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}