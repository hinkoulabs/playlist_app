import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "list_view": "List View",
                    "grid_view": "Grid View",
                    "enable_select_mode": "Enable Select Mode",
                    "disable_select_mode": "Disable Select Mode",
                    "search_videos": "Search Videos",
                    "no_videos_found": "No videos found.",
                    "load_more": "Load More",
                    "add_to_project": "Add to Project",
                    "select_videos": "Select Videos",
                    "create_project": "Create Project",
                    "video_count": "Views: {{count}}"
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
