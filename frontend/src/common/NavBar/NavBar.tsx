import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppSelector } from "../store/redux";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const authenticatedUser = useAppSelector(
    (state) => state.authentication.user
  );

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleHistoriqueClick = () => {
    handleMenuClose();
    window.location.href = "/history";
  };

  return (
    <AppBar sx={{ width: "100%" }} position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleHistoriqueClick}>Historique</MenuItem>
        </Menu>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          {`${authenticatedUser?.firstName} ${authenticatedUser?.lastName}`}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
