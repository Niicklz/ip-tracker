import React, { useEffect, useState } from "react";

import { Map } from "./components/Map/Map";
import { Loader } from "./components/Loader/Loader";
import { Header } from "./components/Header/Header";
import { useFetch, REQUEST_STATUS } from "./utils/useFetch";
import { getLocationDataBy } from "./services/getLocationDataBy";
import { Input } from "./components/Input/Input";
import { WaveLoader } from "./components/WaveLoader/WaveLoader";
import { DetailsInfo } from "./components/DetailsInfo/DetailsInfo";

export const App = () => {
  const [ip, setIp] = useState("");
  const { info, status, getData } = useFetch({
    handle: getLocationDataBy,
  });
  const handleChangeInput = (e) => {
    setIp(e.target.value);
  };
  const searchLocation = () => {
    if (ip.trim() !== "") {
      getData(ip);
      setIp("");
    }
  };

  useEffect(() => {
    getData(ip);
  }, []);

  return (
    <div className="container">
      <Header>
        <h1 className="header__title">IP Address Tracker</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            onChangeInput={handleChangeInput}
            onSearchLocation={searchLocation}
            ipValue={ip}
          />
        </form>
        <section className="header__location-info">
          {status === REQUEST_STATUS.LOADING && <WaveLoader />}
          {(status === REQUEST_STATUS.ERROR ||
            status === REQUEST_STATUS.SUCCESS) && (
            <>
              <DetailsInfo
                status={status}
                infoName="address"
                text="ip address"
                detail={info.ipAddress}
              />
              <DetailsInfo
                status={status}
                infoName="location"
                text="location"
                detail={info.location}
              />
              <DetailsInfo
                status={status}
                infoName="timezone"
                text="utc"
                detail={info.timezone}
              />
              <DetailsInfo
                status={status}
                infoName="isp"
                text="isp"
                detail={info.ispName}
              />
            </>
          )}
        </section>
      </Header>

      {status === REQUEST_STATUS.LOADING && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {status === REQUEST_STATUS.SUCCESS && (
        <Map lat={info.lat} lng={info.lng} />
      )}
      {status === REQUEST_STATUS.ERROR && (
        <div className="loader-container">
          <h3>IP Address or domain not found, please provide a valid input.</h3>
        </div>
      )}
    </div>
  );
};
