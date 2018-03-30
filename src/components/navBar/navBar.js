import React, {Component} from 'react';
import Menu from './menu';


class NavBar extends Component {

	render() {
		return (
            <div >
                <Menu authentication={this.props.authentication} />
            </div>
		);
	}
}

export default NavBar;
