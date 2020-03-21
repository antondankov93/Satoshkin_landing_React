import React,{useContext} from "react";
import {Row, Col, Container} from "react-bootstrap";
import PresentationalPage from "../../components/presentational-page/presentational-page";
import Tariffs from "../../components/tariffs/tariffsComponent";
import CompaniesLogos from "../../components/companies-logos/companiesLogos";
import s from "./mainLanding.module.scss"
import Redirector from "../../../Redirector";
import {MainContext} from "../../MainContext";
import WebConferencePromotion from "../../components/web-conference/WebConferencePromotion";

const MainLanding = (props) => {

    const {goTo} = useContext(MainContext);

    return (
        <>
            {props.redirector && <Redirector goTo={goTo}/>}
            <Row className={s.landingItems}>
                <Col>
                <PresentationalPage/>
                </Col>
            </Row>

            <Row className={s.landingItems}>
                <Col>
                <WebConferencePromotion/>
                </Col>
            </Row>
            <Row>
                <Col>
                <CompaniesLogos/>
                </Col>
            </Row>

            <Row id="tariff" className={s.landingItems + " " + s.tariffs}>
                <Col>
                <Tariffs/>
                </Col>
            </Row>

            {/* Временный блок, до 15 марта */}
            <Row id="tariff" style={{
                    padding: "202px 0 0 0",
                    height: "100vh",
                    background: "linear-gradient(to top, rgba(0, 0, 0, 0.61), rgba(0, 0, 0, 0.82)), URL(https://pixabay.com/get/52e7d74b4e5baa14f6d1867dda6d49214b6ac3e45659724a772c7cd59e/bitcoin-4728496_1920.jpg)",
                    backgroundSize: "cover",
                    display: "table",
                    width: "100vw",
                    fontWeight: "600",
                    color: "aliceblue",
                    textShadow: "0px 2px 11px black",
            }} className={s.landingItems}>
                <Col style={{
                    display: "table-cell",
                    verticalAlign: "middle"
                }}>
                  <div style={{padding: '30px', textAlign: 'center'}}>
                    <h2 style={{marginTop: 0, marginBottom: '40px', fontSize: '35px', fontWeight: 600}}>Собственный бизнес на обмене криптовалют</h2>
                    <p style={{marginTop: 0, marginBottom: '40px', fontSize: '25px'}}>15 марта, 16:00 Мск</p>
                    <p style={{marginTop: 0, marginBottom: '40px', fontSize: '25px'}}>Бесплатный вебинар по трейдингу на Р2Р-платформах</p>
                    <p style={{marginTop: 0, marginBottom: 0, fontSize: '14px'}}>На вебинаре мы расскажем, как зарабатывать, торгуя криптовалютой на Р2Р-платформах, какие ресурсы для этого необходимы, <br/>какие есть риски и сколько можно заработать, представим наш полный курс трейдинга на Р2Р-платформах.</p>
                    <p style={{marginTop: 0, marginBottom: '65px', fontSize: '14px'}}>В вебинаре примут участие несколько представителей Р2Р-платформ и криптовалютных бирж.</p>
                    <button style={{
                        fontSize: "25px",
                        color: "rgb(255, 255, 255)",
                        border: "none",
                        padding: "20px 30px",
                        borderRadius: "15px",
                        backgroundColor: "rgb(221, 104, 165)",
                    }}>
                        <a href="http://info.satoshkin.com/Kurs15_03" target='_blank' style={{fontSize: '25px', color: '#fff'}}>Подробная информация и регистрация</a>
                    </button>
                  </div>
                </Col>
            </Row>
        </>
    )
}

/*
{props.redirector && <Redirector goTo={goTo}/>}
<Row className={s.landingItems}>
    <Col>
        <PresentationalPage auth={props.auth} showSignUp={props.showSignUp}/>
    </Col>
</Row>
*/


export default MainLanding;