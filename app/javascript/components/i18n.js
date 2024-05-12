import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "components": {
                        "Videos": {
                            "total_count": "Total Videos: {{ count }}",
                            "search_placeholder": "Search Videos",
                            "add_to_playlist": "Add To Playlist",
                            "select": {
                                "link": "Select Mode",
                                "deselect_confirmation": "Are you sure to reset mode? Selected items will be lost."
                            },
                            "failed_videos_load": "Failed to fetch videos"
                        },
                        "utils": {
                            "EmptyResults": {
                                "message": "Sorry, we couldn't find any results matching your criteria.",
                                "no_data": "No Data Found"
                            },
                            "InfiniteScroll": {
                                "loading_more": "Loading more ..."
                            },
                            "SearchInput": {
                                "placeholder": "Search"
                            },
                            "ViewModeSelector": {
                                "grid": "Grid View",
                                "list": "List View"
                            }
                        }
                    },
                    "video": {
                        "view_count": "View Count: {{count}}",
                        "read_more": "Read More"
                    }
                }
            }
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });
export default i18n;
