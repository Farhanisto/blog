const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

app.post('/events',async (req, res)=>{
    const event = req.body
    await axios.post('http://localhost:4000/events', {
        event
    })
    await axios.post('http://localhost:4001/events', {
        event
    })
    await axios.post('http://localhost:4002/events', {
        event
    }).catch (e  => {console.log(e)})
    await axios.post('http://localhost:4003/events', {
        event
    })
    res.send({status: '0k'})
})

app.listen(4005, ()=>{
    console.log('listening on port 4005')
})