import { fetchIt } from "../utilities/Fetch";
import { Settings } from "../utilities/Settings";

export const getIngredients = () => {
    return fetchIt(`${Settings.API}/ingredients`)
  }

export const getInventory = () => {
  return fetchIt(`${Settings.API}/user_ingredients/current_user_inventory`)
}

export const addInventory = (newIngredient) => {
    return fetchIt(`${Settings.API}/user_ingredients`, "POST", newIngredient)
}

export const updateInventory = (newIngredient, id) => {
  return fetchIt(`${Settings.API}/user_ingredients/${id}`, "PUT", newIngredient)
}
