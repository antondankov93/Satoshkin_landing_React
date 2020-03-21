import React, { Component, useState, useEffect, useContext} from 'react';
import {Row, Col, Container} from "react-bootstrap";
import s from './WebConferencePromotion.module.scss'
import {NavHashLink as NavLink} from 'react-router-hash-link';
import BuyingComponent from "../tariffs/buying-component/buyingComponent";


const  WebConferencePromotion = () => {
    return (
            <Row className={s.mainWrapper}>
               <Col lg={{span:10, offset: 1}} className={s.colWrapper}>
                   <Row className={s.content}>
                       <h2>Как автоматизировать трейдинг на  P2P-платформах?</h2>
                       <div className={s.underHeader}>Об этом мы расскажем на бесплатном вебинаре уже в это воскресенье, в 16:00 по Москве.</div>
                   </Row>

                   <Row className={s.promotionList}>
                       <Col className={s.promotionListItem} lg={{span:10, offset: 1}}>Какие боты для автоматизации P2P-трейдинга есть на рынке</Col>
                       <Col className={s.promotionListItem} lg={{span:10, offset: 1}}>Функционал и возможности бота Satoshkin</Col>
                       <Col className={s.promotionListItem} lg={{span:10, offset: 1}}>С какими P2P-платформами работает Satoshkin и какие интеграции ожидаются в ближайшее время</Col>
                       <Col className={s.promotionListItem} lg={{span:10, offset: 1}}>Как начать использовать бота - мы в прямом эфире подключим аккаунты P2P-платформ
                           к боту и настроим объявления</Col>
                   </Row>

                   <Row className={s.specialOffer}>
                       Для участников вебинара мы предложим ОСОБЫЕ условия подключения!
                   </Row>

                   <Row >
                        <a className={s.registrationLink} href='http://info.satoshkin.com/vebinar9_03'>Регистрация на вебинар</a>
                   </Row>
               </Col>
            </Row>
    )
}
export default WebConferencePromotion;