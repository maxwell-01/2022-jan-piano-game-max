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
    openCloseModal('.modal-overlay-start', '.start-game-model', 'close')
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
