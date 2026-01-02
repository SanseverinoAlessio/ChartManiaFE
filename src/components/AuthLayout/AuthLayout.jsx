import { Box, Container, Typography, Paper, Grid } from "@mui/material";
import "./auth.css";

function AuthLayout({ title, subtitle, imageSrc, imageAlt = "Auth image", children }) {
  return (
    <Box  className="authPage">
      <Paper className="authCard" elevation={0}>
        <Grid container>
          {/* Left image */}
          <Grid size={{ xs: 12, md: 6 }} className="authImageCol">
            <Box
              component="img"
              className="authImage"
              src={imageSrc}
              alt={imageAlt}
            />
          </Grid>

          {/* Right form */}
          <Grid size={{ xs: 12, md: 6 }} className="authFormCol">
            <Box className="authHeader">
              <Typography variant="h4" className="authTitle">
                {title}
              </Typography>
              {subtitle ? (
                <Typography variant="body2" className="authSubtitle">
                  {subtitle}
                </Typography>
              ) : null}
            </Box>

            <Box className="authFormWrap">{children}</Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default AuthLayout;
