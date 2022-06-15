import { useState, useEffect } from "react"
import { ContentContainer, RecipeCard } from "../styles/Containers.style"
import { Label, SubHeader } from "../styles/Text.style"
import { getAllRecipes, getRecipesByInventory } from "./RecipeManager"
import { Link, useHistory } from "react-router-dom"

export const RecipeList = () => {
    const [recipes, setRecipes] = useState([])
    const [inventoryFilter, setFilterStatus] = useState(false)
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
        [inventoryFilter]
    )

    const toggleFilter = () => {
        inventoryFilter ?
        setFilterStatus(false)
        : setFilterStatus(true)
    }

    return (

        <ContentContainer>
            <>
                <input name="filter"
                        type="checkbox"
                        htmlFor="filter"
                        id="inventoryFilter"
                        onClick={() => {
                            toggleFilter()}}
                />
                <Label>Filter by inventory</Label>
            </>
            {recipes.map(
                (r) => {
                        return <RecipeCard>
                            <button onClick={() => history.push(`/recipe_details/${r.id}`
                            )}> {r.name} </button>
                        </RecipeCard>
                })}
        </ContentContainer>
    )
}