import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ContentContainer } from "../styles/Containers.style"
import { Table, TableBody, TableData, TableHeader, TableRow, TH } from "../styles/Tables.style"
import { Content, Label, SubHeader } from "../styles/Text.style"
import { getRecipeIngredients, getRecipeSteps, getSingleRecipe } from "./RecipeManager"

export const RecipeDetails = () => {
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState({})
    const [steps, setSteps] = useState([])
    const { recipeId } = useParams()

    useEffect(
        () => {
            getSingleRecipe(recipeId)
                .then(setRecipe)

            .then(() => {
                getRecipeIngredients(recipeId)
                    .then(setIngredients)
            })
            
            .then(() => {
                getRecipeSteps(recipeId)
                    .then(setSteps)
            })
        },
        []
    )

    const convertUnits = (ingredient) => {

        if (ingredient >= 16){
            let newIngredient = ingredient/16
            newIngredient += " lb"
            return newIngredient
        } else {
            ingredient += " oz"
            return ingredient
        }}

    return (

        <ContentContainer>

            {/* list recipe stats */}
            <SubHeader>{recipe.name}</SubHeader>
            <Label>Description: </Label> 
                <Content>{recipe.description}</Content>
            <Label>Style: </Label> 
                <Content>{recipe.style?.label}</Content>
            <Label>Starting gravity: </Label> 
                <Content>{recipe.starting_gravity}</Content>
            <Label>Final gravity: </Label> 
                <Content>{recipe.final_gravity}</Content>
            <Label>ABV: </Label> 
                <Content>{recipe.abv}</Content>
            <Label>SRM: </Label> 
                <Content>{recipe.srm}</Content>
            <Label>Mash pH: </Label> 
                <Content>{recipe.mash_ph}</Content>
            <Label>Batch volume: </Label> 
                <Content>{recipe.batch_volume}</Content>
            <Label>Pre boil volume: </Label> 
                <Content>{recipe.pre_boil_volume}</Content>
            <Label>Boil time: </Label> 
                <Content>{recipe.boil_time}</Content>

            {/* table for fermentables (malt) */}
            <SubHeader>Fermentables</SubHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TH>Amount</TH>
                        <TH>Fermentable</TH>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ingredients.map(
                        (i) => {
                            if (i.ingredient.type === "Malt"){
                                return <>
                                <TableData>{convertUnits(parseInt(i.quantity))}</TableData>
                                <TableData>{i.ingredient.name}</TableData>
                                </>
                            }})}
                </TableBody>
            </Table>

            {/* table for hops */}
            <SubHeader>Hops</SubHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TH>Amount</TH>
                        <TH>Variety</TH>
                        <TH>Alpha acids</TH>
                        <TH>Use</TH>
                        <TH>Time</TH>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ingredients.map(
                        (i) => {
                            if (i.ingredient.type === "Hops"){
                                return <>
                                <TableData>{i.quantity} oz</TableData>
                                <TableData>{i.ingredient.name}</TableData>
                                <TableData>{i.ingredient.alpha_acids}</TableData>
                                <TableData>{i.use}</TableData>
                                {i.use === "Boil" ?
                                <TableData>{i.time} min</TableData>
                                : <TableData>{i.time}</TableData>
                                }
                                </>
                            }})}
                </TableBody>
            </Table>

            {/* table for mash guidelines (steps) */}
            <SubHeader>Mash Guidelines</SubHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TH>Amount</TH>
                        <TH>Description</TH>
                        <TH>Type</TH>
                        <TH>Temp</TH>
                        <TH>Time</TH>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {steps.map(
                        (s) => {
                            return <>
                            <TableData>{s.amount} oz</TableData>
                            <TableData>{s.description}</TableData>
                            <TableData>{s.type}</TableData>
                            <TableData>{s.temperature}</TableData>
                            <TableData>{s.time}</TableData>
                            </>
                        })}
                </TableBody>
            </Table>

            {/* table for yeast */}
            <SubHeader>Yeast</SubHeader>
            <Table>
                <TableBody>
                    <TableHeader>
                        <TableRow>
                            <TH>Variety</TH>
                            <TH>Amount</TH>
                        </TableRow>
                    </TableHeader>
                    {ingredients.map(
                        (i) => {
                            if (i.ingredient.type === "Yeast"){
                                return <>
                                <TableData>{i.ingredient.name}</TableData>
                                <TableData>{i.quantity}</TableData>
                                </>
                            }})}
                </TableBody>
            </Table>
        </ContentContainer>
    )
}