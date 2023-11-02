import React from "react";
import "./DetailsInfo.css";
import { REQUEST_STATUS } from "../../utils/useFetch";
export const DetailsInfo = ({ infoName, text, detail, status }) => {
  return (
    <div className={`details-container`}>
      <p className="detail__text">{text}</p>
      <p className={`detail__${infoName}`}>
        {status === REQUEST_STATUS.ERROR ? "N/A" : detail}
      </p>
    </div>
  );
};
