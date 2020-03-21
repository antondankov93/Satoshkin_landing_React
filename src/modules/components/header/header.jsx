import React from 'react';

import {NavHashLink as NavLink} from 'react-router-hash-link';
import {Row, Col} from 'react-bootstrap';

const Header = () => {
    return (
        <Row className="align-items-lg-center ">
            <Col xs={{span: 10, offset: 1}} lg={{span: 2, offset: 0}}>
                <Row className="justify-content-center"><NavLink to="/">
                    <img className="mainHeaderLogo" src={require("../../assets/images/mainLogo.svg")} alt="Satoshkin"/></NavLink></Row>
            </Col>
            <Col xs={{span:12, offset:0}} md={{span:12, offset:0}} lg={{span:10, offset:0}} className="navWrapper">
                <Row className="navItemList">
                    <Col xs={6} md={2} lg={4} xl={2} className="navItem"><NavLink to="/function">Функции</NavLink></Col>
                    <Col xs={6} md={2} lg={4} xl={2} className="navItem"><NavLink smooth to="/#tariff">Тарифы</NavLink></Col>
                    <Col xs={6} md={4} lg={4} xl={3} className="navItem"><NavLink to="/exchanges">P2P - платформы</NavLink></Col>
                    <Col xs={{span:3, offset:0}} md={{span:2, offset:0}} lg={{span:4, offset:0}} xl={{span:2, offset:0}} className="navItem"><NavLink to="/graph">Графики</NavLink></Col>
                    <Col xs={3} md={2} lg={4} xl={2} className="navItem"><NavLink to="/about-us">О нас</NavLink></Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Header;