import { Link } from 'react-router-dom';
import * as React from 'react';
import Routes, { RoutesNames } from '../../pages/routes';
import Logo from '../../assets/img/logo.png';
import {AppBar, Button, Typography, Toolbar} from "@material-ui/core";

import s from './NavBar.module.scss';
import {useStyles} from "../../../style";

interface IProps {
  name: string;
}

const NavBar: React.FC<IProps> = (props: IProps) => {
  const classes = useStyles();
  return (
      <AppBar position="sticky">
        <Toolbar className={classes.menu}>
            <img className={classes.logo} src={Logo} alt="website logo" />
          <Link  to={Routes.MAIL}>
            {RoutesNames.MAIL}
          </Link>
          <Link  to={Routes.GROUPS}>
            {RoutesNames.GROUPS}
          </Link>
          <Link  to={Routes.PROFILE}>
            {RoutesNames.PROFILE}
          </Link>
          <Link  to={Routes.ROOT}>
            {RoutesNames.ROOT}
          </Link>
              <Link  to={Routes.LOGIN}>
                {RoutesNames.LOGIN}
              </Link>
              <Link  to={Routes.REGISTER}>
                {RoutesNames.REGISTER}
              </Link>
        </Toolbar>

      </AppBar>

  );
};

export default NavBar;
