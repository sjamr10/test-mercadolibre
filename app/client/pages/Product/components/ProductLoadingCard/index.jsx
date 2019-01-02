import React from 'react';


if (!__SSR__) {
  require('./styles.scss');
}


export const LoadingCard = () => (
  <div className="loading-card header">
    <div className="line" />
    <div className="row">
      <div className="offset-9 col-2">
        <div className="loading-mask block-2" />
      </div>
    </div>
    <div className="row">
      <div className="offset-9 col-2">
        <div className="loading-mask block-2" />
      </div>
    </div>
    <div className="row">
      <div className="offset-9 col-2">
        <div className="loading-mask block-2" />
      </div>
    </div>
    <div className="row">
      <div className="offset-9 col-2">
        <div className="loading-mask block-2" />
      </div>
    </div>
    <div className="row blank" />
    <div className="row">
      <div className="offset-2 col-3">
        <div className="loading-mask block-2" />
      </div>
    </div>
    <div className="row">
      <div className="offset-2 col-5">
        <div className="loading-mask block-3" />
      </div>
    </div>
    <div className="row">
      <div className="offset-2 col-5">
        <div className="loading-mask block-3" />
      </div>
    </div>
    <div className="row">
      <div className="offset-2 col-5">
        <div className="loading-mask block-3" />
      </div>
    </div>
    <div className="row">
      <div className="offset-2 col-5">
        <div className="loading-mask block-3" />
      </div>
    </div>
  </div>
);

export const ProductLoadingCard = () => (
  <div className="rcc-product-loading-card">
    <div className="col-12">
      <LoadingCard />
    </div>
  </div>
);

export default ProductLoadingCard;
