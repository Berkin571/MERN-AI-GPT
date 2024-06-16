import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Routing_Logo from "../../assets/logo-2.webp";

export const Logo = () => {
  const logo = Routing_Logo;
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "15px",
        marginTop: "0.5rem",
      }}
    >
      <Link to={"/"}>
        <img
          src={logo}
          alt="Logo"
          width={"75px"}
          height={"75px"}
          className="image-inverted"
          style={{ borderRadius: "10px" }}
        />
      </Link>{" "}
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          mr: "auto",
          fontWeight: "800",
          color: "var(--text-color)",
        }}
      >
        <span style={{ fontSize: "20px" }}>Truck-Routing</span>-GPT
      </Typography>
    </div>
  );
};
