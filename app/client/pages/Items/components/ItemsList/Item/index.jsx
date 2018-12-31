import React from 'react';


if (!__SSR__) {
  require('./styles.scss');
}


const Item = (props) =>
  (
    <div className="item row justify-content-sm-center">
      <div className="col-12 text-center">
        {props.item.title}
      </div>
    </div>
  );
export default Item;
