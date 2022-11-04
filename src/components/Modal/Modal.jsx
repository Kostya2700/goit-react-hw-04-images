import React, { Component } from 'react';
import { createPortal } from 'react-dom';
const modalRoot = document.getElementById('modal-root');
export default class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  componentDidMount() {
    // console.log('did');
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    // console.log('will');
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleDrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleDrop}>
        <div className="Modal">
          <img src={this.props.imgSrc} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
