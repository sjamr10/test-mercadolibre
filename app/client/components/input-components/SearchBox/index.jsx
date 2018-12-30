import React, { Component } from 'react';

import TextInput from '../Input/TextInput';


if (!__SSR__) {
  require('./styles.scss');
}


class SearchBox extends Component {
  textInput = React.createRef();

  getValue = () => this.textInput.current.getValue();

  setValue = (value) => this.textInput.current.setValue(value);

  validate = () => this.textInput.current.validate();

  focus = () => this.textInput.current.focus();

  render() {
    const validation = this.props.validation || [];

    return (
      <div className="search-box row">
        <div className="text col-10 col-md-11">
          <TextInput
            {...this.props}
            placeholder="Nunca dejes de buscar"
            validation={[...validation]}
            ref={this.textInput}
            onInput={this.callInput}
          />
        </div>
        <div className="magnifying-glass col-2 col-md-1">
          <div className="magnifying-glass">
            <img src="/images/ic_Search2.png" alt="Lupa" />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBox;
