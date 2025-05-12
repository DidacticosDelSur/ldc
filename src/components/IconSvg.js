// src/components/Icon.jsx
import React from 'react';

const IconSvg = ({ name, className = 'w-6 h-6', ...props }) => {
  return (
    <svg className={className} {...props} aria-hidden="true">
      <use href={`/icons.svg#icon-${name}`} />
    </svg>
  );
};

export default IconSvg;
