const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

/* ROUTES */
app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Riccardo Polacci',
        isHome: true
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Riccardo Polacci',
        isHelp: true
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Riccardo Polacci',
        isAbout: true
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'Hey! You have to send us an Address!',
        })
    }

    geocode(address, (error, { coordinates, location } = {}) => {
        if (error) {
            console.log('[geocode] - ERROR:', error)

            return res.send({
                error,
            })
        }

        forecast(coordinates, (error, { data: forecastData }) => {
            if (error) {
                console.log('[forecast] - ERROR:', error)

                return res.send({
                    error,
                })
            }

            console.log('Location:', location)
            console.log('Forecast:', forecastData)

            res.send({
                location,
                forecast: forecastData,
            })
        })
    })
})

// Handle error pages
app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Oops! Page not found!',
        name: 'Riccardo Polacci',
        slug: '404'
    })
})


/* LISTEN */
app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})

