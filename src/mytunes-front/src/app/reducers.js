import { combineReducers } from 'redux';
import { musiques } from "./pages/listeMusique/reducers/MusiquesReducer";
import { isLoading } from "./common/reducers/loadingReducer";

export default combineReducers({
  musiques,
  isLoading
});