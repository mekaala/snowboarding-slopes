const express = require('express')
const app = express()

// const { mountainRouter } = require('./Controllers/mountains.js')
const { hiddenPathRouter } = require('./Controllers/hiddenPaths.js')
const { slopeRouter } = require('./Controllers/slopes.js')
const { buildingRouter } = require('./Controllers/buildings.js')

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(express.static(`${__dirname}/client/build`))

// app.use('/api/mountains', mountainRouter)
app.use('/api/hiddenPaths', hiddenPathRouter)
app.use('/api/slopes', slopeRouter)
app.use('/api/buildings', buildingRouter)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})