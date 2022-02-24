function openCloseModal(modalOverlay, modalBody, isModalOpen) {
    if(isModalOpen === false) {
        document.querySelector(modalOverlay).style.display = 'none'
        document.querySelector(modalBody).style.display = 'none'
    } else if(isModalOpen === true) {
        document.querySelector(modalOverlay).style.display = 'block'
        document.querySelector(modalBody).style.display = 'block'
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

let audioContext = new (window.AudioContext || window.webkitAudioContext)();
audioConnect = audioContext.createGain();
audioConnect.connect(audioContext.destination);

let showInstructionsButton = document.querySelector('#instruction-button')
let hideInstructionsModal = document.querySelector('#modal-button')

showInstructionsButton.addEventListener('click', (event) => {
    event.stopPropagation()
    openCloseModal('.modal-blurred-area', '.instruction-modal', true)
})

hideInstructionsModal.addEventListener('click', () => {
    openCloseModal('.modal-blurred-area', '.instruction-modal', false)
})

let instructionsModal = document.querySelector('.instruction-modal')
let blurredAreaModal = document.querySelector('.modal-blurred-area')
blurredAreaModal.addEventListener('click', (event) => {
    if (event.target === blurredAreaModal) {
        event.stopPropagation()
        openCloseModal('.modal-blurred-area', '.instruction-modal', false)
    }
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

keyBoardArray.forEach((key) => {
    if(key.colour === 'white') {
        pianoKeyContainer.innerHTML +=
        '<div id="' + key.note + '" class="piano-key white-key" data-id="' + key.note + '">\n' +
        '<p>' + key.label + '</p>\n' +
        '</div>'
    } else if(key.colour === 'black') {
        let parentWhiteKeyDiv = document.querySelector('#' + key.parentKey )
        let newContent =
            '<div id="' + key.note + '" class="piano-key black-key" data-note="' + key.note + '">\n' +
            '   <p>' + key.label + '</p>\n' +
            '</div>\n' + parentWhiteKeyDiv.innerHTML
        parentWhiteKeyDiv.innerHTML = newContent
    }
})

window.addEventListener('keydown' , (event) => {
    event.preventDefault()
    event.stopPropagation()
    keyBoardArray.forEach((key) => {
        if(key.code === event.code) {
            if(key.pressed === false) {
                key.pressed = true
                notesPlaying[key.note] = playNote(key.frequency)
                let pianoKeyDiv = document.querySelector('#' + key.note)
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
                let pianoKeyDiv = document.querySelector('#' + key.note)
                pianoKeyDiv.classList.remove('depressedKey')
            }
        }
    })
})
