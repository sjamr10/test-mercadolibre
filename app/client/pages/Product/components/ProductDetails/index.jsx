import React from 'react';

if (!__SSR__) {
  require('./styles.scss');
}


const ProductDetails = (props) => {
  const { product } = props;

  if (product) {
    return (
      <div className="product-details">
        <div className="product row">
          <div className="picture-col col-8">
            <div className="picture">
              <img src={product.picture} alt="Foto del producto" />
            </div>
          </div>
          <div className="info col-4">
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
                $ {product.price.amount}
              </div>
            </div>
            <div className="row">
              <div className="button col">
                Button
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
              <div className="text col-7">
                {product.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="product-details" />
  );
};

export default ProductDetails;
