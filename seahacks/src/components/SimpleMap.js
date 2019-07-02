import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
              bootstrapURLKeys={{ key: 'AIzaSyC6GdyRsootgeo2i634DrnVOoiNECethvA'}}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
          >
            <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
            />
          </GoogleMapReact>
        </div>
    );
  }
}

export default SimpleMap;