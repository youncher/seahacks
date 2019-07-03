import React from 'react';
import {Row, Col} from 'reactstrap';
import {Heading, Banner} from '@ticketmaster/aurora'
import SimpleMap from './components/SimpleMap';
import { BounceLoader } from 'react-spinners';
import FilterBar from './components/FilterBar';
import geohash from 'ngeohash';
import zipcodeSearch from 'zipcodes';
import EventsDisplay from './components/EventsDisplay';
import { css } from '@emotion/core';
import moment from 'moment';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            radius: 0,
            location: {
                lat: 47.599204,
                lng: -122.333416
            },
            center: {
                lat: 47.599204,
                lng: -122.333416
            },
            venues: [],
            events: {},
            fetching: true,
            selectedVenue: null,
            selectedEvents: [],
            selectedEventArtist: null,
            endDate: null,
            startDate: null,
            distance: "",
            zipcode: "",
            isError: false,
            errorMessage: "Error fetching event information!"
        }
    }

    componentDidMount() {
        let position = {
            coords: {latitude: "47.598686", longitude: "-122.334206"}
        };
        this.fetchVenueInfo(position);
        // if (navigator.geolocation) {
        //     navigator.geolocation.getCurrentPosition(this.fetchVenueInfo);
        // } else {
        //     console.log("didn't work.");
        // }
    }

    fetchVenueInfo = (position) => {
        let {latitude: lat, longitude: lng} = position.coords;
        let {distance} = this.state;
        let geoHash = geohash.encode(lat, lng, 7);
        let url = `https://app.ticketmaster.com/discovery/v2/venues?apikey=cbPyuGXG7tj9nDEnQTaj1ptfM0HakPA5&locale=*&geoPoint=${geoHash}`;
        if (distance !== "") {
            url += `&radius=${distance}&unit=miles`;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                venues: data._embedded.venues,
                location: {lat, lng},
                fetching: false,
                center: {lat: Number(lat), lng: Number(lng)}
            }));
    };

    fetchEvents = (id, name) => {
        let {startDate, endDate} = this.state;
        let url = `https://app.ticketmaster.com/discovery/v2/events?apikey=cbPyuGXG7tj9nDEnQTaj1ptfM0HakPA5&venueId=${id}&locale=*`;
        if (startDate && endDate) {
            url += `&startDateTime=${startDate.format('YYYY-MM-DDTHH:mm:ssZ')}&endDateTime=${endDate.format('YYYY-MM-DDTHH:mm:ssZ')}`;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data._embedded) {
                    this.setState(state => {
                        let events = state.events;
                        events[id] = data._embedded.events;
                        return {
                            ...state, events, selectedEvents: data._embedded.events, selectedVenue: name
                        };
                    });
                } else {
                    this.setState({
                        //isError: true,
                        //errorMessage: "No events found!",
                        selectedEvents: []
                    });
                }
            });
    };

    fetchArtist = (id) => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=cbPyuGXG7tj9nDEnQTaj1ptfM0HakPA5&id=${id}`)
            .then(response => response.json())
            .then(data => this.setState({selectedEventArtist: data._embedded.attractions[0].name}));

    };

    refreshMap = () => {
        let {zipcode, location} = this.state;
        let position;
        if (zipcode !== "") {
            let newLocation = zipcodeSearch.lookup(zipcode);
            if (newLocation) {
                position = {
                    coords: {latitude: newLocation.latitude, longitude: newLocation.longitude}
                };
            } else {
                this.setState({
                    isError: true,
                    errorMessage: "Zipcode was entered incorrectly."
                });
                return;
            }
        } else {
            position = {
                coords: {
                    latitude: location.lat,
                    longitude: location.lng
                }
            }
        }
        this.setState({
            fetching: true,
        }, () => this.fetchVenueInfo(position));

    };

    _onInputChange = (key, value) => {
        this.setState(state => ({...state, [key]: value}));
    };

    _onDateChange = (startDate, endDate) => {
        this.setState(state => ({...state, startDate, endDate}));
    };

    _onDateSelect = (type) => {
        let startDate, endDate;
        switch (type[0]) {
            case 'today':
                startDate = moment().startOf('day');
                endDate = moment().endOf('day');
                break;
            case 'tomorrow':
                let tomorrow = moment().add(1, 'day');
                startDate = tomorrow.startOf('day');
                endDate = tomorrow.endOf('day');
                break;
            case 'weekend':
                let friday = moment().day(5);
                let sunday = moment().day(7);
                startDate = friday;
                endDate = sunday;
                break;
            default:
                startDate = null;
                endDate = null;
        }
        this.setState({
            startDate,
            endDate
        });
    };

    _onDistanceChange = (distance) => {
        this.setState(state => ({...state, distance: distance[0]}));
    };

    render() {
        return (
            <div className="App">

            <img src='./headerbar.png' style={{width: '100vw'}}/>

                <div style={{padding: '0 50px'}}>
                    <Row style={{alignItems: 'center', margin: '10px'}}>
                        <FilterBar onDateSelected={this._onDateSelect} onDateChange={this._onDateChange}
                                   onDistanceChange={this._onDistanceChange} onChange={this._onInputChange}
                                   onStateChange={this._onStateChange} startDate={this.state.startDate}
                                   endDate={this.state.endDate} zipcode={this.state.zipcode}
                                   distance={this.state.distance}
                                   onButtonClick={this.refreshMap}
                        />
                    </Row>
                    <div style={{ margin: '10px' }}>
                        <Banner isOpen={this.state.isError} heading={this.state.errorMessage} onRequestClose={() => this.setState({ isError: false})} variant={"error"}/>
                    </div>
                    <Row>
                        <Col xs={9}>
                            <SimpleMap fetchEvents={this.fetchEvents} venues={this.state.venues}
                                       fetchArtist={this.fetchArtist} center={this.state.center}/>
                            {this.state.fetching &&
                            <div style={{ position: 'relative', width: '100%', height: '100%',
                                top: '-50%' }}><BounceLoader css={css`margin-left: auto; margin-right: auto;`}  color={"#0150a7"}/></div>}
                        </Col>
                        <Col xs={3}>
                            <EventsDisplay selectedEvents={this.state.selectedEvents} fetchArtist={this.fetchArtist}
                                           selectedVenue={this.state.selectedVenue}/>
                        </Col>
                    </Row>
                </div>
                <img src='./footer.png' style={{width:'100vw'}}/>

            </div>
        );
    }
}


