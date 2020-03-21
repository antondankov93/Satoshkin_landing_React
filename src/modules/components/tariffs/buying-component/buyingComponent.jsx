import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from 'react-bootstrap';
// import axios from "axios";
import {postData} from '../../../../services/httpget'
// import { render } from 'node-sass';
import Loader from '../../../../loader/Loader';



const BuyingComponent = (props) => {

    const libre = {
        tariff_start: "Старт",
        tariff_trader: "Трейдер",
        tariff_pro: "PRO",
        tariff_business: "Бизнес",
    }

    const [tariff, setTariff] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        postData("/api/getPaymentLink", {tariffToPay: props.tariff}).then(response => {
            setTariff(response.data);
            setSuccess(response.success);
            setLoading(false)
        }).catch(error => console.log(error))
    },[]);

    return (
        <Container>
            {loading ? <Loader/> : <>
                {success ? <>
                    <Row>
                        <Col style={{textAlign: "center", marginBottom: "50px"}}><h3>Вы приобретаете
                            тариф: <span>{libre[props.tariff]}</span></h3></Col>
                    </Row>
                    <Row>К оплате {tariff.btcCost} BTC</Row>
                    <Row>
                        <Col><a href={tariff.web}>
                            <button className="bodyButton">Оплатить Bitzlato WEB</button>
                        </a></Col>
                        <Col><a href={tariff.telegram}>
                            <button className="bodyButton">Оплатить Bitzlato Telegram</button>
                        </a></Col>
                    </Row>
                </> : "Возникла ошибка"}
            </>}
        </Container>
    )
}

export default BuyingComponent;