// FALL CONFIG
let currentFall, nextFall, currentBaseRow, variableColumn, currentRotation, startSpot, verticalFallEnabled, topLimitTriangles, bottomLimitTriangles
const leftFall = [15, 17, 19, 21, 23, 24, 23, 21, 19, 17, 15, 13]
const rightFall = [13, 15, 17, 19, 21, 22, 21, 19, 17, 15, 13, 11]
// Top limits are for testing purposes, meant to be deleted later.
const topLimitLeftFall = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,28,29,45,46,64,65,85,86,108]
const topLimitRightFall = [0,1,2,3,4,5,6,7,8,9,10,11,12,26,27,43,44,62,63,83,84,106,107]
//
const bottomLimitLeftFall = [107,129,130,150,151,169,170,186,187,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215]
const bottomLimitRightFall = [85,108,109,131,132,152,153,171,172,188,189,203,204,205,206,207,208,209,210,211,212,213,214,215]

function limitSwitch() {
    if (verticalFallEnabled) {
        bottomLimitTriangles = currentFall === leftFall ? bottomLimitRightFall : bottomLimitLeftFall
    } else {
        bottomLimitTriangles = currentFall === leftFall ? bottomLimitLeftFall : bottomLimitRightFall
    }
}

function enableLeftFall() {
    verticalFallEnabled = false
    currentFall = nextFall = leftFall
    startSpot = 0
    limitSwitch()
}

function enableRightFall() {
    verticalFallEnabled = false
    currentFall = nextFall = rightFall
    startSpot = 8
    limitSwitch()
}
function enableVerticalFall() {
    verticalFallEnabled = true
    startSpot = 4
    fallSwitch()
    limitSwitch()
}

function fallSwitch() {
    if (verticalFallEnabled) {
        if (currentFall === leftFall) {
            currentFall = rightFall
            nextFall = leftFall
        } else {
            currentFall = leftFall
            nextFall = rightFall
        }
    }
}

function restartShapePosition() {
    variableColumn = 0
    currentBaseRow = 0
    currentRotation = 0
}

enableLeftFall() // Start with left fall by default
restartShapePosition()