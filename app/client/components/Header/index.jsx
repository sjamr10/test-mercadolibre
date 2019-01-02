import React, { Component } from 'react';

import SearchBox from 'app/client/components/SearchBox';


if (!__SSR__) {
  require('./styles.scss');
}


class Header extends Component {
  constructor(props) {
    super(props);

    this.form = React.createRef();
  }

  goToHomePage = () => {
    this.form.current.submit();
  }

  render() {
    return (
      <div className="rcc-header row justify-content-sm-center">
        <form
          ref={this.form}
          className="d-none"
          action="/"
          method="get"
        />
        <div className="logo col-12 col-sm-1" onClick={this.goToHomePage}>
          <img src="/images/Logo_ML2x.png" alt="Logo de Mercadolibre" />
        </div>
        <div className="search-box col-12 col-sm-8 col-md-6">
          <SearchBox />
        </div>
      </div>
    );
  }
}

export default Header;
