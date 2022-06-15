import React from "react"
import { Route } from "react-router-dom"
import { RecipeDetails } from "./recipes/RecipeDetails"
import { RecipeList } from "./recipes/RecipeList"
import { useState } from "react"

const [selectedRecipe, setSelectedRecipe] = useState()

export const ApplicationViews = () => {
    return <>
        <Route exact path="/recipe_details">
            <RecipeDetails selectedRecipe={selectedRecipe}/>
        </Route>
        <Route exact path="/recipes">
            <RecipeList setSelectedRecipe={setSelectedRecipe}/>
        </Route>
    </>
}
