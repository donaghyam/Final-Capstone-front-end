import { useState, useEffect } from "react"
import { ContentContainer, MainContent, DescriptionContainer, Line, DescriptionLabelColumn, DescriptionContentColumn } from "../styles/Containers.style"
import { Label, SubHeader, Header, Content } from "../styles/Text.style"
import { Table, TableBody, TableData, TableHeader, TableRow, TH } from "../styles/Tables.style"
import { getIngredients } from "../inventory/InventoryManager"
import { createRecipe, createRecipeIngredients, createSteps, getNewestRecipe, getRecipeIngredients, getRecipeSteps, getStyles } from "./RecipeManager"

export const CreateRecipe = () => {
    const [ingredients, setIngredients] = useState([])
    const [recipeIngredients, setRecipeIngredient] = useState([])
    // const [compiledRecipeIngredients, setCompiledRecipeIngredient] = useState([])
    // const [ingredientsToCheck, setIngredientsToCheck] = useState([])
    const [ingredientToPost, setIngredientToPost] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [submittedHops, setSubmittedHops] = useState(false)
    const [submittedMalt, setSubmittedMalt] = useState(false)
    const [submittedYeast, setSubmittedYeast] = useState(false)
    const [dryHopCheck, setDryHopCheck] = useState(false)
    const [currentRecipe, setCurrentRecipe] = useState({})
    const [styles, setStyles] = useState([])
    const [steps, setSteps] = useState([])
    const [stepsToPost, setStepsToPost] = useState([])
    const [newRecipe, setNewRecipe] = useState({
        description: "",
        name: "",
        style: 0,
        starting_gravity: 0,
        final_gravity: 0,
        abv: 0,
        ibu: 0,
        srm: 0,
        mash_ph: 0,
        batch_volume: 0,
        pre_boil_volume: 0,
        boil_time: 0
    })
    //set ingredient model to copy onChange
    const ingredientModel = {
        ingredient: 0,
        quantity: 0,
        recipe: 0,
        use: "",
        time: null
    }
    //set steps model to copy onChange
    const stepsModel = {
        description: "",
        recipe: 0,
        temperature: 0,
        time: 0,
        amount: null
    }
    //create new array of newRecipe keys to iterate through in jsx return
    const recipeObjKeys = Object.keys(newRecipe)
 
    //fetch ingredients and beer styles for select and input fields
    useEffect(
        () => {
            getIngredients()
                .then(setIngredients)
            getStyles()
                .then(setStyles)
        },
        []
    )
//<--------------------------------Recipe detail submission functions--------------------------------------------->
    //validate recipe details form
    const validateRecipeDetails = () => {
        if (newRecipe.description && newRecipe.name && newRecipe.style && 
            newRecipe.starting_gravity && newRecipe.final_gravity && newRecipe.abv && 
            newRecipe.ibu && newRecipe.srm && newRecipe.mash_ph && newRecipe.batch_volume &&
            newRecipe.pre_boil_volume && newRecipe.boil_time && newRecipe.description && submitted === false){
                //set submitted stat to true - trigger new recipe fetch
                setSubmitted(true)
                createRecipe(newRecipe)
                    .then(updateCurrentRecipe)
            }
    }
    //get recipe that was just submitted
    const updateCurrentRecipe = () => {
        getNewestRecipe()
            .then(setCurrentRecipe)
    }
//<------------------------------------------------------------------------------------------------------------------->
//<--------------------------------Recipe ingredient submission functions--------------------------------------------->
    //validate ingredients and add recipeId
    const validateRecipeIngredients = () => {
        if (ingredientToPost.ingredient && ingredientToPost.quantity && ingredientToPost.use){
                ingredientToPost.recipe = currentRecipe.id
                //set state with ingredient
                //setCompiledRecipeIngredient(ingredientToPost)
                    //check if ingredient in state is a duplicate
                    //.then(checkDuplicates)
                //post ingredient, then update state
                createRecipeIngredients(ingredientToPost)
                    .then(updateIngredients)
        }
    }
    //get newly submitted ingredient to display
    const updateIngredients = () => {
        getRecipeIngredients(currentRecipe.id)
            .then(setRecipeIngredient)
        //reset state
        setIngredientToPost([])
    }

    // const checkDuplicates = () => {
    //     //check if this is the first ingredient to post
    //     if (ingredientsToCheck.length < 1){
    //         createCompiledIngredient(compiledRecipeIngredients)
    //             .then(updateCompiledIngredients)
    //     //if ingredients have been posted
    //     } else if (ingredientsToCheck.length > 0) {
    //         //find ingredients that have the matching ingredients
    //         const duplicate = ingredientsToCheck.find(i => i.ingredient === compiledRecipeIngredients.ingredient)
    //         //if found, combine quantities of new ingredient and matched ingredient
    //         if (duplicate.length > 0){
    //             const updatedIngredient = { ...compiledRecipeIngredients}
    //             const newQuantity = compiledRecipeIngredients.quantity + dryHopCheck.quantity
    //             updatedIngredient.quantity = newQuantity
    //             updatedIngredient.ingredient = compiledRecipeIngredients.ingredient?.id
    //             //PUT updated ingredient
    //             updateCompiledRecipeIngredient(updatedIngredient, compiledRecipeIngredients.id)
    //         //if no duplicates are found, post new ingredient
    //         } else {
    //             createCompiledIngredient(compiledRecipeIngredients)
    //                 .then(updateCompiledIngredients)
    //         }
    //     }
    // }

    // const updateCompiledIngredients = () => {
    //     getCompiledRecipeIngredients(currentRecipe.id)
    //         .then(setIngredientsToCheck)
    //     //reset state
    //     setCompiledRecipeIngredient([])
    // }
//<------------------------------------------------------------------------------------------------------------------->
//<--------------------------------Recipe steps submission functions-------------------------------------------------->
    //validate steps and add recipeId
    const validateSteps = () => {
        if (stepsToPost.description && stepsToPost.temperature && stepsToPost.time){
                stepsToPost.recipe = currentRecipe.id
                createSteps(stepsToPost)
                    .then(updateSteps)
        }
    }
    //get newly submitted steps to display
    const updateSteps = () => {
        getRecipeSteps(currentRecipe.id)
            .then(setSteps)
        //reset state
        setStepsToPost([])
    }
//<------------------------------------------------------------------------------------------------------------------->
//<--------------------------------Utility functions------------------------------------------------------------------>
    //if quantity is greater than 16oz., convert to lbs.
    const convertUnitToPrint = (ingredientQuantity) => {

        if (ingredientQuantity >= 16){
            let newIngredient = ingredientQuantity/16
            newIngredient += " lb"
            return newIngredient
        } else {
            ingredientQuantity += " oz"
            return ingredientQuantity
        }
    }
    //convert quantity based on unit selected 
    const convertUnitToPost = (unit, quantity) => {

        if (unit === "lb"){
            const newQuantity = quantity * 16
            return newQuantity
        } else {
            return quantity
        }
    }
//<----------------------------------------------------------------------------------------------------------------->
//<--------------------------------------------JSX return----------------------------------------------------------->
    return (

//<--------------------------------------------Recipe details display----------------------------------------------->
        // recipe details
        <ContentContainer>
            <MainContent>
                {submitted ?
                <>
                <Header>{newRecipe.name}</Header>
                <Label>Description: </Label> 
                    <Content>{newRecipe.description}</Content>
                <Label>Style: </Label> 
                    <Content>{newRecipe.style?.label}</Content>
                <Label>Starting gravity: </Label> 
                    <Content>{newRecipe.starting_gravity}</Content>
                <Label>Final gravity: </Label> 
                    <Content>{newRecipe.final_gravity}</Content>
                <Label>ABV: </Label> 
                    <Content>{newRecipe.abv}</Content>
                <Label>SRM: </Label> 
                    <Content>{newRecipe.srm}</Content>
                <Label>Mash pH: </Label> 
                    <Content>{newRecipe.mash_ph}</Content>
                <Label>Batch volume: </Label> 
                    <Content>{newRecipe.batch_volume}</Content>
                <Label>Pre boil volume: </Label> 
                    <Content>{newRecipe.pre_boil_volume}</Content>
                <Label>Boil time: </Label> 
                    <Content>{newRecipe.boil_time}</Content>
                    </>
                    :
//*<-----------------------------------------------------------------------------------------------------------------> */}
//*<-----------------------------------------------Add recipe details form-------------------------------------------> */}
            //create input for each field
            <form>
                {recipeObjKeys.map(
                    (key) => {
                        // if key is "style", return dropdown
                        if (key === "style"){
                            return <DescriptionContainer>
                            <DescriptionLabelColumn>
                                <Label>{key}:  </Label>
                            </DescriptionLabelColumn>
                            <DescriptionContentColumn>
                                <select onChange={(evt) => {
                                        const copy = { ...newRecipe}
                                        copy[key] = parseInt(evt.target.value)
                                        setNewRecipe(copy)
                                    }}>
                                        <option value="0">{`Select ${key}`}</option>
                                    {styles.map(
                                        (s) => {
                                            return <option value={s.id} name={key}>{s.label}</option>
                                    }
                                )}
                                </select>
                            </DescriptionContentColumn>
                            </DescriptionContainer>
                            // return input for each recipe key
                        } else if (key === "boil_time"){
                                return <DescriptionContainer>
                                <DescriptionLabelColumn>     
                                    <Label>{key.replace('_', ' ')} (min.):  </Label>
                                </DescriptionLabelColumn>
                                <DescriptionContentColumn> 
                                    <input 
                                        type="text" 
                                        name={key} 
                                        required="required" 
                                        placeholder={`Enter ${key.replace('_', ' ').replace('_', ' ')}`}
                                        onChange={(evt) => {
                                            const copy = { ...newRecipe}
                                            copy[key] = parseInt(evt.target.value)
                                            setNewRecipe(copy)
                                        }} />
                                </DescriptionContentColumn>
                                </DescriptionContainer>
                            } else {
                                return <DescriptionContainer>
                                    <DescriptionLabelColumn>
                                        <Label>{key.replace('_', ' ').replace('_', ' ')}:  </Label>
                                    </DescriptionLabelColumn>
                                    <DescriptionContentColumn>
                                    <input 
                                        type="text" 
                                        name={key} 
                                        required="required" 
                                        placeholder={`Enter ${key.replace('_', ' ').replace('_', ' ')}`}
                                        onChange={(evt) => {
                                            const copy = { ...newRecipe}
                                            //check if value is number
                                            {isNaN(evt.target.value) ? 
                                            copy[key] = evt.target.value
                                            :
                                            //if number, parse integer
                                            copy[key] = parseInt(evt.target.value)}
                                            setNewRecipe(copy)
                                        }} />
                                    </DescriptionContentColumn>
                                    </DescriptionContainer>
                            }
                        })}
                    <button type="submit" onClick={() => {
                        //check if all fields are filled
                        validateRecipeDetails()
                    }}>Add</button>
            </form>}
            <Line></Line>
{/*<-----------------------------------------------------------------------------------------------------------------> */}
{/*<-----------------------------------------------Malt table--------------------------------------------------------> */}
        <Header>Malt</Header>
        {/* table for malt 
        check if recipeIngredients exists */}
        {recipeIngredients.length > 0 && submittedMalt ?
        <>
        <Table>
            <TableBody>
            <TableHeader>
                <TableRow>
                    <TH>Amount</TH>
                    <TH>Variety</TH>
                </TableRow>
            </TableHeader>
                {recipeIngredients.map(
                    (i) => {
                        if (i.use === "Mash"){
                            return <>
                            <TableRow>
                                <TableData>{convertUnitToPrint(parseInt(i.quantity))}</TableData>
                                <TableData>{i.ingredient.name}</TableData>
                            </TableRow>
                            </>
                        }})}
            </TableBody>
        </Table>
        </>
        : null}
{/*<-----------------------------------------------------------------------------------------------------------------> */}
{/*<-----------------------------------------------Add malt form-----------------------------------------------------> */}
        <SubHeader>Add Malt</SubHeader>
        <form>
            <select onChange={(event) => {
                const copy = { ...ingredientModel}
                copy.use = "Mash"
                copy.time = 0
                copy.ingredient = parseInt(event.target.value)
                setIngredientToPost(copy)
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
                placeholder="Enter quantity"
                onChange={(event) => {
                    const copy = { ...ingredientToPost}
                    copy.quantity = parseInt(event.target.value)
                    setIngredientToPost(copy)
                }} />
                {/* dropdown to select unit (oz/lb) */}
            <select onChange={(event) => {
                const copy = { ...ingredientToPost}
                const unit = event.target.value
                const quantity = copy.quantity
                const convertedQuantity = convertUnitToPost(unit, quantity)
                copy.quantity = convertedQuantity
                setIngredientToPost(copy)
                }}>
                <option value="oz">oz.</option>
                <option value="lb">lb.</option>
            </select>
        <button type="submit" onClick={(evt) => {
            evt.preventDefault()
            validateRecipeIngredients()
            setSubmittedMalt(true)
        }}>Add</button>
        </form>
        <Line></Line>
{/*<-----------------------------------------------------------------------------------------------------------------> */}
{/*<-----------------------------------------------Hops table--------------------------------------------------------> */}
        <Header>Hops</Header>
        {/* table for hops
        check if recipeIngredients exists */}
        {recipeIngredients.length > 0 && submittedHops?
        <>
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
                {recipeIngredients.map(
                    (i) => {
                        if (i.ingredient.type === "Hops"){
                            return <>
                            <TableRow>
                                <TableData>{i.quantity} oz</TableData>
                                <TableData>{i.ingredient.name}</TableData>
                                <TableData>{i.ingredient.alpha_acids}</TableData>
                                <TableData>{i.use}</TableData>
                                <TableData>{i.time} min.</TableData>
                            </TableRow>
                            </>
                        }})}
            </TableBody>
        </Table>
        </>
        : null
        }
{/*<-----------------------------------------------------------------------------------------------------------------> */}
{/*<-----------------------------------------------Add hops form-----------------------------------------------------> */}
        <SubHeader>Add Hops</SubHeader>
        <form>
            {/* select variety */}
            <select onChange={(event) => {
                const copy = { ...ingredientModel}
                copy.ingredient = parseInt(event.target.value)
                setIngredientToPost(copy)
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
            {/* input quantity */}
            <input 
                type="text" 
                name="quantity" 
                placeholder="Enter quantity (oz.)"
                onChange={(event) => {
                    const copy = { ...ingredientToPost}
                    copy.quantity = parseInt(event.target.value)
                    setIngredientToPost(copy)
                }} />
            {/* select hop use */}
            <select onChange={(event) => {
                if (event.target.value === "Dry Hop"){
                    const copy = { ...ingredientToPost}
                    copy.use = event.target.value
                    setIngredientToPost(copy)
                    setDryHopCheck(true)
                } else {
                    const copy = { ...ingredientToPost}
                    copy.use = event.target.value
                    setIngredientToPost(copy)
                }
            }}>
                <option value="0">Select use</option>
                <option value="Boil">Boil</option>
                <option value="Dry Hop">Dry Hop</option>
            </select>
            {/* check if user selected "Dry Hop" for use */}
            {dryHopCheck ?
            <>
            <input 
                type="text" 
                name="day" 
                placeholder="Enter day for hop addition"
                onChange={(event) => {
                    const copy = { ...ingredientToPost}
                    //add dry hop day to use 
                    copy.use += ` - Day ${event.target.value}`
                    setIngredientToPost(copy)
                }} />
            </>
            : null}
            {/* select time to add hops */}
            <select onChange={(event) => {
                    const copy = { ...ingredientToPost}
                    copy.time = event.target.value
                    setIngredientToPost(copy)
                }
            }>
                <option value={null}>Select time</option>
                <option value={60}>60 min.</option>
                <option value={55}>55 min.</option>
                <option value={50}>50 min.</option>
                <option value={45}>45 min.</option>
                <option value={40}>40 min.</option>
                <option value={35}>35 min.</option>
                <option value={30}>30 min.</option>
                <option value={25}>25 min.</option>
                <option value={20}>20 min.</option>
                <option value={15}>15 min.</option>
                <option value={10}>10 min.</option>
                <option value={5}>5 min.</option>
                <option value={0}>0 min.</option>
            </select>
        <button type="submit" onClick={(evt) => {
            setDryHopCheck(false)
            evt.preventDefault()
            validateRecipeIngredients()
            setSubmittedHops(true)
        }}>Add</button>
        </form>
        <Line></Line>
{/*<-----------------------------------------------------------------------------------------------------------------> */}
{/*<-----------------------------------------------Mash guidelines table---------------------------------------------> */}
        <Header>Mash Guidelines</Header>
        {steps.length > 0 ?
        <>
            <Table>
                <TableBody>
                <TableHeader>
                    <TableRow>
                        <TH>Amount</TH>
                        <TH>Description</TH>
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
                                    <TableData>{s.description}</TableData>
                                    <TableData>{s.temperature}</TableData>
                                    <TableData>{s.time}</TableData>
                                </TableRow>
                            </>
                            } else {
                                return <>
                                <TableRow>
                                    <TableData>{s.amount} gal</TableData>
                                    <TableData>{s.description}</TableData>
                                    <TableData>{s.temperature}</TableData>
                                    <TableData>{s.time}</TableData>
                                </TableRow>
                                </>
                            }
                        })}
                </TableBody>
            </Table>
        </>
        : null}
{/*<-----------------------------------------------------------------------------------------------------------------> */}
{/*<-----------------------------------------------Add mash guidelines form------------------------------------------> */}
        {/* table for mash guidlines (steps) */}
        <SubHeader>Add Mash Guidelines</SubHeader>
        <form>
            <input 
                    type="text" 
                    name="amount" 
                    placeholder="Enter water volume (gal.)"
                    onChange={(event) => {
                        const copy = { ...stepsModel}
                        copy.amount = parseInt(event.target.value)
                        setStepsToPost(copy)
            }}/>
            <select onChange={(event) => {
                const copy = { ...stepsToPost}
                copy.description = event.target.value
                setStepsToPost(copy)
            }}>
                <option value="0">Select mash step</option>
                <option value="Rest">Rest</option>
                <option value="Mash-out Rest">Mash-out Rest</option>
                <option value="Sparge">Sparge</option>
            </select>
                <input 
                    type="text" 
                    name="temperature" 
                    required="required" 
                    placeholder="Enter temperature (°F)"
                    onChange={(event) => {
                        const copy = { ...stepsToPost}
                        copy.temperature = parseInt(event.target.value)
                        setStepsToPost(copy)
            }}/>
            <select onChange={(event) => {
                const copy = { ...stepsToPost}
                copy.time = parseInt(event.target.value)
                setStepsToPost(copy)
                }}>
                <option value={null}>Select time</option>
                <option value="60">60 min.</option>
                <option value="55">55 min.</option>
                <option value="50">50 min.</option>
                <option value="45">45 min.</option>
                <option value="40">40 min.</option>
                <option value="35">35 min.</option>
                <option value="30">30 min.</option>
                <option value="25">25 min.</option>
                <option value="20">20 min.</option>
                <option value="15">15 min.</option>
                <option value="10">10 min.</option>
                <option value="5">5 min.</option>
                <option value="0">0 min.</option>
            </select>
        <button type="submit" onClick={(evt) => {
            evt.preventDefault()
            validateSteps()
        }}>Add</button>
        </form>
        <Line></Line>
{/*<-----------------------------------------------------------------------------------------------------------------> */}
{/*<-----------------------------------------------Yeast table-------------------------------------------------------> */}
        <Header>Yeast</Header>
        {recipeIngredients.length > 0 && submittedYeast ?
        <>
        <Table>
            <TableBody>
                <TableHeader>
                    <TableRow>
                        <TH>Variety</TH>
                        <TH>Amount</TH>
                    </TableRow>
                </TableHeader>
                {recipeIngredients.map(
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
        </>
        : null}
{/*<-----------------------------------------------------------------------------------------------------------------> */}
{/*<-----------------------------------------------Add yeast form----------------------------------------------------> */}
        <SubHeader>Add Yeast</SubHeader>
        <form>
            <select onChange={(event) => {
                const copy = { ...ingredientModel}
                copy.use = "Fermentation"
                copy.time = null
                copy.ingredient = parseInt(event.target.value)
                setIngredientToPost(copy)
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
                        const copy = { ...ingredientToPost}
                        copy.quantity = parseInt(event.target.value)
                        setIngredientToPost(copy)
                    }} />
        <button type="submit" onClick={(evt) => {
            evt.preventDefault()
            validateRecipeIngredients()
            setSubmittedYeast(true)
        }}>Add</button>
        </form>
        </MainContent>
    </ContentContainer>
    )
}