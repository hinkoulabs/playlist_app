import React, {useState, useEffect} from 'react';
import {Button, Badge} from 'react-bootstrap';
import Grid from './videos/Grid';
import SearchInput from './shared/SearchInput';
import InfiniteScroll from './shared/InfiniteScroll';
import SkeletonLoader from './shared/SkeletonLoader';
import EmptyResults from './shared/EmptyResults';
import LoadedStats from './shared/LoadedStats';
import {getRecords} from './requests';
import {useTranslation} from 'react-i18next';
import notifier from "../notifier";

const Videos = ({videosUrl, projectsUrl}) => {
    const {t} = useTranslation("translation", {keyPrefix: "components.Videos"});

    const [videos, setVideos] = useState([]);
    const [videosMeta, setVideosMeta] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
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
            setVideosMeta(result.meta);
            // Prepare for next page load
            setPage(pageNum + 1);
        } else {
            setHasMore(false);
            notifier("error", `${t('failed_videos_load')}: ${result.error}`);
        }
        // Reset loadingMore flag here after fetch completion
        setIsLoading(false);
    };

    const handleLoadMore = () => {
        if (!hasMore) return;
        // Fetch the next page
        fetchVideos(page, searchQuery);
    };

    const addToPlaylist = () => {
        resetSelection();
    }

    const resetSelection = () => {
        setSelectModeEnabled(false);
        setSelectedIds([]);
    }

    const toggleSelectMode = () => {
        if (selectModeEnabled) {

            if (selectedIds.length) {
                if (confirm(t('select.deselect_confirmation'))) {
                    resetSelection()
                }
            } else {
                resetSelection()
            }
        } else {
            setSelectModeEnabled(true);
        }
    };

    const selectHandler = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(ids => ids.filter(i => i !== id))
        } else {
            setSelectedIds(ids => [...ids, id])
        }
    }

    const buildView = () => {
        if (videos.length === 0) {
            if (isLoading) {
                return <SkeletonLoader count={5}/>
            } else {
                return <EmptyResults/>;
            }
        }
        return (
            <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore} isLoading={isLoading}>
                <Grid videos={videos} selectModeEnabled={selectModeEnabled} selectedIds={selectedIds}
                      selectHandler={selectHandler}/>
            </InfiniteScroll>
        );
    };

    const addPlaylistButtons = selectedIds.length ? (
        <Button variant="success" className="float-start my-2 mx-1 position-relative" onClick={addToPlaylist}>
            {t("add_to_playlist")}
            <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-pill">
                {selectedIds.length}
            </Badge>
        </Button>
    ) : null;

    return (
        <div className="videos-container">
            <div className="videos-controls">
                <Button
                    variant={selectModeEnabled ? "primary" : "secondary"}
                    className="float-start my-2"
                    onClick={toggleSelectMode}>
                    {t("select.link")}
                </Button>
                {addPlaylistButtons}
                <SearchInput
                    placeholder={t('search_placeholder')}
                    disabled={selectModeEnabled}
                    handleFetch={q => {
                        setPage(1);
                        setSearchQuery(q);
                    }}/>
                <LoadedStats prefix={t('loadedStatsPrefix')} loadedCount={videos.length} meta={videosMeta} />
            </div>
            <div className="videos-scrollable-content">
                {buildView()}
            </div>
        </div>
    );
};

export default Videos;
