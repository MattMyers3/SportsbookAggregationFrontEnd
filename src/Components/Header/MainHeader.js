import React from 'react'
import {Container, Navbar, Nav} from 'react-bootstrap';

class MainHeader extends React.Component {
    render()
    {
        return (
            <div>
                <Container>
                    <Navbar bg="light" expand="md">
                        <Navbar.Brand href="#home">SportsAgg</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#NBA">NBA</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#account">Account</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </div>
        );
    }
}

export default MainHeader;

