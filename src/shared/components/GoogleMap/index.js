import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: {
                lat: parseFloat(this.props.center.lat),
                lng: parseFloat(this.props.center.lng)
            }
        };
    }

    render() {
        const { center } = this.props;

        return (
            <GoogleMap
                defaultCenter={center}
                ref={this.onMapMounted}
                defaultZoom={15}
                center={center}
                onBoundsChanged={this.onBoundsChanged}
            >
                <Marker position={center} />
            </GoogleMap>
        );
    }
}

MapComponent.defaultProps = {
    center: {
        lat: parseFloat(59.724465),
        lng: parseFloat(30.080121)
    }
};

MapComponent.propTypes = {
    center: PropTypes.object
};

const connectMap = withGoogleMap(MapComponent);

export default withScriptjs(connectMap);
