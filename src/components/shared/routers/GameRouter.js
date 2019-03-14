import React from "react";
import styled from "styled-components";
import {Redirect, Route} from "react-router-dom";
import Game from "../../game/Game";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import {OwnProfileGuard} from "../routeProtectors/OwnProfileGuard";
import OwnProfileRouter from "./OwnProfileRouter";
import {RegisteredUsersGuard} from "../routeProtectors/RegisteredUsersGuard";
import RegisteredUsersRouter from "./RegisteredUsersRouter";
import {RUserProfileGuard} from "../routeProtectors/RUserProfileGuard";
import RUserProfileRouter from "./RUserProfileRouter";
import {RegisterGuard} from "../routeProtectors/RegisterGuard";
import RegisterRouter from "./RegisterRouter";
import AppRouter from "./AppRouter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
    render() {
        /**
         * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
         */
        return (
            <Container>
                <Route
                    exact
                    path={`${this.props.base}/dashboard`}
                    render={() => <Game/>}
                />
                <Route
                    exact
                    path={`${this.props.base}`}
                    render={() => <Redirect to={`${this.props.base}/dashboard`}/>}
                />
                <Route
                    path="/login"
                    render={() => (
                        <LoginGuard>
                            <AppRouter base={"/login"}/>
                        </LoginGuard>
                    )}
                />
                <Route
                    path="/ownprofile"
                    render={() => (
                        <OwnProfileGuard>
                            <OwnProfileRouter base={"/ownprofile"}/>
                        </OwnProfileGuard>
                    )}
                />
                <Route
                    path="/registeredusers"
                    render={() => (
                        <RegisteredUsersGuard>
                            <RegisteredUsersRouter base={"/registeredusers"}/>
                        </RegisteredUsersGuard>
                    )}
                />
                <Route
                    path="/ruserprofile"
                    render={() => (
                        <RUserProfileGuard>
                            <RUserProfileRouter base={"/ruserprofile"}/>
                        </RUserProfileGuard>
                    )}
                />
                <Route
                    path="/register"
                    render={() => (
                        <RegisterGuard>
                            <RegisterRouter base={"/register"}/>
                        </RegisterGuard>
                    )}
                />
            </Container>
        );
    }
}

/*
* Don't forget to export your component!
 */
export default GameRouter;
