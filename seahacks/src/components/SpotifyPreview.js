import React from 'react';
import PropTypes from 'prop-types';

export default class SpotifyPreview extends React.Component {


    static propTypes = {
        artistName: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            artistId: null
        }
    }

    componentDidMount() {
        fetch(`https://spotify-auth-340.herokuapp.com/spotify/artist/${this.props.artistName}`)
            .then(response => response.json())
            .then(data => this.setState({artistId: data.artists.items[0].id}))
    }

    render() {
        let artistId = this.state.artistId;
        return (
            <div style={{width: '100%'}}>
                {artistId &&
                <iframe title={artistId} src={`https://open.spotify.com/embed/artist/${artistId}`} width="100%" height="100%"
                        allow="encrypted-media"/>
                }
            </div>
        );
    }

}