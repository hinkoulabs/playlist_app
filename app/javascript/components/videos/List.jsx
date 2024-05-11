import React, { useState } from 'react';
import { ListGroup, Image, Button } from 'react-bootstrap';
import VideoModal from "./VideoModal";

const ListItem = ({ video }) => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <ListGroup.Item as="li" className="d-flex align-items-start video-list">
            <Image src={video.thumbnail_url} thumbnail className="video-image" />
            <div className="ms-3 flex-grow-1">
                <h5 className="text-ellipsis">{video.title}</h5>
                <p className="text-ellipsis">
                    {video.description}
                </p>
                <small>Views: {video.view_count}</small>
                <Button variant="link" size="sm" onClick={() => setModalShow(true)}>
                    Read More
                </Button>
            </div>
            <VideoModal
                video={video}
                show={modalShow}
                onHide={() => setModalShow(false)}

            />
        </ListGroup.Item>
    );
};

const List = ({ videos }) => {
    return (
        <ListGroup as="ul">
            {videos.map(video => (
                <ListItem key={video.id} video={video} />
            ))}
        </ListGroup>
    );
};

export default List;