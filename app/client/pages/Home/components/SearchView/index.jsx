import React from 'react';

import Header from 'app/client/components/Header';


if (!__SSR__) {
  require('./styles.scss');
}


const SearchView = () => (
  <div className="view search-view">
    <Header />
  </div>
);

export default SearchView;

export const META = {
  name: 'search-view',
  target: '.search-view',
};
