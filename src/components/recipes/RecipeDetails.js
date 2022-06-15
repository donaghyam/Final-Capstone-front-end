import { useState, useEffect } from "react"
import { ContentContainer } from "../styles/Containers.style"
import { Table, TableBody, TableData, TableHeader, TableRow, TH } from "../styles/Tables.style"
import { Content, Label, SubHeader } from "../styles/Text.style"
import { getRecipeIngredients, getRecipeSteps, getSingleRecipe } from "./RecipeManager"

export const RecipeDetails = ({selectedRecipe}) => {
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState([])
    const [steps, setSteps] = useState([])

    useEffect(
        () => {
            getSingleRecipe(selectedRecipe)
                .then(setRecipe)
        },
        []
    )

    useEffect(
        () => {
            getRecipeIngredients(selectedRecipe)
                .then(setIngredients)
        },
        []
    )

    useEffect(
        () => {
            getRecipeSteps(selectedRecipe)
                .then(setSteps)
        },
        []
    )

    return (

        <ContentContainer>
            {/* list recipe stats */}
            {recipe.map(
                (r) => {
                    return <>
                    <SubHeader>{r.name}</SubHeader>
                    <Label>Description: </Label> 
                        <Content>{r.description}</Content>
                    <Label>Style: </Label> 
                        <Content>{r.style.label}</Content>
                    <Label>Starting gravity: </Label> 
                        <Content>{r.starting_gravity}</Content>
                    <Label>Final gravity: </Label> 
                        <Content>{r.final_gravity}</Content>
                    <Label>ABV: </Label> 
                        <Content>{r.abv}</Content>
                    <Label>SRM: </Label> 
                        <Content>{r.srm}</Content>
                    <Label>Mash pH: </Label> 
                        <Content>{r.mash_ph}</Content>
                    <Label>Batch volume: </Label> 
                        <Content>{r.batch_volume}</Content>
                    <Label>Pre boil volume: </Label> 
                        <Content>{r.pre_boil_volume}</Content>
                    <Label>Boil time: </Label> 
                        <Content>{r.boil_time}</Content>
                    </>
                })}

            {/* table for fermentables (malt) */}
            <SubHeader>Fermentables</SubHeader>
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
                                <TableData>{i.quantity} oz</TableData>
                                <TableData>{i.ingredient.name}</TableData>
                                </>
                            }})}
                </TableBody>
            </Table>

            {/* table for hops */}
            <SubHeader>Hops</SubHeader>
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
                            if (i.type === "Hops"){
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
                <TableBody>
                    <TableHeader>
                        <TableRow>
                            <TH>Amount</TH>
                            <TH>Description</TH>
                            <TH>Type</TH>
                            <TH>Temp</TH>
                            <TH>Time</TH>
                        </TableRow>
                    </TableHeader>
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