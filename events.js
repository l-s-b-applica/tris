// EVENT HANDLERS
function printShape(fall, climb) {
    if (fall) {
        if (fallingFlag) { fallSwitch() }
        currentShape.rotations.forEach(r => {
                r.forEach(tile => {
                tile[2] += currentFall[tile[1] + currentBaseRow]
            })
        })
        currentBaseRow++
    }
    if (climb) {
        currentBaseRow--
        if (climbingFlag) { fallSwitch() }
        currentShape.rotations.forEach(r => {
                r.forEach(tile => {
                tile[2] -= currentFall[tile[1] + currentBaseRow]
            })
        })
    }
    currentShape.rotations[currentRotation].forEach(tile => {
        gridTriangles[ startSpot + variableColumn + tile[0] + tile[2] ].classList.add(currentShape.className)
    })
}

function wipeShape() {
    currentShape.rotations[currentRotation].forEach(
        tile => gridTriangles[ startSpot + variableColumn + tile[0] + tile[2] ].classList.remove(currentShape.className)
    )
}

/* function freeze() {
    if (
        currentShape.rotations[currentRotation].some(
            tile => document.querySelector(`#${startSpot+variableColumn+tile[0]+tile[2] }`).frozen === true
        ) || currentShape.rotations[currentRotation])
} */

function fall() {
    return setInterval(() => {
        let thisShape = currentShape.rotations[currentRotation]
        if (climbingFlag) { climbingFlag = false }
        if (verticalFallEnabled) { limitSwitch() }
        if (
            thisShape.filter(
                tile => bottomLimitTriangles.includes(startSpot + variableColumn + tile[0] + tile[2])
            ).length === 0
        ) {
            wipeShape()
            printShape(true, false)
        }
        if (!fallingFlag) { fallingFlag = true }
    }, 1500)
}

function moveUp() {
    if (fallingFlag) { fallingFlag = false } // Not falling anymore
    wipeShape()
    printShape(false, true)
    if (!climbingFlag) { climbingFlag = true } // From now on, climbing
}

function moveDown() {
    if (climbingFlag) { climbingFlag = false } // Not climbing anymore
    wipeShape()
    printShape(true, false)
    if (!fallingFlag) { fallingFlag = true } // From now on, falling
}

function playPause() {
    if (playing === null) {
        printShape()
        playing = fall()
    } else {
        clearInterval(playing)
        playing = null
    }
}

start.addEventListener('click', playPause)

document.addEventListener('keyup', (e) => {
    let thisShape = currentShape.rotations[currentRotation]
// LEFT ROTATION
    if(['Q', 'q'].includes(e.key)) {
        wipeShape()
        currentRotation === 0 ? ( currentRotation = currentShape.rotations.length - 1 ) : ( currentRotation-- )
        printShape()
    }
// RIGHT ROTATION
    if(['E', 'e'].includes(e.key)) {
        wipeShape()
        currentRotation === currentShape.rotations.length - 1 ? ( currentRotation = 0 ) : ( currentRotation++ )
        printShape()
    }
// LEFT SCROLL
    if(['A', 'a', 'ArrowLeft'].includes(e.key)) {
        if(thisShape.filter(
            tile => leftLimitTriangles.includes(startSpot + variableColumn + tile[0] + tile[2])
        ).length === 0) {
            wipeShape()
            variableColumn -= 2
            printShape()
        }
    }
// RIGHT SCROLL
    if(['D', 'd', 'ArrowRight'].includes(e.key)) {
        if(thisShape.filter(
            tile => rightLimitTriangles.includes(startSpot + variableColumn + tile[0] + tile[2])
        ).length === 0) {
            wipeShape()
            variableColumn += 2
            printShape()
        }
    }
// VERTICAL SCROLL (For testing purposes)
// UP SCROLL
    if(['W', 'w', 'ArrowUp'].includes(e.key)) {
        if (verticalFallEnabled) { limitSwitch() }
        if (
            thisShape.filter(
                tile => topLimitTriangles.includes(startSpot + variableColumn + tile[0] + tile[2])
            ).length === 0
        ) { moveUp() }
    }
// DOWN SCROLL
    if(['ArrowDown', 's', 'S'].includes(e.key)) {
        if (verticalFallEnabled) { limitSwitch() }
        if (
            thisShape.filter(
                tile => bottomLimitTriangles.includes(startSpot + variableColumn + tile[0] + tile[2])
            ).length === 0
        ) { moveDown() }
    }
    
// CHANGE SHAPE (just for showcasing purposes)
    if(e.code === 'Space') {
        wipeShape()
        restartShapePosition()
        newShape()
        printShape()
    }
  });
  