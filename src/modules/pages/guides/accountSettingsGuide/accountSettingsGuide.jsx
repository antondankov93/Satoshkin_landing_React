import React from "react";
import {Row, Col} from 'react-flexbox-grid';
import {settings_guide} from "./accountSettingGuide-data";
import s from './accountSettingsGuide.module.scss';
import AccountGuideItem from "./accountGuideItem/accountGuideItem";


const AccountSettingsGuide = () => {
    const AccountGuideItems = settings_guide.map(i => <AccountGuideItem propsData={i}/>)
    return (
        <Row >
            <Col  className={s.mainWrapper} lgOffset={1} lg={10}>
                <Row center="lg">
                    <Col  className={s.header}  lg={10}>
                        <div className={s.mainHeadline}>Краткий гайд по настройкам Satoshkin BETA</div>
                        <div className={s.underHeadline}>Мы поможем Вам с настройкой Вашего аккаунта</div>
                    </Col>
                </Row>
                <Row className={s.accountItems}>
                    <Col lgOffset={1} lg={10}>{AccountGuideItems}</Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AccountSettingsGuide;