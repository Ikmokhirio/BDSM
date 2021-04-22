import React, {Component} from "react";
import {Form, Input, Button, Checkbox, Row, Col} from 'antd';
import {UserOutlined, LockOutlined} from "@ant-design/icons";

class LoginPage extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className={"loginPage"}>

                <Row>
                    <Col span={12}>
                        <img className={"loginImage"} src={'login.png'}/>
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
                                       placeholder="Имя пользователя"/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{required: true, message: 'Введите пароль!'}]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="Пароль"

                                />
                            </Form.Item>
                            <Form.Item>

                                <a className="login-form-forgot" href="">
                                    Забыли пароль?
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Войти
                                </Button>
                                или <a href="">зарегистрироваться</a>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>


            </div>
        )
    }

}

export default LoginPage;