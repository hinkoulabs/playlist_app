import React from "react";
import {createRoot} from "react-dom/client";
import Videos from "./Videos";


document.addEventListener("turbo:load", () => {
    const container = document.getElementById("video-list")
    if (container) {
        const root = createRoot(container);
        root.render(
            <React.StrictMode>
                <Videos
                    videosUrl={container.dataset.videosUrl}
                    projectsUrl={container.dataset.projectsUrl}
                />
            </React.StrictMode>
        );
    }
});