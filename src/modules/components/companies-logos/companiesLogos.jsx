import React from 'react';
import s from './companiesLogos.module.scss';
import {Container, Row, Col} from 'react-bootstrap';


const CompaniesLogos = () => {
    return (
        <Container>
            <Row className={s.logoWrapper}>
                <Col lg="auto" xs="auto" className={s.logoHeader}>Сейчас Satoshkin поддерживает работу с
                    платформами:</Col>
                <Col>
                    <Row className="align-items-lg-center">
                        <Col xs={{span: 10, offset: 1}} md={{span: 6, offset: 3}} lg={{span: 4, offset: 0}}
                             className={s.logoItems}>
                            <a href="https://bitzlato.com/p2p?start=113BE"><img src={require("../../assets/images/companiesLogos3.jpg")} alt=""/></a></Col>
                        <Col xs={{span: 10, offset: 1}} md={{span: 6, offset: 0}} lg={{span: 4, offset: 0}}
                             className={s.logoItems}>
                            <a href="https://localbitcoins.com/?ch=13y91"><img src={require("../../assets/images/companiesLogos2.jpg")} alt=""/></a></Col>
                        <Col xs={{span: 10, offset: 1}} md={{span: 6, offset: 0}} lg={{span: 4, offset: 0}}
                             className={s.logoItems}>
                            <a href="https://paxful.com/?r=a8RQeoZ3VY3"><img src={require("../../assets/images/companiesLogos1.jpg")} alt=""/></a></Col>
                    </Row>
                </Col>
            </Row>
            <Row className={s.logoWrapperSoon}>
                <Col lg="auto" xs="auto" className={s.logoHeaderSoon}>В ближайшее время подключатся платформы:</Col>
                <Col>
                    <Row className="align-items-lg-center">
                        <Col xs={{span: 6, offset: 0}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 3}}
                             className={s.logoItems}><a href="https://hodlhodl.com/join/SATOSHKIN"><img src={require("../../assets/images/companiesLogos4.jpg")}
                                                             alt=""/></a></Col>
                        <Col xs={{span: 6, offset: 0}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}
                             className={s.logoItems}><a href="https://trade.risex.net/registration/FXZVH"><img src={require("../../assets/images/companiesLogos5.jpg")}
                                                             alt=""/></a></Col>
                        <Col xs={{span: 6, offset: 3}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}
                             className={s.logoItems}><a href="https://tele.click/Chatex_bot?start=r_42361"><img src={require("../../assets/images/companiesLogos6.jpg")}
                                                             alt=""/></a></Col>
                    </Row>
                </Col>
            </Row>
            <Row className={s.logoWrapperSoon}>
                <Col lg="auto" xs="auto" className={s.logoHeaderSoon}>На очереди подключение платформ:</Col>
                <Col>
                    <Row className="align-items-lg-center">
                        <Col xs={{span: 6, offset: 0}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 3}}
                             className={s.logoItems}><a href="https://cryptolocator.com/?ref=1t58r"><img src={require("../../assets/images/companiesLogos7.jpg")}
                                                             alt=""/></a></Col>
                        <Col xs={{span: 6, offset: 0}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}
                             className={s.logoItems}><a href="https://totalcoin.io/invite/29e3ce5d8d4144d2ae559199d3b4cafe"><img src={require("../../assets/images/companiesLogos8.jpg")}
                                                             alt=""/></a></Col>
                        <Col xs={{span: 6, offset: 3}} md={{span: 4, offset: 0}} lg={{span: 2, offset: 0}}
                             className={s.logoItems}><a href="https://bitpapa.com/?ref=1t1fs"><img src={require("../../assets/images/companiesLogos9.jpg")}
                                                             alt=""/></a></Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default CompaniesLogos;