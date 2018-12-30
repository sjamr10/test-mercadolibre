import React from 'react';


if (!__SSR__) {
  require('./styles.scss');
}


const Header = (props) => (
  <div className="header">
    <div className="row justify-content-sm-center">
      <div className="logo col-12 col-sm-1">
        <img src="/images/Logo_ML2x.png" alt="Logo de Mercadolibre" />
      </div>
      <div className="search-box col-12 col-sm-7">
        {props.children}
      </div>
    </div>
  </div>
);

export default Header;
