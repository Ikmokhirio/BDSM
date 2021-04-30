import {Component} from "react";
import React from "react";
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";

const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;


const PageHeader = () => (
    <Layout>
        <Header className="header">
            <div className="logo"/>
            <Menu style={{float: 'left'}} theme="dark" mode="horizontal">
                <Menu.Item key="Home">Главная</Menu.Item>
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

export default PageHeader