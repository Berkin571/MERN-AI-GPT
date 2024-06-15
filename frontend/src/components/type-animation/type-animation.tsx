import { TypeAnimation } from "react-type-animation";

export const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Effiziente LKW-Routenplanung",
        1000,
        "Angetrieben von KI und ChatGPT 🚛",
        2000,
        "Optimieren Sie Ihre Logistik mit uns 📍",
        1500,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};
