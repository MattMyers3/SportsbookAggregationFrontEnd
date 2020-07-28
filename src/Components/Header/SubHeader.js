import React from 'react';
import {Container, Navbar, Nav, Row, Col} from 'react-bootstrap';

class SubHeader extends React.Component {
    render()
    {
        return (
            
                
                <Container>
                    <Row className="justify-content-md-center">
                        <Col xs={11}>
                            <Navbar className="border-bottom" bg="clear" expand="md">
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="#NBA">NBA</Nav.Link>
                                    <Navbar.Text>|</Navbar.Text>
                                    <Nav.Link href="#BestLines">Best Lines</Nav.Link>
                                </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                        </Col>
                    </Row>
                </Container>
                
            
        );
    }
}

export default SubHeader;