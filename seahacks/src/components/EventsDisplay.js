import React, { Component } from 'react';
import SpotifyPreview from "../SpotifyPreview";
import {Row} from 'reactstrap'

export default class EventsDisplay extends Component {

    constructor(props) {
            super(props);
            this.state = {
                spotifyIsHidden: true
            }
        }




    render() {

        const clickEvent = () => {
                          this.setState({
                                spotifyIsHidden: !this.state.spotifyIsHidden
                          })
                    };

        const events = this.props.selectedEvents.map((event, index) => {
                            return (
                                <div style={{ borderStyle: 'solid', borderWidth: '.1px', width: '100%', height: '100px',
                                              display: 'flex', borderColor: 'rgba(0, 0, 0, .1)'}}
                                     onClick={clickEvent}>
                                    <img src={event.images[0].url} height="60" width="80"/>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <a className='independent-link' href={event.url}>{event.name}</a>
                                        <div>{event.dates.start.localDate}</div>
                                        <br/>
                                    </div>
                                </div>
                            )});
        console.log(this.props.selectedEvents);
        const venue = <div>{this.props.selectedEvents.length > 0 && this.props.selectedEvents[0]._embedded.venues[0].name}</div>
        const artiste = <div>{this.props.selectedEvents.length > 0 && this.props.selectedEvents[0]._embedded.attractions[0].name}</div>

        return (
            <div>
                <Row style={{ height: '8vh'}}>
                    <div>{venue}</div>
                </Row>
                <Row style={{ height: '72vh', overflowY: 'auto' }}>
                    {events}
                </Row>
                <Row style={{ height: '30vh' }}>
                    {/* fill box */}
                    {!this.state.spotifyIsHidden && <SpotifyPreview artistName={"Avril"}/>}
                </Row>
            </div>
        );
    }
}