import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSadTear } from 'react-icons/fa'; // This imports a specific icon from FontAwesome

const EmptyResults = ({ message }) => {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
            <Row>
                <Col xs={12} className="text-center">
                    <FaSadTear size={50} className="mb-3" /> {/* Displaying the icon */}
                    <h5>No Data Found</h5>
                    <p>{message || "Sorry, we couldn't find any results matching your criteria."}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default EmptyResults;