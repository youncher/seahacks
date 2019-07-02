import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
    <div style={{
      color: 'white',
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
    </div>
);


class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 47.599204,
      lng: -122.333416
    },
    zoom: 11
  };

  render() {
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyA9-k5GJJlT6DgxujE-C-A3xstUkudfoVo'}}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
                lat={47.590333}
                lng={-122.33285}
                // text="My Marker"
            />
          </GoogleMapReact>
        </div>

    );
  }
}

export default SimpleMap;