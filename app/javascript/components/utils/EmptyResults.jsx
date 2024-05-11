import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSadTear } from 'react-icons/fa';
import {useTranslation} from 'react-i18next';

const EmptyResults = ({ message }) => {
    const {t} = useTranslation("translation", { keyPrefix: "components.utils.EmptyResults" });

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
            <Row>
                <Col xs={12} className="text-center">
                    <FaSadTear size={50} className="mb-3" />
                    <h5>{t("no_data")}</h5>
                    <p>{message || t("message")}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default EmptyResults;