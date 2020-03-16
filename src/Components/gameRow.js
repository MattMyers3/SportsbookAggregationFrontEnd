import React from 'react';
import { apiUrl } from './Constants';

class GameRow extends React.Component {
    state = {
        homeTeamName : null,
        awayTeamName : null,
        currentAwaySpread : 0,
        currentAwaySpreadSite : null,
        currentHomeSpread : 0,
        currentHomeSpreadSite : null,
        currentOver : 0,
        currentOverSite : null,
        currentUnder : 0,
        currentUnderSite : null,
        currentHomeMoneyline : 0,
        currentHomeMoneylineSite : null,
        currentAwayMoneyline : 0,
        currentAwayMoneylineSite : null
    }

    render()
    {
        return (
            <React.Fragment>
                <tr>
                    <th scope="row">{this.state.awayTeamName}</th>
                    <td>{this.state.currentAwaySpread}<br/>{this.state.currentAwaySpreadSite}</td>
                    <td>{this.state.currentAwayMoneyline}<br/>{this.state.currentAwayMoneylineSite}</td>
                    <td>{this.state.currentOver}<br/>{this.state.currentOverSite}</td>
                </tr>
                <tr>
                    <th scope="row">{this.state.homeTeamName}</th>
                    <td>{this.state.currentHomeSpread}<br/>{this.state.currentHomeSpreadSite}</td>
                    <td>{this.state.currentHomeMoneyline}<br/>{this.state.currentHomeMoneylineSite}</td>
                    <td>{this.state.currentUnder}<br/>{this.state.currentUnderSite}</td>
                </tr>
            </React.Fragment>
            )
    };

    componentDidMount() {
        fetch(apiUrl + '/teams/' + this.props.homeTeamId)
        .then(res => res.json()) 
        .then(data => this.setState({ 
            homeTeamName: data.location + ' ' + data.mascot
         }))

         fetch(apiUrl + '/teams/' + this.props.awayTeamId)
        .then(res => res.json()) 
        .then(data => this.setState({ 
            awayTeamName: data.location + ' ' + data.mascot
         }))

         fetch(apiUrl + '/GameLines/best/' + this.props.gameId)
        .then(res => res.json()) 
        .then(data => this.setState({ 
            currentAwaySpread: data.currentAwaySpread,
            currentAwaySpreadSite: data.awaySpreadSite,
            currentHomeSpread: data.currentHomeSpread,
            currentHomeSpreadSite: data.homeSpreadSite,
            currentAwayMoneyline: data.currentAwayMoneyLine,
            currentAwayMoneylineSite: data.awayMoneyLineSite,
            currentHomeMoneyline: data.currentHomeMoneyLine,
            currentHomeMoneylineSite: data.homeMoneyLineSite,
            currentOver: data.currentOver,
            currentOverSite: data.overSite,
            currentUnder: data.currentUnder,
            currentUnderSite: data.underSite,
         }))
        }
}

export default GameRow;