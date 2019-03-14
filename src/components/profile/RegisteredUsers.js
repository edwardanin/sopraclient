import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import {getDomain} from "../../helpers/getDomain";
import {Spinner} from "../../views/design/Spinner";
//import AllUsers from "../../views/AllUsers";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
  font-weight: lighter;
  margin-left: 5px;
`;

/*const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: lighter;
  margin-left: 5px;
`;*/

class RegisteredUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
    }

    back() {
        this.props.history.push("/game");
    }

    showuserdetails(userId, uName, stat, create, birth) {
        localStorage.setItem("otheruserid", userId);
        localStorage.setItem("otherusername", uName);
        localStorage.setItem("otherstatus", stat);
        localStorage.setItem("othercreate", create);
        localStorage.setItem("otherbirth", birth);
        this.props.history.push("/ruserprofile");
    }

    componentDidMount() {
        fetch(`${getDomain()}/users`,
            {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async users => {
                // delays continuous execution of an async operation for 0.8 seconds.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 800));

                this.setState({users});
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
    }

    render() {
        return (
            <Container>
                <h2>Happy Coding! </h2>
                <p>Get all users from secure end point:</p>
                <p>USERNAME</p>
                {!this.state.users ? (
                    <Spinner/>
                ) : (
                    <Container>
                        {this.state.users.map(user => {
                            return (
                                <Users key={user.id} onClick={() => {
                                    this.showuserdetails(user.id, user.username, user.status, user.creationDate, user.birthdate)
                                }}>
                                    {user.username}
                                </Users>
                            );
                        })}

                        <Button
                            width="20%"
                            onClick={() => {
                                this.back();
                            }}
                        >
                            Back
                        </Button>
                    </Container>
                )}
            </Container>
        );
    }
}

export default withRouter(RegisteredUsers);
