import React from "react";
import {Row, Col} from 'react-flexbox-grid';
import s from './accountGuideItem.module.scss';


const AccountGuideItem = ({propsData}) => {

    const {imageSrc, headline, description} = propsData;

    return (
        <Row className={s.mainWrapper}>
            <Col lg>
                <Row middle="lg" start="lg">
                    <Col lg={1}><img src={require(`../../../../assets/image-for-guides/accountGuide/${imageSrc}.svg`)}/></Col>
                    <Col lg={10} className={s.headline}>{headline}</Col>
                </Row>
                <Row start="lg">
                    <Col lgOffset={1} lg={10}>{description}</Col>
                </Row>
            </Col>
        </Row>
    )
}

export default AccountGuideItem;