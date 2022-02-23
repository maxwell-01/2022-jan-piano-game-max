let showInstructionsButton = document.querySelector('#instruction-button')
let hideInstructionsModal = document.querySelector('#modal-button')
let hideGameStartModal = document.querySelector('#start-game-button')

function openCloseModal(modalOverlay, modalBody, status) {
    if(status === 'close') {
        document.querySelector(modalOverlay).style.display = 'none'
        document.querySelector(modalBody).style.display = 'none'
    } else if(status === 'open') {
        document.querySelector(modalOverlay).style.display = 'block'
        document.querySelector(modalBody).style.display = 'block'
    }
}
hideGameStartModal.addEventListener('click', (event) => {
    event.stopPropagation()
    openCloseModal('.modal-overlay-start', '.start-game-modal', 'close')
    play()
})

showInstructionsButton.addEventListener('click', (event) => {
    event.stopPropagation()
    openCloseModal('.modal-blurred-area', '.instruction-modal', 'open')
})

hideInstructionsModal.addEventListener('click', () => {
    openCloseModal('.modal-blurred-area', '.instruction-modal', 'close')
})

let instructionsModal = document.querySelector('.instruction-modal')
let blurredAreaModal = document.querySelector('.modal-blurred-area')
window.addEventListener('click', (event) => {
    if (event.target === blurredAreaModal && instructionsModal) {
        event.stopPropagation()
        openCloseModal('.modal-blurred-area', '.instruction-modal', 'close')
    }
})


let keyBoardArray = [
    {
        keyColour: 'white',
        keyNote: 'g3',
        keyCode: 'KeyA',
        label: 'A',
        pressed: false,
        frequency: 195.9977
    },
    {
        keyColour: 'black',
        parentKey: 'g3',
        keyNote: 'g3sharp',
        keyCode: 'KeyW',
        label: 'W',
        pressed: false,
        frequency: 207.6523
    },
    {
        keyColour: 'white',
        keyNote: 'a4',
        keyCode: 'KeyS',
        label: 'S',
        pressed: false,
        frequency: 220.0000
    },
    {
        keyColour: 'black',
        parentKey: 'a4',
        keyNote: 'a4sharp',
        keyCode: 'KeyE',
        label: 'E',
        pressed: false,
        frequency: 233.0819
    },
    {
        keyColour: 'white',
        keyNote: 'b4',
        keyCode: 'KeyD',
        label: 'D',
        pressed: false,
        frequency: 246.9417
    },
    {
        keyColour: 'white',
        keyNote: 'c4',
        keyCode: 'KeyF',
        label: 'F',
        pressed: false,
        frequency: 261.6256
    },
    {
        keyColour: 'black',
        parentKey: 'c4',
        keyNote: 'c4sharp',
        keyCode: 'KeyT',
        label: 'T',
        pressed: false,
        frequency: 277.1826
    },
    {
        keyColour: 'white',
        keyNote: 'd4',
        keyCode: 'KeyG',
        label: 'G',
        pressed: false,
        frequency: 293.6648
    },
    {
        keyColour: 'black',
        parentKey: 'd4',
        keyNote: 'd4sharp',
        keyCode: 'KeyY',
        label: 'Y',
        pressed: false,
        frequency: 311.1270
    },
    {
        keyColour: 'white',
        keyNote: 'e4',
        keyCode: 'KeyH',
        label: 'H',
        pressed: false,
        frequency: 329.6276
    },
    {
        keyColour: 'white',
        keyNote: 'f4',
        keyCode: 'KeyJ',
        label: 'J',
        pressed: false,
        frequency: 349.2282,
    },
    {
        keyColour: 'black',
        parentKey: 'f4',
        keyNote: 'f4sharp',
        keyCode: 'KeyI',
        label: 'I',
        pressed: false,
        frequency: 369.9944
    },
    {
        keyColour: 'white',
        keyNote: 'g4',
        keyCode: 'KeyK',
        label: 'K',
        pressed: false,
        frequency: 391.9954
    },
    {
        keyColour: 'black',
        parentKey: 'g4',
        keyNote: 'g4sharp',
        keyCode: 'KeyO',
        label: 'O',
        pressed: false,
        frequency: 415.3047
    },
    {
        keyColour: 'white',
        keyNote: 'a5',
        keyCode: 'KeyL',
        label: 'L',
        pressed: false,
        frequency: 440.0000
    },
    {
        keyColour: 'black',
        parentKey: 'a5',
        keyNote: 'a5sharp',
        keyCode: 'KeyP',
        label: 'P',
        pressed: false,
        frequency: 493.8833
    },
    {
        keyColour: 'white',
        keyNote: 'b5',
        keyCode: 'Semicolon',
        label: ';',
        pressed: false,
        frequency: 466.1638
    },
    {
        keyColour: 'white',
        keyNote: 'c5',
        keyCode: 'Quote',
        label: "'",
        pressed: false,
        frequency: 523.2511
    },
    {
        keyColour: 'black',
        parentKey: 'c5',
        keyNote: 'c5sharp',
        keyCode: 'BracketLeft',
        label: '[',
        pressed: false,
        frequency: 554.3653
    },
    {
        keyColour: 'white',
        keyNote: 'd5',
        keyCode: 'Backslash',
        label: '\\',
        pressed: false,
        frequency: 587.3295
    },
    {
        keyColour: 'black',
        parentKey: 'd5',
        keyNote: 'd5sharp',
        keyCode: 'BracketRight',
        label: ']',
        pressed: false,
        frequency: 622.2540
    },
    {
        keyColour: 'white',
        keyNote: 'e5',
        keyCode: 'Enter',
        label: '⏎',
        pressed: false,
        frequency: 659.2551,
    },
]

let popCornSongNotes = [
    {
        keyNote: 'c4',
        notePlayedAt: 1000, //time after t0 in ms
        duration: 1000 // duration of note in ms
    },
    {
        keyNote: 'd4',
        notePlayedAt: 2000,
        duration: 1000
    },
    {
        keyNote: 'e4',
        notePlayedAt: 3000,
        duration: 1000
    },
    {
        keyNote: 'g4',
        notePlayedAt: 4000,
        duration: 1000
    }
]


function createGameScreen() {
    let pianoKeys = document.querySelector('.piano-key-container')
    let gameNotesContainer = document.querySelector('.game-notes-container')
    keyBoardArray.forEach((key) => {
        if(key.keyColour === 'white') {
            pianoKeys.innerHTML +=
                '<div id="' + key.keyNote + '" class="piano-key white-key" data-id="' + key.keyNote + '">\n' +
                '   <p>' + key.label + '</p>\n' +
                '</div>'
            gameNotesContainer.innerHTML +=
                '<div class="piano-key-channel white-key-channel" data-channel="' + key.keyNote + '">\n' +
                '</div>'
        } else if(key.keyColour === 'black') {
            let parentWhiteKey = document.querySelector('#' + key.parentKey)
            parentWhiteKey.innerHTML +=
                '<div id="' + key.keyNote + '" class="piano-key black-key" data-note="' + key.keyNote + '">\n' +
                '   <p>' + key.label + '</p>\n' +
                '</div>\n'
            let parentWhiteChannel = document.querySelector('[data-channel="' + key.parentKey + '"]')
            parentWhiteChannel.innerHTML +=
                '<div class="piano-key-channel black-key-channel" data-channel="' + key.keyNote + '">\n' +
                '</div>'
        }
    })
}

function createNoteInChannel(noteObject) {
    let channel = document.querySelector('[data-channel="' + noteObject.keyNote + '"]')
    channel.innerHTML += '<div class="target-note" data-floating-note="' + noteObject.keyNote + '"></div>'
    let noteDiv = document.querySelector('[data-floating-note="' + noteObject.keyNote + '"]')
    if(noteObject.keyColour === 'white') {
        noteDiv.classList.add('white-note-target')
    } else if (noteObject.keyColour === 'black') {
        noteDiv.classList.add('black-note-target')
    }
}
function loadSong(song) {
    song.forEach((noteTarget) => {
        let noteObject =  keyBoardArray.find(object => object.keyNote === noteTarget.keyNote)
        setTimeout(() => {
            createNoteInChannel(noteObject)
            let noteDiv = document.querySelector('[data-floating-note="' + noteObject.keyNote + '"]')
            setTimeout(() => {
                noteDiv.style.visibility = 'hidden'
            }, noteTarget.duration)
        }, noteTarget.notePlayedAt)
    })
}

function play() {

    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let notesPlaying = {};
    let audioConnect = null;

    audioConnect = audioContext.createGain();
    audioConnect.connect(audioContext.destination);

    function playNote(frequency) {
        let sound = audioContext.createOscillator()
        sound.connect(audioConnect)
        sound.type = 'sine'
        sound.frequency.value = frequency
        sound.start()
        return sound
    }

    window.addEventListener('keydown' , (event) => {
        event.preventDefault()
        event.stopPropagation()
        keyBoardArray.forEach((key) => {
            if(key.keyCode === event.code) {
                if(key.pressed !== true) {
                    key.pressed = true
                    notesPlaying[key.keyNote] = playNote(key.frequency)
                    let noteClass = '#' + key.keyNote
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
            if(key.keyCode === event.code) {
                if(key.pressed !== false) {
                    key.pressed = false
                    notesPlaying[key.keyNote].stop()
                    let noteClass = '#' + key.keyNote
                    let pianoKeyDiv = document.querySelector(noteClass)
                    pianoKeyDiv.classList.remove('depressedKey')
                }
            }
        })
    })
    loadSong(popCornSongNotes)
    //create function that generates html for notes in channel, pass in the note (it could look up the
    //  correct channel and apply the correct classes
    //function to make the note appear in the correct channel at the correct time, timer to remove shown class
    //  after hit timer reaches 0 (hit timer is the window to hit the key)
    //array to hold notes that have appeared on screen? Could store whether they were hit or not here too
    // add timer from start of play
}




createGameScreen()




