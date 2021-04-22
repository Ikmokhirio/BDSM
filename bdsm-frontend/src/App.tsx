import React, {Component, Suspense} from "react"
import {Route, Switch} from "react-router-dom";
import PageFooter from "./static/PageFooter";
import PageHeader from "./static/PageHeader";
import {Layout, Menu} from "antd";
import LoginPage from "./Forms/LoginPage";
import RegistrationPage from "./Forms/RegistrationPage";

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

class App extends Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div>
                <PageHeader/>

                <Suspense fallback={<div>Loading</div>}>
                    <Layout>
                        <Content style={{padding: '0 24px', minHeight: "86vh", display:"flex", flexDirection:"row",justifyContent: "center"}}>
                            <Switch>
                                <Route exact path={"/"}>

                                    <h1>Some cool stuff</h1>

                                </Route>

                                <Route exact path={"/login"}>

                                    <LoginPage/>

                                </Route>


                                <Route exact path={"/Register"}>

                                    <RegistrationPage/>

                                </Route>
                            </Switch>

                        </Content>


                    </Layout>

                </Suspense>

                <PageFooter/>
            </div>
        )
    }
}

export default App