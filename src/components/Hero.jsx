import React from "react";
import hero from "../assets/hero-img.jpg";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import "./HeroStyles.css";

const Hero = ({ targetRef }) => {
  const [text] = useTypewriter({
    words: ["Simplify", "Amplify", "Excelify"],
    loop: {},
  });

	const handleClick = () =>{
		targetRef.current.scrollIntoView({ behavior: "smooth" });
	}

  return (
    <div className="hero">
      <div className="left">
        <h1>
          UNLEASH the <br />
          Power of Excel:
          <div className="text-body">
            <span id="typed">{text}</span>
            <Cursor cursorColor="red" />
          </div>
        </h1>
        <button className="btn-main" onClick={handleClick}>
          Try Now!
        </button>
      </div>
      <div className="right">
        <img src={hero} alt="excel.jpg" />
      </div>
    </div>
  );
};

export default Hero;
