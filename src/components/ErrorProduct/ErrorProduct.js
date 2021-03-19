import {
  ErrorBanner,
  ErrorBannerMsg,
  ErrorBannerReloadBtn,
  ErrorBannerCloseBtn,
} from "./../../styles/styles";

function ErrorProduct({ message, retry, close }) {
  return (
    <ErrorBanner>
      <ErrorBannerMsg>{message}</ErrorBannerMsg>
      <ErrorBannerReloadBtn type="button" onClick={retry}>
        Riprova
      </ErrorBannerReloadBtn>
      <ErrorBannerCloseBtn type="button" onclick={close}>
        ✖️
      </ErrorBannerCloseBtn>
    </ErrorBanner>
  );
}

export default ErrorProduct;
