console.log('Client side javascript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const dropdownEl = document.querySelector('#auto-dropdown')

search.value = ''
messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let location = search.value

    message.classList.remove('hide')
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data = {}) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location
            }
        })
    })
    search.value = ''
    dropdownEl.classList.add('hide')
})

search.addEventListener('input', (e) => {

    let location = e.target.value

    message.classList.add('hide')

    if (!location) {
        dropdownEl.classList.add('hide')
    } else {
        fetch(`/weather?address=${location}`).then((response) => {
            response.json().then((data = {}) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    for (let count = 0; count < 5; count++) {

                        const dropdownChild = dropdownEl.children[count]

                        dropdownChild.textContent = data.features[count].place_name

                        dropdownChild.addEventListener('click', (e) => {
                            search.value = data.features[count].place_name

                            dropdownEl.classList.add('hide')
                            messageOne.textContent = ''
                            messageTwo.textContent = ''
                        })
                    }

                    dropdownEl.classList.remove('hide')
            })
        })

    }
})