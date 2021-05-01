import React, {Component, useEffect, useState} from "react";
import {Form, Input, Button, Checkbox, Row, Col} from 'antd';
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {loginUserInformation} from "../store/reducers/UserReducer";
import {useActions} from "../hooks/useActions";

const LoginPage = () => {
    const [state, setState] = useState<loginUserInformation>({
        username: "",
        password: ""
    })

    const {loginUser} = useActions();

    const handleClick = (event: any) => {
        event.preventDefault();
        loginUser(state);
    }
    return(
        <div className={"loginPage"}>

            <Row>
                <Col span={12}>
                    <img className={"formImage"} src={'login.png'} alt={"Some cool image"}/>
                </Col>

                <Col span={6}>

                    <Form
                        name="normal_login"
                        className="login-form"
                    >
                        <h1>Добро пожаловать!</h1>

                        <Form.Item
                            name="username"
                            rules={[{required: true, message: 'Введите имя пользователя!'}]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                   placeholder="Имя пользователя"
                                   onChange={(event: any) => {
                                       let value = ""
                                       if (event.target.value != null) {
                                           value = event.target.value;
                                       }
                                       setState({
                                           username: value,
                                           password: state.password
                                       })
                                   }}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Введите пароль!'}]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon"/>}
                                type="password"
                                placeholder="Пароль"
                                onChange={(event: any) => {
                                    let value = ""
                                    if (event.target.value != null) {
                                        value = event.target.value;
                                    }
                                    setState({
                                        username: state.username,
                                        password: value
                                    })
                                }}

                            />
                        </Form.Item>
                        <Form.Item>

                            <a className="login-form-forgot" href="/">
                                Забыли пароль?
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleClick}>
                                Войти
                            </Button>
                            или <Link to={"/register"}>зарегистрироваться</Link>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>


        </div>
    )
}


export default LoginPage;