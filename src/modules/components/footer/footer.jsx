import React from 'react';
import s from './footer.module.scss'
import {Container, Row, Col, DropdownButton, DropdownItem} from "react-bootstrap";
import { NavHashLink as NavLink } from 'react-router-hash-link';


const Footer = () => {
    return (
        <Container fluid className={s.mainFooterWrapper}>
            <Row className={s.footerWrapper}>
                <Col xs={{span: 12, offset: 0}} md={{span: 10, offset: 1}} lg={{span: 10, offset: 1}}>
                        <Row>
                        {/*-------------------------------------------------LOGO+robovladelets------------------------------------------------------*/}
                        <Col xs={{span: 12, offset: 0}} md={{span: 12, offset: 0}} lg={{span: 2, offset: 0}}
                             className={s.footerItemsWithLogo}>
                            <Row className={s.footerLogosWraper}>
                                <Col md={12} lg={12} className={s.logoFooter}>
                                    <div><NavLink smooth to="/#header"><img
                                        src={require("../../assets/images/mainLogoWhite.svg")}
                                        alt="mainlogo"/></NavLink>
                                    </div>
                                    <div className={s.logoDate}>© 2019-2020</div>
                                </Col>
                                <Col md={12} lg={12}>
                                </Col>
                            </Row>
                            <Row className={s.conventionAndDropDown}>
                                <Col md={{span: 9, offset: 3}} lg={{span: 12, offset: 0}} className={s.dropDown}>
                                    <DropdownButton
                                        drop="right"
                                        variant="secondary"
                                        title="Документация"
                                        id="dropdown-button-drop-right"
                                        key="right">
                                        <DropdownItem><NavLink smooth to="/guide-account#header">Настройки
                                            Сатошкина</NavLink></DropdownItem>
                                        <DropdownItem><NavLink smooth to="/bitzlato-guide#header">Добавление
                                            аккаунта
                                            Bitzlato</NavLink></DropdownItem>
                                        <DropdownItem><NavLink smooth to="/paxful-guide#header">Добавление аккаунта
                                            Paxful</NavLink></DropdownItem>
                                        <DropdownItem><NavLink smooth to="/localbitcoins-guide#header">Добавление
                                            аккаунта
                                            Localbitcoins</NavLink></DropdownItem>
                                        <DropdownItem><NavLink smooth to="/guide-2FA#header">Включение 2ФА на
                                            Localbitcoins</NavLink></DropdownItem>
                                    </DropdownButton>
                                </Col>
                                <Col md={{span: 9, offset: 3}} lg={{span: 12, offset: 0}} className={s.convention}>
                                    <NavLink to="#">Условия использования</NavLink>
                                    <NavLink to="#">Конфиденциальность</NavLink>
                                    <a href="https://b24-wn8rpd.bitrix24.eu/online/satoshkinhelpdek">
                                        Техническая поддержка</a>
                                </Col>
                            </Row>
                        </Col>
                        {/*-------------------------------------------------telegramLinks------------------------------------------------------*/}
                        <Col xs={{span: 10, offset: 1}} lg={{span: 3, offset: 0}} className={s.footerItems + " " + s.telegram}>
                            <div className={s.telegramLinks}><img
                                src={require("../../assets/social-network-icons/telegram.svg")} alt=""/><a href="#">Телеграм-канал
                                Satoshkin - новости P2P-трейдинга</a></div>
                            <div className={s.telegramLinks}><img
                                src={require("../../assets/social-network-icons/telegram.svg")} alt=""/><a href="#">Чат
                                SatoshkinChat - общение трейдеров и представителей P2P-платформ</a>
                            </div>
                        </Col>

                        {/*-------------------------------------------------cryptoFiat------------------------------------------------------*/}
                        <Col md={6} lg={3} className={s.footerItems + " " + s.p2p}>
                            <h4>Криптофиатные биржи с поддержкой рубля:</h4>
                            <Row>
                                <Col xs={6} md={6} lg={6} className={s.footerP2P}>
                                    <a href="https://garantex.io/invite/MJOjdi">Garantex</a>
                                    <a href="https://exmo.me/?ref=440879">Exmo</a>
                                    <a href="https://yobit.io/?bonus=POOLa">Yobit</a>
                                    <a href="https://dsx.uk/register/?refId=fxIOo1H%2Fp5s">DSX</a>
                                </Col>
                                <Col xs={6} md={6} lg={6} className={s.footerP2P}>
                                    <a href="https://cex.io/r/0/up106574556/0/">cex.io</a>
                                    <a href="https://livecoin.net/?from=Livecoin-Cz8h5uM3">LiveCoin</a>
                                    <a href="https://www.binance.com/?ref=12189676">Binance</a>
                                    <a href="https://bitzlato.com/market?start=113BE">BitZlato</a>
                                </Col>
                            </Row>
                        </Col>

                        {/*-------------------------------------------------P2P------------------------------------------------------*/}
                        <Col md={6} lg={3} className={s.footerItems + " " + s.p2p}>
                            <h4>Все p2p-платформы:</h4>
                            <Row>
                                <Col xs={6} md={6} lg={6} className={s.footerP2P}>
                                    <a href="https://localbitcoins.com/?ch=13y91">LocalBitcoins</a>
                                    <a href="https://bitpapa.com/?ref=1t1fs">BitPapa</a>
                                    <a href="https://bisq.network/">Bisq</a>
                                    <a href="https://paxful.com/?r=a8RQeoZ3VY3">Paxful</a>
                                    <a href="https://cryptolocator.com/?ref=1t58r">Cryptolocator</a>
                                    <a href="https://totalcoin.io/invite/29e3ce5d8d4144d2ae559199d3b4cafe">TotalCoin</a>
                                    <a href="https://hodlhodl.com/join/SATOSHKIN">Hodl Hodl</a>
                                    <a href="https://bit-board.com/register?refcode=d3df6d5ff59a40324b305abaa65a0621">Bit-Board</a>
                                    <a href="https://localcoinswap.com/ru/register/?referral=ef9f96fd-c140-4a69-8867-616f762f2b53">LocalCoinSwap</a>

                                </Col>
                                <Col xs={6} md={6} lg={6} className={s.footerP2P}>
                                    <a href="https://t.me/sky_btc_bot?start=077dh">Sky Banker Bot</a>
                                    <a href="https://trade.risex.net/registration/FXZVH">RiseX</a>
                                    <a href="https://localcryptos.com/r/Qaz777">LocalCryptos</a>
                                    <a href="https://t.me/Chatex_bot?start=r_42361">Chatex</a>
                                    <a href="https://localmonero.co/?rc=yhr3">LocalMonero</a>
                                    <a href="https://agoradesk.com/?rc=yhr3">AgoraDesk</a>
                                    <a href="https://bitzlato.com/p2p?start=113BE">BitZlato WEB-версия</a>
                                    <a href="https://t.me//BTC_CHANGE_BOT?start=113BE%0A">BitZlato-TelegramBOT</a>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </Col>
            </Row>

        </Container>

    )
}

export default Footer;