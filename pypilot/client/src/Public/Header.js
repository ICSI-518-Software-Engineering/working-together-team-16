import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import logo from '../pypilot.png'; 
import { Link } from 'react-router-dom';
export default function Header({from}) {
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container style={{justifyContent:"space-between",display:"flex"}}>
                <Navbar.Brand href="/">
                    <img src={logo} width="30" height="30" alt="PyPilot Logo" />
                    PyPilot
                </Navbar.Brand>
                {from==="f" && <div><Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto" style={{marginLeft:"auto"}}>
                        <Link to="/login" style={{textDecoration:"none",marginRight:50}} >Signin</Link>
                        <Link to="/signup" style={{textDecoration:"none",marginRight:10}} >Signup</Link>
                    
                    </Nav>
                </Navbar.Collapse></div>}
            </Container>
        </Navbar>
    )
}
