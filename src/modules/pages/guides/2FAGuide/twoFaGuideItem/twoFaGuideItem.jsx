import React from "react";
import {Row, Col} from 'react-flexbox-grid';
import s from './twoFaGuideItem.module.scss';


const TwoFaGuideItem = ({propsData}) => {
    const {imageSrc, headline, descriptionSrc} = propsData;

    return (
        <Row className={s.mainWrapper}>
            <Col lg>
                <Row middle="lg" start="lg">
                    <Col lg={1} className={s.logos}><img src={require(`../../../../assets/image-for-guides/2FAGuide/${imageSrc}.svg`)}/></Col>
                    <Col lg={10} className={s.headline}>{headline}</Col>
                </Row>
                <Row start="lg">
                    <Col className={s.description} lgOffset={1} lg={6}>
                        {descriptionSrc === undefined ? "" : <img src={require(`../../../../assets/image-for-guides/2FAGuide/${descriptionSrc}.jpg`)}/> }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default TwoFaGuideItem;