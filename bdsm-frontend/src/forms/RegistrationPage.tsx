import React, {Component, useState} from "react";
import {AutoComplete, Avatar, Button, Col, Form, Input, Row, Upload} from "antd";
import {LockOutlined, UserOutlined, MailOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import AvatarForm from "./AvatarForm";
import {registerUserInformation} from "../store/reducers/UserReducer";
import {useActions} from "../hooks/useActions";

const {Option} = AutoComplete;


const RegistrationPage = () => {
    const [state, setState] = useState<registerUserInformation>({
        username: "",
        password: "",
        email: ""
    })

    const {registerUser} = useActions();

    const handleClick = (event: any) => {
        event.preventDefault();
        registerUser(state);
    }

    return (


        <div className={"registrationPage"}>

            <Row>
                <Col span={12}>
                    <img className={"formImage"} src={'register.png'} alt={"Some cool image"}/>
                </Col>

                <Col span={6}>

                    <Form
                        name="register"
                        className="register-form"
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
                                           password: state.password,
                                           email: state.email
                                       })
                                   }}
                            />
                        </Form.Item>


                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'Некорректный email!',
                                },
                                {
                                    required: true,
                                    message: 'Введите email!',
                                },
                            ]}
                        >

                            <Input prefix={<MailOutlined/>}
                                   placeholder="Почта"
                                   onChange={(event: any) => {
                                       let value = ""
                                       if (event.target.value != null) {
                                           value = event.target.value;
                                       }
                                       setState({
                                           username: state.username,
                                           password: state.password,
                                           email: value
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
                                        password: value,
                                        email: state.email
                                    })
                                }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="register-form-button"
                                    onClick={handleClick}>
                                Зарегистрироваться
                            </Button>
                            <Link to={"/login"}>уже есть аккаунт?</Link>
                        </Form.Item>

                    </Form>
                </Col>
            </Row>


        </div>
    )
}


export default RegistrationPage;