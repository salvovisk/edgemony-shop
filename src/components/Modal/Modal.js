import React from "react";
import { ModalComponent, ModalOverlay } from "../../styles/styles";

function Modal({ isOpen, onClose, children }) {
  return (
    <ModalComponent isOpen={isOpen}>
      <ModalOverlay isOpen={isOpen} onClick={onClose} />
      {children}
    </ModalComponent>
  );
}

export default Modal;
