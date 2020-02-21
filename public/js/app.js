console.log('Client side javascript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

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
})

search.addEventListener('input', (e) => {

    let location = e.target.value
    
    message.classList.add('hide')

    const dropdownEl = document.querySelector('#auto-dropdown')

    if (!location) {
        document.querySelector('#auto-dropdown').classList.add('hide')
    } else {
        fetch(`/weather?address=${location}`).then((response) => {
            response.json().then((data = {}) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    const auto1 = document.querySelector('#auto-1')
                    const auto2 = document.querySelector('#auto-2')
                    const auto3 = document.querySelector('#auto-3')
                    const auto4 = document.querySelector('#auto-4')
                    const auto5 = document.querySelector('#auto-5')

                    auto1.textContent = data.features[0].place_name
                    auto1.addEventListener('click', (e) => {
                        search.value = data.features[0].place_name
                        document.querySelector('#auto-dropdown').classList.add('hide')
                        messageOne.textContent = ''
                        messageTwo.textContent = ''
                    })

                    auto2.textContent = data.features[1].place_name
                    auto2.addEventListener('click', (e) => {
                        search.value = data.features[1].place_name
                        document.querySelector('#auto-dropdown').classList.add('hide')
                        messageOne.textContent = ''
                        messageTwo.textContent = ''
                    })

                    auto3.textContent = data.features[2].place_name
                    auto3.addEventListener('click', (e) => {
                        search.value = data.features[2].place_name
                        document.querySelector('#auto-dropdown').classList.add('hide')
                        messageOne.textContent = ''
                        messageTwo.textContent = ''
                    })

                    auto4.textContent = data.features[3].place_name
                    auto4.addEventListener('click', (e) => {
                        search.value = data.features[3].place_name
                        document.querySelector('#auto-dropdown').classList.add('hide')
                        messageOne.textContent = ''
                        messageTwo.textContent = ''
                    })

                    auto5.textContent = data.features[4].place_name
                    auto5.addEventListener('click', (e) => {
                        search.value = data.features[4].place_name
                        document.querySelector('#auto-dropdown').classList.add('hide')
                        messageOne.textContent = ''
                        messageTwo.textContent = ''
                    })


                    document.querySelector('#auto-dropdown').classList.remove('hide')
                }
            })
        })
        
    }
})