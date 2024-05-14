import React from 'react';
import {Button} from 'react-bootstrap';
import {useTranslation} from 'react-i18next';
import {updateRecords} from '../requests';
import notifier from "../../notifier";

const SortableModeButton = ({mode, disabled, onClick, videos, sortableUrl}) => {
    const {t} = useTranslation("translation", {keyPrefix: "components.videos.SortableModeButton"});

    const onSave = async () => {
        if (confirm(t('reorder_confirmation'))) {
            const result = await updateRecords(sortableUrl, {video_ids: videos.map(e => e.id)});

            if (result.status) {
                notifier("info", result.message);
                onClick(true);
            } else {
                if (result.error) {
                    notifier("error", result.error);
                }
            }
        }
    }

    return <>
        <Button disabled={disabled} variant={mode ? "primary" : "secondary"} className="float-end my-2 position-relative" onClick={() => onClick()}>
            {mode ? t("active_button") : t("inactive_button")}
        </Button>
        {mode && <Button variant="success" className="float-end my-2 mx-1 position-relative" onClick={onSave}>
            {t("saveButton")}
        </Button>}
    </>
};

export default SortableModeButton;