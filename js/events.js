const whoosh = new Audio('./assets/whoosh.mp3')
const clack = new Audio('./assets/lock.mp3')
const knock = new Audio('./assets/knock.mp3')
const wowowow = new Audio('./assets/wowowow.mp3')

// EVENT HANDLERS

function printShape(fall, newPiece, rowPoints) {
    if (rowPoints) { 
        score += 500
        scoreElement.innerHTML = `Puntaje: ${score}`
        levelCheck()
        return
    } else if (fall) {
        fallSwitch()
        currentShape.rotations.forEach(r => {
                r.forEach(tile => {
                tile[2] += currentFall[tile[1] + currentBaseRow]
            })
        })
        currentBaseRow++
    }
    currentShape.rotations[currentRotation].forEach(tile => {
        let tilePosition = gridTriangles[ startSpot + variableColumn + tile[0] + tile[2] ]
        if (newPiece && tilePosition.hasAttribute('frozen')) { gameOver() }
        tilePosition.classList.add(currentShape.className)
    })
    if (fall || newPiece) {
        score++
        scoreElement.innerHTML = `Puntaje: ${score}`
        levelCheck()
    }
}

async function gameOver() {
    await playPause()
    location.reload()
    const gameOverAlert = () => alert('Perdiste! Empezar de nuevo?')
    gameOverAlert()
}

function wipeShape() {
    currentShape.rotations[currentRotation].forEach(
        tile => gridTriangles[ startSpot + variableColumn + tile[0] + tile[2] ].classList.remove(currentShape.className)
    )
}
    
async function checkForFullRows(thisRow) {
    let myRowArray = Array.from(document.getElementsByClassName(`row${thisRow}`)[0].children)
    ///// SI TODAS LAS FICHAS DE LA FILA ESTÁN CONGELADAS: /////
    if(myRowArray.filter(tile => tile.hasAttribute('frozen')).length === gridValues[thisRow-1].length) {
        
        window.fullRow = true
        const animateRow = () => myRowArray.forEach(async tile => {
            tile.classList.add('vanish')
            playPause()
            await setTimeout(() => {
                tile.classList.remove('vanish');
                playPause()
            }, 900)
        });
        const eraseRow = setTimeout(() => myRowArray.forEach(tile => {
            tile.classList.remove(...colors)
            tile.removeAttribute('frozen')
        }), 900);
        const letFall = setTimeout(() => {
            while (thisRow > 1) {
                let upperRowArray = Array.from(document.getElementsByClassName(`row${thisRow-1}`)[0].children)
                upperRowArray.forEach(tile => { // If on bottom or on frozen tile, do nothing
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
        }, 900);
        wowowow.play()
        animateRow()
        eraseRow
        letFall            
    }
}

async function freeze() {
    window.fullRow = false
    clack.play()
    currentShape.rotations[currentRotation].forEach(
        tile => gridTriangles[ startSpot + variableColumn + tile[0] + tile[2] ].setAttribute('frozen', true)
    )
    const rows = [12,11,10,9,8,7,6,5,4,3,2,1]
    await rows.forEach(function(row) { checkForFullRows(row) })
    restartShapePosition()
    newShape()
    printShape(false, true, fullRow)
}

function fall() {
    return setInterval(() => {
        if (verticalFallEnabled) { limitSwitch() }
        let thisShape = currentShape.rotations[currentRotation]
        let bottomCondition = thisShape.some(
            tile => bottomLimitTriangles.includes(startSpot + variableColumn + tile[0] + tile[2])
        )
        let frozenTouchCondition = thisShape.some(
            tile => gridTriangles[startSpot + variableColumn + tile[0] + tile[2] + nextFall[tile[1] + currentBaseRow]] &&
            gridTriangles[startSpot + variableColumn + tile[0] + tile[2] + nextFall[tile[1] + currentBaseRow]].hasAttribute('frozen')
        )
        // Check for freeze conditions and freeze, else move down
        if (bottomCondition) {
            freeze()
        } else if (frozenTouchCondition) {
            freeze()
        } else {  
            wipeShape()
            printShape(true)
        }
    }, 1500)
}

function moveDown() {
    if (verticalFallEnabled) { limitSwitch() }
    let thisShape = currentShape.rotations[currentRotation]
    let bottomCondition = thisShape.some(
        tile => bottomLimitTriangles.includes(startSpot + variableColumn + tile[0] + tile[2])
    )
    let frozenTouchCondition = thisShape.some(
        tile => gridTriangles[startSpot + variableColumn + tile[0] + tile[2] + nextFall[tile[1] + currentBaseRow]] &&
        gridTriangles[startSpot + variableColumn + tile[0] + tile[2] + nextFall[tile[1] + currentBaseRow]].hasAttribute('frozen')
    )
    if (bottomCondition) {
        freeze()
    } else if (frozenTouchCondition) {
        freeze()
    } else {  
        wipeShape()
        printShape(true, false)
     }
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
    if (playing) {
        let thisShape = currentShape.rotations[currentRotation]

    // LEFT ROTATION
        if(['Q', 'q', 'Control'].includes(e.key)) {
            wipeShape()
            currentRotation === 0 ? ( currentRotation = currentShape.rotations.length - 1 ) : ( currentRotation-- )
            whoosh.play()
            printShape()
        }
    // RIGHT ROTATION
        if(['E', 'e', 'Alt'].includes(e.key)) {
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
    // DOWN SCROLL
        if(['ArrowDown', 's', 'S'].includes(e.key)) {
            moveDown()
        }
    }
  });
  