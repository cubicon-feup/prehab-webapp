import React
// {Component}
from 'react';
import {
	BrowserRouter as Router,
	Route,
	// Link
} from 'react-router-dom'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
// import logo from 'src/images/logo.svg';
// import 'src/App.css';
//
// const Home = () => (
// 	<div>
// 		<h2>Home</h2>
// 	</div>
// )
//
// const About = () => (
// 	<div>
// 		<h2>About</h2>
// 	</div>
// )
//
// const Topic = ({match}) => (
// 	<div>
// 		<h3>{match.params.topicId}</h3>
// 	</div>
// )
//
// const Topics = ({match}) => (
// 	<div>
// 		<h2>Topics</h2>
// 		<ul>
// 			<li>
// 				<Link to={`${match.url}/rendering`}>
// 					Rendering with React
// 				</Link>
// 			</li>
// 			<li>
// 				<Link to={`${match.url}/components`}>
// 					Components
// 				</Link>
// 			</li>
// 			<li>
// 				<Link to={`${match.url}/props-v-state`}>
// 					Props v. State
// 				</Link>
// 			</li>
// 		</ul>
//
// 		<Route path={`${match.path}/:topicId`} component={Topic}/>
// 		<Route exact path={match.path} render={() => (
// 			<h3>Please select a topic.</h3>
// 		)}/>
// 	</div>
//)




// {/*<ul>*/}
// {/*<li><Link to="/">Home</Link></li>*/}
// {/*<li><Link to="/about">About</Link></li>*/}
// {/*<li><Link to="/topics">Topics</Link></li>*/}
// {/*</ul>*/}
//
// {/*<hr/>*/}
const BasicExample = () => (
	<Router>
		<div>

			<Route exact path="/" component={HomePage}/>
			<Route path="/login" component={LoginPage}/>
		</div>
	</Router>
);

export default BasicExample
