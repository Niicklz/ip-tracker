import React, { useEffect, useState } from "react";

import { Map } from "./components/Map";
import { REQUEST_STATUS, useFetch } from "./utils/useFetch";
import { Loader } from "./components/Loader/Loader";
import { SocketLoader } from "./components/SocketLoader/SocketLoader";

export const App = () => {
  const [ip, setIp] = useState("");
  const { info, status, getData } = useFetch({
    url: `https://geo.ipify.org/api/v2/country,city?apiKey=at_HXSruIikJaNhIb1aT7hvFc2TUzlp0&ipAddress=${ip}`,
  });
 const handleChangeInput = (e)=> {
  setIp(e.target.value)
 }
 const searchLocation = ()=> {
  getData()
  setIp("")

 }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1 className="header__title">IP Address Tracker</h1>
        <form onSubmit={(e)=> e.preventDefault()}>
        <label className="header__label-search">
          <input
            className="header__input-search"
            type="text"
            placeholder="Search for any IP address"
            onChange={handleChangeInput}
            value={ip}
          />
          <button className="header__button-search" onClick={searchLocation}>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
              <path
                fill="none"
                stroke="#FFF"
                strokeWidth="3"
                d="M2 1l6 6-6 6"
              />
            </svg>
            
          </button>
        </label>
        </form>
       

        <section className="header__location-info">
          {status === REQUEST_STATUS.LOADING && <SocketLoader/>}
          {(status === REQUEST_STATUS.ERROR || status === REQUEST_STATUS.SUCCESS)  &&  (
            <>
            
              {" "}
              <div className="location-info__ip-address">
                <p className="ip-address__text">ip address</p>
                <p className="ip-address__address">{status === REQUEST_STATUS.ERROR? "N/A" : info.ip}</p>
              </div>
              <div className="location-info__location">
                <p className="location__text">location</p>
                <p className="location__current-location">
                  {status === REQUEST_STATUS.ERROR? "N/A" : <> <span>{ info.location.region},</span><span>{info.location.city}</span></> }
                 
                </p>
              </div>
              <div className="location-info__timezone">
                <p className="timezone__text">UTC</p>
                <p className="timezone__current-utc">
                   {status === REQUEST_STATUS.ERROR? "N/A" :  `UTC ${info.location.timezone}`}
                </p>
              </div>
              <div className="location-info__isp">
                <p className="isp__text">isp</p>
                <p className="isp__name">{status === REQUEST_STATUS.ERROR? "N/A" : info.isp}</p>
              </div>
            </>
          )}
        </section>
      </header>
      {status=== REQUEST_STATUS.LOADING && <div className="loader-container"><Loader/></div> }
      {status === REQUEST_STATUS.SUCCESS && <Map lat={info.location.lat} lng={info.location.lng} /> }
      {status === REQUEST_STATUS.ERROR && <div className="loader-container"><h3>IP Address or domain not found, please provide a valid input.</h3></div>}
      
    </div>
  );
};
