import React, { useContext } from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';



const Navigation = (props) => {

  const auth_context = useContext(AuthContext);

  console.log(auth_context);

          return(
          <nav className={classes.nav}>
            <ul>
              {auth_context.isLoggedIn && (
                <li>
                  <a href="/">Users</a>
                </li>
              )}
              {auth_context.isLoggedIn && (
                <li>
                  <a href="/">Admin</a>
                </li>
              )}
              {auth_context.isLoggedIn && (
                <li>
                  <button onClick={auth_context.onLogout}>Logout</button>
                </li>
              )}
            </ul>
          </nav>
        );
  };

export default Navigation;
