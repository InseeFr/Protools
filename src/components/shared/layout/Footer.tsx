import { Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" align="center">
          Version: {process.env.REACT_APP_UI_VERSION}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" align="center">
          © 2024 - INSEE
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
