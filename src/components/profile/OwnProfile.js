import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import Player from "../../views/Player";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import {getDomain} from "../../helpers/getDomain";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null
        };
    }

    logout() {
        alert(localStorage.getItem("username"));
        fetch(`${getDomain()}/users/offline`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: localStorage.getItem("username")
            })
        })
            .then(response => {
                return response.json();
            })
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }

    edit() {

    }

    componentDidMount() {
    }

    render() {
        return (
            <Container>
                <h2>Happy Coding! </h2>
                <div>
                    <Users>
                        <PlayerContainer>
                            <Player/>
                        </PlayerContainer>

                    </Users>
                </div>
                <div>
                    <Button
                        width="100%"
                        onClick={() => {
                            this.edit();
                        }}
                    >
                        Edit Details
                    </Button>
                </div>
                <br/>
                <div>
                    <Button
                        width="100%"
                        onClick={() => {
                            this.view();
                        }}
                    >
                        View Registered Users
                    </Button>
                </div>
                <br/>
                <div>
                    <Button
                        width="100%"
                        onClick={() => {
                            this.logout();
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </Container>
        );
    }
}

export default withRouter(Game);
