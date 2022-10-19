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
        gridTriangles[ startSpot + baseColumn + space[0] ].classList.add(currentShape.className)
    })
}

function wipeShape() {
    currentShape.rotations[currentRotation].forEach(space => gridTriangles[ startSpot + baseColumn + space[0] ].classList.remove(currentShape.className))
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

function restartShapePosition() {
    baseColumn = startSpot
    currentRotation = 0
}

start.addEventListener('click', playPause)

document.addEventListener('keyup', (e) => {
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
        wipeShape()
        baseColumn -= 2
        printShape()
    }
// RIGHT SCROLL
    if(['D', 'd', 'ArrowRight'].includes(e.key)) {
        wipeShape()
        baseColumn += 2
        printShape()
    }
// VERTICAL SCROLL (For testing purposes)
// UP SCROLL
    if(['W', 'w', 'ArrowUp'].includes(e.key)) { moveUp() }
// DOWN SCROLL
    if(['ArrowDown', 's', 'S'].includes(e.key)) { moveDown() }
// CHANGE SHAPE (just for showcasing purposes)
    if(e.code === 'Space') {
        wipeShape()
        restartShapePosition()
        currentShape = null
        let random = Math.floor(Math.random() * fichas.length)
        currentShape = fichas[random]
        printShape()
    }
  });
  