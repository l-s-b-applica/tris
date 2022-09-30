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

const leftFall = [14, 16, 18, 20, 22, 24, 24, 22, 20, 18, 16, 14] // (triangles per row + 1)
const rightFall = [12, 14, 16, 18, 20, 22, 22, 20, 18, 16, 14, 12] // (triangles per row - 1)
const verticalFall = [14, 14, 18, 18, 22, 22, 24, 20, 20, 16, 16, 12] // (zigzag: +1 then -1)

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
        [2, downOneRow+1, downTwoRows],
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
    className: 'white',
    shapeMatrix: [
        [downOneRow+1],
        [downTwoRows]
    ]
}
const fichas = [violeta, roja, rosada, naranja, amarilla, cian, blanca]

/* console.log('Color random: ', fichas[Math.floor(Math.random() * fichas.length)].className) */

/* Ficha aleatoria --> 
fichas[Math.floor(Math.random() * fichas.length)]
NO guardar en variable, pierde la variación!*/



function newUpTriangle() {
    const upTriangle = document.createElement('div')
    upTriangle.classList.add('up', 'triangle')
    upTriangle.style.cssText = `border-bottom: ${1.5 * tan60}rem solid dimgray;`
    return upTriangle
}

function newDownTriangle() {
    const downTriangle = document.createElement('div')
    downTriangle.classList.add('down', 'triangle')
    downTriangle.style.cssText = `border-top: ${1.5 * tan60}rem solid gray;`
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
const allGridTriangles = Array.from(grid.querySelectorAll('.triangle'))

