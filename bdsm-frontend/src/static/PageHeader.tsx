import {Component} from "react";
import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;


class PageHeader extends Component<any, any> {
    constructor(props : any) {
        super(props);

    }

    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu style={{float: 'left'}} theme="dark" mode="horizontal">
                        <Menu.Item key="Home">Главная</Menu.Item>
                        <Menu.Item key="About">О нас</Menu.Item>
                        <Menu.Item key="How">Инструкция</Menu.Item>
                    </Menu>
                    <Menu style={{float: 'right'}} theme="dark" mode="horizontal">
                        <Menu.Item key="Login">Войти</Menu.Item>
                        <Menu.Item key="Registration">Регистрация</Menu.Item>
                    </Menu>
                </Header>

            </Layout>
        );
    }
}
export default PageHeader