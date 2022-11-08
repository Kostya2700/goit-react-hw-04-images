import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
const modalRoot = document.getElementById('modal-root');
export default function Modal({ onClose, imgSrc, alt, showModal }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleDrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleDrop}>
      <div className="Modal">
        <img className="imgModal" src={imgSrc} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  imgSrc: PropTypes.string.isRequired,
};
