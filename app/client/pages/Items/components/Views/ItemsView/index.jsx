import React from 'react';

import Header from 'app/client/components/Header';


if (!__SSR__) {
  require('./styles.scss');
}


const ItemsView = () => (
  <div className="view items-view">
    <Header />
  </div>
);

export default ItemsView;

export const META = {
  name: 'items-view',
  target: '.items-view',
};
