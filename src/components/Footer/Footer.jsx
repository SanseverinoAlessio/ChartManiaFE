import "./footer.css";
import { Grid, Box, Link as MUILink } from "@mui/material";

function Footer() {
  return (
    <footer>
      <Grid
        className="navbar-container"
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid display="flex" justifyContent="center" alignItems="center">
            Developed By <strong style={{marginLeft:'5px'}}>Alessio Sanseverino</strong>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
