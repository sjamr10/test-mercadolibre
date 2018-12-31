import React from 'react';

if (!__SSR__) {
  require('./styles.scss');
}


const ProductDetails = (props) => {
  const { product } = props;

  return (
    <div className="product-details">
      <div className="product row">
        <div className="picture-col col-12 col-sm-auto">
          <div className="picture">
            {product ? <img src={product.picture} alt="Foto del producto" /> : ''}
          </div>
        </div>
      </div>
      <div className="description row">
        <div className="picture-col col-12 col-sm-auto" />
      </div>
    </div>
  );
};

export default ProductDetails;
