import React from "react";
import { createRoot } from "react-dom/client";
import VideoList from "./VideoList";

document.addEventListener("turbo:load", () => {
    const container = document.getElementById("video-list")
    if (container) {
        const root = createRoot(container);
        root.render(<VideoList />);
    }
});