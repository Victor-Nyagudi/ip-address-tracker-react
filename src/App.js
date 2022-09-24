import './main.css';
import arrowIcon from './img/icon-arrow.svg';

function App() {
  return (
    <>
      <header>
        <div className="header container">
          <h1 className="header__title">IP Address Tracker</h1>
          
          <form role="search">
            <input 
              type="search" 
              name="searchInput" 
              id="searchInput" 
              placeholder="Search for any IP address or domain" 
              className="header__search" 
              aria-label="Search for an IP address" 
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
