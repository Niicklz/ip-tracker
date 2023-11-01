import React from 'react'

import { REQUEST_STATUS } from "../../utils/useFetch";
import { SocketLoader } from '../SocketLoader/SocketLoader';



export const Header = ({info, status, searchLocation, handleChangeInput, ip}) => {
  return (
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
  )
}
