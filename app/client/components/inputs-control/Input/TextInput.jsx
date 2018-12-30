import React, { Component } from 'react';
import validator from 'app/lib/validator';
import { EventEmitter } from 'fbemitter';
import Input from './Input';

class TextInput extends Component {
  static defaultProps = {
    id: '',
    type: 'text',
    disabled: false,
    required: false,
    enter: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      hasFocus: false,
      isValid: true,
      isEmpty: true,
      isDirty: false,
      isTouched: false,
      error: this.props.error,
      errorMessage: this.props.errorMessage,
    };
  }

  componentWillMount() {
    this.eventProps = Object.keys(this.props).reduce(
      (accumulator, value) =>
        (/^on/.test(value)
          ? { ...accumulator, [value]: this.props[value] }
          : accumulator),
      {},
    );

    const {
      id,
      type,
      value,
      disabled,
      required,
      maxlength,
      properties,
      placeholder,
    } = { ...this.props };

    this.id = id;
    this.type = type;
    this.value = value;
    this.disabled = disabled;
    this.required = required;
    this.maxlength = maxlength;
    this.properties = properties;
    this.placeholder = placeholder;
  }

  componentDidMount() {
    this.input.addEventListener('focus', this.focusEvent);
    this.input.addEventListener('blur', this.blurEvent);
    this.input.addEventListener('input', this.inputEvent);
    this.input.addEventListener('keydown', this.checkEnterKey);
    // if the control is required,it is subscribed the corresponding validation
    this.validations = [...this.props.validation];
    if (this.props.required) this.validations.push(this.validateRequired);
  }

  componentWillReceiveProps({
    error = this.state.error,
    errorMessage = this.state.errorMessage,
  }) {
    if (
      error !== this.state.error ||
      errorMessage !== this.state.errorMessage
    ) {
      this.setState({ error, errorMessage });
    }
  }

  validations = [];
  emitter = new EventEmitter();

  checkEnterKey = (evt) => {
    if (evt.key === 'Enter') {
      const fn = this.props.enterKey;
      if (typeof fn === 'function') {
        this.input.blur();
        fn();
      }
    }
  };

  focusEvent = () => {
    this.setState({
      hasFocus: true,
      isValid: true,
      isTouched: true,
    });
    this.focusFormat();
  };

  blurEvent = () => {
    this.setState({
      hasFocus: false,
    });
    if (this.isDirty() && this.validate()) {
      this.blurFormat();
    }
  };

  inputEvent = () => {
    this.setValue(this.input.value);
    this.inputFormat();
    this.setState({ isEmpty: this.isEmpty(), isDirty: true });
    this.emitter.emit('change', this.getValue());
    if (this.props.notifyChange) {
      this.props.notifyChange(this.getValue());
    }
  };

  inputFormat = () => {
    if (this.props.inputFormat) this.props.inputFormat();
  };

  focusFormat = () => {
    this.input.value = validator.isNil(this.value) ? '' : this.value;
  };

  blurFormat = () => {
    if (this.props.blurFormat) this.props.blurFormat();
  };

  validate = (statefull = true) =>
    this.validations.every((validation) => {
      const v = validation();
      if (statefull) {
        this.setState(v);
      }
      return v.isValid;
    });

  validateRequired = () => {
    const errorMessage = 'Campo requerido';
    const value = this.getValue();
    const isValid =
      (this.props.obfuscatedValue &&
        (validator.isNil(value) || validator.isEmpty(value))) ||
      (!validator.isNil(value) && value !== '');
    return { isValid, errorMessage };
  };

  isEmpty = () => validator.isEmpty(this.input.value);

  isRequired = () => this.props.required;

  isDirty = () => this.state.isDirty;

  isTouched = () => this.state.isTouched;

  getValue = () => this.value;

  setValue = (value) => {
    this.value = value;
    this.input.value = value;
    this.setState({ isEmpty: this.isEmpty(), isDirty: true });
  };

  getEmitter = () => this.emitter;

  getInput = () => this.input;

  focus = () => this.input.focus();

  setFormattedValue = (formattedValue) => {
    this.input.value = formattedValue;
    this.formattedValue = formattedValue;
  };

  render() {
    return (
      <Input {...this.props} {...this.state}>
        <input
          ref={(input) => {
            this.input = input;
          }}
          type={this.type || 'text'}
          {...this.eventProps}
          className="input-control"
          id={this.id}
          maxLength={this.maxlength}
          defaultValue={this.value}
          disabled={this.disabled}
          required={this.required}
          placeholder={this.placeholder}
          {...this.properties}
        />
      </Input>
    );
  }
}

export default TextInput;
