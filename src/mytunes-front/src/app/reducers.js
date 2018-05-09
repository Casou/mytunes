import {combineReducers} from 'redux';
import {musiques} from "./pages/listeMusique/reducers/MusiquesReducer";
import {isLoading} from "./common/reducers/LoadingReducer";
import {playlistManager} from "./common/reducers/PlaylistReducer";
import {genres} from "./common/reducers/GenreReducer";

export default combineReducers({
    musiques,
    isLoading,
    playlistManager,
    genres
});