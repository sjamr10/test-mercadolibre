import React from 'react';
import Formatter from 'app/lib/formatter';


if (!__SSR__) {
  require('./styles.scss');
}


const Item = (props) =>
  (
    <div className="rcc-item row">
      <div className="picture-col col-12 col-sm-auto">
        <div className="picture">
          <img src={props.item.picture} alt="Foto del producto" />
        </div>
      </div>
      <div className="main col-12 col-sm-7 col-md-5">
        <div className="row">
          <div className="price col-sm-auto">
            $ {Formatter.thousands(props.item.price.amount)}
          </div>
          <div className="free-shipping-col col-sm-auto">
            <div className="free-shipping">
              {props.item.free_shipping ? <img src="/images/ic_shipping2.png" alt="Logo de envío gratuito" /> : ''}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="title col-12 col-sm-10">
            {props.item.title}
          </div>
          <div className="condition col-12 col-sm-2">
            {props.item.condition === 'new' ? 'Nuevo' : 'Usado'}
          </div>
        </div>
      </div>
      <div className="state-name col-12 col-md-3 text-center">
        {props.item.state_name}
      </div>
    </div>
  );

export default Item;
