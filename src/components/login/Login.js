import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import User from "../shared/models/User";
import {withRouter} from "react-router-dom";
import {Button} from "../../views/design/Button";

const FormContainer = styled.div`
  //margin-top: 1em;
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
  height: 460px;
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
  text-align: center;
`;

const Success = styled.text`
  color: red;
  text-align: center;
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

/**
 * Classes in React allow you to have an internal state within the class and to have the React life-cycle for your component.
 * You should have a class (instead of a functional component) when:
 * - You need an internal state that cannot be achieved via props from other parent components
 * - You fetch data from the server (e.g., in componentDidMount())
 * - You want to access the DOM via Refs
 * https://reactjs.org/docs/react-component.html
 * @Class
 */
class Login extends React.Component {
    /**
     * If you don’t initialize the state and you don’t bind methods, you don’t need to implement a constructor for your React component.
     * The constructor for a React component is called before it is mounted (rendered).
     * In this case the initial state is defined in the constructor. The state is a JS object containing two fields: name and username
     * These fields are then handled in the onChange() methods in the resp. InputFields
     */

    constructor() {
        super();
        this.state = {
            username: null,
            password: null
        };
    }

    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end and its token is stored in the localStorage.
     */
    login() {
        localStorage.removeItem("register");
        if (this.state.username.trim() === "") {
            alert("Username cannot be blank!");
            return false;
        } else if (this.state.password.trim() === "") {
            alert("Password cannot be blank!");
            return false;
        } else {
            fetch(`${getDomain()}/users/login/${this.state.username}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: this.state.password
                })
            })
                .then(response => {
                    if (response.status === 404) {
                        alert("Username does not exist!");
                    } else if (response.status === 406) {
                        alert("Password incorrect!");
                    }
                    return response.json();
                })
                .then(returnedUser => {
                    const user = new User(returnedUser);
                    // store the token into the local storage
                    localStorage.setItem("id", user.id);
                    localStorage.setItem("token", user.token);
                    localStorage.setItem("username", user.username);
                    localStorage.setItem("creationdate", user.creationDate);
                    if (user.birthdate === null)
                        localStorage.setItem("birthdate", "<no data>");
                    else
                        localStorage.setItem("birthdate", user.birthdate);
                    localStorage.setItem("status", user.status);

                    // user login successfully worked --> navigate to the route /game in the GameRouter
                    this.props.history.push(`/game`);
                })
                .catch(err => {
                    if (err.message.match(/Failed to fetch/)) {
                        alert("The server cannot be reached. Did you start it?");
                    }
                    /*else {
                        alert(`Something went wrong during the login: ${err.message}`);
                    }*/
                });
        }
    }

    register() {
        localStorage.removeItem("register");
        this.props.history.push(`/register`);
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

    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
     * Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     * You may call setState() immediately in componentDidMount().
     * It will trigger an extra rendering, but it will happen before the browser updates the screen.
     */
    componentDidMount() {
    }

    render() {
        const register = localStorage.getItem("register");
        var success;
        if (register === "true") {
            success = "Successfully registered! You may now login.";
        }
        localStorage.removeItem("register");
        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Success>
                            {success}
                        </Success>
                        <Label>Username</Label>
                        <InputField
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
                            }}
                        />
                        <Label>Password</Label>
                        <InputField
                            type={"password"}
                            placeholder="Enter here.."
                            onChange={e => {
                                this.handleInputChange("password", e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                disabled={!this.state.username || !this.state.password}
                                width="50%"
                                onClick={() => {
                                    this.login();
                                }}
                            >
                                Login
                            </Button>
                        </ButtonContainer>
                        <br/>
                        <br/>
                        <Text>Not yet registered?</Text>
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.register();
                                }}
                            >
                                Register
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
