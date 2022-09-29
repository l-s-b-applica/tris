const tan60 = Math.tan(60 * Math.PI / 180)
const container = document.getElementById('container')
const grid = document.getElementById('grid')

function newUpTriangle() {
    const upTriangle = document.createElement('div')
    upTriangle.classList.add('up', 'triangle')
    upTriangle.style.cssText = `border-bottom: ${1.5 * tan60}rem solid dimgray;`
    return upTriangle
}

function newDownTriangle() {
    const downTriangle = document.createElement('div')
    downTriangle.classList.add('down', 'triangle')
    downTriangle.style.cssText = `border-top: ${1.5 * tan60}rem solid dimgray;`
    return downTriangle
}

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

gridValues.forEach(row => {
    var newRow = grid.appendChild(document.createElement('div'))
    newRow.classList.add('gridRow', `row${gridValues.indexOf(row) + 1}`)
    row.forEach(triangleValue => {
        if (triangleValue === 1) newRow.appendChild(newUpTriangle())
        if (triangleValue === 0) newRow.appendChild(newDownTriangle())
    })
})
