import React, {Component} from 'react';
import SpotifyPreview from "./SpotifyPreview";
import {Row} from 'reactstrap'
import {DayTileItem, DayTileButton} from '@ticketmaster/aurora';
import moment from 'moment';

export default class EventsDisplay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spotifyIsHidden: true
        }
    }

    renderEvent = (event) => {
        return (
            <DayTileItem style={{
                width: '100%',
                height: 'auto',
                margin: '10px 0',
                borderRadius: '5px',
                backgroundColor: '#1f262d',
                color: 'white',
                padding: '20px'
            }}>
                <div style={{ height: '100%'}}>
                    <img
                        src={event.images[0].url}
                        width={"100%"}
                        alt={event.name}
                    />
                </div>
                <div style={{ paddingTop: '5px' }}>
                    <span style={{ fontSize: '18px' }}>{event.name}</span>
                </div>
                <div style={{ paddingBottom: '8px', fontSize: '14px' }}>{moment(event.dates.start.dateTime).format('dddd, MMMM Do - h:mm a')}</div>
                <DayTileButton href={event.url}>View Event</DayTileButton>
            < /DayTileItem>
        )
    };


    render() {
        const clickEvent = () => {
            this.setState({
                spotifyIsHidden: !this.state.spotifyIsHidden
            })
        };
        console.log(this.props.selectedEvents)
        const events = this.props.selectedEvents.map((event, index) => this.renderEvent(event));
        const venue = <h5 style={{ marginBottom: '0', textAlign: 'center', width: '100%' }}>{this.props.selectedEvents.length > 0 && this.props.selectedVenue}</h5>;
        //const artiste = <div>{this.props.selectedEvents.length > 0 && this.props.selectedEvents[0]._embedded.attractions[0].name}</div>
        return (
            <div>
                <Row style={{height: '8vh', display: 'flex', alignItems: 'center' }}>
                    {venue}
                </Row>
                <Row style={{height: '72vh', overflowY: 'auto', padding: '5px 10px'}}>
                    {events.length > 0 ? events : <p className="text-center">Select a venue to view events!</p>}
                </Row>
                <Row style={{height: '30vh' }}>
                    {/* fill box */}
                    {!this.state.spotifyIsHidden && <SpotifyPreview artistName={"Avril"}/>}
                </Row>
            </div>
        );
    }
}