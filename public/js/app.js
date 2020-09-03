const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const $sendLocationButton = document.querySelector('#send-location')

const fetchWeather = (url)=>{
    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error) {
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
}

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const location = search.value
    if(location === ''){
        return console.log('Enter a valid location');
    }

    fetchWeather('/weather?address='+encodeURIComponent(location))
})

$sendLocationButton.addEventListener('click', ()=>{
    if(!navigator.geolocation){
        return alert('Your browser does not support geolocation')
    }
    let lat = 0
    let lon = 0
    navigator.geolocation.getCurrentPosition((position)=>{
        lat = position.coords.latitude
        lon = position.coords.longitude
    })

    fetchWeather(`/weatherOnClick?lat=${lat}&lon=${lon}`)
})