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
        allBooks : [],
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
                                        {this.state.allBooks.map(book => 
                                            <Form.Check inline onChange={e => this.handleCheck(book)} checked={this.state.checkedBooks.includes(book)} label={book} type={type} id={`inline-${type}-1`}/>)}
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
        .then(data => this.setState({checkedBooks : data.map(site => site.name), allBooks : data.map(site => site.name)}))
    }
}

export default Main;