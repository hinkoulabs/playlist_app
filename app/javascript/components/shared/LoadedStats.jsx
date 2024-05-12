import React from 'react';
import {useTranslation} from 'react-i18next';

const LoadedStats = ({prefix, loadedCount, meta}) => {
    const {t} = useTranslation("translation", {keyPrefix: "components.shared.LoadedStats"});

    console.log(meta)

    if (!meta) return;

    return (
        <small className="text-muted">
            {t("total_count", { prefix: prefix, loadedCount: loadedCount, totalCount: meta.total })}
        </small>
    );
};

export default LoadedStats;