import React from "react";
import "./Input.css";

export const Input = ({ onChangeInput, ipValue, onSearchLocation }) => {
  return (
    <label className="header__label-search">
      <input
        className="header__input-search"
        type="text"
        placeholder="Search for any IP address"
        onChange={onChangeInput}
        value={ipValue}
      />
      <button
        className="header__button-search"
        onClick={() => onSearchLocation()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
          <path fill="none" stroke="#FFF" strokeWidth="3" d="M2 1l6 6-6 6" />
        </svg>
      </button>
    </label>
  );
};
