import React from "react";
import {createRoot} from "react-dom/client";
import "./i18n";
import Videos from "./Videos";

document.addEventListener("turbo:load", () => {
    const container = document.getElementById("video-list")
    if (container) {
        const root = createRoot(container);
        root.render(
            <Videos
                videosUrl={container.dataset.videosUrl}
                playlistsUrl={container.dataset.playlistsUrl}
                addVideosToPlaylistsUrl={container.dataset.addVideosToPlaylistsUrl}
            />
        );
    }
});