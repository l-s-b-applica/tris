// FALL CONFIG
const leftFall = [15, 17, 19, 21, 23, 24, 23, 21, 19, 17, 15, 13]
const rightFall = [13, 15, 17, 19, 21, 22, 21, 19, 17, 15, 13, 11]
// Top limits are for testing purposes, meant to be deleted later.
const topLimitLeftFall = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,28,29,45,46,64,65,85,86]
const topLimitRightFall = [0,1,2,3,4,5,6,7,8,9,10,11,12,26,27,43,44,62,63,83,84,106,107]
//
const bottomLimitRightFall = [107,129,130,150,151,169,170,186,187,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215]
const bottomLimitLeftFall = [85,108,109,131,132,152,153,171,172,188,189,203,204,205,206,207,208,209,210,211,212,213,214,215]

let currentFall, currentBaseRow, variableColumn, currentRotation, startSpot, verticalFallEnabled
let topLimitTriangles = currentFall === leftFall ? topLimitLeftFall : topLimitRightFall
let bottomLimitTriangles = currentFall === leftFall ? bottomLimitLeftFall : bottomLimitRightFall
let climbingFlag = false, fallingFlag = true

function enableLeftFall() {
    verticalFallEnabled = false
    currentFall = leftFall
    startSpot = 0
}

function enableRightFall() {
    verticalFallEnabled = false
    currentFall = rightFall
    startSpot = 8
}
function enableVerticalFall() {
    verticalFallEnabled = true
    startSpot = 4
}

function verticalCheck() {
    if (verticalFallEnabled) {
        currentFall === leftFall ? (currentFall = rightFall) : (currentFall = leftFall)
    }
}

function restartShapePosition() {
    variableColumn = startSpot
    currentBaseRow = 0
    currentRotation = 0
}

enableLeftFall() // Start with left fall by default
restartShapePosition()