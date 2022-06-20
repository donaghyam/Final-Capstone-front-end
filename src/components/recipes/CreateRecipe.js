import { useState, useEffect } from "react"
import { ContentContainer, MainContent, DescriptionContainer, Line, DescriptionLabelColumn, DescriptionContentColumn } from "../styles/Containers.style"
import { Label, SubHeader, Header, Content } from "../styles/Text.style"
import { Table, TableBody, TableData, TableHeader, TableRow, TH } from "../styles/Tables.style"
import { getIngredients } from "../inventory/InventoryManager"
import { createRecipe, createSteps, getNewestRecipe, getRecipeIngredients, getRecipeSteps, getStyles } from "./RecipeManager"

export const CreateRecipe = () => {
    const [ingredients, setIngredients] = useState([])
    const [recipeIngredients, setRecipeIngredient] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [dryHopCheck, setDryHopCheck] = useState(false)
    const [unit, setUnit] = useState("oz")
    const [currentRecipe, setCurrentRecipe] = useState({})
    const [styles, setStyles] = useState([])
    const [steps, setSteps] = useState([])
    const [currentSteps, setCurrentSteps] = useState([])
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
    const ingredientModel = {
        ingredient: 0,
        quantity: 0,
        recipe: 0,
        use: "",
        time: null
    }
    const stepsModel = {
        description: "",
        recipe: 0,
        temperature: 0,
        time: 0,
        amount: null
    }
    //create new array of newRecipe keys for jsx return
    const recipeObjKeys = Object.keys(newRecipe)
 
    //fetch ingredients and beer styles
    useEffect(
        () => {
            getIngredients()
                .then(setIngredients)
            getStyles()
                .then(setStyles)
        },
        []
    )

    //fetch steps for current recipe
    useEffect(
        () => {
        if (currentRecipe.length > 1) {
            getRecipeSteps(currentRecipe.id)
                .then(setCurrentSteps)
        }
        },
        []
    )

    useEffect(
        () => {
            if (submitted === true){
                updateCurrentRecipe()
            }
        },
        [submitted]
    )
    
    //validate recipe details form
    const validateRecipeDetails = () => {
        if (newRecipe.description && newRecipe.name && newRecipe.style && 
            newRecipe.starting_gravity && newRecipe.final_gravity && newRecipe.abv && 
            newRecipe.ibu && newRecipe.srm && newRecipe.mash_ph && newRecipe.batch_volume &&
            newRecipe.pre_boil_volume && newRecipe.boil_time && newRecipe.description){
                createRecipe(newRecipe)
                //set submitted stat to true - trigger new recipe fetch
                setSubmitted(true)
            }
    }

    //validate ingredients
    const validateRecipeIngredients = () => {
        if (recipeIngredients.ingredient && recipeIngredients.quantity && recipeIngredients.use){
                recipeIngredients.recipe = currentRecipe.id
                createRecipe(recipeIngredients)
        }
    }

    //validate steps
    const validateSteps = () => {
        if (steps.description && steps.temperature && steps.time){
                steps.recipe = currentRecipe.id
                createSteps(steps)
        }
    }

    const updateCurrentRecipe = () => {
            getNewestRecipe()
                .then(setCurrentRecipe)
        
    }

    //check if recipe details were posted
    //fetch recipe ingredients for current recipe
    useEffect(
        () => {
            if (currentRecipe.length > 1){
            getRecipeIngredients(currentRecipe.id)
                .then(setRecipeIngredient)
            }
        },
        []
    )

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
    const convertUnitToPost = (ingredientQuantity) => {

        if (unit === "lb"){
            const newIngredient = ingredientQuantity * 16
            return newIngredient
        } else {
            return ingredientQuantity
        }
    }


    return (

        // recipe details
        <ContentContainer>
            <MainContent>
                {submitted ?
                <>
                <SubHeader>{newRecipe.name}</SubHeader>
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

        {/* table for malt 
        check if recipeIngredients exists */}
        {recipeIngredients > 1 ?
        <>
        <Header>Malt</Header>
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
                        if (i.ingredient.type === "Malt"){
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

        <SubHeader>Add Malt</SubHeader>
        <form>
            <select onChange={(event) => {
                const copy = { ...ingredientModel}
                copy.use = "Mash"
                copy.time = 0
                copy.ingredient = parseInt(event.target.value)
                setRecipeIngredient(copy)
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
                    const copy = { ...recipeIngredients}
                    copy.quantity = parseInt(event.target.value)
                    setRecipeIngredient(copy)
                }} />
                {/* dropdown to select unit (oz/lb) */}
            <select onChange={(event) => {
                setUnit(event.target.value)
                const copy = { ...recipeIngredients}
                const convertedQuantity = convertUnitToPost(copy.quantity)
                copy.quantity = convertedQuantity
                setRecipeIngredient(copy)
                }}>
                <option value="oz">oz.</option>
                <option value="lb">lb.</option>
            </select>
        <button type="submit" onClick={() => {
            validateRecipeIngredients()
        }}>Add</button>
        </form>
        <Line></Line>

        {/* table for hops
        check if recipeIngredients exists */}
        {recipeIngredients > 1 ?
        <>
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
                {recipeIngredients.map(
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
        </>
        : null
        }

        <SubHeader>Add Hops</SubHeader>
        <form>
            {/* select variety */}
            <select onChange={(event) => {
                const copy = { ...recipeIngredients}
                copy.ingredient = parseInt(event.target.value)
                setRecipeIngredient(copy)
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
                    const copy = { ...recipeIngredients}
                    copy.quantity = parseInt(event.target.value)
                    setRecipeIngredient(copy)
                }} />
            {/* select hop use */}
            <select onChange={(event) => {
                if (event.target.value === "Dry Hop"){
                    const copy = { ...recipeIngredients}
                    copy.use = event.target.value
                    setRecipeIngredient(copy)
                    setDryHopCheck(true)
                } else {
                    const copy = { ...recipeIngredients}
                    copy.use = event.target.value
                    setRecipeIngredient(copy)
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
                    const copy = { ...recipeIngredients}
                    //add dry hop day to use 
                    copy.use += ` - Day ${event.target.value}`
                    setRecipeIngredient(copy)
                }} />
            </>
            : null}
            {/* select time to add hops */}
            <select onChange={(event) => {
                    const copy = { ...recipeIngredients}
                    copy.time = event.target.value
                    setRecipeIngredient(copy)
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
        <button type="submit" onClick={() => {
            validateRecipeIngredients()
        }}>Add</button>
        </form>
        <Line></Line>

        {/* table for yeast 
        check if recipeIngredients exists */}
        {steps > 1 ?
        <>
        <Header>Mash Guidelines</Header>
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
        </>
        : null}

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
                        setSteps(copy)
            }}/>
            <select onChange={(event) => {
                const copy = { ...steps}
                copy.description = event.target.value
                setSteps(copy)
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
                        const copy = { ...steps}
                        copy.temperature = parseInt(event.target.value)
                        setSteps(copy)
            }}/>
            <select onChange={(event) => {
                const copy = { ...steps}
                copy.time = parseInt(event.target.value)
                setSteps(copy)
                }}>
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
        <button type="submit" onClick={() => {
            validateSteps()
        }}>Add</button>
        </form>
        <Line></Line>

        {/* table for yeast 
        check if recipeIngredients exists */}
        {recipeIngredients > 1 ?
        <>
        <Header>Yeast</Header>
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
        : null
        }

        <SubHeader>Add Yeast</SubHeader>
        <form>
            <select onChange={(event) => {
                const copy = { ...recipeIngredients}
                copy.use = ""
                copy.time = null
                copy.ingredient = parseInt(event.target.value)
                setRecipeIngredient(copy)
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
                        const copy = { ...recipeIngredients}
                        copy.quantity = parseInt(event.target.value)
                        setRecipeIngredient(copy)
                    }} />
        <button type="submit" onClick={() => {
            validateRecipeIngredients()
        }}>Add</button>
        </form>
        </MainContent>
    </ContentContainer>
    )
}