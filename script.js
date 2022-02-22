let showInstructionsModal = document.querySelector('.modal-greyed-area')
let instructionsButton = document.querySelector('#instruction-button')
let hideInstructionsModal = document.querySelectorAll('.modal-button')

instructionsButton.addEventListener('click', (event) => {
    event.preventDefault()
    showInstructionsModal.style.display = 'block'
})

hideInstructionsModal.addEventLsitener('click', (event) => {
    event.preventDefault()
    showInstructionsModal.style.display = 'none'
})