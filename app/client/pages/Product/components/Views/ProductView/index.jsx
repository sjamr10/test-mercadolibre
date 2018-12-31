import React from 'react';
import { connect } from 'react-redux';

import Header from 'app/client/components/Header';
import Breadcrumb from 'app/client/components/Breadcrumb';


if (!__SSR__) {
  require('./styles.scss');
}


const ProductView = (props) => (
  <div className="view product-view">
    <Header />
    <Breadcrumb categories={props.results.categories} />
  </div>
);

export default connect((state) => state)(ProductView);

export const META = {
  name: 'product-view',
  target: '.product-view',
};
