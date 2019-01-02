import React from 'react';
import Formatter from 'app/lib/formatter';

import Button from 'app/client/components/input-components/Button';


if (!__SSR__) {
  require('./styles.scss');
}


const ProductDetails = (props) => {
  const { product } = props;

  if (product) {
    return (
      <div className="rcc-product-details">
        <div className="product row">
          <div className="picture-col col-12 col-lg-8">
            <div className="picture">
              <img src={product.picture} alt="Foto del producto" />
            </div>
          </div>
          <div className="info col-12 col-lg-4">
            <div className="row">
              <div className="condition col">
                {product.condition === 'new' ? 'Nuevo' : 'Usado'} - {product.sold_quantity} vendidos
              </div>
            </div>
            <div className="row">
              <div className="title col">
                {product.title}
              </div>
            </div>
            <div className="row">
              <div className="price col">
                $ {Formatter.thousands(product.price.amount)}
                {product.price.decimals === 0 ? <span className="cents">00</span> : <span className="cents">{product.price.decimals * 100}</span>}
              </div>
            </div>
            <div className="row">
              <div className="button col">
                <Button title="Comprar" />
              </div>
            </div>
          </div>
        </div>
        <div className="description row">
          <div className="description-col col-12">
            <div className="title row">
              <div className="col">
                Drescripción del producto
              </div>
            </div>
            <div className="row">
              <div className="text col-12 col-lg-7">
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="rcc-product-details" />
  );
};

export default ProductDetails;
