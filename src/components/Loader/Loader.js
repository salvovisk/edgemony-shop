import { LoaderRing, LdsRing, LdsRingDiv } from "./../../styles/styles";

function Loader() {
  return (
    <LoaderRing>
      <LdsRing>
        <LdsRingDiv></LdsRingDiv>
        <div></div>
        <div></div>
        <div></div>
      </LdsRing>
    </LoaderRing>
  );
}

export default Loader;
