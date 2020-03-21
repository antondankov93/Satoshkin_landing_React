import React from 'react';
import './App.scss';
import { getData } from './services/httpget';
import cookie from 'react-cookies'
import {Modal} from 'react-bootstrap';
// import { URL } from 'url';
// import Cookies from 'js-cookie';

class Redirector extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      privileges: [],
      backURL: cookie.load('backURL') || ''
    }
  }

  passThrough = () => {
    getData('/api/setToken').then(response => {
      let { oneTimeToken } = response
      if (this.state.backURL && this.state.backURL != this.props.location && this.state.backURL != 'accounts.satoshkin.com')
      if (oneTimeToken) {
        this.props.goTo(this.state.backURL, oneTimeToken)
      }
    })
  }

  goTo = (url) => {
    getData('/api/setToken').then(response => {
      let { oneTimeToken } = response
      if (oneTimeToken) {
        this.props.goTo(url, oneTimeToken)
      }
    })
  }

  componentDidMount = () => {
    getData('/api/me').then(response => {
      let { user } = response
      let { privileges } = user
      this.setState({
        privileges
      }, () => {
        if (this.state.backURL) {
          switch (this.state.backURL) {
            case "https://satoshkin.com/":
              if (this.state.privileges.some(priv => priv == "satoshkin")) this.passThrough()
              break;
            case "https://stage.satoshkin.com/":
              if (this.state.privileges.some(priv => priv == "satoshkin_dev")) this.passThrough()
              break;
            case "https://bitcount.satoshkin.com/":
              if (this.state.privileges.some(priv => priv == "bitcount_read" || priv == "bitcount_write")) this.passThrough()
              break;
            default: 
            break;
          }
        }
      })
    })
  }

  render = () => {
    let backAccess = false
    switch (this.state.backURL) {
      case "https://satoshkin.com/":
        if (this.state.privileges.some(priv => priv == "satoshkin")) backAccess = true
        else backAccess = false
        break;
      case "https://stage.satoshkin.com/":
        if (this.state.privileges.some(priv => priv == "satoshkin_dev")) backAccess = true
        else backAccess = false
        break;
      case "https://bitcount.satoshkin.com/":
        if (this.state.privileges.some(priv => priv == "bitcount_write")) backAccess = true
        else backAccess = false
        break;
      default: backAccess = true;
    }

    return (<div className="redirector">
      {this.state.backURL && <Modal
          show={backAccess}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
              <div className="authBody">
                <button className="headerButton" onClick={this.passThrough}>redirecting to {this.state.backURL}...</button><br/>
              </div>
          </Modal.Body>
      </Modal>}
    </div>)
    // return (<React.Fragment> 
    //     <br/>
    //     {this.state.backURL && backAccess && <React.Fragment><button className="headerButton" onClick={this.passThrough}>redirecting to {this.state.backURL}...</button><br/></React.Fragment>}
    //     <br/>
    //     {this.state.privileges.map(privilege => {
    //       switch (privilege) {
    //         case "satoshkin":
    //           if (this.state.backURL != "https://satoshkin.com/") return <React.Fragment><button className="bodyButton" onClick={() => this.goTo("https://satoshkin.com/")}>Satoshkin</button><br/></React.Fragment>
    //           break;
    //         case "satoshkin_dev":
    //           if (this.state.backURL != "https://stage.satoshkin.com/") return <React.Fragment><button className="bodyButton" onClick={() => this.goTo("https://stage.satoshkin.com/")}>Satoshkin Stage</button><br/></React.Fragment>
    //           break;
    //         case "bitcount_write":
    //           if (this.state.backURL != "https://bitcount.contpan.cf/") return <React.Fragment><button className="bodyButton" onClick={() => this.goTo("https://bitcount.contpan.cf/")}>Bitcount</button><br/></React.Fragment>
    //           break;
    //         default:
    //           break;
    //       }
    //     })}
    //   </React.Fragment>
    // );
  }
}

export default Redirector;
