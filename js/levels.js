let level = 1

function clearBoard() {
    gridTriangles.forEach(tile => {
        tile.classList.remove(...colors)
        tile.removeAttribute('frozen')
    })
}

function levelCheck() {
    if(level === 1 && score > 4000) {
        playPause()
        level2()
        newLevel = true
        clearBoard()
        setTimeout(() => {playPause()}, 1500)
    }
    if(level === 2 && score > 8000) {
        playPause()
        level3()
        newLevel = true
        clearBoard()
        setTimeout(() => {playPause()}, 1500)
    }
    if(level === 3 && score > 10000) {
        playPause()
        alert('Uy, ganaste! Te llevo a la home.')
        location.reload()
    }
}

function level2() {
    wipeShape()
    level = 2
    alert('Nivel 2')
    enableRightFall()
}

function level3() {
    wipeShape()
    level = 3
    alert(`Nivel 3
    A ver ahora de qué te vas a disfrazar.`)
    enableVerticalFall()
}
