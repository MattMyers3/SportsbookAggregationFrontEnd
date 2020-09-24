
import React from 'react'
import { Container, Accordion, Card, Button } from 'react-bootstrap';

class FAQ extends React.Component{
  render()
  {
    return (
        <Container>
            <div className="mt-3">
                <h1> How to use </h1>
                <p>Select the sport at the top of the page that you would like to display lines for.  Select the date (or week) that you would like to display lines for by using the date dropdown box.  The website automatically pulls the best lines offered by all online sportsbooks in Pennsylvania.  If you do not want to display certain sportsbooks, deselect them by unchecking the box next to their name.  Lines are pulled every 10 minutes (on the 10-minute marks) and the last refresh time is shown at the top of the page.  You must manually refresh the page to display updated odds.</p>
                 
                 <br/>
                 <h1>FAQ</h1>
                <Accordion>
                   {this.renderFAQ("Which states and sportsbooks are lines shown for?","Only the following online Pennsylvania sportsbooks are currently offered: Fanduel, DraftKings, Foxbet, Barstool, Parx, Sugarhouse, Unibet, Caesars, BetAmerica, and BetRivers.  Additional states and sportsbooks to come!",1)}
                   {this.renderFAQ("How often are lines pulled?","Lines are retrieved from the sportsbooks every 10 minutes (on the 10-minute marks).  In order to display new lines, you must manually refresh or reload the web page.",2)}
                   {this.renderFAQ("I selected a sport, but there are no lines being displayed.  What’s going on?", "Make sure you have selected the correct date (or week for NFL) by using the calendar dropdown selector at the top right of the page.  It is possible the date you have selected does not currently have any games scheduled or sportsbooks are not yet offering lines on the upcoming game.",3)}
                   {this.renderFAQ("I don’t have an account with all of the sportsbooks, or I don’t want to show certain sportsbooks.  How do I hide them?","At the top of the page, you can deselect a sportsbook by unchecking the box next to its name.  The deselected books will no longer be displayed.  Your selections will be maintained as you switch between sports.",4)}
                   {this.renderFAQ("How do I report a bug or submit feedback?","Please email sportsaggregation@gmail.com  to report a bug or submit feedback.  Please let us know how we are doing or if something is not working how you would like it to!",5)}
                </Accordion>
            </div>
      </Container>
    )
  }   


    renderFAQ(question, answer, eventKey){
        return (
            <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={eventKey}>
                {question}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body>{answer}</Card.Body>
            </Accordion.Collapse>
        </Card>
        )
    }
}
export default FAQ;