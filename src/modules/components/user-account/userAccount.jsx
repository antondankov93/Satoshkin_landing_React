import React, { Component, useState, useEffect, useContext} from 'react';
import {getData} from '../../../services/httpget';
import s from './userAccount.module.scss';
import {Button, Col, Container, Row, Modal} from 'react-bootstrap';
import ChangePassword from '../../../ChangePassword';
import Loader from '../../../loader/Loader';
import {NavHashLink as NavLink} from 'react-router-hash-link';
import BuyingComponent from "../tariffs/buying-component/buyingComponent";
import { getDeclension } from '../../../utils/generateData';


class UserAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {privileges: []},
            modal: false,
            modalTwo: false,
            loading: true
        }
    }

    componentDidMount = () => {
        getData("/api/me/").then(response => {
            this.setState({
                user: response.user,
                loading: false,
            })
        })
    };

    showModal = (showed) => {
        this.setState({
            modal: showed
        })
    };

    showModalTwo = (showed) => {
        this.setState({
            modalTwo: showed
        })
    };

    goto = (url) => {
        getData('/api/setToken').then(response => {
            let {oneTimeToken} = response
            if (oneTimeToken) window.location.href = `${url}api/auth/login?oneTimeToken=${oneTimeToken}`
        })
    };

    render = () => {
        const {user, loading} = this.state;
        const {privileges, currentTariff} = user;
        //краткий расчёт остатка дней и часов
        const currentDay = (new Date(currentTariff != undefined ? currentTariff.tariffExpiretionDate : "") - new Date().getTime())/(1000 * 60 * 60 * 24);
        const expirationDays = Math.floor(currentDay);
        const expirationHours = Math.floor(((currentDay-expirationDays).toFixed(2))*24);
        //склонение дней и часов
        const daysDeclination = getDeclension(expirationDays, 'days');
        const hoursDeclination = getDeclension(expirationHours, 'hours');

    if (loading)
        return (
            <div style={{height: "80vh"}}>
                <Loader/>
            </div>
        );
    if (!loading)
        return (
            <div className={s.mainWrapper}>
                <Row className={s.row}>
                    <Col lg={{span: 10, offset: 1}}>
                        <Row>
                            <Col xs={12} lg={3} className={s.header}>Личный кабинет</Col>
                        </Row>
                        <Row>
                            <Col className={s.accountItems}>
                                <br/><br/><br/>
                                <div className={s.changePassword}>
                                    <Button onClick={() => this.showModal(true)}>Изменить пароль</Button>
                                    <Modal
                                        show={this.state.modal}
                                        onHide={() => this.showModal(false)}
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                    >
                                        <Modal.Header closeButton>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="authBody">
                                                <ChangePassword close={() => this.showModal(false)}/>
                                            </div>
                                        </Modal.Body>
                                    </Modal>
                                </div>

                                <div className={s.buy}>
                                    {Object.keys(currentTariff).length > 0 && (
                                        <Row>
                                            <Col lg={{span: 6, offset: 1}}>
                                                <Row>
                                                    <div>
                                                      {`Ваш тариф: ${currentTariff.name}. До истечения срока подписки осталось: ${expirationDays} ${daysDeclination} ${expirationHours} ${hoursDeclination}`}
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <Col lg={3}>
                                                        <Button onClick={() => this.showModalTwo(true)}>Продлить подписку</Button>
                                                        <Modal
                                                            show={this.state.modalTwo}
                                                            onHide={() => this.showModalTwo(false)}
                                                            size="lg"
                                                            aria-labelledby="contained-modal-title-vcenter"
                                                            centered
                                                        >
                                                            <Modal.Header closeButton>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                    <BuyingComponent tariff={currentTariff.name}/>
                                                            </Modal.Body>
                                                        </Modal>
                                                    </Col>
                                                    <Col lg={3}><NavLink className={s.buyIfYouNot} smooth to="/#tariff">Сменить
                                                        тариф</NavLink></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    )}
                                    {Object.keys(currentTariff).length === 0 && privileges.length === 0 && (
                                        <Row>
                                            <Col lg={12} style={{marginBottom: "50px"}}>На данный момент у вас нет активного тарифа.</Col>
                                            <Col xs={12} lg={6}>
                                                <Row>
                                                    <Col xs={12} lg={6} style={{marginBottom: "50px"}}>Приобретите подписку:</Col>
                                                    <Col xs={12} lg={6}><NavLink className={s.buyIfYouNot} smooth to="/#tariff">Купить
                                                        подписку</NavLink></Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    )}

                                    <React.Fragment>
                                        <br/>
                                        {privileges.length > 0 && <>Переход в:<br/></>}
                                        {privileges.map(privilege => {
                                            switch (privilege) {
                                                case "satoshkin":
                                                    return <React.Fragment>
                                                        <button className="bodyButton"
                                                                onClick={() => this.goto("https://satoshkin.com/")}>Satoshkin
                                                            BOT
                                                        </button>
                                                        <br/></React.Fragment>
                                                    // break;
                                                case "satoshkin_dev":
                                                    return <React.Fragment>
                                                        <button className="bodyButton"
                                                                onClick={() => this.goto("https://stage.satoshkin.com/")}>Satoshkin
                                                            Stage
                                                        </button>
                                                        <br/></React.Fragment>
                                                    // break;
                                                case "bitcount_write":
                                                    return <React.Fragment>
                                                        <button className="bodyButton"
                                                                onClick={() => this.goto("https://bitcount.satoshkin.com/")}>Bitcount
                                                        </button>
                                                        <br/></React.Fragment>
                                                    // break;
                                                default:
                                                    break;
                                            }
                                        })}
                                    </React.Fragment>
                                </div>
                                <br/><br/><br/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UserAccount;