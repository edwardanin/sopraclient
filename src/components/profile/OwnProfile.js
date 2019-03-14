import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import {getDomain} from "../../helpers/getDomain";
import User from "../shared/models/User";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 360px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const Text = styled.text`
  color: white;
  font-size: 24px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class OwnProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            id: null,
            username: null,
            birthdate: null,
            token: null
        };
    }

    cancel() {
        this.props.history.push("/game");
    }

    saveEdit() {
        var oldUsername;
        if (this.state.username == null)
            oldUsername = localStorage.getItem("username");
        else
            oldUsername = this.state.username;

        fetch(`${getDomain()}/users/${localStorage.getItem("token")}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: localStorage.getItem("id"),
                username: oldUsername,
                birthdate: this.state.birthdate,
                token: localStorage.getItem("token")
            })
        })
            .then(response => {
                if (response.status === 409) {
                    alert("Username is already taken!");
                }
                return response.json();
            })
            .then(returnedUser => {
                const user = new User(returnedUser);
                // store the token into the local storage
                localStorage.clear();
                localStorage.setItem("id", user.id);
                localStorage.setItem("token", user.token);
                localStorage.setItem("username", user.username);
                localStorage.setItem("creationdate", user.creationDate);
                if (user.birthdate === null) {
                    localStorage.setItem("birthdate", "");
                } else
                    localStorage.setItem("birthdate", user.birthdate);
                localStorage.setItem("status", user.status);
                // user login successfully worked --> navigate to the route /game in the GameRouter
                this.props.history.push(`/game`);
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?" + err.message);
                } /*else {
                        alert(`Something went wrong during the login: ${err.message}`);
                    }*/
            });
    }

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({[key]: value});
    }

    componentDidMount() {
        this.setState({
            editName: localStorage.getItem("username"),
            birth: localStorage.getItem("birthdate")
        })
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Text>Edit Profile</Text>
                        <Label>Username</Label>
                        <InputField
                            type={"text"}
                            defaultValue={this.state.editName}
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
                            }}
                        />
                        <Label>Birthday</Label>
                        <InputField
                            type={"date"}
                            defaultValue={this.state.birth}
                            onChange={e => {
                                this.handleInputChange("birthdate", e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.saveEdit();
                                }}
                            >
                                Save
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.cancel();
                                }}
                            >
                                Cancel
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(OwnProfile);
