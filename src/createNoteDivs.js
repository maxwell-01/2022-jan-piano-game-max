const createNoteDivHtml = (noteNumber, noteColor) => {
    if (noteColor === 'white') {
        return '<div class="target-note white-note-target" id="note-' + noteNumber + '"></div>'
    } else if (noteColor === 'black') {
        return '<div class="target-note black-note-target" id="note-' + noteNumber + '"></div>'
    } else {
        return false
    }
}

export const createNoteDivs = (song, pianoKeys, gameState, notesToPlayArray) => {
    for(let i = 0; i < song.length; i++) {
        let pianoKey = pianoKeys[song[i].note]
        let channel = document.querySelector('#channel-' + song[i].note)
        channel.innerHTML += createNoteDivHtml(i, pianoKey.colour)

        let noteDiv = document.querySelector('#note-' + i)
        let screenSizeAdjustmentFactor = gameState.noteScreenTravelTime / channel.clientHeight
        let noteHeight = notesToPlayArray[i].duration / (screenSizeAdjustmentFactor)
        let noteColour = pianoKeys[song[i].note].colour

        noteDiv.style.height = noteHeight + 'px'
        noteDiv.style.top = -noteHeight + 'px'

        if (noteColour === 'white') {
            noteDiv.style.backgroundColor = '#ff0099'
        } else if (noteColour === 'black') {
            noteDiv.style.backgroundColor = '#1DB8DF'
        }

    }
    return true
}