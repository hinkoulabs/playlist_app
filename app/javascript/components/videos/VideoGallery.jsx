import React, {useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';
import Grid from './Grid';
import SearchInput from '../shared/SearchInput';
import InfiniteScroll from '../shared/InfiniteScroll';
import SkeletonLoader from '../shared/SkeletonLoader';
import EmptyResults from '../shared/EmptyResults';
import LoadedStats from '../shared/LoadedStats';
import SortableModeButton from "./SortableModeButton";
import {getRecords} from '../requests';
import {useTranslation} from 'react-i18next';
import notifier from "../../notifier";
import { clone } from 'lodash'

const VideoGallery = ({
                          videosUrl,
                          selectActionComponents,
                          EmptyComponent,
                          sortableUrl
                      }) => {
    const {t} = useTranslation("translation", {keyPrefix: "components.videos.VideoGallery"});

    const [videos, setVideos] = useState([]);
    const [videosBackup, setVideosBackup] = useState([]);
    const [videosMeta, setVideosMeta] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [actionLock, setActionLock] = useState(null)
    const [selectModeEnabled, setSelectModeEnabled] = useState(false);
    const [sortableModeEnabled, setSortableModeEnabled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        setIsLoading(true);
        fetchVideos(1, searchQuery);
    }, [videosUrl, searchQuery]);

    useEffect(() => {
        if (actionLock === 'sort') {
            const backup = clone(videos);
            setVideosBackup(backup);
        }

    }, [actionLock])

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
        setActionLock(null);
        setSelectModeEnabled(false);
        setSelectedIds([]);
    }

    const toggleSelectMode = () => {
        if (selectModeEnabled) {
            resetSelection()
        } else {
            if (actionLock) return;
            setSelectModeEnabled(true);
            setActionLock('select');
        }
    };

    const toggleOrderMode = (saved = false) => {
        if (sortableModeEnabled) {
            setSortableModeEnabled(false);
            setActionLock(null);

            // revert ordering if it's not saved
            if (!saved) {
                setVideos(videosBackup);
                setVideosBackup([]);
            }

        }else{
            if (actionLock) return;
            setSortableModeEnabled(true);
            setActionLock('sort');
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
                      selectedIds={selectedIds}
                      onSelect={onSelect}
                      action={actionLock}
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
                    disabled={actionLock && actionLock !== 'select'}
                    onClick={toggleSelectMode}>
                    {selectModeEnabled ? t("select.active") : t("select.inactive")}
                </Button>
                {selectedIds.length > 0 && renderSelectActionButtons()}
                {
                    sortableUrl &&
                    <SortableModeButton
                        videos={videos}
                        videosBackup={videosBackup}
                        disabled={actionLock && actionLock !== 'sort'}
                        sortableUrl={sortableUrl}
                        mode={sortableModeEnabled}
                        onClick={toggleOrderMode}/>
                }
                <SearchInput
                    placeholder={t('search_placeholder')}
                    disabled={actionLock}
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
