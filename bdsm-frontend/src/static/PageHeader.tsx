import {Component, useEffect, useState} from "react";
import React from "react";
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {store} from "../store";
import {userData} from "../store/reducers/UserReducer";
import {useActions} from "../hooks/useActions";

const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;


const PageHeader = () => {

    const [state, setState] = useState<userData>({
        username: null,
        email: null,
        avatar: null
    })
    const {userData} = useTypedSelector(state => state.user);
    const {logoutUser} = useActions();

    const handleClick = () => {
        logoutUser();
    }

    useEffect(() => {
        setState(userData);
    }, []);


    if (state.username) { // TODO : simplify
        return (
            <Layout>
                <Header className="header">
                    <div className="logo"/>
                    <Menu style={{float: 'left'}} theme="dark" mode="horizontal">
                        <Menu.Item key="Home"><Link to={"/"}>Главная</Link></Menu.Item>
                        <Menu.Item key="About">О нас</Menu.Item>
                        <Menu.Item key="How">Инструкция</Menu.Item>
                    </Menu>
                    <Menu style={{float: 'right'}} theme="dark" mode="horizontal">
                        <Menu.Item key="Username" onClick={handleClick}>Привет, {state.username}</Menu.Item>
                    </Menu>
                </Header>

            </Layout>
        )
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <Menu style={{float: 'left'}} theme="dark" mode="horizontal">
                    <Menu.Item key="Home"><Link to={"/"}>Главная</Link></Menu.Item>
                    <Menu.Item key="About">О нас</Menu.Item>
                    <Menu.Item key="How">Инструкция</Menu.Item>
                </Menu>
                <Menu style={{float: 'right'}} theme="dark" mode="horizontal">
                    <Menu.Item key="Login"><Link to={"/login"}>Войти</Link></Menu.Item>
                    <Menu.Item key="Registration"><Link to={"/register"}>Регистрация</Link></Menu.Item>
                </Menu>
            </Header>

        </Layout>
    )
}

export default PageHeader