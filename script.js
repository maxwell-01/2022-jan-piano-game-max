function openCloseModal(modalOverlay, modalBody, isModalOpen) {
    if(isModalOpen === false) {
        document.querySelector(modalOverlay).style.display = 'none'
        document.querySelector(modalBody).style.display = 'none'
    } else if(isModalOpen === true) {
        document.querySelector(modalOverlay).style.display = 'block'
        document.querySelector(modalBody).style.display = 'block'
    }
}

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
audioConnect = audioContext.createGain();
audioConnect.connect(audioContext.destination);

let hideGameStartModal = document.querySelector('#start-game-button')
let showInstructionsButton = document.querySelector('#instruction-button')
let hideInstructionsModal = document.querySelector('#modal-button')
let instructionsModal = document.querySelector('.instruction-modal')
let modalBlurredArea = document.querySelector('.modal-blurred-area')

instructionsModal.addEventListener('click', (event) => {
    event.stopPropagation()
})

hideGameStartModal.addEventListener('click', (event) => {
    event.stopPropagation()
    openCloseModal('.modal-overlay-start', '.start-game-modal', false)
    play()
})
showInstructionsButton.addEventListener('click', () => {
    openCloseModal('.modal-blurred-area', '.instruction-modal', true)
})
hideInstructionsModal.addEventListener('click', () => {
    openCloseModal('.modal-blurred-area', '.instruction-modal', false)
})
modalBlurredArea.addEventListener('click', () => {
    openCloseModal('.modal-blurred-area', '.instruction-modal', false)
})

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

let results = [] // keeps track of all notes played and hit ratio, used to track lives lost and score
let notesToPlayArray = [] // helps the program decide what note to play next
let notesInChannels = {} // used to track hit markers and timing

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

// let results = [
//     0: {
//         targetNote: {
//             note: 'b4',
//             notePlayedAt: 2000,
//             duration: 500
//         },
//         played: false,
//         targetHit: null,
//         id: 0
//     }
// ]

function loadSongIntoGame(song) {
    Object.keys(pianoKeys).forEach((key) => {
        notesInChannels[key] = []
    })
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

function populateNotesArrays(song) {
    for(let i = 0; i < song.length; i++) {
        notesToPlayArray.push(
            {
                note:     {
                    note: song[i].note,
                    notePlayedAt: song[i].notePlayedAt,
                    duration:500
                },
                "noteId": i})
        notesInChannels[song[i].note].push({"noteId": i})
    }
}

function animateNotes(nextNoteToAnimate, gameSpeed, noteScreenTravelTime) {
    notesToPlayArray.forEach((note) => {
        setTimeout(() => {
            let divToAnimate = document.querySelector('#note-' + note.noteId)
            let channelHeight = document.querySelector('.piano-key-channel').clientHeight
            let noteHeight = divToAnimate.clientHeight
            let noteAnimationDistance = channelHeight + noteHeight
            let noteAnimationTime = ((noteScreenTravelTime * noteAnimationDistance) / channelHeight) / gameSpeed

            divToAnimate.animate([
                    { transform: 'translateY(0px)'},
                    { transform: 'translateY(' + noteAnimationDistance + 'px)'}
                ], {
                    duration: noteAnimationTime,
                    iterations: 1
                }
            )
        }, note.note.notePlayedAt / (gameSpeed ** 2))
    })
}

function setNoteDivProperties(song, gameSpeed, noteScreenTravelTime) {
    for(let i = 0; i < song.length; i++) {
        let channel = document.querySelector('#channel-' + song[i].note)
        let screenSizeAdjustmentFactor = noteScreenTravelTime / channel.clientHeight
        let noteHeight = song[i].duration / (screenSizeAdjustmentFactor * gameSpeed)
        let noteDiv = document.querySelector('#note-' + i)

        noteDiv.style.height = noteHeight + 'px'
        noteDiv.style.top = -noteHeight + 'px'
    }
}


function turnOnKeyboard(notesPlaying, gameTimer) {
    window.addEventListener('keydown' , (event) => {
        event.preventDefault()
        if(Object.keys(keyBoardMapping).includes(event.code)) {
            let keyboardKey = keyBoardMapping[event.code]
            let pianoKey = pianoKeys[keyboardKey.note]
            if (keyboardKey.pressed === false) {
                keyboardKey.pressed = true
                notesPlaying[keyboardKey.note] = playNote(pianoKey.frequency)
                document.querySelector('#' + keyboardKey.note).classList.add('depressedKey')
                if(gameTimer === 1) { // check if time played here matches that of the note in the channel
                    // if it does, mark note on screen tempoarily as as green
                    // delete the note from the channel?
                    console.log('miracle')
                }
            }
        }
    })
    window.addEventListener('keyup' , (event) => {
        event.preventDefault()
        if(Object.keys(keyBoardMapping).includes(event.code)){
            let keyboardKey = keyBoardMapping[event.code]
            if(keyboardKey.pressed === true) {
                keyboardKey.pressed = false
                notesPlaying[keyboardKey.note].stop()
                document.querySelector('#' + keyboardKey.note).classList.remove('depressedKey')
            }
        }

    })
}

function detectNoteHit() {
    console.log('pseudo code')
    // create array of the channels, put the notes to be played into each channel with the time they should be played
    // pass game timer into keyboard event listener so it can compare
    //when a note is hit, remove it from the front of this 'queue' (slice -1 it off)
    // need to think about what happens if a note is missed, get them hitting first then cross this bridge
}

function gameEngine(song,notesPlaying) {
    let gameSpeed = 1 // multiplier to change game speed
    let noteScreenTravelTime = 2000 / gameSpeed // the time in ms for a note to travel down the screen
    let nextNoteToAnimate = 0 // tracks progress through song
    let playNoteWithinWindow = 400 // window in ms that the note can be played
    let gameTimer = 0
    let playerLives = 1

    turnOnKeyboard(notesPlaying, gameTimer)
    loadSongIntoGame(song)
    setNoteDivProperties(song, gameSpeed, noteScreenTravelTime)
    populateNotesArrays(song)

    console.log(notesInChannels)


    animateNotes(nextNoteToAnimate, gameSpeed, noteScreenTravelTime)
    let songLength = notesToPlayArray[notesToPlayArray.length - 1].note.notePlayedAt + notesToPlayArray[notesToPlayArray.length - 1].note.duration + noteScreenTravelTime
    let game = setInterval(() => {
        setNoteDivProperties(song, gameSpeed, noteScreenTravelTime)
        populateNotesArrays(song)
        animateNotes(nextNoteToAnimate, gameSpeed, noteScreenTravelTime)
        gameSpeed +=0.1
    }, songLength) // need this song length to dynamically update - due to scope, can't place function inside

    let gameTimeInterval = setInterval(() => {
        if(playerLives === 0) {
            clearInterval(gameTimeInterval)
            clearInterval(game)
        }
        gameTimer += 100
        console.log(gameTimer)
    },100)


    //on game over count how many notes played, or how many notes hit - duplicate info, no because you will have lives
}

function playNote(frequency) {
    let sound = audioContext.createOscillator()
    sound.connect(audioConnect)
    sound.type = 'sine'
    sound.frequency.value = frequency
    sound.start()
    return sound
}

function play() {
    let song = popcornSongNotes
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let notesPlaying = {};
    let audioConnect;
    audioConnect = audioContext.createGain();
    audioConnect.connect(audioContext.destination);
    gameEngine(song, notesPlaying) // passing notesPlaying through as variable so that I can add an option to play the keyboard without notes flying
}

createGameScreen()