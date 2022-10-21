const tan60 = Math.tan(60 * Math.PI / 180)
const container = document.getElementById('container')
const start = document.querySelector('#start')
const score = document.querySelector('#score')
const grid = document.getElementById('grid')

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

function newTriangle(value, number) {
    const gridTriangle = document.createElement('div')
    gridTriangle.setAttribute('id', number)
    const triangleText = gridTriangle.appendChild(document.createElement('div'))
    triangleText.innerHTML = number
    if (value === 1) {
        gridTriangle.style.cssText = `border-bottom-width: ${1.5 * tan60}rem; border-bottom-style: solid;`
        gridTriangle.classList.add('up', 'triangle')
        triangleText.style.cssText = 'margin-top: 1.2rem; margin-left: -0.6rem;'
    } else {
        gridTriangle.style.cssText = `border-top-width: ${1.5 * tan60}rem; border-top-style: solid;`
        gridTriangle.classList.add('down', 'triangle')
        triangleText.style.cssText = 'margin-top: -2.2rem; margin-left: -0.6rem;'
    }
    return gridTriangle
}

const leftLimitTriangles = [0,1,13,14,28,29,45,46,64,65,85,86,108,109,131,132,152,153,171,172,188,189,203,204]
const rightLimitTriangles = [11,12,26,27,43,44,62,63,83,84,106,107,129,130,150,151,169,170,186,187,201,202,214,215]

var accTriangleNumber = 0
gridValues.forEach(row => {
    var newRow = grid.appendChild(document.createElement('div'))
    newRow.classList.add('gridRow', `row${gridValues.indexOf(row) + 1}`)
    row.forEach(triangleValue => {
        const thisTriangle = newRow.appendChild(newTriangle(triangleValue, accTriangleNumber))
        accTriangleNumber++
    })
})

//Select all triangles
const gridTriangles = Array.from(grid.querySelectorAll('.triangle'))
let playing = null
