import React from 'react';
import {ButtonGroup, ToggleButton} from 'react-bootstrap';
const ViewModeSelector = ({ viewMode, changeViewMode }) => {
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
            List View
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
            Grid View
        </ToggleButton>
    </ButtonGroup>;
};

export default ViewModeSelector;
