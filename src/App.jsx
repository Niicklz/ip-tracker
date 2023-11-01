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
 

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1 className="header__title">IP Address Tracker</h1>
        <label className="header__label-search">
          <input
            className="header__input-search"
            type="text"
            placeholder="Search for any IP address"
          />
          <button className="header__button-search">
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

        <section className="header__location-info">
          {status === REQUEST_STATUS.LOADING && <SocketLoader/>}
          {status === REQUEST_STATUS.SUCCESS && (
            <>
            
              {" "}
              <div className="location-info__ip-address">
                <p className="ip-address__text">ip address</p>
                <p className="ip-address__address">{info.ip}</p>
              </div>
              <div className="location-info__location">
                <p className="location__text">location</p>
                <p className="location__current-location">
                  <span>{info.location.region},</span><span>{info.location.city}</span>
                </p>
              </div>
              <div className="location-info__timezone">
                <p className="timezone__text">UTC</p>
                <p className="timezone__current-utc">
                  UTC {info.location.timezone}
                </p>
              </div>
              <div className="location-info__isp">
                <p className="isp__text">isp</p>
                <p className="isp__name">{info.isp}</p>
              </div>
            </>
          )}
        </section>
      </header>
      {status=== REQUEST_STATUS.LOADING && <div className="loader-container"><Loader/></div> }
      {status === REQUEST_STATUS.SUCCESS && <Map lat={info.location.lat} lng={info.location.lng} /> }
      
    </div>
  );
};
