import "/Users/adam/workspace/Final-Capstone-front-end/src/components/App.css"
import { useState, useEffect } from "react"
import { ContentContainer, MainContent, RecipeCard, Line } from "../styles/Containers.style"
import { Label, SubHeader, Header, PageTitle } from "../styles/Text.style"
import { addInventory, getIngredients, getInventory, updateInventory } from "./InventoryManager"
import { Table, TableBody, TableData, TableHeader, TableRow, TH } from "../styles/Tables.style"


export const InventoryList = () => {
    const [inventory, setInventory] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState({
        ingredient: 0,
        quantity: 0
    })

    useEffect(
        () => {
            getInventory()
                .then(setInventory)
            
            .then(() => {
                getIngredients()
                    .then(setIngredients)
            })
        },
        []
    )

    const checkInvToUpdate = () => {

        let ingredientExists = false

        for (const i of inventory) {
                if (newIngredient.ingredient === i.ingredient?.id && ingredientExists === false){
                    ingredientExists = true
                    const updatedIngredient = { ...i}
                    const newQuantity = newIngredient.quantity + i.quantity
                    updatedIngredient.quantity = newQuantity
                    updateInventory(updatedIngredient, i.id)
                }}

            if (ingredientExists === false){
                addInventory(newIngredient)
            }
        }

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
                <PageTitle>Your inventory</PageTitle>
                <Line></Line>
         {/* table for malt */}
        <Header>Malt</Header>
        <Table>
            <TableBody>
            <TableHeader>
                <TableRow>
                    <TH>Amount</TH>
                    <TH>Variety</TH>
                </TableRow>
            </TableHeader>
                {inventory.map(
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
        <SubHeader>Add Malt</SubHeader>
        <form>
            <select onChange={(event) => {
                const copy = { ...newIngredient}
                copy.ingredient = parseInt(event.target.value)
                setNewIngredient(copy)
                }}>
                <option value="0">Select malt variety</option>
                    {ingredients.map(
                        (i) => {
                            if (i.type === "Malt"){
                                return <option value={i.id} name="ingredient">{i.name}</option>
                            }
                        }
                    )}
                </select>
                <input 
                    type="text" 
                    name="quantity" 
                    required="required" 
                    placeholder="Enter quantity (oz.)"
                    onChange={(event) => {
                        const copy = { ...newIngredient}
                        copy.quantity = parseInt(event.target.value)
                        setNewIngredient(copy)
                    }} />
        <button type="submit" onClick={() => {
            checkInvToUpdate()
        }}>Add</button>
        </form>
        <Line></Line>

        {/* table for hops */}
        <Header>Hops</Header>
        <Table>
            <TableBody>
            <TableHeader>
                <TableRow>
                    <TH>Amount</TH>
                    <TH>Variety</TH>
                    <TH>Alpha acids</TH>
                </TableRow>
            </TableHeader>
                {inventory.map(
                    (i) => {
                        if (i.ingredient.type === "Hops"){
                            return <>
                            <TableRow>
                            <TableData>{i.quantity} oz</TableData>
                            <TableData>{i.ingredient.name}</TableData>
                            <TableData>{i.ingredient.alpha_acids}</TableData>
                            </TableRow>
                            </>
                        }})}
            </TableBody>
        </Table>
        <SubHeader>Add Hops</SubHeader>
        <form>
            <select onChange={(event) => {
                const copy = { ...newIngredient}
                copy.ingredient = parseInt(event.target.value)
                setNewIngredient(copy)
            }}>
                <option value="0">Select hop variety</option>
                {ingredients.map(
                    (i) => {
                        if (i.type === "Hops"){
                            return <option value={i.id} name="ingredient">{i.name}</option>
                        }
                    }
                )}
            </select>
            <input 
                type="text" 
                name="quantity" 
                placeholder="Enter quantity (oz.)"
                onChange={(event) => {
                    const copy = { ...newIngredient}
                    copy.quantity = parseInt(event.target.value)
                    setNewIngredient(copy)
                }} />
        <button type="submit" onClick={() => {
            checkInvToUpdate()
        }}>Add</button>
        </form>
        <Line></Line>

        {/* table for yeast */}
        <Header>Yeast</Header>
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
                            <TableRow>
                            <TableData>{i.ingredient.name}</TableData>
                            <TableData>{i.quantity}</TableData>
                            </TableRow>
                            </>
                        }})}
            </TableBody>
        </Table>
        <SubHeader>Add Yeast</SubHeader>
        <form>
            <select onChange={(event) => {
                const copy = { ...newIngredient}
                copy.ingredient = parseInt(event.target.value)
                setNewIngredient(copy)
                }}>
                <option value="0">Select yeast variety</option>
                    {ingredients.map(
                        (i) => {
                            if (i.type === "Yeast"){
                                return <option value={i.id} name="ingredient">{i.name}</option>
                            }
                        }
                    )}
                </select>
                <input 
                    type="text" 
                    name="quantity" 
                    required="required" 
                    placeholder="Enter quantity (oz.)"
                    onChange={(event) => {
                        const copy = { ...newIngredient}
                        copy.quantity = parseInt(event.target.value)
                        setNewIngredient(copy)
                    }} />
        <button type="submit" onClick={() => {
            checkInvToUpdate()
        }}>Add</button>
        </form>
        </MainContent>
    </ContentContainer>
    )
}