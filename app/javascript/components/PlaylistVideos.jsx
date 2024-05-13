import React from 'react';
import VideoGallery from './videos/VideoGallery';

const PlaylistVideos = ({videosUrl, sortableUrl}) => {
    const actionComponents = []

    return (
        <VideoGallery
            videosUrl={videosUrl}
            sortableUrl={sortableUrl}
            actionComponents={actionComponents}
        />
    );
};

export default PlaylistVideos;
