import React, {useState, useEffect} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {getAllRecords, createRecords} from '../../../requests';
import {useTranslation} from 'react-i18next';
import notifier from "../../../../notifier";

const animatedComponents = makeAnimated();

const AddToPlaylistModal = ({show, onHide, selectedIds, onSubmit, playlistsUrl, addVideosToPlaylistsUrl}) => {
    const {t} = useTranslation("translation", {keyPrefix: "components.videos.action_components.add_to_playlist.Modal"});

    const [formMode, setFormMode] = useState(false);

    const [playlists, setPlaylists] = useState([]);

    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        const result = await getAllRecords(playlistsUrl);

        if (result.status) {
            setPlaylists(result.records.map(pl => ({value: pl.id, label: pl.name})));
        }
    };

    const handleSubmit = async () => {
        let payload = {
            video_ids: selectedIds
        };

        if (formMode) {
            payload['playlist'] = {
                name: formData.name
            }
        } else {
            if (formData.playlist) payload['id'] = formData.playlist.value;
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
                setFormErrors(result.playlist)
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
                        !formMode && <Form.Group>
                            <Select
                                components={animatedComponents}
                                options={playlists}
                                value={formData.playlist}
                                onChange={
                                    (selectedOption) => setFormData(formData => ({...formData, playlist: selectedOption}))
                                }
                                placeholder={t("playlist_select_box.placeholder")}
                                isClearable={true}
                            />
                        </Form.Group>
                    }
                    {
                        formMode && <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder={t("playlist_form.placeholder")}
                                defaultValue={ formData.name }
                                onChange={
                                    (event) => setFormData( d => ({ ...d, name: event.target.value } ))
                                }
                                isInvalid={!!formErrors.name}
                            />
                            {
                                !!formErrors.name && <Form.Control.Feedback type="invalid">
                                    {formErrors.name.join(', ')}
                                </Form.Control.Feedback>
                            }
                        </Form.Group>
                    }
                    <Form.Group className="my-2">
                        <Form.Check
                            type="switch"
                            checked={formMode}
                            label={t('switch')}
                            onChange={() => {
                                setFormMode(v => !v)
                            }}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit} disabled={ formMode ? !formData.name : !formData.playlist }>
                    {t('add_button')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddToPlaylistModal;
