import {
  HeroContainer,
  HeroWrapper,
  HeroBackdrop,
  HeroTitle,
  HeroDescription,
} from "./../../styles/styles";

function Hero(props) {
  const { title, cover, description } = props;

  return (
    <HeroContainer>
      <HeroBackdrop src={cover} alt="coverImage" />
      <HeroWrapper>
        <HeroTitle>{title}</HeroTitle>
        <HeroDescription>{description}</HeroDescription>
      </HeroWrapper>
    </HeroContainer>
  );
}

export default Hero;
