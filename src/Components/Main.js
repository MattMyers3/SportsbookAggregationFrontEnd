import React from 'react';
import {Container, Row, Col, Dropdown, DropdownButton} from 'react-bootstrap';
import GameTableList from './GameTableList';
import { apiUrl } from './Constants';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class Main extends React.Component {
    state = {
        sports: ["NBA"],
        games: [],
        startDate: new Date()
      }
     
      handleChange = date => {
        this.setState({
          startDate: date
        });

        fetch(apiUrl + '/games?year=' + date.getFullYear() + '&month=' + (date.getMonth() + 1) + '&day=' + date.getDate())
        .then(res => res.json()) 
        .then(data => this.setState({ games: data }))
      };

    render ()
    {
        return (
            <Container>
                <Row className="mt-3">
                    <Col>
                        <h4 className="text-center">{this.props.sport} Best Lines</h4>
                        <div className="text-center">
                            <DatePicker selected={this.state.startDate} onChange={this.handleChange} />
                        </div>
                    </Col>
                    <Col>
                        {/*<DropdownButton className="text-center" variant="white" title="Select State" id="select-state-dropdown">
                            <Dropdown.Item href="#/PA">PA</Dropdown.Item>
                            <Dropdown.Item href="#/NJ">NJ</Dropdown.Item>
                            <Dropdown.Item href="#/DE">DE</Dropdown.Item>
                            </DropdownButton>*/}
                    </Col>
                </Row>
                <GameTableList games={this.state.games} />
            </Container>
        );
    }

    componentDidUpdate(prevProps) {
        if(prevProps.sport == this.props.sport)
            return;
        fetch(apiUrl + '/games?year=' + this.state.startDate.getFullYear() + '&month=' + (this.state.startDate.getMonth() + 1) + '&day=' + this.state.startDate.getDate() + '&sport=' + this.props.sport)
        .then(res => res.json()) 
        .then(data => this.setState({ games: data }))
      }

    componentDidMount() {
        fetch(apiUrl + '/games?year=' + this.state.startDate.getFullYear() + '&month=' + (this.state.startDate.getMonth() + 1) + '&day=' + this.state.startDate.getDate() + '&sport=' + this.props.sport)
        .then(res => res.json()) 
        .then(data => this.setState({ games: data }))
    }
}

export default Main;