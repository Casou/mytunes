import {__SERVER_URL__} from "../../../App";
import axios from "axios";
import { NotificationManager } from "react-notifications";

export default class RequestUtil {
  
  static put(url, content) {
    const serverUrl = __SERVER_URL__ + url;
    return axios.put(serverUrl, content)
    .catch(error => {
      console.error("Axios", error);
      NotificationManager.error("Erreur lors d'une requête à " + serverUrl, "Erreur lors d'une requête PUT", 3000, null, true);
      throw error;
    });
  };

  static delete(url, content) {
    const serverUrl = __SERVER_URL__ + url;
    return axios.delete(serverUrl, content)
    .catch(error => {
      console.error("Axios", error);
      NotificationManager.error("Erreur lors d'une requête à " + serverUrl, "Erreur lors d'une requête DELETE", 3000, null, true);
      throw error;
    });
  };

}