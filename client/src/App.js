import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { listLogEntries } from "./API";
import LogEntryForm from './LogEntryForm'

const Map = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
    console.log(logEntries);
  }

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [ longitude, latitude ] = event.lngLat;
    setAddEntryLocation({
      longitude,
      latitude
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/wow1/ck98sg3co01li1imfwhulyy6f"
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map(entry => (
        <React.Fragment key={entry._id}>
          <Marker latitude={entry.latitude} longitude={entry.longitude}>
            <div
              className="marker"
              onClick={() =>
                setShowPopup({
                  [entry._id]: true
                })
              }
            >
              <svg
                viewBox="0 0 24 24"
                style={{
                  width: `${6 * viewport.zoom}px`,
                  height: `${6 * viewport.zoom}px`
                }}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
              anchor="top"
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>{new Date(entry.visitDate).toLocaleDateString()}</small>
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {
        addEntryLocation 
        ? (
          <React.Fragment> 
            <Marker latitude={addEntryLocation.latitude} longitude={addEntryLocation.longitude}>
              <svg
                viewBox="0 0 24 24"
                className="marker"
                style={{
                  width: `${6 * viewport.zoom}px`,
                  height: `${6 * viewport.zoom}px`
                }}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </Marker>

            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setAddEntryLocation(null)}
              anchor="top"
            >
              <div className="popup form">
                <h3>
                  <LogEntryForm onClose={() => {
                    setAddEntryLocation(null)
                    getEntries();
                  }} location={addEntryLocation} />
                </h3>
              </div>
            </Popup>
          </React.Fragment>
        )
        : null
      }
    </ReactMapGL>
  );
};

export default Map;
