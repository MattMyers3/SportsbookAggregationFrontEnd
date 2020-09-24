import React from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap';
import GameTableList from './GameTableList';
import { apiUrl } from './Constants';
import ReactGA from 'react-ga';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

class Main extends React.Component {
    state = {
        checkedBooks: [],
        allBooks : [],
        games: [],
        startDate: new Date(),
        endDate: new Date()
      }

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
            <div>
                <Container>
                <br/>
                <h2 className="text-center">{this.props.sport} Best Lines</h2>
                    <Row className="mt-3">
                        <Col>
                            {this.getDateSelector()}
                        </Col>
                        <Col>
                            <div>
                                <br/>
                                <Form>
                                    {['checkbox'].map((type, i) => (
                                        <div key={`inline-${type}`} className="mb-3">
                                            {this.state.allBooks.map((book, i) => 
                                                <Form.Check key={i} inline onChange={e => this.handleCheck(book)} checked={this.state.checkedBooks.includes(book)} label={book} type={type} id={`inline-${type}-${i}`}/>)}
                                        </div>
                                    ))}
                                </Form>
                            </div>
                        </Col>
                    </Row>
                    <GameTableList games={this.state.games} sport={this.props.sport} checkedBooks={this.state.checkedBooks}/>
                </Container>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.startDate === this.state.startDate && prevState.endDate === this.state.endDate && prevProps.sport === this.props.sport)
            return;
        if(prevState.startDate !== this.state.startDate && this.props.sport !== "NFL")
        {
            this.fetchGamesOnDay(this.state.startDate);
        }
        else if((prevProps.sport !== "NFL" && this.props.sport === "NFL")){
            var dateRange = this.getDefaultDateSelect().split('-');
            var startDateString = dateRange[0].split("/");
            var endDateString = dateRange[1].split("/");
            this.fetchGamesInRange(startDateString, endDateString);
        }
        else if(prevProps.sport !== this.props.sport)
        {
            this.setState({startDate : new Date()})
        }
      }

    componentDidMount() {
        if(this.props.sport == "NFL")
        {
            var dateRange = this.getDefaultDateSelect().split('-');
            var startDateString = dateRange[0].split("/");
            var endDateString = dateRange[1].split("/");
            this.fetchGamesInRange(startDateString, endDateString);
        }
        else
        {
            this.fetchGamesOnDay(new Date());
        }

        fetch(apiUrl + '/gamblingsite')
        .then(res => res.json())
        .then(data => this.setState({checkedBooks : data.map(site => site.name), allBooks : data.map(site => site.name)}));
    }

    getDateSelector(){        
        if(this.props.sport === "NFL")
        {
            return (
                <Form>
                    <Form.Label>Select Week</Form.Label>
                    <Form.Control as="select" defaultValue={this.getDefaultDateSelect()} onChange={this.handleWeekChange.bind(this)} >
                        <option value="9/10/2020-9/14/2020">Week 1</option>
                        <option value="9/17/2020-9/21/2020">Week 2</option>
                        <option value="9/24/2020-9/28/2020">Week 3</option>
                        <option value="10/01/2020-10/05/2020">Week 4</option>
                        <option value="10/08/2020-10/12/2020">Week 5</option>
                        <option value="10/15/2020-10/19/2020">Week 6</option>
                        <option value="10/22/2020-10/26/2020">Week 7</option>
                        <option value="10/29/2020-11/02/2020">Week 8</option>
                        <option value="11/05/2020-11/09/2020">Week 9</option>
                        <option value="11/12/2020-11/16/2020">Week 10</option>
                        <option value="11/19/2020-11/23/2020">Week 11</option>
                        <option value="11/26/2020-11/30/2020">Week 12</option>
                        <option value="12/03/2020-12/07/2020">Week 13</option>
                        <option value="12/10/2020-12/14/2020">Week 14</option>
                        <option value="12/17/2020-12/21/2020">Week 15</option>
                        <option value="12/24/2020-12/28/2020">Week 16</option>
                        <option value="12/31/2020-01/04/2020">Week 17</option>
                    </Form.Control>
                </Form>);
        }
        else{
            return(
                <div>
                    <Form.Label>Select Date</Form.Label><br></br>
                    <DatePicker selected={this.state.startDate} onChange={this.handleDateChange} />
                </div>
            );
        }
    }

    handleDateChange = date => {
        this.setState({
          startDate: date
        });

        ReactGA.event({
            category: 'User',
            action: 'Changed date',
            value: date
          });
      };

    handleWeekChange(event){
        var dateRange = event.target.value.split('-');
        var startDateString = dateRange[0].split("/");
        var endDateString = dateRange[1].split("/");
        this.fetchGamesInRange(startDateString, endDateString);
    }

    getDefaultDateSelect(){
        var currentDate = new Date();
        var currentDay = currentDate.getDate();
        var currentMonth = currentDate.getMonth();
        var currentYear = currentDate.getFullYear();
        if(currentYear === 2020 || currentYear === 2021)
        {
            if(currentMonth === 8)
            {
                if(currentDay >= 10 && currentDay <= 14){
                    return "9/10/2020-9/14/2020";
                }
                else if(currentDay >= 15 && currentDay <= 21){
                    return "9/17/2020-9/21/2020";
                }
                else if(currentDay >= 22 && currentDay <= 28){
                    return "9/24/2020-9/28/2020";
                }
                else if(currentDay >= 29){
                    return "10/01/2020-10/05/2020";
                }
            }
            else if(currentMonth === 9)
            {
                if(currentDay >= 1 && currentDay <= 5){
                    return "10/01/2020-10/05/2020";
                }
                else if(currentDay >= 6 && currentDay <= 12){
                    return "10/08/2020-10/12/2020";
                }
                else if(currentDay >= 13 && currentDay <= 19){
                    return "10/15/2020-10/19/2020";
                }
                else if(currentDay >= 20 && currentDay <= 26){
                    return "10/22/2020-10/26/2020";
                }
                else if(currentDay >= 27)
                {
                    return "10/29/2020-11/02/2020";
                }
            }
            else if(currentMonth === 10)
            {
                if(currentDay <= 2){
                    return "10/29/2020-11/02/2020";
                }
                else if(currentDay >= 3 && currentDay <= 9){
                    return "11/05/2020-11/09/2020";
                }
                else if(currentDay >= 10 && currentDay <= 16){
                    return "11/12/2020-11/16/2020";
                }
                else if(currentDay >= 17 && currentDay <= 23){
                    return "11/19/2020-11/23/2020";
                }
                else if(currentDay >= 24 && currentDay <= 30){
                    return "11/26/2020-11/30/2020";
                }
                else if(currentDay >= 31){
                    return "12/03/2020-12/07/2020";
                }
            }
            else if(currentMonth === 11)
            {
                if(currentDay >= 1 && currentDay <= 7){
                    return "12/03/2020-12/07/2020";
                }
                else if(currentDay >= 8 && currentDay <= 14){
                    return "12/10/2020-12/14/2020";
                }
                else if(currentDay >= 15 && currentDay <= 21){
                    return "12/17/2020-12/21/2020";
                }
                else if(currentDay >= 22 && currentDay <= 28){
                    return "12/24/2020-12/28/2020";
                }
                else if(currentDay >= 29)
                {
                    return "12/31/2020-01/04/2020";
                }
            }
            else if(currentMonth === 0)
            {
                if(currentDay <= 4){
                    return "12/31/2020-01/04/2020";
                }
            }
        }
        return "9/10/2020-9/14/2020";
    }

    fetchGamesInRange(startDateString, endDateString)
    {
        var startDate = new Date(parseInt(startDateString[2], 10),
                        parseInt(startDateString[0], 10) - 1,
                        parseInt(startDateString[1], 10));
        var endDate = new Date(parseInt(endDateString[2], 10),
                        parseInt(endDateString[0], 10) - 1,
                        parseInt(endDateString[1], 10));
        fetch(apiUrl + '/games?startYear=' + startDate.getFullYear() + 
                        '&startMonth=' + (startDate.getMonth() + 1) + 
                        '&startDay=' + startDate.getDate() + 
                        '&endYear=' + endDate.getFullYear() + 
                        '&endMonth=' + (endDate.getMonth() + 1) + 
                        '&endDay=' + endDate.getDate() + 
                        '&sport=' + this.props.sport)
        .then(res => res.json()) 
        .then(data => this.setState({ games: data }))
    }

    fetchGamesOnDay(date)
    {
        fetch(apiUrl + '/games?startYear=' + date.getFullYear() + '&startMonth=' + (date.getMonth() + 1) + '&startDay=' + date.getDate() + '&sport=' + this.props.sport)
            .then(res => res.json()) 
            .then(data => this.setState({ games: data }))
    }
}

export default Main;