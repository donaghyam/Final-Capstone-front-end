import { fetchIt } from "../utilities/Fetch";
import { Settings } from "../utilities/Settings";

export const getAllRecipes = () => {
  return fetchIt(`${Settings.API}/recipes`)
}

export const getSingleRecipe = (id) => {
  return fetchIt(`${Settings.API}/posts/${id}`);
};

export const deleteRecipe = (id) => {
  return fetchIt(`${Settings.API}/recipes/${id}`, "DELETE");
};

export const getRecipesByInventory = () => {
  return fetchIt(`${Settings.API}/recipes/compare_ingredients`)
};

export const getRecipeIngredients = (id) => {
  return fetchIt(`${Settings.API}/recipe_ingredients?recipe=${id}`);
};

export const createRecipe = () => {
    return fetchIt(`${Settings.API}/recipes`, "POST");
  };

  export const createRecipeIngredients = () => {
    return fetchIt(`${Settings.API}/recipe_ingredients`, "POST");
  };

  export const getRecipeSteps = (id) => {
    return fetchIt(`${Settings.API}/steps?recipe=${id}`)
  };