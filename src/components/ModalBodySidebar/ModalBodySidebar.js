import React from "react";

import {
  ModalBodySidebarSc,
  ModalBodySidebarWrapper,
  ModalBodySidebarHeader,
  CloseBtn,
  ModalBodySidebarTitle,
} from "../../styles/styles";


function ModalBodySidebar({ isOpen, onClose, title, children }) {
  return (
    <ModalBodySidebarSc isOpen={isOpen}>
      <ModalBodySidebarWrapper isOpen={isOpen}>
        <ModalBodySidebarHeader>
          <CloseBtn type="button" onClick={onClose}>
            ✖️
          </CloseBtn>
          <ModalBodySidebarTitle>{title}</ModalBodySidebarTitle>
        </ModalBodySidebarHeader>
        {children}
      </ModalBodySidebarWrapper>
    </ModalBodySidebarSc>
  );
}

export default ModalBodySidebar;
