import {
  SidebarContainer,
  SidebarWrapper,
  SidebarHeader,
  SidebarTitle,
  CloseBtn,
} from "./../../styles/styles";

function Sidebar({ isOpen, close, title, children }) {
  return (
    <SidebarContainer isOpen={isOpen}>
      <SidebarWrapper isOpen={isOpen}>
        <SidebarHeader>
          <CloseBtn onClick={close}>✖️</CloseBtn>
          <SidebarTitle>{title}</SidebarTitle>
        </SidebarHeader>
        {children}
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default Sidebar;
