const express = require('express')
const app = express()

const { mountainRouter } = require('./Controllers/mountains.js')
// const { focusRouter } = require('./Controllers/focus.js')
// const { relaxRouter } = require('./Controllers/relax.js')

app.use(express.urlencoded({extended: true}))

app.use(express.json())

// app.use(express.static(`${__dirname}/client/build`))

app.use('/api/mountains', mountainRouter)
// app.use('/api/focuses', focusRouter)
// app.use('/api/relaxes', relaxRouter)

// app.get('/*', (req, res) => {
//     res.sendFile(`${__dirname}/client/build/index.html`)
// })

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
})