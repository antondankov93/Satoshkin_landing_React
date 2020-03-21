import React from 'react';
import './App.scss';
import {getData, postData} from './services/httpget';
import classNames from 'classnames';
import validator from 'validator';

// import Cookies from 'js-cookie';
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 30;

class AuthBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordСonfirm: '',
            signUp: this.props.signUp,
            forget: false,
            showTwoFactor: false,
            errMsg: '',
            errRed: [],
            validation: {
              email: '',
              password: '',
              passwordConfirm: '',
              pin: '',
            },
        };
    }

    onChange = (e) => {
        const {name, value} = e.target
        
        this.setState(prevState => ({
          [name]: value,
          errMsg: '',
          errRed: [],
          // errRed: prevState.errRed.filter((err) => err !== name),
          validation: {
            ...prevState.validation,
            [name]: '',
          },
        }))

        if (this.state.signUp) {
          if (
            name === 'email'
            && /[^a-z0-9@._\-]/ig.test(value)
          ) {
            this.setState(prevState => ({
              validation: {
                ...prevState.validation,
                [name]: 'Недопустимый символ',
              },
            }))
          } else if ((name === 'password' || name === 'passwordConfirm') && /[^a-z0-9]/ig.test(value)) {
            this.setState(prevState => ({
              validation: {
                ...prevState.validation,
                [name]: 'Пароль может содержать только латинские буквы и цифры',
              },
            }))
          }
        }
    }

    signUp = () => {
        let {email, password, passwordСonfirm} = this.state
        let currentErrorMsg = ""
        let errRed = []
        email = email.toLowerCase()

        if (
          email.trim()
          && password.trim()
          && passwordСonfirm.trim()
        ) {
          if (!validator.isEmail(email)) {
            errRed.push("email")
            currentErrorMsg = "Email не соответствует шаблону example@any.any"
          } else if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
            errRed.push("password")
            currentErrorMsg = `Длина пароля должна быть от ${MIN_PASSWORD_LENGTH} до ${MAX_PASSWORD_LENGTH} символов`
          } else if (!validator.equals(passwordСonfirm, password)) {
            errRed.push("password")
            errRed.push("passwordСonfirm")
            currentErrorMsg = "Пароли не совпадают"
          } else {
              postData(`/api/signup`, {email, password}).then(response => {
                  if (response.success) {
                      clearInterval(this.timer)
                      this.setState({
                          errMsg: "Регистрация прошла успешно! Пожалуйста, проверьте почту",
                          errRed: []
                      }, () => {
                          this.timer = setInterval(() => {
                              this.setState({
                                  errMsg: "",
                                  errRed: [],
                              })
                              clearInterval(this.timer)
                          }, 5000)
                      })
                  } else {
                      clearInterval(this.timer)
                      this.setState({
                          errMsg: "Пользователь уже существует",
                          errRed: ["email"]
                      }, () => {
                          this.timer = setInterval(() => {
                              this.setState({
                                  errMsg: "",
                                  errRed: [],
                              })
                              clearInterval(this.timer)
                          }, 5000)
                      })
                  }
              })
          }

          if (currentErrorMsg || errRed.length > 0) {
            clearInterval(this.timer)
            this.setState({
                errMsg: currentErrorMsg,
                errRed,
            }, () => {
                this.timer = setInterval(() => {
                    this.setState({
                        errMsg: "",
                        errRed: [],
                    })
                    clearInterval(this.timer)
                }, 5000)
            })
          }
        } else {
            currentErrorMsg = "Все поля обязательны для заполнения"

            if (!email.trim()) errRed.push("email")
            if (!password.trim()) errRed.push("password")
            if (!passwordСonfirm.trim()) errRed.push("passwordСonfirm")
            clearInterval(this.timer)
            this.setState({
                errMsg: currentErrorMsg,
                errRed,
            }, () => {
                this.timer = setInterval(() => {
                    this.setState({
                        errMsg: "",
                        errRed: []
                    })
                    clearInterval(this.timer)
                }, 5000)
            })
        }
    }

    loginRoute = (pin) => {
        let {email, password} = this.state
        email = email.toLowerCase()
        let sendOnj = {}
        sendOnj.email = email
        sendOnj.password = password
        if (pin) sendOnj.pin = pin
        postData(`/api/login`, sendOnj).then(() => {
            getData('/api/isAuthenticated').then(response => {
                if (response.isAuthenticated) this.props.setAutenticated();
                else {
                    if (pin) {
                        clearInterval(this.timer)
                        this.setState({
                            errMsg: "Неверный пин-код",
                            errRed: ["pin"]
                        })
                        this.pin.value = ""
                    }
                }
            })
            return;
        }).catch(err => {
            if (pin) {
                clearInterval(this.timer)
                this.setState({
                    errMsg: "Неверный пин-код",
                    errRed: ["pin"]
                })
                this.pin.value = ""
            }
            console.log(err)
        })

    }

    login = () => {
        let {email, password} = this.state
        email = email.toLowerCase()
        if (email && password) {
            postData(`/api/checkTwoFactor`, {email, password}).then(response => {
                if (response.msg) {
                    if (response.msg == "wrong data") {
                        clearInterval(this.timer)
                        this.setState({
                            errMsg: "Неверный E-mail или пароль",
                            errRed: ["password", "email"]
                        })
                    } else {
                        clearInterval(this.timer)
                        this.setState({
                            errMsg: response.msg,
                            errRed: ["password", "email"]
                        })
                    }
                } else {
                    if (response.success && response.twoFactor) {
                        this.setState({
                            errMsg: "",
                            errRed: [],
                            showTwoFactor: true,
                        })
                    } else if (response.success && !response.twoFactor) {
                        this.loginRoute()
                    }
                }
            })
        } else {
            let errRed = []
            let currentErrorMsg = "Поля не могут быть пустыми"

            if (!email) errRed.push("email")
            if (!password) errRed.push("password")
            clearInterval(this.timer)
            this.setState({
                errMsg: currentErrorMsg,
                errRed,
            }, () => {
                this.timer = setInterval(() => {
                    this.setState({
                        errMsg: "",
                        errRed: []
                    })
                    clearInterval(this.timer)
                }, 5000)
            })
        }
    }

    sendEmail = () => {
        let {email} = this.state
        email = email.toLowerCase()
        if (email) {
            postData(`/api/reset`, {email}).then(response => {
                if (response.success) {
                    clearInterval(this.timer)
                    this.setState({
                        errMsg: "Успешно отправлено, проверьте, пожалуйста, почту!",
                        errRed: [],
                    }, () => {
                        this.timer = setInterval(() => {
                            this.setState({
                                errMsg: "",
                                errRed: []
                            })
                            clearInterval(this.timer)
                        }, 5000)
                    })
                } else {
                    clearInterval(this.timer)
                    this.setState({
                        errMsg: "Такого пользователя не существует",
                        errRed: [],
                    }, () => {
                        this.timer = setInterval(() => {
                            this.setState({
                                errMsg: "",
                                errRed: ["email"]
                            })
                            clearInterval(this.timer)
                        }, 5000)
                    })
                }
            })
        } else {
            let errRed = []
            let currentErrorMsg = "Поле не может быть пустым"

            if (!email) errRed.push("email")
            clearInterval(this.timer)
            this.setState({
                errMsg: currentErrorMsg,
                errRed,
            }, () => {
                this.timer = setInterval(() => {
                    this.setState({
                        errMsg: "",
                        errRed: []
                    })
                    clearInterval(this.timer)
                }, 5000)
            })
        }
    }

    signUpPrep = () => {
        this.setState(prevState => ({
            signUp: !prevState.signUp,
            errMsg: "",
            errRed: []
        }))
    }

    toggleForget = () => {
        this.setState(prevState => ({
            forget: !prevState.forget,
            signUp: false,
        }))
    }

    getOnFormSubmit = (event) => {
      event.preventDefault();

      if (this.state.forget) {
        this.sendEmail();
      } else if (this.state.signUp) {
        this.signUp();
      } else {
        this.login();
      }
    }

    getSubmitButtonIsDisabled = () => {
      return Object.values(this.state.validation).some((value) => value !== '');
    }

    render = () => {
        return (
            <form
                className={classNames("AppRound", (this.state.signUp || (!this.state.signUp && !this.state.forget)) && "AppRound--main")}
                onSubmit={this.getOnFormSubmit}
            >
                {this.state.showTwoFactor && <div className="faded">
                    <div className="two_fa_window">
                        <div className="justLine" style={{
                            textAlign: "left",
                            color: this.state.errRed.some(name => name == "pin") ? "#F52C2C" : "#696969",
                            fontSize: "10pt"
                        }}>
                            <div style={{marginBottom: "4px"}}>2FA пин-код</div>
                        </div>
                        <div className="inputLine"
                             style={{border: this.state.errRed.some(name => name == "pin") && "1px solid #F52C2C"}}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <svg width="15" height="20" viewBox="0 0 20 26" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M18.5661 10.4999H18.0595V8.12879C18.0595 3.74328 14.5793 0.0798056 10.2295 0.00160252C10.1106 -0.000534174 9.87313 -0.000534174 9.75433 0.00160252C5.4044 0.0798056 1.92425 3.74328 1.92425 8.12879V10.4999H1.41759C0.636842 10.4999 0 11.3055 0 12.3005V24.1929C0 25.1868 0.636842 26 1.41764 26H18.5661C19.3469 26 19.9838 25.1868 19.9838 24.1929V12.3005C19.9838 11.3056 19.3469 10.4999 18.5661 10.4999ZM11.5985 18.2347V21.8281C11.5985 22.2396 11.254 22.5878 10.8422 22.5878H9.14169C8.72984 22.5878 8.38535 22.2396 8.38535 21.8281V18.2347C7.98595 17.8415 7.75343 17.2979 7.75343 16.6965C7.75343 15.5569 8.63433 14.5777 9.75439 14.5324C9.87308 14.5276 10.1108 14.5276 10.2295 14.5324C11.3496 14.5777 12.2305 15.5569 12.2305 16.6965C12.2304 17.2979 11.9979 17.8415 11.5985 18.2347ZM14.7204 10.4999H10.2295H9.75433H5.26343V8.12879C5.26343 5.51641 7.38645 3.35637 9.99188 3.35637C12.5973 3.35637 14.7204 5.51641 14.7204 8.12879V10.4999H14.7204Z"
                                                fill={this.state.errRed.some(name => name == "pin") ? "#F52C2C" : "#4D6299"}/>
                                        </svg>
                                    </td>
                                    <td>
                                        <input className="pin" maxLength="6" value={this.state.pin}
                                               ref={ref => this.pin = ref} name="pin" onChange={this.onChange}/>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            {
                                this.state.validation.pin && (
                                  <div className="inputLineError">
                                    <svg className="error-img" width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.708 4l3.145 3.145a.5.5 0 11-.707.707L4 4.707.854 7.852a.5.5 0 11-.707-.707l3.146-3.146L.147.853A.5.5 0 11.854.146L4 3.292 7.146.146a.499.499 0 01.707 0 .5.5 0 010 .707L4.708 4z" /><defs><clipPath id="clip0"><path transform="matrix(1 0 0 -1 0 8)" d="M0 0h8v8H0z"/></clipPath></defs></svg>
                                    &nbsp;
                                    {this.state.validation.pin}
                                  </div>
                                )
                              }
                        </div>
                        <div className="justLine withErrX" style={{
                            textAlign: "left",
                            color: this.state.errRed.length == 0 ? "#24BA69" : "#F52C2C",
                            fontSize: "10pt"
                        }}>
                            {this.state.errMsg && this.state.errRed.length != 0 && <React.Fragment>
                                <svg verticalalign="auto" width="8" height="8" viewBox="0 0 8 8" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0)">
                                        <path
                                            d="M4.70751 3.99911L7.85341 7.14501C8.04886 7.34029 8.04886 7.65715 7.85341 7.85243C7.65796 8.04789 7.34144 8.04789 7.14598 7.85243L4.00008 4.70653L0.854016 7.85243C0.658564 8.04789 0.34204 8.04789 0.146589 7.85243C-0.0488629 7.65715 -0.0488629 7.34029 0.146589 7.14501L3.29266 3.99911L0.146589 0.853205C-0.0488629 0.65792 -0.0488629 0.341062 0.146589 0.145777C0.244314 0.0482179 0.372392 -0.000645295 0.500302 -0.000645295C0.628213 -0.000645295 0.75629 0.0482178 0.854016 0.145944L4.00008 3.29185L7.14598 0.145944C7.24371 0.0482178 7.37179 -0.000645295 7.4997 -0.000645295C7.62761 -0.000645295 7.75569 0.0482178 7.85341 0.145944C8.04886 0.341228 8.04886 0.658087 7.85341 0.853371L4.70751 3.99911Z"
                                            fill="#F52C2C"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0">
                                            <rect width="8" height="8" fill="white" transform="matrix(1 0 0 -1 0 8)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                &nbsp;
                                {this.state.errMsg}</React.Fragment>}
                            {this.state.errMsg ? "" : <br/>}
                        </div>
                        {<button type="button" className="bodyButton delete" onClick={() => {
                            this.setState({
                                showTwoFactor: false,
                            })
                        }}>Отмена</button>}
                        {<button type="button" className="bodyButton" onClick={() => this.loginRoute(this.state.pin)}>Войти</button>}
                    </div>
                </div>}

                <table style={{width: "100%"}}>
                    <tbody>
                    <tr className="title">
                        <td className="titleTd">
                            <div className="justLine">
                                <div style={{
                                    float: "left",
                                    fontWeight: "900"
                                }}>{this.state.forget ? "ВОССТАНОВЛЕНИЕ ПАРОЛЯ" : this.state.signUp ? "РЕГИСТРАЦИЯ" : "ВХОД"}</div>
                                {!this.state.forget && <div style={{float: "right"}}>
                                    <button type="button" className="headerButton"
                                            onClick={this.signUpPrep}>{this.state.signUp ? "Войти" : "Зарегистрироваться"}</button>
                                </div>}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="withLine withMargin">
                            {this.props.signUpTextShowed && this.state.signUp && (
                              <div>
                                <p>После регистрации активируется пробный период на 7 дней для ознакомления с функционалом Satoshkin BOT</p>
                                <p>Доступно:</p>
                                <p>1 аккаунт на каждой p2p-платформе</p>
                                <p>2 оффера на каждом аккаунте</p>
                              </div>
                            )}
                            <div className="justLine" style={{
                                textAlign: "left",
                                color: this.state.errRed.some(name => name == "email") ? "#F52C2C" : "#696969",
                                fontSize: "10pt"
                            }}>
                                {this.state.forget ? <div style={{marginBottom: "4px"}}>Почта для восстановления</div> :
                                    <br/>}
                            </div>
                            <div className="inputLine">
                                <svg className={classNames("inputLineSvg", (this.state.validation.email || this.state.errRed.includes('email')) && "inputLineSvg--error")} width="18" height="18" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.213 3.278C19.843 1.093 16.893 0 13.371 0 9.67 0 6.513 1.241 3.91 3.729 1.305 6.216 0 9.309 0 13.01c0 3.548 1.241 6.598 3.718 9.154C6.206 24.722 9.548 26 13.753 26c2.535 0 5.023-.52 7.463-1.565a1.59 1.59 0 00.86-2.052 1.586 1.586 0 00-2.101-.86c-2.122.913-4.201 1.369-6.227 1.369-3.225 0-5.723-.981-7.495-2.95-1.766-1.962-2.652-4.269-2.652-6.915 0-2.875.95-5.273 2.843-7.198 1.889-1.92 4.217-2.885 6.975-2.885 2.54 0 4.689.79 6.439 2.37 1.75 1.581 2.625 3.57 2.625 5.967 0 1.64-.403 3.008-1.204 4.095-.8 1.093-1.633 1.634-2.498 1.634-.466 0-.7-.25-.7-.753 0-.409.032-.886.09-1.438l.987-8.067h-3.395l-.217.79c-.865-.705-1.814-1.06-2.843-1.06-1.634 0-3.034.652-4.195 1.951-1.167 1.3-1.745 2.976-1.745 5.023 0 2 .514 3.617 1.548 4.843 1.035 1.23 2.276 1.84 3.729 1.84 1.3 0 2.408-.546 3.33-1.633.696 1.044 1.72 1.564 3.072 1.564 1.989 0 3.707-.864 5.155-2.599 1.448-1.729 2.175-3.819 2.175-6.264 0-3.097-1.183-5.744-3.559-7.93zm-7.818 12.204c-.6.806-1.315 1.215-2.148 1.215-.568 0-1.024-.297-1.369-.891-.35-.594-.525-1.331-.525-2.217 0-1.093.244-1.973.732-2.642.488-.668 1.093-1.007 1.814-1.007.626 0 1.183.249 1.671.753s.732 1.172.732 2.01c-.005 1.045-.308 1.968-.907 2.78z"/></svg>
                                <input
                                    className={classNames(
                                        "inputLineField",
                                        (this.state.validation.email || this.state.errRed.includes('email')) && "inputLineField--error",
                                    )}
                                  type="email"
                                  value={this.state.email}
                                  ref={ref => this.email = ref}
                                  name="email"
                                  onChange={this.onChange}
                                />
                                {
                                  this.state.validation.email && (
                                    <div className="inputLineError">
                                      <svg className="error-img" width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.708 4l3.145 3.145a.5.5 0 11-.707.707L4 4.707.854 7.852a.5.5 0 11-.707-.707l3.146-3.146L.147.853A.5.5 0 11.854.146L4 3.292 7.146.146a.499.499 0 01.707 0 .5.5 0 010 .707L4.708 4z" /><defs><clipPath id="clip0"><path transform="matrix(1 0 0 -1 0 8)" d="M0 0h8v8H0z"/></clipPath></defs></svg>
                                      &nbsp;
                                      {this.state.validation.email}
                                    </div>
                                  )
                                }
                            </div>
                        </td>
                    </tr>
                    {!this.state.forget && <tr>
                        <td className="withMargin">
                            <div className="justLine" style={{
                                textAlign: "left",
                                color: this.state.errRed.some(name => name == "password") ? "#F52C2C" : "#696969",
                                fontSize: "10pt"
                            }}>
                                {this.state.signUp ? <div style={{marginBottom: "4px"}}>Придумайте пароль</div> : <br/>}
                            </div>
                            <div className="inputLine">
                                <svg className={classNames("inputLineSvg", (this.state.validation.password || this.state.errRed.includes('password')) && "inputLineSvg--error")} width="15" height="20" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.566 10.5h-.506V8.129c0-4.386-3.48-8.05-7.83-8.127a17.613 17.613 0 00-.476 0c-4.35.078-7.83 3.741-7.83 8.127v2.37h-.506C.637 10.5 0 11.306 0 12.3v11.893C0 25.187.637 26 1.418 26h17.148c.78 0 1.418-.813 1.418-1.807V12.3c0-.994-.637-1.8-1.418-1.8zM11.6 18.235v3.593c0 .412-.345.76-.757.76h-1.7a.767.767 0 01-.757-.76v-3.593a2.138 2.138 0 01-.632-1.538c0-1.14.881-2.12 2.001-2.165a7.84 7.84 0 01.476 0c1.12.046 2 1.025 2 2.165 0 .6-.232 1.145-.632 1.538zM14.72 10.5H5.264V8.129c0-2.613 2.122-4.773 4.728-4.773 2.605 0 4.728 2.16 4.728 4.773v2.37z"/></svg>
                                <input
                                  className={classNames(
                                    "inputLineField",
                                    (this.state.validation.password || this.state.errRed.includes('password')) && "inputLineField--error",
                                  )}
                                  type="password"
                                  value={this.state.password}
                                  ref={ref => this.password = ref}
                                  name="password"
                                  onChange={this.onChange}
                                />
                                {
                                  this.state.validation.password && (
                                    <div className="inputLineError">
                                      <svg className="error-img" width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.708 4l3.145 3.145a.5.5 0 11-.707.707L4 4.707.854 7.852a.5.5 0 11-.707-.707l3.146-3.146L.147.853A.5.5 0 11.854.146L4 3.292 7.146.146a.499.499 0 01.707 0 .5.5 0 010 .707L4.708 4z" /><defs><clipPath id="clip0"><path transform="matrix(1 0 0 -1 0 8)" d="M0 0h8v8H0z"/></clipPath></defs></svg>
                                      &nbsp;
                                      {this.state.validation.password}
                                    </div>
                                  )
                                }
                            </div>
                        </td>
                    </tr>}
                    {this.state.signUp && <tr>
                        <td className="withMargin">
                            <div className="justLine" style={{
                                textAlign: "left",
                                color: this.state.errRed.some(name => name == "passwordСonfirm") ? "#F52C2C" : "#696969",
                                fontSize: "10pt"
                            }}>
                                {this.state.signUp ? <div style={{marginBottom: "4px"}}>Повторите пароль</div> : <br/>}
                            </div>
                            <div className="inputLine">
                                <svg className={classNames("inputLineSvg", (this.state.validation.passwordСonfirm || this.state.errRed.includes('passwordСonfirm')) && "inputLineSvg--error")} width="15" height="20" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.566 10.5h-.506V8.129c0-4.386-3.48-8.05-7.83-8.127a17.613 17.613 0 00-.476 0c-4.35.078-7.83 3.741-7.83 8.127v2.37h-.506C.637 10.5 0 11.306 0 12.3v11.893C0 25.187.637 26 1.418 26h17.148c.78 0 1.418-.813 1.418-1.807V12.3c0-.994-.637-1.8-1.418-1.8zM11.6 18.235v3.593c0 .412-.345.76-.757.76h-1.7a.767.767 0 01-.757-.76v-3.593a2.138 2.138 0 01-.632-1.538c0-1.14.881-2.12 2.001-2.165a7.84 7.84 0 01.476 0c1.12.046 2 1.025 2 2.165 0 .6-.232 1.145-.632 1.538zM14.72 10.5H5.264V8.129c0-2.613 2.122-4.773 4.728-4.773 2.605 0 4.728 2.16 4.728 4.773v2.37z"/></svg>
                                <input
                                  className={classNames(
                                    "inputLineField",
                                    (this.state.validation.passwordСonfirm || this.state.errRed.includes('passwordСonfirm')) && "inputLineField--error",
                                  )}
                                  type="password"
                                  value={this.state.passwordСonfirm}
                                  ref={ref => this.passwordСonfirm = ref}
                                  name="passwordСonfirm"
                                  onChange={this.onChange}
                                />
                                {
                                  this.state.validation.passwordСonfirm && (
                                    <div className="inputLineError">
                                      <svg className="error-img" width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.708 4l3.145 3.145a.5.5 0 11-.707.707L4 4.707.854 7.852a.5.5 0 11-.707-.707l3.146-3.146L.147.853A.5.5 0 11.854.146L4 3.292 7.146.146a.499.499 0 01.707 0 .5.5 0 010 .707L4.708 4z" /><defs><clipPath id="clip0"><path transform="matrix(1 0 0 -1 0 8)" d="M0 0h8v8H0z"/></clipPath></defs></svg>
                                      &nbsp;
                                      {this.state.validation.passwordСonfirm}
                                    </div>
                                  )
                                }
                            </div>
                        </td>
                    </tr>}
                    <tr>
                        <td>
                            {!this.state.showTwoFactor && <div className="justLine withErrX">
                              {
                                this.state.errMsg && (
                                  <div className="msg-block">
                                    {
                                      this.state.errRed.length !== 0
                                      ? (<svg className="msg-img--error" width="8" height="8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.708 4l3.145 3.145a.5.5 0 11-.707.707L4 4.707.854 7.852a.5.5 0 11-.707-.707l3.146-3.146L.147.853A.5.5 0 11.854.146L4 3.292 7.146.146a.499.499 0 01.707 0 .5.5 0 010 .707L4.708 4z" /><defs><clipPath id="clip0"><path transform="matrix(1 0 0 -1 0 8)" d="M0 0h8v8H0z"/></clipPath></defs></svg>)
                                      : (<svg className="msg-img--success" width="11" height="11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.839 1.622a.55.55 0 00-.778 0l-6.59 6.59L.94 5.678a.55.55 0 00-.778.777l2.922 2.922a.55.55 0 00.778 0L10.839 2.4a.55.55 0 000-.778z" /><defs><clipPath id="clip0"><path d="M0 0h11v11H0z"/></clipPath></defs></svg>)
                                    }
                                    &nbsp;
                                    <span className={classNames(
                                      this.state.errRed.length !== 0
                                        ? "msg-text--error"
                                        : "msg-text--success"
                                      )}
                                    >
                                      {this.state.errMsg}
                                    </span>
                                  </div>
                                )
                              }
                            </div>}
                            <button
                                type="submit"
                                className="bodyButton"
                                disabled={this.getSubmitButtonIsDisabled()}
                            >
                              {
                                (this.state.signUp && "Зарегистрироваться")
                                || (this.state.forget && "Отправить ссылку на восстановление")
                                || "Войти"
                              }
                            </button>
                            <div className="justLine"
                                 style={{textAlign: "left", color: "#F52C2C", fontSize: "10pt"}}>
                                <br/>
                            </div>
                        </td>
                    </tr>
                    {!this.state.signUp && <tr>
                        <td className="withLine footerTd">
                            <div className="justLine">
                                <div style={{float: "left"}}>
                                    {!this.state.signUp && !this.state.forget &&
                                    <button type="button" className="headerButton" onClick={this.toggleForget}>Забыли
                                        пароль?</button>}
                                    {this.state.forget &&
                                    <button type="button" className="headerButton" onClick={this.toggleForget}>Войти</button>}
                                </div>
                            </div>
                        </td>
                    </tr>}
                    </tbody>
                </table>
            </form>
        );
    }
}

export default AuthBar;
