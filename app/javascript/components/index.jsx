import React from "react";
import {createRoot} from "react-dom/client";
import "./i18n";
import Videos from "./Videos";
import PlaylistVideos from "./PlaylistVideos";

document.addEventListener("turbo:load", () => {
    const videoListRoot = document.getElementById("video-list")
    if (videoListRoot) {
        const root = createRoot(videoListRoot);
        root.render(
            <Videos
                videosUrl={videoListRoot.dataset.videosUrl}
                playlistsUrl={videoListRoot.dataset.playlistsUrl}
                addVideosToPlaylistsUrl={videoListRoot.dataset.addVideosToPlaylistsUrl}
            />
        );
    }

    const playlistVideoListRoot = document.getElementById("playlist-video-list");
    if (playlistVideoListRoot) {
        const root = createRoot(playlistVideoListRoot);
        root.render(
            <PlaylistVideos
                videosUrl={playlistVideoListRoot.dataset.videosUrl}
                reorderVideosUrl={playlistVideoListRoot.dataset.reorderVideosUrl}
                deleteVideosUrl={playlistVideoListRoot.dataset.deleteVideosUrl}
            />
        );
    }
});