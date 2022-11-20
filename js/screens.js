
    const marquee = `
        <svg class="cyan" width="150" height="43">
            <polygon points="0 43, 25 0, 50 43, 75 0, 100 43, 125 0, 150 43"/>
        </svg>
        <svg class="violet" width="150" height="86">
            <polygon points="0 43, 25 0, 50 43, 75 86, 100 43, 125 0, 150 43"/>
        </svg>
        <svg class="red" width="100" height="86">
            <polygon points="0 86, 50 0, 100 86, 50 86, 75 43, 25 43, 50 86"/>
        </svg>
        <svg class="yellow" width="100" height="86">
            <polygon points="0 43, 25 0, 75 86, 25 86, 75 0, 100 43"/>
        </svg>
        <svg class="pink" width="50" height="129">
            <polygon points="0 129, 50 129, 0 43, 25 0, 50 43"/>
        </svg>
        <svg class="orange" width="100" height="43">
            <polygon points="0 43, 25 0, 75 0, 100 43"/>
        </svg>
        <svg class="white" width="50" height="43">
            <polygon points="0 43, 25 0, 50 43"/>
        </svg>
    `;

    function homeToGame() {
        let homeScreen = document.getElementById("home_screen");
        homeScreen.setAttribute('vanished', '');
        setTimeout(async function() {
            homeScreen.remove();
            await playPause();
            alert(`DESPLAZAMIENTO LATERAL:
            Hacia la izquierda: Tecla A o Flecha Izquierda
            Hacia la derecha: Tecla D o Flecha Derecha`);
            alert(`DESPLAZAMIENTO VERTICAL:
            Hacia abajo: Tecla S o Flecha Abajo
            ...No se puede mover hacia arriba, pillines!`);
            alert(`ROTACIÓN DE PIEZAS:
            A contrarreloj (giro izquierdo): Tecla Q o Ctrl Izquierdo
            A reloj (giro derecho): Tecla E o Alt Izquierdo`);
            alert(`OBJETIVO:
            Acomodar las piezas para completar las filas del tablero, sin dejar huecos!
            Cada fila que completes (y limpies) te dará puntos para pasar al próximo nivel.
            ¡A ver si te la bancás y sobrevivís todos los niveles!`);
            alert('Ready? Nivel 1')
        }, 1000)
    };

    const homeContainer = document.getElementById('container');
    
    homeContainer.innerHTML = `
    <div id="home_screen">
        <div id="home_triangle"></div>
        <img id="home_logo" src="assets/tris.png" alt="T r i s" />
        <img id="home_applica" src="assets/applica-edition-no-bg.gif" alt="Applica Edition" />
        <div id="home_marquee">
            ${marquee}
            ${marquee}
        </div>
        <img id="home_play" src="assets/jugar.gif" alt="jugar" />
    </div>
    ` + homeContainer.innerHTML;

    document.getElementById("home_play").onclick = () => homeToGame();