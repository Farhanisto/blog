const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())

app.post('/events', (req, res)=>{

})

app.listen(4003, ()=>console.log('app listening on port 4003'))
