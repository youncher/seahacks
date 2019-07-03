import React, { Component } from 'react';
import SpotifyPreview from "../SpotifyPreview";
import {Row} from 'reactstrap'

export default class EventsDisplay extends Component {

//<img src={event[index].images[0].url}/>




    render() {

        const clickEvent = () => {
                        console.log("hi")
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
                    <SpotifyPreview artistName={"Adele"} />
                </Row>
            </div>
        );
    }
}