import { Grid, Box, Link as MUILink } from "@mui/material";
import "./navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="navbar">
      <Grid
        className="navbar-container"
        container
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Logo Section */}
        <Grid  display="flex" justifyContent="center" alignItems="center">
          <a href="#" className="logo">
            <FontAwesomeIcon icon={faChartLine} className="logo__icon" />
            <span>ChartMania</span>
          </a>
        </Grid>

        {/* Links Section */}
        <Grid display="flex" justifyContent="space-around" alignItems="center" >
          <Box className="navlinks desktop-menu">
            <NavLink to="/" underline="none" className="navlink">
              Home
            </NavLink>
            <NavLink to="/login" underline="none" className="navlink">
              Login/Registration
            </NavLink>
          </Box>
        </Grid>
      </Grid>
    </nav>
  );
}

export default Navbar;
