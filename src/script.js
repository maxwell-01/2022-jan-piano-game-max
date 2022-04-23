import { createStartGameModalHtml, instructionsModalHtml } from './gameMenu.js'
import { popcornSong as song } from './songs/popcornSong.js'
import { pianoKeys } from './pianoKeys.js'
import { keyBoardMapping } from './keyBoardMapping.js'
import { createGameScreen } from './createGameScreen.js'
import { createNoteDivs } from './createNoteDivs.js'
import { animateNoteDivs } from './animateNoteDivs.js'

let modalContainer = document.querySelector('.modal-container')
modalContainer.innerHTML = createStartGameModalHtml() + instructionsModalHtml()

document.querySelector('#instructions-menu').style.display = "none"


const handleMenuClicks = (gameState) => {
    const htmlButtonMapping = {
        'start-game-button' : () => {
            document.querySelector('.modal-background').style.display = 'none'
            runGame(true, pianoKeys, keyBoardMapping)
        },
        'instructions-button' : () => {
            document.querySelector('#start-game-menu').style.display = "none"
            document.querySelector('#instructions-menu').style.display = "flex"
        },
        'free-play-button' : () => {
            document.querySelector('.modal-background').style.display = 'none'
            runGame(false, pianoKeys, keyBoardMapping)
        },
        'close-instructions-button' : () => {
            document.querySelector('#start-game-menu').style.display = "flex"
            document.querySelector('#instructions-menu').style.display = "none"
        },
        'main-menu-button' : () => {
            if(typeof gameState != 'undefined') {clearTimeout(gameState.noteAnimationTimeout)}
            document.querySelector('#start-game-menu').style.display = "flex"
            document.querySelector('.modal-background').style.display = 'block'
        }
    }
    let modalButtons = document.querySelectorAll('.button-click-listener')
    modalButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            htmlButtonMapping[event.target.id]()
        })
    })
}

function runGame(startNoteAnimation, pianoKeys, keyBoardMapping) {
    let gameState = {
        'gameSpeed' : 2, // multiplier to change game speed
        'gameSpeedIncreaseIncrement' : 0,
        'noteScreenTravelTime' : 2000, // the time in ms for a note to travel down the screen
        'nextNoteToAnimate' : 0, // tracks progress through song
        'gameLoop' : 0,
        'playNoteWithinWindow' : 400, // window in ms that the note can be played
        'playerLives' : 5,
        'gameStartTime' : null,
        'songLength' : 0,
        'noteAnimationTimeout' : null
    }
    let notesPlaying = {};
    let notesToPlayArray = [] // helps the program decide what note to play next
    let notesInChannels = {} // used to track hit markers and timing
    let results = [] // keeps track of all notes played and hit ratio, used to track lives lost and score


    populateNotesAndChannelArrays(song, gameState, notesToPlayArray, notesInChannels)
    createNoteDivs(song, pianoKeys, gameState, notesToPlayArray)
    gameState.gameStartTime = new Date()
    if(startNoteAnimation) {playGameSong(song, gameState,notesToPlayArray, notesInChannels)}

    window.addEventListener('keydown' , (event) => {
        console.log(notesInChannels)
        handleKeyboardEvent(event, gameState, notesPlaying, pianoKeys, keyBoardMapping, notesInChannels)
    })
    window.addEventListener('keyup' , (event) => {
        handleKeyboardEvent(event, gameState, notesPlaying, pianoKeys, keyBoardMapping, notesInChannels)
    })

    //on game over count how many notes
    // played, or how many notes hit - duplicate info? no because you will have lives
    handleMenuClicks(gameState)
}
function populateNotesAndChannelArrays(song, gameState, notesToPlayArray, notesInChannels) { // song array always going to be fairly short so split out into two functions
    notesInChannels = {}
    notesToPlayArray.length = 0 // clears out any missed notes during gameplay
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

function playGameSong(song, gameState,notesToPlayArray, notesInChannels, songLength=0) { // put timeput in play and leave other studff in here
    gameState.noteAnimationTimeout = setTimeout(() => {
        gameState.gameSpeed += gameState.gameSpeedIncreaseIncrement
        populateNotesAndChannelArrays(song, gameState, notesToPlayArray, notesInChannels)
        // need to update note div sizes as game speeds up, should destroy and re-create them each game loop
        animateNoteDivs(gameState, song)
        let lastNote = notesToPlayArray[notesToPlayArray.length - 1]
        let songLengthTimer = (lastNote.notePlayedAt + lastNote.duration + gameState.noteScreenTravelTime) / gameState.gameSpeed
        gameState.songLength = songLengthTimer
        gameState.gameLoop++
        playGameSong(song, gameState,notesToPlayArray, notesInChannels, songLengthTimer)
        return gameState
    },songLength)
    return gameState
}

// function animateNotes(gameState, notesToPlayArray) {
//     notesToPlayArray.forEach((note) => {
//         setTimeout(() => {
//             let divToAnimate = document.querySelector('#note-' + note.noteId)
//             let channelHeight = document.querySelector('.piano-key-channel').clientHeight
//             let noteHeight = divToAnimate.clientHeight
//             let noteAnimationDistance = channelHeight + noteHeight
//             let noteAnimationTime = ((gameState.noteScreenTravelTime / gameState.gameSpeed) * noteAnimationDistance) / channelHeight
//
//             divToAnimate.animate([
//                     { transform: 'translateY(0px)'},
//                     { transform: 'translateY(' + noteAnimationDistance + 'px)'}
//                 ], {
//                     duration: noteAnimationTime,
//                     iterations: 1
//                 }
//             )
//         }, note.notePlayedAt / gameState.gameSpeed )
//     })
// }
function handleKeyboardEvent(event, gameState, notesPlaying, pianoKeys, keyBoardMapping, notesInChannels) {
    event.preventDefault()
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let audioConnect = audioContext.createGain();
    audioConnect.connect(audioContext.destination);
    if(Object.keys(keyBoardMapping).includes(event.code)) {
        let keyboardKey = keyBoardMapping[event.code]
        if (event.type === 'keydown') {
            let pianoKey = pianoKeys[keyboardKey.note]
            if (keyboardKey.pressed === false) {
                keyboardKey.pressed = true
                notesPlaying[keyboardKey.note] = playNote(audioContext, audioConnect, pianoKey.frequency)
                document.querySelector('#' + keyboardKey.note).classList.add('depressedKey')
                detectNoteHit(gameState, keyboardKey, notesInChannels)
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
function playNote(audioContext, audioConnect, frequency) {
    let sound = audioContext.createOscillator()
    sound.connect(audioConnect)
    sound.type = 'sine'
    sound.frequency.value = frequency
    sound.start()
    return sound
}
function detectNoteHit(gameState, keyboardKey, notesInChannels) {
    console.log(notesInChannels)
    if(typeof notesInChannels[keyboardKey.note] != "undefined") {
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




createGameScreen(pianoKeys, keyBoardMapping)
handleMenuClicks()
