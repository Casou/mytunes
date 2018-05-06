import {combineReducers} from 'redux';
import {musiques} from "./pages/listeMusique/reducers/MusiquesReducer";
import {isLoading} from "./common/reducers/LoadingReducer";
import {playlistManager} from "./common/reducers/PlaylistReducer";

export default combineReducers({
    musiques,
    isLoading,
    playlistManager
});