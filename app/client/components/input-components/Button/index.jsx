import React, { Component } from 'react';

if (!__SSR__) {
  require('./styles.scss');
}

const Button = (props) => {
  const {
    id, disabled, loading, title, loadingTitle, style, className = '',
  } = props;
  const disabledClass = disabled ? 'is-disabled' : '';
  const loadingClass = loading ? 'is-loading' : '';
  const loadingText = loadingTitle || title;
  const displayText = loading ? loadingText : title;
  const isDisabled = disabled || loading;

  const eventProps = Object.keys(props).reduce(
    (accumulator, value) =>
      (/^on/.test(value) ? { ...accumulator, [value]: props[value] } : accumulator),
    {},
  );

  return (
    <button
      {...eventProps}
      id={id}
      style={style}
      className={`sf pointer f3 p-10-top p-10-bottom p-15-left p15-right br-pill rcc-control rcc-button ${disabledClass} ${loadingClass} ${className}`}
      disabled={isDisabled}
    >
      {displayText}
      <If condition={loading}>
        <div>
          <svg
            className="spinner"
            width="25px"
            height="25px"
            viewBox="0 0 66 66"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="circle"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              cx="33"
              cy="33"
              r="30"
            />
          </svg>
        </div>
      </If>
    </button>
  );
};

export default Button;
