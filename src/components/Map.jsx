import React, { useEffect } from 'react';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents
} from 'react-leaflet'
import { useState } from 'react'
import styles from './Map.module.css'
import { useNavigate } from 'react-router-dom'
import { useCities } from '../contexts/CityContext'
import { useGeolocation } from './hooks/useGeolocation';
import {useUrl} from './hooks/useUrl';


export default function Map () {

  const [mapLat,mapLng]=useUrl();
  const {
    isLoading: loaded,
    position: geoLocationPosition,
    getPosition
  } = useGeolocation();

  const [mapPosition, setMapPosition] = useState([40, 10])
  const { cities } = useCities();
  //this effect is used to stay the marker on the selected city in map.
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
    },

    [mapLat, mapLng]
  )

  useEffect(
    function () {
      console.log(geoLocationPosition)
      if(geoLocationPosition){
        setMapPosition([geoLocationPosition?.lat,geoLocationPosition?.lng])
      }
      
    },
    [geoLocationPosition]
  )

  return (
    <div className={styles.mapContainer}>
      <button onClick={getPosition} className='position'>
        Use your Position
      </button>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map(city => {
          return (
            <Marker
              position={[city.position?.lat, city.position?.lng]}
              key={city.id}
            >
              <Popup>{city.cityName}</Popup>
            </Marker>
          )
        })}

        <ChangeCentre position={mapPosition}></ChangeCentre>
        <DetectClick />
      </MapContainer>

      <h1>Map</h1>
    </div>
  )
}

function ChangeCentre ({ position }) {
  const map = useMap() //provided by leaflet
  if(position){
    
  map.setView(position)
  }

  return null
}
function DetectClick() {
  const navigate = useNavigate();

  // e object is received here
  useMapEvents({
    click: e => {
      const lat = e.latlng.lat || 40; // Use a default value if lat is undefined
      const lng = e.latlng.lng || 0;  // Use a default value if lng is undefined
      
      console.log(e);
      navigate(`form?lat=${lat}&lng=${lng}`);
    }
  });

  return null;
}

