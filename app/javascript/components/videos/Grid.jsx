import React, {useState} from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import VideoModal from "./VideoModal";

const GridItem = ({video}) => {
    const [modalShow, setModalShow] = useState(false);

    const description = video.description || "";

    return (
        <Col>
            <Card className="h-100 d-flex flex-column video-grid">
                <Card.Img variant="top" src={video.thumbnail_url} className="cover-image"/>
                <Card.Body className="flex-grow-1">
                    <Card.Title>{video.title}</Card.Title>
                    <Card.Text className="text-ellipsis">
                        {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="mt-auto">
                    <small>Views: {video.view_count}</small>
                    <Button variant="link" size="sm" onClick={() => setModalShow(true)}
                            className="position-absolute bottom-0 end-0 m-1">
                        Read More
                    </Button>
                </Card.Footer>
            </Card>
            <VideoModal
                video={video}
                show={modalShow}
                onHide={() => setModalShow(false)}

            />
        </Col>
    );
};

const Grid = ({videos}) => {
    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {videos.map(video => (
                <GridItem key={video.id} video={video}/>
            ))}
        </Row>
    );
};

export default Grid;