import React from "react";
import {Grid, Col, Row} from 'react-flexbox-grid';
import {localBitcoins_guide} from "./localbBitcoinsGuide-data";
import s from './localbitcoinsGuide.module.scss';
import LocalBitcoinsGuideItem from "./localBitcoinsGuideItem/localBitcoinsGuideItem"


const LocalbitcoinsGuide = () => {
    const LocalBitcoinsItems = localBitcoins_guide.map(i => <LocalBitcoinsGuideItem propsData={i}/>)
    return (
        <Row>
            <Col className={s.mainWrapper} lgOffset={1} lg={10}>
                <Row center="lg">
                    <Col className={s.header} lg={8}>
                        <div className={s.mainHeadline}>Добавление аккаунта Localbitcoins</div>
                        <div className={s.underHeadline}>В данном гайде мы расскажем,
                            как добавить добавить аккаунт и ключи на LocalBitcoins.net
                        </div>
                    </Col>
                </Row>
                <Row middle="lg" className={s.accountItems}>
                    <Col lg={8} lgOffset={2} className={s.warning}>ВНИМАНИЕ! Для добавления аккаунта необходимо наличие
                        двухфакторной аутентификации!</Col>
                    <Col lgOffset={1} lg={10}>{LocalBitcoinsItems}</Col>
                </Row>
                <Row middle="lg" className={s.under13image}>
                    <Col lg={10} lgOffset={2}>
                        <Row>
                            <Col lg={10}>В открывшемся окне появился ваш персональный Secret-код</Col>
                            <Col lg={10}><img
                                src={require("../../../assets/image-for-guides/LocalBitcoins/image14.jpg")}
                                alt=""/></Col>
                            <Col lg={10}>Скопируйте его, снова введите код двухфакторной аутентификации и
                                нажмите
                                кнопку «Save changes»</Col>
                            <Col className={s.forMargins} lg={10}>14) Введите скопированный Secret-код в поле secret Satoshkin’a и
                                нажмите
                                «Отправить»</Col>
                            <Col lg={10}>15) Поздравляем, ваш аккаунт успешно добавлен и может использоваться в
                                Satoshkin BETA.</Col></Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default LocalbitcoinsGuide;