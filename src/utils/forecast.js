const request = require('postman-request')

// Get Forecast
const weatherstack_access_key = '372e2eefc27941d547a50f6b1fb299d5'
const weatherstack_url = query => `http://api.weatherstack.com/current?access_key=${weatherstack_access_key}&query=${query}`

const forecast = (coordinates, callback) => {
    request({ url: weatherstack_url(coordinates), json: true }, (error, {body}) => {
        console.log('DATA', body)
        if (error) {
            callback('Sorry! Something went wrong while fetching Weather data at weatherstack.com', undefined)
        } else if (body && body.error) {
            callback('Unable to find data for that location!', undefined)
        } else {
            const { current: data } = body

            callback(undefined, {
                data: `${data.weather_descriptions[0]}. It is currently ${data.temperature}°C out, (${data.feelslike}°C real feel). There is a humidity of ${data.humidity}%.`,
                img: data.weather_icons[0],
            })
        }
    })
}

module.exports = forecast
