import React from 'react';
import PropTypes from 'prop-types';

export default class SpotifyPreview extends React.Component {


    static propTypes = {
        artistName: PropTypes.string.isRequired
    };

    constructor() {
        super();
        this.state = {
            artistName: null
        }
    }

    componentDidMount() {
        fetch(`https://spotify-auth-340.herokuapp.com/spotify/artist/${this.props.artistName}`)
            .then(response => response.json())
            .then(data => this.setState({ artistId: data.artists.items[0].id }))
    }

    render() {
        let artistId = this.state.artistId;
        return (
            <div>
                {artistId &&
                <iframe src={`https://open.spotify.com/embed/artist/${artistId}`} width="300" height="250" allow="encrypted-media"/>
                }
            </div>
        );
    }

}