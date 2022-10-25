import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { getToken } from "../../Hooks/useToken";
import { connect } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  Grid,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  Badge,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import axiosClient from "../axios";
import { loginReducer } from "../redux/auth/actions";
import { cartReducer } from "../redux/cart/actions";
import "./Component.css";

const Header = (props) => {
  const navigation = useNavigate();
  const [navPages, setNavPages] = useState(["Products"]);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [cartData, setCartData] = useState([]);
  const settings = ["Profile", "Dashboard", "Logout"];

  useEffect(() => {
    if (props.auth) {
      props.auth.userRoll === "admin" && setNavPages([...navPages, "Admin"]);
      getCartData(props.auth);
    }
  }, []);

  useEffect(() => {
    if (props.cartDetails.length) {
      setCartData([...props.cartDetails]);
    }
  }, [props.cartDetails]);

  const getCartData = async (user) => {
    axiosClient
      .get("/cart-items")
      .then((res) => {
        setCartData([...res.data]);
        props.cartReducer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      localStorage.removeItem("token");
      props.loginReducer({});
      navigation("/");
    }
  };

  const cartOpen = () => {
    navigation("/dashboard/cart");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              +
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navPages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    page === "Products" && navigation("/dashboard/product");
                    page === "Admin" && navigation("/dashboard/admin");
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navPages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();

                  page === "Products" && navigation("/dashboard/product");
                  page === "Admin" && navigation("/dashboard/admin");
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={cartOpen} sx={{ p: 0, mr: 5 }}>
              <Badge badgeContent={cartData.length} color="success">
                <ShoppingBasketIcon color="action" />
              </Badge>
            </IconButton>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="/home/pushkar/Documents/Projects/test-project/practical-project/client/public/logo192.png"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth.data,
    cartDetails: state.cartDetails.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginReducer: (data) => dispatch(loginReducer(data)),
    cartReducer: (data) => dispatch(cartReducer(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
