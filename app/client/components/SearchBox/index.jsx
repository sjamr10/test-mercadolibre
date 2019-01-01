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
    const params = this.form.current.elements;
    params.search.value = this.textInput.current.getValue();
    if (params.search.value !== 'undefined') {
      this.form.current.submit();
    } else {
      this.focus();
    }
  }

  render() {
    return (
      <div className="rcc-search-box row">
        <form
          ref={this.form}
          className="d-none"
          action="/items"
          method="get"
        >
          <input type="text" name="search" />
        </form>
        <div className="text col-9 col-lg-11">
          <TextInput
            ref={this.textInput}
            {...this.props}
            enterKey={this.search}
            placeholder="Nunca dejes de buscar"
            validation={[]}
          />
        </div>
        <div className="magnifying-glass col-3 col-lg-1">
          <div className="magnifying-glass" onClick={this.search} >
            <img src="/images/ic_Search2.png" alt="Lupa" />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBox;
