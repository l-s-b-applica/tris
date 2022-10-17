// EVENT HANDLERS
function printShape(fall, climb) {
    if (fall) {
        if (fallingFlag) { verticalCheck() }
        currentShape.rotations.forEach(r => {
                r.forEach(space => {
                space[0] += currentFall[space[1]]
                space[1]++
            })
        })
    }
    if (climb) {
        if (climbingFlag) { verticalCheck() }
        currentShape.rotations.forEach(r => {
                r.forEach(space => {
                space[1]--
                space[0] -= currentFall[space[1]]
            })
        })
    }
        currentShape.rotations[currentRotation].forEach(space => {
            console.log('CURRENT ROTATION: ', currentRotation)
            console.log('CURRENT SPACE: ', space[0])
            console.log('CURRENT POSITION: ', currentPosition)
                gridTriangles[startSpot + space[0] + currentPosition].classList.add(currentShape.className) //Acá debe ser el bug de las rotaciones
            }
        )
}

function wipeShape() {
    currentShape.rotations[currentRotation].forEach(space => gridTriangles[startSpot + space[0] + currentPosition].classList.remove(currentShape.className))
}

function verticalCheck() {
    if (verticalFallEnabled) { currentFall === leftFall ? (currentFall = rightFall) : (currentFall = leftFall) }
}

let climbingFlag = false, fallingFlag = true

function fall() {
    return setInterval(() => {
        if (climbingFlag) { climbingFlag = false }
        wipeShape()
        printShape(true, false)
        currentBaseRow++
        if (!fallingFlag) { fallingFlag = true }
    }, 1500)
}

function moveUp() {
    if (fallingFlag) { fallingFlag = false }
    wipeShape()
    printShape(false, true)
    currentBaseRow--
    if (!climbingFlag) { climbingFlag = true }
}

function moveDown() {
    if (climbingFlag) { climbingFlag = false }
    wipeShape()
    printShape(true, false)
    currentBaseRow++
    if (!fallingFlag) { fallingFlag = true }
}

function playPause() {
    if (playing === null) {
        console.log('Play')
        printShape()
        playing = fall()
    } else {
        console.log('Pause')
        clearInterval(playing)
        playing = null
    }
}

start.addEventListener('click', playPause)

document.addEventListener('keyup', (e) => {
// LEFT ROTATION
    if(['A', 'a'].includes(e.key)) {
        wipeShape()
        currentRotation === 0 ? ( currentRotation = currentShape.rotations.length - 1 ) : ( currentRotation-- )
        printShape()
    }
// RIGHT ROTATION
    if(['D', 'd'].includes(e.key)) {
        wipeShape()
        currentRotation === currentShape.rotations.length - 1 ? ( currentRotation = 0 ) : ( currentRotation++ )
        printShape()
    }
// LEFT SCROLL
    if((e.key === "ArrowLeft")) {
        wipeShape()
        currentShape.rotations[currentRotation].forEach(space => {space[0] -= 2})
        printShape()
    }
// RIGHT SCROLL
    if((e.key === "ArrowRight")) {
        wipeShape()
        currentShape.rotations[currentRotation].forEach(space => {space[0] += 2})
        printShape()
    }
// VERTICAL SCROLL (For testing purposes)
// UP SCROLL
    if((e.key === "ArrowUp")) { moveUp() }
// DOWN SCROLL
    if((e.key === "ArrowDown")) { moveDown() }
// CHANGE SHAPE (just for showcasing purposes)
    if(e.code === 'Space') {
        wipeShape()
        currentShape = null
        let random = Math.floor(Math.random() * fichas.length)
        currentShape = fichas[random]
        printShape()
    }
  });
  