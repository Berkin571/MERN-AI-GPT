import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { Logo, NavigationLink } from "..";

import { useAuth } from "../../context/auth.context";

export const Header = () => {
  const auth = useAuth();

  return (
    <AppBar
      sx={{
        bgcolor: "var(--primary-background)",
        position: "static",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="var(--btn-bg)"
                textColor="var(--light-text-color)"
                to="/chat"
                text="Zum Routenplaner"
              />
              <NavigationLink
                bg="var(--btn-bg)"
                textColor="var(--light-text-color)"
                to="/"
                text="Abmelden"
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="var(--btn-bg)"
                textColor="var(--light-text-color)"
                to="/login"
                text="Login"
              />
              <NavigationLink
                bg="var(--btn-bg)"
                textColor="var(--light-text-color)"
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
