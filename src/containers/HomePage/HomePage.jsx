// HomePage.jsx
import { Box, Container, Typography, Button, Stack, Paper, Grid } from "@mui/material";
import "./home.css";

function HomePage() {
  return (
    <>
      {/* Section 1 */}
      <Box component="section" className="hero">
          <Grid className="wrapper" display="flex" container spacing={4} alignItems="center" flexDirection="row">
            {/* Image LEFT */}
            <Grid item  size={{xs:12,md:6}}>
              <Paper className="hero__imageWrap" elevation={0}>
                <Box
                  component="img"
                  className="hero__image"
                  src="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Charts and analytics"
                />
              </Paper>
            </Grid>

            {/* Text RIGHT */}
            <Grid item size={{xs:12,md:6}}>
              <Typography variant="h3" className="hero__title" gutterBottom>
                Track, compare, and understand your charts.
              </Typography>

              <Typography variant="body1" className="hero__text">
                ChartMania helps you visualize data faster, spot trends earlier, and make
                better decisions with clean, interactive charts.
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: "wrap" }}>
                <Button variant="contained" className="btnPrimary" href="#">
                  Get Started
                </Button>
                <Button variant="outlined" className="btnGhost" href="#">
                  Learn More
                </Button>
              </Stack>
            </Grid>
          </Grid>
      </Box>

      {/* Section 2 */}
      <Box component="section" className="centerBlock">
        <Container maxWidth="md" className="centerBlock__container">
          <Typography variant="h4" className="centerBlock__title" gutterBottom>
            Simple. Fast. Beautiful.
          </Typography>
          <Typography variant="body1" className="centerBlock__text">
            Build dashboards that look great and communicate clearly—without the clutter.
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default HomePage;
