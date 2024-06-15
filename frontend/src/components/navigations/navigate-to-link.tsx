import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

export const NavigationLink = (props: Props) => {
  return (
    <Link
      onClick={props.onClick}
      className="nav-link"
      to={props.to}
      style={{
        background: props.bg,
        color: props.textColor,
        marginRight: "0.5rem",
        borderRadius: "5px",
        padding: "0.25rem 0.75rem",
        textDecoration: "none",
      }}
    >
      {props.text}
    </Link>
  );
};
