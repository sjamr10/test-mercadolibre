import React from 'react';

import Item from './Item';

if (!__SSR__) {
  require('./styles.scss');
}


const ItemsList = (props) => {
  const { items } = props;

  return (
    <div className="rcc-items-list">
      {items.map((item) => (<Item key={item.id} item={item} />))}
    </div>
  );
};

export default ItemsList;
