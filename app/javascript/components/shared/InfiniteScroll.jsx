import React, { useEffect, useRef, useCallback } from 'react';
import {useTranslation} from "react-i18next";

const InfiniteScroll = ({ loadMore, hasMore, isLoading, children }) => {
    const {t} = useTranslation("translation", { keyPrefix: "components.shared.InfiniteScroll" });
    const observer = useRef();

    // Callback for setting the ref on the last element in the list
    const lastElementRef = useCallback(node => {
        // If currently loading, do not attach the observer
        if (isLoading) return;
        // Disconnect any previous observers
        if (observer.current) observer.current.disconnect();

        // Set up a new observer
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                // Call loadMore function if the last item is in view and there are more items to load
                loadMore();
            }
        });

        // Observe the new last element
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore, loadMore]);

    // Clean up the observer on unmount
    useEffect(() => {
        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, []);

    return (
        <div>
            {children}
            <div ref={lastElementRef}>
                {isLoading && hasMore && <p>{t("loading_more")}</p>}
            </div>
        </div>
    );
};

export default InfiniteScroll;
