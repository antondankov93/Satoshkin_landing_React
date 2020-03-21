import React from "react";
import {Col, Row} from 'react-flexbox-grid';
import s from './paxfulGuide.module.scss';


const PaxfulGuide = () => {
    return (
        <Row>
            <Col className={s.mainWrapper} lgOffset={1} lg={10}>
                <Row center="lg">
                    <Col className={s.header} lg={8}>
                        <div className={s.mainHeadline}>Добавление аккаунта Paxful</div>
                        <div className={s.underHeadline}>В данном гайде мы расскажем,
                            как добавить аккаунт на сайте Paxful.com
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={10} lgOffset={1}>
                        <p>Как добавить аккаунт Paxful: </p>
                        <p>ВНИМАНИЕ! Для добавления аккаунта необходимо наличие двухфакторной аутентификации!</p>
                        <p>На Paxful.com зайдите в “Настройки” и перейдите в раздел “Для разработчиков”</p>
                        <p>Далее нажмите “Добавить новый API-ключ”, предварительно введя код 2ФА</p>
                        <img src={require("../../../assets/image-for-guides/Paxful/image1.jpg")} alt=""/>
                        <p>Далее откроется окно с вашим ключом и приватным ключом </p>
                        <img src={require("../../../assets/image-for-guides/Paxful/image2.jpg")} alt=""/>
                        <p>Скопируйте их и вставьте в соответствующие ячейки при добавлении аккаунта на satoshkin.com
                            и введите Username (не обязательно, чтобы он совпадал с username’ом на paxful)</p>
                        <img style={{marginTop:"30px"}} src={require("../../../assets/image-for-guides/Paxful/image3.jpg")} alt=""/><img
                            src={require("../../../assets/image-for-guides/Paxful/image4.jpg")} alt=""/>
                        <p> и нажмите “Отправить”.</p>
                        <p>Поздравляем, аккаунт Paxful успешно добавлен на Satoshkin.com.
                            Удачного использования!
                        </p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default PaxfulGuide;