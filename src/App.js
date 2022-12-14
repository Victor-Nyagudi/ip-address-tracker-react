import './main.css';
import arrowIcon from './img/icon-arrow.svg';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'


function App() {
  const [ipAddressSearched, setIpAddressSearched] = useState('');
  const [ipAddressData, setIpAddressData] = useState(null);
  const [shouldGetData, setShouldGetData] = useState(false);

  async function fetchIpAddress(ipAddress = '') {
    const query = `?apiKey=${process.env.REACT_APP_GELOCATION_API_KEY}${ipAddress}`;

    const response = await fetch('https://geo.ipify.org/api/v1' + query);
    const data = await response.json();

    return data;
  }

  useEffect(() => {
    const getIpAdressData = async () => {
      const data = await fetchIpAddress();

      setIpAddressData(data);
    }    

    getIpAdressData();
  }, []);

  useEffect(() => {
    const getSearchedIpAddressData = async () => {
      const data = await fetchIpAddress(`&ipAddress=${ipAddressSearched}`);

      setIpAddressData(data);
    }

    if (shouldGetData) {
      getSearchedIpAddressData();

      setShouldGetData(false);

      setIpAddressSearched('');
    }

  }, [shouldGetData]);

  // * A test child component for when you want to use the map instance
  // * Read more here: https://react-leaflet.js.org/docs/api-map/#usemap
  function MyComponent() {
    const myMap = useMap();
    
    // * Simple log for testing the map instance. Leaving it here
    // * for future testing
    // console.log(`Map center: ${myMap.getCenter()}`);

    if (!shouldGetData)
      myMap.setView([ipAddressData.location.lat, ipAddressData.location.lng])

    return null;
  }
  
  function handleSubmit(e) {
    e.preventDefault();

    setShouldGetData(true);
  }

  return (
    <> 
      {
        ipAddressData &&

        <>
          <header>
            <div className="header container">
              <h1 className="header__title">IP Address Tracker</h1>

              <form role="search" onSubmit={(e) => handleSubmit(e)}>
                <input
                  type="search"
                  name="searchInput"
                  value={ ipAddressSearched }
                  id="searchInput"
                  placeholder="Search for any IP address or domain e.g. 1.1.1.1"
                  className="header__search"
                  aria-label="Search for an IP address"
                  onChange={(e) => setIpAddressSearched(e.target.value.trim())}
                  autoFocus
                />

                <input
                  type="image"
                  src={arrowIcon}
                  alt="Submit"
                  className="header__submit"
                />
              </form>
            </div>

            <section className="results container">
              <div className="results__section">
                <h2 className="results__title">
                  IP Address
                </h2>

                <p className="results__result ip-address">
                  {ipAddressData.ip}
                </p>
              </div>

              <div className="results__section">
                <h2 className="results__title">
                  Location
                </h2>

                <p className="results__result location">
                  {ipAddressData.location.city}
                </p>
              </div>

              <div className="results__section">
                <h2 className="results__title">
                  Timezone
                </h2>

                <p className="results__result">
                  UTC <span className="timezone">{ipAddressData.location.timezone}</span>
                </p>
              </div>

              <div className="results__section">
                <h2 className="results__title">
                  ISP
                </h2>

                <p className="results__result results__result--isp isp">
                  {ipAddressData.isp}
                </p>
              </div>
            </section>
          </header>

          <main id="mapId2" className="mapId2" aria-live="assertive">
            <h2 className="screen-reader-only">Map showing your IP address location</h2>

            <MapContainer center={[ipAddressData.location.lat, ipAddressData.location.lng]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[ipAddressData.location.lat, ipAddressData.location.lng]}>
                <Popup>
                  Here's what you're looking for. <br /> Zoom in for a closer view.
                </Popup>
              </Marker>
              <MyComponent />
            </MapContainer>
          </main>
        </>
      }
      
    </>
  );
}

export default App;
