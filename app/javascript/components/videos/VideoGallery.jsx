import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import Grid from './Grid';
import SearchInput from '../shared/SearchInput';
import InfiniteScroll from '../shared/InfiniteScroll';
import SkeletonLoader from '../shared/SkeletonLoader';
import EmptyResults from '../shared/EmptyResults';
import LoadedStats from '../shared/LoadedStats';
import SortableModeButton from "./SortableButton";
import {getRecords} from '../requests';
import {useTranslation} from 'react-i18next';
import notifier from "../../notifier";

const VideoGallery = ({
                          videosUrl,
                          selectActionComponents,
                          EmptyComponent,
                          sortableUrl
                      }) => {
    const {t} = useTranslation("translation", {keyPrefix: "components.videos.VideoGallery"});

    const [videos, setVideos] = useState([]);
    const [videosMeta, setVideosMeta] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [selectModeEnabled, setSelectModeEnabled] = useState(false);
    const [sortableModeEnabled, setSortableModeEnabled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        fetchVideos(1, searchQuery);
    }, [videosUrl, searchQuery]);

    const fetchVideos = async (pageNum, query) => {
        setIsLoading(true);
        const result = await getRecords(videosUrl, pageNum, query);
        if (result.status) {
            setVideos(pageNum === 1 ? result.records : [...videos, ...result.records]);
            setHasMore(result.hasMore);
            setVideosMeta(result.meta);
            setPage(pageNum + 1);
        } else {
            setHasMore(false);
            notifier("error", `${t('failed_videos_load')}: ${result.error}`);
        }
        setIsLoading(false);
    };

    const handleLoadMore = () => {
        if (!hasMore) return;
        fetchVideos(page, searchQuery);
    };

    const onSearch = (q) => {
        setPage(1);
        setSearchQuery(q);
    };

    const resetSelection = (deleted = false) => {
        if (deleted) {
            setVideos(videos => videos.filter(v => !selectedIds.includes(v.id)))
        }
        setSelectModeEnabled(false);
        setSelectedIds([]);
    }

    const toggleSelectMode = () => {
        if (selectModeEnabled) {
            resetSelection()
        } else {
            setSelectModeEnabled(true);
        }
    };

    const onSelect = (id) => {
        setSelectedIds(ids =>
            ids.includes(id) ? ids.filter(i => i !== id) : [...ids, id]
        );
    };

    const onSortEnd = (videos) => {
        setVideos(videos);
    }

    const renderSelectActionButtons = () => {
        return selectActionComponents.map(
            ({Component, props}, key) => {
                return <Component {...props} key={key} selectedIds={selectedIds} resetSelection={resetSelection}/>
            });
    };

    const buildView = () => {
        if (videos.length === 0) {
            return isLoading ? <SkeletonLoader count={5}/> : <EmptyResults/>;
        }
        return (
            <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore} isLoading={isLoading}>
                <Grid videos={videos}
                      selectModeEnabled={selectModeEnabled}
                      selectedIds={selectedIds}
                      onSelect={onSelect}
                      sortableModeEnabled={sortableModeEnabled}
                      onSortEnd={onSortEnd}
                />
            </InfiniteScroll>
        );
    };

    if (!isLoading && !videos.length && !searchQuery && EmptyComponent) {
        return <EmptyComponent/>;
    }

    return (
        <div className="videos-container">
            <div className="videos-controls">
                <Button
                    variant={selectModeEnabled ? "primary" : "secondary"}
                    className="float-start my-2"
                    onClick={toggleSelectMode}>
                    {t("select.link")}
                </Button>
                {selectedIds.length > 0 && renderSelectActionButtons()}
                {
                    sortableUrl &&
                    <SortableModeButton
                        videos={videos}
                        sortableUrl={sortableUrl}
                        mode={sortableModeEnabled}
                        onClick={() => setSortableModeEnabled(m => !m)}/>
                }
                <SearchInput
                    placeholder={t('search_placeholder')}
                    disabled={selectModeEnabled || sortableModeEnabled}
                    onSearch={onSearch}/>
                <LoadedStats prefix={t('loadedStatsPrefix')} loadedCount={videos.length} meta={videosMeta}/>
            </div>
            <div className="videos-scrollable-content">
                {buildView()}
            </div>
        </div>
    );
};

export default VideoGallery;
