import React from 'react';
import {ButtonGroup, ToggleButton} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
const ViewModeSelector = ({ viewMode, changeViewMode }) => {
    const {t} = useTranslation("translation", { keyPrefix: "components.utils.ViewModeSelector" });

    return <ButtonGroup className="mb-3 float-end">
        <ToggleButton
            id="toggle-list"
            type="radio"
            variant="secondary"
            name="radio"
            value="list"
            checked={viewMode === 'list'}
            onChange={(e) => changeViewMode('list')}
        >
            {t("list")}
        </ToggleButton>
        <ToggleButton
            id="toggle-grid"
            type="radio"
            variant="secondary"
            name="radio"
            value="grid"
            checked={viewMode === 'grid'}
            onChange={(e) => changeViewMode('grid')}
        >
            {t("grid")}
        </ToggleButton>
    </ButtonGroup>;
};

export default ViewModeSelector;
