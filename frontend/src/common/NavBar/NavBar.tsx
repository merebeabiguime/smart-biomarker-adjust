import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "../store/redux";

export default function NavBar() {
  const authenticatedUser = useAppSelector(
    (state) => state.authentication.user
  );
  return (
    <AppBar sx={{ width: "100%" }} position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {`${authenticatedUser?.firstName} ${authenticatedUser?.lastName}`}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
