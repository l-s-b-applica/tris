// FALL CONFIG
const leftFall = [15, 17, 19, 21, 23, 24, 23, 21, 19, 17, 15, 13]
const rightFall = [13, 15, 17, 19, 21, 22, 21, 19, 17, 15, 13, 11]

let currentFall, startSpot, verticalFallEnabled

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

enableLeftFall() // Start with left fall by default 