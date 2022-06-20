import "/Users/adam/workspace/Final-Capstone-front-end/src/components/App.css"
import { useState, useEffect } from "react"
import { ColumnContainer, ContentContainer, ImageContainer, MainContent, RecipeCard, RowContainer } from "../styles/Containers.style"
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
            <MainContent>
                <div id="filterContainer">
                <input name="filter"
                        type="checkbox"
                        htmlFor="filter"
                        id="inventoryFilter"
                        onClick={() => {
                            toggleFilter()}}
                />
                <Label id="inventoryFilterLabel">Filter by inventory</Label>
                </div>
                <RowContainer>
                {recipes.map(
                    (r) => {
                            return <ColumnContainer>
                                        <RecipeCard>
                                            <Link to={`/recipe_details/${r.id}`} className="recipeLink">
                                                {r.name} 
                                                <ImageContainer>
                                                    <img src={`${r.style?.image}`}></img>
                                                </ImageContainer>
                                            </Link>
                                        </RecipeCard>
                                    </ColumnContainer>
                    })}
                    </RowContainer>
            </MainContent>
        </ContentContainer>
    )
}