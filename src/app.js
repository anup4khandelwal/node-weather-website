const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlers engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        name: 'Anup Khandelwal',
        title: 'Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        name: 'Anup Khandelwal',
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is help text',
        name: 'Anup Khandelwal',
        title: 'Help'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a address'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anup Khandelwal',
        errorMessage: 'Help Error page'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anup Khandelwal',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log("Server is started at port 3000")
})