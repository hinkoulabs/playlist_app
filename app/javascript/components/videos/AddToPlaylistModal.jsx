import React, {useState, useEffect} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {getAllRecords, createRecords} from '../requests';
import {useTranslation} from 'react-i18next';
import notifier from "../../notifier";

const animatedComponents = makeAnimated();

const AddToPlaylistModal = ({show, onHide, selectedIds, onSubmit, playlistsUrl, addVideosToPlaylistsUrl}) => {
    const {t} = useTranslation("translation", {keyPrefix: "components.videos.AddToPlaylistModal"});

    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistMode, setNewPlaylistMode] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);

    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [newPlaylistNameError, setNewPlaylistNameError] = useState(null);

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        const result = await getAllRecords(playlistsUrl);

        if (result.status) {
            setPlaylists(result.records.map(pl => ({value: pl.id, label: pl.name})));
        }
    };

    const handlePlaylistChange = selectedOption => {
        setSelectedPlaylist(selectedOption);
    };

    const handleNewPlaylistNameChange = event => {
        setNewPlaylistName(event.target.value);
    };

    const handleSubmit = async () => {
        let payload = {
            video_ids: selectedIds
        };

        if (newPlaylistMode) {
            payload['playlist'] = {
                name: newPlaylistName
            }
        } else {
            if (selectedPlaylist) payload['id'] = selectedPlaylist.value;
        }

        const result = await createRecords(addVideosToPlaylistsUrl, payload);

        if (result.status) {
            notifier("info", t('notifications.added'));
            onSubmit();
            onHide();
        } else {
            if (result.error) {
                notifier("error", result.error);
            }

            if (result.playlist) {
                setNewPlaylistNameError(result.playlist.name.join(', '))
            }
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t("title")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {
                        !newPlaylistMode && <Form.Group>
                            <Select
                                components={animatedComponents}
                                options={playlists}
                                value={selectedPlaylist}
                                onChange={handlePlaylistChange}
                                placeholder={t("playlist_select_box.placeholder")}
                                isClearable={true}
                            />
                        </Form.Group>
                    }
                    {
                        newPlaylistMode && <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder={t("playlist_form.placeholder")}
                                value={newPlaylistName}
                                onChange={handleNewPlaylistNameChange}
                                isInvalid={!!newPlaylistNameError}
                            />
                            {
                                !!newPlaylistNameError && <Form.Control.Feedback type="invalid">
                                    {newPlaylistNameError}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                    }
                    <Form.Group className="my-2">
                        <Form.Check
                            type="switch"
                            checked={newPlaylistMode}
                            label={t('switch')}
                            onChange={() => {
                                setNewPlaylistMode(v => !v)
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit} disabled={ newPlaylistMode ? !newPlaylistName : !selectedPlaylist }>
                    {t('add_button')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddToPlaylistModal;
