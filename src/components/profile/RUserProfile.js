import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import OtherUsers from "../../views/OtherUsers";

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

class RUserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    back() {
        localStorage.removeItem("otheruserid");
        localStorage.removeItem("otherusername");
        localStorage.removeItem("otherstatus");
        localStorage.removeItem("othercreate");
        localStorage.removeItem("otherbirth");
        this.props.history.push("/registeredusers");
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container>
                <div>
                    <Users>
                        <PlayerContainer>
                            <OtherUsers />
                        </PlayerContainer>
                    </Users>
                </div>
                <div>
                    <Button
                        width="20%"
                        onClick={() => {
                            this.back();
                        }}
                    >
                        Back
                    </Button>
                </div>
            </Container>
        );
    }
}

export default withRouter(RUserProfile);