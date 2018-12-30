import React, { Component } from 'react';
import TextInput from '../Input/TextInput';

class SearchBox extends Component {
  textInput = React.createRef();

  getValue = () => this.textInput.current.getValue();

  setValue = (value) => this.textInput.current.setValue(value);

  validate = () => this.textInput.current.validate();

  focus = () => this.textInput.current.focus();

  validateText = () => {
    const errorMessage = 'El texto ingresado no es válido';
    const value = this.getValue();
    const isValid = value !== '';
    return { isValid, errorMessage };
  };

  render() {
    const validation = this.props.validation || [];

    return (
      <TextInput
        {...this.props}
        validation={[...validation, this.validateText]}
        ref={this.textInput}
        onInput={this.callInput}
      />
    );
  }
}

export default SearchBox;
