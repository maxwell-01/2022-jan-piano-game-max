let blurredAreaModal = document.querySelector('.modal-blurred-area')
let showInstructionsButton = document.querySelector('#instruction-button')
let instructionsModal = document.querySelector('.instruction-modal')
let instructionsBody = document.querySelector('.instructions-body')
let hideInstructionsModal = document.querySelector('#modal-button')

showInstructionsButton.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    blurredAreaModal.style.display = 'block'
    instructionsModal.style.display = 'block'
})

hideInstructionsModal.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    blurredAreaModal.style.display = 'none'
    instructionsModal.style.display = 'none'
})

window.addEventListener('click', (event) => {
    if (event.target === blurredAreaModal && instructionsModal) {
        event.preventDefault()
        event.stopPropagation()
        blurredAreaModal.style.display = 'none'
        instructionsModal.style.display = 'none'
    }
})