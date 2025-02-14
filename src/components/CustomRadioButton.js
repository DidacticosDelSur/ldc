import React, { useState } from 'react';
import './CustomRadioButton.scss';  // Importa el archivo CSS para los estilos

// Componente RadioButton Personalizado
function CustomRadioButton({ id, label, value, checked, onChange }) {
  return (
    <div className="custom-radio">
      <input
        type="radio"
        id={id}
        name="customRadio"
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden-radio"
      />
      <label htmlFor={id} className="radio-label">
        <span className={`radio-circle ${checked ? 'checked' : ''}`} />
        {label}
      </label>
    </div>
  );
}

export default CustomRadioButton;
