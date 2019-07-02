import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => <img src="https://img.icons8.com/color/24/000000/marker.png"></img>




class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 47.599204,
      lng: -122.333416
    },
    zoom: 13
  };

  _onChildClick = (key, childProps) => {
    console.log("hello");
  }
  
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