import React, {useState} from 'react';
import {Button, Badge} from 'react-bootstrap';
import Modal from "./Modal"
import {useTranslation} from 'react-i18next';

const AddToPlaylistButton = ({playlistsUrl, addVideosToPlaylistsUrl, selectedIds, resetSelection}) => {
    const {t} = useTranslation("translation", {keyPrefix: "components.videos.action_components.add_to_playlist.Button"});
    const [showModal, setShowModal] = useState(false);

    return <>
        <Button variant="success" className="float-start my-2 mx-1 position-relative"
                onClick={() => setShowModal(true)}>
            {t("title")}
            <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-pill">
                {selectedIds.length}
            </Badge>
        </Button>
        {
            showModal && <Modal
                show={true}
                onHide={() => setShowModal(false)}
                selectedIds={selectedIds}
                onSubmit={resetSelection}
                playlistsUrl={playlistsUrl}
                addVideosToPlaylistsUrl={addVideosToPlaylistsUrl}
            />
        }
    </>
};

export default AddToPlaylistButton;