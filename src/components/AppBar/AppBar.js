import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import styles from "./AppBar.module.css";
import { List, ListItemButton, ListItemText, Menu } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { MyCoinsContext } from "../../context/MyCoinsContext";

function ResponsiveAppBar() {
  const { loggedInUser, setLoggedInUser, clearAll } = React.useContext(MyCoinsContext);
  const [user, setUser] = React.useState(loggedInUser);

  React.useEffect(() => {
    setUser(loggedInUser);
  }, [loggedInUser]);

  const logout = () => {
    clearAll();
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{background: "#331D2C"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/">
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CryptoApp
            </Typography>
          </NavLink>
          {/* MOBILE */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {user && (
              <>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  <List>
                    <ListItemButton onClick={handleCloseNavMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "#000" }}
                        to="platforms"
                      >
                        <ListItemText primary="Asset Platforms" />
                      </Link>
                    </ListItemButton>

                    <ListItemButton onClick={handleCloseNavMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "#000" }}
                        to="coins"
                      >
                        <ListItemText primary="Cryptocurrencies" />
                      </Link>
                    </ListItemButton>

                    <ListItemButton onClick={handleCloseNavMenu}>
                      <Link
                        style={{ textDecoration: "none", color: "#000" }}
                        to="mycoins"
                      >
                        <ListItemText primary="My Coins" />
                      </Link>
                    </ListItemButton>
                  </List>
                </Menu>
              </>
            )}
          </Box>
          <NavLink to="coins">
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CryptoApp
            </Typography>
          </NavLink>
          {user && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <NavLink to="platforms">
                <Button className={styles.links} sx={{ my: 2, color: "white", display: "block" }}>
                  Asset Platforms
                </Button>
              </NavLink>

              <NavLink to="/coins">
                <Button className={styles.links} sx={{ my: 2, color: "white", display: "block" }}>
                  Cryptocurrencies
                </Button>
              </NavLink>

              <NavLink to="mycoins">
                <Button className={styles.links} sx={{ my: 2, color: "white", display: "block" }}>
                  My Coins
                </Button>
              </NavLink>
            </Box>
          )}

          {!user && (
            <>
            <NavLink to="access">
            <Button className={`${styles.btn} ${styles.link}`}>Register</Button>
          </NavLink>
            <NavLink to="?mode=login">
              <Button className={`${styles.btn} ${styles.link}`}>Login</Button>
            </NavLink>
            </>
          )}
          {user && <span className={styles.welcome}>Welcome {user}</span>}
          {user && (
            <NavLink to="/?mode=login">
              <Button className={styles.btn} onClick={logout}>
                Logout
              </Button>
            </NavLink>
          )}

          <Box sx={{ flexGrow: 0 }}>{/* User Menu */}</Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
