import React from "react";
import {Route, Switch} from "react-router-dom";
import TariffsComponent from "./components/tariffs/tariffsComponent";
import CreatingNow from "./components/creating-now/creatingNow";
import Iframe from "./pages/graph/iframe";
import Exchanges from "./pages/exchanges/exhcanges";
import AccountSettingsGuide from "./pages/guides/accountSettingsGuide/accountSettingsGuide";
import TwoFaGuide from "./pages/guides/2FAGuide/twoFaGuide";
import MainLanding from "./pages/MAIN-LANDING/mainLanding";
import BitzlatoGuide from "./pages/guides/bitzlatoGuide/bitzlatoGuide";
import LocalbitcoinsGuide from "./pages/guides/localbitcoinsGuide/localbitcoinsGuide";
import PaxfulGuide from "./pages/guides/paxfulGuide/paxfulGuide";
import UserAccount from "./components/user-account/userAccount";

const MainRoute = (props) => {

    return(
          <Switch>
            <Route exact path='/' render={() => <MainLanding />}/>
            <Route path='/redirect' render={() => <MainLanding redirector={true}/>}/>
            <Route path='/tariffs' render={() => <TariffsComponent/>}/>
            <Route path='/user-account' render={() => props.auth ? <UserAccount goTo={props.goTo}/> : <MainLanding/>}/>
            <Route path='/about-us' render={() => <CreatingNow/>}/>
            <Route path='/function' render={() => <CreatingNow/>}/>
            <Route path='/feedback' render={() => <CreatingNow/>}/>
            <Route path='/exchanges' render={() => <Exchanges/>}/>
            <Route path='/graph' render={() => <Iframe/>}/>
            <Route path='/guide-account' render={() => <AccountSettingsGuide/>}/>
            <Route path='/guide-2FA' render={() => <TwoFaGuide/>}/>
            <Route path='/bitzlato-guide' render={() => <BitzlatoGuide/>}/>
            <Route path='/localbitcoins-guide' render={() => <LocalbitcoinsGuide/>}/>
            <Route path='/paxful-guide' render={() => <PaxfulGuide/>}/>
          </Switch>
    )
}


/*

<Switch>
        <Route exact path='/' render={() => <MainLanding {/!*showSignUp={props.showSignUp} auth={props.auth}*!/}/>}/>
        <Route path='/redirect' render={() => <MainLanding showSignUp={props.showSignUp} auth={props.auth} goTo={props.goTo} redirector={true}/>}/>
        <Route path='/tariffs' render={() => <TariffsComponent/>}/>
        <Route path='/user-account' render={() => props.auth ? <UserAccount goTo={props.goTo}/> : <MainLanding showSignUp={props.showSignUp} auth={props.auth}/>}/>
        <Route path='/about-us' render={() => <CreatingNow/>}/>
        <Route path='/function' render={() => <CreatingNow/>}/>
        <Route path='/feedback' render={() => <CreatingNow/>}/>
        <Route path='/exchanges' render={() => <Exchanges/>}/>
        <Route path='/graph' render={() => <Iframe/>}/>
        <Route path='/guide-account' render={() => <AccountSettingsGuide/>}/>
        <Route path='/guide-2FA' render={() => <TwoFaGuide/>}/>
        <Route path='/bitzlato-guide' render={() => <BitzlatoGuide/>}/>
        <Route path='/localbitcoins-guide' render={() => <LocalbitcoinsGuide/>}/>
        <Route path='/paxful-guide' render={() => <PaxfulGuide/>}/>
</Switch>
*/

export default MainRoute;