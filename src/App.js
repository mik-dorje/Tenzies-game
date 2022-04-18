import React from "react";
import Die from "./components/Die";
import {nanoid} from "nanoid";


export default function(){

const [dice, setDice] = React.useState(allNewDice())

//final outcome check
const [tenzies , setTenzies] =React.useState(false)

React.useEffect(() => {
  //.every() returns true if every items match the condition
  const allHeld = dice.every(die => die.isHeld === true)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)

  if (allHeld && allSameValue){
    setTenzies(true)
    console.log("you won")

  }
  

  console.log("Dice state change")
}, [dice])



function generateNewDie(){
  return {
    value : Math.ceil(Math.random()*6),
    isHeld : false,
    id: nanoid()
  }
}


function allNewDice(){
  const newDice = []
  for (let i =0; i<10 ; i++){
    // newDice.push(Math.ceil(Math.random()*6))

    // newDice.push({
    //   value : Math.ceil(Math.random()*6),
    //   isHeld : false,
    //   id: nanoid()
    // })
    newDice.push(generateNewDie())

  }
  return newDice
}

function rollDice(){
  // setDice(allNewDice())
  if (!tenzies)
  {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie()
    }))
  }
  else {
    setTenzies(false)
    setDice(allNewDice)

  }
}

function holdDice(id){
  setDice(oldDice => oldDice.map(die => {
    return die.id === id ? {...die, isHeld: !die.isHeld} : die
  }))
  
}



const diceElements = dice.map(die => <Die key = {die.id}  value={die.value} isHeld = {die.isHeld} holdDice= {()=> holdDice(die.id)}/>)

  return(
    <main>

      {tenzies}
      
      <h1 className="title">Tenzies</h1>
      <p className="instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
      <div className="dice-container">
        {diceElements}
        {/* start with theses for styling and later create diceElements */}
        {/* <Die value="1" />
        <Die value="2" />
        <Die value="3" />
        <Die value="4" />
        <Die value="5" />
        <Die value="6" />
        <Die value="7" />
        <Die value="8" />
        <Die value="9" />
        <Die value="10" /> */}
      </div>
      <button 
        className="roll-dice" 
        onClick={rollDice}
        >
        {tenzies ? "New Game" : "Roll"}
        </button>
    </main>
  )
}