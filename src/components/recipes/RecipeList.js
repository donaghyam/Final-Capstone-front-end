import { useState, useEffect } from "react"
import { ContentContainer, RecipeCard } from "../styles/Containers.style"
import { Label, SubHeader } from "../styles/Text.style"
import { getAllRecipes, getRecipesByInventory } from "./RecipeManager"
import { Link, useHistory } from "react-router-dom"

export const RecipeList = ({setSelectedRecipe}) => {
    const [recipes, setRecipes] = useState([])
    const [inventoryFilter, setFilerStatus] = useState(false)
    const history = useHistory()

    useEffect(
        () => {
            inventoryFilter ?
            getRecipesByInventory()
                .then(setRecipes)
            : 
            getAllRecipes()
            .then(setRecipes)
        },
        []
    )

    return (

        <ContentContainer>
            <>
                <input name="filter"
                        type="checkbox"
                        htmlFor="filter"
                        id="inventoryFilter"
                        onChange={setFilerStatus(true)}
                />
                <Label>Filter by inventory</Label>
            </>
            {recipes.map(
                (r) => {
                        return <RecipeCard>
                            <button onClick={() => setSelectedRecipe(r.id)
                            .then(history.push("/recipe_details"))}>
                                <SubHeader>{r.name}</SubHeader>
                            </button>
                        </RecipeCard>
                })}
        </ContentContainer>
    )
}