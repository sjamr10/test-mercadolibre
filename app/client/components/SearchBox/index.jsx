import React, { Component } from 'react';

import TextInput from '../input-components/Input/TextInput';


if (!__SSR__) {
  require('./styles.scss');
}


class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.form = React.createRef();
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.focus();
  }

  getValue = () => this.textInput.current.getValue();

  setValue = (value) => this.textInput.current.setValue(value);

  focus = () => this.textInput.current.focus();

  search = () => {
    this.form.current.submit();
  }

  render() {
    return (
      <div className="search-box row">
        <form
          ref={this.form}
          className="d-none"
          action="/items?search=zapatillas"
          method="get"
        />
        <div className="text col-10 col-md-11">
          <TextInput
            ref={this.textInput}
            {...this.props}
            enterKey={this.search}
            placeholder="Nunca dejes de buscar"
            validation={[]}
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
