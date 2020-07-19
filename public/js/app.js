const fetchWeather = address =>
    fetch(`/weather?address=${address}`).then(response => response.json())


const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input.search')
const loading = document.querySelector('#loading')
const weatherIconParagraph = document.querySelector('#weather-icon')
const weatherIcon = document.querySelector('#weather-icon img')
const locationParagraph = document.querySelector('#location')
const locationText = document.querySelector('#location span')
const forecastParagraph = document.querySelector('#forecast')
const forecastText = document.querySelector('#forecast span')
const errorText = document.querySelector('#error')

const hideError = () => errorText.style.display = 'none'
const showError = () => errorText.style.display = 'block'
const hideForecast = () => {
    locationParagraph.style.display = 'none'
    forecastParagraph.style.display = 'none'
    weatherIconParagraph.style.display = 'none'
}
const showForecast = () => {
    locationParagraph.style.display = 'block'
    forecastParagraph.style.display = 'block'
    weatherIconParagraph.style.display = 'block'
}
const toggleLoading = (show = false) => loading.style.display = show ? 'block' : 'none'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    toggleLoading(true)
    hideForecast()
    hideError()

    const location = searchInput.value

    if (location) {
        fetchWeather(location)
            .then((data) => {
                if (data.error) {
                    errorText.textContent = data.error
                    showError()
                    hideForecast()
                } else {
                    locationText.textContent = data.location
                    locationText.value = data.location
                    forecastText.textContent = data.forecast
                    weatherIcon.src = data.img
                    hideError()
                    showForecast()
                }
            })
            .finally(() => toggleLoading())
    } else {
        errorText.textContent = 'Please search for a valid location'
        showError()
        hideForecast()
        toggleLoading()
    }
})

