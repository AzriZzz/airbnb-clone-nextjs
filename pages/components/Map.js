import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  //transform new object to have only latitude and longitude
  // const coordinates = searchResults?.map((result) => ({
  //   longitude: result.long,
  //   latitude: result.lat,
  // }));

  const coordinates = [];
  searchResults?.forEach((result) => {
    coordinates.push({
      longitude: result.long,
      latitude: result.lat,
    });
  });

  console.log(coordinates);

  // the latitude and longitude of the center of locations coordinates
  const center = getCenter(coordinates);

  const [viewport, setViwport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/azrizzzz/ckslu9jmt0tiq17lz7zqgk2em"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViwport(nextViewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {/* The popup show if marker is clicked */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
