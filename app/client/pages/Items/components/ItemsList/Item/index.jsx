import React, { Component } from 'react';
import Formatter from 'app/lib/formatter';


if (!__SSR__) {
  require('./styles.scss');
}


class Item extends Component {
  constructor(props) {
    super(props);

    this.form = React.createRef();
  }

  goToProductPage = () => {
    this.form.current.submit();
  }

  render() {
    return (
      <div className="rcc-item row" onClick={this.goToProductPage}>
        <form
          ref={this.form}
          className="d-none"
          action={`/items/${this.props.item.id}`}
          method="get"
        />
        <div className="picture-col col-12 col-sm-auto">
          <div className="picture">
            <img src={this.props.item.picture} alt="Foto del producto" />
          </div>
        </div>
        <div className="main col-12 col-sm-7 col-md-5">
          <div className="row">
            <div className="price col-sm-auto">
            $ {Formatter.thousands(this.props.item.price.amount)}
            </div>
            <div className="free-shipping-col col-sm-auto">
              <div className="free-shipping">
                {this.props.item.free_shipping ? <img src="/images/ic_shipping2.png" alt="Logo de envío gratuito" /> : ''}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="title col-12 col-sm-10">
              {this.props.item.title}
            </div>
            <div className="condition col-12 col-sm-2">
              {this.props.item.condition === 'new' ? 'Nuevo' : 'Usado'}
            </div>
          </div>
        </div>
        <div className="state-name col-12 col-md-3 text-center">
          {this.props.item.state_name}
        </div>
      </div>
    );
  }
}

export default Item;
