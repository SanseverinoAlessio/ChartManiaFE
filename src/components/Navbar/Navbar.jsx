import { Grid, Box, IconButton } from "@mui/material";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { isMobileViewport } from "../../helpers/deviceHelper";

function Navbar() {
  const [isMobile, setIsMobile] = useState(isMobileViewport());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuList = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Login/Registration",
      route: "/login",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobileViewport = isMobileViewport(window.innerWidth);
      setIsMobile(mobileViewport);

      if (!mobileViewport) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  
  return (
    <nav className="navbar">
      <Grid
        className="navbar-container"
        container
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo Section */}
        <Grid display="flex" justifyContent="center" alignItems="center">
          <a href="#" className="logo">
            <FontAwesomeIcon icon={faChartLine} className="logo__icon" />
            <span>ChartMania</span>
          </a>
        </Grid>

        {isMobile && (
          <Grid>
            <IconButton
              className="hamburger-menu"
              aria-label="toggle mobile menu"
              aria-controls="mobile-nav-menu"
              aria-expanded={isMenuOpen}
              edge="start"
              sx={{ mr: 2 }}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </Grid>
        )}

        {/* Links Section */}
        {!isMobile && (
          <Grid
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Box className="navlinks desktop-menu">
              {menuList.map((el, index) => (
                <NavLink
                  key={index}
                  to={el.route}
                  underline="none"
                  className="navlink"
                >
                  {el.name}
                </NavLink>
              ))}
            </Box>
          </Grid>
        )}
      </Grid>

      {isMobile && (
        <Box
          id="mobile-nav-menu"
          className={`mobile-menu ${isMenuOpen ? "is-open" : ""}`}
          aria-hidden={!isMenuOpen}
        >
          <Box className="mobile-navlinks">
            {menuList.map((el, index) => (
              <NavLink
                key={index}
                to={el.route}
                underline="none"
                className="navlink"
              >
                {el.name}
              </NavLink>
            ))}
          </Box>
        </Box>
      )}
    </nav>
  );
}

export default Navbar;
