import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { Header, Heading} from '@ticketmaster/aurora'
import SimpleMap from './components/SimpleMap';
import SpotifyPreview from "./SpotifyPreview";

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
        this.fetchVenueInfo();
    }

    fetchVenueInfo() {
        fetch('https://app.ticketmaster.com/discovery/v2/venues?apikey=cbPyuGXG7tj9nDEnQTaj1ptfM0HakPA5&locale=*&geoPoint=gbsuv7z')
            .then(response => response.json())
            .then(data => this.setState({ venues: data._embedded.venues }));
    }

    _onInputChange = (key, e) => {
        this.setState(state => ({ ...state, [key]: e.target.value  }));
    };

    _onDateChange = ({ startDate, endDate }) => {
        this.setState(state => ({ ...state, startDate, endDate}));
    };

    mapVenues = () => {
        return this.state.venues.map(venue => {
            // add your markers here
            return <div onClick={() => this.fetchEvents(venue.id)}>{venue.name}</div>
        });
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
                        ...state, events
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
              <Container>
                  <Row style={{ border: '2px solid black' }}>
                  </Row>
                  <Row>
                      <Col xs={8} style={{ border: '2px solid black' }}>
                          <SimpleMap></SimpleMap>
                      </Col>
                      <Col xs={4} style={{ border: '2px solid black' }}>
                          Scroll
                      </Col>
                  </Row>
              </Container>
          </div>
      );
  }
}


