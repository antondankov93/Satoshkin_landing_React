import React from 'react';
import s from './tariffsComponent.module.scss';
import {Col, Row} from 'react-bootstrap';
import Tariffs from './tariffs-item/tariffs';


const TariffsComponent = () => {


    return (
        <div className={s.mainWrapper}>
            <Row className={s.row}>
                <Col lg={{span: 10, offset: 1}}>
                    <Row>
                        <Col style={{
                            textAlign: "center",
                            width: "100%",
                            minWidth: "100%",
                            margin: "0 auto",
                            fontWeight: "600",
                            fontSize: "27px",
                            color: "#000000",
                            padding: "18px",
                            background: "#00000000",
                        }}>Тарифы</Col>
                    </Row>
                    <Row>
                        <Col><Tariffs/></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )

}

export default TariffsComponent;