import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, SnakeSelf, } from './snake.js'

import {update as updateFood, draw as drawFood} from './food.js'
import { outSide} from './grid.js'

let lastRenderTime = 0 
let gameOver = false
const gameBoard = document.getElementById('game-board')


function main(currentTime) {
    if (gameOver) { 
        if(confirm('You lost the game press Ok to restart the game')) {
            window.location = ''
        
        }
        return
        
    }
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return  
    

    lastRenderTime = currentTime
    

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    CheckDie()

}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)

}

function CheckDie() {
    gameOver  = outSide(getSnakeHead()) || SnakeSelf()
}