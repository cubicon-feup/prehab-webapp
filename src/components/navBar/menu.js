import React, { Component } from "react";
import {connect} from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import "../../styles/menu_style.css";
import Logo from "../../images/icons/logo.svg";
import Logout from "../../images/icons/logout.svg";
import Patients from "../../images/icons/patients.svg";
import Doctors from "../../images/icons/doctors.svg";
import Nutrition from "../../images/icons/nutrition.svg";
import Tasks from "../../images/icons/tasks.svg";
import Prehabs from "../../images/icons/prehabs.svg";

class menu extends Component {
    render() {
        if(this.props.auth === true ) {
            return (
                <div>        
                    <List component="nav">
                        <ListItem component="a" href="/">
                            <img  class="navIconLogo" src={Logo} alt="Prehab"/>
                        </ListItem>
                    </List>
                    <Divider />
                    <List component="nav">
                        <ListItem button component="a" href="/prehab">
                            <Avatar>
                                <img class="navIcon" src={Prehabs} alt="Prehabs"/>
                            </Avatar>
                            <ListItemText primary="Prehabs" />
                        </ListItem>
                        <ListItem button component="a" href="/patient">
                            <Avatar>
                                <img class="navIcon" src={Patients} alt="Pacientes"/>
                            </Avatar>
                            <ListItemText primary="Pacientes" />
                        </ListItem>
                        <ListItem button component="a" href="/plan">
                            <Avatar>
                                <img class="navIcon" src={Tasks} alt="Tarefas"/>
                            </Avatar>
                            <ListItemText primary="Tarefas" />
                        </ListItem>
                        {this.settingsMenu()}
                    </List>                   
                    <Divider />
                    <List>
                        <ListItem button component="a" href="/logout">
                            <Avatar>
                                <img class="navIcon" src={Logout} alt="Sair"/>
                            </Avatar>
                            <ListItemText primary="Sair" />
                        </ListItem>
                    </List>
                </div>
            );
        } else {
            return null;
        }
    }

    settingsMenu = () => {
        console.log(this.props.role);

        if  (this.props.auth === true && this.props.role === "Admin") {
            return (
                <div>
                    <ListItem button component="a" href="/doctor">
                        <Avatar>
                            <img class="navIcon" src={Doctors} alt="Médicos"/>
                        </Avatar>
                        <ListItemText primary="Médicos" />
                    </ListItem>
                    <ListItem button component="a" href="/nutrition">
                        <Avatar>
                            <img class="navIcon" src={Nutrition} alt="Nutrição"/>
                        </Avatar>
                        <ListItemText primary="Nutrição" />
                    </ListItem>                   
                </div>     
            );
        } else{
            return null
        }
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.isLoggedIn,
        token: state.auth.accessToken,
        role: state.auth.role
    };
};

export default connect(mapStateToProps, null)(menu);
