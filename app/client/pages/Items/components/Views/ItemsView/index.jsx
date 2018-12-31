import React from 'react';
import { connect } from 'react-redux';

import Header from 'app/client/components/Header';
import Breadcrumb from 'app/client/components/Breadcrumb';
import ItemsList from 'app/client/pages/Items/components/ItemsList';


if (!__SSR__) {
  require('./styles.scss');
}


const ItemsView = (props) => (
  <div className="view items-view">
    <Header />
    <Breadcrumb categories={props.results.categories} />
    <ItemsList items={props.results.items} />
  </div>
);

export default connect((state) => state)(ItemsView);

export const META = {
  name: 'items-view',
  target: '.items-view',
};
