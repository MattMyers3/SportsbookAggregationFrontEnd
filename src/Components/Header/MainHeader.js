import React from 'react'
import {Container, Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

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
                                <LinkContainer to="/NFL">
                                    <Nav.Link>NFL</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/NBA">
                                    <Nav.Link>NBA</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to="/MLB">
                                    <Nav.Link>MLB</Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Container>
            </div>
        );
    }
}

export default MainHeader;

