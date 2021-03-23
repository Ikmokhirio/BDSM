import * as React from 'react';
import NavBar from "../../components/NavBar";
import RegisterForm from "../../components/RegisterForm";

export const Register: React.FC = () => {

  return (
    <div>
      <NavBar name={'Регистрация'}/>
      <RegisterForm/>
    </div>
  );

}
