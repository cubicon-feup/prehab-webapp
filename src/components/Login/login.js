    import React, { Component } from "react";
    import TextField from "material-ui/TextField";
    import RaisedButton from "material-ui/RaisedButton";
    import validateInput from "../../validation/login";
    import { connect } from "react-redux";
    import { signIn, logOut } from "../../actions/authActions";
    import { authenticateUser } from "../../utils/communication-manager";



    export function wrongCredentials() {
        let errors = {
            username: "Wrong Credential",
            password: "Wrong Credential"
        };
        return {errors};
    }

    class Login extends Component {

        constructor(props){
            super(props);
            this.state = {
                username: "",
                password: "",
                errors: {},
                message: ""
            }

            this.onChange = this.onChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
        }

        onChange = (e) => {
            e.preventDefault();
            this.setState( { [e.target.name]: e.target.value} )
        }

        isValid() {
            const { errors, isValid } = validateInput(this.state);

            if(!isValid){
                this.setState({ errors });
            }
            return isValid;
        }

        onSubmit = (e) => {
            e.preventDefault();
            if(this.isValid()){
                this.setState({ errors: {} });
                authenticateUser(this.state.username, this.state.password)
                    .then(suc => {
                        this.props.signIn(suc.data.jwt, suc.data.role);
                        this.props.history.push("/main");
                    })
                    .catch(err => {
                        const { errors } = wrongCredentials();
                        this.setState({ errors });
                        this.props.logOut();
                    });
            }
        }


        render() {
            const { errors, username, password } = this.state;
            return (
                <div className="row content-middle-page">
                    <div className=" row content-center">
                        <form onSubmit={this.onSubmit}>
                            <h1> Hi Doctor! </h1>
                            <div className="form-group">
                                <TextField
                                    name="username"
                                    value={username}
                                    errorText={errors.username}
                                    onChange={this.onChange}
                                    hintText="Insert Username"
                                />
                                <TextField
                                    name="password"
                                    value={password}
                                    onChange={this.onChange}
                                    errorText={errors.password}
                                    hintText="Insert Password"
                                />
                                <RaisedButton label="Login" primary={true} onClick={this.onSubmit} />
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
    }

    const mapStateToProps = (state) => {
        return {
            auth: state.auth.isLoggedIn
        };
    };

    function mapDispatchToProps(dispatch) {
        return {
            signIn: (username, password) =>{
                dispatch(signIn(username, password));
            },
            logOut: () => {
                dispatch(logOut());
            }
        };
    }

    export default connect(mapStateToProps, mapDispatchToProps)(Login);

