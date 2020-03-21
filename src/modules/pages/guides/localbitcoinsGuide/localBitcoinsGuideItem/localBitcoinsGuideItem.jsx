import React from "react";
import {Row, Col, Container} from 'react-bootstrap';
import s from './localBitcoinsItem.module.scss';


const LocalBitcoinsGuideItem = ({propsData}) => {

    const {imageSrc, headline} = propsData;

    return (
        <Container fluid>
            <Row className={s.mainWrapper}>
                <Col className={s.headline} lg={{span: 10, offset: 1}}>{headline}</Col>
                <Col lg={{span: 10, offset: 2}}><img
                    src={require(`../../../../assets/image-for-guides/LocalBitcoins/${imageSrc}.jpg`)}/></Col>
            </Row>
        </Container>
    )
}

export default LocalBitcoinsGuideItem;