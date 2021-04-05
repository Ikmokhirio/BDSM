import * as React from 'react';
import NavBar from "../../components/NavBar";
import LoginForm from '../../components/LoginForm';
import {Box} from "@material-ui/core";

export const Login: React.FC = () => {

  return (
    <div>
      <NavBar name={'Авторизация'}/>
        <Box display='flex' justifyContent="center" >
            <LoginForm/>
        </Box>
    </div>
  );

}
