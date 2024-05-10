import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import List from './Videos/List';
import Grid from './Videos/Grid';
import SearchInput from './utils/SearchInput';
import InfiniteScroll from './utils/InfiniteScroll';
import SkeletonLoader from './utils/SkeletonLoader';
import ViewModeSelector from './utils/ViewModeSelector';
import EmptyResults from './utils/EmptyResults';
import { getRecords } from './requests';

const Videos = ({ videosUrl, projectsUrl }) => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [viewMode, setViewMode] = useState('list');
    const [selectModeEnabled, setSelectModeEnabled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        // Always fetch the first page with potential new search query
        fetchVideos(1, searchQuery);
    }, [videosUrl, searchQuery]);

    const fetchVideos = async (pageNum, query) => {
        setIsLoading(true);
        const result = await getRecords(videosUrl, pageNum, query);
        if (result.status) {
            setVideos(pageNum === 1 ? result.records : [...videos, ...result.records]);
            setHasMore(result.hasMore);
            // Prepare for next page load
            setPage(pageNum + 1);
        } else {
            console.error('Failed to fetch videos:', result.error);
        }
        // Reset loadingMore flag here after fetch completion
        setIsLoading(false);
    };

    const handleLoadMore = () => {
        if (!hasMore) return;
        // Fetch the next page
        fetchVideos(page, searchQuery);
    };

    const toggleSelectMode = () => {
        setSelectModeEnabled(!selectModeEnabled);
    };

    const buildView = () => {
        if (videos.length === 0) {
            if (isLoading) {
                return <SkeletonLoader count={5} />
            }else{
                return <EmptyResults />;
            }
        }
        return (
            <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore} isLoading={isLoading}>
                { viewMode === 'list' ? <List videos={videos} /> : <Grid videos={videos} />}
            </InfiniteScroll>
        );
    };

    return (
        <div className="videos-container">
            <div className="videos-controls">
                <Button className="float-start" onClick={toggleSelectMode}>
                    {selectModeEnabled ? 'Cancel Select' : 'Select'}
                </Button>
                <ViewModeSelector viewMode={viewMode} changeViewMode={setViewMode} />
                <SearchInput disabled={selectModeEnabled} handleFetch={q => {
                    setPage(1);
                    setSearchQuery(q);
                }} />
                Total Videos: {videos.length}
            </div>
            <div className="videos-scrollable-content">
                {buildView()}
            </div>
        </div>
    );
};

export default Videos;
