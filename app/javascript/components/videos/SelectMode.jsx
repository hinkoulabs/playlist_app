import React, { useState } from 'react';
import { Button, Modal, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from 'axios';

const SelectMode = ({ videos, createProjectUrl }) => {
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleSelectVideo = (videoId) => {
        setSelectedVideos(prev => [...prev, videoId]);
    };

    const handleSubmitProject = async () => {
        // Logic to create a project with selected videos
        setShowModal(false);
    };

    return (
        <>
            <Button onClick={() => setShowModal(true)}>Add to Project</Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Selected Videos to Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitProject}>
                        {videos.map(video => (
                            <ListGroup key={video.id}>
                                <ListGroupItem action onClick={() => handleSelectVideo(video.id)}>
                                    {video.title}
                                </ListGroupItem>
                            </ListGroup>
                        ))}
                        <Button type="submit">Create Project</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SelectMode;
