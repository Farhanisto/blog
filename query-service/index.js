const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.listen(4002, ()=> {
    console.log('listening on port 4002')
})