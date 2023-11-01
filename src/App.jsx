import React from 'react'

export const App = () => {
  return (
    <div className='container'>
      <header className='header'>
        <h1 className="header__title">IP Address Tracker</h1>
        <label className='header__label-search'>
          <input className='header__input-search' type="text" placeholder='192.1.1.1'/>
          <button className='header__button-search'>flechita</button>
        </label>

        <section className="header__location-info">
          <div className="location-info__ip-address"></div>
          <div className="location-info__location"></div>
          <div className="location-info__timezone"></div>
          <div className="location-info__isp"></div>
        </section>

      </header>
    </div>
  )
}
