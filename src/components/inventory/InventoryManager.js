import { fetchIt } from "../utilities/Fetch";
import { Settings } from "../utilities/Settings";

export const getInventory = () => {
  return fetchIt(`${Settings.API}/user_ingredients`)
}

export const addInventory = () => {
    return fetchIt(`${Settings.API}/user_ingredients`, "POST");
  };
