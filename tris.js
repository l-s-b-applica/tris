const tan60 = Math.tan(60 * Math.PI / 180)
const container = document.getElementById('container')
const start = document.querySelector('#start')
const score = document.querySelector('#score')
const grid = document.getElementById('grid')

const regularRowJump = [14, 16, 18, 20, 22, 24, 24, 22, 20, 18, 16, 14] // triangles per row (+-0)
const leftFall = [15, 17, 19, 21, 23, 25, 25, 23, 21, 19, 17, 15] // (triangles per row + 2)
const rightFall = [13, 15, 17, 19, 21, 23, 23, 21, 19, 17, 15, 13] // (triangles per row - 2)
const verticalFall = [13, 13, 19, 19, 23, 23, 25, 21, 21, 17, 17, 13] // (zigzag: +2 then -2)

let currentFall = leftFall
let currentBaseRow = 0
const downOneRow = currentFall[currentBaseRow]
const downTwoRows = currentFall[currentBaseRow] + currentFall[currentBaseRow+1]
const downThreeRows = currentFall[currentBaseRow] + currentFall[currentBaseRow+1] + currentFall[currentBaseRow+2]

function Shape(className, rotations){
    this.className = className
    this.rotations = []
    rotations.forEach(r => {
        let triangles = []
        r.forEach( t => triangles.push({spot: t[0], row: currentBaseRow + t[1]}) )
        this.rotations.push(r)
    })
}

const violeta = new Shape(
    'violet',
    [
        [[0, 0], [4, 0], [downOneRow+1, 1]],
        [[3, 0], [downOneRow+2, 1], [downTwoRows+3, 2]],
        [[downOneRow+4, 1], [downTwoRows+1, 2], [downThreeRows, 3]],
        [[downTwoRows, 2], [downThreeRows-3, 3], [downThreeRows+1, 3]],
        [[downOneRow-2, 1], [downTwoRows-1, 1], [downThreeRows-2, 2]],
        [[1, 0], [downOneRow, 1], [downTwoRows-3, 2]]
    ]
)

const roja = new Shape(
    'red',
    [
        [[2, 0], [downOneRow, 1], [downOneRow+2, 1]],
        [[1, 0], [3, 0], [downOneRow+1, 1]],
        [[2, 0], [downOneRow, 1], [downOneRow+2, 1]],
        [[1, 0], [3, 0], [downOneRow+1, 1]],
        [[2, 0], [downOneRow, 1], [downOneRow+2, 1]],
        [[1, 0], [3, 0], [downOneRow+1, 1]]
    ]
)
const rosada = new Shape(
    'pink',
    [
        [[2, 0], [downTwoRows, 2], [downOneRow+1, 1],],
        [[downOneRow+2, 1], [downOneRow+3, 1], [downTwoRows-1, 2]],
        [[downOneRow, 1], [downTwoRows+1, 2], [downTwoRows+2, 2]],
        [[downOneRow+1, 1], [downTwoRows, 2], [downThreeRows-1, 3]],
        [[downOneRow+2, 1], [downTwoRows-2, 2], [downTwoRows-1, 2]],
        [[downOneRow-1, 1], [downOneRow, 1], [downTwoRows+1, 2]]
    ]
)
const naranja = new Shape(
    'orange',
    [
        [[downOneRow, 1], [downOneRow+1, 1], [downOneRow+2, 1]],
        [[downOneRow+1, 1], [downOneRow+2, 1], [downTwoRows+1, 2]],
        [[downOneRow+2, 1], [downTwoRows, 2], [downTwoRows+1, 2]],
        [[downTwoRows-1, 2], [downTwoRows, 2], [downTwoRows+1, 2]],
        [[downOneRow, 1], [downTwoRows-1, 2], [downTwoRows, 2]],
        [[downOneRow, 1], [downOneRow+1, 2], [downTwoRows-1, 2]]
    ]
)

const amarilla = new Shape(
    'yellow',
    [
        [[downOneRow, 1], [downOneRow+2, 1], [downTwoRows, 2]],
        [[downOneRow+1, 1], [downTwoRows-1, 2], [downTwoRows+1, 2]],
        [[downOneRow, 1], [downOneRow+2, 1], [downTwoRows, 2]],
        [[downOneRow+1, 1], [downTwoRows-1, 2], [downTwoRows+1, 2]],
        [[downOneRow, 1], [downOneRow+2, 1], [downTwoRows, 2]],
        [[downOneRow+1, 1], [downTwoRows-1, 2], [downTwoRows+1, 2]]
    ]
)

const cian = new Shape(
    'cyan',
    [
        [[downOneRow-1, 1], [downOneRow+1, 1], [downOneRow+3, 1]],
        [[2, 0], [downOneRow+2, 1], [downTwoRows+2, 2]],
        [[downOneRow+3, 1], [downTwoRows+1, 2], [downThreeRows-1, 3]],
        [[downTwoRows-2, 2], [downTwoRows, 2], [downTwoRows+2, 2]],
        [[downOneRow-1, 1], [downTwoRows-1, 2], [downThreeRows-1, 3]],
        [[2, 0], [downOneRow, 1], [downTwoRows-2, 2]]
    ]
)

const blanca = new Shape(
    'silver',
    [
        [[downOneRow+1, 1]],
        [[downTwoRows, 2]],
        [[downOneRow+1, 1]],
        [[downTwoRows, 2]],
        [[downOneRow+1, 1]],
        [[downTwoRows, 2]]
    ]
)

const fichas = [violeta, roja, rosada, naranja, amarilla, cian, blanca]
let random = Math.floor(Math.random() * fichas.length)
let currentShape = fichas[random]
let currentPosition = 0
let currentRotation = 0

// GRID RENDERING
const gridValues = [
    [1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0]
]

function newUpTriangle() {
    const upTriangle = document.createElement('div')
    upTriangle.style.cssText = `border-bottom-width: ${1.5 * tan60}rem; border-bottom-style: solid;`
    upTriangle.classList.add('up', 'triangle')
    return upTriangle
}

function newDownTriangle() {
    const downTriangle = document.createElement('div')
    downTriangle.style.cssText = `border-top-width: ${1.5 * tan60}rem; border-top-style: solid;`
    downTriangle.classList.add('down', 'triangle')
    return downTriangle
}

gridValues.forEach(row => {
    var newRow = grid.appendChild(document.createElement('div'))
    newRow.classList.add('gridRow', `row${gridValues.indexOf(row) + 1}`)
    row.forEach(triangleValue => {
        if (triangleValue === 1) newRow.appendChild(newUpTriangle())
        if (triangleValue === 0) newRow.appendChild(newDownTriangle())
    })
})

//Select all triangles
const gridTriangles = Array.from(grid.querySelectorAll('.triangle'))
let playing = null

function printShape() {
    currentShape.rotations[currentRotation].forEach(space => {
/*         let i = 0
        while(currentPosition > fallFilter[i]) {
            console.log('skip...')
            i++
        }
        console.log('space[1]?', space[1])
        i += space[1]
        console.log('i now? ', i)
        let thisRowsFall = currentFall[i+currentBaseRow]
        console.log('space now? ', space[0])
        currentPosition += thisRowsFall */
            gridTriangles[space[0] + currentPosition].classList.add(currentShape.className)
        }
    )
}

function wipeShape() {
    currentShape.rotations[currentRotation].forEach(space => gridTriangles[space[0] + currentPosition].classList.remove(currentShape.className)) //fix.
}

const fallFilter = [13, 28, 45, 64, 85, 108, 131, 152, 171, 188, 203, 216]
fallFilter
function fall() {
    return setInterval(() => {
        wipeShape()
        printShape()
        currentBaseRow++
    }, 700)
}

function playPause() {
    if (playing === null) {
        console.log('playing is null')
        printShape()
        playing = fall()
    } else {
        console.log('playing is not null: ', playing)
        clearInterval(playing)
        playing = null
    }
}

start.addEventListener('click', playPause)

// LEFT ROTATION
document.addEventListener('keyup', (e) => {
    if(['A', 'a', 'ArrowLeft'].includes(e.key)) {
        wipeShape()
        currentRotation === 0 ? ( currentRotation = currentShape.rotations.length - 1 ) : ( currentRotation-- )
        printShape()
    }
// RIGHT ROTATION
    if(['D', 'd', 'ArrowRight'].includes(e.key)) {
        wipeShape()
        currentRotation === currentShape.rotations.length - 1 ? ( currentRotation = 0 ) : ( currentRotation++ )
        printShape()
    }
// CHANGE SHAPE (just for showcasing purposes)
    if(e.code === 'Space') {
        wipeShape()
        currentShape = null
        let random = Math.floor(Math.random() * fichas.length)
        currentShape = fichas[random]
        printShape()
    }
  });
  
