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
              return <div style={{borderStyle: 'solid' , borderWidth: '.1px', width: '100%' , borderColor: 'rgba(0, 0, 0, .1)'}}>
                <br />
                <a className='independent-link' href={event.url}>{event.name}</a>
                 <br/>
                    {event.dates.start.localDate}
                <br/>
                    {event._embedded.venues[0].name}
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