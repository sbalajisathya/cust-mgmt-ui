import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footerWrapper: {
    backgroundColor: "#565656",
    padding: "10px",
    color: "#fff",
    fontSize: "14px",
  },
}));

const Footer = () => {
  const classes = useStyles();
  return <div className={classes.footerWrapper}>CustomerUI-0.0.1@2024</div>;
};

export default Footer;
