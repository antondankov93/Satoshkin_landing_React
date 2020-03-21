import React from 'react';
import s from './creatingNow.module.scss'
import {Container, Row, Col} from 'react-bootstrap';
import {NavLink} from "react-router-dom";


const CreatingNow = () => {

    return (
        <Row className={s.mainWrapper}>
            <Col lg={12} className={s.description}>
                <p>Раздел находится в разработке...</p>
                <NavLink to="/">Вернуться на главную</NavLink>
            </Col>
        </Row>
    )
}

export default CreatingNow;