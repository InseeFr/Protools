import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { ConfigContext } from "../../../lib/utils/provider/configProvider";

const Footer = () => {
  const config = useContext(ConfigContext);
  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary" align="center">
          Version: {config.version}
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
