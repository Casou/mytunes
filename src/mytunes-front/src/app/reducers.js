import { combineReducers } from 'redux';
import { musiques } from "./pages/listeMusique/reducers/MusiquesReducer";
import { isLoading } from "./common/reducers/LoadingReducer";
import { playlist } from "./common/reducers/PlaylistReducer";

export default combineReducers({
  musiques,
  isLoading,
  playlist
});