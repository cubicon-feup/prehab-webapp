import React, { Component } from "react";
import { Link } from "react-router-dom"
import MenuItem from "material-ui/MenuItem";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui/Toolbar";
import Notifications from "./notification";


class menu extends Component {
  render() {
    return (
        <Toolbar style={{"backgroundColor": "#00bcd4"}}>
            <ToolbarGroup>
                <Link to="/main">
                    <ToolbarTitle text="Prehab" />
                </Link>
            </ToolbarGroup>
            <ToolbarGroup firstChild={true}>
                <ToolbarSeparator />
                    <Link to="/login">
                        <MenuItem primaryText="Login"/>
                    </Link>
                    <Link to="/task"><MenuItem primaryText="Task"/></Link>
                    <Link to="/plan"><MenuItem primaryText="Plan"/></Link>
                    <Link to="/notifications">
                        <Notifications />
                    </Link>
            </ToolbarGroup>
        </Toolbar>
    );
  }
}
export default menu;
