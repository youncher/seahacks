import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

const AnyReactComponent = () => <img src="https://img.icons8.com/color/24/000000/marker.png"></img>;


export default class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 47.599204,
      lng: -122.333416
    },
    zoom: 13
  };

  static propTypes = {
      venues: PropTypes.object.isRequired
  };

  _onChildClick = (key, childProps) => {
    this.props.fetchEvents(key);
  };

  mapVenues = () => {
      let venues = this.props.venues;
        let venuesArray = [];
        for (let i = 0; i < venues.length; i++) {
            let venue = venues[i];
            let el = <AnyReactComponent key={venue.id} lat={venue.location.latitude} lng={venue.location.longitude}/>
            venuesArray.push(el);
        }
        return venuesArray;
    };
  
  render() {
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyA9-k5GJJlT6DgxujE-C-A3xstUkudfoVo'}}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              onChildClick={this._onChildClick}
          >
              {this.props.venues.length > 0 && this.mapVenues()}
          </GoogleMapReact>
        </div>
    );
  }
}