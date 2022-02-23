
let blurredAreaModal = document.querySelector('.modal-blurred-area')
let showInstructionsButton = document.querySelector('#instruction-button')
let instructionsModal = document.querySelector('.instruction-modal')
let hideInstructionsModal = document.querySelector('#modal-button')
let closeModal = (status) => {
    if(status === true) {
        blurredAreaModal.style.display = 'none'
        instructionsModal.style.display = 'none'
    } else if( status === false) {
        blurredAreaModal.style.display = 'block'
        instructionsModal.style.display = 'block'
    }
}

showInstructionsButton.addEventListener('click', (event) => {
    event.stopPropagation()
    closeModal(false)
})

hideInstructionsModal.addEventListener('click', (event) => {
    closeModal(true)
})

window.addEventListener('click', (event) => {
    if (event.target === blurredAreaModal && instructionsModal) {
        event.stopPropagation()
        closeModal(true)
    }
})

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let notesPlaying = {};
let audioConnect = null;
let pianoKeys = document.querySelector('.piano-key-container')
let keyBoardArray = [
    {
        keyNote: 'g3',
        keyCode: 'KeyA',
        label: 'A',
        pressed: false,
        frequency: 195.9977,
        blackKey: {
            keyNote: 'g3#',
            keyCode: 'KeyW',
            label: 'W',
            pressed: false,
            frequency: 207.6523
        }
    },
    {
        keyNote: 'a4',
        keyCode: 'KeyS',
        label: 'S',
        pressed: false,
        frequency: 220.0000,
        blackKey: {
            keyNote: 'a4#',
            keyCode: 'KeyE',
            label: 'E',
            pressed: false,
            frequency: 233.0819
        }
    },
    {
        keyNote: 'b4',
        keyCode: 'KeyD',
        label: 'D',
        pressed: false,
        frequency: 246.9417,
        blackKey: {
            keyNote: null,
            keyCode: null,
            label: null,
            pressed: false,
            frequency: null
        }
    },
    {
        keyNote: 'c4',
        keyCode: 'KeyF',
        label: 'F',
        pressed: false,
        frequency: 261.6256,
        blackKey: {
            keyNote: 'c4#',
            keyCode: 'KeyT',
            label: 'T',
            pressed: false,
            frequency: 277.1826
        }
    },
    {
        keyNote: 'd4',
        keyCode: 'KeyG',
        label: 'G',
        pressed: false,
        frequency: 293.6648,
        blackKey: {
            keyNote: 'd4#',
            keyCode: 'KeyY',
            label: 'Y',
            pressed: false,
            frequency: 311.1270
        }
    },
    {
        keyNote: 'e4',
        keyCode: 'KeyH',
        label: 'H',
        pressed: false,
        frequency: 329.6276,
        blackKey: {
            keyNote: null,
            keyCode: null,
            label: null,
            pressed: false,
            frequency: null
        }
    },
    {
        keyNote: 'f4',
        keyCode: 'KeyJ',
        label: 'J',
        pressed: false,
        frequency: 349.2282,
        blackKey: {
            keyNote: 'f4#',
            keyCode: 'KeyI',
            label: 'I',
            pressed: false,
            frequency: 369.9944
        }
    },
    {
        keyNote: 'g4',
        keyCode: 'KeyK',
        label: 'K',
        pressed: false,
        frequency: 391.9954,
        blackKey: {
            keyNote: 'g4#',
            keyCode: 'KeyO',
            label: 'O',
            pressed: false,
            frequency: 415.3047
        }
    },
    {
        keyNote: 'a5',
        keyCode: 'KeyL',
        label: 'L',
        pressed: false,
        frequency: 440.0000,
        blackKey: {
            keyNote: 'a5#',
            keyCode: 'KeyP',
            label: 'P',
            pressed: false,
            frequency: 493.8833
        }
    },
    {
        keyNote: 'b5',
        keyCode: 'Semicolon',
        label: ';',
        pressed: false,
        frequency: 466.1638,
        blackKey: {
            keyNote: null,
            keyCode: null,
            label: null,
            pressed: false,
            frequency: null
        }
    },
    {
        keyNote: 'c5',
        keyCode: 'Quote',
        label: "'",
        pressed: false,
        frequency: 523.2511,
        blackKey: {
            keyNote: 'c5#',
            keyCode: 'BracketLeft',
            label: '[',
            pressed: false,
            frequency: 554.3653
        }
    },
    {
        keyNote: 'd5',
        keyCode: 'Backslash',
        label: '\\',
        pressed: false,
        frequency: 587.3295,
        blackKey: {
            keyNote: 'd5#',
            keyCode: 'BracketRight',
            label: ']',
            pressed: false,
            frequency: 622.2540
        }
    },
    {
        keyNote: 'e5',
        keyCode: 'Enter',
        label: '⏎',
        pressed: false,
        frequency: 659.2551,
        blackKey: {
            keyNote: null,
            keyCode: null,
            label: null,
            pressed: false,
            frequency: null
        }
    }
]

keyBoardArray.forEach((key) => {
    if(key.blackKey.keyNote !== null) {
        pianoKeys.innerHTML +=
        '<div class="piano-key white-key" data-note="' + key.keyNote + '">\n' +
        '<div class="piano-key black-key" data-note="' + key.blackKey.keyNote + '">\n' +
        '<p>' + key.blackKey.label + '</p>\n' +
        '</div>\n' +
        '<p>' + key.label + '</p>\n' +
        '</div>'
    } else {
        pianoKeys.innerHTML +=
            '<div class="piano-key white-key" data-note="' + key.keyNote + '">\n' +
            '<p>' + key.label + '</p>\n' +
            '</div>'
    }
})

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
            }
        } else if(key.blackKey.keyCode === event.code) {
            if(key.blackKey.pressed !== true) {
                key.blackKey.pressed = true
                notesPlaying[key.blackKey.keyNote] = playNote(key.blackKey.frequency)
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
            }
        } else if(key.blackKey.keyCode === event.code) {
            if(key.blackKey.pressed !== false) {
                key.blackKey.pressed = false
                notesPlaying[key.blackKey.keyNote].stop()
            }
        }
    })
})
