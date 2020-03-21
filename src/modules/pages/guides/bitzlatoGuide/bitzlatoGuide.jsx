import React from "react";
import {Row, Col} from 'react-flexbox-grid';
import s from './bitzlatoGuide.module.scss';


const BitzlatoGuide = () => {
    return (
        <Row>
            <Col className={s.mainWrapper} lgOffset={1} lg={10}>
                <Row center="lg">
                    <Col className={s.header} lg={8}>
                        <div className={s.mainHeadline}>Добавление аккаунта Bitzlato</div>
                        <div className={s.underHeadline}>В данном гайде мы расскажем,
                            как добавить аккаунт на сайте bitzlato.com
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className={s.content} lg={10} lgOffset={1}>
                        <div className={s.instructionBlocks}>
                            <p>1) Нажмите кнопку «Добавить аккаунт»</p>
                            <img src={require("../../../assets/image-for-guides/Bitzlato/image1.jpg")} alt=""/>
                            <p>Чтобы добавить аккаунт, необходимо вписать Имя пользователя и Ключ</p>
                        </div>

                        <div className={s.instructionBlocks}>
                            <p>2) Заходите на сайт bitzlato.com</p>
                            <p>Имя пользователя указано справа сверху на сайте </p>
                            <img src={require("../../../assets/image-for-guides/Bitzlato/image2.jpg")} alt=""/>
                            <p>Чтобы найти ключ необходимо также справа сверху нажать на иконку </p>
                            <p><span>личного кабинета</span><img src={require("../../../assets/image-for-guides/Bitzlato/image3.jpg")} alt=""/>
                            <span>и открыть свой личный кабинет </span>
                                <img src={require("../../../assets/image-for-guides/Bitzlato/image4.jpg")} alt=""/></p>
                        </div>


                        <div className={s.instructionBlocks}>
                            <p>Затем открываете вкладку «Безопасность» и «Показать API-токен»</p>
                            <img src={require("../../../assets/image-for-guides/Bitzlato/image5.jpg")} alt=""/>
                            <p>При наличии двухфакторной аутентификации введите пришедший вам код</p>
                            <p>В открывшемся окне будет показан ваш ключ </p>
                            <img src={require("../../../assets/image-for-guides/Bitzlato/image6.jpg")} alt=""/>
                        </div>

                        <div className={s.instructionBlocks}>
                            <p>Скопируйте его и вставьте в окно добавления
                            аккаунта в строчку «Key» и нажмите кнопку «Отправить»</p><img
                            src={require("../../../assets/image-for-guides/Bitzlato/image7.jpg")} alt=""/>
                        </div>
                        <p>3) Готово! Ваш аккаунт Bitzlato успешно добавлен.</p>
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}

export default BitzlatoGuide;