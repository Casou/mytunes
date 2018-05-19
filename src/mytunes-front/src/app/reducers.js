import {combineReducers} from 'redux';
import {musiques} from "./pages/listeMusique/reducers/MusiquesReducer";
import {isLoading} from "./common/reducers/LoadingReducer";
import {playlistManager} from "./common/reducers/PlaylistManagerReducer";
import {genres} from "./common/reducers/GenreReducer";
import {playlistProvider} from "./common/reducers/PlaylistsReducer";

export default combineReducers({
    musiques,
    isLoading,
    playlistManager,
    genres,
    playlistProvider
});