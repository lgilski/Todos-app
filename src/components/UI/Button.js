import React from 'react';

import classes from './Button.module.css';

const Button = function (props) {
  const btnType = props.btnType;
  const btnColor = props.btnColor;
  const btnFunctionality = props.btnFunctionality;

  return (
    <button
      onClick={props.onClick}
      className={`${classes.btn} ${classes[`btn-${btnFunctionality}`]} ${
        classes[`btn-${btnType}`]
      } ${classes[`btn-color-${btnColor}  `]}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
