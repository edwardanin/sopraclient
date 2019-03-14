import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import {RegisterGuard} from "../routeProtectors/RegisterGuard";
import Register from "./AppRouter";
import {OwnProfileGuard} from "../routeProtectors/OwnProfileGuard";
import OwnProfile from "../../profile/OwnProfile";
import {LoginSuccessGuard} from "../routeProtectors/LoginSuccessGuard";
import LoginSuccessRouter from "./LoginSuccessRouter";
import LoginRouter from "./LoginRouter";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class OwnProfileRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <div>
                        <Route
                            path="/game"
                            render={() => (
                                <GameGuard>
                                    <GameRouter base={"/game"}/>
                                </GameGuard>
                            )}
                        />
                        <Route
                            path="/ownprofile"
                            exact
                            render={() => (
                                <OwnProfileGuard>
                                    <OwnProfile />
                                </OwnProfileGuard>
                            )}
                        />
                        <Route path="/" exactrender={() => <Redirect to={"/game"}/>}/>
                        <Route
                            path="/register"
                            exact
                            render={() => (
                                <RegisterGuard>
                                    <Register base={"/register"}/>
                                </RegisterGuard>
                            )}>
                        </Route>
                        <Route
                            path="/login"
                            render={() => (
                                <LoginGuard>
                                    <LoginRouter base={"login"}/>
                                </LoginGuard>
                            )}
                        />
                        <Route
                            path="/loginsuccess"
                            render={() => (
                                <LoginSuccessGuard>
                                    <LoginSuccessRouter base={"loginsuccess"}/>
                                </LoginSuccessGuard>
                            )}
                        />
                    </div>
                </Switch>
            </BrowserRouter>
        );
    }
}

/*
* Don't forget to export your component!
 */
export default OwnProfileRouter;
