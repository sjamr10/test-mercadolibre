import React from 'react';


if (!__SSR__) {
  require('./styles.scss');
}


const Item = (props) =>
  (
    <div className="item row">
      <div className="picture-col col-12 col-sm-auto">
        <div className="picture">
          <img src={props.item.picture} alt="Logo de Mercadolibre" />
        </div>
      </div>
      <div className="main col-12 col-sm-5">
        {props.item.title}
      </div>
      <div className="state-name col-3 text-center">
        {props.item.state_name}
      </div>
    </div>
  );
export default Item;
