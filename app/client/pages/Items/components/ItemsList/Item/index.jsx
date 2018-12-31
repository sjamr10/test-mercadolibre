import React from 'react';


if (!__SSR__) {
  require('./styles.scss');
}


const Item = (props) =>
  (
    <div className="item row">
      <div className="picture-col col-12 col-sm-auto">
        <div className="picture">
          <img src={props.item.picture} alt="Foto del producto" />
        </div>
      </div>
      <div className="main col-12 col-sm-7 col-md-5">
        <div className="row">
          <div className="price col-sm-auto">
            $ {props.item.price.amount}
          </div>
          <div className="free-shipping-col col-sm-auto">
            <div className="free-shipping">
              <img src="/images/ic_shipping2.png" alt="Logo de envío gratuito" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="title col">
            {props.item.title}
          </div>
        </div>
      </div>
      <div className="state-name col-12 col-md-3 text-center">
        {props.item.state_name}
      </div>
    </div>
  );
export default Item;
