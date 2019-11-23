import React from "react";
import { Toolbar, IconButton, Typography } from "@material-ui/core";
import purple from "@material-ui/core/colors/purple";
import useStyles from '../styles/styles';
import MenuIcon from '@material-ui/icons/Menu';

export default function CustomToolbar() {

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const primary = purple[500]; // #F44336
  const classes = useStyles();

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
      <Toolbar>
        <IconButton
          color={primary}
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Academia NewGeneration
        </Typography>
      </Toolbar>
  );
}
