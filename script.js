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

let notesPlaying = {};
let pianoKeyContainer = document.querySelector('.piano-key-container')

let keyBoardArray = [
    {
        colour: 'white',
        note: 'g3',
        code: 'KeyA',
        label: 'A',
        pressed: false,
        frequency: 195.9977
    },
    {
        colour: 'black',
        parentKey: 'g3',
        note: 'g3sharp',
        code: 'KeyW',
        label: 'W',
        pressed: false,
        frequency: 207.6523
    },
    {
        colour: 'white',
        note: 'a4',
        code: 'KeyS',
        label: 'S',
        pressed: false,
        frequency: 220.0000
    },
    {
        colour: 'black',
        parentKey: 'a4',
        note: 'a4sharp',
        code: 'KeyE',
        label: 'E',
        pressed: false,
        frequency: 233.0819
    },
    {
        colour: 'white',
        note: 'b4',
        code: 'KeyD',
        label: 'D',
        pressed: false,
        frequency: 246.9417
    },
    {
        colour: 'white',
        note: 'c4',
        code: 'KeyF',
        label: 'F',
        pressed: false,
        frequency: 261.6256
    },
    {
        colour: 'black',
        parentKey: 'c4',
        note: 'c4sharp',
        code: 'KeyT',
        label: 'T',
        pressed: false,
        frequency: 277.1826
    },
    {
        colour: 'white',
        note: 'd4',
        code: 'KeyG',
        label: 'G',
        pressed: false,
        frequency: 293.6648
    },
    {
        colour: 'black',
        parentKey: 'd4',
        note: 'd4sharp',
        code: 'KeyY',
        label: 'Y',
        pressed: false,
        frequency: 311.1270
    },
    {
        colour: 'white',
        note: 'e4',
        code: 'KeyH',
        label: 'H',
        pressed: false,
        frequency: 329.6276
    },
    {
        colour: 'white',
        note: 'f4',
        code: 'KeyJ',
        label: 'J',
        pressed: false,
        frequency: 349.2282,
    },
    {
        colour: 'black',
        parentKey: 'f4',
        note: 'f4sharp',
        code: 'KeyI',
        label: 'I',
        pressed: false,
        frequency: 369.9944
    },
    {
        colour: 'white',
        note: 'g4',
        code: 'KeyK',
        label: 'K',
        pressed: false,
        frequency: 391.9954
    },
    {
        colour: 'black',
        parentKey: 'g4',
        note: 'g4sharp',
        code: 'KeyO',
        label: 'O',
        pressed: false,
        frequency: 415.3047
    },
    {
        colour: 'white',
        note: 'a5',
        code: 'KeyL',
        label: 'L',
        pressed: false,
        frequency: 440.0000
    },
    {
        colour: 'black',
        parentKey: 'a5',
        note: 'a5sharp',
        code: 'KeyP',
        label: 'P',
        pressed: false,
        frequency: 466.1638
    },
    {
        colour: 'white',
        note: 'b5',
        code: 'Semicolon',
        label: ';',
        pressed: false,
        frequency: 493.8833
    },
    {
        colour: 'white',
        note: 'c5',
        code: 'Quote',
        label: "'",
        pressed: false,
        frequency: 523.2511
    },
    {
        colour: 'black',
        parentKey: 'c5',
        note: 'c5sharp',
        code: 'BracketLeft',
        label: '[',
        pressed: false,
        frequency: 554.3653
    },
    {
        colour: 'white',
        note: 'd5',
        code: 'Backslash',
        label: '\\',
        pressed: false,
        frequency: 587.3295
    },
    {
        colour: 'black',
        parentKey: 'd5',
        note: 'd5sharp',
        code: 'BracketRight',
        label: ']',
        pressed: false,
        frequency: 622.2540
    },
    {
        colour: 'white',
        note: 'e5',
        code: 'Enter',
        label: '⏎',
        pressed: false,
        frequency: 659.2551,
    },
]

let popcornSongNotes = [
    {
        note: 'b5',
        notePlayedAt: 0,
        duration:500
    },
    {
        note: 'a5',
        notePlayedAt: 500,
        duration:500
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

let gameState = []

function createGameScreen() {
    let pianoKeys = document.querySelector('.piano-key-container')
    let gameNotesContainer = document.querySelector('.game-notes-container')
    keyBoardArray.forEach((key) => {
        if(key.colour === 'white') {
            pianoKeys.innerHTML +=
                '<div id="' + key.note + '" class="piano-key white-key" data-id="' + key.note + '">\n' +
                '   <p>' + key.label + '</p>\n' +
                '</div>'
            gameNotesContainer.innerHTML +=
                '<div class="piano-key-channel white-key-channel" id="channel-' + key.note + '">\n' +
                '</div>'
        } else if(key.colour === 'black') {
            let parentWhiteKeyDiv = document.querySelector('#' + key.parentKey )
            let newContent =
                '<div id="' + key.note + '" class="piano-key black-key" data-note="' + key.note + '">\n' +
                '   <p>' + key.label + '</p>\n' +
                '</div>\n' + parentWhiteKeyDiv.innerHTML
            parentWhiteKeyDiv.innerHTML = newContent
            let parentWhiteChannel = document.querySelector('#channel-' + key.parentKey)
            parentWhiteChannel.innerHTML +=
                '<div class="piano-key-channel black-key-channel" id="channel-' + key.note + '">\n' +
                '</div>'
        }
    })
}

// let exampleGameState = [
//     0: {
//         keyboardNote: {
//             colour: 'white',
//             note: 'b4',
//             code: 'KeyD',
//             label: 'D',
//             pressed: false,
//             frequency: 246.9417
//         },
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

// let popcornSongNotes = [
//     {
//         note: 'b5',
//         notePlayedAt: 0,
//         duration:500
//     },

function loadSongIntoGame(song, gameSpeed) {
    for(let i = 0; i < song.length; i++) {
        let targetNote = song[i]
        let keyboardNote = keyBoardArray.find(object => object.note === targetNote.note)
        gameState.push({keyboardNote, targetNote, "played": false, "targetHit": null, "id": i})
        let channel = document.querySelector('#channel-' + song[i].note)
        let noteHeight = song[i].duration / (6.5 * gameSpeed)
        let noteDiv

        if(keyboardNote.colour === 'white'){
            noteDiv = '<div class="target-note white-note-target" id="note-' + i + '" style="height:' + noteHeight + 'px; top:-' + noteHeight +'px;"></div>'
        } else if(keyboardNote.colour === 'black'){
            noteDiv = '<div class="target-note black-note-target" id="note-' + i + '" style="height:' + noteHeight + 'px; top:-' + noteHeight +'px;"></div>'
        }
        channel.innerHTML += noteDiv
    }
}

function playSongOnScreen(gameSpeed, noteScreenTravelTime){
    let notesPlayed = 0
    let gameTimer = 0
    let gameTime = setInterval(() => {
        // limitation - can only serve one note at a time
        if((gameState[notesPlayed].targetNote.notePlayedAt) === gameTimer){
            let divToAnimate = document.querySelector('#note-' + gameState[notesPlayed].id)
            let channelHeight = document.querySelector('#channel-' + gameState[notesPlayed].targetNote.note).clientHeight
            let noteHeight = divToAnimate.clientHeight
            let noteAnimationDistance = channelHeight + noteHeight
            let noteAnimationTime = (noteScreenTravelTime * (noteAnimationDistance)) / channelHeight
            divToAnimate.animate([
                    { transform: 'translateY(0px)'},
                    { transform: 'translateY(' + noteAnimationDistance + 'px)'}
                ], {
                    duration: noteAnimationTime,
                    iterations: 1
                }
            )
            gameState[notesPlayed].played = true
            notesPlayed++
        }
        gameTimer += 100
        console.log(gameTimer)
        if(gameState.length === notesPlayed){
            console.log('song loop finished')
            clearInterval(gameTime)
        }
    }, 100 / (gameSpeed**2) )
}

function gameEngine(song) {
    let gameSpeed = 1 // multiplier to change game speed
    let noteScreenTravelTime = 2000 / gameSpeed // the time in ms for a note to travel down the screen
    loadSongIntoGame(song, gameSpeed)
    playSongOnScreen(gameSpeed, noteScreenTravelTime)

    //for more loops, add more notes to gamestate
    // load songs and play songs 2nd time with increased game speed
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
    window.addEventListener('keydown' , (event) => {
        event.preventDefault()
        keyBoardArray.forEach((key) => {
            if (key.code === event.code) {
                if (key.pressed === false) {
                    key.pressed = true
                    notesPlaying[key.note] = playNote(key.frequency)
                    let noteClass = '#' + key.note
                    let pianoKeyDiv = document.querySelector(noteClass)
                    pianoKeyDiv.classList.add('depressedKey')
                }
            }
        })
    })
    window.addEventListener('keyup' , (event) => {
        event.preventDefault()
        event.stopPropagation()
        keyBoardArray.forEach((key) => {
            if(key.code === event.code) {
                if(key.pressed === true) {
                    key.pressed = false
                    notesPlaying[key.note].stop()
                    let noteClass = '#' + key.note
                    let pianoKeyDiv = document.querySelector(noteClass)
                    pianoKeyDiv.classList.remove('depressedKey')
                }
            }
        })
    })
    gameEngine(song)
}

createGameScreen()