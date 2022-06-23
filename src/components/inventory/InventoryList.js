import "/Users/adam/workspace/Final-Capstone-front-end/src/components/App.css"
import { useState, useEffect } from "react"
import { ContentContainer, MainContent, RecipeCard, Line } from "../styles/Containers.style"
import { Label, SubHeader, Header, PageTitle } from "../styles/Text.style"
import { addInventory, getIngredients, getInventory, updateInventory, deleteInventory } from "./InventoryManager"
import { Table, TableBody, TableData, TableHeader, TableRow, TH } from "../styles/Tables.style"


export const InventoryList = () => {
//<--------------------------------------------Initial setup--------------------------------------------------------> 
    const [inventory, setInventory] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [editing, setEditing] = useState(false)
    const [editingMalt, setEditingMalt] = useState(false)
    const [editingHops, setEditingHops] = useState(false)
    const [editingYeast, setEditingYeast] = useState(false)
    const [newIngredient, setNewIngredient] = useState({
        ingredient: 0,
        quantity: 0
    })
    useEffect(
        () => {
            getIngredients()
                .then(setIngredients)
        },
        []
    )
    useEffect(
        () => {
            getInventory()
                .then(setInventory)
        },
        []
    )
    //when editing malt, hops, or yeast, set editing to true
    useEffect(
        () => {
            if (editingMalt || editingHops || editingYeast){
                setEditing(true)
            } else {
                setEditing(false)
            }
        },
        [newIngredient]
    )
//<------------------------------------------------------------------------------------------------------------------->
//<--------------------------------Inventory submission function-------------------------------------------------->
    const checkInvToUpdate = () => {
        let ingredientExists = false
        for (const i of inventory) {
            //check if ingredient already exists in inventory
            if (newIngredient.ingredient === i.ingredient?.id && ingredientExists === false){
                //if not editing, add new ingredient quantity to existing ingredient quantity
                //for PUT
                if (editing === false){
                    ingredientExists = true
                    const updatedIngredient = { ...i}
                    const newQuantity = newIngredient.quantity + i.quantity
                    updatedIngredient.quantity = newQuantity
                    updatedIngredient.ingredient = i.ingredient?.id
                    updateInventory(updatedIngredient, i.id)
                //if editing, update quantity for PUT
                } else if (editing === true){
                    ingredientExists = true
                    updateInventory(newIngredient, i.id)
                        .then(() => {
                            setEditing(false)
                            getInventory()
                                .then(setInventory)
                        })
                }
            }
        }
            //ingredient POST
            if (ingredientExists === false){
                addInventory(newIngredient)
            }
        //reset state for editing
        setEditingHops(false)
        setEditingMalt(false)
        setEditingYeast(false)
    }
//<------------------------------------------------------------------------------------------------------------------->
//<--------------------------------Utility functions------------------------------------------------------------------>
    const convertUnits = (ingredient) => {
        if (ingredient >= 16){
            let newIngredient = ingredient/16
            newIngredient += " lb"
            return newIngredient
        } else {
            ingredient += " oz"
            return ingredient
        }
    }
//<----------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------JSX return----------------------------------------------------------->
    return (

        <ContentContainer>
            <MainContent>
                <PageTitle>Your inventory</PageTitle>
                <Line></Line>
{/* <-----------------------------------------------------------------------------------------------------------------> */}
{/* <--------------------------------------------Malt inventory table-----------------------------------------------> */}
        <Header>Malt</Header>
        <Table>
            <TableBody>
            <TableHeader>
                <TableRow>
                    <TH>Amount</TH>
                    <TH>Variety</TH>
                    <TH>Actions</TH>
                </TableRow>
            </TableHeader>
                {inventory.map(
                    (i) => {
                        if (i.ingredient.type === "Malt"){
                            return <>
                            <TableRow>
                                {editingMalt ? 
                                    <TableData>
                                        <input 
                                            type="text" 
                                            name="quantity" 
                                            required="required" 
                                            placeholder={`${i.quantity} oz.`}
                                            onChange={(event) => {
                                                const copy = { ...newIngredient}
                                                copy.quantity = parseInt(event.target.value)
                                                copy.ingredient = parseInt(i.ingredient.id)
                                                setNewIngredient(copy)
                                            }} />
                                            <button onClick={()=> {
                                                checkInvToUpdate()
                                            }}>Update</button>
                                    </TableData>
                                :
                                    <TableData>{convertUnits(parseInt(i.quantity))}</TableData>
                                }
                                <TableData>{i.ingredient.name}</TableData>
                                <TableData>
                                        <button onClick={() => {
                                            editingMalt ?
                                            setEditingMalt(false)
                                            : setEditingMalt(true)
                                        }}>Edit quantity</button>
                                        <button onClick={() => {
                                            deleteInventory(i.id)
                                                .then(getInventory)
                                                    .then(setInventory)
                                        }}>Delete item</button>
                                </TableData>
                            </TableRow>
                            </>
                        }})}
            </TableBody>
        </Table>
{/* <-----------------------------------------------------------------------------------------------------------------> */}
{/* <--------------------------------------------Add malt form--------------------------------------------------------> */}
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
{/* *<----------------------------------------------------------------------------------------------------------------->  */}
{/* *<-----------------------------------------------Hops inventory table----------------------------------------------> */}
        <Header>Hops</Header>
        <Table>
            <TableBody>
            <TableHeader>
                <TableRow>
                    <TH>Amount</TH>
                    <TH>Variety</TH>
                    <TH>Alpha acids</TH>
                    <TH>Actions</TH>
                </TableRow>
            </TableHeader>
                {inventory.map(
                    (i) => {
                        if (i.ingredient.type === "Hops"){
                            return <>
                            <TableRow>
                            {editingHops ? 
                                    <TableData>
                                        <input 
                                            type="text" 
                                            name="quantity" 
                                            required="required" 
                                            placeholder={`${i.quantity} oz.`}
                                            onChange={(event) => {
                                                const copy = { ...newIngredient}
                                                copy.quantity = parseInt(event.target.value)
                                                copy.ingredient = parseInt(i.ingredient.id)
                                                setNewIngredient(copy)
                                            }} />
                                            <button onClick={()=> {

                                                checkInvToUpdate()
                                            }}>Update</button>
                                    </TableData>
                                :
                                <TableData>{i.quantity} oz</TableData>
                                }
                                <TableData>{i.ingredient.name}</TableData>
                                <TableData>{i.ingredient.alpha_acids}</TableData>
                                <TableData>
                                        <button onClick={() => {
                                            editingHops ?
                                            setEditingHops(false)
                                            : setEditingHops(true)
                                        }}>Edit quantity</button>
                                        <button onClick={() => {
                                            deleteInventory(i.id)
                                                .then(getInventory)
                                                    .then(setInventory)
                                        }}>Delete item</button>
                                </TableData>
                            </TableRow>
                            </>
                        }})}
            </TableBody>
        </Table>
{/* <-----------------------------------------------------------------------------------------------------------------> */}
{/* <--------------------------------------------Add Hops form--------------------------------------------------------> */}
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
{/* *<----------------------------------------------------------------------------------------------------------------->  */}
{/* *<-----------------------------------------------Yeast inventory table----------------------------------------------> */}
        <Header>Yeast</Header>
        <Table>
            <TableBody>
                <TableHeader>
                    <TableRow>
                        <TH>Variety</TH>
                        <TH>Amount</TH>
                        <TH>Actions</TH>
                    </TableRow>
                </TableHeader>
                {inventory.map(
                    (i) => {
                        if (i.ingredient.type === "Yeast"){
                            return <>
                            <TableRow>
                            {editingYeast ? 
                                    <TableData>
                                        <input 
                                            type="text" 
                                            name="quantity" 
                                            required="required" 
                                            placeholder={`${i.quantity} oz.`}
                                            onChange={(event) => {
                                                const copy = { ...newIngredient}
                                                copy.quantity = parseInt(event.target.value)
                                                copy.ingredient = parseInt(i.ingredient.id)
                                                setNewIngredient(copy)
                                            }} />
                                            <button onClick={()=> {
                                                checkInvToUpdate()
                                            }}>Update</button>
                                    </TableData>
                                :
                                <TableData>{i.quantity}</TableData>
                                }
                                <TableData>{i.ingredient.name}</TableData>
                                <TableData>
                                        <button onClick={() => {
                                            editingYeast ?
                                            setEditingYeast(false)
                                            : setEditingYeast(true)
                                        }}>Edit quantity</button>
                                        <button onClick={() => {
                                            deleteInventory(i.id)
                                                .then(getInventory)
                                                    .then(setInventory)
                                        }}>Delete item</button>
                                </TableData>
                            </TableRow>
                            </>
                        }})}
            </TableBody>
        </Table>
{/* <-----------------------------------------------------------------------------------------------------------------> */}
{/* <--------------------------------------------Add yeast form--------------------------------------------------------> */}
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