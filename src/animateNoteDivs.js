const calculateNoteAnimationDistance = (divToAnimateHeight, channelHeight) => {
    return (divToAnimateHeight + channelHeight)
}

const calculateNoteAnimationTime = (noteScreenTravelTime, gameSpeed, noteAnimationDistance, channelHeight) => {
    return (
        ((noteScreenTravelTime / gameSpeed) * noteAnimationDistance) / channelHeight
    )
}

export const animateNoteDivs = (gameState, song) => {
    for (let i = 0; i < song.length; i++) {
        let divToAnimate = document.querySelector('#note-' + i)
        let channel = document.querySelector('.piano-key-channel')

        let noteAnimationDistance = calculateNoteAnimationDistance(divToAnimate.clientHeight, channel.clientHeight)
        let noteAnimationTime = calculateNoteAnimationTime(
            gameState.noteScreenTravelTime, gameState.gameSpeed, noteAnimationDistance, channel.clientHeight)

        setTimeout(() => {
            divToAnimate.animate([
                    { transform: 'translateY(0px)'},
                    { transform: 'translateY(' + noteAnimationDistance + 'px)'}
                ], {
                    duration: noteAnimationTime,
                    iterations: 1
                }
            )
        }, song[i].notePlayedAt / gameState.gameSpeed)
    }
}