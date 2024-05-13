import React from 'react';
import VideoGallery from './videos/VideoGallery';
import RemoveFromPlaylistButton from './videos/selectActions/removeFromPlaylist/Button';
import EmptyProjectVideos from "./videos/EmptyProjectVideos";

const PlaylistVideos = ({videosUrl, reorderVideosUrl, removeFromPlaylistUrl}) => {
    const selectActionComponents = [
        {
            Component: RemoveFromPlaylistButton,
            props: { removeFromPlaylistUrl }
        }
    ]

    return (
        <VideoGallery
            videosUrl={videosUrl}
            sortableUrl={reorderVideosUrl}
            selectActionComponents={selectActionComponents}
            EmptyComponent={EmptyProjectVideos}
        />
    );
};

export default PlaylistVideos;
