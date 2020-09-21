import React from 'react';
import {Container, Row, Col, Dropdown, DropdownButton, Form} from 'react-bootstrap';
import GameTableList from './GameTableList';
import { apiUrl } from './Constants';
import DatePicker from "react-datepicker";
import ReactGA from 'react-ga';
 
import "react-datepicker/dist/react-datepicker.css";

class Main extends React.Component {
    state = {
        checkedBooks: [],
        games: [],
        startDate: new Date()
      }
     
      handleChange = date => {
        this.setState({
          startDate: date
        });

        ReactGA.event({
            category: 'User',
            action: 'Changed date',
            value: date
          });
      };

     handleCheck = label => {
         if (!this.state.checkedBooks.includes(label)) {
            this.setState(state => {
                const checkedBooks = [...state.checkedBooks, label];
           
                return {
                    checkedBooks
                };
              });
          } else {
            this.setState(state => {
                const checkedBooks = state.checkedBooks.filter(l => l !== label);
           
                return {
                  checkedBooks,
                };
              });
     
            }
            console.log(this.state.checkedBooks);
       }       

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
                        <div>
                            <Form>
                                {['checkbox'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check inline onChange={e => this.handleCheck("Barstool")} checked={this.state.checkedBooks.includes("Barstool")} label="Barstool" type={type} id={`inline-${type}-1`} />
                                        <Form.Check inline onChange={e => this.handleCheck("BetAmerica")} checked={this.state.checkedBooks.includes("BetAmerica")} label="Bet America" type={type} id={`inline-${type}-2`} />
                                        <Form.Check inline onChange={e => this.handleCheck("BetRivers")} checked={this.state.checkedBooks.includes("BetRivers")} label="Bet Rivers" type={type} id={`inline-${type}-3`} />
                                        <Form.Check inline onChange={e => this.handleCheck("Caesars")} checked={this.state.checkedBooks.includes("Caesars")} label="Caesars" type={type} id={`inline-${type}-4`} />
                                        <Form.Check inline onChange={e => this.handleCheck("DraftKings")} checked={this.state.checkedBooks.includes("DraftKings")} label="Draft Kings" type={type} id={`inline-${type}-5`} />
                                        <Form.Check inline onChange={e => this.handleCheck("Fanduel")} checked={this.state.checkedBooks.includes("Fanduel")} label="Fanduel" type={type} id={`inline-${type}-6`} />
                                        <Form.Check inline onChange={e => this.handleCheck("FoxBet")} checked={this.state.checkedBooks.includes("FoxBet")} label="Fox Bet" type={type} id={`inline-${type}-7`} />
                                        <Form.Check inline onChange={e => this.handleCheck("Parx")} checked={this.state.checkedBooks.includes("Parx")} label="Parx" type={type} id={`inline-${type}-8`} />
                                        <Form.Check inline onChange={e => this.handleCheck("SugarHouse")} checked={this.state.checkedBooks.includes("SugarHouse")} label="Sugar House" type={type} id={`inline-${type}-9`} />
                                        <Form.Check inline onChange={e => this.handleCheck("Unibet")} checked={this.state.checkedBooks.includes("Unibet")} label="Unibet" type={type} id={`inline-${type}-10`} />
                                    </div>
                                ))}
                            </Form>
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
                <GameTableList games={this.state.games} checkedBooks={this.state.checkedBooks}/>
            </Container>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.startDate == this.state.startDate && prevProps.sport == this.props.sport)
            return;
        fetch(apiUrl + '/games?year=' + this.state.startDate.getFullYear() + '&month=' + (this.state.startDate.getMonth() + 1) + '&day=' + this.state.startDate.getDate() + '&sport=' + this.props.sport)
        .then(res => res.json()) 
        .then(data => this.setState({ games: data }))
      }

    componentDidMount() {
        fetch(apiUrl + '/games?year=' + this.state.startDate.getFullYear() + '&month=' + (this.state.startDate.getMonth() + 1) + '&day=' + this.state.startDate.getDate() + '&sport=' + this.props.sport)
        .then(res => res.json()) 
        .then(data => this.setState({ games: data }))

        fetch(apiUrl + '/gamblingsite')
        .then(res => res.json())
        .then(data => this.setState({checkedBooks : data.map(site => site.name)}))
    }
}

export default Main;