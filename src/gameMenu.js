export const createStartGameModalHtml = () => {
    return(
        '<div class="modal" id="start-game-menu">' +
        '   <h2 class="modal-heading">Welcome to Piano Plinky Plonk!</h2>' +
        '   <p class="modal-text">The game for aspiring musicians everywhere</p>' +
        '   <button class="button-click-listener" id="instructions-button">i</button>' +
        '   <button class="modal-button button-click-listener" id="start-game-button">Start game</button>' +
        '   <button class="modal-button button-click-listener" id="free-play-button">Free play</button>' +
        '</div>')

}

export const instructionsModalHtml = () => {
    return(
        '<div class="modal" id="instructions-menu">\n' +
        '    <h2 class="modal-heading">Instructions</h2>' +
        '    <p class="modal-text">Welcome to Piano Plinky Plonk, the interactive web-piano that allows you to play your own tunes!</p>\n' +
        '    <p class="modal-text">To get started:</p>\n' +
        '    <ol>\n' +
        '        <li class="modal-text">using your keyboard, tap the corresponding keys to play notes</li>\n' +
        '        <li class="modal-text">\'A\' to \'↵\' are the white piano keys</li>\n' +
        '        <li class="modal-text">\'W\' to \']\' are the black piano keys</li>\n' +
        '    </ol>\n' +
        '    <button class="modal-button button-click-listener" id="close-instructions-button">Back</button>' +
        '</div>'
    )
}

