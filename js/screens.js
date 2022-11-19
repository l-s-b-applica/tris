
function home() {
    const homeContainer = document.getElementById('container')
    homeContainer.innerHTML = `
    <div class="column" id="homeScreen">
        <img id="src="assets/applica-edition-no-bg.gif" alt="Applica Edition" />
        <img src="assets/jugar.gif" alt="jugar" onclick=" />
    </div>
    ` + homeContainer.innerHTML
}

home()