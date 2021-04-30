import React, {Component, Suspense, useEffect} from "react"
import {Route, Switch} from "react-router-dom";
import PageFooter from "./static/PageFooter";
import PageHeader from "./static/PageHeader";
import {Layout, Menu, Spin} from "antd";
import LoginPage from "./Forms/LoginPage";
import RegistrationPage from "./Forms/RegistrationPage";

import {useTypedSelector} from "./hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {fetchUser, loginUser, registerUser} from "./store/action-creator/user";

const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;


const App: React.FC<any> = () => {

    const {loading, error, user} = useTypedSelector(state => state.user);
    // const dispatch = useDispatch();
    // // useEffect(() => {
    // //     dispatch(loginUser({
    // //         username: "Test",
    // //         password: "Test"
    // //     }));
    // // }, [])
    //
    // useEffect(() =>{
    //     dispatch(fetchUser());
    // },[])

    if (loading) {
        return <Spin/>
    }
    return (
        <div>
            <PageHeader/>

            <Suspense fallback={<Spin/>}>
                <Layout>
                    <Content style={{
                        padding: '0 24px',
                        minHeight: "86vh",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}>
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

export default App