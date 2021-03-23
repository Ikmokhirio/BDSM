import * as React from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import s from './RegisterForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLogin, changePassword, changeEmail, registerUser } from './@slice';

const RegisterForm: React.FC  = () => {
  const login = useAppSelector(state => state.registerForm.login);
  const password = useAppSelector(state => state.registerForm.password);
  const email = useAppSelector(state => state.registerForm.email);
  const status = useAppSelector(state => state.registerForm.loading);

  const dispatch = useAppDispatch();

  return (
    <div className={s.root}>
      <div>{status}</div>\
        <InputGroup id="email" placeholder="email"
                    value={email}
                    onChange={(event) => dispatch(changeEmail(event.target.value))}/>
      <InputGroup id="username" placeholder="username"
                  value={login}
                  onChange={(event) => dispatch(changeLogin(event.target.value))}/>
      <InputGroup id="password" placeholder="password"
                  value={password}
                  onChange={(event) => dispatch(changePassword(event.target.value))}/>
      <Button icon="send-to" intent="success" text="Войти" onClick={
        () => dispatch(registerUser({email, login, password}))
      }/>
    </div>
  )
}

export default RegisterForm;
