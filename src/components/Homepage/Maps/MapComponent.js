/* global google */
import React, {useEffect, useState} from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    DirectionsRenderer,
    DirectionsService
} from "@react-google-maps/api";


import "@reach/combobox/styles.css";

import CardComponent from "./CardComponent";
import MapDirectionsRenderer from "./MapDirectionComponent";
import SearchBar from "../SearchBarComponent";

// to avoid rerender
const libraries = ["places", "geometry", "drawing"];
const mapContainerStyle = {
    height: "60vh",
    width: "100%",
    top: 50
    
};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
};
const center = {
    lat: 34.052235,
    lng: -118.243683,
};

let places = [
    {latitude: 27.9947147,longitude: -82.5943645},
    {latitude: 28.4813018,longitude: -81.4387899},
    {latitude: 29.4813018,longitude: -81.4387899}];

// const MapComponent = withScriptjs(
//     withGoogleMap(props => (
//         <GoogleMap>
//             <MapDirectionsRenderer places={props.markers} travelMode="DRIVING" />
//         </GoogleMap>
//     ))
// );
//
// export default MapComponent;

export default  function MapComponent() {
    // if the google script is ready
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey:"AIzaSyBlHhL9EqgJx0ZFIuzc5vn2yUAe96pZhs8",
        libraries,
    });
    const [markers, setMarkers] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const onMapClick = React.useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
        places.push( {lat: e.latLng.lat(), lng: e.latLng.lng() } );
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (
        <div>
            <div className="mapContainer">
                <SearchBar panTo={panTo} setMarkers = {setMarkers}/>
                <GoogleMap
                    id="map"
                    mapContainerStyle={mapContainerStyle}
                    zoom={8}
                    center={center}
                    options={options}
                    onClick={onMapClick}
                    onLoad={onMapLoad}
                >
                    <Locate panTo={panTo} />
                    {markers.map((marker) => (
                        <Marker
                            key={`${marker.lat}-${marker.lng}`}
                            position={{ lat: marker.lat, lng: marker.lng }}
                            onClick={() => {
                                setSelected(marker);
                            }}

                        />
                    ))}
                    {selected ? (
                        <InfoWindow
                            position={{ lat: selected.lat, lng: selected.lng }}
                            onCloseClick={() => {
                                setSelected(null);
                            }}
                        >
                            <div style={{ width: "18rem" }}>
                                <CardComponent placeId = {selected.placeId} />
                                <h5>{selected.address}</h5>
                            </div>
                        </InfoWindow>
                    ) : null}
                    {/*<MapDirectionsRenderer*/}
                    {/*    places={[*/}
                    {/*        {latitude: 27.9947147,longitude: -82.5943645},*/}
                    {/*        {latitude: 28.4813018,longitude: -81.4387899},*/}
                    {/*        {latitude: 29.4813018,longitude: -81.4387899}]}*/}
                    {/*    travelMode="DRIVING"*/}
                    {/*/>*/}
                </GoogleMap>
            </div>    

        </div>

    );
}

// get the current position
function Locate({ panTo }) {
    return (
        <button
            className="locate"
            onClick={() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        panTo({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        });
                    },
                    () => null
                );
            }}
        >
            <img src="/compass.svg" alt="compass" />
        </button>
    );
}

// function MapDirectionsRenderer(props) {
//     const [directions, setDirections] = useState(null);
//     const [error, setError] = useState(null);
//
//     useEffect(() => {
//         const { places, travelMode } = props;
//
//         const waypoints = places.map(p => ({
//             location: { lat: p.latitude, lng: p.longitude },
//             stopover: true
//         }));
//         const origin = waypoints.shift().location;
//         const destination = waypoints.pop().location;
//
//         const directionsService = new google.maps.DirectionsService();
//         directionsService.route(
//             {
//                 origin: origin,
//                 destination: destination,
//                 travelMode: travelMode,
//                 waypoints: waypoints
//             },
//             (result, status) => {
//                 console.log(result)
//                 if (status === google.maps.DirectionsStatus.OK) {
//                     setDirections(result);
//                 } else {
//                     setError(result);
//                 }
//             }
//         );
//     });
//
//     if (error) {
//         return <h1>{error}</h1>;
//     }
//     return (
//         directions && (
//             <DirectionsRenderer directions={directions} />
//         )
//     );
// }


