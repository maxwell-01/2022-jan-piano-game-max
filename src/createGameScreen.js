export const createGameScreen = (pianoKeys, keyBoardMapping) => {
    let pianoKeyContainer = document.querySelector('.piano-key-container')
    let gameNotesContainer = document.querySelector('.game-notes-container')

    Object.keys(keyBoardMapping).forEach((keyCode) => {
        let keyboardKey = keyBoardMapping[keyCode]
        let pianoKey = pianoKeys[keyboardKey.note]
        if(pianoKey.colour === 'white') {
            pianoKeyContainer.innerHTML +=
                '<div id="' + keyboardKey.note + '" class="piano-key white-key" data-id="' + keyboardKey.note + '">\n' +
                '   <p>' + keyboardKey.label + '</p>\n' +
                '</div>'
            gameNotesContainer.innerHTML +=
                '<div class="piano-key-channel white-key-channel" id="channel-' + keyboardKey.note + '">\n' +
                '</div>'
        } else if(pianoKey.colour === 'black') {
            let parentWhiteKeyDiv = document.querySelector('#' + pianoKey.parentKey )
            let blackKey =
                '<div id="' + keyboardKey.note + '" class="piano-key black-key" data-note="' + keyboardKey.note + '">\n' +
                '   <p>' + keyboardKey.label + '</p>\n' +
                '</div>\n' + parentWhiteKeyDiv.innerHTML
            parentWhiteKeyDiv.innerHTML = blackKey
            let parentWhiteChannel = document.querySelector('#channel-' + pianoKey.parentKey)
            parentWhiteChannel.innerHTML +=
                '<div class="piano-key-channel black-key-channel" id="channel-' + keyboardKey.note + '">\n' +
                '</div>'
        }
    })
}