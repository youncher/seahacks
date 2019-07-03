import React, { Component } from 'react';
import SpotifyPreview from "../SpotifyPreview";
import {Row} from '@ticketmaster/aurora';

export default class EventsDisplay extends Component {

    render() {

        return (
            <div>
                <Row style={{ height: '70vh', overflowY: 'auto' }}>
                    {this.props.selectedEvents.map(event => {
                        return <div>
                            <br />{event.name}</div>
                    })}
                </Row>
                <Row style={{ height: '30vh' }}>
                    {/* fill box */}
                    <SpotifyPreview artistName={"Adele"} />
                </Row>
            </div>
        );
    }
}