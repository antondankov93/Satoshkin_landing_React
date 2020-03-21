import React from "react";
import {Row, Col} from 'react-flexbox-grid';
import {two_fa_guide} from "./twoFaGuide-data";
import s from './twoFaGuide.module.scss';
import TwoFaGuideItem from "./twoFaGuideItem/twoFaGuideItem";
import {NavLink} from "react-router-dom";


const TwoFaGuide = () => {
    const TwoFaItems = two_fa_guide.map(i => <TwoFaGuideItem propsData={i}/>)
    return (
        <Row>
            <Col className={s.mainWrapper} lgOffset={1} lg={10}>
                <Row center="lg">
                    <Col className={s.header} lg={8}>
                        <div className={s.mainHeadline}>Двухфакторная аутентификация на сайте LocalBitcoins.net</div>
                        <div className={s.underHeadline}>В данном гайде мы расскажем,
                            как добавить двухфакторную аутентификацию на сайте LocalBitcoins.net
                        </div>
                    </Col>
                </Row>
                <Row className={s.accountItems}>
                    <Col lgOffset={1} lg={10}>{TwoFaItems}</Col>
                </Row>
                <Row start="lg">
                    <Col lgOffset={1} lg={10}>
                        <Row className={s.headlines}>
                            <h2>Мобильное приложение для двухфакторной аутентификации</h2>
                            <p>1. Скачайте приложение Google Authenticator для своего мобильного телефона или планшета: Android, iPhone, iPad и iPod или Windows Phone.</p>
                            <p>2. <strong>Ваш резервный код: MRGTE6KLMFATKR2M <br/>Важно!</strong> Запишите этот код на бумаге и храните его в надежном месте. Он вам понадобится, если вы потеряете свой телефон или если ваша учетная запись будет заблокирована. </p>
                            <p>3. Нажмите кнопку <strong>"Перейти к активации"</strong> (выше).</p>
                            <p>4. Запустите приложение для аутентификации на своем мобильном устройстве. Найдите в приложении функцию "сканировать штрихкод" и отсканируйте штрихкод, приводимый вверху этой страницы.</p>
                            <p>5. Введите код с вашего мобильного приложения в поле выше. <br/><span className={s.warning}>ВНИМАНИЕ! Обязательно запишите ваш резервный код!</span></p>
                        </Row>
                        <Row className={s.headlines}>
                            <h2>Двухфакторная аутентификация с распечатанными кодами</h2>
                            <p>1. Нажмите <NavLink to="#">здесь</NavLink>, чтобы посмотреть ваши коды двухфакторной аутентификации для распечатки на бумаге. Распечатайте эту страницу, выбрав опцию "Печать" в меню "Файл" вашего браузера.</p>
                            <p>2. Нажмите на кнопку <strong>"Перейти к активации"</strong> (выше) и введите ключ, указанный в верхнем левом углу листа кодов, а также первый код.</p>
                            <p>3. После того как будут использованы все 90 распечатанных на бумаге кодов, вам потребуется снова подключить двухфакторную аутентификацию с распечатанными кодами на этой странице.</p>
                            <p>4. Отмечайте использованные коды на листе кодов, вычеркивая их ручкой.</p>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default TwoFaGuide;