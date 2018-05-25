import {compose} from 'redux';
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Input from '@material-ui/core/Input';
import AccountCircle from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Redirect } from 'react-router-dom';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import { BrowserRouter as Router ,Route, Switch  } from "react-router-dom";
import {connect} from "react-redux";
import { getCookieInfo } from "../actions/authActions";

import Home from "./Home/home";
import Patient from "./MainWindow/patient";
import Task from "./PatientActivityTask/task";
import Plan from "./ActivityPlan/plan";
import NewPlan from "./ActivityPlan/newPlan";
import NavBar from "./navBar/navBar";
import NewPatient from "./CreatePatient/newPatient";
import Settings from "./Settings/settings";
import NewDoctor from "./Settings/newDoctor";
import Prehab, {appbarPrehab} from "./Prehab/prehab";
import NewPrehab from "./Prehab/newPrehab";
import NewNutrition from "./Nutrition/newNutrition";
import Nutrition from "./Nutrition/nutrition";
import Login from "./Login/login";
import Logout from "./Logout/logout";

import TestComponent from "./TestComponent/testComp";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'absolute',
        display: 'flex',
        width: '100%',
      },
      appBar: {
        position: 'fixed',
        top: 0,
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`,
        },
      },
      navIconHide: {
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
      toolbar: theme.mixins.toolbar,
      drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
          position: 'fixed',
        },
      },
      drawerMobile: {
        width: drawerWidth,
      },
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.up('md')]: {
            marginLeft:`${drawerWidth}px`,
          },padding: theme.spacing.unit * 3,
        
      },
      bootstrapRoot: {
        padding: 0,
        'label + &': {
          marginTop: theme.spacing.unit * 3,
        },
      },
      bootstrapInput: {
        borderRadius: 4,
        backgroundColor: theme.palette.common.white,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
          borderColor: '#80bdff',
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
      },
      bootstrapFormLabel: {
        fontSize: 18,
      },
});


class App extends React.Component {
    constructor(props){
        super(props);
        this.setTitle = this.setTitle.bind(this);
    }
    
    componentDidMount(){
        this.props.getCookieInfo();
    }

    state = {
        mobileOpen: false,
        title:'Prehabs',
        term: '',
    };

    setTitle(title){
        this.setState({
          title:title,
        });
    }

    filterList(event) {
        this.setState({ term: event.target.value });
    }
    
    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    appBar (){        
        const { classes} = this.props;
        return(
        <div>
            <AppBar position="absolute" className={classes.appBar}>
            <Toolbar>
                <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.navIconHide}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="title" color="inherit" noWrap>
                    {this.state.title}
                </Typography>
                <Input
                id="input-with-icon-adornment"
                placeholder="Pesquisar"
                value = {this.state.term}
                onChange={this.filterList.bind(this)}
                endAdornment={
                    <InputAdornment position="end">
                        <AccountCircle />
                    </InputAdornment>
                }
                />             
            </Toolbar>
        </AppBar>
        </div>
        )
    }

    appSideNav (){       
            const { classes,theme} = this.props;
            const drawer = (
            <div className={classes.toolbar}>
                <Router><NavBar/></Router>
            </div>);
            return(
            <div>
                <Hidden mdUp>
                        <Drawer
                            classes={{
                                paper: classes.drawerMobile,
                                }}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden smDown implementation="css">
                        <Drawer
                            variant="permanent"
                            classes={{
                            paper: classes.drawerPaper,
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
            </div>
            )
    }
        
    render() {
        const { classes} = this.props;        
        return (            
                <div className={classes.root}>                
                <MuiThemeProvider>  
                    {this.appBar()}
                    {this.appSideNav()}
                    <main className={classes.content}>
                        <div className={classes.toolbar} />                   
                       <Router>
                            <Switch>
                                <Route exact path="/" name="home" component={Home}/>
                                <Route path="/login" name="login" component={Login}/>
                                <Route path="/logout" name="logout" component={Logout}/>
                                <Route path="/task" name="Task" render={(props) => (<Task setTitle={this.setTitle} auth={this.props.auth} {...props}/>)}/>
                                <Route path="/newPlan" name="newPlan" render={(props) => (<NewPlan setTitle={this.setTitle} auth={this.props.auth} {...props}/>)}/>
                                <Route path="/plan" name="Plan" render={(props) => (<Plan  filter={this.state.term} setTitle={this.setTitle} auth={this.props.auth} {...props}/>)}/>
                                <Route path="/doctor" name="Doctor" render={(props) => (<Settings filter={this.state.term} setTitle={this.setTitle} auth={this.props.auth} {...props}/>)}/>
                                <Route path="/newPatient" name="newPatient" render={(props) => (<NewPatient setTitle={this.setTitle} auth={this.props.auth} {...props}/>)}/>
                                <Route path="/patient" name="Patient" render={(props) => (<Patient filter={this.state.term} setTitle={this.setTitle} auth={this.props.auth} {...props}/>)}/>
                                <Route path="/prehab" name="Prehab" render={(props) => (<Prehab filter={this.state.term} setTitle={this.setTitle} auth={this.props.auth} {...props}/>)}/>
                                <Route path="/newPrehab" name="newPrehab" render={(props) => (<NewPrehab setTitle={this.setTitle} auth={this.props.auth} {...props}/>)}/>
                                <Route path="/newDoctor" name="newDoctor" render={(props) => (<NewDoctor setTitle={this.setTitle} auth={this.props.auth} {...props}/>)}/>
                                <Route path="/newNutrition" name="newNutrition" render={(props) => (<NewNutrition setTitle={this.setTitle} auth={this.props.auth} {...props}/>)}/>
                                <Route path="/nutrition" name="Nutrition" render={(props) => (<Nutrition filter={this.state.term} setTitle={this.setTitle} auth={this.props.auth} {...props}/>)}/>
                                <Route path="/mytest" name="MyTeste" render={(props) => (<TestComponent auth={this.props.auth} {...props}/>)} />
                                <Redirect to="/prehab" />
                            </Switch>
                        </Router>                                                    
                    </main>                
            </MuiThemeProvider>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        getCookieInfo: () =>{
            dispatch(getCookieInfo());
        }
    };
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default compose(withStyles(styles, { withTheme: true }),connect(null,mapDispatchToProps))(App);