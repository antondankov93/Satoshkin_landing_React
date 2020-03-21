import React from "react";
import {Col, Row} from "react-flexbox-grid";
import s from './exchangeItem.module.scss'

const ExchangeItem = ({propsData}) => {

    const {id, urlLink, logo, verification, collection, cryptocurrencies, otherInfo} = propsData;
    return (
        <Row middle="lg" className={s.mainWrapper}>
            <Col className={s.nameWrapper} lg={2}>
                <Row className={s.platformsLogoAndName} center="lg">
                   {/* <Col className={s.name}>{name}</Col>*/}
                    <Col >
                        <a href={urlLink}><img className={s.platformsLogo} src={require(`../../../assets/platformsLogo/${logo}.jpg`)}/></a>
                    </Col>
                </Row>
            </Col>

            <Col className={s.item} lg={3}>
                <Row start="lg"><Col >{verification}</Col></Row>
            </Col>

            <Col className={s.item} lg={3}>
                <Row start="lg"><Col lg>{collection}</Col></Row>
            </Col>

            <Col className={s.item} lg={2}>
                <Row center="lg"><Col lg>{cryptocurrencies}</Col></Row>
            </Col>

            <Col className={s.item} lg={2}>
                <Row center="lg"><Col lg dangerouslySetInnerHTML={{ __html: otherInfo }}/></Row>
                {/* <Row center="lg"><Col lg>{otherInfo}</Col></Row> */}
            </Col>
        </Row>
    )
}

export default ExchangeItem;