import React from 'react';
import { connect } from 'react-redux';

import Header from 'app/client/components/Header';
import Breadcrumb from 'app/client/components/Breadcrumb';
import ProductDetails from 'app/client/pages/Product/components/ProductDetails';


if (!__SSR__) {
  require('./styles.scss');
}


const ProductView = (props) => {
  const { item } = props.product;

  return (
    <div className="view product-view">
      <Header />
      <Breadcrumb categories={item ? item.categories : []} />
      <ProductDetails product={item} />
    </div>
  );
};

export default connect((state) => state)(ProductView);

export const META = {
  name: 'product-view',
  target: '.product-view',
};
