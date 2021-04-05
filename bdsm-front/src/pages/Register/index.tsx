import * as React from 'react';
import NavBar from "../../components/NavBar";
import RegisterForm from "../../components/RegisterForm";
import LoginForm from "../../components/LoginForm";
import {Box} from "@material-ui/core";

export const Register: React.FC = () => {

  return (
    <div>
      <NavBar name={'Регистрация'}/>
        <Box display='flex' justifyContent="center" >
            <RegisterForm/>
        </Box>
    </div>
  );

}
