import { useState } from "react"
import ReactMapGl, { Marker, Popup } from "react-map-gl"
import getCenter from "geolib/es/getCenter"
function Map({ s }) {
  const [select, setSelect] = useState({})

  const cod = s.map((r) => ({
    latitude: r.lat,
    longitude: r.long,
  }))
  const center = getCenter(cod)
  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  })
  return (
    <ReactMapGl
      mapStyle='mapbox://styles/zigcer/cks0i5zbf2bmq18nn41layy0m'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      width='100%'
      height='100%'
      onViewportChange={(n) => setViewport(n)}
    >
      {s.map((r) => (
        <div key={r.long}>
          <Marker
            longitude={r.long}
            latitude={r.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role='img'
              onClick={() => setSelect(r)}
              aria-label='push pin'
              className='cursor-pointer  text-2xl animate-bounce'
            >
              📌
            </p>
          </Marker>
          {select?.long === r.long ? (
            <Popup
              onClose={() => setSelect({})}
              latitude={r.lat}
              longitude={r.long}
              closeOnClick={true}
            >
              {r.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGl>
  )
}

export default Map