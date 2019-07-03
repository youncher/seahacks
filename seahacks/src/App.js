import React from 'react';
import { Row, Col } from 'reactstrap';
import { Header, Heading} from '@ticketmaster/aurora'
import SimpleMap from './components/SimpleMap';
import SpotifyPreview from "./SpotifyPreview";
import Filterbar from './components/Filterbar';
import geohash from 'ngeohash';
import zipcode from 'zipcodes';

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
            distance: null,
            zipcode: null,
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

    _onDateChange = (startDate, endDate) => {
        this.setState(state => ({ ...state, startDate, endDate}));
    };

    _onDateSelect = (type) => {
        console.log(type)
        let startDate, endDate;

        switch(type[0]) {
          case 'today':
            console.log('today');
            break;
          case 'tomorrow':
            console.log('tomorrow');
            break;
          case 'weekend':
            console.log('weekend');
            break;
        }
    }

    _onDistanceChange = (distance) => {
        this.setState(state => ({...state, distance: distance[0]}));
    }

    _onZipchange = (zipcode) => {
        this.setState(state => ({...state, zipcode}));
    }

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
                      <Heading.Strong>Explore</Heading.Strong>
                  </Heading>
              </Header>
              <div style={{ padding: '0 50px'}}>
                  <Row>
                    <Filterbar onDateSelected={this._onDateSelect} onDateChange={this._onDateChange} onDistanceChange={this._onDistanceChange} onZipChange={this._onZipchange} onStateChange={this._onStateChange} startDate={this.state.startDate} endDate={this.state.endDate} zipcode={this.state.zipcode} distance={this.state.distance}/>
                  </Row>
                  <Row>
                      <Col xs={9}>
                          <SimpleMap fetchEvents={this.fetchEvents} venues={this.state.venues} />
                      </Col>
                      <Col xs={3}>
                          <Row style={{ height: '70vh', overflowY: 'auto' }}>
                              {this.state.selectedEvents.map(event => {
                              return <div>
                                  <br/>{event.name}</div>
                            })}
                          </Row>
                          <Row style={{ height: '30vh' }}>
                              {/* fill box */}
                              <SpotifyPreview artistName={"Adele"} />
                          </Row>
                      </Col>
                  </Row>
              </div>
          </div>
      );
  }
}


