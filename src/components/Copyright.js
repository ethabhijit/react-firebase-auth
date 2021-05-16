import { Typography, Link } from "@material-ui/core";

const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <Link color="inherit" href="/">
      Abhijit Paul
    </Link> {" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

export default Copyright;