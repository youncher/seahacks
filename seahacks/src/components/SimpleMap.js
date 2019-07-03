import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';


const AnyReactComponent = (props) => {
    let hover = props.$hover;
    return (
        <div>
            {hover && <div className="fm-tooltip">{props.venueName}</div>}
            <img alt="marker" className={hover ? "marker-hover" : ""} src="https://img.icons8.com/color/24/000000/marker.png"/>
        </div>
    );
};


export default class SimpleMap extends Component {
  static defaultProps = {
    defaultCenter: {
      lat: 47.599204,
      lng: -122.333416
    },
    zoom: 13
  };

  static propTypes = {
      venues: PropTypes.array.isRequired,
      defaultCenter: PropTypes.object,
      center: PropTypes.object.isRequired
  };

  _onChildClick = (key, childProps) => {
    this.props.fetchEvents(key, childProps.venueName);
  };

  mapVenues = () => {
      let venues = this.props.venues;
        let venuesArray = [];
        for (let i = 0; i < venues.length; i++) {
            let venue = venues[i];
            let el = <AnyReactComponent key={venue.id} venueName={venue.name} lat={venue.location.latitude} lng={venue.location.longitude}/>
            venuesArray.push(el);
        }
        return venuesArray;
    };
  
  render() {
    return (
        // Important! Always set the container height explicitly
        <div style={{ width: '100%' }} className="fm-map">
          <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyA9-k5GJJlT6DgxujE-C-A3xstUkudfoVo'}}
              defaultCenter={this.props.defaultCenter}
              center={this.props.center || null}
              defaultZoom={this.props.zoom}
              onChildClick={this._onChildClick}
              overlayViewDivStyle={{ borderRadius: '10px' }}
          >
              {this.props.venues.length > 0 && this.mapVenues()}
          </GoogleMapReact>
        </div>
    );
  }
}