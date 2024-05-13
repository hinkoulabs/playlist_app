import React from 'react';
import VideoGallery from './videos/VideoGallery';
import AddToPlaylistButton from './videos/selectActions/addToPlaylist/Button';

const Videos = ({videosUrl, playlistsUrl, addVideosToPlaylistsUrl}) => {
    const selectActionComponents = [
        {
            Component: AddToPlaylistButton,
            props: { playlistsUrl, addVideosToPlaylistsUrl }
        }
    ]

    return (
        <VideoGallery
            videosUrl={videosUrl}
            selectActionComponents={selectActionComponents}
        />
    );
};

export default Videos;
