import React from 'react';

import './scss/Spinner.scss';

const Spinner = (props) => {
  return (
    <div
      className="spinner"
      style={{
        borderWidth: props.strokeWidth,
        height: props.width,
        width: props.width
      }}
    />
  );
};

export default Spinner;
