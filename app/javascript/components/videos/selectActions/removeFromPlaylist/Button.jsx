import React, {useState} from 'react';
import {Button, Badge} from 'react-bootstrap';
import {deleteRecords} from '../../../requests';
import {useTranslation} from 'react-i18next';
import notifier from "../../../../notifier";

const RemoveFromPlaylistButton = ({removeFromPlaylistUrl, selectedIds, resetSelection}) => {
    const {t} = useTranslation("translation", {keyPrefix: "components.videos.selectActions.removeFromPlaylist.Button"});

    const onClickHandler = async () => {
        if (confirm(t('remove_confirmation'))) {
            const result = await deleteRecords(removeFromPlaylistUrl, { video_ids: selectedIds });

            if (result.status) {
                notifier("info", result.message);
                resetSelection(true);
            } else {
                if (result.error) {
                    notifier("error", result.error);
                }
            }
        }
    }

    return <>
        <Button variant="danger" className="float-start my-2 mx-1 position-relative"
                onClick={onClickHandler}>
            {t("title")}
            <Badge bg="primary" className="position-absolute top-0 start-100 translate-middle rounded-pill">
                {selectedIds.length}
            </Badge>
        </Button>
    </>
};

export default RemoveFromPlaylistButton;