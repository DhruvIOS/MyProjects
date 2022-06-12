import {onSnake, expandSnake} from './snake.js'
import { randomGridPosition } from "./grid.js"

let food = getRandomFoodPosition()
const EXPAN_RATE = 1

export function update() { 
    if (onSnake(food)) {
        expandSnake(EXPAN_RATE)
        food = getRandomFoodPosition()
    }
    

}

export function draw(gameBoard) { 

   
    const FoodElement = document.createElement('div')
    FoodElement.style.gridRowStart = food.y
    FoodElement.style.gridColumnStart = food.x
    FoodElement.classList.add('food')
    gameBoard.appendChild(FoodElement)
    
    
     
}
function getRandomFoodPosition() {
    let newFoodPosition
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
      newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}
