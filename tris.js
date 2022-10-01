const tan60 = Math.tan(60 * Math.PI / 180)
const container = document.getElementById('container')
const start = document.querySelector('#start')
const score = document.querySelector('#score')
const grid = document.getElementById('grid')
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

const regularRowJump = [14, 16, 18, 20, 22, 24, 24, 22, 20, 18, 16, 14] // triangles per row (+-0)
const leftFall = [15, 17, 19, 21, 23, 25, 25, 23, 21, 19, 17, 15] // (triangles per row + 2)
const rightFall = [13, 15, 17, 19, 21, 23, 23, 21, 19, 17, 15, 13] // (triangles per row - 2)
const verticalFall = [13, 13, 19, 19, 23, 23, 25, 21, 21, 17, 17, 13] // (zigzag: +2 then -2)

let currentFall = leftFall
let currentRow = 0
const downOneRow = currentFall[currentRow]
const downTwoRows = currentFall[currentRow] + currentFall[currentRow+1]
const downThreeRows = currentFall[currentRow] + currentFall[currentRow+1] + currentFall[currentRow+2]

const violeta = {
    className: 'violet',
        shapeMatrix: [
        [0, 4, downOneRow+1],
        [3, downOneRow+2, downTwoRows+3],
        [downOneRow+4, downTwoRows+1, downThreeRows],
        [downTwoRows, downThreeRows-3, downThreeRows+1],
        [downOneRow-2, downTwoRows-1, downThreeRows-2],
        [1, downOneRow, downTwoRows-3]
    ]
}
const roja = {
    className: 'red',
    shapeMatrix: [
        [2, downOneRow, downOneRow+2],
        [1, 3, downOneRow+1]
    ]
}
const rosada = {
    className: 'pink',
    shapeMatrix: [
        [2, downTwoRows, downOneRow+1,],
        [downOneRow+2, downOneRow+3, downTwoRows-1],
        [downOneRow, downTwoRows+1, downTwoRows+2],
        [downOneRow+1, downTwoRows, downThreeRows-1],
        [downOneRow+2, downTwoRows-2, downTwoRows-1],
        [downOneRow-1, downOneRow, downTwoRows+1]
    ]
}
const naranja = {
    className: 'orange',
    shapeMatrix: [
        [downOneRow, downOneRow+1, downOneRow+2],
        [downOneRow+1, downOneRow+2, downTwoRows+1],
        [downOneRow+2, downTwoRows, downTwoRows+1],
        [downTwoRows-1, downTwoRows, downTwoRows+1],
        [downOneRow, downTwoRows-1, downTwoRows],
        [downOneRow, downOneRow+1, downTwoRows-1]
    ]
}
const amarilla = {
    className: 'yellow',
    shapeMatrix: [
        [downOneRow, downOneRow+2, downTwoRows],
        [downOneRow+1, downTwoRows-1, downTwoRows+1]
    ]
}
const cian = {
    className: 'cyan',
    shapeMatrix: [
        [downOneRow-1, downOneRow+1, downOneRow+3],
        [2, downOneRow+2, downTwoRows+2],
        [downOneRow+3, downTwoRows+1, downThreeRows-1],
        [downTwoRows-2, downTwoRows, downTwoRows+2],
        [downOneRow-1, downTwoRows-1, downThreeRows-1],
        [2, downOneRow, downTwoRows-2]
    ]
}
const blanca = {
    className: 'silver',
    shapeMatrix: [
        [downOneRow+1],
        [downTwoRows]
    ]
}
const fichas = [violeta, roja, rosada, naranja, amarilla, cian, blanca]
let random = Math.floor(Math.random() * fichas.length)
let currentShape = fichas[random]
let currentPosition = 0
let currentRotation = 0

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

function printShape() {
    currentShape.shapeMatrix[currentRotation].forEach(space => gridTriangles[space].classList.add(currentShape.className))
}
function wipeShape() {
    currentShape.shapeMatrix[currentRotation].forEach(space => gridTriangles[space].classList.remove(currentShape.className))
}

printShape()

document.addEventListener('keyup', (e) => {
    if(['A', 'a', 'ArrowLeft'].includes(e.key)) {
        wipeShape()
        currentRotation === 0 ? ( currentRotation = currentShape.shapeMatrix.length - 1 ) : ( currentRotation-- )
        printShape()
    }
    if(['D', 'd', 'ArrowRight'].includes(e.key)) {
        wipeShape()
        currentRotation === currentShape.shapeMatrix.length - 1 ? ( currentRotation = 0 ) : ( currentRotation++ )
        printShape()
    }
    if(e.code === 'Space') {
        wipeShape()
        currentShape = null
        let random = Math.floor(Math.random() * fichas.length)
        currentShape = fichas[random]
        printShape()
    }
  });
  
