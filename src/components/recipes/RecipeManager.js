import { fetchIt } from "../utilities/Fetch"
import { Settings } from "../utilities/Settings";

export const getAllRecipes = () => {
  return fetchIt(`${Settings.API}/recipes`)
}

export const getSingleRecipe = (id) => {
  return fetchIt(`${Settings.API}/recipes/${id}`);
}

export const getNewestRecipe = () => {
  return fetchIt(`${Settings.API}/recipes/retrieve_most_recent`);
}

export const deleteRecipe = (id) => {
  return fetchIt(`${Settings.API}/recipes/${id}`, "DELETE")
}

export const getRecipesByInventory = () => {
  return fetchIt(`${Settings.API}/recipes/compare_ingredients`)
}

export const getRecipeIngredients = (id) => {
  return fetchIt(`${Settings.API}/recipe_ingredients?recipe=${id}`)
}

export const createRecipe = (recipe) => {
  return fetchIt(`${Settings.API}/recipes`, "POST", recipe)
}

export const createRecipeIngredients = (ingredient) => {
  return fetchIt(`${Settings.API}/recipe_ingredients`, "POST", ingredient)
}

export const getRecipeSteps = (id) => {
  return fetchIt(`${Settings.API}/steps?recipe=${id}`)
}

export const updateRecipe = (recipe) => {
  return fetchIt(`${Settings.API}/recipes`, "PUT", recipe)
}

export const getStyles = () => {
  return fetchIt(`${Settings.API}/styles`)
}

export const createSteps = (steps) => {
  return fetchIt(`${Settings.API}/steps`, "POST", steps)
}