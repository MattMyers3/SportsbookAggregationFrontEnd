import React from 'react';
import DateSelector from './DateSelector';
import {Container, Row, Col, Dropdown, DropdownButton} from 'react-bootstrap';
import GameTableList from './GameTableList';
import { apiUrl } from './Constants';

class Main extends React.Component {
    state = {
        sports: ["NBA"],
        games: []
      }

    render ()
    {
        return (
            <Container>
                <Row className="mt-3">
                    <Col>
                        <h4 className="text-center">NBA Best Lines</h4>
                        <div className="text-center">
                            <DateSelector />
                        </div>
                    </Col>
                    <Col>
                        <DropdownButton className="text-center" variant="white" title="Select State" id="select-state-dropdown">
                            <Dropdown.Item href="#/PA">PA</Dropdown.Item>
                            <Dropdown.Item href="#/NJ">NJ</Dropdown.Item>
                            <Dropdown.Item href="#/DE">DE</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
                <GameTableList games={this.state.games} />
            </Container>
        );
    }

    componentDidMount() {
        fetch(apiUrl + '/games?onlyFutureGames=true')
        .then(res => res.json()) 
        .then(data => this.setState({ games: data }))
      }
}

export default Main;