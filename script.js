let pianoKeys = document.querySelector('.piano-key-container')

let keyBoardArray = [
    {
        keyNote: 'g3',
        keyCode: 'KeyA',
        label: 'A',
        pressed: false,
        blackKey: {
            keyNote: 'g3#',
            keyCode: 'KeyW',
            label: 'W',
            pressed: false
        }
    },

    {
        keyNote: 'a4',
        keyCode: 'KeyS',
        label: 'S',
        pressed: false,
        blackKey: {
            keyNote: 'a4#',
            keyCode: 'KeyE',
            label: 'E',
            pressed: false
        }
    },

    {
        keyNote: 'b4',
        keyCode: 'KeyD',
        label: 'D',
        pressed: false,
        blackKey: {
            keyNote: null,
            keyCode: null,
            label: null,
            pressed: false
        }
    },
    {
        keyNote: 'c4',
        keyCode: 'KeyF',
        label: 'F',
        pressed: false,
        blackKey: {
            keyNote: 'c4#',
            keyCode: 'KeyT',
            label: 'T',
            pressed: false
        }
    },
    {
        keyNote: 'd4',
        keyCode: 'KeyG',
        label: 'G',
        pressed: false,
        blackKey: {
            keyNote: 'd4#',
            keyCode: 'KeyY',
            label: 'Y',
            pressed: false
        }
    },
    {
        keyNote: 'e4',
        keyCode: 'KeyH',
        label: 'H',
        pressed: false,
        blackKey: {
            keyNote: null,
            keyCode: null,
            label: null,
            pressed: false
        }
    },
    {
        keyNote: 'f4',
        keyCode: 'KeyJ',
        label: 'J',
        pressed: false,
        blackKey:     {
            keyNote: 'f4#',
            keyCode: 'KeyI',
            label: 'I',
            pressed: false
        }
    },

    {
        keyNote: 'g4',
        keyCode: 'KeyK',
        label: 'K',
        pressed: false,
        blackKey: {
            keyNote: 'g4#',
            keyCode: 'KeyO',
            label: 'O',
            pressed: false
        }
    },

    {
        keyNote: 'a5',
        keyCode: 'KeyL',
        label: 'L',
        pressed: false,
        blackKey: {
            keyNote: 'a5#',
            keyCode: 'KeyP',
            label: 'P',
            pressed: false
        }
    },

    {
        keyNote: 'b5',
        keyCode: 'Semicolon',
        label: ';',
        pressed: false,
        blackKey: {
            keyNote: null,
            keyCode: null,
            label: null,
            pressed: false
        }
    },
    {
        keyNote: 'c5',
        keyCode: 'Quote',
        label: "'",
        pressed: false,
        blackKey: {
            keyNote: 'c5#',
            keyCode: 'BracketLeft',
            label: '[',
            pressed: false
        }
    },
    {
        keyNote: 'd5',
        keyCode: 'Backslash',
        label: '\\',
        pressed: false,
        blackKey: {
            keyNote: 'd5#',
            keyCode: 'BracketRight',
            label: ']',
            pressed: false
        }
    },
    {
        keyNote: 'e5',
        keyCode: 'Enter',
        label: '⏎',
        pressed: false,
        blackKey: {
            keyNote: null,
            keyCode: null,
            label: null,
            pressed: false
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

window.addEventListener('keydown' , (event) => {

    keyBoardArray.forEach((key) => {
        if(key.keyCode === event.code) {
            if(key.pressed !== true) {
                console.log(key.keyNote)
                key.pressed = true
            }
        } else if(key.blackKey.keyCode === event.code) {
            if(key.blackKey.pressed !== true) {
                console.log(key.blackKey.keyNote)
                key.blackKey.pressed = true
            }
        }
    })
})

window.addEventListener('keyup' , (event) => {

    keyBoardArray.forEach((key) => {
        if(key.keyCode === event.code) {
            console.log(key.keyNote)
            if(key.pressed !== false) {
                key.pressed = false
            }
        } else if(key.blackKey.keyCode === event.code) {
            console.log(key.blackKey.keyNote)
            if(key.blackKey.pressed !== false) {
                key.blackKey.pressed = false
            }
        }
    })
})