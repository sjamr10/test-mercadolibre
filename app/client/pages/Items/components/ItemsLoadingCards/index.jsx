import React from 'react';


if (!__SSR__) {
  require('./styles.scss');
}


export const LoadingCard = () => (
  <div className="loading-card header">
    <div className="line" />
    <div className="row">
      <div className="offset-2 col-2">
        <div className="loading-mask block-2" />
      </div>
      <div className="offset-5 col-2">
        <div className="loading-mask block-2" />
      </div>
    </div>
    <div className="row">
      <div className="offset-2 col-4">
        <div className="loading-mask block-3" />
      </div>
      <div className="offset-1 col-2">
        <div className="loading-mask block-2" />
      </div>
    </div>
    <div className="row">
      <div className="offset-2 col-5">
        <div className="loading-mask block-3" />
      </div>
    </div>
    <div className="row blank">
      <div className="offset-2 col-5" />
    </div>
  </div>
);

export const ItemsLoadingCards = () => (
  <div className="rcc-items-loading-cards">
    <div className="col-12">
      <LoadingCard />
    </div>
    <div className="col-12">
      <LoadingCard />
    </div>
    <div className="col-12">
      <LoadingCard />
    </div>
    <div className="col-12">
      <LoadingCard />
    </div>
  </div>
);

export default ItemsLoadingCards;
