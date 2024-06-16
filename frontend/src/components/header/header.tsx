import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { Logo, NavigationLink } from "..";

import { useAuth } from "../../context/auth.context";

export const Header = () => {
  const auth = useAuth();

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#1F2937"
                textColor="#ddd"
                to="/chat"
                text="Zum Routenplaner"
              />
              <NavigationLink
                bg="#5b505b"
                textColor="#ddd"
                to="/"
                text="Abmelden"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#1F2937"
                textColor="#ddd"
                to="/login"
                text="Login"
              />
              <NavigationLink
                bg="#5b505b"
                textColor="#ddd"
                to="/anmelden"
                text="Anmelden"
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
