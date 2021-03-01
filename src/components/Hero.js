import "./Hero.css";

function Hero(props) {
  const { title, cover, description } = props;

  return (
    <section className="Hero">
      <img src={cover} alt="coverImage" />
      <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
    </section>
  );
}

export default Hero;
