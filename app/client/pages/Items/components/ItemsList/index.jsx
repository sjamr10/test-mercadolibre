import React from 'react';


if (!__SSR__) {
  require('./styles.scss');
}


const ItemsList = () => (
  <div className="items-list">
    <div className="row justify-content-sm-center">
      <div className="logo col-12 col-sm-1">
        Items
      </div>
    </div>
  </div>
);

export default ItemsList;
