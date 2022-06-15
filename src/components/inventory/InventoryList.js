import { useState, useEffect } from "react"
import { ContentContainer, RecipeCard } from "../styles/Containers.style"
import { Label, SubHeader } from "../styles/Text.style"
import { Link, useHistory } from "react-router-dom"
import { getInventory } from "./InventoryManager"
import { Table, TableBody, TableData, TableHeader, TableRow, TH } from "../styles/Tables.style"


export const InventoryList = () => {
    const [inventory, setInventory] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getInventory()
                .then(setInventory)
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

         {/* table for malt */}
        <SubHeader>Malt</SubHeader>
        <Table>
            <TableHeader>
                <TableRow>
                    <TH>Amount</TH>
                    <TH>Variety</TH>
                </TableRow>
            </TableHeader>
            <TableBody>
                {inventory.map(
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
                {inventory.map(
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
                {inventory.map(
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