import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from 'app/client/components/Header';
import Breadcrumb from 'app/client/components/Breadcrumb';
import ProductDetails from 'app/client/pages/Product/components/ProductDetails';
import ProductLoadingCard from 'app/client/pages/Product/components/ProductLoadingCard';

import { Item } from 'app/client/api';

import { Actions as ItemActions } from 'app/client/pages/Product/reducers/item';


if (!__SSR__) {
  require('./styles.scss');
}


class ProductView extends Component {
  componentDidMount() {
    const id = window.location.href.split('/').pop();
    this.getItem(id);
  }

  getItem = (id) => {
    Item.getItem(id)
      .then((response) => {
        const { item } = response.data;
        this.props.setItem(item);
        this.setPageTitle(item.title);
      });
  }

  setPageTitle = (title) => {
    document.title = `${title} | Test MercadoLibre`;
  }

  render() {
    const { item } = this.props.item;

    if (item) {
      return (
        <div className="view product-view">
          <Header />
          <Breadcrumb categories={item.categories} />
          <ProductDetails product={item} />
        </div>
      );
    }
    return (
      <div className="view product-view">
        <Header />
        <ProductLoadingCard />
      </div>
    );
  }
}

export default connect((state) => state, ItemActions)(ProductView);

export const META = {
  name: 'product-view',
  target: '.product-view',
};
