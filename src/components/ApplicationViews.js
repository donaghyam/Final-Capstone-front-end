import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./home/home"
import { InventoryList } from "./inventory/InventoryList"
import { CreateRecipe } from "./recipes/CreateRecipe"
import { RecipeDetails } from "./recipes/RecipeDetails"
import { RecipeList } from "./recipes/RecipeList"

export const ApplicationViews = () => {
    return <>
        <Route exact path="/recipe_details/:recipeId(\d+)">
            <RecipeDetails />
        </Route>
        <Route exact path="/recipes">
            <RecipeList />
        </Route>
        <Route exact path="/inventory">
            <InventoryList />
        </Route>
        <Route exact path="/createrecipe">
            <CreateRecipe />
        </Route>
        <Route exact path="/">
            <Home />
        </Route>
    </>
}
