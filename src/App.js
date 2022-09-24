import './main.css';
import arrowIcon from './img/icon-arrow.svg';
import React, { useState, useEffect } from 'react';


class Tracker {
  constructor() {
      this.key = 'Your IP Geolocation API key goes here';  // <-- Removed the one I used for security reasons
      this.endpoint = 'https://geo.ipify.org/api/v1';
  }

  async getIpAddress(address) {
      const query = `?apiKey=${this.key}&ipAddress=${address}`;

      const response = await fetch(this.endpoint + query);
      const data = await response.json();
      
      return data;
  }

  async getClientIpAddress() {
      const query= `?apiKey=${this.key}`;

      const response = await fetch(this.endpoint + query);
      const data = await response.json();

      return data;
  }
}

// const myMap = L.map('mapId2')
// const tracker = new Tracker();

// const updateUI = data => {
//     ipAddress.textContent = data.ip;
//     locatione.textContent = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
//     timezone.textContent = data.location.timezone;
//     ISP.textContent = data.isp;
    
//     myMap.setView([data.location.lat, data.location.lng], 13);

//     L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         id: 'mapbox/streets-v11',
//         tileSize: 512,
//         zoomOffset: -1,
//         accessToken: 'You Mapbox access token goes here' // <-- Removed the one I used for security reasons
//     }).addTo(myMap);

//     const myIcon = L.icon({
//         iconUrl: './images/icon-location.svg',
//         iconAnchor: [23,56]
//     });

//     const myMarker = L.marker([data.location.lat, data.location.lng],{
//         icon: myIcon
//     }).addTo(myMap);

//     const circle = L.circle([data.location.lat, data.location.lng],{
//         color: 'green',
//         fillColor: 'limegreen',
//         fillOpcatiy: .1,
//         radius: 300
//     }).addTo(myMap);

//     myMarker.bindPopup('IP Address location');
//     circle.bindPopup('This is the general area of the address.');
// };


// tracker.getClientIpAddress()
//     .then(data => updateUI(data))
//     .catch(err => console.log(err));


// searchForm.addEventListener('submit', e => {
//     e.preventDefault();

//     const addressSearched = searchForm.searchInput.value.trim();

//     tracker.getIpAddress(addressSearched)
//         .then(data => updateUI(data))
//         .catch(err => console.log(err));

//     searchForm.reset();
// });

function App() {
  function handleSubmit(e) {
    e.preventDefault();
  }

  const [ipAddressSearched, setIpAddressSearched] = useState('');

  useEffect(() => {
    
  }, []);

  return (
    <>
      <header>
        <div className="header container">
          <h1 className="header__title">IP Address Tracker</h1>
          
          <form role="search" onSubmit={(e) => handleSubmit(e) }>
            <input 
              type="search" 
              name="searchInput" 
              id="searchInput" 
              placeholder="Search for any IP address or domain" 
              className="header__search" 
              aria-label="Search for an IP address" 
              onChange={(e) => setIpAddressSearched(e.target.value.trim()) }
              autoFocus
            />
            
            <input 
              type="image" 
              src={ arrowIcon } 
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
            </p>
          </div>
          
          <div className="results__section">
            <h2 className="results__title">
              Location
            </h2>
            
            <p className="results__result location">
            </p>
          </div>
          
          <div className="results__section">
            <h2 className="results__title">
              Timezone
            </h2>
            
            <p className="results__result">
              UTC <span className="timezone"></span>
            </p>
          </div>
          
          <div className="results__section">
            <h2 className="results__title">
              ISP
            </h2>
            
            <p className="results__result results__result--isp isp">
            </p>
          </div>
        </section>    
      </header>
      
      <main id="mapId2" className="mapId2" aria-live="assertive">
        <h2 className="screen-reader-only">Map showing your IP address location</h2>
      </main>
    </>
  );
}

export default App;
