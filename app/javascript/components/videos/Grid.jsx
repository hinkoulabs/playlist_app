import React from 'react';
import {Row} from 'react-bootstrap';
import GridItem from './GridItem'
import {
    DndContext,
    closestCenter,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    rectSortingStrategy
} from '@dnd-kit/sortable';

const Grid = ({videos, selectedIds, action, onSelect, onSortEnd}) => {
    const handleDragEnd = (event) => {
        const {active, over} = event;

        if (active.id !== over.id) {
            const oldIndex = videos.findIndex((v) => v.id === active.id);
            const newIndex = videos.findIndex((v) => v.id === over.id);

            const newVideos = arrayMove(videos, oldIndex, newIndex);

            onSortEnd(newVideos);
        }
    }

    const items = <Row xs={1} md={3} lg={4} className="g-4">
        {videos.map(video => {
            const isSelected = selectedIds.includes(video.id)
            return <GridItem
                key={video.id}
                video={video}
                isSelected={isSelected}
                action={action}
                onSelect={onSelect}
            />
        })}
    </Row>;

    if (action === 'sort') {
        return <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={videos}
                strategy={rectSortingStrategy}
            >
                {items}
            </SortableContext>
        </DndContext>
    }

    return items;
};

export default Grid;