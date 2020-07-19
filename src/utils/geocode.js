const request = require('postman-request')

// Get Geocode
const mapbox_access_token = 'pk.eyJ1Ijoic3JheGkiLCJhIjoiY2tjaXZvNDB2MGltMDJ1cDV6aTE0b2J1cyJ9.t8I4bH5kZAeRWUtq-M47VA'
const mapbox_url = address => `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapbox_access_token}&limit=1`

const geocode = (city, callback) => {
    request({ url: mapbox_url(city), json: true }, (error, { body }) => {
        if (error) {
            callback('Sorry! Something went wrong while fetching geolocation related data at mapbox.com', undefined)
        } else if (body && (body.error || body.features.length === 0)) {
            callback('Unable to find data for that location!', undefined)
        } else {
            const [data] = body.features
            const coordinates = data.center.reverse().join(',')

            callback(undefined, {
                coordinates,
                location: data.place_name,
            })
        }
    })
}

module.exports = geocode
