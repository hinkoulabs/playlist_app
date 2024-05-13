import React from 'react';
import {useTranslation} from 'react-i18next';

const EmptyProjectVideos = ({message}) => {
    const {t} = useTranslation("translation", {keyPrefix: "components.videos.EmptyProjectVideos"});

    return (
        <div className="px-4 py-5 my-5 text-center">
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">
                    {t('title')}
                </p>
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <a href="/" className="btn btn-primary btn-lg px-4 gap-3">{t('button')}</a>
                </div>
            </div>
        </div>
    );
};

export default EmptyProjectVideos;