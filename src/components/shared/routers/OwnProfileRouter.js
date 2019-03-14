import React from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {GameGuard} from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import {LoginGuard} from "../routeProtectors/LoginGuard";
import AppRouter from "./AppRouter";
import {RegisterGuard} from "../routeProtectors/RegisterGuard";
import {OwnProfileGuard} from "../routeProtectors/OwnProfileGuard";
import OwnProfile from "../../profile/OwnProfile";
import RegisterRouter from "./RegisterRouter";
import {RegisteredUsersGuard} from "../routeProtectors/RegisteredUsersGuard";
import RegisteredUsersRouter from "./RegisteredUsersRouter";
import {RUserProfileGuard} from "../routeProtectors/RUserProfileGuard";
import RUserProfileRouter from "./RUserProfileRouter";

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
                                    <RegisterRouter base={"/register"}/>
                                </RegisterGuard>
                            )}>
                        </Route>
                        <Route
                            path="/login"
                            render={() => (
                                <LoginGuard>
                                    <AppRouter base={"/login"}/>
                                </LoginGuard>
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
