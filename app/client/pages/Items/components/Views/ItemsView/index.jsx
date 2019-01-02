import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';

import ItemsLoadingCards from 'app/client/components/ItemsLoadingCards';
import Header from 'app/client/components/Header';
import Breadcrumb from 'app/client/components/Breadcrumb';
import ItemsList from 'app/client/pages/Items/components/ItemsList';

import { Search } from 'app/client/api';

import { Actions as ResultsActions } from 'app/client/pages/Items/reducers/results';


if (!__SSR__) {
  require('./styles.scss');
}


class ItemsView extends Component {
  componentDidMount() {
    const query = qs.parse(window.location.search.replace('?', '')).search || '';
    this.search(query);
  }

  search = (query) => {
    Search.getItems(query)
      .then((response) => {
        const { categories, items } = response.data;
        this.props.setCategories(categories);
        this.props.setItems(items);
      });
  }

  render() {
    const { categories, items } = this.props.results;

    if (categories && items) {
      return (
        <div className="view items-view">
          <Header />
          <Breadcrumb categories={categories} />
          <ItemsList items={items} />
        </div>
      );
    }
    return (
      <div className="view items-view">
        <Header />
        <ItemsLoadingCards />
      </div>
    );
  }
}

export default connect((state) => state, ResultsActions)(ItemsView);

export const META = {
  name: 'items-view',
  target: '.items-view',
};
