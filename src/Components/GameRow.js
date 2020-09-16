import React from 'react';
import { apiUrl } from './Constants';

class GameRow extends React.Component {
    state = {
        homeTeamName : null,
        awayTeamName : null,
        currentAwaySpread : 0,
        currentAwaySpreadPayout: 0,
        currentAwaySpreadSite : null,
        currentHomeSpread : 0,
        currentHomeSpreadPayout : 0,
        currentHomeSpreadSite : null,
        currentOver : 0,
        currentOverPayout : 0,
        currentOverSite : null,
        currentUnder : 0,
        currentUnderPayout : 0,
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
                <tr style={{borderLeft: '2px solid black', borderRight: '2px solid black', borderTop: '2px solid black'}}>
                    <th scope="row">{this.state.awayTeamName}</th>
                    <td><b>{this.getDisplayValue(this.state.currentAwaySpread)}</b><sup> ({this.getDisplayValue(this.state.currentAwaySpreadPayout)})</sup><br/>{this.state.currentAwaySpreadSite}</td>
                    <td><b>{this.getDisplayValue(this.state.currentAwayMoneyline)}</b><br/>{this.state.currentAwayMoneylineSite}</td>
                    <td>o<b>{this.state.currentOver}</b><sup> ({this.getDisplayValue(this.state.currentOverPayout)})</sup><br/>{this.state.currentOverSite}</td>
                </tr>
                <tr style={{borderLeft: '2px solid black', borderRight: '2px solid black', borderBottom: '2px solid black'}}>
                    <th scope="row">{this.state.homeTeamName}</th>
                    <td><b>{this.getDisplayValue(this.state.currentHomeSpread)}</b><sup> ({this.getDisplayValue(this.state.currentHomeSpreadPayout)})</sup><br/>{this.state.currentHomeSpreadSite}</td>
                    <td><b>{this.getDisplayValue(this.state.currentHomeMoneyline)}</b><br/>{this.state.currentHomeMoneylineSite}</td>
                    <td>u<b>{this.state.currentUnder}</b><sup> ({this.getDisplayValue(this.state.currentUnderPayout)})</sup><br/>{this.state.currentUnderSite}</td>
                </tr>
            </React.Fragment>
            )
    };

    getDisplayValue(val) {
        if(val > 0)
            return "+" + val
        return val;
    }

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
            currentAwaySpreadPayout: data.currentAwaySpreadPayout,
            currentAwaySpreadSite: data.awaySpreadSite,
            currentHomeSpread: data.currentHomeSpread,
            currentHomeSpreadPayout: data.currentHomeSpreadPayout,
            currentHomeSpreadSite: data.homeSpreadSite,
            currentAwayMoneyline: data.currentAwayMoneyLine,
            currentAwayMoneylineSite: data.awayMoneyLineSite,
            currentHomeMoneyline: data.currentHomeMoneyLine,
            currentHomeMoneylineSite: data.homeMoneyLineSite,
            currentOver: data.currentOver,
            currentOverPayout : data.currentOverPayout,
            currentOverSite: data.overSite,
            currentUnder: data.currentUnder,
            currentUnderPayout : data.currentUnderPayout,
            currentUnderSite: data.underSite,
         }))
        }
}

export default GameRow;