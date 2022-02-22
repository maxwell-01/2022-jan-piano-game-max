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