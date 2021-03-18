import {
  ErrorBanner,
  ErrorBannerMsg,
  ErrorBannerReloadBtn,
  ErrorBannerCloseBtn,
} from "./../../styles/styles";

function ErrorProduct({ message, retry }) {
  return (
    <ErrorBanner>
      <ErrorBannerMsg>{message}</ErrorBannerMsg>
      <ErrorBannerReloadBtn type="button" onClick={retry}>
        Riprova
      </ErrorBannerReloadBtn>
    </ErrorBanner>
  );
}

export default ErrorProduct;
