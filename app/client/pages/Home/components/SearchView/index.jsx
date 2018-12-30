import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from 'app/client/components/Header';
import SearchBox from 'app/client/components/inputs-control/SearchBox';

import { SearchActions } from 'app/client/pages/Home/reducers/search';


if (!__SSR__) {
  require('./styles.scss');
}


class SearchView extends Component {
  constructor(props) {
    super(props);

    this.search = React.createRef();
  }

  submit = () => {
    console.log('search');
  };

  render() {
    return (
      <div className="view search-view">
        <div className="row justify-content-md-center">
          <div className="col-12">
            <Header>
              <SearchBox
                ref={this.search}
                enterKey={this.submit}
                placeholder="Nunca dejes de buscar"
                required
              />
            </Header>
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state) => state, {
  ...SearchActions,
})(SearchView);

export const META = {
  name: 'search-view',
  target: '.search-view',
};
