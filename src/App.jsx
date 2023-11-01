import React, { useEffect, useState } from "react";

import { Map } from "./components/Map/Map";
import { Loader } from "./components/Loader/Loader";
import { Header } from "./components/Header/Header";
import { useFetch, REQUEST_STATUS } from "./utils/useFetch";

export const App = () => {
  const [ip, setIp] = useState("");
  const { info, status, getData } = useFetch({
    url: `https://geo.ipify.org/api/v2/country,city?apiKey=at_HXSruIikJaNhIb1aT7hvFc2TUzlp0&ipAddress=${ip}`,
  });
  const handleChangeInput = (e) => {
   
    setIp(e.target.value);
  };
  const searchLocation = () => {
    if(ip.trim() !== "") {
      getData();
      setIp("");
    }
   
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <Header
        info={info}
        status={status}
        searchLocation={searchLocation}
        handleChangeInput={handleChangeInput}
        ip={ip}
      />

      {status === REQUEST_STATUS.LOADING && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {status === REQUEST_STATUS.SUCCESS && (
        <Map lat={info.location.lat} lng={info.location.lng} />
      )}
      {status === REQUEST_STATUS.ERROR && (
        <div className="loader-container">
          <h3>IP Address or domain not found, please provide a valid input.</h3>
        </div>
      )}
    </div>
  );
};
