let blurredAreaModal = document.querySelector('.modal-blurred-area')
let showInstructionsButton = document.querySelector('#instruction-button')
let instructionsModal = document.querySelector('.instruction-modal')
let hideInstructionsModal = document.querySelector('#modal-button')
let closeModal = (status) => {
    blurredAreaModal.style.display = status
    instructionsModal.style.display = status
}

showInstructionsButton.addEventListener('click', (event) => {
    event.stopPropagation()
    closeModal('block')
})

hideInstructionsModal.addEventListener('click', (event) => {
    closeModal('none')
})

window.addEventListener('click', (event) => {
    if (event.target === blurredAreaModal && instructionsModal) {
        event.stopPropagation()
        closeModal('none')
    }
})