import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

function AutoDismissAlert({ variant = 'success', message = '', duration = 3000, onClose }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose(); // opcional: callback al cerrar
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  if (!show) return null;

  return (
    <Alert variant={variant} dismissible onClose={handleClose}>
      {message}
    </Alert>
  );
}

export default AutoDismissAlert;
