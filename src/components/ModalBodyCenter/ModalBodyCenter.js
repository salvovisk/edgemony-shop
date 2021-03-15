import React from "react";

import { ModalBodyCentered, CloseBtn } from "../../styles/styles";

function ModalBodyCenter({ isOpen, onClose, children }) {
  return (
    <ModalBodyCentered isOpen={isOpen}>
      <CloseBtn type="button" onClick={onClose}>
        ✖️
      </CloseBtn>
      {children}
    </ModalBodyCentered>
  );
}

export default ModalBodyCenter;
