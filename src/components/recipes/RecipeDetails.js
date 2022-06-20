import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { ContentContainer, DescriptionColumn, DescriptionContainer, Line, DescriptionContentColumn, DescriptionLabelColumn, MainContent, TableContainer } from "../styles/Containers.style"
import { Table, TableBody, TableData, TableHeader, TableRow, TH } from "../styles/Tables.style"
import { Content, Label, SubHeader, Header } from "../styles/Text.style"
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
            <MainContent>
        
            {/* list recipe stats */}
            <Header>{recipe.name}</Header>

            <DescriptionContainer>
                <DescriptionLabelColumn>
                    <Label>Description: </Label> 
                </DescriptionLabelColumn>
                <DescriptionContentColumn>
                    <Content>{recipe.description}</Content>
                </DescriptionContentColumn>
            </DescriptionContainer>
            <DescriptionContainer>
                <DescriptionLabelColumn>
                    <Label>Style: </Label> 
                </DescriptionLabelColumn>
                <DescriptionContentColumn>
                    <Content>{recipe.style?.label}</Content>
                </DescriptionContentColumn>
            </DescriptionContainer>
            <DescriptionContainer>
                <DescriptionLabelColumn>
                    <Label>Starting gravity: </Label> 
                </DescriptionLabelColumn>
                <DescriptionContentColumn>
                    <Content>{recipe.starting_gravity}</Content>
                </DescriptionContentColumn>
            </DescriptionContainer>
            <DescriptionContainer>
                <DescriptionLabelColumn>
                    <Label>Final gravity: </Label> 
                </DescriptionLabelColumn>
                <DescriptionContentColumn>
                    <Content>{recipe.final_gravity}</Content>
                </DescriptionContentColumn>
            </DescriptionContainer>
            <DescriptionContainer>
                <DescriptionLabelColumn>
                    <Label>ABV: </Label> 
                </DescriptionLabelColumn>
                <DescriptionContentColumn>
                    <Content>{recipe.abv}</Content>
                </DescriptionContentColumn>
            </DescriptionContainer>
            <DescriptionContainer>
                <DescriptionLabelColumn>
                    <Label>SRM: </Label> 
                </DescriptionLabelColumn>
                <DescriptionContentColumn>
                    <Content>{recipe.srm}</Content>
                </DescriptionContentColumn>
            </DescriptionContainer>
            <DescriptionContainer>
                <DescriptionLabelColumn>
                    <Label>Mash pH: </Label> 
                </DescriptionLabelColumn>
                <DescriptionContentColumn>
                    <Content>{recipe.mash_ph}</Content>
                </DescriptionContentColumn>
            </DescriptionContainer>
            <DescriptionContainer>
                <DescriptionLabelColumn>
                    <Label>Batch volume: </Label> 
                </DescriptionLabelColumn>
                <DescriptionContentColumn>
                    <Content>{recipe.batch_volume}</Content>
                </DescriptionContentColumn>
            </DescriptionContainer>
            <DescriptionContainer>
                <DescriptionLabelColumn>
                    <Label>Pre boil volume: </Label> 
                </DescriptionLabelColumn>
                <DescriptionContentColumn>
                    <Content>{recipe.pre_boil_volume}</Content>
                </DescriptionContentColumn>
            </DescriptionContainer>
            <DescriptionContainer>
                <DescriptionLabelColumn>
                    <Label>Boil time: </Label> 
                </DescriptionLabelColumn>
                <DescriptionContentColumn>
                    <Content>{recipe.boil_time}</Content>
                </DescriptionContentColumn>
            </DescriptionContainer>
            <Line></Line>

            {/* table for fermentables (malt) */}
            <SubHeader>Fermentables</SubHeader>
            <TableContainer>
            <Table>
                <TableBody>
                <TableHeader>
                    <TableRow>
                        <TH>Amount</TH>
                        <TH>Fermentable</TH>
                    </TableRow>
                </TableHeader>
                    {ingredients.map(
                        (i) => {
                            if (i.ingredient.type === "Malt"){
                                return <>
                                <TableRow>
                                <TableData>{convertUnits(parseInt(i.quantity))}</TableData>
                                <TableData>{i.ingredient.name}</TableData>
                                </TableRow>
                                </>
                            }})}
                </TableBody>
            </Table>
            </TableContainer>
            <Line></Line>

            {/* table for hops */}
            <SubHeader>Hops</SubHeader>
            <TableContainer>
            <Table>
                <TableBody>
                <TableHeader>
                    <TableRow>
                        <TH>Amount</TH>
                        <TH>Variety</TH>
                        <TH>Alpha acids</TH>
                        <TH>Use</TH>
                        <TH>Time</TH>
                    </TableRow>
                </TableHeader>
                    {ingredients.map(
                        (i) => {
                            if (i.ingredient.type === "Hops"){
                                return <>
                                <TableRow>
                                <TableData>{i.quantity} oz</TableData>
                                <TableData>{i.ingredient.name}</TableData>
                                <TableData>{i.ingredient.alpha_acids}</TableData>
                                <TableData>{i.use}</TableData>
                                {i.use === "Boil" ?
                                <TableData>{i.time} min</TableData>
                                : <TableData>{i.time}</TableData>
                                }
                                </TableRow>
                                </>
                            }})}
                </TableBody>
            </Table>
            </TableContainer>
            <Line></Line>

            {/* table for mash guidelines (steps) */}
            <SubHeader>Mash Guidelines</SubHeader>
            <TableContainer>
            <Table>
                <TableBody>
                <TableHeader>
                    <TableRow>
                        <TH>Amount</TH>
                        <TH>Temperature (°F)</TH>
                        <TH>Time</TH>
                    </TableRow>
                </TableHeader>
                    {steps.map(
                        (s) => {
                            if (s.amount === null){
                                return <>
                                <TableRow>
                                <TableData>{s.amount}</TableData>
                                <TableData>{s.temperature}</TableData>
                                <TableData>{s.time}</TableData>
                                </TableRow>
                            </>
                            } else {
                                return <>
                                <TableRow>
                                <TableData>{s.amount} gal</TableData>
                                <TableData>{s.temperature}</TableData>
                                <TableData>{s.time}</TableData>
                                </TableRow>
                                </>
                            }
                        })}
                </TableBody>
            </Table>
            </TableContainer>
            <Line></Line>

            {/* table for yeast */}
            <SubHeader>Yeast</SubHeader>
            <TableContainer>
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
                                <TableRow>
                                <TableData>{i.ingredient.name}</TableData>
                                <TableData>{i.quantity}</TableData>
                                </TableRow>
                                </>
                            }})}
                </TableBody>
            </Table>
            </TableContainer>
            </MainContent>
        </ContentContainer>
    )
}