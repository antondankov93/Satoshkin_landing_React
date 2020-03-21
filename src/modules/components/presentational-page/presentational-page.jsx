import React,{useContext} from 'react';
import s from './presentationalPage.module.scss';
import {Row, Col} from 'react-bootstrap';
import {MainContext} from "../../MainContext";


const PresentationalPage = (props) => {
        const {isAuth, showSignUp} = useContext(MainContext);

    return (
        <>
            <Row className={s.mainWrapper}>
                <Col lg={{span: 6, offset: 1}} className={s.description}>
                    <h1 className={s.descriptionHeader}>Satoshkin – бот для автоматизации трейдинга на P2P -
                        платформах</h1>
                    <Row className={s.underDescriptionHeader}>
                        <div>позволяет увеличить доход</div>
                        <div lg={3}>экономит время</div>
                        <div>расширяет возможности</div>
                    </Row>
                    <Row>
                        <Col className={s.advantagesDecription} lg={{span: 10, offset: 1}}>
                            <h3>Функции:</h3>
                            <div className={s.functionItems}>
                                Быстрая перестановка цен в объявлениях
                            </div>

                            <div className={s.functionItems}>
                                Управление объявлениями
                            </div>

                            <div className={s.functionItems}>
                                Уведомления в Telegram со всех платформ
                            </div>

                            <div className={s.functionItems}>
                                Анализ P2P - рынка
                            </div>
                            <div className={s.moreAbout}>
                                {/* <button>Узнать больше</button> */}
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col lg={4}>
                    <img className={s.laptop} src={require("../../assets/images/laptop.png")} alt="" height="450"/>
                </Col>

                <Col className={s.tryFree} lg={{span: 3, offset: 5}}>
                    {!isAuth && <button onClick={showSignUp}>Попробовать бесплатно</button>}
                </Col>
            </Row>
        </>

    )
}

export default PresentationalPage;