import React from 'react';
import {Image} from 'react-bootstrap';
import ResponsiveModal from "../utils/ResponsiveModal"

const VideoModal = ({show, onHide, video}) => {
    return (
        <ResponsiveModal
            title={video.title}
            show={show}
            onHide={onHide}
            header={
                <>
                    <Image src={video.thumbnail_url} alt="thumbnail"/>
                    <p><small><i className="bi bi-eye"></i> {video.view_count}</small></p>
                </>
            }

        >
            <p>{video.description}</p>
        </ResponsiveModal>
    );
};

export default VideoModal;