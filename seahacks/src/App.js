import React from 'react';
import { Row, Col } from 'reactstrap';
import { Header, Heading} from '@ticketmaster/aurora'
import SimpleMap from './components/SimpleMap';
import SpotifyPreview from "./SpotifyPreview";
import Filterbar from './Filterbar';
import geohash from 'ngeohash';
import zipcode from 'zipcodes';
import EventsDisplay from './components/EventsDisplay';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            radius: 0,
            location: {
                lat: null,
                long: null
            },
            venues: [],
            events: {},
            selectedVenue: null,
            selectedEvents: [],
            endDate: null,
            startDate: null,
        }
    }

    componentDidMount() {
        let position = {
            coords: { latitude: "47.598686", longitude: "-122.334206"}
        };
        this.fetchVenueInfo(position);
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(this.fetchVenueInfo);
        // } else {
        //     console.log("didn't work.");
        // }
    }

    fetchVenueInfo = (position) => {
        let { latitude: lat, longitude: long } = position.coords;
        let geoHash = geohash.encode(lat, long, 7);
        fetch(`https://app.ticketmaster.com/discovery/v2/venues?apikey=cbPyuGXG7tj9nDEnQTaj1ptfM0HakPA5&locale=*&geoPoint=${geoHash}`)
            .then(response => response.json())
            .then(data => this.setState({ venues: data._embedded.venues, location: { lat: lat, lng: long }}));
    };

    _onInputChange = (key, e) => {
        this.setState(state => ({ ...state, [key]: e.target.value  }));
    };

    _onDateChange = ({ startDate, endDate }) => {
        this.setState(state => ({ ...state, startDate, endDate}));
    };

    renderSpotifyComponent = artistName => {
        return <SpotifyPreview artistName={artistName}/>;
    };

    fetchEvents = (id) => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=cbPyuGXG7tj9nDEnQTaj1ptfM0HakPA5&venueId=${id}&locale=*`)
            .then(response => response.json())
            .then(data => {
                this.setState(state => {
                    let events = state.events;
                    events[id] = data._embedded.events;
                    return {
                        ...state, events, selectedEvents: data._embedded.events
                    };
                });
            });
    };

    render() {
      return (
          <div className="App">
              <Header
                  withSpotLight
              >
                  <Heading level={1}>
                      <Heading.Strong>Fan Map</Heading.Strong>
                  </Heading>
              </Header>
              <div style={{ padding: '0 50px'}}>
                  <Row>
                    <Filterbar />
                  </Row>
                  <Row>
                      <Col xs={9}>
                          <SimpleMap fetchEvents={this.fetchEvents} venues={this.state.venues} />
                      </Col>
                      <Col xs={3}>
                          <EventsDisplay selectedEvents={this.state.selectedEvents} />
                      </Col>
                  </Row>
              </div>
          </div>
      );
  }
}


