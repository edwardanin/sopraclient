import React, { Component } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./views/Header";
import AppRouter from "./components/Routers/AppRouter";
import { AppGuard } from "./components/Guards/AppGuard";
import { LoginGuard } from "./components/Guards/LoginGuard";
import Login from "./components/Login";

const Body = styled.div``;

class App extends Component {
  render() {
    return (
      <div>
        <Header background={"rgba(26, 113, 177, 1)"} />
        <BrowserRouter>
          <Switch>
            <Body>
              <Route
                path="/app"
                render={() => (
                  <AppGuard isAuth={false}>
                    <AppRouter base={"/app"} />{" "}
                  </AppGuard>
                )}
              />
              <Route
                path="/login"
                exact
                render={() => (
                  <LoginGuard isAuth={false}>
                    <Login />
                  </LoginGuard>
                )}
              />

              <Route
                path="/"
                exact
                render={() => <div>asfjosfjoasjofasjofjaosf</div>}
              />
            </Body>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
