import React from 'react';


if (!__SSR__) {
  require('./styles.scss');
}


const Item = (props) =>
  (
    <div className="item row justify-content-sm-center">
      <div className="col-3 text-center">
        <div className="picture">
          <img src={props.item.picture} alt="Logo de Mercadolibre" />
        </div>
      </div>
      <div className="col-6 text-center">
        {props.item.title}
      </div>
      <div className="col-3 text-center">
        {props.item.state_name}
      </div>
    </div>
  );
export default Item;
