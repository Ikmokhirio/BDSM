import React, {Component} from "react";

import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';

const {Header, Content, Sider, Footer} = Layout;
const {SubMenu} = Menu;


class PageFooter extends Component<any, any> {
    constructor(props: any) {
        super(props);

    }

    render() {
        return (
            <Layout>
                <Footer style={{textAlign: 'center'}}>BDSM ©2021 Created by Ikmokhirio</Footer>
            </Layout>
        );
    }
}

export default PageFooter