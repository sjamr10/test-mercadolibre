import React, { Component } from 'react';
import TextInput from '../Input/TextInput';

class SearchBox extends Component {
  textInput = React.createRef();

  getValue = () => this.textInput.current.getValue();

  setValue = (value) => this.textInput.current.setValue(value);

  validate = () => this.textInput.current.validate();

  focus = () => this.textInput.current.focus();

  render() {
    const validation = this.props.validation || [];

    return (
      <TextInput
        {...this.props}
        validation={[...validation]}
        ref={this.textInput}
        onInput={this.callInput}
      />
    );
  }
}

export default SearchBox;
