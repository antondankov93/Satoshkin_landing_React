import React, {useState, useContext} from 'react';
import {Button, ButtonToolbar, Col, Container, Modal, Row} from 'react-bootstrap';
import BuyingComponent from '../buying-component/buyingComponent';
import {MainContext} from "../../../MainContext";


const Tariffs = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [tariff, setTariff] = useState("");
    const {isAuth, showSignUp} = useContext(MainContext);

    return (
        <React.Fragment>
            <Row>
                <Col style={{
                    background: "white",
                    borderRadius: "15px",
                    minWidth: "335px",
                    maxWidth: "335px",
                    margin: "0 auto",
                    padding: "35px",
                    margin: "60px 20px",
                    border: "1px solid rgba(12, 12, 12, 0.08)",
                    paddingTop: "25px",
                    margin: "60px auto",
                }}>
                    <Row style={{
                        display: "block",
                        textAlign: "center",
                        borderBottom: "1px solid #00000052",
                        padding: "0px 0px 20px 0px",
                        marginBottom: "10px",
                        fontWeight: "600",
                        fontSize: "15pt",
                    }}>Старт</Row>
                    <Row style={{height: "260px"}}>
                        <Col>
                            <Row style={{borderBottom: "1px solid #0000001c", paddingBottom: "10px", marginBottom: "10px"}}><span>• Возможность добавить <b>по одному аккаунту</b> каждой P2P-Платформы</span></Row>
                            <Row style={{borderBottom: "1px solid #0000001c", paddingBottom: "10px", marginBottom: "10px"}}><span>• <b>5 одновременно активных объявлений</b> для каждого аккаунта P2P-Платформы</span></Row>
                            <Row style={{borderBottom: "1px solid #0000001c", paddingBottom: "10px", marginBottom: "10px"}}><span>• Доступны к перестановке только объявеления <b>в основной валюте бота</b> (настраивается)</span></Row>
                        </Col>
                    </Row>
                    <Row style={{
                        display: "block",
                        textAlign: "center",
                        fontSize: "14pt",
                        fontWeight: "600",
                        marginTop: "15px",
                    }}>
                        5000 рублей/мес.
                    </Row>
                    <Row style={{display: "contents"}}>
                        <ButtonToolbar>
                            <Button style={{
                                margin: "0 auto",
                                padding: "10px 20px",
                                fontWeight: "600",
                                marginTop: "25px",
                            }} variant="warning" onClick={isAuth ? () => (setModalVisible(true), setTariff("tariff_start")) : () => showSignUp()}>
                                Купить
                            </Button>
                        </ButtonToolbar>
                    </Row>
                </Col>

                <Col style={{
                    background: "white",
                    borderRadius: "15px",
                    minWidth: "335px",
                    maxWidth: "335px",
                    margin: "0 auto",
                    padding: "35px",
                    margin: "60px 20px",
                    border: "1px solid rgba(12, 12, 12, 0.08)",
                    paddingTop: "25px",
                    margin: "60px auto",
                }}>
                    <Row style={{
                        display: "block",
                        textAlign: "center",
                        borderBottom: "1px solid #00000052",
                        padding: "0px 0px 20px 0px",
                        marginBottom: "10px",
                        fontWeight: "600",
                        fontSize: "15pt",
                    }}>Трейдер</Row>
                    <Row style={{height: "260px"}}>
                        <Col>
                            <Row style={{borderBottom: "1px solid #0000001c", paddingBottom: "10px", marginBottom: "10px"}}><span>• Возможность добавить <b>по одному аккаунту</b> каждой P2P-Платформы</span></Row>
                            <Row style={{borderBottom: "1px solid #0000001c", paddingBottom: "10px", marginBottom: "10px"}}><span>• <b>15 одновременно активных объявлений</b> для каждого аккаунта P2P-Платформы</span></Row>
                            <Row style={{borderBottom: "1px solid #0000001c", paddingBottom: "10px", marginBottom: "10px"}}><span>• Доступны к перестановке объявеления только <b>в основной и дополнительной валюте бота</b> (настраивается)</span></Row>
                        </Col>
                    </Row>
                    <Row style={{
                        display: "block",
                        textAlign: "center",
                        fontSize: "14pt",
                        fontWeight: "600",
                        marginTop: "15px",
                    }}>
                        7500 рублей/мес.
                    </Row>
                    <Row style={{display: "contents"}}>
                        <ButtonToolbar>
                            <Button style={{
                                margin: "0 auto",
                                padding: "10px 20px",
                                fontWeight: "600",
                                marginTop: "25px",
                            }} variant="warning" onClick={isAuth ? () => (setModalVisible(true), setTariff("tariff_trader")) : () => showSignUp()}>
                                Купить
                            </Button>
                        </ButtonToolbar>
                    </Row>
                </Col>

                <Col style={{
                    background: "white",
                    borderRadius: "15px",
                    minWidth: "335px",
                    maxWidth: "335px",
                    margin: "0 auto",
                    padding: "35px",
                    margin: "60px 20px",
                    border: "1px solid rgba(12, 12, 12, 0.08)",
                    paddingTop: "25px",
                    margin: "60px auto",
                }}>
                    <Row style={{
                        display: "block",
                        textAlign: "center",
                        borderBottom: "1px solid #00000052",
                        padding: "0px 0px 20px 0px",
                        marginBottom: "10px",
                        fontWeight: "600",
                        fontSize: "15pt",
                    }}>ПРО</Row>
                    <Row style={{height: "260px"}}>
                        <Col>
                            <Row style={{borderBottom: "1px solid #0000001c", paddingBottom: "10px", marginBottom: "10px"}}><span>• Возможность добавить <b>по два аккаунта</b> каждой P2P-Платформы</span></Row>
                            <Row style={{borderBottom: "1px solid #0000001c", paddingBottom: "10px", marginBottom: "10px"}}><span>• <b>25 одновременно активных объявлений</b> для каждого аккаунта P2P-Платформы</span></Row>
                            <Row style={{borderBottom: "1px solid #0000001c", paddingBottom: "10px", marginBottom: "10px"}}><span>• Трейдинг с использованием <b>всех доступных фиатных валют</b></span></Row>
                        </Col>
                    </Row>
                    <Row style={{
                        display: "block",
                        textAlign: "center",
                        fontSize: "14pt",
                        fontWeight: "600",
                        marginTop: "15px",
                    }}>
                        15000 рублей/мес.
                    </Row>
                    <Row style={{display: "contents"}}>
                        <ButtonToolbar>
                            <Button style={{
                                margin: "0 auto",
                                padding: "10px 20px",
                                fontWeight: "600",
                                marginTop: "25px",
                            }} variant="warning" onClick={isAuth ? () => (setModalVisible(true), setTariff("tariff_pro")) : () => showSignUp()}>
                                Купить
                            </Button>
                        </ButtonToolbar>
                    </Row>
                </Col>

                <Col style={{
                    background: "white",
                    borderRadius: "15px",
                    minWidth: "335px",
                    maxWidth: "335px",
                    margin: "0 auto",
                    padding: "35px",
                    margin: "60px 20px",
                    border: "1px solid rgba(12, 12, 12, 0.08)",
                    paddingTop: "25px",
                    margin: "60px auto",
                }}>
                    <Row style={{
                        display: "block",
                        textAlign: "center",
                        borderBottom: "1px solid #00000052",
                        padding: "0px 0px 20px 0px",
                        marginBottom: "10px",
                        fontWeight: "600",
                        fontSize: "15pt",
                    }}>Бизнес</Row>
                    <Row style={{height: "260px"}}>
                        <Col>
                            <Row style={{borderBottom: "1px solid #0000001c", paddingBottom: "10px", marginBottom: "10px"}}><span>• Возможность добавить <b>по пять аккаунтов</b> каждой P2P-Платформы</span></Row>
                            <Row style={{borderBottom: "1px solid #0000001c", paddingBottom: "10px", marginBottom: "10px"}}><span>• <b>100 одновременно активных объявлений</b> для каждого аккаунта P2P-Платформы</span></Row>
                            <Row style={{borderBottom: "1px solid #0000001c", paddingBottom: "10px", marginBottom: "10px"}}><span>• Трейдинг с использованием <b>всех доступных фиатных валют</b></span></Row>
                        </Col>
                    </Row>
                    <Row style={{
                        display: "block",
                        textAlign: "center",
                        fontSize: "14pt",
                        fontWeight: "600",
                        marginTop: "15px",
                    }}>
                        25000 рублей/мес.
                    </Row>
                    <Row style={{display: "contents"}}>
                        <ButtonToolbar>
                            <Button style={{
                                margin: "0 auto",
                                padding: "10px 20px",
                                fontWeight: "600",
                                marginTop: "25px",
                            }} variant="warning" onClick= {isAuth ? () => (setModalVisible(true), setTariff("tariff_business")) : () => showSignUp()}>
                                Купить
                            </Button>
                        </ButtonToolbar>
                    </Row>
                </Col>

                <Modal
                    show={modalVisible}
                    onHide={() => setModalVisible(false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton />
                    <Modal.Body>
                        <BuyingComponent tariff={tariff}/>
                    </Modal.Body>
                </Modal>
            </Row>
        </React.Fragment>
    )
}

export default Tariffs;