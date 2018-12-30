import React from 'react';
import ErrorBoundary from '../../ErrorBoundary';

if (!__SSR__) {
  require('./styles.scss');
}

const Input = ({
  id,
  className,
  label,
  children,
  hasFocus = false,
  isValid = true,
  isEmpty = true,
  isDirty = false,
  errorMessage,
  disabled,
  obfuscatedValue = false,
  controlDirection = false,
}) => {
  const disabledClass = disabled ? 'is-disabled' : '';
  const errorClass = !isValid ? 'has-error' : 'no-error';
  const iconClass =
    ((isDirty && !isEmpty) || obfuscatedValue) && isValid && !hasFocus ? 'show' : 'hide';
  const controlGroupClass = `${controlDirection ? 'control-row' : ''} control-group`;
  const labelClass = (typeof label === 'string') ? 'label-small bold text-left d-block' : '';

  return (
    <ErrorBoundary>
      <div className={`rcc-control rcc-input ${disabledClass} ${errorClass} ${className}`}>
        <div className="content">
          <div className={controlGroupClass}>
            <If condition={label}>
              <label className={labelClass} htmlFor={id}>{label}</label>
            </If>
            <div className={`input icon-${iconClass}`}>
              <span className={`icon ${iconClass} fa fa-fw fa-lg fa-check aria-hidden success`} />
              {children}
            </div>
          </div>
          <div className={`f1 error-message ${errorClass}`}>{errorMessage}&nbsp;</div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Input;
