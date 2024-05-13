import React, {useState} from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import VideoModal from "./VideoModal";
import {useTranslation} from "react-i18next";

const GridItem = ({video, isSelected, selectModeEnabled, selectHandler}) => {
    const {t} = useTranslation();

    const [modalShow, setModalShow] = useState(false);

    const description = video.description || "";

    const selectVideoHandler = () => {
        if (selectModeEnabled) {
            selectHandler(video.id)
        }
    }

    const showModal = (event) => {
        event.stopPropagation();
        setModalShow(true)
    }

    return (
        <Col>
            <Card
                className={`h-100 d-flex flex-column video-grid ${selectModeEnabled ? 'cursor-pointer' : ''} ${isSelected ? 'bg-primary text-white' : ''}`}
                onClick={selectVideoHandler}>
                <Card.Img variant="top" src={video.thumbnail_url} className="cover-image"/>
                <Card.Body className="flex-grow-1">
                    <Card.Title>{video.title}</Card.Title>
                    <Card.Text className="text-ellipsis">
                        {description.length > 100 ? `${description.substring(0, 100)}...` : description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="mt-auto d-flex justify-content-between align-items-center">
                    <small><i className="bi bi-eye"></i> {video.view_count}</small>
                    <small>
                        <a onClick={showModal} className={`m-1 read-more ${isSelected ? 'text-white' : ''}`}>
                            {t("video.read_more")}
                        </a>
                    </small>
                </Card.Footer>
            </Card>
            {modalShow && <VideoModal
                video={video}
                show={true}
                onHide={() => setModalShow(false)}
            />}
        </Col>
    );
};

const Grid = ({videos, selectedIds, selectModeEnabled, selectHandler}) => {
    return (
        <Row xs={1} md={3} lg={4} className="g-4">
            {videos.map(video => {
                const isSelected = selectedIds.includes(video.id)
                return <GridItem
                    key={video.id}
                    video={video}
                    isSelected={isSelected}
                    selectModeEnabled={selectModeEnabled}
                    selectHandler={selectHandler}
                />
            })}
        </Row>
    );
};

export default Grid;