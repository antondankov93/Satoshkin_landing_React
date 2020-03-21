import React from "react";
import {Row, Col} from 'react-flexbox-grid';
import {exchanges_data} from './exchanges-data';
import ExchangeItem from "./exchanges-item/exchange-item";
import s from './exhcanges.module.scss';


const Exchanges = () => {
    const ExchangeItems = exchanges_data.map(i => <ExchangeItem key={i.id} propsData={i}/>)
    return (
        <Col className={s.mainWrapper} lgOffset={1} lg={10}>
            <Row className={s.header} middle="lg">
                <Col className={s.headerItem} lg={2}>р2р-платформы</Col>
                <Col className={s.headerItem} lg={3}>Верификация</Col>
                <Col className={s.headerItem} lg={3}>Комиссии</Col>
                <Col className={s.headerItem} lg={2}>Криптовалюты</Col>
                <Col className={s.headerItem} lg={2}>Дополнительная информация</Col>
            </Row>
            {ExchangeItems}
        </Col>
    )
}

export default Exchanges;