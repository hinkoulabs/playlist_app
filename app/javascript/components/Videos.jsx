import React from 'react';
import VideoGallery from './videos/VideoGallery';
import AddToPlaylistButton from './videos/action_components/add_to_playlist/Button';

const Videos = ({videosUrl, playlistsUrl, addVideosToPlaylistsUrl}) => {
    const actionComponents = [
        {
            Component: AddToPlaylistButton,
            props: { playlistsUrl, addVideosToPlaylistsUrl }
        }
    ]

    return (
        <VideoGallery
            videosUrl={videosUrl}
            actionComponents={actionComponents}
        />
    );
};

export default Videos;
