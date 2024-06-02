import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

export const Header = () => {
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}></Toolbar>
    </AppBar>
  );
};
