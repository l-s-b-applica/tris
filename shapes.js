// SHAPES CONFIG
let currentBaseRow = 0
const downOneRow = currentFall[currentBaseRow]
const downTwoRows = currentFall[currentBaseRow] + currentFall[currentBaseRow+1]
const downThreeRows = currentFall[currentBaseRow] + currentFall[currentBaseRow+1] + currentFall[currentBaseRow+2]

function Shape(className, rotations){
    this.className = className
    this.rotations = []
    rotations.forEach(r => {
        let triangles = []
        r.forEach( t => triangles.push({spot: startSpot + t[0], row: currentBaseRow + t[1]}) )
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
        [[downOneRow-2, 1], [downTwoRows-1, 2], [downThreeRows-2, 3]],
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
        [[downOneRow, 1], [downOneRow+1, 1], [downTwoRows-1, 2]]
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
    'white',
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
let baseColumn = 0
let currentRotation = 0
