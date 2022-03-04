let createStartGameModal = () => {
    let modalContainer = document.querySelector('.modal-container')
    modalContainer.innerHTML =
        '<div class="modal">' +
        '   <h2 class="modal-heading">Welcome to Piano Plinky Plonk!</h2>' +
        '   <p class="modal-text">The game for aspiring musicians everywhere</p>' +
        '   <button class="button-click-listener" id="instructions-button">i</button>' +
        '   <button class="modal-button button-click-listener" id="start-game-button">Start</button>' +
        '</div>'
    handleModalClicks()
}

let instructionsModal = () => {
    let modalContainer = document.querySelector('.modal-container')
    modalContainer.innerHTML =
        '<div class="modal">\n' +
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
    handleModalClicks()
}

let handleModalClicks = () => {
    let modalButtons = document.querySelectorAll('.button-click-listener')
    modalButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            switch(event.target.id) {
                case 'start-game-button':
                    document.querySelector('.modal-background').style.display = 'none'
                    play()
                    break;
                case 'instructions-button':
                    instructionsModal()
                    break;
                case 'close-instructions-button':
                    createStartGameModal()
                    break;
                default:
                    console.log('default triggered')
            }
        })
    })
}

function createGameScreen() {
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
            let newContent =
                '<div id="' + keyboardKey.note + '" class="piano-key black-key" data-note="' + keyboardKey.note + '">\n' +
                '   <p>' + keyboardKey.label + '</p>\n' +
                '</div>\n' + parentWhiteKeyDiv.innerHTML
            parentWhiteKeyDiv.innerHTML = newContent
            let parentWhiteChannel = document.querySelector('#channel-' + pianoKey.parentKey)
            parentWhiteChannel.innerHTML +=
                '<div class="piano-key-channel black-key-channel" id="channel-' + keyboardKey.note + '">\n' +
                '</div>'
        }
    })
}
function play() {
    let song = popcornSongNotes
    let notesPlaying = {};
    // could add a free play mode and activate the keyboard here
    runGame(song, notesPlaying) // passing notesPlaying through as variable so that I can add an option to play the keyboard without notes flying
}
function runGame(song,notesPlaying) { // somewhere, something isn't being passed through as setting game speed manually works, but not when the program increments itself.
    gameState.gameStartTime = new Date()
    createNoteDivs(song)
    populateNotesAndChannelArrays(song)
    playSongOnLoop(song)

    window.addEventListener('keydown' , (event) => {
        let keyboardKey = handleKeyboardEvent(event, notesPlaying)
        detectNoteHit(keyboardKey)
    })
    window.addEventListener('keyup' , (event) => {
        handleKeyboardEvent(event, notesPlaying)
    })

    //on game over count how many notes
    // played, or how many notes hit - duplicate info, no because you will have lives
}
function createNoteDivs(song) {
    for(let i = 0; i < song.length; i++) {
        let pianoKey = pianoKeys[song[i].note]
        let channel = document.querySelector('#channel-' + song[i].note)
        let noteDiv
        if(pianoKey.colour === 'white'){
            noteDiv = '<div class="target-note white-note-target" id="note-' + i + '"></div>'
        } else if(pianoKey.colour === 'black'){
            noteDiv = '<div class="target-note black-note-target" id="note-' + i + '"></div>'
        }
        channel.innerHTML += noteDiv
    }
}
function populateNotesAndChannelArrays(song) {
    notesInChannels = {}
    notesToPlayArray = []
    for(let i = 0; i < song.length; i++) {
        notesToPlayArray.push(
            {
                note: song[i].note,
                notePlayedAt: song[i].notePlayedAt / gameState.gameSpeed,
                duration: song[i].duration / gameState.gameSpeed,
                "noteId": i})
        if(typeof notesInChannels[song[i].note] === "undefined") {notesInChannels[song[i].note] = []}
        notesInChannels[song[i].note].push(
            {
                note: song[i].note,
                notePlayedAt: song[i].notePlayedAt,
                duration: 500,
                "noteId": i
            })
    }
}
function playSongOnLoop(song) {
    function loopGameSong(songLength) {
        setTimeout(() => {
            gameState.gameSpeed += gameState.gameSpeedIncreaseIncrement
            populateNotesAndChannelArrays(song, gameState)
            setNoteDivProperties(song, gameState)
            animateNotes(gameState)
            let lastNote = notesToPlayArray[notesToPlayArray.length - 1]
            let songLengthTimer = (lastNote.notePlayedAt + lastNote.duration + gameState.noteScreenTravelTime) / gameState.gameSpeed
            gameState.songLength = songLengthTimer
            gameState.gameLoop++
            loopGameSong(songLengthTimer)
        },songLength)
    }
    loopGameSong(0)
}
function setNoteDivProperties(song) {
    for(let i = 0; i < song.length; i++) {
        let channel = document.querySelector('#channel-' + song[i].note)
        let screenSizeAdjustmentFactor = gameState.noteScreenTravelTime / channel.clientHeight
        let noteHeight = notesToPlayArray[i].duration / (screenSizeAdjustmentFactor)
        let noteDiv = document.querySelector('#note-' + i)
        let noteColour = pianoKeys[song[i].note].colour

        noteDiv.style.height = noteHeight + 'px'
        noteDiv.style.top = -noteHeight + 'px'

        if (noteColour === 'white') {
            noteDiv.style.backgroundColor = '#ff0099'
        } else if (noteColour === 'black') {
            noteDiv.style.backgroundColor = '#1DB8DF'
        }
    }
}
function animateNotes() {
    notesToPlayArray.forEach((note) => {
        setTimeout(() => {
            let divToAnimate = document.querySelector('#note-' + note.noteId)
            let channelHeight = document.querySelector('.piano-key-channel').clientHeight
            let noteHeight = divToAnimate.clientHeight
            let noteAnimationDistance = channelHeight + noteHeight
            let noteAnimationTime = ((gameState.noteScreenTravelTime / gameState.gameSpeed) * noteAnimationDistance) / channelHeight

            divToAnimate.animate([
                    { transform: 'translateY(0px)'},
                    { transform: 'translateY(' + noteAnimationDistance + 'px)'}
                ], {
                    duration: noteAnimationTime,
                    iterations: 1
                }
            )
        }, note.notePlayedAt / gameState.gameSpeed )
    })
}
function handleKeyboardEvent(event, notesPlaying) {
    event.preventDefault()
    if(Object.keys(keyBoardMapping).includes(event.code)) {
        let keyboardKey = keyBoardMapping[event.code]
        if (event.type === 'keydown') {
            let pianoKey = pianoKeys[keyboardKey.note]
            if (keyboardKey.pressed === false) {
                keyboardKey.pressed = true
                notesPlaying[keyboardKey.note] = playNote(pianoKey.frequency)
                document.querySelector('#' + keyboardKey.note).classList.add('depressedKey')
            }
        } else if (event.type === 'keyup') {
            if (keyboardKey.pressed === true) {
                keyboardKey.pressed = false
                notesPlaying[keyboardKey.note].stop()
                document.querySelector('#' + keyboardKey.note).classList.remove('depressedKey')
            }
        }
        return keyboardKey
    }
}
function playNote(frequency) {
    let sound = audioContext.createOscillator()
    sound.connect(audioConnect)
    sound.type = 'sine'
    sound.frequency.value = frequency
    sound.start()
    return sound
}
function detectNoteHit(keyboardKey) {
    if(typeof notesInChannels[keyboardKey.note][0] != "undefined") {
        let note = notesInChannels[keyboardKey.note][0]
        let noteShouldBePlayed = (note.notePlayedAt + (gameState.noteScreenTravelTime / gameState.gameSpeed)) + (gameState.songLength * (gameState.gameLoop - 1))
        let noteActuallyPlayed = new Date() - gameState.gameStartTime


        console.log('Note should be played at: ' + noteShouldBePlayed)
        console.log('Not actually played at: ' + noteActuallyPlayed)

        console.log('noteScreenTravelTime = ' + gameState.noteScreenTravelTime)
        console.log('gameSpeed = ' + gameState.gameSpeed)
        console.log('songLength = ' + gameState.songLength)
        console.log('gameLoop = ' + gameState.gameLoop)

        document.querySelector('#note-'+note.noteId).style.backgroundColor = 'green'
        notesInChannels[keyboardKey.note].splice(0, 1)
    }

    // create array of the channels, put the notes to be played into each channel with the time they should be played
    // pass game timer into keyboard event listener so it can compare
    //when a note is hit, remove it from the front of this 'queue' (slice -1 it off)
    // need to think about what happens if a note is missed, get them hitting first then cross this bridge
}

const pianoKeys = {
    'g3' : {
        colour: 'white',
        frequency: 195.9977
    },
    'g3sharp' : {
        colour: 'black',
        parentKey: 'g3',
        frequency: 207.6523
    },
    'a4' : {
        colour: 'white',
        frequency: 220.0000
    },
    'a4sharp' : {
        colour: 'black',
        parentKey: 'a4',
        frequency: 233.0819
    },
    'b4' : {
        colour: 'white',
        frequency: 246.9417
    },
    'c4' : {
        colour: 'white',
        frequency: 261.6256
    },
    'c4sharp' : {
        colour: 'black',
        parentKey: 'c4',
        frequency: 277.1826
    },
    'd4' : {
        colour: 'white',
        frequency: 293.6648
    },
    'd4sharp' : {
        colour: 'black',
        parentKey: 'd4',
        frequency: 311.1270
    },
    'e4' : {
        colour: 'white',
        frequency: 329.6276
    },
    'f4' : {
        colour: 'white',
        frequency: 349.2282
    },
    'f4sharp' : {
        colour: 'black',
        parentKey: 'f4',
        frequency: 369.9944
    },
    'g4' : {
        colour: 'white',
        frequency: 391.9954
    },
    'g4sharp' : {
        colour: 'black',
        parentKey: 'g4',
        frequency: 415.3047
    },
    'a5' : {
        colour: 'white',
        frequency: 440.0000
    },
    'a5sharp' : {
        colour: 'black',
        parentKey: 'a5',
        frequency: 466.1638
    },
    'b5' : {
        colour: 'white',
        frequency: 493.8833
    },
    'c5' : {
        colour: 'white',
        frequency: 523.2511
    },
    'c5sharp' : {
        colour: 'black',
        parentKey: 'c5',
        frequency: 554.3653
    },
    'd5' : {
        colour: 'white',
        frequency: 587.3295
    },
    'd5sharp' : {
        colour: 'black',
        parentKey: 'd5',
        frequency: 622.2540
    },
    'e5' : {
        colour: 'white',
        frequency: 659.2551
    }
}
const keyBoardMapping = {
    'KeyA' : {
            note: 'g3',
            code: 'KeyA',
            label: 'A',
            pressed: false
    },
    'KeyW' : {

            note: 'g3sharp',
            code: 'KeyW',
            label: 'W',
            pressed: false

    },
    'KeyS' : {

            note: 'a4',
            code: 'KeyS',
            label: 'S',
            pressed: false,
    },
    'KeyE' : {
            note: 'a4sharp',
            code: 'KeyE',
            label: 'E',
            pressed: false
    },
    'KeyD' : {
            note: 'b4',
            code: 'KeyD',
            label: 'D',
            pressed: false
    },
    'KeyF' : {
            note: 'c4',
            code: 'KeyF',
            label: 'F',
            pressed: false
    },
    'KeyT' : {
            note: 'c4sharp',
            code: 'KeyT',
            label: 'T',
            pressed: false
    },
    'KeyG' : {
            note: 'd4',
            code: 'KeyG',
            label: 'G',
            pressed: false
    },
    'KeyY' : {
            note: 'd4sharp',
            code: 'KeyY',
            label: 'Y',
            pressed: false
    },
    'KeyH' : {
            note: 'e4',
            code: 'KeyH',
            label: 'H',
            pressed: false
    },
    'KeyJ' : {
            note: 'f4',
            code: 'KeyJ',
            label: 'J',
            pressed: false
    },
    'KeyI' : {
            note: 'f4sharp',
            code: 'KeyI',
            label: 'I',
            pressed: false
    },
    'KeyK' : {
            note: 'g4',
            code: 'KeyK',
            label: 'K',
            pressed: false,
    },
    'KeyO' : {
            note: 'g4sharp',
            code: 'KeyO',
            label: 'O',
            pressed: false
    },
    'KeyL' : {
            note: 'a5',
            code: 'KeyL',
            label: 'L',
            pressed: false
    },
    'KeyP' : {
            note: 'a5sharp',
            code: 'KeyP',
            label: 'P',
            pressed: false
    },
    'Semicolon' : {
            note: 'b5',
            code: 'Semicolon',
            label: ';',
            pressed: false
    },
    'Quote' : {
            note: 'c5',
            code: 'Quote',
            label: "'",
            pressed: false,
    },
    'BracketLeft' : {
            note: 'c5sharp',
            code: 'BracketLeft',
            label: '[',
            pressed: false,
    },
    'Backslash' : {
            note: 'd5',
            code: 'Backslash',
            label: '\\',
            pressed: false,
    },
    'BracketRight' : {
            note: 'd5sharp',
            code: 'BracketRight',
            label: ']',
            pressed: false,
    },
    'Enter' : {

            note: 'e5',
            code: 'Enter',
            label: '⏎',
            pressed: false,
    },
}
const popcornSongNotes = [
    {
        note: 'b5',
        notePlayedAt: 0,
        duration:500
    },
    {
        note: 'a5',
        notePlayedAt: 500,
        duration:1000
    },
    {
        note: 'b5',
        notePlayedAt: 1000,
        duration:500
    },
    // {
    //     note: 'f4sharp',
    //     notePlayedAt: 3500,
    //     duration:500
    // },
    // {
    //     note: 'd4',
    //     notePlayedAt: 4000,
    //     duration:500
    // },
    // {
    //     note: 'f4sharp',
    //     notePlayedAt: 4500,
    //     duration:500
    // },
    // {
    //     note: 'b4',
    //     notePlayedAt: 5000,
    //     duration:500
    // },
    // {
    //     note: 'b5',
    //     notePlayedAt: 6000,
    //     duration:500
    // },
    // {
    //     note: 'a5',
    //     notePlayedAt: 6500,
    //     duration:500
    // },
    // {
    //     note: 'b5',
    //     notePlayedAt: 7000,
    //     duration:200
    // },
    // {
    //     note: 'f4sharp',
    //     notePlayedAt: 7500,
    //     duration:200
    // },
    // {
    //     note: 'd4',
    //     notePlayedAt: 8000,
    //     duration:200
    // },
    // {
    //     note: 'f4sharp',
    //     notePlayedAt: 8500,
    //     duration:200
    // },
    // {
    //     note: 'b4',
    //     notePlayedAt: 9000,
    //     duration:200
    // },
    // {
    //     note: 'b5',
    //     notePlayedAt: 10000,
    //     duration:200
    // },
    // {
    //     note: 'c4sharp',
    //     notePlayedAt: 10500,
    //     duration:200
    // },
    // {
    //     note: 'd4',
    //     notePlayedAt: 11000,
    //     duration:200
    // },
    // {
    //     note: 'c4sharp',
    //     notePlayedAt: 11500,
    //     duration:200
    // },
    // {
    //     note: 'd4',
    //     notePlayedAt: 12000,
    //     duration:200
    // },
    // {
    //     note: 'b5',
    //     notePlayedAt: 12500,
    //     duration:200
    // },
    // {
    //     note: 'c4sharp',
    //     notePlayedAt: 13000,
    //     duration:200
    // },
    // {
    //     note: 'b5',
    //     notePlayedAt: 13500,
    //     duration:200
    // },
    // {
    //     note: 'c4sharp',
    //     notePlayedAt: 14000,
    //     duration:200
    // },
    // {
    //     note: 'a5',
    //     notePlayedAt: 14500,
    //     duration:200
    // },
    // {
    //     note: 'b5',
    //     notePlayedAt: 15000,
    //     duration:200
    // },
    // {
    //     note: 'a5',
    //     notePlayedAt: 15500,
    //     duration:200
    // },
    // {
    //     note: 'b5',
    //     notePlayedAt: 16000,
    //     duration:200
    // },
    // {
    //     note: 'g4',
    //     notePlayedAt: 16500,
    //     duration:200
    // },
    // {
    //     note: 'b5',
    //     notePlayedAt: 17000,
    //     duration:200
    // }
]

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let audioConnect = audioContext.createGain();
audioConnect.connect(audioContext.destination);
let gameState = {
    'gameSpeed' : 2, // multiplier to change game speed
    'gameSpeedIncreaseIncrement' : 0,
    'noteScreenTravelTime' : 2000, // the time in ms for a note to travel down the screen
    'nextNoteToAnimate' : 0, // tracks progress through song
    'gameLoop' : 0,
    'playNoteWithinWindow' : 400, // window in ms that the note can be played
    'playerLives' : 5,
    'gameStartTime' : null,
    'songLength' : 0
}

let results = [] // keeps track of all notes played and hit ratio, used to track lives lost and score
let notesToPlayArray = [] // helps the program decide what note to play next
let notesInChannels = {} // used to track hit markers and timing

createStartGameModal()
createGameScreen()
