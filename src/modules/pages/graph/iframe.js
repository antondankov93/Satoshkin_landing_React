import React, {useState} from 'react';
import s from './iframe.module.scss'
import { Row, Col} from 'react-bootstrap';
// import {NavLink} from "react-router-dom";


const Iframe = () => {
    const [endPoint, setEndPoint] = useState('lb');

    return (
        <Row className={s.mainWrapper}>
            <Col lg={{span: 10, offset: 1}}>
                <Row className={s.frameWrapper}>
                    <Col lg={{span: 12, offset: 0}}>
                        <Col lg={{span: 4, offset: 8}}  className={s.togglerRow}>
                                <button className={s.toggler} onClick={() => setEndPoint("lb")}>localbitcoins</button>
                                <button className={s.toggler} onClick={() => setEndPoint("bz")}>bitzlato</button>
                        </Col>
                        <iframe className={s.frame} src={`https://accounts.satoshkin.com/api/graph/${endPoint}`}>
                            Ваш браузер не поддерживает плавающие фреймы!
                        </iframe>

                    </Col>
                </Row>
            </Col>
        </Row>
    )

}

export default Iframe;