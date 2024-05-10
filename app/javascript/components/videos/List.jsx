import React, { useState, useRef, useEffect } from 'react';
import { ListGroup, Image, Button } from 'react-bootstrap';

const ListItem = ({ video }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showToggleButton, setShowToggleButton] = useState(false);
    const descriptionRef = useRef(null);

    useEffect(() => {
        // Check if the description's content is overflowing
        if (descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight) {
            setShowToggleButton(true);
        } else {
            setShowToggleButton(false);
        }
    }, [video.description]);

    const toggleDescription = () => {
        setShowFullDescription(prev => !prev);
    };

    return (
        <ListGroup.Item as="li" className="d-flex align-items-start video-list">
            <Image src={video.thumbnail_url} thumbnail className="video-image" />
            <div className="ms-3 flex-grow-1">
                <small>Views: {video.view_count}</small>
                <h5>{video.title}</h5>
                <p ref={descriptionRef} className="video-description" style={{ maxHeight: showFullDescription ? 'none' : '4.5em', overflow: 'hidden' }}>
                    {video.description}
                </p>
                {showToggleButton && (
                    <Button className="description-toggle" variant="link" size="sm" onClick={toggleDescription}>
                        {showFullDescription ? 'Show Less' : 'Read More'}
                    </Button>
                )}
            </div>
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