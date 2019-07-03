import React, { Component } from 'react';
import SpotifyPreview from "../SpotifyPreview";
import ListRow from '@ticketmaster/aurora';
import {Row} from "reactstrap";


export default class EventsDisplay extends Component {

  render() {

    return (
        <div>
          <Row style={{ height: '70vh', overflowY: 'auto' }}>
            {this.props.selectedEvents.map(event => {
              return <div>
                <br />
                <a className='independent-link' href={event.url}>{event.name}</a>
              </div>
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