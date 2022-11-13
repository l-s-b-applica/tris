const whoosh = new Audio('./assets/whoosh.mp3')
const clack = new Audio('./assets/lock.mp3')
const knock = new Audio('./assets/knock.mp3')

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
    
function checkForFullRows(thisRow) {
    let myRowArray = Array.from(document.getElementsByClassName(`row${thisRow}`)[0].children)
    ///// SI TODAS LAS FICHAS DE LA FILA ESTÁN CONGELADAS: /////
    if(myRowArray.filter(tile => tile.hasAttribute('frozen')).length === gridValues[thisRow-1].length) {

        ///// BORRO LAS FICHAS DE LA  *** FILA *** /////
        myRowArray.forEach(tile => {
            tile.classList.remove(...colors)
            tile.removeAttribute('frozen')
        })
        ///// ESTO ANDA OK. /////
        ///// LO SIGUIENTE NO ANDA OK :D /////
        while (thisRow > 1) {
            let upperRowArray = Array.from(document.getElementsByClassName(`row${thisRow-1}`)[0].children)
            upperRowArray.forEach(tile => { // If on bottom or on frozen tile, do nothing
                console.log(`A VER:
                CURRENT TILE: ${tile.id}, CURRENT BASE ROW FALL: ${currentFall[currentBaseRow]}, CURRENT UPPER ROW FALL: ${parseInt(currentFall[thisRow-2])}
                FALLING PLACE (if any): ${parseInt(tile.id) + parseInt(currentFall[thisRow-2])}
                ${gridTriangles[parseInt(tile.id) + parseInt(currentFall[thisRow-2])]}`)
                let suitableToFall = true
                let fallingPlace = null
                if (bottomLimitTriangles.includes(parseInt(tile.id))) { suitableToFall = false } 
                if (suitableToFall) {
                    fallingPlace = gridTriangles[parseInt(tile.id) + parseInt(currentFall[thisRow-2])]
                    if (fallingPlace.hasAttribute('frozen')) { suitableToFall = false }
                    if (!colors.includes(tile.classList[2])) {suitableToFall = false} 
                 }
                if (suitableToFall) { // If free to fall, then fall, on an individual basis
                    let savedColor = tile.classList[2]
                    tile.classList.remove(...colors)
                    tile.removeAttribute('frozen')

                    fallingPlace.classList.add(savedColor)
                    fallingPlace.setAttribute('frozen', true) // fallingPlace working OK for upper row
                }
            })
            thisRow--
        }
    }
}

function freeze() {
    clack.play()
    currentShape.rotations[currentRotation].forEach(
        tile => gridTriangles[ startSpot + variableColumn + tile[0] + tile[2] ].setAttribute('frozen', true)
    )
    const rows = [12,11,10,9,8,7,6,5,4,3,2,1]
    rows.forEach(function(row) { checkForFullRows(row) })
    restartShapePosition()
    newShape()
    printShape()
}

function fall() {
    return setInterval(() => {
        let thisShape = currentShape.rotations[currentRotation]
        let bottomCondition = thisShape.some(
            tile => bottomLimitTriangles.includes(startSpot + variableColumn + tile[0] + tile[2])
        )
        let frozenTouchCondition = thisShape.some(
            tile => gridTriangles[startSpot + variableColumn + tile[0] + tile[2] + currentFall[tile[1] + currentBaseRow]] &&
            gridTriangles[startSpot + variableColumn + tile[0] + tile[2] + currentFall[tile[1] + currentBaseRow]].hasAttribute('frozen')
        )
        if (climbingFlag) { climbingFlag = false }
        if (verticalFallEnabled) { limitSwitch() }
        // Check for freeze conditions and freeze, else move down
        if (bottomCondition) {
            freeze()
        } else if (frozenTouchCondition) {
            freeze()
        } else {  
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
    let thisShape = currentShape.rotations[currentRotation]
    let bottomCondition = thisShape.some(
        tile => bottomLimitTriangles.includes(startSpot + variableColumn + tile[0] + tile[2])
    )
    let frozenTouchCondition = thisShape.some(
        tile => gridTriangles[startSpot + variableColumn + tile[0] + tile[2] + currentFall[tile[1] + currentBaseRow]] &&
        gridTriangles[startSpot + variableColumn + tile[0] + tile[2] + currentFall[tile[1] + currentBaseRow]].hasAttribute('frozen')
    )
    if (bottomCondition) {
        freeze()
    } else if (frozenTouchCondition) {
        freeze()
    } else {  
        wipeShape()
        printShape(true, false)
     }
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

  /*******************/
 /* M O V E M E N T */
/*******************/
document.addEventListener('keyup', (e) => {
    let thisShape = currentShape.rotations[currentRotation]

// LEFT ROTATION
    if(['Q', 'q'].includes(e.key)) {
        wipeShape()
        currentRotation === 0 ? ( currentRotation = currentShape.rotations.length - 1 ) : ( currentRotation-- )
        whoosh.play()
        printShape()
    }
// RIGHT ROTATION
    if(['E', 'e'].includes(e.key)) {
        wipeShape()
        currentRotation === currentShape.rotations.length - 1 ? ( currentRotation = 0 ) : ( currentRotation++ )
        whoosh.play()
        printShape()
    }
// LEFT SCROLL
    if(['A', 'a', 'ArrowLeft'].includes(e.key)) {
        let notOnLeftLimit = thisShape.filter(
            tile => leftLimitTriangles.includes(startSpot + variableColumn + tile[0] + tile[2])
        ).length === 0
        let noLeftNeighbors = thisShape.filter(
            tile =>
            gridTriangles[startSpot + variableColumn + tile[0] + tile[2] - 2]?.hasAttribute('frozen')
        ).length === 0

        if(notOnLeftLimit && noLeftNeighbors) {
            wipeShape()
            variableColumn -= 2
            printShape()
        } else {
            knock.play()
        }
    }
// RIGHT SCROLL
    if(['D', 'd', 'ArrowRight'].includes(e.key)) {
        let notOnRightLimit = thisShape.filter(
            tile => rightLimitTriangles.includes(startSpot + variableColumn + tile[0] + tile[2])
        ).length === 0
        let noRightNeighbors = thisShape.filter(
            tile => gridTriangles[startSpot + variableColumn + tile[0] + tile[2] + currentFall[tile[1] + currentBaseRow]] &&
            gridTriangles[startSpot + variableColumn + tile[0] + tile[2] + 2].hasAttribute('frozen')
        ).length === 0

        if(notOnRightLimit && noRightNeighbors) {
            wipeShape()
            variableColumn += 2
            printShape()
        } else {
            knock.play()
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
        moveDown()
    }
  });
  