import React, {useState} from 'react';
import {Card, Col} from 'react-bootstrap';
import VideoModal from "./VideoModal";
import {useTranslation} from "react-i18next";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

const GridItem = ({video, isSelected, selectModeEnabled, onSelect}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: video.id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const {t} = useTranslation();

    const [modalShow, setModalShow] = useState(false);

    const description = video.description || "";

    const itemOnSelect = () => {
        if (selectModeEnabled) {
            onSelect(video.id)
        }
    }

    const showModal = (event) => {
        event.stopPropagation();
        setModalShow(true)
    }

    return (
        <Col ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Card
                className={`h-100 d-flex flex-column video-grid ${selectModeEnabled ? 'cursor-pointer' : ''} ${isSelected ? 'bg-primary text-white' : ''}`}
                onClick={itemOnSelect}
            >
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
                    {modalShow && <VideoModal
                        video={video}
                        show={true}
                        onHide={() => setModalShow(false)}
                    />}
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default GridItem;