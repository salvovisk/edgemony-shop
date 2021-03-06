import styled from "styled-components";

// APP
export const AppContainer = styled.div`
  font-family: "Lato", sans-serif;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  @media (min-width: 768px) {
    * {
      overflow-x: hidden;
    }
    align-items: center;
    overflow-x: hidden;
  }
`;

// End of App

export const DefaultBlueBtn = styled.button`
  min-width: 100px;
  min-height: 30px;
  height: max-content;
  background-color: #3d70b8;
  border: none;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  font-family: "Lato", sans-serif;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover {
    background: #0053ba;
    cursor: pointer;
  }

  &:active {
    transform: scale(0.9);
  }
  &:focus {
    outline: none;
  }
`;

export const CloseBtn = styled.button`
  margin: 0 auto 0 5px;
  height: 25px;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.35s ease-in-out;

  &:focus {
    outline: none;
    background: transparent;
    border: 1px solid transparent;
  }
  &:active {
    outline: none;
    background: transparent;
  }
  &:hover {
    background: transparent;
    opacity: 1;
    transform: rotate(90deg);
  }
`;

// Main

export const Main = styled.main`
  padding-top: 10vh;
`;

// End of Main

// Header

export const HeaderContainer = styled.header`
  z-index: 3;
  position: relative;
  top: 0;
  width: 100vw;
  height: 10vh;
  background-color: #1d3557;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px 5px rgba(25, 25, 25, 0.4);
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
`;

export const HeaderLogo = styled.img`
  width: 200px;
  height: 57px;
`;

// Header Cart section

export const HeaderPriceCartContainer = styled.span`
  color: white;
  font-size: 1.4rem;
  margin: 0 -60px 0 auto;

  @media (min-width: 768px) {
    position: absolute;
    right: 150px;
  }
`;

export const HeadercartIconSpan = styled.span`
  margin: 0 10px 0 auto;

  @media (min-width: 768px) {
    margin-right: 40px;
  }
`;

export const HeadercartBadge = styled.span`
  position: absolute;
  top: 15px;
  right: 0;
  background-color: #3d70b8;
  border: 1px solid black;
  border-radius: 50px;
  width: 22px;
  height: 22px;
  font-weight: bold;
  color: white;
  text-align: center;

  @media (min-width: 768px) {
    right: 30px;
  }
`;

// End of Header

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(222, 222, 222, 0.85);
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  opacity: 0;

  ${({ isOpen }) => (isOpen ? "opacity:1;" : "")}
`;

export const ModalBodyCentered = styled.div`
  width: 90%;
  max-width: 520px;
  height: 100%;
  max-height: 440px;
  background-color: white;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-in-out, transform 0.333s ease-out;

  @media (min-width: 768px) {
    height: 70vh;
    max-height: 80%;
  }
  ${({ isOpen }) => (isOpen ? "opacity:1; transform:translateY(0)" : "")}
`;

// SideBar Section

export const ModalBodySidebarSc = styled.div`
  align-items: center;
  width: 90%;
  max-width: 520px;
  background-color: white;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transform: translateX(600px);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  z-index: 200;

  @media (min-width: 768px) {
    position: absolute;
    right: 0;
  }
  ${({ isOpen }) => (isOpen ? "opacity:1; transform:translateY(0)" : "")}
`;

export const ModalBodySidebarWrapper = styled.div`
  width: 95vw;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: white;
  min-height: 50vh;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateX(600px);
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  @media (min-width: 768px) {
    max-width: 520px;
    min-height: 70vh;
  }
  ${({ isOpen }) => (isOpen ? "opacity:1;transform:translateX(0) " : "")}
`;

export const ModalBodySidebarHeader = styled.header`
  font-size: 1.5rem;
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  position: fixed;
  top: 0;
  background-color: white;
  margin-bottom: 25px;
`;

export const ModalBodySidebarTitle = styled.h3`
  position: absolute;
`;

// Enb of Sidebar

// Cart

export const CartPage = styled.div`
  min-height: 100vh;
  width: 100vw;
  padding: 10vh 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    max-width: 100vw;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const EmptycartMsg = styled.p`
  font-size: 2rem;
`;

export const CartBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;

  @media (min-width: 768px) {
    width:100vw;
    max-width: 100vw;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }
`;

export const CartFooter = styled.footer`
  height: 6vh;
  max-height: 6vh;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  width: 95vw;
  max-width: 95vw;
  text-align: center;
  border-top: 1px solid rgba(25, 25, 25, 0.4);
  font-size: large;
  font-weight: bold;
  position: fixed;
  bottom: 0;

  @media (min-width: 768px) {
    width: 100vw;
    max-width: 100vw;
    height: 8vh;
    max-height: 8vh;
  }
`;

// Cartproduct

export const ProductInCart = styled.div`
  width: 90%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 2px 5px 2px rgba(10, 25, 25, 0.25);
  margin: 25px;

  @media (min-width: 768px) {
    min-height: 250px;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: nowrap;
    flex-basis: 50%;
    margin: 25px;
  }
`;

export const ProductInCartImg = styled.img`
  margin-top: 18px;
  width: 50%;
  height: 50%;
  object-fit: scale-down;

  @media (min-width: 768px) {
    width: 250px;
    height: 120px;
    margin: 0;
  }
`;

export const CartContent = styled.div`
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    width: 250px;
  }
`;

export const CartContentTitle = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  max-width: 180px;
`;

export const CartQty = styled.span`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

export const RemoveFromCart = styled.button`
  margin: 8px 0 15px 0;
  padding: 0 8px;
  cursor: pointer;
  width: fit-content;
  height: 30px;
  background-color: rgba(206, 49, 49, 0.6);
  border: none;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  font-family: "Lato", sans-serif;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover {
    background-color: rgba(206, 49, 49, 1);
    cursor: pointer;
  }
  &:focus {
    outline: none;
  }
  &:active {
    transform: scale(0.9);
  }
`;

// End of Cartproduct

// Hero

export const HeroContainer = styled.section`
  height: max-content;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100vw;
  margin-top: 25px;
  flex-grow: 0;
  align-self: flex-start;

  @media (min-width: 768px) {
    height: 40vh;
    display: flex;
    flex-direction: row-reverse;
    justify-content: center;
    width: 100vw;
    box-sizing: content-box;
  }
`;

export const HeroWrapper = styled.div`
  @media (min-width: 768px) {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    width: 95vw;
    height: 20vh;
    z-index: 1;
  }
`;

export const HeroBackdrop = styled.img`
  width: 95%;
  height: auto;
  border-radius: 5px;

  @media (min-width: 768px) {
    height: 40vh;
    width: 95vw;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 0 10px 5px rgba(25, 25, 25, 0.2);
  }
`;

export const HeroTitle = styled.h1`
  margin-bottom: 25px;
  font-size: 45px;
  letter-spacing: 1px;
  color: #457b9d;

  @media (min-width: 768px) {
    color: rgb(87, 133, 199);
    font-size: 3rem;
  }
`;

export const HeroDescription = styled.h2`
  display: none;

  @media (min-width: 768px) {
    color: white;
    display: inline-flex;
    font-size: 1.4rem;
  }
`;

// Loader

export const LoaderRing = styled.div`
  height: 40vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LdsRing = styled.div`
  display: inline-flex;
  position: relative;
  width: 200px;
  height: 200px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const LdsRingDiv = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 40%;
  height: 40%;
  margin: 8px;
  border: 4px solid #457b9d;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #457b9d transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// End of Loader

// Products section

// SearchBarSection
export const SearchProductsSect = styled.div`
  width: 100vw;
  height: 10vh;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 768px) {
    margin-top: 25px;
  }
`;

export const NoMatchesMsg = styled.div`
  margin-top: 25px;
  font-size: 2rem;
  text-align: center;
`;

// CategoriesFilter
export const CategoriesFilterSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-basis: 55%;
  align-items: center;
  justify-content: center;
  width: 100vw;
`;

// Products List
export const ProductsList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding: 0px 20px 0px 20px;

  @media (min-width: 768px) {
    width: 100vw;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    overflow-x: hidden;
  }
`;

export const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 350px;
  width: 70vw;
  border-radius: 8px;
  box-shadow: 0px 2px 5px 2px rgba(25, 25, 25, 0.25);
  margin: 25px 55px 25px 55px;
  scroll-snap-align: center;

  @media (min-width: 768px) {
    width: 250px;
    height: 350px;
    margin: 55px 25px 25px 25px;
    transition: all 0.2s ease-in-out;
  }
`;

export const ProductCardImg = styled.img`
  margin-top: 15px;
  height: 180px;
  width: 220px;
  object-fit: scale-down;

  @media (min-width: 768px) {
    height: 50%;
    width: 50%;
    object-fit: scale-down;
  }
`;

export const ProductCardContent = styled.div`
  height: 190px;
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    width: inherit;
    height: 190px;
  }
`;

export const ProductCardTitle = styled.h4`
  text-align: center;
  margin: 25px 25px 15px 25px;

  @media (min-width: 768px) {
    max-height: 3.6rem;
    font-size: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow-y: hidden;
  }
`;

export const PriceAndBtnWrapper = styled.span`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-style: italic;
  margin: 5px 25px 25px 25px;
`;

// End of Products section

// Modal of Products

// export const ModalComponent = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   justify-content: space-evenly;
//   pointer-events: none;

//   ${({ isOpen }) => (isOpen ? "opacity:1;pointer-events:auto" : "")}
// `;

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12vh;
  align-items: center;
  height: 100vh;
  width: 100vw;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 12vh;
  }
`;

export const ProductImg = styled.img`
  height: 250px;
  width: 220px;
  object-fit: scale-down;
  margin-bottom: 25px;

  @media (min-width: 768px) {
    height: 70%;
    width: 70%;
    object-fit: scale-down;
    margin-top: 15px;
  }
`;

export const ProductTextContent = styled.div`
  height: fit-content;
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > h3 {
    ${ProductCardTitle}
    text-align:left;
  }

  @media (min-width: 768px) {
    padding: 0;
    padding: 0 15px;
  }
`;

export const ProductDescription = styled.p`
  margin: 15px 0;
  font-size: 1.2rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

export const ProductPriceAndBtn = styled.span`
  border-top: 1px solid rgba(25, 25, 25, 0.4);
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 5px 0 0;
  margin-bottom: 10px;
  font-size: 1.2rem;
  font-weight: 800;
  font-style: italic;
  width: 100%;
  height: 8vh;

  & > button {
    width: max-content;
    padding: 2px 10px;
    font-size: 1.2rem;
  }
`;

// End Modal of Products

// Error Product

export const ErrorBanner = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: row;
  height: 12vh;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #981212;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0;
`;

export const ErrorBannerMsg = styled.h2`
  margin: 0 auto 0 45px;
  font-size: 1rem;
  color: white;
`;

export const ErrorBannerReloadBtn = styled.button`
  font-size: 1rem;
  margin-right: 15px;
  padding: 10px 20px;
  width: fit-content;
  background-color: white;
  cursor: pointer;
  border-radius: 8px;
  opacity: 1;
  transition: all 0.25s ease-in-out;
  color: black;
  outline: none;
  border: none;
  margin-right: 25px;

  &:focus {
    outline: none;
    border: none;
  }
  &:active {
    outline: none;
  }
  &:focus {
    transform: scale(1.01);
  }
`;

export const ErrorBannerCloseBtn = styled.button`
  background-color: white;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.5rem;
  margin-right: 25px;
  justify-content: center;
  align-items: center;
  text-align: center;
  outline: none;
  border: none;

  &:focus {
    outline: none;
    border: none;
  }
  &:active {
    outline: none;
  }
  &:focus {
    transform: scale(1.01);
  }
`;

// 404 Page

export const NotFound404 = styled.div`
  background-color: rgb(29, 53, 87);
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10vh;
`;

export const NotFoundBody = styled.div`
  background-color: white;
  width: 90vw;
  height: 60vh;
  border-radius: 5px;
  box-shadow: 0px 2px 5px 2px rgba(25, 25, 25, 0.25);
  padding: 0 10px;

  @media (min-width: 768px) {
    width: 50vw;
  }
`;

export const NotFoundHeader = styled.span`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 3rem;
  padding-top: 10vh;
  color: #1d3557;
  font-family: "Poppins", sans-serif;
  font-weight: 800;
`;

export const NotFoundMsg = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
`;
