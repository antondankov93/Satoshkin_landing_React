import React, {Component} from 'react';
import './App.scss';
import {getData, postData} from './services/httpget';
import Loader from './loader/Loader';
import {NavHashLink as NavLink} from 'react-router-hash-link';
import {
    Container,
    Col,
    Row,
    DropdownButton,
    DropdownItem,
    Modal,
    ButtonToolbar,
    Button,
    Tooltip, OverlayTrigger
} from 'react-bootstrap';
import ChangePassword from "./ChangePassword";
import ResetPassword from "./ResetPassword";
import AuthBar from "./AuthBar";
import cookie from "react-cookies";
import MainRoute from "./modules/mainRoute";
import Footer from './modules/components/footer/footer';
import {MainContext} from "./modules/MainContext";
import Header from "./modules/components/header/header";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            isAuthenticated: false,
            loading: true,
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
            modalShow: false,
            // modalShow: !!cookie.load('reset'),
        }
    }

    componentDidMount = () => {
        let url = 'https://cdn.bitrix24.eu/b11967071/crm/site_button/loader_1_8ukavi.js';
        let script = document.createElement('b24script');
        script.async = true;
        script.src = url + '?' + (Date.now()/60000|0);
        let widget = document.getElementByTagName('b24script')[0];
        widget.parentNode.insertBefore(script, widget);
    }



    goTo = (backURL, oneTimeToken) => {
        window.location.href = `${backURL}api/auth/login?oneTimeToken=${oneTimeToken}`
    }

    checkAuth = () => {
        getData('/api/isAuthenticated').then(firstResponse => {
            if (firstResponse.isAuthenticated) {
                getData('api/me/').then(response => {
                    this.setState({
                        user: response.user,
                        loading: false,
                        isAuthenticated: firstResponse.isAuthenticated,
                    })
                })
            } else {
                this.setState({
                    loading: false,
                    isAuthenticated: firstResponse.isAuthenticated,
                    modalShow: !!cookie.load('reset'),
                })
            }
        })
        // if (window.location.pathname == "/api/confirm")
        // if (response.isAuthenticated && window.location.href != "https://accounts.satoshkin.com/authed/" && window.location.href != "https://accounts.satoshkin.com/authed" && window.location.href != "https://accounts.satoshkin.com/changePassword/" && window.location.href != "https://accounts.satoshkin.com/changePassword" ) window.location.href = '/authed'
        // if (window.location.href != "https://accounts.satoshkin.com/redirect/" && window.location.href != "https://accounts.satoshkin.com/redirect") window.location.href = '/redirect'
    }

    componentDidMount = () => {
        this.checkAuth();

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

    setAutenticated = () => {
        getData('api/me/').then(response => {
            this.setState({
                user: response.user,
                isAuthenticated: true,
                modalShow: false,
            })
        })
    }

    unsetAutenticated = () => {
        this.setState({
            user: {},
            isAuthenticated: false,
            modalShow: false,
        })
    }

    showSignIn = () => {
        this.setState({
            signUp: false,
            signUpTextShowed: false,
        }, () => {
            this.modalShowOn()
        })
    }

    showSignUp = () => {
        this.setState({
            signUp: true,
            signUpTextShowed: false,
        }, () => {
            this.modalShowOn()
        })
    }

    showSignUpWithText = () => {
        this.setState({
            signUp: true,
            signUpTextShowed: true,
        }, () => {
            this.modalShowOn()
        })
    }

    modalShowOn = () => {
        this.setState({
            modalShow: true,
        })
    }

    modalShowOff = () => {
      if (!this.state.hashKey) {
        this.setState({
            modalShow: false,
        })
      }
    }


    render = () => {
        const isAuth = this.state.isAuthenticated;
        const goTo = this.goTo;
        const location = window.location;
        const showSignUp = this.showSignUpWithText;

        return (

            <Container fluid>
                <Row id="header" className="align-items-lg-center homeHeader">
                    <Col xs lg={{span: 7, offset: 1}}>
         {/*--------------------------------------------------------header component-------------------------------------------------------------*/}
                        <Header/>
         {/*---------------------------------------------------------------------------------------------------------------------*/}
                    </Col>
         {/*---------------------------------------------------------------------sign in/up buttons-------------------------------------------------------------------------*/}
                    <Col xs={12} lg={4} xl={3}>
                        {this.state.loading ? <Loader/> : <Row className="buttonsRow">
                            {/* &nbsp;&nbsp;&nbsp;&nbsp;{this.state.msg}  */}
                            {!this.state.isAuthenticated && <Col className="buttonWrapper">
          {/*---------------------------------------------------------------------------------------------------------------------*/}
                                <ButtonToolbar>
                                    <Button variant="primary"  onClick={this.showSignIn}>
                                        Войти
                                    </Button>
                                </ButtonToolbar>
           {/*---------------------------------------------------------------------------------------------------------------------*/}
                                <ButtonToolbar>
                                    <Button variant="primary"  onClick={this.showSignUp}>
                                        Зарегистрироваться
                                    </Button>
                                </ButtonToolbar>
                            </Col>}


                            {this.state.isAuthenticated && this.state.user.email && <Col className="buttonWrapper">
                                <NavLink to='/user-account' className='userEmail'>

                                    <ButtonToolbar>
                                        <OverlayTrigger
                                            key="left"
                                            placement="left"
                                            overlay={
                                                <Tooltip id="tooltip-left">
                                                    Личный кабинет
                                                </Tooltip>
                                            }
                                        >
                                            <Button variant="primary">{this.state.user.email}</Button>
                                        </OverlayTrigger>
                                    </ButtonToolbar></NavLink>
                                <button className="bodyButton" onClick={() => {
                                    postData('/api/logout', {}).then(resp => {
                                        this.unsetAutenticated()
                                    })
                                }}>
                                    Выйти
                                </button>
                            </Col>}
                        </Row>}
                    </Col>
                </Row>
                {/*-------------------------------------------MODAL----------------------------------------------*/}
                {!this.state.isAuthenticated && (
                    <Modal
                        show={this.state.modalShow}
                        onHide={this.modalShowOff}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        className={this.state.signUp || (!this.state.signUp && !this.state.signUp)}
                    >
                        <Modal.Header closeButton={!this.state.hashKey} />
                        <Modal.Body>
                                {this.state.hashKey && <ResetPassword hashKey={this.state.hashKey}/>}
                                {!this.state.hashKey && <AuthBar
                                    signUpTextShowed={this.state.signUpTextShowed}
                                    setAutenticated={this.setAutenticated}
                                    signUp={this.state.signUp}
                                />}
                        </Modal.Body>
                    </Modal>)
                }
                {/*----------------------------------------main content------------------------------------------*/}
                <Row className="align-items-lg-center mainContent">
                    <Col>
                        <MainContext.Provider value={{goTo, location, showSignUp, isAuth}}>
                            <MainRoute goTo={this.goTo} auth={this.state.isAuthenticated}/>
                        </MainContext.Provider>
                        <Row>
                            <Footer/>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
