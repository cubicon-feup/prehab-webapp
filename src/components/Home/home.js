import React, {Component} from 'react';
import logo from '../../images/logo.png';
// import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import validateInput from '../../validation/login';
import {connect} from 'react-redux';
import {logIn} from "../../actions/authActions";
import store from "../../store";
import {Link} from 'react-router-dom'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            message: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value})
    };

    isValid() {
        const {errors, isValid} = validateInput(this.state);

        if (!isValid) {
            this.setState({errors});
        }
        return isValid;
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({errors: {}});
            this.props.logIn(this.state.username, this.state.password);
            store.subscribe(() => {
                if (this.props.auth === true)
                    this.props.history.push('/main');
            });


        }
    };

    render() {
        const {errors, username, password} = this.state;
        return (
            <div className="row">
                <div className="content-center " style={{color: " #7AC4FF", width: '700px'}}>
                    <img src={logo} width="150px" alt="Amazing" style={{marginTop: 100}}/>
                    <p>Bem vindo ao Prehab </p>
                    <p>Monitorização e controlo da condição de saúde de pacientes numa fase pre-operatório</p>
                    <p> {this.state.message} </p>
                    <div className="content-center" style={{width: '600px'}}>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <TextField
                                    name="username"
                                    value={username}
                                    fullWidth="true"
                                    errorText={errors.username}
                                    onChange={this.onChange}
                                    hintText="Inserir Nome de Utilizador"
                                />
                                <TextField
                                    name="password"
                                    fullWidth="true"

                                    value={password}
                                    onChange={this.onChange}
                                    errorText={errors.password}
                                    hintText="Inserir Password"

                                />

                                <RaisedButton label="Entrar"
                                              buttonStyle={{borderRadius: 25}}
                                              style={{borderRadius: 25}}
                                              borderColor={'#7AC4FF'}
                                              backgroundColor={"#FFFFFF"}
                                              labelColor={'#7AC4FF'}

                                              onClick={this.onSubmit}/>
                            </div>
                        </form>
                        <Link to="/forgetPassword" style={{color: '#7AC4FF'}} activeStyle={{color: 'red'}}>Esqueceu-se da Password?</Link>
                    </div>
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
        logIn: (username, password) => {
            dispatch(logIn(username, password));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

//
//
//
//                 </div>
//             </div>
// 		);
// 	}
// }
//
//
// const mapStateToProps = (state) => {
//     return {
//         auth: state.auth.isLoggedIn
//     };
// };
//
// function mapDispatchToProps(dispatch) {
//     return {
//         logIn: (username, password) =>{
//             dispatch(logIn(username, password));
//         }
//     };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(Home);
