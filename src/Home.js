import React from 'react';
import './App.scss';
import {getData, postData} from './services/httpget';
import AuthBar from './AuthBar';
import {Link, Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Logout from './Logout';
import ChangePassword from './ChangePassword';
import cookie from 'react-cookies'
import ResetPassword from './ResetPassword'


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordСonfirm: '',
            signUp: false,
            errMsg: '',
            logout: true,
            changePassword: false,
            hashKey: cookie.load('reset') || '',
            errRed: [],
            msg: "",
            isAuthenticated: this.props.isAuthenticated,
        };
    }

    componentDidMount = () => {
        if (window.location.pathname == "/api/confirm") {
            clearInterval(this.timer)
            this.setState({
                msg: "Почта успешно подтверждена!"
            }, () => {
                this.timer = setInterval(() => {
                    this.setState({
                        msg: "",
                    })
                    clearInterval(this.timer)
                }, 4000)
            })
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props != prevProps)
            this.setState({
                isAuthenticated: this.props.isAuthenticated
            })
    }

    setAutenticated = () => {
        this.setState({
            isAuthenticated: true,
        })
    }

    unsetAutenticated = () => {
        this.setState({
            isAuthenticated: false,
        })
    }

    signUpPrep = () => {
        this.setState(prevState => ({
            signUp: !prevState.signUp,
        }))
    }

    signIn = () => {
        this.setState({
            signUp: false,
        }, () => {
            this.showSign()
        })
    }

    signUp = () => {
        this.setState({
            signUp: true,
        }, () => {
            this.showSign()
        })
    }

    showSign = () => {
        this.setState({
            signShowed: true,
        })
    }

    hideSign = () => {
        this.setState({
            signShowed: false,
        })
    }

    setLogout = () => {
        this.setState({
            logout: true,
            changePassword: false,
        })
    }

    setChangePassword = () => {
        this.setState({
            logout: false,
            changePassword: true,
        })
    }

    render = () => {
        return (
            <div>
                <div className="homeHeader">
                    <button className="logoButton" onClick={this.hideSign}>
                        Satoshkin
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;{this.state.msg}
                    {!this.state.hashKey && !this.state.signShowed && !this.state.isAuthenticated &&
                    <div style={{float: "right"}}>
                        <button className="bodyButton" onClick={this.signIn}>
                            Войти
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="bodyButton" onClick={this.signUp}>
                            Зарегистрироваться
                        </button>
                    </div>}
                    {this.state.isAuthenticated && <div style={{float: "right"}}>
                        <button className="bodyButton" onClick={() => {
                            postData('/api/logout', {}).then(resp => {
                                this.unsetAutenticated()
                            })
                        }}>Выйти
                        </button>
                    </div>}
                </div>
                <div className="homeBody">
                    {this.state.hashKey && <ResetPassword hashKey={this.state.hashKey}/>}
                    {!this.state.hashKey && this.state.signShowed && !this.state.isAuthenticated &&
                    <AuthBar setAutenticated={this.setAutenticated} hideSign={this.hideSign}
                             signUp={this.state.signUp}/>}
                    {!this.state.hashKey && this.state.isAuthenticated && this.state.logout &&
                    <Logout goTo={this.props.goTo} setChangePassword={this.setChangePassword}/>}
                    {!this.state.hashKey && this.state.isAuthenticated && this.state.changePassword &&
                    <ChangePassword setLogout={this.setLogout}/>}
                </div>
            </div>
        );
    }
}

export default Home;
