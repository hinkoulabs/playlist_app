import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Image } from 'react-bootstrap';

const VideoDetailModal = ({ video, show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide} size="lg" className="video-grid-modal">
            <Modal.Header closeButton>
                <Modal.Title>{video.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-top-content">
                    <Image src={video.thumbnail_url} alt="thumbnail" />
                    <p><small>Views: {video.view_count}</small></p>
                </div>
                <div className="modal-description">
                    <p>{video.description}</p>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const GridItem = ({ video }) => {
    const [modalShow, setModalShow] = useState(false);

    const description = video.description || "";

    return (
        <Col>
            <Card className="h-100 d-flex flex-column video-grid">
                <Card.Img variant="top" src={video.thumbnail_url} className="video-image" />
                <Card.Body className="flex-grow-1">
                    <Card.Title>{video.title}</Card.Title>
                    <Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="mt-auto">
                    <small>Views: {video.view_count}</small>
                    <Button size="sm" onClick={() => setModalShow(true)} className="position-absolute bottom-0 end-0 m-1">
                        Read More
                    </Button>
                </Card.Footer>
            </Card>
            <VideoDetailModal video={video} show={modalShow} onHide={() => setModalShow(false)} />
        </Col>
    );
};

const Grid = ({ videos }) => {
    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {videos.map(video => (
                <GridItem key={video.id} video={video} />
            ))}
        </Row>
    );
};

export default Grid;