import React from 'react';
import './App.scss';
import { getData, postData } from './services/httpget';
import cookie from 'react-cookies'
// import Cookies from 'js-cookie';

class ChangePassword extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
        newPassword: "",
        oldPassword: "",
        passwordConfirmation: "",
        backURL: cookie.load('backURL') || '',
        errMsg: "",
        errRed: [],
    }
  }

  onChange = (e)=> {
    const {name, value} = e.target
    this.setState({
        [name]: value,
    }) 
  }

  confirm = () => {
    const { oldPassword, newPassword, passwordConfirmation } = this.state
    if (oldPassword && newPassword && passwordConfirmation) {
      if (oldPassword == newPassword) {
        this.setState({ 
          errMsg: "Новый пароль должен отличаться",
          errRed: ["oldPassword", "newPassword"]
        }, () => {
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            this.setState({
              errMsg: "",
              errRed: []
            })
            clearInterval(this.timer)
          }, 5000)
        })
      } else if (newPassword == passwordConfirmation) {
          postData('/api/changePassword', {oldPassword, newPassword}).then(result => {
              if (result.success) {
                this.setState({ 
                    errMsg: "Пароль успешно изменён",
                    errRed: [],
                }, () => {
                  clearInterval(this.timer)
                  this.timer = setInterval(() => {
                    this.setState({
                      errMsg: "",
                      errRed: []
                    })
                    clearInterval(this.timer)
                  }, 5000)
                })
              } else {
                this.setState({
                  errMsg: "Проверьте правильность старого пароля",
                  errRed: ["oldPassword"]
                }, () => {
                  clearInterval(this.timer)
                  this.timer = setInterval(() => {
                    this.setState({
                      errMsg: "",
                      errRed: []
                    })
                    clearInterval(this.timer)
                  }, 5000)
                })
              }
          })
      } else {
        this.setState({
          errMsg: "Пароли не совпадают",
          errRed: ["newPassword", "passwordConfirmation"]
        }, () => {
          clearInterval(this.timer)
          this.timer = setInterval(() => {
            this.setState({
              errMsg: "",
              errRed: []
            })
            clearInterval(this.timer)
          }, 5000)
        })
      }
    } else {
      let errRed = []
      if (!oldPassword) errRed.push("oldPassword")
      if (!newPassword) errRed.push("newPassword")
      if (!passwordConfirmation) errRed.push("passwordConfirmation")
      this.setState({
        errMsg: "Вы пропустили поле",
        errRed,
      }, () => {
        clearInterval(this.timer)
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

  render = () => {
    return (<div className="AppRound">
        <table>
          <tbody>
            <tr className="title">
              <td className="titleTd">
                <div className="justLine">
                  <div style={{textAlign: "center", fontWeight: "900"}}>Сменить пароль</div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="withLine withMargin">
                <div className="justLine" style={{textAlign: "left", color: this.state.errRed.some(name => name == "oldPassword") ? "#F52C2C" : "#696969", fontSize: "10pt"}}> 
                  <div style={{marginBottom: "4px"}}>Старый пароль</div>
                </div>
                <div className="inputLine" style={{border: this.state.errRed.some(name => name == "oldPassword") && "1px solid #F52C2C"}}> 
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <svg width="15" height="20" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5661 10.4999H18.0595V8.12879C18.0595 3.74328 14.5793 0.0798056 10.2295 0.00160252C10.1106 -0.000534174 9.87313 -0.000534174 9.75433 0.00160252C5.4044 0.0798056 1.92425 3.74328 1.92425 8.12879V10.4999H1.41759C0.636842 10.4999 0 11.3055 0 12.3005V24.1929C0 25.1868 0.636842 26 1.41764 26H18.5661C19.3469 26 19.9838 25.1868 19.9838 24.1929V12.3005C19.9838 11.3056 19.3469 10.4999 18.5661 10.4999ZM11.5985 18.2347V21.8281C11.5985 22.2396 11.254 22.5878 10.8422 22.5878H9.14169C8.72984 22.5878 8.38535 22.2396 8.38535 21.8281V18.2347C7.98595 17.8415 7.75343 17.2979 7.75343 16.6965C7.75343 15.5569 8.63433 14.5777 9.75439 14.5324C9.87308 14.5276 10.1108 14.5276 10.2295 14.5324C11.3496 14.5777 12.2305 15.5569 12.2305 16.6965C12.2304 17.2979 11.9979 17.8415 11.5985 18.2347ZM14.7204 10.4999H10.2295H9.75433H5.26343V8.12879C5.26343 5.51641 7.38645 3.35637 9.99188 3.35637C12.5973 3.35637 14.7204 5.51641 14.7204 8.12879V10.4999H14.7204Z"
                            fill={this.state.errRed.some(name => name == "oldPassword") ? "#F52C2C" : "#4D6299"}/>
                          </svg>
                        </td>
                        <td>
                            <input className="pass" type="password" value={this.state.oldPassword} ref={ref => this.oldPassword = ref} name="oldPassword" onChange={this.onChange} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td className="withMargin">
                <div className="justLine" style={{textAlign: "left", color: this.state.errRed.some(name => name == "newPassword") ? "#F52C2C" : "#696969", fontSize: "10pt"}}> 
                  <div style={{marginBottom: "4px"}}>Новый пароль</div>
                </div>
                <div className="inputLine" style={{border: this.state.errRed.some(name => name == "newPassword") && "1px solid #F52C2C"}}> 
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <svg width="15" height="20" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5661 10.4999H18.0595V8.12879C18.0595 3.74328 14.5793 0.0798056 10.2295 0.00160252C10.1106 -0.000534174 9.87313 -0.000534174 9.75433 0.00160252C5.4044 0.0798056 1.92425 3.74328 1.92425 8.12879V10.4999H1.41759C0.636842 10.4999 0 11.3055 0 12.3005V24.1929C0 25.1868 0.636842 26 1.41764 26H18.5661C19.3469 26 19.9838 25.1868 19.9838 24.1929V12.3005C19.9838 11.3056 19.3469 10.4999 18.5661 10.4999ZM11.5985 18.2347V21.8281C11.5985 22.2396 11.254 22.5878 10.8422 22.5878H9.14169C8.72984 22.5878 8.38535 22.2396 8.38535 21.8281V18.2347C7.98595 17.8415 7.75343 17.2979 7.75343 16.6965C7.75343 15.5569 8.63433 14.5777 9.75439 14.5324C9.87308 14.5276 10.1108 14.5276 10.2295 14.5324C11.3496 14.5777 12.2305 15.5569 12.2305 16.6965C12.2304 17.2979 11.9979 17.8415 11.5985 18.2347ZM14.7204 10.4999H10.2295H9.75433H5.26343V8.12879C5.26343 5.51641 7.38645 3.35637 9.99188 3.35637C12.5973 3.35637 14.7204 5.51641 14.7204 8.12879V10.4999H14.7204Z"
                            fill={this.state.errRed.some(name => name == "newPassword") ? "#F52C2C" : "#4D6299"}/>
                          </svg>
                        </td>
                        <td>
                            <input className="pass" type="password" value={this.state.newPassword} ref={ref => this.newPassword = ref} name="newPassword" onChange={this.onChange} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td className="withMargin">
                <div className="justLine" style={{textAlign: "left", color: this.state.errRed.some(name => name == "passwordConfirmation") ? "#F52C2C" : "#696969", fontSize: "10pt"}}> 
                  <div style={{marginBottom: "4px"}}>Повторите пароль</div>
                </div>
                <div className="inputLine" style={{border: this.state.errRed.some(name => name == "passwordConfirmation") && "1px solid #F52C2C"}}> 
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <svg width="15" height="20" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.5661 10.4999H18.0595V8.12879C18.0595 3.74328 14.5793 0.0798056 10.2295 0.00160252C10.1106 -0.000534174 9.87313 -0.000534174 9.75433 0.00160252C5.4044 0.0798056 1.92425 3.74328 1.92425 8.12879V10.4999H1.41759C0.636842 10.4999 0 11.3055 0 12.3005V24.1929C0 25.1868 0.636842 26 1.41764 26H18.5661C19.3469 26 19.9838 25.1868 19.9838 24.1929V12.3005C19.9838 11.3056 19.3469 10.4999 18.5661 10.4999ZM11.5985 18.2347V21.8281C11.5985 22.2396 11.254 22.5878 10.8422 22.5878H9.14169C8.72984 22.5878 8.38535 22.2396 8.38535 21.8281V18.2347C7.98595 17.8415 7.75343 17.2979 7.75343 16.6965C7.75343 15.5569 8.63433 14.5777 9.75439 14.5324C9.87308 14.5276 10.1108 14.5276 10.2295 14.5324C11.3496 14.5777 12.2305 15.5569 12.2305 16.6965C12.2304 17.2979 11.9979 17.8415 11.5985 18.2347ZM14.7204 10.4999H10.2295H9.75433H5.26343V8.12879C5.26343 5.51641 7.38645 3.35637 9.99188 3.35637C12.5973 3.35637 14.7204 5.51641 14.7204 8.12879V10.4999H14.7204Z"
                            fill={this.state.errRed.some(name => name == "passwordConfirmation") ? "#F52C2C" : "#4D6299"}/>
                          </svg>
                        </td>
                        <td>
                            <input className="pass" type="password" value={this.state.passwordConfirmation} ref={ref => this.passwordConfirmation = ref} name="passwordConfirmation" onChange={this.onChange} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="justLine withErrX" style={{textAlign: "left", color: this.state.errRed.length == 0 ? "#24BA69" : "#F52C2C", fontSize: "10pt"}}> 
                  {this.state.errMsg && this.state.errRed.length != 0 && <React.Fragment>
                    <svg verticalAlign="auto" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0)">
                        <path d="M4.70751 3.99911L7.85341 7.14501C8.04886 7.34029 8.04886 7.65715 7.85341 7.85243C7.65796 8.04789 7.34144 8.04789 7.14598 7.85243L4.00008 4.70653L0.854016 7.85243C0.658564 8.04789 0.34204 8.04789 0.146589 7.85243C-0.0488629 7.65715 -0.0488629 7.34029 0.146589 7.14501L3.29266 3.99911L0.146589 0.853205C-0.0488629 0.65792 -0.0488629 0.341062 0.146589 0.145777C0.244314 0.0482179 0.372392 -0.000645295 0.500302 -0.000645295C0.628213 -0.000645295 0.75629 0.0482178 0.854016 0.145944L4.00008 3.29185L7.14598 0.145944C7.24371 0.0482178 7.37179 -0.000645295 7.4997 -0.000645295C7.62761 -0.000645295 7.75569 0.0482178 7.85341 0.145944C8.04886 0.341228 8.04886 0.658087 7.85341 0.853371L4.70751 3.99911Z" fill="#F52C2C"/>
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="8" height="8" fill="white" transform="matrix(1 0 0 -1 0 8)"/>
                        </clipPath>
                      </defs>
                    </svg>&nbsp;
                  </React.Fragment>}
                  {this.state.errMsg && this.state.errRed.length == 0 && <React.Fragment>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0)">
                        <path d="M10.8389 1.62204C10.6241 1.40724 10.2759 1.40724 10.0611 1.62204L3.47176 8.21145L0.938921 5.67861C0.724142 5.46381 0.375923 5.46383 0.161101 5.67861C-0.0537002 5.89339 -0.0537002 6.24161 0.161101 6.45641L3.08285 9.37811C3.29756 9.59289 3.64604 9.59274 3.86067 9.37811L10.8389 2.39986C11.0537 2.18508 11.0537 1.83684 10.8389 1.62204Z" 
                        fill="#24BA69"/>
                      </g>
                      <defs>
                        <clipPath id="clip0">
                          <rect width="11" height="11" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>&nbsp;
                  </React.Fragment>}
                  {this.state.errMsg ? this.state.errMsg : <br/>}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="justLine"> 
                  <button style={{float: "left"}} className="bodyButton" onClick={this.confirm}>Подтвердить</button>
                  <button style={{float: "right"}} className="bodyButton" onClick={this.props.close}>Отмена</button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="justLine withErrX" style={{textAlign: "left", color: "#F52C2C", fontSize: "10pt"}}> 
                  <br/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ChangePassword;
